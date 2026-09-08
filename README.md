# Ranked Draft Trainer

Live at <https://kerryjones.github.io/bs-drafting/>. Three static files and their data; GitHub Pages
serves the repository root, so pushing to `main` publishes.

## Refreshing the data

```
./refresh.sh
```

Rebuilds every data file, then runs the checks. Takes roughly fifteen minutes because the scrapers
space their requests out on purpose. Nothing needs a key or a login. Review the diff, then commit and
push to publish.

`./refresh.sh maps` or `edges` rebuilds one file; `./refresh.sh check` only verifies.

**Read the check output before pushing.** The head-to-head test is the important one: it confirms the
win rates are genuine matchup figures by proving that every pairing published from both sides sums to
100. A source that fails it cannot be compared against 50% and must not be used.

Worth doing every couple of weeks, and after any balance patch. Every file records the date its data
reaches, and the footer of the page shows it.

## The files

| File | What it holds | Built by |
|---|---|---|
| `index.html` | The whole app: draft trainer and Maps tab | by hand |
| `mapdata.js` | Per-map Ranked win rates for the pool, one entry per map | `scrape-maps.js` |
| `edges.js` | Counters and teammates per brawler, with `d` | `scrape.js` |
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

Its numbers pass the head-to-head test exactly: across 1,177 pairings published from both sides, every
one sums to 100.0. For a given pairing the trainer takes, in order: this mode from the brawler's own
page, this mode from the enemy's page flipped, then the same two for all modes combined. Every figure
on screen is labelled with the mode it came from.

Portraits and map pictures are hotlinked from the public Google storage bucket both sites use. If they
ever move, `check-images.js` will say so.

## Dead ends, so nobody retries them

- **Brawl Time Ninja's matchup cube looks complete and is unusable.** Its `brawlerEnemies` cube returns
  every pairing per mode with match counts, reachable through the public token endpoint at
  `brawltime.ninja/api/auth.getToken`, and it was wired in on 2026-09-08 before being pulled out the
  same day. Its "win rate" is not a head-to-head figure. Across 406 pairs held in both directions the
  two sides averaged 123.6 instead of 100, and every brawler's mean sat near 63% instead of 50%, so
  comparing it to 50% called Mandy a counter to Edgar when Edgar in fact beats Mandy. Centring each
  brawler on its own average does not rescue it either: the antisymmetry correlation is 0.009, where
  1.0 would be perfect, so there is no head-to-head signal in it at all. The likely cause is that
  their sample is drawn from tracked players, who win far more often than average, and each direction
  of a pair comes from a different set of battle logs. `check.js` now runs this test on every source.
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
