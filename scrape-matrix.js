// Build matrix.js: the complete brawler-versus-brawler win rate table, from Brawl Time Ninja.
//   node scrape-matrix.js            scrape every pool brawler that isn't in matrix.js yet
//   node scrape-matrix.js --fresh    start a new matrix.js
//   node scrape-matrix.js --check <NAME>   print one brawler, don't write
//
// Why this exists: Brawl Planet publishes only each brawler's strongest and weakest opponents, so an
// even matchup in the middle of the range appears on neither side's page. Brawl Time Ninja's analytics
// cube holds every pairing, per mode, with the number of matches behind it.
//
// How the request works: brawltime.ninja/api/auth.getToken hands out the same short-lived token its own
// site uses, then cube.brawltime.ninja answers one query per brawler. One request returns that brawler
// against all ~106 others across every mode, so the whole job is one request per brawler in the pool.
//
// Population note: these numbers cover all players and all trophy ranges, unlike Brawl Planet's, which
// are Ranked at Diamond 1 and above. The trainer keeps the two apart and labels which one a figure
// came from; it never averages them.
const fs = require("fs");
const vm = require("vm");
const path = require("path");
const { execFileSync } = require("child_process");

const OUT = path.join(__dirname, "matrix.js");
const TOKEN_URL = "https://brawltime.ninja/api/auth.getToken";
const CUBE_URL = "https://cube.brawltime.ninja/cubejs-api/v1/load";
const DELAY_MS = 2500;
const MIN_PICKS = 300;          // below this a mode's figure is noise, so it is dropped
const SEASON_DAYS = 21;         // how far back to pull; brawltime buckets by season start date

// The six modes Ranked is played in, mapped to the mode names the trainer uses.
const MODES = { gemGrab: "Gem Grab", brawlBall: "Brawl Ball", heist: "Heist", bounty: "Bounty", hotZone: "Hot Zone", knockout: "Knockout" };

const HEADER = `// Complete brawler-versus-brawler win rates, source: Brawl Time Ninja analytics cube.
// Built by scrape-matrix.js. Covers ALL players and trophy ranges, so these are a different
// population from edges.js, which is Ranked at Diamond 1 and above. Never average the two.
//   w = this brawler's win rate against that opponent, %
//   n = matches behind it
//   modes = the same split for each Ranked mode, where the sample was big enough
const MATRIX = {
`;

const sh = (cmd, args) => execFileSync(cmd, args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });

function getToken() {
  const body = sh("curl", ["-sS", "--max-time", "30", "-X", "POST", TOKEN_URL, "-H", "content-type: application/json", "-d", "{}"]);
  const t = JSON.parse(body).result.data.json.token;
  if (!t) throw new Error("no token in response");
  return t;
}
function ask(token, query) {
  const url = `${CUBE_URL}?query=${encodeURIComponent(JSON.stringify(query))}&queryType=multi`;
  const j = JSON.parse(sh("curl", ["-sS", "--max-time", "120", "-H", "authorization: " + token, url]));
  if (j.error) throw new Error(j.error);
  return (j.results && j.results[0] && j.results[0].data) || j.data || [];
}
function seasonStart() {
  const d = new Date(Date.now() - SEASON_DAYS * 864e5);
  return d.toISOString().slice(0, 10);
}

function readList(name) {
  const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
  return JSON.parse(html.match(new RegExp(`const ${name}=(\\[[\\s\\S]*?\\]);`))[1]);
}

// brawltime names brawlers in upper case; map them back to the display names the trainer uses.
function displayMap() {
  const ctx = {};
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "edges.js"), "utf8") + ";this.E=EDGES;", ctx);
  const names = new Set([...readList("POOL"), ...readList("FIELD"), ...Object.keys(ctx.E)]);
  for (const e of Object.values(ctx.E)) { for (const k of Object.keys(e.vs)) names.add(k); for (const k of Object.keys(e.with)) names.add(k); }
  const map = {};
  for (const n of names) map[n.toUpperCase()] = n;
  return map;
}

function scrapeOne(token, name, display) {
  const rows = ask(token, {
    measures: ["brawlerEnemies.winRate_measure", "brawlerEnemies.picks_measure"],
    dimensions: ["brawlerEnemies.enemy_dimension", "brawlerEnemies.mode_dimension"],
    filters: [
      { member: "brawlerEnemies.season_dimension", operator: "gte", values: [seasonStart()] },
      { member: "brawlerEnemies.brawler_dimension", operator: "equals", values: [name.toUpperCase()] },
    ],
  });
  if (!rows.length) return { name, skip: "no rows" };

  const out = {};      // display name -> {w, n, modes:{Mode:{w,n}}}
  const unknown = new Set();
  for (const r of rows) {
    const raw = r["brawlerEnemies.enemy_dimension"];
    const foe = display[raw];
    if (!foe) { unknown.add(raw); continue; }
    if (foe === name) continue;                       // mirror match tells us nothing
    const mode = r["brawlerEnemies.mode_dimension"];
    const w = +r["brawlerEnemies.winRate_measure"];
    const n = +r["brawlerEnemies.picks_measure"];
    if (!(w >= 0) || !(n > 0)) continue;
    const e = (out[foe] = out[foe] || { wins: 0, n: 0, modes: {} });
    e.wins += w * n;                                   // overall = every mode, weighted by matches
    e.n += n;
    if (MODES[mode] && n >= MIN_PICKS) e.modes[MODES[mode]] = { w: +(100 * w).toFixed(1), n };
  }
  for (const e of Object.values(out)) { e.w = +(100 * e.wins / e.n).toFixed(1); delete e.wins; }
  return { name, vs: out, unknown: [...unknown] };
}

function fmt(name, vs) {
  const lines = Object.keys(vs).sort().map(foe => {
    const e = vs[foe];
    const modes = Object.keys(e.modes).sort().map(m => `${JSON.stringify(m)}:{w:${e.modes[m].w},n:${e.modes[m].n}}`).join(",");
    return `    ${JSON.stringify(foe)}:{w:${e.w},n:${e.n}${modes ? `,modes:{${modes}}` : ""}}`;
  });
  return `  ${JSON.stringify(name)}: {\n${lines.join(",\n")}\n  }`;
}
function load() {
  if (!fs.existsSync(OUT)) return {};
  const ctx = {};
  vm.runInNewContext(fs.readFileSync(OUT, "utf8") + ";this.M=MATRIX;", ctx);
  return ctx.M;
}
function append(name, vs) {
  let src = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8") : HEADER + "};\n";
  const close = src.lastIndexOf("};");
  let body = src.slice(0, close).replace(/\s+$/, "");
  if (!body.endsWith("{") && !body.endsWith(",")) body += ",";
  fs.writeFileSync(OUT, body + "\n" + fmt(name, vs) + "\n};\n");
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  let args = process.argv.slice(2);
  const check = args.includes("--check"), fresh = args.includes("--fresh");
  args = args.filter(a => !a.startsWith("--"));
  const display = displayMap();
  if (fresh) fs.writeFileSync(OUT, HEADER + "};\n");
  const have = check ? {} : load();
  const todo = (args.length ? args : readList("POOL")).filter(n => check || !have[n]);
  console.log(`${todo.length} brawlers to fetch, season from ${seasonStart()}`);
  let token = getToken(), gotAt = Date.now();
  for (let i = 0; i < todo.length; i++) {
    if (Date.now() - gotAt > 45 * 60e3) { token = getToken(); gotAt = Date.now(); }  // token lasts an hour
    const r = scrapeOne(token, todo[i], display);
    if (r.skip) { console.log(`skip ${r.name}: ${r.skip}`); continue; }
    if (check) { console.log(JSON.stringify(r.vs, null, 1).slice(0, 2000)); continue; }
    append(r.name, r.vs);
    load(); // throws if the file no longer parses
    const withMode = Object.values(r.vs).filter(v => Object.keys(v.modes).length).length;
    console.log(`${r.name}: ${Object.keys(r.vs).length} opponents, ${withMode} with per-mode figures${r.unknown.length ? `  (unmatched names: ${r.unknown.join(", ")})` : ""}`);
    if (i < todo.length - 1) await sleep(DELAY_MS);
  }
  console.log("done");
})().catch(err => { console.error("FAILED:", err.message); process.exit(1); });
