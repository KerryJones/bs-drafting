#!/bin/bash
# Repopulate every data file from scratch, then check the result.
# Run this every couple of weeks, or after a balance patch.
#
#   ./refresh.sh            rebuild everything (about 15 minutes; it is deliberately slow)
#   ./refresh.sh maps       rebuild one file only: maps | edges
#   ./refresh.sh check      run the checks without fetching anything
#
# Nothing here needs a key or a login. The scrapers space their requests out on purpose;
# these are small fan sites and there is no rush.
set -e
cd "$(dirname "$0")"

run_maps()  { echo "== maps: per-map ranked win rates (Brawl Planet)"; node scrape-maps.js --fresh; }
run_edges() { echo "== edges: counters and teammates (Brawl Planet)";  node scrape.js      --fresh; }
run_check() { echo "== checks";  node check.js; echo; node check-images.js; }

case "${1:-all}" in
  maps)  run_maps;  run_check ;;
  edges) run_edges; run_check ;;
  check) run_check ;;
  all)   run_maps; run_edges; run_check ;;
  *) echo "usage: ./refresh.sh [all|maps|edges|check]"; exit 1 ;;
esac

echo
echo "Done. Review the diff, then commit and push to publish:"
echo "  git add -A && git commit -m 'Refresh stats' && git push"
