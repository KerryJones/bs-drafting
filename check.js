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

// Are the win rates actually head-to-head? A real one means when A beats B x% of the time, B beats A
// (100 - x)% of the time, so every pairing published from both sides must sum to 100. This is the test
// that catches a source whose "win rate" is measured on some other population: a Brawl Time Ninja pull
// added in Sept 2026 averaged 123.6 and had to be thrown away. Never trust a new source without it.
{
  const sums = [];
  for (const a of Object.keys(EDGES)) for (const b of Object.keys(EDGES)) {
    if (a >= b) continue;
    const ab = EDGES[a].vs[b], ba = EDGES[b].vs[a];
    if (ab && ba && ab.w !== undefined && ba.w !== undefined) sums.push(ab.w + ba.w);
    for (const k of Object.keys(EDGES[a].modes || {})) {
      const mab = (EDGES[a].modes[k] || {})[b], mba = ((EDGES[b].modes || {})[k] || {})[a];
      if (mab && mba && mab.w !== undefined && mba.w !== undefined) sums.push(mab.w + mba.w);
    }
  }
  const avg = sums.reduce((x, y) => x + y, 0) / sums.length;
  const off = sums.filter(s => Math.abs(s - 100) > 1).length;
  const ok = Math.abs(avg - 100) < 0.5 && off === 0;
  console.log(`head-to-head test: ${sums.length} pairings held from both sides, mean sum ${avg.toFixed(1)}, ${off} off by more than a point — ${ok ? "PASS" : "FAIL"}`);
  if (!ok) bad++;
}

// Coverage: for each own brawler, how many FIELD opponents have a win rate, using the grader's lookup.
const hasW = (a, b, key) => {
  const A = EDGES[a], B = EDGES[b];
  return !!((key && A && A.modes && A.modes[key] && A.modes[key][b] && A.modes[key][b].w !== undefined) ||
            (key && B && B.modes && B.modes[key] && B.modes[key][a] && B.modes[key][a].w !== undefined) ||
            (A && A.vs[b] && A.vs[b].w !== undefined) ||
            (B && B.vs[a] && B.vs[a].w !== undefined));
};
const own = POOL;
const modeKeys = new Set();
for (const e of Object.values(EDGES)) for (const m of Object.keys(e.modes || {})) modeKeys.add(m);
console.log(`\nmode keys seen: ${[...modeKeys].sort().join(", ")}`);
for (const key of [null, "bounty", "brawlBall", "gemGrab", "heist", "hotZone", "knockout"]) {
  let tot = 0;
  for (const k of own) tot += FIELD.filter(f => f !== k && hasW(k, f, key)).length;
  console.log(`${key || "all modes only"}: avg FIELD opponents with a win rate per own brawler: ${(tot / own.length).toFixed(1)} of ${FIELD.length}`);
}
