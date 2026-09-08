// Build edges.js from Brawl Planet brawler pages, one brawler at a time (resumable).
//   node scrape.js                 scrape every brawler in the pool + FIELD that isn't in edges.js yet
//   node scrape.js <slug> ...      scrape just these
//   node scrape.js --check <slug>  print the parsed entry, don't write
//   node scrape.js --fresh ...     start a new edges.js instead of appending
//
// Per brawler:
//   vs    = opponents, overall. Merged from the embedded JSON (8 best + 8 worst by advantage, each with
//           d and w) and the visible lists (Strong/Struggles Against => d; Win Rate Against => w).
//   with  = teammates from the visible lists (Best/Worst => d; Win Rate With => w). No JSON exists for these.
//   modes = { bounty:{...}, brawlBall:{...}, gemGrab:{...}, hotZone:{...}, knockout:{...}, ... }
//           opponents per mode from the JSON, 8 best + 8 worst, each with d and w; only modes with enough matches.
//   d = points above/below what both brawlers' overall win rates predict.  w = raw win rate for THIS brawler.
const fs = require("fs");
const vm = require("vm");
const path = require("path");
const { execFileSync } = require("child_process");

const EDGES_PATH = path.join(__dirname, "edges.js");
const BASE = "https://www.brawlplanet.com/brawlers/";
const DELAY_MS = 3000;

const HEADER = `// Matchup + teammate data, source: Brawl Planet brawler pages, Sept 2026. Built by scrape.js.
//   vs    = opponents overall;  with = teammates overall;  modes = opponents per game mode.
//   d = delta vs what both brawlers' overall win rates predict (is the matchup itself real?)
//   w = raw win rate for THIS brawler in that pairing (will I actually win the fight?)
// Overall opponent lists merge the page's embedded JSON (16 opponents, both numbers) with the visible
// top/bottom-5 lists. Per-mode lists come from the JSON only; a mode appears only where the brawler has enough matches in it.
const EDGES = {
`;

const SLUG = { "Starr Nova": "starr_nova", "8-Bit": "8-bit", "El Primo": "el_primo", "Larry & Lawrie": "larry_and_lawrie", "Mr. P": "mr._p", "R-T": "r-t", "Jae-Yong": "jae-yong" };
const slugOf = name => SLUG[name] || name.toLowerCase().replace(/ /g, "_");
const DISPLAY = Object.fromEntries(Object.entries(SLUG).map(([n, s]) => [s, n]));
const displayName = slug => DISPLAY[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);

const decode = s => s.replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"');

// ---- visible lists ----------------------------------------------------------
function section(html, heading) {
  const start = html.indexOf(`>${heading}</h3>`);
  if (start < 0) return null;
  const ulStart = html.indexOf("<ul", start);
  const ulEnd = html.indexOf("</ul>", ulStart);
  const ul = html.slice(ulStart, ulEnd);
  const out = [];
  const li = /text-gray-100">([^<]+)<\/span>[\s\S]*?tabular-nums[^"]*">([^<]+)<\/span>/g;
  let m;
  while ((m = li.exec(ul))) {
    const name = decode(m[1].trim());
    const raw = m[2].trim();
    const value = parseFloat(raw.replace("%", "").replace("+", "").replace(/[−–]/g, "-"));
    if (Number.isNaN(value)) throw new Error(`bad value "${raw}" for ${name} in ${heading}`);
    out.push({ name, value });
  }
  return out;
}
function merge(target, list, field) {
  for (const { name, value } of list) {
    target[name] = target[name] || {};
    if (target[name][field] === undefined) target[name][field] = value;
  }
}

// ---- embedded JSON ------------------------------------------------------------
function decodedPayload(html) {
  let text = "";
  const re = /self\.__next_f\.push\(\[1,"((?:[^"\\]|\\.)*)"\]\)/g;
  let m;
  while ((m = re.exec(html))) text += JSON.parse('"' + m[1] + '"');
  return text;
}
function objectAt(s, i) {
  let depth = 0, inStr = false;
  for (let j = i; j < s.length; j++) {
    const ch = s[j];
    if (inStr) { if (ch === "\\") j++; else if (ch === '"') inStr = false; continue; }
    if (ch === '"') inStr = true;
    else if (ch === "{") depth++;
    else if (ch === "}") { depth--; if (!depth) return s.slice(i, j + 1); }
  }
  return null;
}
// The page embeds an UPPERCASE -> display-name map ("SPROUT":"Sprout", "LARRY & LAWRIE":"Larry & Lawrie").
function nameMap(text) {
  const map = {};
  const re = /"([A-Z0-9][A-Z0-9 &.'\-]*)":"([^"]+)"/g;
  let m;
  while ((m = re.exec(text))) if (m[2].toUpperCase() === m[1]) map[m[1]] = m[2];
  return map;
}
function jsonCounters(text) {
  const i = text.indexOf('"counters":{');
  if (i < 0) return null;
  return JSON.parse(objectAt(text, i + '"counters":'.length));
}
function fromList(list, names, into, notes, label) {
  for (const e of list) {
    const name = names[e.brawler];
    if (!name) { notes.push(`${label}: no display name for ${e.brawler}`); continue; }
    into[name] = into[name] || {};
    if (e.adv !== undefined) into[name].d = e.adv;
    if (e.wr !== undefined) into[name].w = e.wr;
  }
}

// ---- one brawler ---------------------------------------------------------------
function scrape(slug) {
  const raw = execFileSync("curl", ["-sSL", "--fail", "-A", "draft-trainer scraper (personal, low volume)", BASE + slug],
    { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
  const cut = raw.indexOf("self.__next_f");
  const html = cut > 0 ? raw.slice(0, cut) : raw;
  const notes = [];
  const vs = {}, withT = {}, modes = {};

  // JSON first: it carries both numbers for every entry.
  const text = decodedPayload(raw);
  const counters = jsonCounters(text);
  if (counters) {
    const names = nameMap(text);
    fromList(counters.best || [], names, vs, notes, "best");
    fromList(counters.worst || [], names, vs, notes, "worst");
    for (const [mode, lists] of Object.entries(counters.modes || {})) {
      modes[mode] = {};
      fromList(lists.best || [], names, modes[mode], notes, `${mode}.best`);
      fromList(lists.worst || [], names, modes[mode], notes, `${mode}.worst`);
    }
  } else notes.push("no embedded counters JSON");

  // Visible lists: add names the JSON didn't have (never overwrite a JSON number).
  const grab = (h, heading) => {
    const list = section(h, heading);
    if (!list) { notes.push(`missing "${heading}"`); return []; }
    if (list.length < 5) notes.push(`"${heading}" has ${list.length} entries`);
    return list;
  };
  const againstIdx = html.indexOf("Win Rate Against</h2>");
  const withIdx = html.indexOf("Win Rate With</h2>");
  if (againstIdx < 0 || withIdx < 0) throw new Error(`${slug}: could not find Win Rate headings`);
  const againstHtml = html.slice(againstIdx, withIdx), withHtml = html.slice(withIdx);
  merge(vs, grab(html, "Strong Against"), "d");
  merge(vs, grab(html, "Struggles Against"), "d");
  merge(vs, grab(againstHtml, "Highest Win Rate"), "w");
  merge(vs, grab(againstHtml, "Lowest Win Rate"), "w");
  merge(withT, grab(html, "Best Teammates"), "d");
  merge(withT, grab(html, "Worst Teammates"), "d");
  merge(withT, grab(withHtml, "Highest Win Rate"), "w");
  merge(withT, grab(withHtml, "Lowest Win Rate"), "w");
  return { name: displayName(slug), vs, with: withT, modes, notes };
}

// ---- edges.js I/O ---------------------------------------------------------------
function fmtPairs(obj) {
  return Object.entries(obj).map(([n, v]) => {
    const parts = [];
    if (v.d !== undefined) parts.push(`d:${v.d}`);
    if (v.w !== undefined) parts.push(`w:${v.w}`);
    return `${JSON.stringify(n)}:{${parts.join(",")}}`;
  });
}
function wrap(items, indent) {
  const lines = []; let line = indent;
  for (const it of items) {
    const piece = (line === indent ? "" : " ") + it + ",";
    if (line.length + piece.length > 110 && line !== indent) { lines.push(line); line = indent + it + ","; }
    else line += piece;
  }
  lines.push(line);
  return lines.join("\n").replace(/,$/, "");
}
function entryText(e) {
  const modes = Object.entries(e.modes).map(([m, o]) => `      ${m}: {\n${wrap(fmtPairs(o), "        ")}\n      }`).join(",\n");
  return `  ${JSON.stringify(e.name)}: {\n    vs: {\n${wrap(fmtPairs(e.vs), "      ")}\n    },\n    with: {\n${wrap(fmtPairs(e.with), "      ")}\n    },\n    modes: {\n${modes}\n    }\n  }`;
}
function loadEdges() {
  if (!fs.existsSync(EDGES_PATH)) return {};
  const ctx = {};
  vm.runInNewContext(fs.readFileSync(EDGES_PATH, "utf8") + "\n;this.EDGES = EDGES;", ctx);
  return ctx.EDGES;
}
function append(e) {
  let src = fs.existsSync(EDGES_PATH) ? fs.readFileSync(EDGES_PATH, "utf8") : HEADER + "};\n";
  const close = src.lastIndexOf("};");
  let body = src.slice(0, close).replace(/\s+$/, "");
  if (!body.endsWith("{") && !body.endsWith(",")) body += ",";
  fs.writeFileSync(EDGES_PATH, body + "\n" + entryText(e) + "\n};\n");
}
function loadMaps() {
  const ctx = {};
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "mapdata.js"), "utf8") + "\n;this.MAPS = MAPS;", ctx);
  return ctx.MAPS;
}
function fieldNames() {
  const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
  return JSON.parse(html.match(/const FIELD=(\[[\s\S]*?\]);/)[1]);
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  let args = process.argv.slice(2);
  const check = args.includes("--check"), fresh = args.includes("--fresh");
  args = args.filter(a => !a.startsWith("--"));
  if (fresh) fs.writeFileSync(EDGES_PATH, HEADER + "};\n");
  const existing = check ? {} : loadEdges();
  let slugs = args;
  if (!slugs.length) {
    const all = [...new Set([...Object.keys(loadMaps()[0].wr), ...fieldNames()])];
    slugs = all.filter(n => !existing[n]).map(slugOf);
  }
  console.log(`${slugs.length} to scrape`);
  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    const e = scrape(slug);
    if (check) {
      console.log(JSON.stringify({ name: e.name, vs: e.vs, with: e.with, modes: Object.keys(e.modes) }, null, 1));
      if (e.notes.length) console.log("NOTES:", e.notes.join("; "));
      continue;
    }
    if (existing[e.name]) { console.log(`skip ${e.name}: already in edges.js`); continue; }
    append(e);
    const now = loadEdges(); // throws if the file no longer parses
    const wCount = Object.values(e.vs).filter(v => v.w !== undefined).length;
    console.log(`${e.name}: vs ${Object.keys(e.vs).length} (${wCount} with w), with ${Object.keys(e.with).length}, modes ${Object.keys(e.modes).length} -> EDGES has ${Object.keys(now).length}${e.notes.length ? "  NOTES: " + e.notes.join("; ") : ""}`);
    existing[e.name] = true;
    if (i < slugs.length - 1) await sleep(DELAY_MS);
  }
})().catch(err => { console.error("FAILED:", err.message); process.exit(1); });
