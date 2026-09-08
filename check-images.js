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
const names = [...new Set([...FIELD, ...Object.keys(ctx.MAPS[0].wr)])].sort();

// Same rule the page uses: lowercase, spaces to underscores, everything else kept.
const slug = n => n.toLowerCase().replace(/ /g, "_");
const url = n => `https://storage.googleapis.com/brawlanalyzer-public/brawlers/${slug(n)}.png`;

let bad = 0;
for (const n of names) {
  const code = execFileSync("curl", ["-sI", "-o", "/dev/null", "-w", "%{http_code}", url(n)], { encoding: "utf8" });
  if (code !== "200") { console.log(`${code}  ${n}  ${url(n)}`); bad++; }
}
console.log(`${names.length} checked, ${bad} missing`);
