# Ranked Draft Trainer

Live at <https://kerryjones.github.io/bs-drafting/>. Three static files and their data; GitHub Pages
serves the repository root, so pushing to `main` publishes.

## Refreshing the data

```
./refresh.sh
```

Rebuilds every data file, then runs the checks. Takes roughly twenty minutes because the scrapers
space their requests out on purpose. Nothing needs a key or a login. Review the diff, then commit and
push to publish.

`./refresh.sh maps`, `edges`, or `matrix` rebuilds one file; `./refresh.sh check` only verifies.

Worth doing every couple of weeks, and after any balance patch. Every file records the date its data
reaches, and the footer of the page shows it.

## The files

| File | What it holds | Built by |
|---|---|---|
| `index.html` | The whole app: draft trainer and Maps tab | by hand |
| `mapdata.js` | Per-map Ranked win rates for the pool, one entry per map | `scrape-maps.js` |
| `edges.js` | Counters and teammates per brawler, with `d` | `scrape.js` |
| `matrix.js` | Every brawler-versus-brawler win rate, per mode | `scrape-matrix.js` |
| `check.js` | Cross-checks the three data files against each other | run by `refresh.sh` |
| `check-images.js` | Confirms every portrait and map picture still resolves | run by `refresh.sh` |

`index.html` holds `POOL`, the brawlers you can pick, and `FIELD`, the brawlers the simulated players
draft from. The scrapers read both out of it, so it is the single place to change either.

## Where the numbers come from

**Brawl Planet** (`mapdata.js`, `edges.js`) publishes Ranked matches at Diamond 1 and above, refreshed
hourly. Map pages embed the all-league win rate for every brawler; 188 maps exist in the six Ranked
modes but only about 46 have Ranked data, the rest being retired. Brawler pages embed each brawler's
eight strongest and eight weakest opponents overall and per mode, each with two numbers:

- `w` is the raw win rate in that pairing.
- `d` is how far that sits above or below what the two brawlers' overall win rates predict. It is what
  separates a real counter from a brawler who is simply strong this patch. Keep the sign.

Because it publishes only the extremes, most pairings are absent from it entirely. Edgar against Pierce
is on neither brawler's page, in any mode.

**Brawl Time Ninja** (`matrix.js`) fills those gaps. Its analytics cube holds every pairing with the
match count behind it. `brawltime.ninja/api/auth.getToken` hands out the same short-lived token the
site's own pages use, and one query per brawler returns that brawler against all ~106 others across
every mode. The catch is population: this covers all players and all trophy ranges, not Ranked at
Diamond and above, so its numbers run higher and are not interchangeable with Brawl Planet's.

The trainer keeps them apart and never averages them. For a given pairing it takes, in order: Brawl
Planet for this mode, Brawl Planet for this mode off the enemy's page, Brawl Time Ninja for this mode,
then the same three for all modes combined. Every figure on screen is labelled with the mode it came
from, which source, and the sample size where there is one.

Portraits and map pictures are hotlinked from the public Google storage bucket both sites use. If they
ever move, `check-images.js` will say so.

## Dead ends, so nobody retries them

- Brawlify and its API refuse requests outright; BrawlAce returns errors; brawlstats.com does not
  resolve. Pixelcrux has map and progress tools but no matchup data.
- The official Supercell API gives player and battle-log data, not aggregates. Building matchups from
  it would mean ingesting millions of battles yourself.
- Neither site publishes a full Ranked-only matchup table. Brawl Time Ninja's is complete but mixes
  populations; Brawl Planet's is Ranked but partial. That trade-off is why both are here.
- A class-versus-class rubric was measured as a way to fill the gaps before the matrix was found, by
  averaging `d` by brawler class. It is no longer needed, and the result is worth recording: assassins
  beat artillery, the throwers, by about 4.5 points, tanks and supports beat assassins by 2 to 3, and
  marksmen beat tanks by about 1.7. Assassins against marksmen came out at -0.2, so the common belief
  that divers beat snipers did not hold in the data.
