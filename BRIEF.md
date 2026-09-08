# Brief for Claude Code — finish the counter/synergy adjacency

Put `edges.js`, `mapdata.js` and `draft-trainer.html` in the working directory first, then give Claude Code the task below.

---

## Task

Extend `edges.js` from 2 brawlers to 29 by reading Brawl Planet brawler pages.

**Source:** `https://www.brawlplanet.com/brawlers/<slug>` — lowercase, hyphenated. Confirmed slugs: `8-bit`, `starr_nova`, `el_primo`, `larry_and_lawrie`, `mr._p`, `r-t`, `jae-yong`. Everything else is just the lowercase name.

**Brawlers to add (27).** Do the first seven first, then the rest:

Priority — completes my draftable core:
`starr_nova, 8-bit, brock, edgar, emz, mortis, nori`

Then — reverse edges on brawlers I face constantly:
`griff, bo, crow, bibi, nita, gray, leon, kit, mandy, colette, frank, cordelius, chuck, gale, lumi, shelly, ziggy, kaze, willow, trunk`

Already done, do not refetch: `bolt`, `surge`.

## What to pull from each page

Four sections, five entries each:

| Page section | Goes in | Field |
|---|---|---|
| Matchups → Strong Against / Struggles Against | `vs` | `d` |
| Win Rate Against → Highest / Lowest | `vs` | `w` |
| Teammates → Best / Worst | `with` | `d` |
| Win Rate With → Highest / Lowest | `with` | `w` |

The `d` list and the `w` list name **different brawlers** most of the time. Merge them by opponent name into one object — an entry can have `d` only, `w` only, or both. Do not fill in a missing field with a guess, and do not compute one from the other. They measure different things.

`d` is points above/below what both brawlers' overall win rates predict. `w` is the raw win rate. Keep the sign on `d`.

## Schema

Match the two existing entries exactly:

```js
"Starr Nova": {
  vs:   { "Grom":{d:9.7,w:74.7}, "Najia":{d:9.1}, "Wendy":{w:43.3} },
  with: { "Crow":{d:6.4}, "8-Bit":{w:68.9} }
},
```

Keys are display names as shown on the page (`8-Bit`, `Starr Nova`, `El Primo`, `Mr. P`, `Larry & Lawrie`, `R-T`), not slugs — they must match the brawler names already used in `mapdata.js` and in the trainer's `CORE8` / `FIELD` arrays.

## Rules

- Append to the existing `EDGES` object. Don't rewrite Bolt or Surge.
- One brawler per commit-sized step so a failure part-way doesn't lose the batch.
- After each brawler, run `node -e "..."` to eval the file and print the entry counts. If it doesn't parse, fix before continuing.
- If a page is missing a section or has fewer than five entries, record what's there and note it. Never pad.
- Space the requests out; this is a small fan site.

## Done when

`node` evals `edges.js` cleanly, `Object.keys(EDGES).length === 29`, and every key also appears in the `wr` map of every map in `mapdata.js`. Print any name that fails that cross-check — a mismatch means the grader will silently miss edges.

---

## Phase 2, only after the data is complete

Wire the grader in `draft-trainer.html`. Current behaviour: ranks available brawlers by map win rate alone and calls the top one "best available."

Replace with a two-axis frontier:

- **Axis 1 — map:** existing per-map win rate from `mapdata.js`.
- **Axis 2 — matchup:** for the pick, average the `w` values against each enemy brawler on the board where an edge exists. No edges → mark "no matchup data", don't substitute a number.

Then:
- A pick is **dominated** if another available brawler beats it on both axes. That's the error to flag.
- Otherwise it's **on the frontier** — show the other frontier options and what was traded.
- Score should count dominated picks, not "did you hit the single highest number."

Show the two axes as separate columns. Never blend them into one score — the weighting between them is a judgement call and shouldn't be hidden in a formula.

At pick 1 the board is empty, so it's map-only. Matchup should only carry weight at picks 4 and 5.

Use `d` only for labelling: an edge with positive `d` *and* `w` above 50 is a real counter; positive `d` with `w` under 50 means "loses, but less badly than expected" — say so rather than calling it a counter. Surge into Bolt is the worked example: `d` +4.4, `w` 40.3.
