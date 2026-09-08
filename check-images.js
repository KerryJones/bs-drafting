// Verify every brawler the trainer can show has a portrait in the Brawl Planet bucket.
//   node check-images.js
const fs = require("fs");
const vm = require("vm");
const path = require("path");
const { execFileSync } = require("child_process");

const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const FIELD = JSON.parse(html.match(/const FIELD=(\[[\s\S]*?\]);/)[1]);
const ctx = {};
vm.runInNewContext(fs.readFileSync(path.join(__dirname, "mapdata.js"), "utf8") + "\n;this.MAPS = MAPS;", ctx);
const POOL = JSON.parse(html.match(/const POOL=(\[[\s\S]*?\]);/)[1]);
const names = [...new Set([...FIELD, ...POOL])].sort();

// Same rule the page uses: lowercase, spaces to underscores, everything else kept.
const slug = n => n.toLowerCase().replace(/ /g, "_");
const url = n => `https://storage.googleapis.com/brawlanalyzer-public/brawlers/${slug(n)}.png`;

const head = u => execFileSync("curl", ["-sI", "-o", "/dev/null", "-w", "%{http_code}", u], { encoding: "utf8" });

let bad = 0;
for (const n of names) {
  const code = head(url(n));
  if (code !== "200") { console.log(`${code}  brawler ${n}  ${url(n)}`); bad++; }
}
console.log(`${names.length} brawler portraits checked, ${bad} missing`);

// Map pictures: the page builds these from each map's img slug.
const mapUrl = m => `https://storage.googleapis.com/brawlanalyzer-public/map_images/${m.img}.png`;
let badMaps = 0;
for (const m of ctx.MAPS) {
  const code = head(mapUrl(m));
  if (code !== "200") { console.log(`${code}  map ${m.name} (${m.mode})  ${mapUrl(m)}`); badMaps++; }
}
console.log(`${ctx.MAPS.length} map pictures checked, ${badMaps} missing`);
