// Build mapdata.js from Brawl Planet map pages.
//   node scrape-maps.js            scrape every ranked map that isn't in mapdata.js yet
//   node scrape-maps.js --fresh    start a new mapdata.js
//   node scrape-maps.js --check <slug>   print one map, don't write
//
// Ranked modes only (the six played in Ranked). Each page embeds a defaultView object holding the
// all-league ranked win rate for every brawler, the match count, whether the map is in rotation, and
// the timestamp of the newest match in the sample.
const fs = require("fs");
const vm = require("vm");
const path = require("path");
const { execFileSync } = require("child_process");

const OUT = path.join(__dirname, "mapdata.js");
const BASE = "https://www.brawlplanet.com";
const DELAY_MS = 2500;

// Ranked is played in these six modes; the slug's suffix names the mode.
const MODES = { gemgrab: "Gem Grab", brawlball: "Brawl Ball", heist: "Heist", bounty: "Bounty", hotzone: "Hot Zone", knockout: "Knockout" };

const HEADER = `// Per-map RANKED win rates (all leagues), source: Brawl Planet map pages. Built by scrape-maps.js.
// Only brawlers in Kerry's pool (25 x Lv11 + 4 season-free) are recorded.
//   name/mode = as shown on the page;  img = map picture slug;  n = ranked matches in the sample
//   active    = the map was in the Ranked rotation when scraped
//   updated   = newest match in the sample (ISO date)
const MAPS = [
`;

const get = url => execFileSync("curl", ["-sSL", "--fail", "-A", "draft-trainer scraper (personal, low volume)", url],
  { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });

function payload(raw) {
  let t = "";
  const re = /self\.__next_f\.push\(\[1,"((?:[^"\\]|\\.)*)"\]\)/g;
  let m;
  while ((m = re.exec(raw))) t += JSON.parse('"' + m[1] + '"');
  return t;
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
const decodeEntities = s => s.replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&");

// The payload carries an UPPERCASE -> display-name map ("WENDY":"Wendy").
function nameMap(text) {
  const map = {};
  const re = /"([A-Z0-9][A-Z0-9 &.'\-]*)":"([^"]+)"/g;
  let m;
  while ((m = re.exec(text))) if (m[2].toUpperCase() === m[1]) map[m[1]] = m[2];
  return map;
}

function mapSlugs() {
  const html = get(BASE + "/maps");
  const slugs = [...new Set((html.match(/href="\/maps\/[a-z0-9_-]+"/g) || []).map(h => h.slice('href="/maps/'.length, -1)))];
  return slugs.filter(s => MODES[s.slice(s.lastIndexOf("_") + 1)]);
}

function scrapeMap(slug, pool) {
  const raw = get(`${BASE}/maps/${slug}`);
  const cut = raw.indexOf("self.__next_f");
  const html = cut > 0 ? raw.slice(0, cut) : raw;
  const text = payload(raw);
  const i = text.indexOf('{"mapId":');
  if (i < 0) return { slug, skip: "no ranked data block" };
  const o = JSON.parse(objectAt(text, i));
  const view = o.defaultView || {};
  const rows = view.individual || [];
  if (!rows.length) return { slug, skip: "no ranked win rates" };

  const names = nameMap(text);
  const wr = {};
  const missing = [];
  for (const r of rows) {
    const name = names[r.brawler];
    if (!name) { missing.push(r.brawler); continue; }
    if (pool.has(name) && r.wr !== undefined) wr[name] = r.wr;
  }
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const name = h1 ? decodeEntities(h1[1].replace(/<[^>]+>/g, "").trim()) : slug;
  const mode = MODES[slug.slice(slug.lastIndexOf("_") + 1)];
  const img = slug.slice(0, slug.lastIndexOf("_"));
  const n = view.match_count || 0;
  const updated = view.latest_match_time ? new Date(view.latest_match_time * 1000).toISOString().slice(0, 10) : null;
  const absent = [...pool].filter(p => wr[p] === undefined);
  return { slug, name, mode, img, n, active: !!view.active, updated, wr, absent, missing };
}

function fmtMap(m) {
  const entries = Object.entries(m.wr).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${JSON.stringify(k)}:${v}`);
  const lines = []; let line = "  ";
  for (const e of entries) {
    const piece = (line === "  " ? "" : "") + e + ",";
    if (line.length + piece.length > 110 && line !== "  ") { lines.push(line); line = "  " + e + ","; }
    else line += piece;
  }
  lines.push(line.replace(/,$/, ""));
  return `{name:${JSON.stringify(m.name)}, mode:${JSON.stringify(m.mode)}, img:${JSON.stringify(m.img)}, n:${m.n}, active:${m.active}, updated:${JSON.stringify(m.updated)}, wr:{\n${lines.join("\n")}}}`;
}
function loadMaps() {
  if (!fs.existsSync(OUT)) return [];
  const ctx = {};
  vm.runInNewContext(fs.readFileSync(OUT, "utf8") + "\n;this.MAPS = MAPS;", ctx);
  return ctx.MAPS;
}
function append(m) {
  let src = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8") : HEADER + "];\n";
  const close = src.lastIndexOf("];");
  let body = src.slice(0, close).replace(/\s+$/, "");
  if (!body.endsWith("[") && !body.endsWith(",")) body += ",";
  fs.writeFileSync(OUT, body + "\n" + fmtMap(m) + "\n];\n");
}
function poolNames() {
  // Single source of truth: the trainer's own POOL list.
  const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
  return new Set(JSON.parse(html.match(/const POOL=(\[[\s\S]*?\]);/)[1]));
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  let args = process.argv.slice(2);
  const check = args.includes("--check"), fresh = args.includes("--fresh");
  args = args.filter(a => !a.startsWith("--"));
  const pool = poolNames();  // read BEFORE --fresh wipes the file
  console.log(`pool: ${pool.size} brawlers`);
  if (fresh) fs.writeFileSync(OUT, HEADER + "];\n");
  const have = new Set(check ? [] : loadMaps().map(m => m.img + "|" + m.mode));
  let slugs = args.length ? args : mapSlugs();
  console.log(`${slugs.length} ranked maps listed`);
  let kept = 0, skipped = 0;
  for (let i = 0; i < slugs.length; i++) {
    let m;
    // A link on the index can 404 or a page can be missing its data; skip it and carry on.
    try { m = scrapeMap(slugs[i], pool); }
    catch (err) { console.log(`skip ${slugs[i]}: ${err.message.split("\n")[0]}`); skipped++; await sleep(DELAY_MS); continue; }
    if (m.skip) { console.log(`skip ${m.slug}: ${m.skip}`); skipped++; }
    else if (check) console.log(JSON.stringify(m, null, 1));
    else if (have.has(m.img + "|" + m.mode)) console.log(`skip ${m.slug}: already present`);
    else {
      append(m);
      loadMaps(); // throws if the file no longer parses
      kept++;
      const notes = [m.absent.length ? `no win rate for ${m.absent.join(", ")}` : "", m.missing.length ? `unknown ${[...new Set(m.missing)].join(", ")}` : ""].filter(Boolean).join("; ");
      console.log(`${m.name} (${m.mode}) ${m.active ? "in rotation" : "not in rotation"} n=${m.n} updated=${m.updated} brawlers=${Object.keys(m.wr).length}${notes ? "  NOTE: " + notes : ""}`);
    }
    if (i < slugs.length - 1) await sleep(DELAY_MS);
  }
  console.log(`done: ${kept} written, ${skipped} skipped`);
})().catch(err => { console.error("FAILED:", err.message); process.exit(1); });
