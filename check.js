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

const POOL = JSON.parse(html.match(/const POOL=(\[[\s\S]*?\]);/)[1]);
const keys = Object.keys(EDGES);
console.log(`EDGES keys: ${keys.length}, maps: ${MAPS.length} (${MAPS.filter(m => m.active).length} in rotation)`);
let bad = 0;
// A pool brawler with too few matches on a map has no win rate there. The trainer simply doesn't offer
// it on that map, so gaps are reported, not treated as breakage. Real breakage: a map with no pool data.
const pool = POOL;
const gaps = MAPS.map(m => [m, pool.filter(k => !(k in m.wr))]).filter(([, g]) => g.length);
for (const [m, g] of gaps) console.log(`gap: ${m.name} (${m.active ? "in rotation" : "retired"}, ${(m.n / 1e3).toFixed(0)}k matches) has no win rate for ${g.join(", ")}`);
for (const m of MAPS) if (!Object.keys(m.wr).length) { console.log(`EMPTY: ${m.name} has no pool win rates`); bad++; }
for (const k of pool) if (!EDGES[k]) { console.log(`NO EDGES for pool brawler "${k}"`); bad++; }
for (const k of FIELD) if (!EDGES[k]) { console.log(`NO EDGES for field brawler "${k}"`); bad++; }
console.log(bad ? `${bad} problems` : `no problems: every map has pool win rates, every pool and field brawler has edges`);

// Opponent / teammate names that no draft can ever produce.
const known = new Set([...FIELD, ...POOL]);
const unknown = {};
for (const [k, e] of Object.entries(EDGES))
  for (const side of ["vs", "with"])
    for (const n of Object.keys(e[side])) if (!known.has(n)) (unknown[n] = unknown[n] || []).push(`${k}.${side}`);
const names = Object.keys(unknown).sort();
console.log(`\nnames in edges not in FIELD or map pool (${names.length}): ${names.join(", ")}`);

// Coverage: for each own brawler, how many FIELD opponents have a win rate, using the grader's lookup.
const MATRIX = fs.existsSync(path.join(__dirname, "matrix.js")) ? load("matrix.js", "MATRIX") : {};
const MODE_NAME = { bounty: "Bounty", brawlBall: "Brawl Ball", gemGrab: "Gem Grab", heist: "Heist", hotZone: "Hot Zone", knockout: "Knockout" };
const hasW = (a, b, key) => {
  const A = EDGES[a], B = EDGES[b], M = MATRIX[a] && MATRIX[a][b];
  return !!((key && A && A.modes && A.modes[key] && A.modes[key][b] && A.modes[key][b].w !== undefined) ||
            (key && B && B.modes && B.modes[key] && B.modes[key][a] && B.modes[key][a].w !== undefined) ||
            (key && M && M.modes && M.modes[MODE_NAME[key]]) ||
            (A && A.vs[b] && A.vs[b].w !== undefined) ||
            (B && B.vs[a] && B.vs[a].w !== undefined) ||
            (M && M.w !== undefined));
};

// The matrix should cover every pool brawler against every brawler the enemy can draft.
const matrixGaps = [];
for (const k of POOL) {
  if (!MATRIX[k]) { console.log(`NO MATRIX row for pool brawler "${k}"`); bad++; continue; }
  const miss = FIELD.filter(f => f !== k && !MATRIX[k][f]);
  if (miss.length) matrixGaps.push(`${k} (${miss.join(", ")})`);
}
console.log(`matrix: ${Object.keys(MATRIX).length} pool brawlers` + (matrixGaps.length ? `; opponents missing for ${matrixGaps.join("; ")}` : "; every field opponent present"));
const own = POOL;
const modeKeys = new Set();
for (const e of Object.values(EDGES)) for (const m of Object.keys(e.modes || {})) modeKeys.add(m);
console.log(`\nmode keys seen: ${[...modeKeys].sort().join(", ")}`);
for (const key of [null, "bounty", "brawlBall", "gemGrab", "heist", "hotZone", "knockout"]) {
  let tot = 0;
  for (const k of own) tot += FIELD.filter(f => f !== k && hasW(k, f, key)).length;
  console.log(`${key || "all modes only"}: avg FIELD opponents with a win rate per own brawler: ${(tot / own.length).toFixed(1)} of ${FIELD.length}`);
}
