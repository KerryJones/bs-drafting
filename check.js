// Cross-check edges.js against mapdata.js and the trainer's FIELD list.
const fs = require("fs");
const vm = require("vm");
const path = require("path");
const load = (file, name) => {
  const ctx = {};
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, file), "utf8") + `\n;this.out = ${name};`, ctx);
  return ctx.out;
};
const EDGES = load("edges.js", "EDGES");
const MAPS = load("mapdata.js", "MAPS");
const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const FIELD = JSON.parse(html.match(/const FIELD=(\[[\s\S]*?\]);/)[1]);

const keys = Object.keys(EDGES);
console.log(`EDGES keys: ${keys.length}`);
let bad = 0;
// Every brawler in the pool must be in every map, and have edges. Enemy-only brawlers need edges only.
const pool = Object.keys(MAPS[0].wr);
for (const k of pool) for (const m of MAPS) if (!(k in m.wr)) { console.log(`MISSING: "${k}" not in ${m.name}`); bad++; }
for (const k of pool) if (!EDGES[k]) { console.log(`NO EDGES for pool brawler "${k}"`); bad++; }
for (const k of FIELD) if (!EDGES[k]) { console.log(`NO EDGES for field brawler "${k}"`); bad++; }
console.log(bad ? `${bad} mismatches` : `all ${pool.length} pool brawlers in every map; every pool and field brawler has edges`);

// Opponent / teammate names that no draft can ever produce.
const known = new Set([...FIELD, ...Object.keys(MAPS[0].wr)]);
const unknown = {};
for (const [k, e] of Object.entries(EDGES))
  for (const side of ["vs", "with"])
    for (const n of Object.keys(e[side])) if (!known.has(n)) (unknown[n] = unknown[n] || []).push(`${k}.${side}`);
const names = Object.keys(unknown).sort();
console.log(`\nnames in edges not in FIELD or map pool (${names.length}): ${names.join(", ")}`);

// Coverage: for each own brawler, how many FIELD opponents have a win rate, using the grader's lookup
// (own page for the mode, enemy's page for the mode, own page overall, enemy's page overall).
const hasW = (a, b, key) => {
  const A = EDGES[a], B = EDGES[b];
  return !!((key && A && A.modes && A.modes[key] && A.modes[key][b] && A.modes[key][b].w !== undefined) ||
            (key && B && B.modes && B.modes[key] && B.modes[key][a] && B.modes[key][a].w !== undefined) ||
            (A && A.vs[b] && A.vs[b].w !== undefined) ||
            (B && B.vs[a] && B.vs[a].w !== undefined));
};
const own = Object.keys(MAPS[0].wr);
const modeKeys = new Set();
for (const e of Object.values(EDGES)) for (const m of Object.keys(e.modes || {})) modeKeys.add(m);
console.log(`\nmode keys seen: ${[...modeKeys].sort().join(", ")}`);
for (const key of [null, "bounty", "brawlBall", "gemGrab", "heist", "hotZone", "knockout"]) {
  let tot = 0;
  for (const k of own) tot += FIELD.filter(f => f !== k && hasW(k, f, key)).length;
  console.log(`${key || "all modes only"}: avg FIELD opponents with a win rate per own brawler: ${(tot / own.length).toFixed(1)} of ${FIELD.length}`);
}
