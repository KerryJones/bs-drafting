// Matchup + teammate data, source: Brawl Planet brawler pages, Sept 2026. Built by scrape.js.
//   vs    = opponents overall;  with = teammates overall;  modes = opponents per game mode.
//   d = delta vs what both brawlers' overall win rates predict (is the matchup itself real?)
//   w = raw win rate for THIS brawler in that pairing (will I actually win the fight?)
// Overall opponent lists merge the page's embedded JSON (16 opponents, both numbers) with the visible
// top/bottom-5 lists. Per-mode lists come from the JSON only. No heist mode is published.
const EDGES = {
  "Nori": {
    vs: {
      "Chuck":{d:9.1,w:67.5}, "Jessie":{d:7.2,w:65}, "Barley":{d:7,w:70.7}, "Mico":{d:7,w:61.8},
      "Sprout":{d:6.5,w:63.6}, "Larry & Lawrie":{d:6.3,w:66.3}, "Dynamike":{d:5.2,w:69.9},
      "Penny":{d:4.9,w:64.4}, "R-T":{d:-8.3,w:44.2}, "Doug":{d:-6.7,w:48.5}, "Sirius":{d:-5.5,w:49.2},
      "Rosa":{d:-4.3,w:55.9}, "Pearl":{d:-4.2,w:51.6}, "Jacky":{d:-3.9,w:54.8}, "Trunk":{d:-3.7,w:53.8},
      "Fang":{d:-3.5,w:58.4}, "Colt":{w:67.7}, "Shelly":{w:67.5}, "Wendy":{w:38.3}, "Bolt":{w:43.5},
      "Damian":{w:46.4}
    },
    with: {
      "Barley":{d:7}, "Nita":{d:6.2}, "Rosa":{d:6}, "Ollie":{d:5.4}, "Pam":{d:4.9}, "Kit":{d:-9.3,w:52},
      "Mortis":{d:-9.2,w:48.4}, "Nani":{d:-7}, "Mandy":{d:-6}, "Stu":{d:-5.4}, "Wendy":{w:72.9},
      "Ash":{w:68.7}, "Bolt":{w:68.4}, "8-Bit":{w:67.6}, "R-T":{w:67.4}, "Edgar":{w:52.6}, "Leon":{w:53.5},
      "Lily":{w:53.5}
    },
    modes: {
      airHockey: {
        "Ziggy":{d:7.3,w:61.5}, "Nani":{d:7.2,w:65}, "Berry":{d:5.7,w:76.3}, "Mr. P":{d:5.7,w:79.4},
        "Penny":{d:5.6,w:68.1}, "Amber":{d:5.5,w:55.6}, "Barley":{d:5.1,w:75.3}, "Shade":{d:5.1,w:55.8},
        "Bolt":{d:-3.9,w:39.6}, "Doug":{d:-3.7,w:48.8}, "Fang":{d:-3.4,w:55.2}, "Clancy":{d:-3.3,w:51.5},
        "Ollie":{d:-3.2,w:63.3}, "Otis":{d:-2.9,w:62.2}, "Jacky":{d:-2.8,w:55}, "Bull":{d:-2.6,w:57.8}
      },
      bounty: {
        "Sprout":{d:7.5,w:58.1}, "Grom":{d:5.4,w:58.2}, "Larry & Lawrie":{d:5.4,w:62.5},
        "Ziggy":{d:4.8,w:60.3}, "Barley":{d:4.6,w:68.4}, "Dynamike":{d:4.3,w:60.7}, "Kenji":{d:3.5,w:55.3},
        "Squeak":{d:3.5,w:54.9}, "Doug":{d:-6.7,w:47.7}, "R-T":{d:-5.5,w:46.2}, "Buster":{d:-5.2,w:54.7},
        "Jacky":{d:-5.2,w:62.9}, "Trunk":{d:-4.9,w:59.3}, "Meeple":{d:-4.8,w:46.2}, "Surge":{d:-4.8,w:47.9},
        "Otis":{d:-4.3,w:55.3}
      },
      brawlBall: {
        "Larry & Lawrie":{d:7.7,w:63}, "Sprout":{d:7.6,w:68.7}, "Mr. P":{d:7.1,w:69.7}, "Gene":{d:6.8,w:74.2},
        "Barley":{d:6.5,w:68.2}, "Grom":{d:6.5,w:69.5}, "Mico":{d:6,w:69.2}, "Belle":{d:5.9,w:68.6},
        "Bolt":{d:-6.7,w:44.5}, "Doug":{d:-6.4,w:48.3}, "Sirius":{d:-5.5,w:49.4}, "Jacky":{d:-4.5,w:48.8},
        "Bull":{d:-4.3,w:59.1}, "Trunk":{d:-3.9,w:50.9}, "R-T":{d:-3.5,w:49.2}, "Fang":{d:-3.1,w:60.3}
      },
      duels: {
        "Mico":{d:5.1,w:60}, "Mandy":{d:4.5,w:65}, "Grom":{d:3.9,w:78.8}, "Kenji":{d:3.8,w:69.7},
        "Squeak":{d:3.6,w:72.2}, "Kaze":{d:3.5,w:59.1}, "Bo":{d:3.4,w:57.3}, "Najia":{d:3.3,w:52.3},
        "R-T":{d:-8.3,w:31.1}, "Rosa":{d:-5.4,w:43.5}, "Draco":{d:-4.9,w:39.1}, "Sam":{d:-4.6,w:46.1},
        "Bull":{d:-3.8,w:53.3}, "Trunk":{d:-3.7,w:47.6}, "Pearl":{d:-3.1,w:42.8}, "Ash":{d:-3,w:50.8}
      },
      gemGrab: {
        "Sprout":{d:11.7,w:71.6}, "Barley":{d:8.4,w:75.8}, "Grom":{d:8.3,w:75.8},
        "Larry & Lawrie":{d:8.2,w:70.2}, "Angelo":{d:7.3,w:70.2}, "Mr. P":{d:6.8,w:66.6},
        "Jae-Yong":{d:6.6,w:68.6}, "Eve":{d:6.2,w:64.2}, "Doug":{d:-8.5,w:44.8}, "Clancy":{d:-5.2,w:49.2},
        "R-T":{d:-4.7,w:51.3}, "Bull":{d:-4.4,w:54.2}, "Damian":{d:-4.3,w:42.5}, "Sirius":{d:-3.9,w:48.8},
        "Lily":{d:-2.9,w:56.2}, "Chester":{d:-2.8,w:51}
      },
      heist: {
        "Sprout":{d:12.7,w:83.6}, "Juju":{d:11.6,w:78.6}, "Willow":{d:9.6,w:79.9}, "Janet":{d:8.9,w:83.3},
        "Ziggy":{d:8.7,w:79.5}, "Barley":{d:8.5,w:79.6}, "Bo":{d:8.2,w:77.6}, "Moe":{d:8.2,w:78},
        "R-T":{d:-14.8,w:46}, "Otis":{d:-10,w:66.8}, "Cordelius":{d:-8,w:60.7}, "Ash":{d:-6.7,w:72},
        "Maisie":{d:-6.4,w:73.1}, "Clancy":{d:-6.3,w:71.1}, "Bull":{d:-5.8,w:59.3}, "Buzz":{d:-5.5,w:70.4}
      },
      hotZone: {
        "Sprout":{d:9.8,w:75.3}, "Barley":{d:8.2,w:71.2}, "Dynamike":{d:8.2,w:73.4}, "Mico":{d:8,w:66.8},
        "Larry & Lawrie":{d:7.9,w:69.5}, "Ziggy":{d:7.7,w:70.1}, "Juju":{d:6.2,w:59.1},
        "Wendy":{d:5.6,w:43.9}, "R-T":{d:-8.7,w:46.2}, "Doug":{d:-5.7,w:47.6}, "Bull":{d:-5.4,w:58.6},
        "Trunk":{d:-5.4,w:50.2}, "Fang":{d:-5,w:57.9}, "Gus":{d:-4.9,w:58.6}, "Rosa":{d:-4.9,w:59.2},
        "Otis":{d:-4.2,w:63.6}
      },
      knockout: {
        "Sprout":{d:8.6,w:59.8}, "Grom":{d:6.9,w:62.4}, "Larry & Lawrie":{d:5.6,w:60.6},
        "Mico":{d:5.2,w:58.2}, "Mr. P":{d:5.1,w:56.9}, "Ziggy":{d:4.6,w:60.3}, "Dynamike":{d:4.3,w:68.4},
        "Najia":{d:4.3,w:57}, "Doug":{d:-10.3,w:44.5}, "Sirius":{d:-9,w:42.8}, "Buster":{d:-6.8,w:44.8},
        "Ash":{d:-6.3,w:51}, "Bull":{d:-6.3,w:59.9}, "Rosa":{d:-6.1,w:58.8}, "Jacky":{d:-5.4,w:63.3},
        "Damian":{d:-5,w:48.1}
      }
    }
  },
  "Bolt": {
    vs: {
      "Sprout":{d:10.2,w:71.6}, "Grom":{d:9.7,w:74.7}, "Najia":{d:9.1,w:70.4}, "Ziggy":{d:8.3,w:71.5},
      "Bo":{d:8.1,w:67}, "Mico":{d:7.8,w:66.9}, "Larry & Lawrie":{d:7,w:71.1}, "Squeak":{d:6.7,w:70.1},
      "Damian":{d:-9.6,w:44.1}, "Rosa":{d:-7.4,w:56.9}, "Bull":{d:-7.3,w:58.7}, "Bibi":{d:-7.2,w:56.4},
      "Doug":{d:-7.1,w:52.4}, "Charlie":{d:-7,w:55.9}, "Clancy":{d:-6.9,w:56}, "Shelly":{d:-6.7,w:63.7},
      "Dynamike":{w:73.5}, "Wendy":{w:43.3}, "R-T":{w:52}, "Starr Nova":{w:52.8}
    },
    with: {
      "Crow":{d:6.4}, "Leon":{d:4.6}, "Piper":{d:4.3}, "Rico":{d:4.3}, "Byron":{d:4}, "Shade":{d:-12.8},
      "Hank":{d:-12.6,w:55.6}, "Rosa":{d:-11.4,w:51}, "El Primo":{d:-10.3,w:51.6}, "Sam":{d:-9.9},
      "Wendy":{w:73.3}, "8-Bit":{w:68.9}, "Damian":{w:68.6}, "Nori":{w:68.4}, "Starr Nova":{w:68.1},
      "Barley":{w:49.9}, "Jacky":{w:54.4}
    },
    modes: {
      airHockey: {
        "Mico":{d:8.7,w:73.7}, "Bo":{d:6.1,w:65.2}, "Sprout":{d:5.6,w:68.1}, "Mandy":{d:5.4,w:68},
        "Nani":{d:5.2,w:69.2}, "Sirius":{d:5.1,w:64.3}, "Alli":{d:4.9,w:67.2}, "Dynamike":{d:4.9,w:73.9},
        "Rosa":{d:-8.9,w:65.8}, "Charlie":{d:-8.7,w:59.3}, "Jacky":{d:-8.3,w:55.7}, "Clancy":{d:-6.8,w:54.4},
        "Damian":{d:-6,w:45.7}, "Gale":{d:-5.6,w:53.3}, "Otis":{d:-5.6,w:65.1}, "Maisie":{d:-5.3,w:61.7}
      },
      bounty: {
        "Grom":{d:11.7,w:78.3}, "Sprout":{d:10.1,w:74.6}, "Najia":{d:8.4,w:72.3}, "Tick":{d:8.2,w:70.6},
        "Mico":{d:7.9,w:71.4}, "Dynamike":{d:7.8,w:77.4}, "Bo":{d:7.2,w:70.6}, "Mr. P":{d:7,w:74.4},
        "Damian":{d:-18,w:44.6}, "Charlie":{d:-15.3,w:56.8}, "Shelly":{d:-11.5,w:65.2}, "Rosa":{d:-11,w:62.5},
        "Frank":{d:-10.9,w:58.6}, "Doug":{d:-10.8,w:57.1}, "Gale":{d:-10.4,w:63.1}, "Bull":{d:-10.3,w:64.1}
      },
      brawlBall: {
        "Larry & Lawrie":{d:7.7,w:61.7}, "Najia":{d:7.5,w:68.1}, "Sprout":{d:7,w:66.8}, "Ziggy":{d:7,w:64.4},
        "Nori":{d:6.7,w:55.5}, "Bo":{d:6.4,w:61.4}, "Byron":{d:6.4,w:67.8}, "Mico":{d:6,w:68},
        "Bibi":{d:-7.2,w:52.6}, "Damian":{d:-6.3,w:41}, "Gale":{d:-5.4,w:49.2}, "Bull":{d:-5,w:57.2},
        "Chuck":{d:-4.8,w:59.4}, "Jacky":{d:-4.6,w:47.5}, "Emz":{d:-3.8,w:56.2}, "Cordelius":{d:-2.8,w:54.7}
      },
      brawlBall5V5: {
        "Grom":{d:8.7,w:76.3}, "Squeak":{d:8,w:74.5}, "Dynamike":{d:7.2,w:76.6}, "Ziggy":{d:6.5,w:71.5},
        "Bo":{d:5.1,w:70.5}, "Penny":{d:5.1,w:71.6}, "Berry":{d:4.9,w:74.7}, "Mr. P":{d:4.9,w:72.7},
        "Charlie":{d:-16.5,w:50.1}, "Shade":{d:-14.1,w:50.6}, "Lumi":{d:-13.6,w:48.2}, "Wendy":{d:-13.6,w:28},
        "Gus":{d:-13.2,w:52.1}, "Rosa":{d:-13.1,w:55.5}, "Otis":{d:-12.3,w:49.8}, "Meeple":{d:-11.1,w:58.2}
      },
      deathmatch5v5: {
        "Grom":{d:10.6,w:71.7}, "Dynamike":{d:7.1,w:74.1}, "Ziggy":{d:6.9,w:71}, "Mr. P":{d:6.7,w:67.7},
        "Squeak":{d:6.1,w:68.2}, "Sprout":{d:5.4,w:69.1}, "Najia":{d:4.4,w:68.9}, "Tick":{d:4.4,w:66.9},
        "Jacky":{d:-15.1,w:57.3}, "Charlie":{d:-14,w:56.2}, "Damian":{d:-13.9,w:43.2}, "Sam":{d:-13.5,w:56.9},
        "8-Bit":{d:-13,w:43}, "Rosa":{d:-12.6,w:57.3}, "Hank":{d:-12.3,w:59.9}, "Trunk":{d:-11.3,w:60.7}
      },
      gemGrab: {
        "Bo":{d:11.2,w:70.6}, "Sprout":{d:10.4,w:79.7}, "Mico":{d:9.3,w:73.4}, "Dynamike":{d:8.8,w:79.2},
        "Squeak":{d:8.2,w:77}, "Brock":{d:7,w:76.4}, "Mortis":{d:6.7,w:70.9}, "Grom":{d:6.6,w:82.4},
        "Clancy":{d:-11.8,w:52.4}, "Damian":{d:-11.3,w:45.7}, "R-T":{d:-10.3,w:55.4},
        "Charlie":{d:-9.3,w:59.3}, "Gus":{d:-9.3,w:57.4}, "Shade":{d:-7.8,w:54.7}, "Gale":{d:-7.2,w:62.5},
        "Bull":{d:-7,w:61.1}
      },
      hotZone: {
        "Bo":{d:11,w:64.2}, "Ziggy":{d:10.4,w:74.4}, "Sprout":{d:8.7,w:75.8}, "Juju":{d:8.3,w:62.9},
        "Dynamike":{d:8,w:74.8}, "Mortis":{d:7.3,w:70.4}, "Penny":{d:7.1,w:66.9}, "Mico":{d:7,w:67.5},
        "Rosa":{d:-10.8,w:54.9}, "Gus":{d:-10.4,w:54.6}, "R-T":{d:-9.6,w:46.9}, "Damian":{d:-9.2,w:42.7},
        "Shelly":{d:-8.7,w:59.8}, "Bull":{d:-8.6,w:57.1}, "Charlie":{d:-8.1,w:63.2}, "Jacky":{d:-7.9,w:56.3}
      },
      knockout: {
        "Sprout":{d:13.4,w:71.1}, "Grom":{d:13,w:74.9}, "Mico":{d:12.6,w:72.1}, "Ziggy":{d:11.2,w:73.3},
        "Najia":{d:10.6,w:69.8}, "Mr. P":{d:9.9,w:68.3}, "Larry & Lawrie":{d:9.6,w:71.1},
        "Mortis":{d:7.9,w:72.9}, "Damian":{d:-17.5,w:42.2}, "Rosa":{d:-16.7,w:53.9}, "Jacky":{d:-16.5,w:57.7},
        "Doug":{d:-14.8,w:46.5}, "Bull":{d:-12.4,w:59.4}, "Bibi":{d:-11.6,w:56.7}, "Clancy":{d:-11.5,w:60.9},
        "Hank":{d:-10.7,w:49.3}
      }
    }
  },
  "Bibi": {
    vs: {
      "Bolt":{d:7.2,w:43.6}, "Mr. P":{d:5.7,w:56.1}, "Grom":{d:4.8,w:56.3}, "Eve":{d:4.5,w:55},
      "Penny":{d:4.4,w:54.4}, "Gene":{d:4.3,w:56.9}, "Wendy":{d:4.2,w:33.7}, "Sirius":{d:4.1,w:49.3},
      "Bea":{d:-4.7,w:47.3}, "Lumi":{d:-4.2,w:39}, "Lou":{d:-3.9,w:42.9}, "Colette":{d:-3.8,w:50.8},
      "Gus":{d:-3.8,w:41.9}, "Jacky":{d:-3.4,w:45.8}, "Maisie":{d:-3.4,w:46.5}, "El Primo":{d:-3.1,w:48.6},
      "Leon":{w:57.1}, "Colt":{w:56}, "Amber":{w:40.2}, "Shade":{w:40.6}, "Damian":{w:40.7}
    },
    with: {
      "Rosa":{d:8.2}, "Ollie":{d:7.3}, "Barley":{d:7}, "Jacky":{d:6.9}, "Berry":{d:5.8},
      "Gene":{d:-5.1,w:42.2}, "Wendy":{d:-3.7,w:66.1}, "Piper":{d:-3.3}, "Surge":{d:-2.2}, "Clancy":{d:-2.1},
      "Bolt":{w:62.5}, "Ash":{w:61.4}, "Damian":{w:60.9}, "R-T":{w:60.3}, "Colt":{w:41}, "Shelly":{w:41},
      "Crow":{w:42.3}, "Leon":{w:42.3}
    },
    modes: {
      airHockey: {
        "Alli":{d:4.7,w:56}, "Mico":{d:4.6,w:58.8}, "Bolt":{d:4.4,w:43.4}, "Larry & Lawrie":{d:3.1,w:68},
        "Kaze":{d:2.8,w:50.6}, "Hank":{d:2.7,w:52.3}, "Gene":{d:2.4,w:70.1}, "Sam":{d:2.4,w:49.3},
        "Clancy":{d:-3.3,w:46.8}, "Colette":{d:-3,w:51.7}, "Bea":{d:-2.7,w:51.3}, "Charlie":{d:-2.7,w:54.8},
        "Gale":{d:-2.3,w:45.4}, "Lumi":{d:-2.2,w:42.2}, "Jacky":{d:-2.1,w:51.1}, "Bull":{d:-2,w:53.8}
      },
      basketBrawl: {
        "Larry & Lawrie":{d:4.2,w:66.9}, "Alli":{d:4.1,w:58.5}, "Najia":{d:4.1,w:64.8}, "Finx":{d:4,w:53.2},
        "Nani":{d:4,w:56.7}, "Ziggy":{d:3.9,w:58.1}, "Mico":{d:3.8,w:59.3}, "Mr. P":{d:3.8,w:77.9},
        "Wendy":{d:-4.2,w:32.2}, "Colette":{d:-3.6,w:50.4}, "Bea":{d:-3.5,w:50.8}, "Maisie":{d:-2.4,w:49.7},
        "R-T":{d:-2.4,w:41.9}, "Charlie":{d:-2.2,w:55.7}, "Gus":{d:-2.2,w:49.4}, "Jacky":{d:-2,w:46.6}
      },
      bounty: {
        "Bolt":{d:7.2,w:39.5}, "Wendy":{d:6.8,w:35.3}, "Mortis":{d:4.6,w:51.9}, "Gigi":{d:4.2,w:52.7},
        "Kenji":{d:3.8,w:51.5}, "Mico":{d:3.6,w:49}, "Alli":{d:3.5,w:52.5}, "Kit":{d:3.4,w:48.9},
        "Clancy":{d:-6.9,w:53.8}, "Gale":{d:-5.7,w:51.2}, "Lou":{d:-5.6,w:51.4}, "Ollie":{d:-4.9,w:60.2},
        "Bea":{d:-4.6,w:47.8}, "Bull":{d:-4.6,w:53.6}, "El Primo":{d:-4.6,w:58.9}, "Pierce":{d:-4.3,w:41.7}
      },
      brawlArena: {
        "Sam":{d:6.7,w:66.5}, "Sprout":{d:6.2,w:59.1}, "Bonnie":{d:4.6,w:63.6}, "Willow":{d:4.3,w:61.5},
        "Mr. P":{d:4.2,w:57.9}, "Ziggy":{d:4.2,w:61.7}, "Larry & Lawrie":{d:3.8,w:55.2}, "Mico":{d:3.7,w:61},
        "Shade":{d:-4.9,w:38.8}, "Colette":{d:-4,w:46.2}, "El Primo":{d:-3.8,w:48.6}, "Buzz":{d:-3.5,w:45.8},
        "Gus":{d:-3.5,w:53.6}, "Bull":{d:-2.7,w:46.2}, "Stu":{d:-2.7,w:43.8}, "Wendy":{d:-2.6,w:22.5}
      },
      brawlBall: {
        "Bolt":{d:7.2,w:47.4}, "Sirius":{d:5.5,w:49.2}, "Wendy":{d:4.4,w:32.6}, "Eve":{d:4.3,w:55.2},
        "Mr. P":{d:4.2,w:55.9}, "Grom":{d:4,w:56.1}, "Penny":{d:3.9,w:54.1}, "Najia":{d:3.6,w:54.5},
        "Shelly":{d:-3,w:54.5}, "Colette":{d:-2.9,w:50.3}, "Bea":{d:-2.7,w:44.8}, "Gus":{d:-2.7,w:39.4},
        "Lumi":{d:-2.7,w:37.2}, "Fang":{d:-1.9,w:50.7}, "Lou":{d:-1.9,w:38.9}, "Colt":{d:-1.7,w:56.1}
      },
      brawlBall5V5: {
        "Barley":{d:4.3,w:63.2}, "Penny":{d:3.7,w:56.7}, "Gene":{d:3.6,w:62.8}, "Sprout":{d:3.6,w:62.2},
        "Squeak":{d:3.6,w:56.4}, "Angelo":{d:3.5,w:65.3}, "Mr. P":{d:3.4,w:57.8}, "Byron":{d:3,w:58.9},
        "Wendy":{d:-11.9,w:16.8}, "Lumi":{d:-7.5,w:40.3}, "Shade":{d:-7.4,w:43.5}, "Otis":{d:-6.3,w:41.8},
        "8-Bit":{d:-5.8,w:38.2}, "Gus":{d:-5.2,w:46.4}, "Rosa":{d:-3.9,w:51.5}, "Damian":{d:-3.7,w:38.6}
      },
      duels: {
        "Mr. P":{d:7.9,w:57.2}, "Ollie":{d:6.5,w:66.7}, "Eve":{d:5.7,w:53}, "Sandy":{d:5.7,w:61},
        "Sprout":{d:5.3,w:42.7}, "Larry & Lawrie":{d:5.2,w:63.8}, "Poco":{d:4.9,w:57.9},
        "Tick":{d:4.8,w:63.7}, "Moe":{d:-4,w:28.7}, "Colette":{d:-3.2,w:42.5}, "El Primo":{d:-3.2,w:45},
        "Pearl":{d:-2.6,w:31.2}, "Surge":{d:-2.6,w:41.7}, "Darryl":{d:-2.4,w:42.9}, "Gus":{d:-2.3,w:30.5},
        "Hank":{d:-2.3,w:42.2}
      },
      gemGrab: {
        "Bolt":{d:4.1,w:40.4}, "Sirius":{d:4.1,w:53}, "Finx":{d:3.7,w:55.5}, "Mico":{d:3.6,w:53.9},
        "Najia":{d:3,w:59.6}, "Angelo":{d:2.9,w:62.2}, "Gigi":{d:2.8,w:55.6}, "Penny":{d:2.8,w:57.2},
        "Clancy":{d:-3.6,w:47}, "Bull":{d:-2.8,w:52.1}, "Lou":{d:-2.8,w:54.1}, "Bea":{d:-2.7,w:58.4},
        "Colette":{d:-2.7,w:55.4}, "Tara":{d:-2.5,w:47.3}, "Melodie":{d:-2.4,w:57.1}, "Rosa":{d:-2.1,w:53.2}
      },
      heist: {
        "Sirius":{d:5,w:47.8}, "Gigi":{d:4.7,w:44.7}, "Meeple":{d:4,w:64}, "Bolt":{d:3.9,w:49.2},
        "Mortis":{d:3.9,w:65.9}, "Kaze":{d:3.8,w:44.8}, "Sam":{d:3.8,w:50.7}, "Nori":{d:3.7,w:34.8},
        "Lou":{d:-5,w:59.8}, "Jacky":{d:-4.2,w:64}, "Buzz":{d:-3.8,w:54.8}, "Ash":{d:-3.6,w:58.9},
        "Colette":{d:-3.5,w:54.7}, "Gene":{d:-3.1,w:85.8}, "Leon":{d:-3.1,w:63.1}, "Charlie":{d:-3,w:59.1}
      },
      hotZone: {
        "Wendy":{d:10.3,w:43.7}, "Bolt":{d:5.7,w:48.9}, "Sirius":{d:4.3,w:55.1}, "Buster":{d:3.7,w:61.8},
        "Mina":{d:3.7,w:53.6}, "Ollie":{d:3.6,w:71.7}, "Starr Nova":{d:3.5,w:48.3}, "Leon":{d:3.3,w:67.9},
        "Lou":{d:-4.8,w:48.2}, "R-T":{d:-3.7,w:45.9}, "Lumi":{d:-3.5,w:50}, "Colette":{d:-3.2,w:57.3},
        "Surge":{d:-2.1,w:50.4}, "Bea":{d:-2,w:64}, "Fang":{d:-2,w:55.9}, "Berry":{d:-1.9,w:51}
      },
      knockout: {
        "Wendy":{d:12.3,w:37.7}, "Bolt":{d:11.6,w:43.3}, "Kenji":{d:6.2,w:49.5}, "Buster":{d:5.5,w:44.7},
        "Ollie":{d:5.3,w:49.4}, "Mortis":{d:5.2,w:51.4}, "Gigi":{d:4.6,w:44.9}, "Clancy":{d:4.3,w:59.2},
        "Colette":{d:-6,w:45.9}, "Lou":{d:-5,w:37.4}, "Bea":{d:-4.8,w:43.1}, "Dynamike":{d:-4.7,w:47.1},
        "Crow":{d:-4.6,w:51.9}, "Shelly":{d:-4.5,w:48.8}, "Emz":{d:-4.3,w:47.9}, "Griff":{d:-3.5,w:39.8}
      }
    }
  },
  "Nita": {
    vs: {
      "Bonnie":{d:5.3,w:58.1}, "Ash":{d:5.2,w:48.3}, "Eve":{d:5.1,w:56.5}, "Gene":{d:4.8,w:58.3},
      "Pearl":{d:4.4,w:51.6}, "Ollie":{d:4,w:57.6}, "Charlie":{d:3.6,w:53.7}, "Wendy":{d:3.3,w:33.4},
      "Ziggy":{d:-3.8,w:46.7}, "Mandy":{d:-3.7,w:45.2}, "Dynamike":{d:-3.6,w:52.9}, "Pierce":{d:-3.3,w:43.2},
      "Piper":{d:-3.1,w:50.1}, "Bo":{d:-3,w:42.9}, "Sirius":{d:-3,w:43.1}, "Emz":{d:-2.9,w:48.7},
      "Shelly":{w:60}, "Colt":{w:57.1}, "Bolt":{w:39.4}, "Nori":{w:40}, "Starr Nova":{w:41.1},
      "Lumi":{w:41.2}
    },
    with: {
      "Nori":{d:6.2,w:66.2}, "Mico":{d:5.1,w:60.7}, "Kaze":{d:4.8}, "Buzz":{d:4.2}, "Leon":{d:4.1},
      "Angelo":{d:-13.2,w:38.3}, "Gene":{d:-11.8,w:36.3}, "Ollie":{d:-11.7,w:36.9}, "Bonnie":{d:-11.6,w:37.3},
      "Gus":{d:-11.1}, "Wendy":{w:72.8}, "Damian":{w:61.1}, "Starr Nova":{w:60.8}, "Eve":{w:40.2}
    },
    modes: {
      airHockey: {
        "Ollie":{d:10,w:64.7}, "Belle":{d:4.9,w:60.4}, "Charlie":{d:4.5,w:54.3}, "Gus":{d:4.5,w:46.4},
        "Eve":{d:3.9,w:65.5}, "Gigi":{d:3.3,w:42.5}, "Clancy":{d:3.2,w:45.6}, "Sandy":{d:2.7,w:49.2},
        "Mr. P":{d:-6.2,w:56.8}, "Mico":{d:-5.6,w:40.9}, "Larry & Lawrie":{d:-5.2,w:52.3},
        "Squeak":{d:-4.3,w:47.1}, "Janet":{d:-3.8,w:42.9}, "Bo":{d:-3.7,w:36.7}, "Dynamike":{d:-3.2,w:47.8},
        "Emz":{d:-3.2,w:43.6}
      },
      bounty: {
        "Rosa":{d:6.9,w:55.3}, "Charlie":{d:6.1,w:52.8}, "Sam":{d:6.1,w:50.6}, "Darryl":{d:5.9,w:56.7},
        "Jacky":{d:5.8,w:62.1}, "Kenji":{d:5.3,w:44.6}, "Pearl":{d:5,w:46.6}, "Bolt":{d:4.8,w:30.1},
        "Pierce":{d:-6,w:31.7}, "Emz":{d:-4.7,w:39.3}, "Bo":{d:-4.4,w:32.5}, "Mandy":{d:-4.4,w:33.4},
        "Sprout":{d:-4.4,w:33.8}, "Nani":{d:-4.2,w:30.6}, "Dynamike":{d:-3.9,w:39.8}, "Jessie":{d:-3.9,w:40}
      },
      brawlArena: {
        "Shade":{d:5.7,w:50.7}, "Gus":{d:4.7,w:63.2}, "Darryl":{d:4.5,w:59.2}, "Stu":{d:4,w:51.9},
        "Gray":{d:3.8,w:49.2}, "Kenji":{d:3.7,w:54.8}, "Angelo":{d:3.6,w:63}, "Chuck":{d:3.3,w:57.9},
        "Sirius":{d:-3.3,w:50.2}, "Mr. P":{d:-3,w:52.1}, "Bo":{d:-2.9,w:50}, "Jessie":{d:-2.7,w:48.3},
        "Lumi":{d:-2.7,w:49.9}, "Willow":{d:-2.7,w:55.8}, "Buster":{d:-2.6,w:42.1}, "Frank":{d:-2.4,w:53.3}
      },
      brawlBall: {
        "Gus":{d:5.4,w:50.2}, "Ash":{d:3,w:42.3}, "Charlie":{d:2.7,w:48.7}, "Wendy":{d:2.6,w:33.1},
        "Darryl":{d:2.4,w:53}, "Kenji":{d:2.2,w:53.3}, "Fang":{d:2.1,w:57.5}, "Eve":{d:1.9,w:55.6},
        "Ziggy":{d:-4.5,w:45.8}, "Dynamike":{d:-4.4,w:54.2}, "Lumi":{d:-4.3,w:38.2}, "Barley":{d:-3.8,w:49.8},
        "Sprout":{d:-3.6,w:49.2}, "Grom":{d:-3.3,w:51.6}, "Bo":{d:-2.8,w:45.1}, "Jessie":{d:-2.5,w:46.3}
      },
      brawlBall5V5: {
        "Shade":{d:9,w:53.6}, "Lumi":{d:8.5,w:50.1}, "Gus":{d:7.3,w:52.7}, "Gigi":{d:5.8,w:51.4},
        "Darryl":{d:5.7,w:48.9}, "Buster":{d:4.9,w:47.1}, "Damian":{d:4.9,w:41.4}, "Meeple":{d:4.7,w:54.7},
        "Angelo":{d:-5.2,w:50.6}, "Dynamike":{d:-4.9,w:45.2}, "Sprout":{d:-4.9,w:47.5},
        "Grom":{d:-4.7,w:43.3}, "Buzz":{d:-4.6,w:48.5}, "Spike":{d:-4.1,w:43.6}, "Najia":{d:-4,w:48.8},
        "Berry":{d:-3.8,w:46.6}
      },
      gemGrab: {
        "Eve":{d:5.3,w:56.6}, "Ollie":{d:4.2,w:63.5}, "Ash":{d:3.5,w:49.6}, "Kenji":{d:2.9,w:50.9},
        "Alli":{d:2.7,w:51.1}, "Jacky":{d:2.6,w:60.2}, "Kaze":{d:2.5,w:51.6}, "Wendy":{d:2.4,w:30.9},
        "Bo":{d:-3.8,w:38.5}, "Sprout":{d:-3.8,w:49.5}, "Ziggy":{d:-3.2,w:50.6}, "Lumi":{d:-3.1,w:44},
        "Sirius":{d:-3.1,w:42.8}, "Mandy":{d:-2.9,w:49.3}, "Barley":{d:-2.8,w:58.3},
        "Dynamike":{d:-2.8,w:51.7}
      },
      heist: {
        "Sandy":{d:3.7,w:86.7}, "Poco":{d:3.1,w:76.2}, "Buster":{d:3,w:77.9}, "Alli":{d:2.9,w:62.3},
        "Byron":{d:2.9,w:73.3}, "Fang":{d:2.7,w:71.4}, "Mortis":{d:2.5,w:69.8}, "Bonnie":{d:2.4,w:76.9},
        "Lumi":{d:-3.6,w:43.4}, "Janet":{d:-2.6,w:59.7}, "Ziggy":{d:-2.6,w:55.3}, "Sirius":{d:-2.4,w:46.2},
        "Pierce":{d:-2.3,w:52.8}, "Sprout":{d:-1.9,w:56.2}, "Dynamike":{d:-1.8,w:56.6},
        "Jessie":{d:-1.7,w:51.5}
      },
      hotZone: {
        "Gray":{d:6.1,w:59.7}, "Ash":{d:4.7,w:57.6}, "Wendy":{d:4.4,w:37.4}, "Alli":{d:4.3,w:63.6},
        "Draco":{d:4.3,w:51.6}, "Kenji":{d:4.3,w:53.4}, "Gus":{d:4.1,w:62.3}, "Clancy":{d:2.9,w:57.3},
        "Lumi":{d:-4.9,w:48.3}, "Ziggy":{d:-4.9,w:52.1}, "Dynamike":{d:-4.8,w:55.1}, "Jessie":{d:-4.8,w:44.4},
        "Barley":{d:-3.4,w:54.3}, "Emz":{d:-3.4,w:48.1}, "Grom":{d:-3.4,w:62.4}, "Juju":{d:-3.3,w:44}
      },
      knockout: {
        "Ash":{d:7.8,w:50.5}, "Bolt":{d:7,w:36.8}, "Damian":{d:7,w:45.7}, "Rosa":{d:5.5,w:56.1},
        "Ollie":{d:5.4,w:47.4}, "Pam":{d:5.2,w:50.2}, "Draco":{d:4.8,w:49.8}, "Sam":{d:4.8,w:48.9},
        "Sirius":{d:-7.1,w:30.3}, "Pierce":{d:-5.7,w:32.2}, "Mandy":{d:-5.2,w:35.3}, "Grom":{d:-5,w:35.9},
        "Chester":{d:-4.5,w:38}, "Griff":{d:-4.3,w:36.9}, "Bo":{d:-4.1,w:36.6}, "Dynamike":{d:-4.1,w:45.6}
      }
    }
  },
  "Edgar": {
    vs: {
      "Grom":{d:5.8,w:51.6}, "Ziggy":{d:5,w:48.9}, "Sirius":{d:4.5,w:44.2}, "Mr. P":{d:4.3,w:49},
      "Najia":{d:4,w:45.9}, "Squeak":{d:3.8,w:47.9}, "Mico":{d:3.7,w:43.4}, "Penny":{d:3.5,w:47.8},
      "R-T":{d:-5.3,w:32.2}, "Angelo":{d:-3.3,w:40.4}, "Stu":{d:-2.9,w:38.9}, "Wendy":{d:-2.9,w:22},
      "Gus":{d:-2.4,w:37.7}, "Mina":{d:-2.4,w:37.7}, "Shelly":{d:-2.3,w:49.7}, "Piper":{d:-2,w:44.7},
      "Barley":{w:51.9}, "Dynamike":{w:51.1}, "Leon":{w:50.8}, "Colt":{w:50.5}, "Bolt":{w:32.7},
      "Shade":{w:35.8}, "Starr Nova":{w:35.9}
    },
    with: {
      "Barley":{d:8.8}, "Rosa":{d:8.7}, "Juju":{d:7.2}, "Willow":{d:6.7}, "Lola":{d:6.6},
      "Shelly":{d:-4.7,w:32.7}, "Colette":{d:-4.4,w:36.1}, "Kenji":{d:-3.8}, "Wendy":{d:-3.7,w:61.5},
      "Frank":{d:-3.4}, "Bolt":{w:59.3}, "R-T":{w:56.3}, "Hank":{w:55.5}, "Ash":{w:55}, "Colt":{w:34.6},
      "Leon":{w:35.8}, "Crow":{w:35.9}
    },
    modes: {
      airHockey: {
        "Bonnie":{d:4.3,w:71.9}, "Charlie":{d:4.2,w:54.2}, "Grom":{d:3.9,w:60.1},
        "Larry & Lawrie":{d:3.7,w:61.3}, "Mr. P":{d:3.6,w:66.7}, "Pam":{d:3.5,w:60.5},
        "Barley":{d:3.4,w:62.4}, "Juju":{d:3.3,w:47.3}, "Wendy":{d:-3.9,w:25.5}, "Bolt":{d:-2.4,w:29.7},
        "R-T":{d:-1.8,w:36.6}, "Stu":{d:-1.8,w:40.6}, "Doug":{d:-1.6,w:38.8}, "Kit":{d:-1.4,w:43.3},
        "Mina":{d:-1.3,w:37.3}, "Chester":{d:-1.1,w:39.2}
      },
      basketBrawl: {
        "Mr. P":{d:5.1,w:73.1}, "Gene":{d:5,w:67.2}, "Bonnie":{d:4.7,w:65.9}, "Barley":{d:4.4,w:62.5},
        "Janet":{d:4.3,w:52.6}, "Pam":{d:4.3,w:53.8}, "Ziggy":{d:2.8,w:49.7}, "Buster":{d:2.5,w:49.8},
        "R-T":{d:-5.4,w:31.9}, "Doug":{d:-3.3,w:35.7}, "Wendy":{d:-2.9,w:27}, "Glowy":{d:-2.5,w:40.6},
        "Bolt":{d:-2.1,w:34.7}, "Cordelius":{d:-2.1,w:41.9}, "Mandy":{d:-2.1,w:46.9}, "Lumi":{d:-2,w:37.4}
      },
      bounty: {
        "Ziggy":{d:5.7,w:56.9}, "Larry & Lawrie":{d:4.3,w:57.1}, "Charlie":{d:4.2,w:59.2},
        "Grom":{d:4.2,w:52.6}, "Pam":{d:4.2,w:63.2}, "Amber":{d:4,w:52.1}, "Sprout":{d:4,w:50.2},
        "Squeak":{d:4,w:51.1}, "R-T":{d:-5.3,w:42}, "Wendy":{d:-4.9,w:23.4}, "Doug":{d:-4.4,w:45.7},
        "Piper":{d:-3.9,w:43.1}, "Angelo":{d:-3.8,w:43.6}, "Mina":{d:-3.8,w:41.1}, "Hank":{d:-3.5,w:43.5},
        "Stu":{d:-3,w:47.1}
      },
      brawlArena: {
        "Ollie":{d:9.8,w:66.9}, "Bonnie":{d:9.5,w:64.1}, "Charlie":{d:7.7,w:63.8}, "Eve":{d:7.6,w:64.5},
        "Meeple":{d:7.3,w:65}, "Rosa":{d:6.8,w:61.6}, "Ziggy":{d:6.8,w:59.8}, "Sprout":{d:6.7,w:55.1},
        "Shade":{d:-5.8,w:33.5}, "Wendy":{d:-4.5,w:17.3}, "Starr Nova":{d:-2.8,w:34.8},
        "Hank":{d:-2.7,w:35.7}, "Mina":{d:-2.1,w:45.6}, "Chester":{d:-2,w:42.9}, "Crow":{d:-2,w:48},
        "Buzz":{d:-1.9,w:42.8}
      },
      brawlBall: {
        "Sirius":{d:5.5,w:42.4}, "Grom":{d:5,w:50}, "Ziggy":{d:4.2,w:44.8}, "Mr. P":{d:4,w:48.6},
        "Damian":{d:3.7,w:35}, "Eve":{d:3,w:46.9}, "Bonnie":{d:2.9,w:45.1}, "Squeak":{d:2.9,w:44.8},
        "R-T":{d:-4.2,w:30.7}, "Nani":{d:-3.1,w:43.7}, "Shelly":{d:-2.8,w:47.7}, "Maisie":{d:-1.8,w:35.9},
        "Gus":{d:-1.7,w:33.7}, "Stu":{d:-1.6,w:37.4}, "Chuck":{d:-1.3,w:46.2}, "Finx":{d:-1.3,w:36.9}
      },
      brawlBall5V5: {
        "Mr. P":{d:6.6,w:54.1}, "Ziggy":{d:6.5,w:50.9}, "Larry & Lawrie":{d:6,w:56.8}, "Chuck":{d:5.9,w:59.2},
        "Barley":{d:5.6,w:57.7}, "Sprout":{d:5.5,w:57.2}, "Gene":{d:5.4,w:57.8}, "Squeak":{d:5.3,w:51.2},
        "Wendy":{d:-13.5,w:9.8}, "Shade":{d:-12.2,w:31.7}, "Lumi":{d:-8.8,w:32.1}, "Gus":{d:-7.8,w:36.9},
        "Otis":{d:-7.6,w:33.5}, "8-Bit":{d:-6.5,w:30.8}, "Meeple":{d:-5.7,w:43.6}, "Surge":{d:-5.3,w:35.8}
      },
      deathmatch5v5: {
        "Sam":{d:5.7,w:60.1}, "Nita":{d:5.3,w:61.8}, "Hank":{d:5.1,w:61.8}, "Lumi":{d:4.9,w:60.9},
        "Larry & Lawrie":{d:4.5,w:56.4}, "Jae-Yong":{d:4.4,w:57.1}, "Pam":{d:4.4,w:57.1},
        "Barley":{d:4.2,w:56.8}, "Wendy":{d:-10.2,w:21.7}, "Doug":{d:-5.1,w:35.3}, "8-Bit":{d:-3.3,w:35.7},
        "Damian":{d:-3.3,w:36.7}, "Mina":{d:-2.9,w:47.3}, "Surge":{d:-2.3,w:45.7}, "Buzz":{d:-2.2,w:53.5},
        "Starr Nova":{d:-2.1,w:42.6}
      },
      duels: {
        "Ollie":{d:7.6,w:66.4}, "Buster":{d:7,w:58.7}, "Larry & Lawrie":{d:6.7,w:63.8},
        "Mr. P":{d:5.8,w:53.6}, "Frank":{d:5.7,w:49.2}, "Berry":{d:4.8,w:65.8}, "Ziggy":{d:4.8,w:45.6},
        "Barley":{d:4.6,w:59.4}, "R-T":{d:-5.3,w:21.6}, "Stu":{d:-3.8,w:36.9}, "Bull":{d:-2.3,w:40.7},
        "Mina":{d:-2.2,w:34.3}, "Shelly":{d:-2,w:40.2}, "Wendy":{d:-2,w:24.6}, "Gus":{d:-1.9,w:29.5},
        "Finx":{d:-1.4,w:29.6}
      },
      gemGrab: {
        "Grom":{d:8.3,w:69.8}, "Barley":{d:6.3,w:67.6}, "Larry & Lawrie":{d:5.8,w:61.3},
        "Bonnie":{d:5.2,w:67.6}, "Mr. P":{d:4.8,w:58.1}, "Lola":{d:4.1,w:56.6}, "Willow":{d:4.1,w:61.9},
        "Ziggy":{d:3.9,w:57.9}, "Clancy":{d:-4,w:43.7}, "Wendy":{d:-3.2,w:25.4}, "Doug":{d:-2.8,w:43.8},
        "Mina":{d:-2.6,w:43.2}, "Bolt":{d:-2.5,w:31.2}, "Surge":{d:-2.5,w:45.7}, "Crow":{d:-2.1,w:47.5},
        "Mandy":{d:-1.9,w:50.5}
      },
      heist: {
        "Ollie":{d:5.2,w:90.2}, "Sprout":{d:4.9,w:55.2}, "Alli":{d:4.3,w:56}, "Ziggy":{d:4,w:54.1},
        "Poco":{d:3.6,w:70}, "Bolt":{d:3.4,w:46.7}, "Damian":{d:3.2,w:56.1}, "Grom":{d:3.2,w:65.3},
        "R-T":{d:-7,w:32.2}, "Hank":{d:-3,w:37.3}, "Lou":{d:-2.7,w:60.2}, "Eve":{d:-2.6,w:57.6},
        "Cordelius":{d:-2.5,w:45.1}, "Wendy":{d:-2.4,w:44.4}, "Otis":{d:-2,w:55.8}, "Fang":{d:-1.7,w:60}
      },
      hotZone: {
        "Bonnie":{d:6,w:70.1}, "Ziggy":{d:5.7,w:57.4}, "Gene":{d:5.3,w:77.3}, "Mr. P":{d:5.1,w:63.5},
        "Ollie":{d:4.6,w:67.5}, "Sirius":{d:4.6,w:49.6}, "Grom":{d:3.9,w:64.8}, "Sprout":{d:3.7,w:58.8},
        "R-T":{d:-6.2,w:37.7}, "Wendy":{d:-6.2,w:22.3}, "Surge":{d:-3.3,w:43.4}, "Chuck":{d:-3.1,w:41.5},
        "Hank":{d:-3.1,w:35.9}, "Lou":{d:-3.1,w:44.2}, "Fang":{d:-2.9,w:49.3}, "Griff":{d:-2.5,w:41.4}
      },
      knockout: {
        "Sirius":{d:6.4,w:42.4}, "Ziggy":{d:6.4,w:46}, "Grom":{d:6.3,w:45.8}, "Najia":{d:5.9,w:42.7},
        "Mr. P":{d:4.4,w:40.4}, "Mico":{d:4.1,w:41.1}, "Tick":{d:4.1,w:42.2}, "Squeak":{d:4,w:42.3},
        "R-T":{d:-4.2,w:31.2}, "Stu":{d:-3.4,w:37.3}, "Angelo":{d:-2.8,w:35.2}, "Max":{d:-2.8,w:36.6},
        "Shelly":{d:-2.8,w:46.9}, "Doug":{d:-2.7,w:36.1}, "Hank":{d:-2.6,w:35}, "Crow":{d:-2.4,w:50.5}
      },
      knockout5V5: {
        "Jacky":{d:5.2,w:60.9}, "Pam":{d:3.3,w:51.1}, "Bonnie":{d:3.1,w:53}, "Grom":{d:3.1,w:51.1},
        "Lou":{d:2.3,w:48.3}, "Ollie":{d:2.2,w:53.7}, "Barley":{d:2,w:53.9}, "Squeak":{d:2,w:47.7},
        "Lumi":{d:-5.5,w:28.8}, "Wendy":{d:-5.4,w:29.1}, "Rosa":{d:-5.1,w:33.8}, "Doug":{d:-4.6,w:42.4},
        "Gray":{d:-4.6,w:28.6}, "Damian":{d:-4.5,w:37.5}, "Hank":{d:-3.6,w:30.7},
        "Starr Nova":{d:-3.5,w:32.6}
      },
      wipeout: {
        "Barley":{d:6.5,w:62.6}, "Pam":{d:6.5,w:61.3}, "Sam":{d:5.9,w:56.6}, "Sirius":{d:4.9,w:46.2},
        "Sprout":{d:4.9,w:45.2}, "Mr. P":{d:4.8,w:51.1}, "Jacky":{d:4.6,w:63.6}, "Juju":{d:4.4,w:48.6},
        "Wendy":{d:-8.4,w:13.4}, "Angelo":{d:-6.7,w:35.1}, "R-T":{d:-4.8,w:34.9}, "Piper":{d:-4,w:40.8},
        "Bea":{d:-3.9,w:43.5}, "Mina":{d:-3.9,w:37.1}, "Stu":{d:-3.6,w:41.5}, "Doug":{d:-3.5,w:39.3}
      }
    }
  },
  "8-Bit": {
    vs: {
      "Jacky":{d:4.2,w:58}, "Ash":{d:3.8,w:50.6}, "Bolt":{d:3.6,w:44.4}, "Damian":{d:3.4,w:47.7},
      "Doug":{d:3.2,w:53.3}, "Ollie":{d:3.2,w:60.5}, "Lumi":{d:3,w:50.7}, "Wendy":{d:2.9,w:36.2},
      "Ziggy":{d:-7,w:47.2}, "Sprout":{d:-4.3,w:47.9}, "Dynamike":{d:-4.1,w:56}, "Sirius":{d:-3.7,w:46},
      "Grom":{d:-3.3,w:52.7}, "Najia":{d:-3.3,w:48.8}, "Barley":{d:-3,w:56}, "Gigi":{d:-2.9,w:46.6},
      "Shelly":{w:62.9}, "Colt":{w:61.8}, "Crow":{w:61}, "Leon":{w:60.3}, "Nori":{w:43.1}, "Shade":{w:46.3}
    },
    with: {
      "Nori":{d:4.2,w:67.6}, "Wendy":{d:3.8,w:77.2}, "Kaze":{d:3.4}, "Bull":{d:2.4}, "Doug":{d:2.3},
      "Charlie":{d:-6}, "Cordelius":{d:-5.7,w:48}, "Jacky":{d:-5.3}, "Hank":{d:-5}, "Rosa":{d:-4.8},
      "Bolt":{w:68.9}, "Damian":{w:66.4}, "Starr Nova":{w:66}, "Shelly":{w:44.8}, "Edgar":{w:46.8},
      "Leon":{w:47.5}, "Gene":{w:48.3}
    },
    modes: {
      airHockey: {
        "Jacky":{d:5.2,w:52.8}, "Clancy":{d:4.7,w:49.3}, "Fang":{d:2.9,w:51.3},
        "Larry & Lawrie":{d:2.9,w:62.5}, "Tick":{d:2.6,w:51.8}, "Gus":{d:2.5,w:46.7}, "Gale":{d:2.1,w:44.4},
        "Damian":{d:2,w:37.4}, "Squeak":{d:-5.5,w:48.1}, "Penny":{d:-5.4,w:47.2}, "Alli":{d:-5.3,w:40.5},
        "Gene":{d:-5.3,w:57.3}, "Willow":{d:-5.3,w:37.1}, "Ruffs":{d:-5,w:37.7}, "Grom":{d:-4.8,w:53.3},
        "Sprout":{d:-4.7,w:41.3}
      },
      bounty: {
        "Wendy":{d:9.4,w:39.8}, "Frank":{d:5.8,w:60.1}, "Bolt":{d:5.5,w:39.8}, "Sam":{d:5.1,w:60.3},
        "Sandy":{d:4.8,w:64.2}, "Jacky":{d:4.3,w:70.8}, "Hank":{d:4.2,w:53.7}, "Ash":{d:3.9,w:60.4},
        "Ziggy":{d:-6.7,w:47}, "Sprout":{d:-5,w:43.7}, "Grom":{d:-4.9,w:46}, "Penny":{d:-4.7,w:46.5},
        "Squeak":{d:-4.3,w:45.2}, "Dynamike":{d:-4.2,w:50.3}, "Otis":{d:-3.9,w:53.9}, "Bo":{d:-3.5,w:44}
      },
      brawlArena: {
        "Wendy":{d:4.7,w:40}, "Glowy":{d:3.1,w:71.1}, "Fang":{d:3,w:70.9}, "Doug":{d:2.2,w:70.4},
        "Frank":{d:2.2,w:68.2}, "Cordelius":{d:1.9,w:65.6}, "Leon":{d:1.9,w:64.7}, "Melodie":{d:1.8,w:71},
        "Shade":{d:-6.2,w:49.6}, "Ziggy":{d:-6.1,w:62.7}, "Gus":{d:-5.1,w:63.4}, "Buster":{d:-5,w:50.4},
        "Ollie":{d:-4.8,w:67.3}, "Bonnie":{d:-4.5,w:65.6}, "Sprout":{d:-4.4,w:60.3}, "Angelo":{d:-3.9,w:65.3}
      },
      brawlBall: {
        "Gus":{d:4.7,w:52.2}, "Bea":{d:4.1,w:57.2}, "Stu":{d:3.5,w:54.9}, "Fang":{d:3.2,w:61.3},
        "R-T":{d:2.8,w:49.9}, "Melodie":{d:2.1,w:54}, "Surge":{d:2.1,w:58.4}, "Maisie":{d:2,w:52},
        "Ziggy":{d:-10.4,w:42.7}, "Grom":{d:-7,w:50.7}, "Sirius":{d:-6.8,w:42.5}, "Penny":{d:-6.2,w:49.6},
        "Barley":{d:-5.7,w:50.6}, "Squeak":{d:-5.7,w:48.9}, "Gigi":{d:-5.2,w:43.1}, "Sprout":{d:-5.2,w:50.5}
      },
      brawlBall5V5: {
        "Wendy":{d:19.9,w:53.7}, "Damian":{d:10.2,w:58.5}, "Mina":{d:9,w:67}, "Cordelius":{d:8.9,w:73.7},
        "Bolt":{d:8.2,w:50.1}, "Buzz":{d:8.1,w:73}, "Edgar":{d:6.5,w:69.2}, "Starr Nova":{d:6.3,w:54.4},
        "Chuck":{d:-10.9,w:54.9}, "Ziggy":{d:-9.2,w:48.1}, "Sprout":{d:-8.9,w:55.3}, "Penny":{d:-8.7,w:50.2},
        "Grom":{d:-8.5,w:51.5}, "Barley":{d:-7.9,w:56.7}, "Gene":{d:-7.8,w:57.1}, "Berry":{d:-7.7,w:54.7}
      },
      deathmatch5v5: {
        "Wendy":{d:20.6,w:62.9}, "Bolt":{d:13,w:57}, "Damian":{d:9.5,w:60.5}, "Doug":{d:7.5,w:59},
        "Mina":{d:7.5,w:68.6}, "Mortis":{d:6.8,w:65.6}, "Nori":{d:5.7,w:60.1}, "Bibi":{d:5.6,w:67.2},
        "Barley":{d:-7.6,w:55.8}, "Ziggy":{d:-6.9,w:51.6}, "Dynamike":{d:-6.8,w:54.6}, "Willow":{d:-5.7,w:57},
        "Jacky":{d:-5.6,w:61.8}, "Nita":{d:-5.3,w:61.7}, "Eve":{d:-5.2,w:55}, "Jessie":{d:-5.2,w:54.7}
      },
      duels: {
        "Sam":{d:3.5,w:52.9}, "Eve":{d:3.3,w:61.8}, "R-T":{d:3,w:41.2}, "Tara":{d:2.9,w:54.5},
        "Rosa":{d:2.8,w:50.4}, "Clancy":{d:2.6,w:73.4}, "Darryl":{d:2.6,w:59.2}, "Gale":{d:2.5,w:55.3},
        "Alli":{d:-5,w:47.8}, "Squeak":{d:-4.1,w:63.3}, "Sandy":{d:-3.4,w:62.6}, "Draco":{d:-3.2,w:39.6},
        "Grom":{d:-3.1,w:70.9}, "Jessie":{d:-3,w:58.5}, "Melodie":{d:-2.7,w:63.9}, "Najia":{d:-2.5,w:45.2}
      },
      gemGrab: {
        "Melodie":{d:4.2,w:61.7}, "Ollie":{d:3.9,w:64.2}, "Bolt":{d:3.6,w:38.1}, "Fang":{d:2.5,w:54.5},
        "Ash":{d:2.4,w:49.6}, "Wendy":{d:2.4,w:31.8}, "Crow":{d:2.3,w:52.8}, "Lily":{d:2.3,w:55.7},
        "Ziggy":{d:-9.3,w:45.6}, "Willow":{d:-5.9,w:52.7}, "Barley":{d:-5.8,w:56.4}, "Sprout":{d:-5.1,w:49.2},
        "Angelo":{d:-4.8,w:52.6}, "Gigi":{d:-4.8,w:46}, "Grom":{d:-4.5,w:57.8}, "Penny":{d:-4.5,w:47.9}
      },
      heist: {
        "R-T":{d:3.7,w:51.6}, "Ollie":{d:3.1,w:92.1}, "Buster":{d:2.8,w:78.5}, "Fang":{d:2.6,w:72.2},
        "Jacky":{d:2.5,w:76.2}, "Melodie":{d:2.4,w:52.1}, "Angelo":{d:2.3,w:63.8}, "Juju":{d:2.2,w:56.8},
        "Ziggy":{d:-5.9,w:53}, "Hank":{d:-5.5,w:43.7}, "Gray":{d:-5,w:57.8}, "Mina":{d:-4.2,w:55.1},
        "Sirius":{d:-4.1,w:45.6}, "Gigi":{d:-3.8,w:42.8}, "Bolt":{d:-3.4,w:48.8}, "Wendy":{d:-3.4,w:52.3}
      },
      hotZone: {
        "Fang":{d:4.1,w:59.9}, "Tick":{d:3.8,w:54}, "R-T":{d:3.6,w:51.1}, "Frank":{d:3.4,w:55.3},
        "Doug":{d:3.1,w:49.1}, "Edgar":{d:2.4,w:56.1}, "Trunk":{d:2.3,w:50.6}, "Berry":{d:1.9,w:52.7},
        "Ziggy":{d:-5.8,w:49.5}, "Wendy":{d:-4.5,w:27.1}, "Larry & Lawrie":{d:-3.9,w:50.6},
        "Penny":{d:-3.9,w:47.1}, "Belle":{d:-3.8,w:63.9}, "Shade":{d:-3.8,w:45.4}, "Barley":{d:-3.7,w:52.2},
        "Sprout":{d:-3.6,w:55.1}
      },
      knockout: {
        "Frank":{d:4.7,w:55.8}, "Doug":{d:4,w:53.8}, "Fang":{d:3.5,w:60.2}, "Bolt":{d:3.3,w:41.8},
        "Darryl":{d:3.2,w:55}, "Hank":{d:3.1,w:51.6}, "Bibi":{d:2.5,w:60}, "Wendy":{d:2.3,w:33.9},
        "Ziggy":{d:-8.5,w:42.1}, "Clancy":{d:-6.5,w:55.7}, "Sirius":{d:-6,w:40.7}, "Grom":{d:-5.7,w:44.7},
        "Barley":{d:-4.9,w:51.6}, "Gigi":{d:-4.7,w:43.1}, "Larry & Lawrie":{d:-4.7,w:45.3},
        "Sprout":{d:-4.7,w:41.4}
      }
    }
  },
  "Starr Nova": {
    vs: {
      "Sprout":{d:4.1,w:61.4}, "Bo":{d:3.4,w:58.3}, "Barley":{d:3.3,w:67.2}, "Kaze":{d:3.3,w:60},
      "Dynamike":{d:3.2,w:68.2}, "Larry & Lawrie":{d:3.1,w:63.3}, "Mr. P":{d:2.7,w:62.8},
      "Stu":{d:2.7,w:59.9}, "Rosa":{d:-5.1,w:55.3}, "R-T":{d:-4.3,w:48.3}, "Pearl":{d:-2.9,w:53.1},
      "Jacky":{d:-2.7,w:56.2}, "Otis":{d:-2.5,w:55}, "Clancy":{d:-2.4,w:56.6}, "Sirius":{d:-2.3,w:52.6},
      "Trunk":{d:-2.2,w:55.6}, "Colt":{w:67.9}, "Shelly":{w:67.6}, "Leon":{w:66}, "Wendy":{w:37.2},
      "Bolt":{w:47.2}, "Damian":{w:49}, "Nori":{w:50.4}
    },
    with: {
      "Rico":{d:4.2}, "Crow":{d:4.1}, "Colt":{d:3.1}, "Shelly":{d:3.1}, "Charlie":{d:2.9}, "Mico":{d:-7.7},
      "Kit":{d:-7.5,w:54.1}, "Nani":{d:-7.5}, "Angelo":{d:-7.1,w:53}, "Mortis":{d:-6.2,w:51.8},
      "Wendy":{w:73.4}, "Ash":{w:68.6}, "Bolt":{w:68.1}, "Damian":{w:68}, "8-Bit":{w:66}, "Edgar":{w:54.1},
      "Leon":{w:54.7}
    },
    modes: {
      airHockey: {
        "Nani":{d:5.2,w:66}, "Draco":{d:5,w:60}, "Gigi":{d:4.3,w:58.9}, "Shade":{d:4.2,w:58.1},
        "Gene":{d:3.6,w:77.7}, "Mico":{d:3.6,w:65.5}, "Bo":{d:3.5,w:59.4}, "Dynamike":{d:3.5,w:69.5},
        "Jacky":{d:-4.1,w:56.7}, "Otis":{d:-3.7,w:64.1}, "Clancy":{d:-3.3,w:54.7}, "Wendy":{d:-2.7,w:40.8},
        "Pearl":{d:-2.5,w:65.8}, "Fang":{d:-2.3,w:59.3}, "Lou":{d:-2.2,w:57.2}, "Maisie":{d:-2.2,w:61.8}
      },
      bounty: {
        "Bolt":{d:6.2,w:44.6}, "Sam":{d:4,w:63.6}, "Wendy":{d:4,w:38.3}, "Sprout":{d:3.8,w:57},
        "Najia":{d:3.3,w:55.8}, "Tick":{d:3,w:53.9}, "Mortis":{d:2.9,w:56.9}, "Kaze":{d:2.8,w:58.8},
        "Otis":{d:-6.5,w:55.6}, "Pearl":{d:-5.6,w:51.1}, "Clancy":{d:-5,w:61.9}, "Surge":{d:-4.5,w:50.7},
        "Griff":{d:-4.1,w:52.2}, "Jacky":{d:-3.7,w:66.7}, "Maisie":{d:-3.7,w:58.8}, "Colette":{d:-3.6,w:58.8}
      },
      brawlBall: {
        "Gene":{d:6.5,w:74.7}, "Larry & Lawrie":{d:5.8,w:62}, "Nani":{d:5.5,w:70.8}, "Bo":{d:5.4,w:62.5},
        "Sprout":{d:5.4,w:67.3}, "Barley":{d:5.1,w:67.7}, "Belle":{d:5,w:68.6}, "Grom":{d:4.8,w:68.6},
        "Frank":{d:-3,w:59.3}, "Sirius":{d:-3,w:52.7}, "Bibi":{d:-2.8,w:59}, "Clancy":{d:-2.6,w:56.9},
        "Rosa":{d:-2.4,w:56.5}, "Bolt":{d:-2.2,w:50}, "Bull":{d:-2.1,w:62.1}, "Surge":{d:-2.1,w:60.4}
      },
      duels: {
        "Bo":{d:4.6,w:61.4}, "Mandy":{d:4.1,w:67.3}, "Dynamike":{d:4,w:73.6}, "Mr. P":{d:4,w:68.5},
        "Poco":{d:3.7,w:71.6}, "Nani":{d:3.5,w:57.8}, "Brock":{d:3.3,w:59.5}, "Leon":{d:3.3,w:66.9},
        "R-T":{d:-6.2,w:36.1}, "Jacky":{d:-6.1,w:65.5}, "Wendy":{d:-4.9,w:37.1}, "Rosa":{d:-4.6,w:47.3},
        "Ash":{d:-4.2,w:52.6}, "Moe":{d:-4.2,w:43.5}, "Clancy":{d:-4.1,w:70.1}, "Pearl":{d:-4,w:44.9}
      },
      gemGrab: {
        "Sprout":{d:6.8,w:69}, "Grom":{d:5.1,w:74.7}, "Barley":{d:4.6,w:74.1}, "Dynamike":{d:4.4,w:67.8},
        "Kaze":{d:4.2,w:62.5}, "Bolt":{d:3.9,w:46}, "Gray":{d:3.9,w:62.1}, "Mr. P":{d:3.8,w:65.9},
        "Clancy":{d:-5,w:51.6}, "Otis":{d:-3.9,w:58.7}, "Pearl":{d:-3.2,w:58}, "Charlie":{d:-2.7,w:58.6},
        "R-T":{d:-2.7,w:55.6}, "Trunk":{d:-2.7,w:57}, "Doug":{d:-2.5,w:53.1}, "Rosa":{d:-2.5,w:58.7}
      },
      hotZone: {
        "Sprout":{d:7.7,w:73.2}, "Ziggy":{d:6.1,w:68.5}, "Bo":{d:6,w:57.5}, "Dynamike":{d:5,w:70.2},
        "Barley":{d:4.9,w:67.9}, "Brock":{d:4.6,w:72}, "Tick":{d:4.5,w:62}, "Squeak":{d:4.2,w:68.7},
        "Otis":{d:-6.3,w:61.5}, "Bull":{d:-6,w:58.1}, "R-T":{d:-6,w:48.8}, "Rosa":{d:-5.5,w:58.6},
        "Jacky":{d:-5,w:57.6}, "Doug":{d:-4.1,w:49.2}, "Sam":{d:-4.1,w:56.9}, "Damian":{d:-3.9,w:46.3}
      },
      knockout: {
        "Mico":{d:4.6,w:56.7}, "Mr. P":{d:4.5,w:55.5}, "Angelo":{d:4.4,w:57.6},
        "Larry & Lawrie":{d:4.3,w:58.6}, "Kaze":{d:3.9,w:59.8}, "Max":{d:3.5,w:58.2}, "Sprout":{d:3.3,w:53.7},
        "Nani":{d:3.2,w:55.4}, "Sirius":{d:-5.3,w:45.7}, "Doug":{d:-4.5,w:49.6}, "Buster":{d:-4.1,w:46.8},
        "Frank":{d:-3.6,w:51.8}, "Clancy":{d:-3.3,w:62.8}, "Rosa":{d:-3.3,w:60.8}, "Griff":{d:-3,w:52.1},
        "Ash":{d:-2.8,w:53.7}
      }
    }
  },
  "Chuck": {
    vs: {
      "Ollie":{d:12.3,w:66.1}, "Gene":{d:10.8,w:64.5}, "Bonnie":{d:9.3,w:62.3}, "Eve":{d:8.8,w:60.4},
      "Ash":{d:8.7,w:52}, "Larry & Lawrie":{d:8.1,w:59.7}, "Sandy":{d:8,w:57}, "Pearl":{d:7.8,w:55.2},
      "Nori":{d:-9.1,w:32.5}, "Mico":{d:-7.9,w:38.4}, "Kaze":{d:-6.2,w:41.9}, "Bull":{d:-5.5,w:48.3},
      "Melodie":{d:-4.1,w:45.2}, "Gigi":{d:-3.4,w:42.7}, "Doug":{d:-2.9,w:43.7}, "Emz":{d:-2.6,w:49.2},
      "Wendy":{w:33.3}, "Bolt":{w:38}, "Damian":{w:39.1}
    },
    with: {
      "Emz":{d:5.4}, "Edgar":{d:4.7}, "Rico":{d:4.5}, "Colt":{d:3.8}, "Crow":{d:3.7}, "Rosa":{d:-13.4,w:36.7},
      "Willow":{d:-13.1,w:39.6}, "Meeple":{d:-12.4}, "Jacky":{d:-12.3}, "Sam":{d:-11.3}, "Wendy":{w:66.5},
      "Nori":{w:63}, "Shade":{w:58}, "Amber":{w:57.7}, "Bolt":{w:57.3}, "Gene":{w:38.5}, "Ollie":{w:39.3},
      "Jae-Yong":{w:39.6}
    },
    modes: {
      gemGrab: {
        "Angelo":{d:4,w:60}, "Bo":{d:3.7,w:45.8}, "Meg":{d:3.7,w:52.1}, "Sprout":{d:3.5,w:56.5},
        "Dynamike":{d:3.4,w:57.7}, "Piper":{d:3.3,w:58.5}, "Squeak":{d:3,w:55.4}, "Brock":{d:2.8,w:55.9},
        "Damian":{d:-5.9,w:33.9}, "Gus":{d:-5.2,w:44.7}, "Kit":{d:-4.8,w:43.6}, "Doug":{d:-4.6,w:41.6},
        "El Primo":{d:-4.6,w:52.4}, "Glowy":{d:-4.4,w:46}, "Ruffs":{d:-4.3,w:41.5}, "Hank":{d:-4.2,w:44.1}
      },
      heist: {
        "Gus":{d:7.6,w:72.4}, "Bea":{d:7.3,w:80.1}, "Meeple":{d:7.2,w:71.2}, "Belle":{d:6.9,w:78.3},
        "Ziggy":{d:6.7,w:63.1}, "Lou":{d:6.6,w:75.2}, "Shelly":{d:6.4,w:74.8}, "Poco":{d:6.2,w:78},
        "Gigi":{d:-6.8,w:37.2}, "Mico":{d:-6.5,w:37.1}, "Bolt":{d:-6.2,w:43.4}, "Nori":{d:-6.1,w:28.7},
        "Kaze":{d:-4.8,w:40.3}, "Shade":{d:-4.2,w:40.8}, "Melodie":{d:-2.8,w:44.2}, "Bull":{d:-2.7,w:47.2}
      },
      hotZone: {
        "Bo":{d:5.9,w:51.8}, "Dynamike":{d:5.4,w:65.4}, "Juju":{d:4.9,w:52.2}, "Grom":{d:4.2,w:70.1},
        "Larry & Lawrie":{d:4.2,w:60.3}, "Brock":{d:3.8,w:66.1}, "Barley":{d:3.5,w:61.2}, "Eve":{d:3.5,w:63},
        "Gus":{d:-8.5,w:49.6}, "Damian":{d:-7.2,w:37.4}, "Glowy":{d:-5.5,w:47}, "Bolt":{d:-5.3,w:37.5},
        "Draco":{d:-5.3,w:42.1}, "Ollie":{d:-4.6,w:63.2}, "R-T":{d:-4.6,w:44.7}, "Doug":{d:-4.3,w:43.5}
      }
    }
  },
  "Griff": {
    vs: {
      "Doug":{d:4.6,w:54.6}, "Kit":{d:4,w:56.1}, "Mortis":{d:3,w:59.2}, "Bolt":{d:2.3,w:42.8},
      "Gene":{d:2.3,w:59.2}, "Darryl":{d:2.2,w:57.4}, "Berry":{d:2,w:58.4}, "Jae-Yong":{d:2,w:56.3},
      "Gus":{d:-3.5,w:46.5}, "Piper":{d:-3.2,w:53.4}, "Bea":{d:-2.7,w:53.5}, "Meeple":{d:-2.7,w:48.1},
      "Rico":{d:-2.7,w:57.5}, "Dynamike":{d:-2.4,w:57.5}, "Ollie":{d:-2.3,w:54.8}, "Ziggy":{d:-2.2,w:51.7},
      "Shelly":{w:62.6}, "Colt":{w:60.6}, "Leon":{w:60}, "Edgar":{w:59.8}, "Wendy":{w:33.5}, "Shade":{w:44.4},
      "Amber":{w:45.4}, "Starr Nova":{w:45.4}
    },
    with: {
      "Rosa":{d:6.8}, "Trunk":{d:4.5}, "Sam":{d:4.4}, "Jacky":{d:4.1}, "Charlie":{d:3.1}, "Mr. P":{d:-4.9},
      "Nani":{d:-4.5}, "Gene":{d:-4.2,w:47.3}, "Mandy":{d:-4.1}, "Angelo":{d:-4}, "Wendy":{w:73.1},
      "Bolt":{w:67.3}, "Damian":{w:66.2}, "Starr Nova":{w:64.8}, "Ash":{w:64.4}, "Colt":{w:47.1},
      "Dynamike":{w:47.9}, "Shelly":{w:47.9}, "Rico":{w:48.3}
    },
    modes: {
      airHockey: {
        "Doug":{d:5.6,w:55.5}, "Trunk":{d:3.5,w:55}, "R-T":{d:3.3,w:51.1}, "Sirius":{d:3.1,w:53.4},
        "Kit":{d:2.9,w:57.3}, "Lumi":{d:2.3,w:48.8}, "Nori":{d:2.1,w:49.5}, "Chester":{d:1.9,w:51.8},
        "Ollie":{d:-5.5,w:58.6}, "Bonnie":{d:-5.1,w:70.3}, "Otis":{d:-4.8,w:57.9}, "Buster":{d:-4.7,w:57.3},
        "Grom":{d:-3.9,w:61.4}, "Belle":{d:-3.7,w:61.3}, "Charlie":{d:-3,w:56.5}, "Pearl":{d:-2.9,w:60.3}
      },
      basketBrawl: {
        "Kit":{d:5.2,w:59.2}, "Doug":{d:4.9,w:53.2}, "Ruffs":{d:4.3,w:58.3}, "Alli":{d:3.3,w:59.7},
        "Berry":{d:3.2,w:67.6}, "R-T":{d:3.2,w:49.5}, "Hank":{d:3.1,w:52}, "Glowy":{d:2.8,w:55.3},
        "Wendy":{d:-6.5,w:31.9}, "Gus":{d:-4.2,w:49.6}, "Otis":{d:-4.2,w:55.5}, "Sprout":{d:-4.2,w:51.2},
        "Shade":{d:-2.8,w:45.7}, "Willow":{d:-2.8,w:52.2}, "Clancy":{d:-2.7,w:49.1}, "Ollie":{d:-2.6,w:62.9}
      },
      bounty: {
        "Kit":{d:7.1,w:52.9}, "Doug":{d:6.4,w:57.1}, "Kenji":{d:6.3,w:54.3}, "Bolt":{d:6,w:38.6},
        "Glowy":{d:5.9,w:56.8}, "Alli":{d:5.3,w:54.6}, "Frank":{d:5.3,w:57.7}, "Draco":{d:5.1,w:60.4},
        "Grom":{d:-4.6,w:44.4}, "Dynamike":{d:-4.4,w:48.2}, "Angelo":{d:-4.2,w:43.9}, "Najia":{d:-3.8,w:42.3},
        "Piper":{d:-3.8,w:43.8}, "Sprout":{d:-3.4,w:43.5}, "Brock":{d:-3.1,w:42.3}, "Mandy":{d:-3.1,w:43.3}
      },
      brawlArena: {
        "Sam":{d:4.9,w:65.9}, "Doug":{d:4.7,w:62.6}, "Trunk":{d:4.2,w:62.2}, "Charlie":{d:3.8,w:65.3},
        "Kaze":{d:3.4,w:60.5}, "Ziggy":{d:3.4,w:62}, "Lola":{d:3.2,w:57.5}, "Rosa":{d:3.2,w:63.4},
        "Wendy":{d:-6.9,w:19}, "Gray":{d:-3.3,w:41.7}, "Bolt":{d:-2.5,w:37.4}, "Nori":{d:-2.4,w:38.6},
        "Tick":{d:-2.1,w:48.3}, "Mina":{d:-2,w:51.3}, "Starr Nova":{d:-2,w:41}, "Gigi":{d:-1.9,w:45}
      },
      brawlBall: {
        "Doug":{d:4.9,w:54.3}, "Jacky":{d:3.6,w:51.6}, "Berry":{d:3.5,w:58}, "Trunk":{d:3.4,w:52.9},
        "Kit":{d:3.2,w:59.3}, "Darryl":{d:3,w:56.6}, "Damian":{d:2.9,w:46.1}, "R-T":{d:2.9,w:50.2},
        "Gus":{d:-3.6,w:44.3}, "Rico":{d:-3.5,w:57.6}, "Chuck":{d:-3.3,w:57}, "Dynamike":{d:-3.3,w:58.2},
        "Meeple":{d:-3.2,w:47.9}, "Bonnie":{d:-2.6,w:52.4}, "Ziggy":{d:-2.6,w:50.8}, "Piper":{d:-2.4,w:59.1}
      },
      brawlBall5V5: {
        "Wendy":{d:9.6,w:41.3}, "Cordelius":{d:2.8,w:65.5}, "Finx":{d:2.8,w:60}, "Buzz":{d:2.7,w:65.4},
        "Edgar":{d:2.4,w:62.8}, "Lily":{d:2.1,w:62.5}, "Shelly":{d:2.1,w:65.1}, "Damian":{d:1.9,w:47.8},
        "Moe":{d:-3.2,w:52.1}, "Buster":{d:-3.1,w:48.9}, "Trunk":{d:-3,w:55.8}, "Gigi":{d:-2.8,w:52.6},
        "Sprout":{d:-2.5,w:59.5}, "Willow":{d:-2.2,w:58.1}, "Ziggy":{d:-2.1,w:52.9}, "Bonnie":{d:-2,w:56.7}
      },
      deathmatch5v5: {
        "Trunk":{d:8.8,w:67.4}, "Hank":{d:6.1,w:64.9}, "Jacky":{d:5.8,w:64.9}, "Sam":{d:5.7,w:62.3},
        "El Primo":{d:5.4,w:65}, "Rosa":{d:5.4,w:61.4}, "Kaze":{d:4.8,w:60.6}, "Frank":{d:4.7,w:62},
        "Grom":{d:-2.7,w:43.7}, "Bo":{d:-2.2,w:43.5}, "Penny":{d:-2.1,w:45.3}, "Mico":{d:-2,w:50.2},
        "Pierce":{d:-2,w:47.4}, "Belle":{d:-1.7,w:46.3}, "Najia":{d:-1.7,w:48.2}, "Piper":{d:-1.7,w:46.5}
      },
      duels: {
        "Trunk":{d:4.9,w:52.7}, "Bull":{d:4.3,w:58}, "Shelly":{d:4.1,w:57}, "Damian":{d:3.7,w:51.5},
        "Hank":{d:3.6,w:57.3}, "Doug":{d:3.2,w:55.3}, "Mortis":{d:2.6,w:64.9}, "Kaze":{d:2.5,w:54.7},
        "Gus":{d:-3.9,w:37.4}, "Mr. P":{d:-3.8,w:54.6}, "Lou":{d:-3.4,w:41.8}, "Wendy":{d:-3.3,w:32.5},
        "Amber":{d:-3,w:39.1}, "Gigi":{d:-3,w:41.6}, "Moe":{d:-3,w:38.4}, "Ollie":{d:-2.8,w:65.9}
      },
      gemGrab: {
        "Doug":{d:4.8,w:55.2}, "Hank":{d:3.1,w:55.5}, "Trunk":{d:3.1,w:57.6}, "Berry":{d:2.7,w:64.8},
        "Nori":{d:2.7,w:49.7}, "R-T":{d:2.6,w:55.7}, "Kenji":{d:2.5,w:54.4}, "Sam":{d:2.4,w:58},
        "Buster":{d:-3.4,w:56.3}, "Ziggy":{d:-2.7,w:55}, "Eve":{d:-2.6,w:52.6}, "Meeple":{d:-2.3,w:53.9},
        "Otis":{d:-2.1,w:55.5}, "Ollie":{d:-2,w:61}, "Gene":{d:-1.9,w:60.4}, "Wendy":{d:-1.9,w:29.8}
      },
      heist: {
        "Wendy":{d:5.6,w:57.9}, "Nori":{d:5.2,w:39.2}, "Doug":{d:4.1,w:55.7}, "Damian":{d:3.8,w:62.1},
        "Kaze":{d:3.7,w:48}, "Mortis":{d:3.1,w:68.2}, "Janet":{d:2.8,w:62.9}, "Mico":{d:2.7,w:45.5},
        "Sandy":{d:-5.7,w:75.9}, "Otis":{d:-4.7,w:58.3}, "Clancy":{d:-3.7,w:60.3}, "Belle":{d:-2.9,w:67.8},
        "Eve":{d:-2.9,w:62.4}, "Pam":{d:-2.9,w:67.1}, "Ash":{d:-2.1,w:63.6}, "Gale":{d:-2.1,w:68.4}
      },
      hotZone: {
        "Doug":{d:5.8,w:54.3}, "R-T":{d:4.6,w:54.6}, "Nori":{d:3.8,w:48.9}, "Buzz":{d:3.7,w:64.1},
        "Nani":{d:3.6,w:67.6}, "Frank":{d:3.3,w:57.6}, "Sirius":{d:3.3,w:54.4}, "Trunk":{d:3.3,w:54},
        "Gus":{d:-4.5,w:54.3}, "Eve":{d:-3.5,w:56.6}, "Buster":{d:-3.4,w:55}, "Meeple":{d:-3.1,w:56.8},
        "Surge":{d:-3,w:49.9}, "Juju":{d:-2.9,w:45.1}, "Ash":{d:-2.7,w:51}, "Belle":{d:-2.6,w:67.2}
      },
      knockout: {
        "Ash":{d:7.7,w:59.2}, "Doug":{d:7.4,w:56.4}, "Kenji":{d:6.9,w:56.9}, "Buzz":{d:6.8,w:62.2},
        "Darryl":{d:6.3,w:57.3}, "Sam":{d:6.3,w:59.3}, "El Primo":{d:5.8,w:66.2}, "Trunk":{d:5.6,w:65.6},
        "Grom":{d:-5.4,w:44.3}, "Brock":{d:-3.1,w:47.6}, "Dynamike":{d:-3.1,w:55.4}, "Tick":{d:-2.9,w:45.4},
        "Najia":{d:-2.8,w:44.1}, "Meeple":{d:-2.7,w:43.7}, "Mandy":{d:-2.5,w:46.7}, "Piper":{d:-2.5,w:53.2}
      }
    }
  },
  "Kaze": {
    vs: {
      "Chuck":{d:6.2,w:58.1}, "Dynamike":{d:5.7,w:64.3}, "Barley":{d:5.1,w:62.6}, "Jessie":{d:4.9,w:56.2},
      "Grom":{d:4.7,w:59.2}, "Penny":{d:3.7,w:56.8}, "Larry & Lawrie":{d:3.4,w:56.9}, "Sprout":{d:3.4,w:54},
      "Doug":{d:-6.5,w:42.1}, "Damian":{d:-6.1,w:36.7}, "Sirius":{d:-5.8,w:42.4}, "R-T":{d:-4.7,w:41.2},
      "Bolt":{d:-4.6,w:34.6}, "Glowy":{d:-4.3,w:45.1}, "Nori":{d:-3.9,w:39.5}, "Chester":{d:-3.7,w:46.3},
      "Colt":{w:61.5}, "Rico":{w:61}, "Shelly":{w:60.6}, "Wendy":{w:28.6}, "Starr Nova":{w:40}
    },
    with: {
      "Nita":{d:4.8}, "Rico":{d:4.7}, "Colt":{d:4.3}, "Crow":{d:3.6}, "Shelly":{d:3.5}, "Kit":{d:-8.4,w:46.9},
      "Mortis":{d:-6.2,w:45.3}, "Janet":{d:-6}, "Sirius":{d:-6}, "Gus":{d:-5.9}, "Wendy":{w:68.4},
      "Bolt":{w:62}, "Nori":{w:61.7}, "8-Bit":{w:60.9}, "Ash":{w:60.5}, "Alli":{w:47.5}, "Angelo":{w:48.4},
      "Gene":{w:48.6}
    },
    modes: {
      bounty: {
        "Grom":{d:5.7,w:55.1}, "Piper":{d:4.3,w:52.3}, "Angelo":{d:3.7,w:52.2}, "Sprout":{d:3.6,w:50.8},
        "Tick":{d:3.2,w:48.2}, "Dynamike":{d:3.1,w:56.1}, "Brock":{d:3,w:48.8}, "Belle":{d:2.6,w:52.4},
        "Chester":{d:-6,w:45.8}, "Damian":{d:-5.8,w:39.4}, "Ash":{d:-5.7,w:49.3}, "Lola":{d:-5.4,w:48.7},
        "Sirius":{d:-5.2,w:41.9}, "Amber":{d:-5,w:44.1}, "Colette":{d:-5,w:51.7}, "Glowy":{d:-5,w:46.3}
      },
      brawlBall: {
        "Dynamike":{d:6.1,w:65.6}, "Angelo":{d:5,w:72.8}, "Piper":{d:4.7,w:64.1}, "Barley":{d:4.3,w:58.7},
        "Belle":{d:4.2,w:59.7}, "Gene":{d:3.9,w:64.4}, "Chuck":{d:3.3,w:61.6}, "Brock":{d:3.2,w:58.6},
        "Doug":{d:-7,w:40.2}, "Damian":{d:-6.1,w:35}, "Bolt":{d:-5.9,w:37.9}, "Sirius":{d:-5.7,w:41.7},
        "Jacky":{d:-4.6,w:41.3}, "Chester":{d:-3.4,w:45.1}, "Starr Nova":{d:-3.2,w:38.5},
        "Mortis":{d:-3,w:53.6}
      },
      gemGrab: {
        "Angelo":{d:6.7,w:63.9}, "Dynamike":{d:5.7,w:61.1}, "Sprout":{d:5.7,w:59.8}, "Barley":{d:4.6,w:66.6},
        "Grom":{d:4.6,w:66.8}, "Belle":{d:4,w:64.9}, "Piper":{d:4,w:60.4}, "Juju":{d:3.7,w:54.7},
        "Doug":{d:-6.4,w:41}, "Sirius":{d:-5.7,w:41}, "Bolt":{d:-5.4,w:28.9}, "Sam":{d:-5.4,w:47.2},
        "Damian":{d:-5.1,w:35.8}, "R-T":{d:-4.4,w:45.7}, "Starr Nova":{d:-4.2,w:37.5}, "Ash":{d:-3.5,w:43.5}
      },
      heist: {
        "Tick":{d:10.9,w:78.3}, "Sprout":{d:10.8,w:72}, "Piper":{d:9.9,w:73.8}, "Grom":{d:9.3,w:81.2},
        "Squeak":{d:9.3,w:78.2}, "Barley":{d:9.1,w:70.5}, "Juju":{d:8.9,w:65.7}, "Emz":{d:8.8,w:62.3},
        "R-T":{d:-9.4,w:40.8}, "Cordelius":{d:-5.7,w:53}, "Buzz":{d:-5,w:62.1}, "Otis":{d:-4.8,w:63.4},
        "Bull":{d:-4.4,w:50.3}, "Ash":{d:-4.2,w:66.4}, "Gigi":{d:-4.1,w:44.8}, "Bibi":{d:-3.8,w:55.2}
      },
      hotZone: {
        "Belle":{d:6.3,w:71.9}, "Dynamike":{d:6.3,w:62.5}, "Ziggy":{d:5.9,w:58.9}, "Barley":{d:5.3,w:59},
        "Juju":{d:5,w:48.4}, "Sprout":{d:4.9,w:61.3}, "Mr. P":{d:4.5,w:64.4}, "Piper":{d:4.5,w:71.1},
        "Draco":{d:-5.4,w:37.9}, "Sirius":{d:-5.4,w:41}, "Glowy":{d:-5.3,w:43.2}, "Frank":{d:-5.2,w:44.4},
        "Shelly":{d:-5.2,w:53}, "Doug":{d:-5.1,w:38.6}, "Bolt":{d:-4.9,w:34}, "Chester":{d:-4.8,w:43.9}
      },
      knockout: {
        "Dynamike":{d:5.5,w:63.1}, "Grom":{d:4.4,w:53.2}, "Sprout":{d:3.7,w:48.2}, "Squeak":{d:3.3,w:50.9},
        "Piper":{d:3.2,w:58.1}, "Brock":{d:2.6,w:52.4}, "Colt":{d:2.2,w:63.3}, "Barley":{d:2.1,w:56.9},
        "Sirius":{d:-9.6,w:35.5}, "Doug":{d:-8.2,w:40}, "Damian":{d:-6.7,w:39.8}, "Bolt":{d:-6.4,w:30.6},
        "Wendy":{d:-6,w:24.2}, "Buster":{d:-5.5,w:39.4}, "Griff":{d:-5.4,w:43.8}, "Pearl":{d:-5,w:35.1}
      }
    }
  },
  "Emz": {
    vs: {
      "Charlie":{d:5,w:53.4}, "Buster":{d:4.8,w:52.5}, "Hank":{d:4.8,w:48.6}, "Damian":{d:4.3,w:43.5},
      "Ash":{d:4.2,w:45.7}, "Glowy":{d:3.7,w:49.4}, "Jacky":{d:3.7,w:52.2}, "Pearl":{d:3.7,w:49.3},
      "Piper":{d:-4.2,w:47.4}, "Dynamike":{d:-3.6,w:51.4}, "Najia":{d:-2.8,w:44}, "Byron":{d:-2.6,w:48.9},
      "Brock":{d:-2.4,w:46.4}, "Ziggy":{d:-2.4,w:46.4}, "Angelo":{d:-2.2,w:46.4}, "Bo":{d:-2.1,w:42.2},
      "Shelly":{w:58.1}, "Colt":{w:56}, "Ollie":{w:55.2}, "Leon":{w:55}, "Pam":{w:54.9}, "Wendy":{w:31.6},
      "Bolt":{w:36.8}, "Nori":{w:39.5}, "Starr Nova":{w:40.6}, "Shade":{w:42.1}
    },
    with: {
      "Sam":{d:7.1}, "Hank":{d:6.9,w:61.8}, "Melodie":{d:6.5}, "Rosa":{d:6.2}, "Buster":{d:6},
      "Piper":{d:-5.1}, "Belle":{d:-4.6}, "Byron":{d:-3.9}, "Gene":{d:-3.7}, "Rico":{d:-3.5,w:40.2},
      "Wendy":{w:72.6}, "Bolt":{w:64.2}, "Damian":{w:61.9}, "Mico":{w:59.6}, "Colt":{w:39.6}, "Leon":{w:40.6},
      "Shelly":{w:41.1}, "Crow":{w:41.9}
    },
    modes: {
      airHockey: {
        "Charlie":{d:6.1,w:59.1}, "Eve":{d:4.8,w:69.3}, "Pam":{d:4.5,w:64.5}, "Ash":{d:4.4,w:55.3},
        "Gene":{d:4,w:67.6}, "Buster":{d:3.9,w:59.5}, "Rosa":{d:3.7,w:64.9}, "Jacky":{d:3.6,w:52.3},
        "Ziggy":{d:-4,w:40.9}, "Mico":{d:-2.5,w:47.2}, "Moe":{d:-2.5,w:39.1}, "Dynamike":{d:-2,w:52.2},
        "Byron":{d:-1.8,w:55.7}, "Pierce":{d:-1.8,w:40.4}, "Nani":{d:-1.7,w:46.9}, "Willow":{d:-1.7,w:41.7}
      },
      basketBrawl: {
        "Charlie":{d:3.8,w:59.8}, "Gene":{d:3.8,w:70.9}, "Finx":{d:3.7,w:50.9}, "Wendy":{d:2.9,w:37.5},
        "Sandy":{d:2.6,w:54.3}, "Nita":{d:2.5,w:53.3}, "Belle":{d:2.3,w:67.8}, "Hank":{d:2.3,w:47.2},
        "Ziggy":{d:-6,w:46.3}, "Gigi":{d:-4.3,w:38}, "Alli":{d:-3.8,w:48.7}, "Nori":{d:-2.9,w:36.3},
        "Sprout":{d:-2.9,w:48.4}, "Ash":{d:-2.8,w:49.9}, "Kaze":{d:-2.8,w:45.1}, "Kenji":{d:-2.6,w:47.4}
      },
      bounty: {
        "Charlie":{d:8.3,w:61.1}, "Draco":{d:8.1,w:60.5}, "Ash":{d:7.7,w:59.5}, "Finx":{d:6.9,w:56.2},
        "Damian":{d:6.3,w:48.2}, "Lola":{d:6.3,w:57.1}, "Sandy":{d:6.2,w:61}, "Sam":{d:6.1,w:56.6},
        "Sprout":{d:-4.8,w:39.2}, "Dynamike":{d:-4.7,w:45.1}, "Najia":{d:-4.7,w:38.6},
        "Piper":{d:-4.7,w:40.2}, "Angelo":{d:-4.6,w:40.7}, "Tick":{d:-4.1,w:37.7}, "Byron":{d:-4,w:41.6},
        "Mandy":{d:-4,w:39.6}
      },
      brawlArena: {
        "Buster":{d:8.1,w:52.7}, "Hank":{d:7,w:50.9}, "Sirius":{d:6.7,w:60}, "Najia":{d:5.9,w:71.1},
        "Charlie":{d:5.6,w:67.3}, "Meeple":{d:5.2,w:68.4}, "Glowy":{d:4.3,w:62.2}, "Kit":{d:4,w:52.7},
        "Shade":{d:-4.4,w:40.4}, "Lily":{d:-3.3,w:49.1}, "Kenji":{d:-2.8,w:48}, "Nori":{d:-2.6,w:38.5},
        "Dynamike":{d:-2.3,w:48.2}, "Amber":{d:-2,w:46.2}, "Cordelius":{d:-1.9,w:51.2},
        "Byron":{d:-1.7,w:47.4}
      },
      brawlBall: {
        "Damian":{d:5.2,w:42.6}, "Charlie":{d:4.5,w:47.5}, "Wendy":{d:4.1,w:32.1}, "Bolt":{d:3.8,w:43.8},
        "Sirius":{d:3.8,w:47.3}, "Ash":{d:3.7,w:40.2}, "Doug":{d:3.5,w:46.8}, "Jacky":{d:3.2,w:45.2},
        "Dynamike":{d:-4.5,w:51.1}, "Ziggy":{d:-3.6,w:43.6}, "Sprout":{d:-2.7,w:47.1},
        "Barley":{d:-2.6,w:47.9}, "Mico":{d:-2.4,w:49.6}, "Najia":{d:-2.4,w:48.3}, "Mortis":{d:-2.2,w:50.4},
        "Willow":{d:-2.2,w:42.3}
      },
      brawlBall5V5: {
        "Wendy":{d:8.1,w:35.4}, "Angelo":{d:7.4,w:67.6}, "Charlie":{d:7.1,w:58.3}, "Juju":{d:5.8,w:64.1},
        "R-T":{d:5,w:58.1}, "Finx":{d:4.4,w:56.3}, "Hank":{d:4.4,w:57.9}, "Pam":{d:3.9,w:57},
        "Najia":{d:-3.4,w:53.9}, "Grom":{d:-2.9,w:49.5}, "Tick":{d:-2,w:47.1}, "Piper":{d:-1.9,w:51.6},
        "Fang":{d:-1.8,w:48}, "Bo":{d:-1.7,w:48.2}, "Crow":{d:-1.5,w:48.1}, "Gigi":{d:-1.5,w:48.6}
      },
      deathmatch5v5: {
        "Rosa":{d:8.4,w:60.4}, "Sam":{d:7.7,w:60.3}, "Nita":{d:7.5,w:62.2}, "Ash":{d:7.1,w:55.7},
        "Hank":{d:7.1,w:61.9}, "Lola":{d:7,w:60}, "Trunk":{d:7,w:61.5}, "Jacky":{d:6.4,w:61.5},
        "Grom":{d:-3.3,w:39.1}, "Najia":{d:-2.7,w:43.1}, "Ziggy":{d:-2.5,w:43}, "Tick":{d:-2.4,w:41.5},
        "Piper":{d:-2.3,w:41.8}, "Dynamike":{d:-1.8,w:46.9}, "Pierce":{d:-1.8,w:43.5}, "Bo":{d:-1.7,w:40}
      },
      duels: {
        "Juju":{d:6.7,w:43.2}, "Ash":{d:6,w:46.8}, "El Primo":{d:5.7,w:53.5}, "Rosa":{d:4.8,w:40.9},
        "Lola":{d:4.7,w:38.9}, "Pam":{d:4.6,w:36.4}, "Melodie":{d:4.5,w:60}, "Frank":{d:4,w:48.5},
        "Bolt":{d:-4.3,w:32.9}, "Najia":{d:-4.2,w:32}, "Mortis":{d:-3.8,w:49.1}, "Stu":{d:-3.8,w:38},
        "Glowy":{d:-3.6,w:26}, "Sprout":{d:-3.6,w:33.4}, "Gigi":{d:-3.5,w:31.9}, "Pierce":{d:-3.2,w:32.4}
      },
      gemGrab: {
        "Hank":{d:5.8,w:55.8}, "Finx":{d:4.1,w:54.4}, "Charlie":{d:3.5,w:57.3}, "Ollie":{d:3.1,w:63.8},
        "Shelly":{d:3.1,w:59.9}, "Frank":{d:2.9,w:58.1}, "Berry":{d:2.8,w:62.6}, "Jacky":{d:2.7,w:61.8},
        "Janet":{d:-3.4,w:43}, "Tick":{d:-3.4,w:47.5}, "Bo":{d:-3,w:40.8}, "Mortis":{d:-2.3,w:46.6},
        "Mico":{d:-2.2,w:46.5}, "Dynamike":{d:-2.1,w:53.9}, "Sprout":{d:-2,w:52.7}, "Brock":{d:-1.9,w:52.8}
      },
      heist: {
        "Mandy":{d:6.6,w:57.6}, "Sirius":{d:6.2,w:54.6}, "Hank":{d:5.8,w:53.6}, "Finx":{d:5.3,w:64.5},
        "Kit":{d:5.3,w:64.7}, "Nani":{d:5.2,w:54.6}, "R-T":{d:5,w:51.6}, "Damian":{d:4.2,w:64.6},
        "Kaze":{d:-8.8,w:37.7}, "Juju":{d:-5,w:48.4}, "Barley":{d:-4.3,w:53.7}, "Ziggy":{d:-3.9,w:53.7},
        "Meg":{d:-3.7,w:59.1}, "Dynamike":{d:-3.6,w:54.7}, "Trunk":{d:-3.6,w:49.3}, "Buster":{d:-2.9,w:71.9}
      },
      hotZone: {
        "Wendy":{d:6.6,w:38.3}, "Gene":{d:5.4,w:80.4}, "R-T":{d:5.2,w:52.8}, "Finx":{d:4.9,w:53.1},
        "Nani":{d:4.4,w:66.2}, "Shelly":{d:4.4,w:64.9}, "Ollie":{d:4.3,w:70.7}, "Charlie":{d:3.7,w:67.2},
        "Mico":{d:-3.6,w:48.1}, "Bo":{d:-3.4,w:41}, "Mortis":{d:-3.1,w:51.3}, "Surge":{d:-2.8,w:47.7},
        "Tick":{d:-2.8,w:47.6}, "Kenji":{d:-2.7,w:44.7}, "Ziggy":{d:-2.7,w:52.7}, "Nori":{d:-2.5,w:40.3}
      },
      knockout: {
        "Hank":{d:8.1,w:47.1}, "Rosa":{d:7.1,w:57.7}, "Ash":{d:6.9,w:49.6}, "Buster":{d:6.1,w:43.3},
        "Damian":{d:5.7,w:44.3}, "Jacky":{d:5.4,w:60.3}, "Ollie":{d:4.6,w:46.6}, "Doug":{d:4.5,w:44.8},
        "Mico":{d:-3.6,w:34.8}, "Dynamike":{d:-3.3,w:46.4}, "Grom":{d:-3.3,w:37.7}, "Angelo":{d:-3.2,w:36.2},
        "Ziggy":{d:-3.1,w:38}, "Belle":{d:-3,w:38.9}, "Sprout":{d:-2.8,w:34}, "Najia":{d:-2.5,w:35.7}
      },
      knockout5V5: {
        "Rosa":{d:6.5,w:45.8}, "Buster":{d:5.7,w:55}, "Otis":{d:3.8,w:50}, "Wendy":{d:3.4,w:38.2},
        "Lumi":{d:3.3,w:37.9}, "Jacky":{d:3.2,w:59.3}, "Draco":{d:2.8,w:43.8}, "Gray":{d:2.7,w:36.2},
        "Moe":{d:-3.9,w:37.9}, "Mico":{d:-3.6,w:39.9}, "Angelo":{d:-3.1,w:40.8}, "Gigi":{d:-2.8,w:43.4},
        "Najia":{d:-2.5,w:43.8}, "Sprout":{d:-2.4,w:39.3}, "Meeple":{d:-2.2,w:42.8}, "Kaze":{d:-2.1,w:42.8}
      }
    }
  },
  "Colette": {
    vs: {
      "Frank":{d:6.4,w:52.9}, "El Primo":{d:5.8,w:52.9}, "Ollie":{d:4.8,w:53}, "Sam":{d:4.5,w:47.4},
      "Bolt":{d:4.4,w:36.6}, "Jacky":{d:3.9,w:48.5}, "Rosa":{d:3.9,w:50.1}, "Bibi":{d:3.8,w:49.2},
      "Mico":{d:-5.4,w:35.4}, "Chuck":{d:-3.6,w:40.8}, "Mandy":{d:-3.3,w:40.2}, "Sprout":{d:-3.1,w:40},
      "Nani":{d:-2.7,w:39.7}, "Sirius":{d:-2.7,w:38}, "Tick":{d:-2.5,w:41}, "Bea":{d:-2.2,w:45.2},
      "Shelly":{w:55.1}, "Colt":{w:52.4}, "Wendy":{w:23.8}, "Nori":{w:34.5}, "Starr Nova":{w:37.4}
    },
    with: {
      "Shade":{d:4.5,w:58}, "Sam":{d:3.9}, "Rosa":{d:3.7}, "Gray":{d:3.6}, "Alli":{d:3.5},
      "Ollie":{d:-6.8,w:36.5}, "Buster":{d:-5.2}, "Edgar":{d:-4.4,w:36.1}, "Gene":{d:-3.2}, "Piper":{d:-3.2},
      "Wendy":{w:66.3}, "Bolt":{w:61.5}, "Damian":{w:58.3}, "Nori":{w:58.1}, "Colt":{w:37.2}, "Crow":{w:37.8},
      "Rico":{w:38}
    },
    modes: {
      airHockey: {
        "Frank":{d:4.5,w:53.8}, "Sam":{d:3.9,w:46.1}, "Bull":{d:3.3,w:54.3}, "Buster":{d:3.2,w:58.6},
        "Bibi":{d:3,w:48.3}, "El Primo":{d:2.9,w:54.1}, "Rosa":{d:2.9,w:63.8}, "Buzz":{d:2.6,w:52.7},
        "Sprout":{d:-4.1,w:42.6}, "Glowy":{d:-3.8,w:40.7}, "Ziggy":{d:-3.7,w:41}, "Lumi":{d:-3.5,w:36.3},
        "Berry":{d:-3.2,w:59}, "Wendy":{d:-3.2,w:28.5}, "Meg":{d:-3.1,w:42.7}, "Barley":{d:-3,w:58.7}
      },
      bounty: {
        "Frank":{d:9.2,w:55.2}, "Bolt":{d:8.4,w:35.7}, "Rosa":{d:8.4,w:59.3}, "Sam":{d:8.3,w:55.3},
        "Darryl":{d:7.8,w:61}, "Ash":{d:7.4,w:55.7}, "Draco":{d:7.3,w:56.1}, "El Primo":{d:6.9,w:64.5},
        "Tick":{d:-4.8,w:33.6}, "Sprout":{d:-3.4,w:37.1}, "Belle":{d:-3.2,w:39.9}, "Mandy":{d:-3,w:37.2},
        "Spike":{d:-3,w:41.2}, "Wendy":{d:-3,w:20.8}, "Grom":{d:-2.9,w:39.7}, "Piper":{d:-2.9,w:38.5}
      },
      brawlBall: {
        "El Primo":{d:5.8,w:50.9}, "Frank":{d:5.2,w:52.6}, "Chuck":{d:4.1,w:55.5}, "Sam":{d:3.7,w:44.7},
        "Darryl":{d:3.6,w:48.1}, "Rosa":{d:3.4,w:47.1}, "Bibi":{d:2.9,w:49.7}, "Draco":{d:2.9,w:43.3},
        "Wendy":{d:-4.8,w:20.9}, "Sprout":{d:-3.7,w:43.1}, "Tick":{d:-3.4,w:41}, "Sirius":{d:-3.3,w:37.2},
        "Meg":{d:-3.2,w:38.1}, "Grom":{d:-3.1,w:45.8}, "Tara":{d:-3,w:37.7}, "Byron":{d:-2.9,w:45.6}
      },
      duels: {
        "Frank":{d:5.5,w:54.9}, "Gigi":{d:5.4,w:45.3}, "Rosa":{d:5.3,w:46}, "Doug":{d:5,w:52.2},
        "Mr. P":{d:4.9,w:58.6}, "Ollie":{d:4.9,w:69.2}, "Grom":{d:4.5,w:72.6}, "Draco":{d:4.2,w:40.3},
        "Wendy":{d:-6.2,w:25.3}, "Meeple":{d:-3.4,w:34}, "Mico":{d:-2.9,w:43.7}, "Moe":{d:-2.7,w:34},
        "Nani":{d:-2,w:41}, "Piper":{d:-2,w:47.3}, "Bea":{d:-1.9,w:44.8}, "Gus":{d:-1.9,w:34.8}
      },
      gemGrab: {
        "Hank":{d:4.9,w:48.4}, "Frank":{d:4.7,w:53.4}, "Buster":{d:4.5,w:55.3}, "Ollie":{d:4.2,w:58.5},
        "El Primo":{d:4.1,w:56.3}, "Trunk":{d:3.8,w:49.2}, "Draco":{d:3.7,w:45.7}, "Melodie":{d:3.6,w:55},
        "Grom":{d:-4.6,w:51.8}, "Sirius":{d:-3.3,w:37.5}, "Tick":{d:-3.3,w:41.1}, "Nori":{d:-2.3,w:35.9},
        "Barley":{d:-2.1,w:54.1}, "Bea":{d:-2.1,w:50.9}, "Bo":{d:-1.8,w:35.6}, "Leon":{d:-1.8,w:48.7}
      },
      heist: {
        "Jacky":{d:4.5,w:65}, "Rosa":{d:4.4,w:58.4}, "Damian":{d:4.1,w:50.8}, "Trunk":{d:3.8,w:43.1},
        "Gus":{d:3.6,w:56.3}, "Bibi":{d:3.5,w:45.3}, "El Primo":{d:3.5,w:53}, "Poco":{d:3.4,w:64.1},
        "Mortis":{d:-4.5,w:49.4}, "Kit":{d:-4.2,w:41.6}, "Ash":{d:-3.7,w:50.8}, "Mandy":{d:-3.4,w:34.1},
        "Sirius":{d:-3,w:32}, "Gray":{d:-2.9,w:45.1}, "Hank":{d:-2.8,w:31.7}, "Mico":{d:-2.5,w:29.4}
      },
      hotZone: {
        "Trunk":{d:6.4,w:46.3}, "Sam":{d:6.1,w:51.4}, "Frank":{d:5.5,w:48.9}, "El Primo":{d:5.3,w:55.1},
        "Doug":{d:4.9,w:42.7}, "Draco":{d:4.8,w:42.2}, "Gigi":{d:4.6,w:50.3}, "Damian":{d:4.4,w:39.3},
        "Grom":{d:-4.8,w:51.4}, "Wendy":{d:-4.4,w:20.4}, "Charlie":{d:-3.7,w:51.6}, "Sirius":{d:-3.3,w:37},
        "Tick":{d:-3.2,w:38.6}, "Berry":{d:-2.9,w:39.4}, "Meg":{d:-2.8,w:38.3}, "Bea":{d:-2.7,w:53.1}
      },
      knockout: {
        "Frank":{d:12.1,w:53.9}, "Rosa":{d:11,w:61.9}, "Sam":{d:8.8,w:53.3}, "Trunk":{d:7.1,w:58.7},
        "Bolt":{d:6.8,w:36.9}, "Hank":{d:6.7,w:46}, "Damian":{d:6.4,w:45.3}, "El Primo":{d:6.4,w:58.4},
        "Sprout":{d:-4.1,w:32.9}, "Mandy":{d:-3.7,w:37}, "Tick":{d:-3.6,w:36.2}, "Nani":{d:-3.5,w:35.3},
        "Belle":{d:-3.2,w:39}, "Grom":{d:-3.2,w:38}, "Pierce":{d:-2.9,w:35.1}, "Meeple":{d:-2.8,w:35.3}
      },
      knockout5V5: {
        "Ash":{d:8,w:42.6}, "Starr Nova":{d:7.7,w:47.5}, "Damian":{d:7.3,w:53.3}, "Wendy":{d:7.3,w:45.5},
        "Draco":{d:6.6,w:51.1}, "Bolt":{d:6.3,w:56.3}, "Hank":{d:4.9,w:42.9}, "Clancy":{d:4.7,w:59},
        "Bea":{d:-3.8,w:50.3}, "Lou":{d:-3.5,w:46.5}, "Otis":{d:-3.5,w:46.2}, "Belle":{d:-3.3,w:43.3},
        "Pearl":{d:-3.3,w:51.5}, "Sprout":{d:-3,w:42.3}, "Tara":{d:-2.7,w:52.6}, "Emz":{d:-2.3,w:51.3}
      }
    }
  },
  "Bo": {
    vs: {
      "Lou":{d:5.4,w:57}, "Jacky":{d:5.1,w:59.2}, "Frank":{d:4.8,w:60.9}, "R-T":{d:4.7,w:52.5},
      "Pam":{d:4.5,w:61.5}, "Charlie":{d:4.4,w:58.6}, "Gale":{d:4,w:57.2}, "Lola":{d:3.8,w:59.1},
      "Bolt":{d:-8.1,w:33}, "Wendy":{d:-6.2,w:27.4}, "Mortis":{d:-5.3,w:51.5}, "Mina":{d:-5.2,w:45.4},
      "Mico":{d:-4.5,w:45.7}, "Chuck":{d:-4.4,w:49.5}, "Starr Nova":{d:-3.4,w:41.7}, "Edgar":{d:-2.6,w:57.8},
      "Shelly":{w:65.3}, "Barley":{w:62.6}, "Colt":{w:62.3}, "Rico":{w:61.3}, "Damian":{w:42.4},
      "Nori":{w:43.3}
    },
    with: {
      "Crow":{d:5}, "Shelly":{d:4.7}, "Edgar":{d:4.5}, "Leon":{d:4.2}, "Rosa":{d:3.6}, "Amber":{d:-6.4},
      "Shade":{d:-5.8}, "Lumi":{d:-5.7}, "Pierce":{d:-5.7}, "Sprout":{d:-5.7}, "Wendy":{w:71},
      "Bolt":{w:65.6}, "Ash":{w:63.3}, "Damian":{w:63}, "Starr Nova":{w:60.9}, "Colt":{w:49},
      "Dynamike":{w:50.1}, "Jae-Yong":{w:50.1}, "Mortis":{w:50.1}, "Lola":{w:50.7}
    },
    modes: {
      airHockey: {
        "Lola":{d:6,w:58.3}, "Nani":{d:5.9,w:61}, "Berry":{d:5.4,w:73.7}, "Pam":{d:4.7,w:70.8},
        "Mr. P":{d:4.1,w:75.6}, "Nita":{d:3.7,w:63.3}, "Shelly":{d:3.5,w:63.3}, "Belle":{d:3.2,w:68},
        "Wendy":{d:-7.7,w:30.1}, "Bolt":{d:-6.1,w:34.8}, "Gigi":{d:-5.2,w:43.5}, "Mina":{d:-3.7,w:44.1},
        "Mortis":{d:-3.5,w:51.8}, "Starr Nova":{d:-3.5,w:40.6}, "Damian":{d:-3.2,w:39.3},
        "Bibi":{d:-2.3,w:49.7}
      },
      bounty: {
        "Frank":{d:6.6,w:63.5}, "Hank":{d:6.1,w:58.2}, "Poco":{d:4.8,w:65.8}, "Draco":{d:4.6,w:64.2},
        "Nita":{d:4.4,w:67.5}, "Ruffs":{d:4.4,w:56.8}, "Sam":{d:4.4,w:62.1}, "Meg":{d:4.3,w:63},
        "Bolt":{d:-7.2,w:29.4}, "Mico":{d:-4.8,w:45.4}, "Mortis":{d:-4.5,w:47.6}, "Mina":{d:-4.1,w:45.9},
        "Grom":{d:-3.1,w:50.4}, "Najia":{d:-3.1,w:47.5}, "Edgar":{d:-2.7,w:52.3}, "Tick":{d:-2.7,w:46.3}
      },
      brawlBall: {
        "Belle":{d:3.9,w:60.6}, "8-Bit":{d:3.6,w:53}, "R-T":{d:3.6,w:50}, "Lou":{d:3.5,w:49.1},
        "Pam":{d:3.5,w:55.8}, "Gene":{d:3.4,w:65.1}, "Shelly":{d:3.4,w:65.7}, "Gus":{d:3.2,w:50.1},
        "Wendy":{d:-7.9,w:24.4}, "Bolt":{d:-6.4,w:38.6}, "Mina":{d:-5.5,w:44.9}, "Starr Nova":{d:-5.4,w:37.5},
        "Damian":{d:-5.3,w:37}, "Mortis":{d:-5.2,w:52.5}, "Nori":{d:-4,w:39.8}, "Ziggy":{d:-3.8,w:48.6}
      },
      brawlBall5V5: {
        "Meeple":{d:5.6,w:60.1}, "Rosa":{d:4.3,w:57.9}, "Otis":{d:4.1,w:50.5}, "8-Bit":{d:3.9,w:46.3},
        "Angelo":{d:3.8,w:64}, "Lumi":{d:3.4,w:49.6}, "Nita":{d:3.3,w:57.8}, "Barley":{d:3.2,w:60.5},
        "Mina":{d:-5.2,w:45.2}, "Bolt":{d:-5.1,w:29.5}, "Mortis":{d:-2.9,w:48.9}, "Edgar":{d:-2.7,w:52.6},
        "Damian":{d:-2.6,w:38.1}, "Ollie":{d:-2.6,w:47.1}, "Ziggy":{d:-2.4,w:47.2}, "Bibi":{d:-1.8,w:46.5}
      },
      deathmatch5v5: {
        "Wendy":{d:8.2,w:46}, "Pam":{d:5.3,w:64.4}, "Nita":{d:4.7,w:67.5}, "Meg":{d:4.5,w:63.2},
        "Frank":{d:4.3,w:65.7}, "Damian":{d:3.9,w:50.3}, "Otis":{d:3.7,w:61.5}, "Shade":{d:3.6,w:67.1},
        "Gigi":{d:-3.8,w:51.2}, "Mico":{d:-3.1,w:53.3}, "Draco":{d:-2.2,w:60.2}, "Mr. P":{d:-2.1,w:48.5},
        "Grom":{d:-1.8,w:48.9}, "Chuck":{d:-1.6,w:53.6}, "Ziggy":{d:-1.6,w:52.3}, "Max":{d:-1.5,w:54.4}
      },
      gemGrab: {
        "Frank":{d:6.7,w:68}, "Hank":{d:6.6,w:62.8}, "Nani":{d:4,w:66.4}, "Nita":{d:3.8,w:61.5},
        "Berry":{d:3.7,w:69.3}, "R-T":{d:3.2,w:60.1}, "Barley":{d:3.1,w:71.3}, "Doug":{d:3.1,w:57.3},
        "Bolt":{d:-11.2,w:29.4}, "Mina":{d:-7.1,w:46.2}, "Mortis":{d:-5.5,w:49.7}, "Wendy":{d:-5.4,w:29.7},
        "Mico":{d:-5.1,w:49.9}, "Alli":{d:-4.8,w:51.3}, "Eve":{d:-4.7,w:54.2}, "Chuck":{d:-3.7,w:54.2}
      },
      hotZone: {
        "Frank":{d:8,w:65.6}, "R-T":{d:5.8,w:59.1}, "Mandy":{d:5.7,w:74.2}, "Doug":{d:5.3,w:57.1},
        "Nani":{d:5,w:72}, "Jacky":{d:4.4,w:65.6}, "Kit":{d:4,w:64.6}, "Barley":{d:3.6,w:65.2},
        "Bolt":{d:-11,w:35.8}, "Wendy":{d:-10.3,w:26.5}, "Mina":{d:-7,w:46.6}, "Max":{d:-6.1,w:59.3},
        "Starr Nova":{d:-6,w:42.5}, "Chuck":{d:-5.9,w:48.2}, "Alli":{d:-5.8,w:57.4}, "Mortis":{d:-5.8,w:54.2}
      },
      knockout: {
        "Shelly":{d:4.6,w:65}, "Hank":{d:4.5,w:52.7}, "Rosa":{d:4.3,w:64.2}, "Pam":{d:4.2,w:58.6},
        "Nita":{d:4.1,w:63.4}, "El Primo":{d:4,w:64.9}, "Trunk":{d:3.9,w:64.4}, "Frank":{d:3.7,w:54.6},
        "Bolt":{d:-6.7,w:31.6}, "Mico":{d:-6.5,w:41.1}, "Wendy":{d:-6.4,w:25}, "Mina":{d:-5.4,w:42},
        "Sirius":{d:-4.9,w:41.6}, "Najia":{d:-4.5,w:42.9}, "Grom":{d:-4.1,w:46.1}, "Gigi":{d:-3.9,w:43.5}
      },
      knockout5V5: {
        "Hank":{d:7.2,w:51.9}, "Wendy":{d:4.4,w:49.2}, "Buzz":{d:4,w:67.5}, "Rosa":{d:3.8,w:53.4},
        "Gray":{d:3.7,w:47.1}, "Pam":{d:3.2,w:61.8}, "Frank":{d:3,w:61.1}, "Gene":{d:3,w:66.4},
        "Ollie":{d:-5.9,w:56.2}, "Bolt":{d:-4,w:52.8}, "Najia":{d:-4,w:52.8}, "Mr. P":{d:-3.7,w:47.7},
        "Gigi":{d:-3.1,w:53.5}, "Kaze":{d:-3,w:52.2}, "Glowy":{d:-1.9,w:50.3}, "Grom":{d:-1.9,w:56.9}
      }
    }
  },
  "Cordelius": {
    vs: {
      "Bolt":{d:3.3,w:38.7}, "Gigi":{d:3.1,w:47.1}, "El Primo":{d:2.4,w:53}, "Melodie":{d:2.3,w:49.5},
      "Kenji":{d:2,w:49.8}, "Mico":{d:1.9,w:46.1}, "Bull":{d:1.8,w:53.4}, "Damian":{d:1.8,w:40.7},
      "Sirius":{d:-6.2,w:38}, "Bea":{d:-3.1,w:47.8}, "Charlie":{d:-2.9,w:45.3}, "Mandy":{d:-2.9,w:44.1},
      "Buster":{d:-2.7,w:44.7}, "Tara":{d:-2.6,w:43.8}, "Bo":{d:-2.5,w:41.5}, "Byron":{d:-2.3,w:48.8},
      "Shelly":{w:57.5}, "Colt":{w:56.7}, "Dynamike":{w:55.4}, "Edgar":{w:55}, "Rico":{w:54.6},
      "Wendy":{w:26.5}, "Starr Nova":{w:38.9}, "Ash":{w:39}
    },
    with: {
      "Juju":{d:3.8}, "Nita":{d:3.8}, "Frank":{d:3.3}, "El Primo":{d:3.1}, "Willow":{d:3},
      "Lily":{d:-6.1,w:41.1}, "8-Bit":{d:-5.7}, "Pearl":{d:-5.7}, "Charlie":{d:-5.3}, "Ollie":{d:-4.9,w:42},
      "Wendy":{w:68.8}, "Bolt":{w:60.8}, "Nori":{w:59.2}, "Damian":{w:58.7}, "Lumi":{w:57.9}, "Colt":{w:42.5},
      "Belle":{w:43.6}, "Crow":{w:43.6}
    },
    modes: {
      bounty: {
        "Damian":{d:9.7,w:46.6}, "Gigi":{d:6.7,w:47.5}, "Ziggy":{d:6.5,w:50.1}, "Bolt":{d:6.4,w:32.3},
        "Kit":{d:5.5,w:43.3}, "Glowy":{d:5.1,w:47.9}, "Trunk":{d:5,w:57.7}, "Hank":{d:4.4,w:44},
        "Buster":{d:-5.9,w:42.2}, "Charlie":{d:-5.8,w:41.6}, "Bea":{d:-5.2,w:39.4}, "Gale":{d:-5,w:44.1},
        "Byron":{d:-4.7,w:35.6}, "Piper":{d:-4.1,w:35.5}, "Lou":{d:-3.8,w:45.5}, "Tara":{d:-3.8,w:44.6}
      },
      brawlBall: {
        "Angelo":{d:6.2,w:72.8}, "Belle":{d:3.3,w:57.5}, "Nani":{d:3.2,w:59.3}, "Gene":{d:3,w:62.3},
        "Glowy":{d:2.9,w:52.8}, "Bolt":{d:2.8,w:45.3}, "Lily":{d:2.4,w:56.3}, "Ollie":{d:2.3,w:48.6},
        "Sirius":{d:-7,w:39}, "Wendy":{d:-3.4,w:26.8}, "Ash":{d:-3.1,w:35.8}, "Buster":{d:-2.7,w:43.4},
        "Tara":{d:-2.1,w:44.2}, "Clancy":{d:-2,w:48}, "Charlie":{d:-1.9,w:43.7}, "Chester":{d:-1.8,w:45.4}
      },
      gemGrab: {
        "Shade":{d:4.4,w:45.5}, "Angelo":{d:4.1,w:55.8}, "Damian":{d:4,w:39.8}, "Juju":{d:3.9,w:49.4},
        "Bolt":{d:3.5,w:33}, "Glowy":{d:3.5,w:49.6}, "Willow":{d:3.4,w:56.4}, "Trunk":{d:3.1,w:49.1},
        "Meg":{d:-3.4,w:40.7}, "Buster":{d:-3.1,w:48.2}, "Charlie":{d:-2.6,w:45.2}, "Byron":{d:-2.5,w:48.8},
        "R-T":{d:-2.5,w:42.1}, "Jacky":{d:-2.3,w:50.8}, "Sirius":{d:-2.2,w:39.1}, "Melodie":{d:-2.1,w:49.8}
      },
      hotZone: {
        "Gus":{d:6.6,w:54.5}, "Bolt":{d:6.4,w:39.4}, "Doug":{d:5.1,w:42.7}, "Damian":{d:5,w:39.8},
        "Gigi":{d:4.9,w:50.5}, "Eve":{d:4.8,w:54.1}, "Shade":{d:4.1,w:44.9}, "Glowy":{d:3.6,w:45.8},
        "Buster":{d:-6.5,w:40.9}, "Sirius":{d:-5.4,w:34.7}, "Frank":{d:-3.8,w:39.5}, "Mandy":{d:-3.6,w:51.4},
        "Spike":{d:-3.5,w:43.6}, "Squeak":{d:-3,w:46}, "Tara":{d:-3,w:40.7}, "Dynamike":{d:-2.9,w:46.9}
      },
      knockout: {
        "Chuck":{d:7.3,w:61.5}, "Rosa":{d:6.1,w:62.8}, "Bolt":{d:5.4,w:40.7}, "Darryl":{d:5.1,w:53.4},
        "Kaze":{d:4.9,w:53.1}, "Sam":{d:4.9,w:55.2}, "Gigi":{d:4.7,w:49}, "Damian":{d:4.5,w:49.2},
        "Sirius":{d:-7.5,w:35.8}, "Clancy":{d:-3.5,w:55.4}, "Wendy":{d:-3.5,w:25.2}, "Buster":{d:-3.3,w:39.9},
        "Griff":{d:-2.9,w:44.4}, "Mina":{d:-2.5,w:41.7}, "Bea":{d:-2.4,w:49.6}, "Pearl":{d:-2.4,w:35.9}
      }
    }
  },
  "Surge": {
    vs: {
      "Bolt":{d:4.4,w:40.3}, "Mico":{d:2.1,w:46.8}, "Angelo":{d:1.9,w:50.7}, "Bo":{d:1.8,w:46.4},
      "Nani":{d:1.8,w:48.2}, "Najia":{d:1.7,w:48.7}, "Bibi":{d:1.5,w:51}, "Starr Nova":{d:1.3,w:41.2},
      "Ash":{d:-4.7,w:37}, "Wendy":{d:-4.1,w:24.9}, "Ollie":{d:-3.8,w:48.4}, "Rosa":{d:-3.7,w:46.6},
      "Jacky":{d:-3.6,w:45.1}, "Sandy":{d:-3.6,w:43.8}, "Meg":{d:-3.4,w:42.6}, "Moe":{d:-3.2,w:41.2},
      "Shelly":{w:56.8}, "Colt":{w:56.5}, "Edgar":{w:56.3}, "Crow":{w:56.1}, "Leon":{w:56.1}, "Shade":{w:40},
      "R-T":{w:40.5}
    },
    with: {
      "Rosa":{d:7.8}, "Ollie":{d:7.5}, "Lola":{d:6.5}, "Charlie":{d:6.4}, "Trunk":{d:6.4}, "Meg":{d:-4.2},
      "Max":{d:-3}, "Kit":{d:-2.5}, "Nani":{d:-2.5}, "Frank":{d:-2.4}, "Wendy":{w:67.6}, "Bolt":{w:64.6},
      "Damian":{w:62.4}, "Ash":{w:61.6}, "Starr Nova":{w:61.4}, "Shelly":{w:40.6}, "Colt":{w:42.1},
      "Dynamike":{w:43.1}, "Edgar":{w:43.9}, "Rico":{w:44}
    },
    modes: {
      airHockey: {
        "Chuck":{d:3,w:55.6}, "Rosa":{d:2.7,w:65.9}, "Bonnie":{d:2.6,w:74.6}, "Pam":{d:2.6,w:64.8},
        "Lola":{d:2.3,w:50.3}, "Angelo":{d:2.2,w:59.4}, "Larry & Lawrie":{d:2,w:64.7}, "Berry":{d:1.9,w:66.4},
        "Draco":{d:-1.9,w:43}, "Meg":{d:-1.9,w:46.3}, "Alli":{d:-1.8,w:47.2}, "Finx":{d:-1.8,w:41.8},
        "Meeple":{d:-1.7,w:44.8}, "Ruffs":{d:-1.7,w:44.3}, "Ziggy":{d:-1.7,w:45.5}, "R-T":{d:-1.5,w:42}
      },
      basketBrawl: {
        "Barley":{d:3.8,w:67.6}, "Berry":{d:2.9,w:64.2}, "Belle":{d:2.5,w:68.6}, "Gene":{d:2.5,w:70.2},
        "Larry & Lawrie":{d:2.4,w:63.9}, "Nani":{d:2.3,w:53.8}, "Kaze":{d:1.9,w:50.5}, "Mico":{d:1.9,w:56.3},
        "Wendy":{d:-5.2,w:30}, "Chuck":{d:-3.9,w:49.3}, "Lola":{d:-3.7,w:47.3}, "Sandy":{d:-3.3,w:49.1},
        "Ash":{d:-3,w:50.3}, "8-Bit":{d:-2.9,w:44.5}, "Meeple":{d:-2.7,w:52.3}, "Sprout":{d:-2.3,w:49.7}
      },
      bounty: {
        "Bolt":{d:5.3,w:38.9}, "Shade":{d:4.9,w:53.3}, "Nori":{d:4.8,w:52.1}, "Starr Nova":{d:4.5,w:49.3},
        "Amber":{d:4.2,w:54.1}, "Kaze":{d:3.4,w:54.1}, "Chester":{d:3.1,w:55.8}, "Edgar":{d:2.9,w:54.6},
        "Jacky":{d:-7.6,w:58.2}, "Barley":{d:-4.6,w:56.8}, "Buster":{d:-4.6,w:52.8}, "Eve":{d:-4.5,w:46.1},
        "Rosa":{d:-4.1,w:54.3}, "Angelo":{d:-3.6,w:45.6}, "Piper":{d:-3.2,w:45.6}, "Berry":{d:-3,w:58.7}
      },
      brawlBall: {
        "Damian":{d:2.2,w:39.2}, "Clancy":{d:2.1,w:49}, "Starr Nova":{d:2.1,w:39.6}, "Bibi":{d:1.7,w:51},
        "Bolt":{d:1.7,w:41.2}, "Griff":{d:1.6,w:45.1}, "Gale":{d:1.3,w:45.5}, "Bull":{d:1.2,w:53},
        "Mr. P":{d:-3.6,w:47.4}, "Chuck":{d:-3.2,w:50.7}, "Ash":{d:-3.1,w:32.9}, "Eve":{d:-3.1,w:47.1},
        "Wendy":{d:-3.1,w:24.5}, "Gene":{d:-3,w:53.3}, "Pam":{d:-3,w:43.6}, "Meg":{d:-2.9,w:40.8}
      },
      brawlBall5V5: {
        "Cordelius":{d:9,w:70.2}, "Damian":{d:6.3,w:50.7}, "Mina":{d:6.1,w:60.3}, "Buzz":{d:6,w:67.2},
        "Alli":{d:5.4,w:62.9}, "Edgar":{d:5.3,w:64.2}, "Bolt":{d:5.1,w:43.2}, "Shelly":{d:4.6,w:66.1},
        "Buster":{d:-5.5,w:45}, "R-T":{d:-4.4,w:52.5}, "8-Bit":{d:-4.1,w:42}, "Lola":{d:-3.9,w:53.7},
        "Gus":{d:-3.8,w:49.8}, "Eve":{d:-3.6,w:52.2}, "Carl":{d:-3.4,w:50.7}, "Jacky":{d:-3.3,w:52.3}
      },
      duels: {
        "Kaze":{d:3.7,w:52.4}, "Tick":{d:3.1,w:67.4}, "Jessie":{d:2.9,w:58.9}, "Bolt":{d:2.7,w:45.8},
        "Bibi":{d:2.6,w:58.3}, "Bull":{d:2.6,w:52.9}, "Poco":{d:2.4,w:61.1}, "Damian":{d:2.3,w:46.6},
        "Wendy":{d:-7.7,w:25}, "R-T":{d:-4.1,w:28.9}, "Sprout":{d:-3.8,w:39.1}, "Pearl":{d:-3.3,w:35.9},
        "Moe":{d:-3.2,w:34.9}, "Rosa":{d:-3.2,w:38.8}, "Gus":{d:-2.6,w:35.4}, "Pam":{d:-2.6,w:34.8}
      },
      gemGrab: {
        "Bolt":{d:2.6,w:37.9}, "Bo":{d:2.5,w:46.8}, "Edgar":{d:2.5,w:54.3}, "Nori":{d:2.2,w:47.4},
        "Starr Nova":{d:2,w:44.9}, "Bibi":{d:1.9,w:50.8}, "Griff":{d:1.6,w:49.7}, "Chester":{d:1.5,w:50.5},
        "Meg":{d:-4.6,w:46}, "Gray":{d:-3.4,w:47.7}, "Eve":{d:-3.1,w:50.2}, "Moe":{d:-2.6,w:45.1},
        "Ollie":{d:-2.6,w:58.6}, "Rosa":{d:-2.4,w:51.9}, "Ash":{d:-2.3,w:45.8}, "Buster":{d:-2.3,w:55.5}
      },
      hotZone: {
        "Bo":{d:4.5,w:48.3}, "Edgar":{d:3.3,w:56.6}, "Griff":{d:3,w:50.1}, "Emz":{d:2.8,w:52.3},
        "Bibi":{d:2.1,w:49.6}, "Bolt":{d:2.1,w:42.8}, "Nori":{d:1.8,w:44.2}, "Damian":{d:1.7,w:44.2},
        "Wendy":{d:-8.4,w:22.8}, "Gray":{d:-5.6,w:45.8}, "Willow":{d:-5.1,w:52.2}, "Rosa":{d:-4.9,w:51.8},
        "Sam":{d:-4.9,w:48.6}, "Ash":{d:-4.5,w:46.3}, "Gus":{d:-4.5,w:51.6}, "Moe":{d:-4.4,w:48.1}
      },
      knockout: {
        "Bolt":{d:5.3,w:40.3}, "El Primo":{d:3.6,w:61.2}, "Jacky":{d:3.6,w:64.3}, "Buzz":{d:3.5,w:55.9},
        "Darryl":{d:3.2,w:51.3}, "Kaze":{d:3.2,w:51.2}, "Bull":{d:3.1,w:61.1}, "Bibi":{d:2.9,w:56.7},
        "Wendy":{d:-5.4,w:23.1}, "Sirius":{d:-4.2,w:38.9}, "Eve":{d:-3.1,w:39.8}, "Buster":{d:-2.9,w:40},
        "Frank":{d:-2.8,w:44.7}, "Tick":{d:-2.4,w:42.9}, "Ash":{d:-1.9,w:46.7}, "Moe":{d:-1.9,w:43}
      },
      knockout5V5: {
        "Larry & Lawrie":{d:3.6,w:57.8}, "Clancy":{d:3.2,w:55.8}, "Buzz":{d:2.5,w:57.6},
        "Maisie":{d:2.5,w:57.7}, "Pam":{d:2.5,w:52.6}, "Bonnie":{d:2.2,w:54.3}, "Jacky":{d:2.2,w:60.1},
        "Lily":{d:2.2,w:54}, "Wendy":{d:-6.6,w:29.9}, "Charlie":{d:-5.6,w:48.8}, "Ziggy":{d:-5,w:42.1},
        "Rosa":{d:-3.6,w:37.5}, "Gray":{d:-3.5,w:31.7}, "Lumi":{d:-3.2,w:33.2}, "Hank":{d:-3.1,w:33.3},
        "Moe":{d:-3,w:40.5}
      }
    }
  },
  "Crow": {
    vs: {
      "Rosa":{d:4,w:48.7}, "Trunk":{d:3,w:45}, "Damian":{d:2.9,w:37.1}, "Bull":{d:2.8,w:49.4},
      "Clancy":{d:2.7,w:46}, "Jacky":{d:2.4,w:45.6}, "Ash":{d:2.3,w:38.7}, "Bolt":{d:2.2,w:33.2},
      "Wendy":{d:-6.6,w:18.1}, "Angelo":{d:-5.2,w:38.1}, "Sprout":{d:-4,w:37.6}, "Piper":{d:-3.1,w:43.2},
      "Mico":{d:-3,w:36.3}, "Gray":{d:-2.7,w:36.7}, "Gus":{d:-2.5,w:37.2}, "Nani":{d:-2.5,w:38.5},
      "Shelly":{w:51.9}, "Colt":{w:50.7}, "Edgar":{w:50.6}, "Leon":{w:49.9}, "Colette":{w:49.7},
      "Nori":{w:34.6}, "R-T":{w:35.7}, "Shade":{w:35.8}
    },
    with: {
      "Rosa":{d:10.4}, "Lola":{d:8.3}, "Sam":{d:8.3}, "Juju":{d:7.6}, "Trunk":{d:7.6}, "Leon":{d:-5,w:33.2},
      "Piper":{d:-4.6}, "Bull":{d:-4.2}, "Rico":{d:-4.1,w:34.4}, "Byron":{d:-4}, "Wendy":{w:65},
      "Bolt":{w:64}, "Damian":{w:59.5}, "Ash":{w:58.3}, "Starr Nova":{w:57.7}, "Colt":{w:33.8},
      "Edgar":{w:35.9}, "Dynamike":{w:36.4}
    },
    modes: {
      airHockey: {
        "Rosa":{d:4,w:63.5}, "Pam":{d:3.1,w:61.5}, "Bonnie":{d:2.9,w:71.6}, "Gene":{d:2.5,w:64.4},
        "Barley":{d:2.4,w:62.6}, "Berry":{d:2.4,w:63.2}, "Ash":{d:2.3,w:51.5}, "Pearl":{d:2.3,w:57.5},
        "Wendy":{d:-4.5,w:26}, "Lola":{d:-2.9,w:41.2}, "Sprout":{d:-2.9,w:42.3}, "Nori":{d:-2.2,w:36.9},
        "Meg":{d:-2.1,w:42.2}, "Angelo":{d:-1.9,w:51.4}, "Willow":{d:-1.8,w:39.9}, "Gray":{d:-1.7,w:40.1}
      },
      bounty: {
        "Trunk":{d:7.6,w:66.4}, "Sam":{d:7.3,w:58.7}, "Rosa":{d:6.1,w:61.4}, "Draco":{d:5.8,w:59},
        "Darryl":{d:5.4,w:63}, "Ash":{d:5.2,w:57.8}, "Frank":{d:5,w:55.4}, "El Primo":{d:4.9,w:66.8},
        "Wendy":{d:-7.6,w:19.5}, "Piper":{d:-4.1,w:41.6}, "Byron":{d:-3.4,w:43}, "Grom":{d:-3.4,w:43.7},
        "Nani":{d:-3,w:38.3}, "Tick":{d:-3,w:39.6}, "Sprout":{d:-2.8,w:42}, "Angelo":{d:-2.5,w:43.6}
      },
      brawlBall: {
        "Bull":{d:3,w:48.5}, "Clancy":{d:2.6,w:43.4}, "Damian":{d:2.5,w:33.8}, "Griff":{d:2.2,w:39.7},
        "Starr Nova":{d:1.7,w:33.5}, "Bibi":{d:1.6,w:44.7}, "Emz":{d:1.4,w:44.7}, "Sirius":{d:1.2,w:38.2},
        "Wendy":{d:-5.8,w:17.1}, "Gene":{d:-5,w:45}, "Mr. P":{d:-4.6,w:40.1}, "Angelo":{d:-4.4,w:53.4},
        "Bonnie":{d:-3.8,w:38.5}, "Penny":{d:-3.7,w:39.5}, "Mico":{d:-3.6,w:41.7}, "Belle":{d:-3.5,w:41.4}
      },
      brawlBall5V5: {
        "Larry & Lawrie":{d:4.7,w:61}, "Angelo":{d:4.4,w:64.9}, "Chuck":{d:4.1,w:63}, "Berry":{d:3.7,w:59},
        "Gene":{d:3.6,w:61.6}, "Lola":{d:3.6,w:57.8}, "Ruffs":{d:3.3,w:58.4}, "Rosa":{d:3,w:57},
        "Wendy":{d:-8.8,w:18.8}, "Bolt":{d:-2.2,w:32.7}, "Buster":{d:-2.1,w:45}, "Nori":{d:-2.1,w:41.4},
        "8-Bit":{d:-1.7,w:41}, "Sirius":{d:-1.7,w:50.3}, "Moe":{d:-1.3,w:49}, "Damian":{d:-1.2,w:39.9}
      },
      duels: {
        "Berry":{d:5.1,w:72.7}, "Jessie":{d:4.7,w:60.5}, "Barley":{d:4.2,w:65.9}, "El Primo":{d:3.4,w:57.1},
        "Kenji":{d:3.4,w:62.6}, "Larry & Lawrie":{d:3.4,w:67.3}, "Trunk":{d:3.3,w:47.5},
        "Nita":{d:3.1,w:55.3}, "Wendy":{d:-11.9,w:20.6}, "R-T":{d:-5.6,w:27.3}, "Moe":{d:-5,w:32.8},
        "Ruffs":{d:-4.5,w:35.7}, "Gray":{d:-4.1,w:40}, "Meeple":{d:-3.7,w:34.7}, "Glowy":{d:-3.1,w:31.7},
        "Mina":{d:-3.1,w:40.2}
      },
      gemGrab: {
        "El Primo":{d:3.6,w:61.3}, "Trunk":{d:2.9,w:54}, "Shelly":{d:2.4,w:58.3}, "Glowy":{d:2.3,w:53.5},
        "Edgar":{d:2.1,w:52.5}, "Bull":{d:1.9,w:54.3}, "Frank":{d:1.9,w:56.2}, "Barley":{d:1.8,w:63.4},
        "Wendy":{d:-6.8,w:22.1}, "Mr. P":{d:-3.5,w:50.1}, "Eve":{d:-2.9,w:48.9}, "Meg":{d:-2.5,w:46.6},
        "Piper":{d:-2.4,w:53.5}, "8-Bit":{d:-2.3,w:47.2}, "Tick":{d:-2,w:47.9}, "Angelo":{d:-1.9,w:54.9}
      },
      heist: {
        "Ollie":{d:8.3,w:88.8}, "Rosa":{d:6.7,w:59.1}, "Ash":{d:5.2,w:58.1}, "Gus":{d:4.8,w:56},
        "Maisie":{d:4.8,w:58.9}, "Jacky":{d:4.7,w:63.7}, "Poco":{d:4.7,w:63.9}, "Lou":{d:4.5,w:59.9},
        "Gene":{d:-7.8,w:76.5}, "Meg":{d:-3.5,w:44.2}, "Shade":{d:-2.8,w:29}, "Chuck":{d:-2.5,w:33.8},
        "Sprout":{d:-2.5,w:40}, "Grom":{d:-2.4,w:52.2}, "Mico":{d:-2.4,w:28.2}, "Leon":{d:-2.3,w:54.6}
      },
      hotZone: {
        "Nani":{d:3.8,w:59.2}, "Trunk":{d:3.8,w:45.7}, "Bolt":{d:3.1,w:38.1}, "Alli":{d:3,w:54.2},
        "Pierce":{d:2.6,w:48.7}, "Damian":{d:2.5,w:39.2}, "Darryl":{d:2.5,w:57.3}, "Bull":{d:2,w:52.6},
        "Wendy":{d:-11.8,w:14.5}, "Meg":{d:-4.1,w:39}, "Hank":{d:-3.9,w:32.5}, "Eve":{d:-3.3,w:48.1},
        "Gray":{d:-3,w:42.4}, "Jacky":{d:-2.8,w:46.3}, "Gene":{d:-2.6,w:67.1}, "Juju":{d:-2.6,w:36.6}
      },
      knockout: {
        "Rosa":{d:8.5,w:54.7}, "Bull":{d:6,w:53.7}, "Ash":{d:5.7,w:44.2}, "Damian":{d:5.5,w:40},
        "Frank":{d:5.5,w:42.9}, "Clancy":{d:4.7,w:53}, "Bibi":{d:4.6,w:48.1}, "Jacky":{d:4.5,w:55.1},
        "Wendy":{d:-4.6,w:16.3}, "Angelo":{d:-4.1,w:31.2}, "Sprout":{d:-3.2,w:29.6}, "Gus":{d:-2.8,w:31.9},
        "Meg":{d:-2.5,w:32.3}, "Belle":{d:-2.4,w:35.3}, "Mandy":{d:-2.4,w:33.9}, "R-T":{d:-2.3,w:30.5}
      },
      knockout5V5: {
        "Charlie":{d:5.3,w:57.2}, "Sam":{d:4.1,w:49.8}, "Ollie":{d:3.9,w:55.2}, "Jacky":{d:3.6,w:59.1},
        "Melodie":{d:3,w:57.1}, "Otis":{d:2.7,w:48.3}, "Rosa":{d:2.7,w:41.4}, "Cordelius":{d:2.4,w:58.1},
        "Willow":{d:-4,w:37.9}, "Mico":{d:-3.8,w:39.2}, "Sprout":{d:-3,w:38.2}, "Gigi":{d:-2.7,w:42.9},
        "Juju":{d:-2.5,w:39.1}, "Wendy":{d:-2.5,w:31.8}, "Janet":{d:-2.4,w:36}, "Angelo":{d:-2.3,w:41.1}
      }
    }
  },
  "Gale": {
    vs: {
      "Bolt":{d:5.6,w:43.6}, "Buzz":{d:3.7,w:57.1}, "El Primo":{d:3.6,w:56.9}, "Jacky":{d:3.6,w:54.5},
      "Doug":{d:3.2,w:50.5}, "Sam":{d:2.9,w:52.1}, "Frank":{d:2.6,w:55.4}, "Bibi":{d:2.4,w:54.1},
      "Chuck":{d:-5.8,w:44.8}, "Mico":{d:-4.5,w:42.4}, "Jessie":{d:-4.4,w:45.6}, "Sirius":{d:-4.4,w:42.5},
      "Ziggy":{d:-4.4,w:46.9}, "Juju":{d:-4.1,w:44.8}, "Bo":{d:-4,w:42.8}, "Penny":{d:-3.6,w:48.1},
      "Shelly":{w:61.5}, "Colt":{w:59.6}, "Edgar":{w:58.1}, "Leon":{w:57.6}, "Rico":{w:57.4},
      "Wendy":{w:27.7}, "Damian":{w:41.7}, "Starr Nova":{w:42}, "Nori":{w:42.3}
    },
    with: {
      "Shelly":{d:4.9}, "Fang":{d:4.6}, "Clancy":{d:3.7}, "Leon":{d:3.5}, "Kenji":{d:2.8},
      "Bonnie":{d:-10,w:39.7}, "Angelo":{d:-8.1,w:44.2}, "Eve":{d:-6.8,w:44.6}, "Gus":{d:-6.2},
      "Grom":{d:-5.9}, "Wendy":{w:72.6}, "Bolt":{w:64.4}, "Damian":{w:62.3}, "Nori":{w:61.5},
      "Starr Nova":{w:60.9}, "Barley":{w:44.1}, "Gene":{w:44.5}
    },
    modes: {
      airHockey: {
        "Bolt":{d:5.6,w:46.7}, "Doug":{d:4.7,w:54.8}, "Jacky":{d:4.1,w:59.5}, "R-T":{d:3.1,w:51.1},
        "Hank":{d:2.7,w:54.5}, "Bibi":{d:2.3,w:54.6}, "Bull":{d:2.3,w:60.3}, "El Primo":{d:2.2,w:60.4},
        "Ziggy":{d:-4.8,w:46.9}, "Lola":{d:-4.5,w:48.1}, "Finx":{d:-3.7,w:44.5}, "Ash":{d:-3.5,w:54.1},
        "Belle":{d:-3.3,w:61.8}, "Jae-Yong":{d:-3.1,w:46.3}, "Charlie":{d:-2.7,w:57}, "Najia":{d:-2.7,w:52}
      },
      bounty: {
        "Bolt":{d:10.4,w:36.9}, "Rosa":{d:9.2,w:59.2}, "Damian":{d:5.8,w:43.5}, "Bibi":{d:5.7,w:48.8},
        "Doug":{d:5.6,w:49}, "Gigi":{d:5.2,w:46.7}, "Cordelius":{d:5,w:55.9}, "Glowy":{d:4.7,w:48.3},
        "Sprout":{d:-6.4,w:33.2}, "Larry & Lawrie":{d:-4.1,w:42}, "Tick":{d:-3.4,w:34.1},
        "Dynamike":{d:-3.3,w:42}, "Bea":{d:-3.1,w:42.3}, "Belle":{d:-3,w:39.2}, "Grom":{d:-2.9,w:38.9},
        "Berry":{d:-2.8,w:50.6}
      },
      brawlBall: {
        "Bolt":{d:5.4,w:50.8}, "Nani":{d:4.2,w:63.1}, "Jacky":{d:4.1,w:51.5}, "Buzz":{d:3.7,w:57.7},
        "Angelo":{d:3.6,w:72.6}, "El Primo":{d:3.6,w:57.1}, "Rosa":{d:3.3,w:55.4}, "Sam":{d:3.2,w:52.5},
        "Sirius":{d:-5.6,w:43.3}, "Wendy":{d:-5,w:27.6}, "Ziggy":{d:-4.6,w:48.1}, "Tick":{d:-4.4,w:48.4},
        "Mico":{d:-3.1,w:54.4}, "Dynamike":{d:-2.8,w:58.2}, "Larry & Lawrie":{d:-2.8,w:46.6},
        "Bo":{d:-2.5,w:47.8}
      },
      gemGrab: {
        "Bolt":{d:7.2,w:37.5}, "Trunk":{d:6.1,w:53}, "Doug":{d:3.7,w:46.5}, "Hank":{d:3.6,w:48.5},
        "Clancy":{d:3.4,w:47.2}, "Charlie":{d:3.1,w:51.7}, "Rosa":{d:2.9,w:51.5}, "Buzz":{d:2.6,w:52.9},
        "Pam":{d:-5,w:44.9}, "Jae-Yong":{d:-4,w:47.7}, "Mr. P":{d:-3.9,w:45.5}, "Grom":{d:-3.6,w:54.2},
        "Mico":{d:-3.6,w:40.1}, "Bo":{d:-3,w:35.9}, "Willow":{d:-3,w:51}, "Lou":{d:-2.9,w:47.3}
      },
      hotZone: {
        "Bolt":{d:7,w:44.4}, "Sam":{d:6.2,w:56.2}, "Trunk":{d:5.2,w:49.5}, "Doug":{d:5.1,w:47.3},
        "R-T":{d:4,w:47.6}, "Hank":{d:3.6,w:42.5}, "Nani":{d:3.6,w:61.5}, "Alli":{d:3.5,w:57.3},
        "Juju":{d:-3.5,w:38.2}, "Dynamike":{d:-3.1,w:51.4}, "Sirius":{d:-3.1,w:41.7}, "Gene":{d:-3,w:68.8},
        "Grom":{d:-2.9,w:57.7}, "Barley":{d:-2.7,w:49.3}, "Ziggy":{d:-2.6,w:48.8}, "Mr. P":{d:-2.4,w:55.8}
      },
      knockout: {
        "Bolt":{d:7.2,w:42.4}, "Trunk":{d:6.1,w:63.4}, "Chuck":{d:4.8,w:58.9}, "Hank":{d:4.7,w:49.7},
        "Jacky":{d:4.5,w:65.4}, "Kaze":{d:4.2,w:52.3}, "Rosa":{d:4.2,w:60.9}, "Ash":{d:4,w:52.8},
        "Wendy":{d:-7.6,w:21}, "Sirius":{d:-6.9,w:36.3}, "Juju":{d:-6,w:39.2}, "Najia":{d:-4.6,w:39.6},
        "Ziggy":{d:-4.3,w:42.8}, "Grom":{d:-4.2,w:42.8}, "Meeple":{d:-4.2,w:39.5}, "Mico":{d:-4,w:40.4}
      }
    }
  },
  "Lumi": {
    vs: {
      "Bibi":{d:4.2,w:61}, "Doug":{d:4,w:56.5}, "Shelly":{d:3.3,w:67.4}, "Nita":{d:2.9,w:58.8},
      "Wendy":{d:2.9,w:38.4}, "Ash":{d:2.2,w:51.3}, "Frank":{d:2,w:60}, "Mortis":{d:2,w:60.7},
      "Ziggy":{d:-6.5,w:49.9}, "Squeak":{d:-4.9,w:51.7}, "Grom":{d:-4.2,w:54.1}, "Mandy":{d:-4.1,w:50.8},
      "Bo":{d:-3.6,w:48.3}, "Meeple":{d:-3.6,w:49.8}, "Penny":{d:-3.5,w:53.4}, "Byron":{d:-3.3,w:55.7},
      "Colt":{w:65.5}, "Edgar":{w:63.1}, "Leon":{w:62.8}, "Rico":{w:62.7}, "Bolt":{w:44.9}, "Nori":{w:45.8},
      "Starr Nova":{w:46.4}, "Damian":{w:46.6}
    },
    with: {
      "Rico":{d:3.6}, "Crow":{d:3}, "Ollie":{d:3}, "Surge":{d:3}, "Ash":{d:2.8,w:67.2},
      "Angelo":{d:-13.1,w:44.3}, "Nani":{d:-11.4,w:48.3}, "Mandy":{d:-8.5}, "Najia":{d:-8.4},
      "Janet":{d:-8.3}, "Wendy":{w:76.8}, "Nori":{w:66.4}, "Damian":{w:66.2}, "Shade":{w:65.7},
      "Gene":{w:47.4}, "Grom":{w:48.1}, "Barley":{w:48.3}
    },
    modes: {
      brawlBall: {
        "Doug":{d:5.1,w:58.9}, "Nita":{d:4.3,w:61.8}, "R-T":{d:3.3,w:55.1}, "Shelly":{d:3,w:70.2},
        "Tara":{d:2.9,w:57}, "Bibi":{d:2.7,w:62.8}, "Gene":{d:2.5,w:69.1}, "Jacky":{d:2.3,w:54.7},
        "Ziggy":{d:-7.4,w:50.4}, "Sprout":{d:-4,w:56.2}, "Meeple":{d:-3.5,w:52.1}, "Willow":{d:-3.1,w:51.8},
        "Grom":{d:-2.9,w:59.3}, "Najia":{d:-2.9,w:58.1}, "Squeak":{d:-2.9,w:56.3}, "Mr. P":{d:-2.7,w:59}
      },
      gemGrab: {
        "Eve":{d:4.3,w:58.4}, "Wendy":{d:3.8,w:34.7}, "Bolt":{d:3.4,w:39.5}, "Pam":{d:3.3,w:59.7},
        "Berry":{d:3.2,w:64.3}, "Ash":{d:3.1,w:52.1}, "Nita":{d:3.1,w:56}, "Gus":{d:2.7,w:55.7},
        "Meeple":{d:-5.8,w:49.5}, "Sirius":{d:-4.4,w:44.3}, "Spike":{d:-4.4,w:50.3}, "Janet":{d:-3.1,w:44.7},
        "Larry & Lawrie":{d:-3,w:55.2}, "Squeak":{d:-2.9,w:52.6}, "Gray":{d:-2.8,w:49.2},
        "Stu":{d:-2.8,w:47.7}
      },
      hotZone: {
        "Doug":{d:5.2,w:49.8}, "Nita":{d:4.9,w:51.7}, "Hank":{d:3.9,w:45.1}, "R-T":{d:3.7,w:49.8},
        "Bibi":{d:3.5,w:50}, "Belle":{d:3,w:69.4}, "Mico":{d:3,w:53.1}, "Gigi":{d:2.9,w:55.7},
        "Gray":{d:-4.3,w:46.1}, "Wendy":{d:-4,w:26.3}, "Meeple":{d:-3.8,w:52.3}, "Bo":{d:-3.4,w:39.3},
        "Clancy":{d:-3.3,w:48}, "Squeak":{d:-3.1,w:53.1}, "Buster":{d:-2.9,w:51.6}, "Damian":{d:-2.8,w:38.7}
      },
      knockout: {
        "Sam":{d:6.8,w:59}, "Pam":{d:5.5,w:58.5}, "Tara":{d:5.2,w:56.7}, "Doug":{d:4.9,w:53.1},
        "Meg":{d:4.4,w:51}, "Darryl":{d:3.9,w:54}, "Charlie":{d:3.7,w:50.1}, "Frank":{d:3.1,w:52.6},
        "Grom":{d:-6.4,w:42.5}, "Sirius":{d:-5.2,w:39.9}, "Meeple":{d:-4.7,w:40.9}, "Squeak":{d:-4,w:43.7},
        "Ziggy":{d:-3.9,w:45.1}, "Mico":{d:-3.3,w:42.9}, "Sprout":{d:-3.3,w:41.2}, "Tick":{d:-3.3,w:44.1}
      }
    }
  },
  "Trunk": {
    vs: {
      "Wendy":{d:9.3,w:40.3}, "Shade":{d:6.4,w:50.2}, "Sprout":{d:4.6,w:54.1}, "Mina":{d:4.5,w:52.1},
      "Mortis":{d:4.5,w:58.3}, "Ash":{d:4.3,w:48.5}, "Kenji":{d:3.8,w:54.5}, "Mr. P":{d:3.7,w:56},
      "Mandy":{d:-5.9,w:44.1}, "Sirius":{d:-5.1,w:42}, "Piper":{d:-3.7,w:50.5}, "Colette":{d:-3.5,w:53},
      "Pierce":{d:-3.4,w:44.1}, "Spike":{d:-3.3,w:52.1}, "Bea":{d:-3.1,w:50.8}, "Byron":{d:-3.1,w:51},
      "Dynamike":{w:58.8}, "Colt":{w:58.4}, "Shelly":{w:57.7}, "Rico":{w:57.3}, "Bolt":{w:40.9},
      "Damian":{w:42.6}
    },
    with: {
      "Rico":{d:8.1}, "Crow":{d:7.6}, "Spike":{d:6.5}, "Surge":{d:6.4}, "Emz":{d:5.6},
      "Angelo":{d:-19.9,w:32.5}, "Rosa":{d:-15.3,w:35.6}, "Nani":{d:-14.5}, "Eve":{d:-14.4,w:37.2},
      "Lola":{d:-13.2}, "Wendy":{w:76.6}, "Nori":{w:64.1}, "Starr Nova":{w:61}, "Griff":{w:60.5},
      "Damian":{w:58.9}, "Bonnie":{w:37}, "Gene":{w:37.3}
    },
    modes: {
      brawlBall: {
        "Wendy":{d:8.1,w:41.7}, "Mr. P":{d:7.8,w:65.7}, "Belle":{d:5.5,w:63.6}, "Gus":{d:5.3,w:53.6},
        "Meeple":{d:5.1,w:56.8}, "Shade":{d:5.1,w:49.7}, "Sprout":{d:4.6,w:61}, "Ash":{d:4,w:46.7},
        "Sirius":{d:-6.3,w:43.7}, "Frank":{d:-3.9,w:52.9}, "Angelo":{d:-3.4,w:66.6}, "Griff":{d:-3.4,w:47.1},
        "Clancy":{d:-3.2,w:50.7}, "Doug":{d:-2.9,w:46.9}, "Lou":{d:-2.8,w:44.2}, "Kit":{d:-2.4,w:54.1}
      }
    }
  },
  "Brock": {
    vs: {
      "Sirius":{d:3.4,w:49}, "Emz":{d:2.4,w:53.6}, "Crow":{d:2.2,w:58.6}, "R-T":{d:2.2,w:45.5},
      "Bea":{d:2.1,w:54.4}, "Juju":{d:2,w:49.5}, "Spike":{d:2,w:55.9}, "Tara":{d:2,w:49.8},
      "Bolt":{d:-4.2,w:32.5}, "Mortis":{d:-3.6,w:48.6}, "Kenji":{d:-3.5,w:45.6}, "Kaze":{d:-3.3,w:44.1},
      "Meg":{d:-3.3,w:43.6}, "Draco":{d:-3.1,w:42.9}, "Chuck":{d:-2.9,w:46.4}, "Bonnie":{d:-2.7,w:49.5},
      "Rico":{w:58}, "Colt":{w:57.8}, "Shelly":{w:57.6}, "Dynamike":{w:57.1}, "Wendy":{w:29.4},
      "Damian":{w:38.5}, "Starr Nova":{w:39.6}, "Nori":{w:40.1}
    },
    with: {
      "Bonnie":{d:6.7}, "Pearl":{d:6}, "Gene":{d:5.8}, "Angelo":{d:5.1}, "Nani":{d:4.1}, "Amber":{d:-3.1},
      "Lumi":{d:-3.1}, "Trunk":{d:-3}, "Lou":{d:-2.9}, "Shade":{d:-2.9}, "Wendy":{w:72.3}, "Bolt":{w:66.3},
      "Starr Nova":{w:60.5}, "Damian":{w:59.9}, "Nori":{w:59.8}, "Shelly":{w:41.2}, "Colt":{w:41.9},
      "Rico":{w:42.5}, "Dynamike":{w:43}, "Edgar":{w:43.7}
    },
    modes: {
      airHockey: {
        "Charlie":{d:5.9,w:59.1}, "Juju":{d:3.6,w:50.8}, "Lou":{d:3.5,w:50.9}, "Ash":{d:3.3,w:54.4},
        "Grom":{d:3.2,w:62.5}, "Buster":{d:3.1,w:59}, "R-T":{d:3.1,w:44.6}, "Pearl":{d:3,w:60},
        "Wendy":{d:-6.3,w:25.8}, "Najia":{d:-4.6,w:43.4}, "Bolt":{d:-4.5,w:30.4}, "Mico":{d:-3.8,w:46.1},
        "Chuck":{d:-3.5,w:47.2}, "Alli":{d:-3.3,w:43.7}, "Mortis":{d:-3.2,w:45.7}, "Nori":{d:-3.2,w:37.9}
      },
      basketBrawl: {
        "Charlie":{d:7.5,w:57.8}, "Grom":{d:5.9,w:69.5}, "Larry & Lawrie":{d:4.8,w:60.1},
        "Barley":{d:4.3,w:62}, "Mr. P":{d:3.9,w:71.7}, "Bea":{d:3.8,w:50.5}, "Berry":{d:3.7,w:58.7},
        "Ollie":{d:3.4,w:59.6}, "Glowy":{d:-6.9,w:35.8}, "Starr Nova":{d:-6.3,w:27.4}, "Bolt":{d:-6.1,w:30.4},
        "Draco":{d:-5.9,w:32.8}, "Damian":{d:-5.3,w:25.5}, "Finx":{d:-5.2,w:36.3}, "Mortis":{d:-5.1,w:43.9},
        "Hank":{d:-4.8,w:34.5}
      },
      bounty: {
        "Emz":{d:3.8,w:61.2}, "Griff":{d:3.1,w:57.7}, "Sirius":{d:2.8,w:54.2}, "Berry":{d:2.7,w:67.6},
        "Jessie":{d:2.6,w:59.9}, "Rico":{d:2.6,w:61.8}, "Colette":{d:2.4,w:63.2}, "Crow":{d:2.4,w:58.9},
        "Bolt":{d:-5.7,w:31}, "Sam":{d:-3.9,w:54}, "Mortis":{d:-3.4,w:48.8}, "Chuck":{d:-3.1,w:55.1},
        "Kit":{d:-3.1,w:47.3}, "Max":{d:-3.1,w:49.9}, "Kaze":{d:-3,w:51.2}, "Kenji":{d:-2.9,w:49.8}
      },
      brawlArena: {
        "Sirius":{d:3.1,w:60.7}, "Jessie":{d:2.6,w:57.6}, "8-Bit":{d:1.9,w:45.2}, "Lou":{d:1.8,w:61},
        "Chester":{d:1.5,w:56.3}, "Colette":{d:1.5,w:57.2}, "Emz":{d:1.3,w:55.5}, "Spike":{d:1.3,w:57.4},
        "Bonnie":{d:-5.4,w:58.7}, "Ollie":{d:-4.8,w:61.6}, "Stu":{d:-4.2,w:47.8}, "Angelo":{d:-3.8,w:59.5},
        "Shade":{d:-3.6,w:45.5}, "Gray":{d:-3.5,w:45.9}, "Bolt":{d:-3.1,w:41.1}, "Jae-Yong":{d:-3.1,w:63.5}
      },
      brawlBall: {
        "Rico":{d:3,w:56.8}, "Dynamike":{d:2.6,w:56.8}, "Clancy":{d:2.5,w:48.4}, "Lou":{d:2.4,w:41.5},
        "Crow":{d:2.3,w:57.6}, "Tara":{d:2.3,w:44.5}, "Sirius":{d:2.2,w:44.3}, "Emz":{d:2.1,w:50.7},
        "Chuck":{d:-6.1,w:46.8}, "Bolt":{d:-5.2,w:33.4}, "Glowy":{d:-4.7,w:41.2}, "Wendy":{d:-4.5,w:22.3},
        "Angelo":{d:-4.3,w:58.6}, "Belle":{d:-4.3,w:45.9}, "Draco":{d:-3.8,w:38.1}, "Meg":{d:-3.8,w:39}
      },
      brawlBall5V5: {
        "Shade":{d:6.4,w:54.5}, "Gus":{d:5.9,w:54.8}, "8-Bit":{d:5.7,w:47}, "Lumi":{d:5.5,w:50.6},
        "Otis":{d:4.3,w:49.7}, "Meg":{d:4.2,w:45.7}, "Meeple":{d:4,w:57.5}, "Amber":{d:3.8,w:47},
        "Bolt":{d:-4.1,w:29.6}, "Mortis":{d:-2.6,w:48.2}, "Bibi":{d:-2.2,w:45.1}, "Mico":{d:-2.1,w:53.2},
        "Buzz":{d:-2,w:54.6}, "Kenji":{d:-2,w:42.1}, "Edgar":{d:-1.9,w:52.3}, "Lily":{d:-1.7,w:52.5}
      },
      deathmatch5v5: {
        "Wendy":{d:5.2,w:41.6}, "Shade":{d:3.1,w:65.2}, "Lumi":{d:2.7,w:63.5}, "Melodie":{d:2.4,w:62.2},
        "Nita":{d:2.4,w:63.8}, "Frank":{d:2.2,w:62.2}, "8-Bit":{d:1.9,w:45.9}, "Shelly":{d:1.9,w:63.3},
        "Bolt":{d:-2.9,w:35.2}, "Mico":{d:-2.3,w:52.7}, "Chuck":{d:-2.1,w:51.6}, "Ollie":{d:-1.9,w:54.9},
        "Kenji":{d:-1.7,w:50.3}, "Gigi":{d:-1.6,w:52}, "Lily":{d:-1.5,w:50.9}, "Ash":{d:-1.3,w:54.2}
      },
      duels: {
        "Barley":{d:3.6,w:68.9}, "Nita":{d:3.3,w:59.3}, "Clancy":{d:2.9,w:72.1}, "Tara":{d:2.8,w:52.5},
        "Tick":{d:2.4,w:70}, "Emz":{d:2.3,w:62.1}, "Bull":{d:2.2,w:56.1}, "Penny":{d:2.1,w:59.3},
        "Wendy":{d:-7.2,w:28.9}, "Draco":{d:-3.8,w:37}, "Glowy":{d:-3.7,w:34.7}, "Jae-Yong":{d:-3.7,w:42.6},
        "Mina":{d:-3.7,w:43.5}, "Damian":{d:-3.4,w:44.7}, "Starr Nova":{d:-3.3,w:40.5},
        "Ruffs":{d:-3.2,w:40.8}
      },
      gemGrab: {
        "Juju":{d:3.1,w:49.8}, "Lou":{d:3.1,w:53.7}, "Jessie":{d:3,w:48.2}, "Tara":{d:2.9,w:46.2},
        "Berry":{d:2.7,w:57.8}, "Buster":{d:2.5,w:55}, "8-Bit":{d:2.4,w:48}, "Penny":{d:2.4,w:50.4},
        "Bolt":{d:-7,w:23.6}, "Wendy":{d:-4.8,w:21.1}, "Nori":{d:-4.7,w:35.2}, "Damian":{d:-4.3,w:32.6},
        "Mortis":{d:-3.7,w:40.4}, "Trunk":{d:-3.7,w:43.5}, "Angelo":{d:-3.5,w:49.5}, "Mico":{d:-3.5,w:40.5}
      },
      heist: {
        "Ollie":{d:5,w:89.7}, "Gene":{d:4.2,w:92}, "Buster":{d:4.1,w:72.3}, "Sandy":{d:4,w:81.8},
        "Pam":{d:3.4,w:68.1}, "Tara":{d:3.4,w:61.3}, "Mandy":{d:3.3,w:46.3}, "Bonnie":{d:3.2,w:70.9},
        "Mortis":{d:-5.8,w:53.8}, "Starr Nova":{d:-4.9,w:34.6}, "Kit":{d:-4.7,w:46.8}, "Nori":{d:-4.6,w:24.4},
        "Kaze":{d:-3.9,w:34.7}, "Bolt":{d:-3.7,w:39.2}, "Gray":{d:-3.7,w:50.1}, "Doug":{d:-3.6,w:42.1}
      },
      hotZone: {
        "Charlie":{d:5.1,w:58}, "R-T":{d:4.3,w:41.3}, "Maisie":{d:3.5,w:54.9}, "Jessie":{d:3.3,w:40.3},
        "Barley":{d:3.2,w:48.4}, "Eve":{d:2.9,w:49.9}, "Lou":{d:2.6,w:42.8}, "Berry":{d:2.4,w:42.5},
        "Wendy":{d:-10.6,w:12.4}, "Glowy":{d:-6.5,w:33.5}, "Mortis":{d:-6.1,w:37.4}, "Bolt":{d:-6,w:25.1},
        "Mina":{d:-5,w:32.3}, "Damian":{d:-4.8,w:28}, "Starr Nova":{d:-4.6,w:28}, "Alli":{d:-4.5,w:42.4}
      },
      knockout: {
        "Sirius":{d:5.2,w:50.4}, "Griff":{d:3.1,w:52.4}, "Juju":{d:2.3,w:49.5}, "Doug":{d:1.9,w:50.3},
        "Spike":{d:1.9,w:58.3}, "Berry":{d:1.8,w:51.9}, "Emz":{d:1.8,w:59.9}, "Otis":{d:1.8,w:48.7},
        "Ollie":{d:-3.8,w:46.3}, "Bolt":{d:-3.4,w:33.7}, "Kenji":{d:-3.4,w:46}, "Chuck":{d:-3.3,w:52.9},
        "Sam":{d:-3.1,w:49.2}, "Trunk":{d:-3,w:56.4}, "Ash":{d:-2.9,w:47.9}, "Rosa":{d:-2.9,w:55.8}
      },
      knockout5V5: {
        "Lumi":{d:4.6,w:43.3}, "Lou":{d:3.4,w:54.1}, "Buster":{d:3.2,w:56.8}, "Otis":{d:2.2,w:52.7},
        "Nita":{d:2.1,w:57.1}, "Belle":{d:2,w:49.3}, "Rosa":{d:1.8,w:45.3}, "Bo":{d:1.7,w:45.5},
        "Bolt":{d:-3.9,w:46.8}, "Damian":{d:-3.7,w:43}, "Wendy":{d:-3.6,w:35.2}, "Ash":{d:-3,w:32.2},
        "Draco":{d:-2.8,w:42.5}, "Mico":{d:-2.8,w:45}, "Hank":{d:-2.6,w:36.1}, "Starr Nova":{d:-2.3,w:38.2}
      },
      wipeout: {
        "Jacky":{d:6.7,w:73.6}, "Buster":{d:4.9,w:62.7}, "Jessie":{d:3.9,w:61.3}, "Emz":{d:3.6,w:58.6},
        "Nita":{d:3.4,w:63.8}, "Berry":{d:3.1,w:71.4}, "Barley":{d:2.9,w:67.3}, "Wendy":{d:2.9,w:31.1},
        "Bolt":{d:-6.9,w:28.3}, "Mico":{d:-6.2,w:49}, "Hank":{d:-5.8,w:50.7}, "Kaze":{d:-4.1,w:51.1},
        "Kit":{d:-3.8,w:46.9}, "Moe":{d:-3.3,w:50}, "Glowy":{d:-3.1,w:46.5}, "Nori":{d:-3.1,w:43.7}
      }
    }
  },
  "Frank": {
    vs: {
      "Gene":{d:5.5,w:57}, "Angelo":{d:5.1,w:53.4}, "Mr. P":{d:5,w:54.3}, "Jae-Yong":{d:4.5,w:53.4},
      "Kit":{d:4.4,w:51}, "Ash":{d:4.2,w:45.4}, "Bonnie":{d:4.2,w:55}, "Bolt":{d:4.1,w:39.5},
      "Colette":{d:-6.4,w:47.1}, "Dynamike":{d:-5.7,w:48.9}, "Lou":{d:-5.7,w:39.9}, "Bo":{d:-4.8,w:39.1},
      "Jessie":{d:-4.7,w:42.5}, "El Primo":{d:-2.9,w:47.6}, "Ziggy":{d:-2.8,w:45.7}, "Emz":{d:-2.7,w:46.9},
      "Leon":{w:56.9}, "Shelly":{w:55.4}, "Colt":{w:55.2}, "Rico":{w:55.2}, "Wendy":{w:32.3}, "Lumi":{w:40}
    },
    with: {
      "Jacky":{d:7.9}, "Rosa":{d:6.6}, "Sam":{d:5.8}, "Kit":{d:4.8}, "Draco":{d:4.4}, "Gene":{d:-6.9,w:39.3},
      "Eve":{d:-6.1}, "Mr. P":{d:-4.4}, "Rico":{d:-3.6,w:39.6}, "Bonnie":{d:-3.4}, "Wendy":{w:67.4},
      "Bolt":{w:62.4}, "Damian":{w:61.3}, "Starr Nova":{w:59.7}, "Ash":{w:59}, "Shelly":{w:38.2},
      "Colt":{w:39}, "Edgar":{w:40.5}
    },
    modes: {
      airHockey: {
        "Buster":{d:6,w:62.2}, "Ash":{d:5.2,w:56.6}, "Sandy":{d:3.9,w:54.1}, "Lily":{d:2.9,w:62.2},
        "Chuck":{d:2.7,w:53.5}, "Otis":{d:2.7,w:59.4}, "Eve":{d:2.6,w:67.5}, "Charlie":{d:2.4,w:55.9},
        "Dynamike":{d:-5.5,w:49.1}, "Juju":{d:-4.9,w:42.5}, "Colette":{d:-4.5,w:46.2}, "Lou":{d:-3.9,w:43.8},
        "Ziggy":{d:-3.8,w:41.6}, "Willow":{d:-3.5,w:40.3}, "Sirius":{d:-3.3,w:40.7}, "Bo":{d:-3.1,w:40.9}
      },
      basketBrawl: {
        "Janet":{d:7.2,w:62.9}, "Jae-Yong":{d:5.2,w:57.4}, "Mr. P":{d:4.9,w:79.1}, "Ash":{d:3.5,w:58.3},
        "Poco":{d:3.5,w:60.7}, "Otis":{d:3.4,w:61.1}, "Pam":{d:3.3,w:60.3}, "Carl":{d:3.2,w:59.2},
        "Colette":{d:-6.5,w:47.7}, "Dynamike":{d:-4.7,w:55.7}, "Lou":{d:-4.4,w:48.3}, "Ziggy":{d:-2.9,w:51.5},
        "Juju":{d:-2.5,w:51.9}, "El Primo":{d:-2.4,w:49.3}, "Bolt":{d:-2.1,w:41.9}, "Willow":{d:-2.1,w:51.1}
      },
      bounty: {
        "Bolt":{d:10.9,w:41.4}, "Kit":{d:7.1,w:50.5}, "Chuck":{d:5.5,w:56.7}, "Ollie":{d:5,w:68.1},
        "Damian":{d:4.9,w:47.3}, "Mortis":{d:4.8,w:50}, "Gene":{d:4,w:53.7}, "Maisie":{d:3.7,w:57.7},
        "Colette":{d:-9.2,w:44.8}, "Lou":{d:-8.5,w:46.4}, "Dynamike":{d:-7.1,w:43}, "Bo":{d:-6.6,w:36.5},
        "Jessie":{d:-6.6,w:43.7}, "8-Bit":{d:-5.8,w:39.9}, "Juju":{d:-5.7,w:39.4}, "Emz":{d:-5.4,w:45.1}
      },
      brawlBall: {
        "Ash":{d:5,w:41.2}, "Rosa":{d:4.7,w:51.1}, "Doug":{d:4.6,w:47.6}, "Mr. P":{d:4.2,w:55.3},
        "Trunk":{d:3.9,w:47.1}, "Bonnie":{d:3.8,w:52.5}, "Chuck":{d:3.7,w:57.8}, "Hank":{d:3.7,w:47.1},
        "Dynamike":{d:-6.2,w:49.1}, "Colette":{d:-5.2,w:47.4}, "Lou":{d:-5,w:35.2}, "Bo":{d:-3,w:41.6},
        "Ziggy":{d:-2.5,w:44.4}, "Pierce":{d:-2.3,w:41.3}, "Nani":{d:-2.2,w:51.1}, "Tick":{d:-2.2,w:44.9}
      },
      brawlBall5V5: {
        "Gus":{d:10.4,w:57.7}, "Shade":{d:7.1,w:53.6}, "Ash":{d:7,w:51.4}, "Lumi":{d:6.4,w:49.9},
        "Bonnie":{d:5.7,w:56.5}, "R-T":{d:5.6,w:56.1}, "Amber":{d:5.5,w:47.1}, "Rosa":{d:5.2,w:56.2},
        "Ziggy":{d:-4.4,w:42.5}, "Cordelius":{d:-3.6,w:51.3}, "Sirius":{d:-3.4,w:45.5},
        "Grom":{d:-3.1,w:46.7}, "Bo":{d:-2.9,w:44.4}, "Tick":{d:-2.6,w:44}, "Dynamike":{d:-2.5,w:49.5},
        "Buzz":{d:-2.4,w:52.6}
      },
      gemGrab: {
        "Ollie":{d:7.2,w:62.8}, "Ash":{d:5.8,w:48.2}, "Doug":{d:5.6,w:48.4}, "Shade":{d:5.5,w:47.4},
        "Rosa":{d:5.4,w:53.9}, "Buster":{d:5,w:57.1}, "Maisie":{d:4.7,w:59.6}, "Alli":{d:4.2,w:48.8},
        "Bo":{d:-6.7,w:32}, "Dynamike":{d:-5.2,w:45.6}, "Colette":{d:-4.7,w:46.6}, "Jessie":{d:-3.7,w:41.1},
        "Tick":{d:-3.2,w:42.4}, "Juju":{d:-3.1,w:43.2}, "Lou":{d:-3,w:47.1}, "Emz":{d:-2.9,w:41.9}
      },
      hotZone: {
        "Gus":{d:8.7,w:63.3}, "Jae-Yong":{d:7.6,w:68.2}, "Trunk":{d:6.6,w:53.1}, "Angelo":{d:6.4,w:71.9},
        "Ash":{d:6.3,w:55.7}, "Gene":{d:6.3,w:79.8}, "Rosa":{d:6.3,w:61.6}, "Meeple":{d:6.2,w:61.9},
        "Bo":{d:-8,w:34.4}, "Dynamike":{d:-6.9,w:49.6}, "Colette":{d:-5.5,w:51.1}, "Ziggy":{d:-4.6,w:48.9},
        "Pierce":{d:-4.4,w:46.4}, "Lou":{d:-4.2,w:44.9}, "Tick":{d:-4,w:44.4}, "Emz":{d:-3.5,w:44.5}
      },
      knockout: {
        "Bolt":{d:9.2,w:46.6}, "Mico":{d:8.1,w:54.8}, "Doug":{d:7.9,w:56.5}, "Alli":{d:7.7,w:58},
        "Damian":{d:6.7,w:53.6}, "Kit":{d:5.6,w:52.1}, "Chuck":{d:5.1,w:61.5}, "Wendy":{d:4.7,w:35.3},
        "Colette":{d:-12.1,w:46.1}, "Charlie":{d:-8.1,w:38.8}, "Lou":{d:-7.7,w:41},
        "Dynamike":{d:-7.4,w:50.7}, "Crow":{d:-5.5,w:57.1}, "Jessie":{d:-5.1,w:47.3}, "8-Bit":{d:-4.7,w:44.2},
        "Bea":{d:-4.5,w:49.8}
      }
    }
  },
  "Kit": {
    vs: {
      "Bolt":{d:5.7,w:44.2}, "Najia":{d:5.7,w:55.6}, "Sprout":{d:5.2,w:55.1}, "Angelo":{d:4.6,w:56.1},
      "Mico":{d:4.4,w:51.9}, "Wendy":{d:3.2,w:34.5}, "Grom":{d:3.1,w:56.8}, "Shade":{d:3.1,w:47.2},
      "Frank":{d:-4.4,w:49}, "Griff":{d:-4,w:43.9}, "Bibi":{d:-3.1,w:49.1}, "Bull":{d:-3,w:51.9},
      "Charlie":{d:-2.9,w:48.6}, "R-T":{d:-2.9,w:42.3}, "Colette":{d:-2.5,w:54.3}, "Emz":{d:-2.4,w:50.6},
      "Leon":{w:60.5}, "Barley":{w:59.7}, "Colt":{w:59.7}, "Rico":{w:59.6}, "Shelly":{w:57.8},
      "Damian":{w:41}, "Starr Nova":{w:43.1}
    },
    with: {
      "Rosa":{d:7.6,w:59}, "Darryl":{d:4.8}, "Frank":{d:4.8}, "Ollie":{d:3.8}, "Bonnie":{d:3.7},
      "Shade":{d:-10.3}, "Nori":{d:-9.3}, "Amber":{d:-8.5}, "Chester":{d:-8.5,w:46.7}, "Kaze":{d:-8.4,w:46.9},
      "Bolt":{w:66.1}, "Wendy":{w:64.4}, "Damian":{w:60.3}, "Ash":{w:60.1}, "Mortis":{w:44.5},
      "Alli":{w:45.9}, "Colt":{w:47}
    },
    modes: {
      bounty: {
        "Bolt":{d:9.8,w:46.2}, "Najia":{d:5.7,w:56}, "Wendy":{d:5.3,w:37.7}, "Sprout":{d:5,w:56},
        "Angelo":{d:4.9,w:57.2}, "Grom":{d:3.7,w:57}, "Brock":{d:3.1,w:52.7}, "Mortis":{d:3.1,w:55},
        "Charlie":{d:-8.8,w:50.9}, "Frank":{d:-7.1,w:49.5}, "Griff":{d:-7.1,w:47.1}, "Lou":{d:-6.7,w:54.7},
        "Colette":{d:-6.3,w:54.1}, "Bull":{d:-6.2,w:56.3}, "Cordelius":{d:-5.5,w:56.7},
        "Shelly":{d:-4.5,w:60.8}
      },
      brawlBall: {
        "Belle":{d:7.2,w:58.7}, "Sprout":{d:7.1,w:56.8}, "Angelo":{d:6.6,w:70.7}, "Gene":{d:5.6,w:62.3},
        "Chuck":{d:5.3,w:59.7}, "Barley":{d:4.9,w:55.4}, "Mr. P":{d:4.8,w:56.1}, "Najia":{d:4.8,w:55.4},
        "Wendy":{d:-6.7,w:21.2}, "Tick":{d:-4.5,w:42.9}, "Mortis":{d:-4.2,w:48.4}, "Griff":{d:-3.2,w:40.7},
        "Jacky":{d:-3.2,w:38.7}, "Doug":{d:-2.9,w:40.3}, "Damian":{d:-2.7,w:34.6}, "Hank":{d:-2.5,w:41.1}
      },
      duels: {
        "Squeak":{d:6.3,w:70.3}, "Clancy":{d:4.8,w:72.3}, "Dynamike":{d:4.8,w:67.1}, "Ollie":{d:4.8,w:71.9},
        "Barley":{d:4.4,w:68}, "Grom":{d:4.2,w:75}, "Sprout":{d:4.2,w:48.8}, "Tick":{d:4.1,w:69.9},
        "R-T":{d:-4.7,w:29.8}, "Jacky":{d:-4.2,w:60.3}, "Rosa":{d:-4.2,w:39.5}, "Wendy":{d:-3.9,w:30.4},
        "Sam":{d:-3.8,w:41.7}, "Doug":{d:-3.4,w:46.9}, "Trunk":{d:-3,w:43.1}, "Ash":{d:-2.8,w:45.8}
      },
      gemGrab: {
        "Sprout":{d:7.4,w:62}, "Angelo":{d:6.6,w:64.1}, "Chuck":{d:4.8,w:56.4}, "Jae-Yong":{d:4.6,w:61.2},
        "Shade":{d:4.1,w:51}, "Belle":{d:4,w:65.3}, "Willow":{d:4,w:62.8}, "Gigi":{d:3.8,w:54.9},
        "Melodie":{d:-5.2,w:52.6}, "Hank":{d:-3.9,w:46}, "Wendy":{d:-3.6,w:26}, "Frank":{d:-3.4,w:51.6},
        "Berry":{d:-3.1,w:56.5}, "Tick":{d:-2.7,w:48.1}, "Bull":{d:-2.3,w:50.9}, "Charlie":{d:-2.2,w:51.4}
      },
      hotZone: {
        "Gus":{d:8.3,w:59.9}, "Gene":{d:7.9,w:78.9}, "Sprout":{d:7.4,w:61.3}, "Max":{d:7.1,w:62.3},
        "Meg":{d:5.7,w:50.4}, "Belle":{d:5.6,w:68.9}, "Shade":{d:5.4,w:49.8}, "Otis":{d:5.1,w:61.4},
        "Melodie":{d:-4.1,w:50}, "Bo":{d:-4,w:35.4}, "Tick":{d:-3.8,w:41.6}, "Berry":{d:-2.9,w:43},
        "Bull":{d:-2.9,w:49.4}, "Emz":{d:-2.9,w:42.1}, "Griff":{d:-2.7,w:40}, "Doug":{d:-2.5,w:38.7}
      },
      knockout: {
        "Najia":{d:6.1,w:56.1}, "Bolt":{d:5.6,w:46.3}, "Sprout":{d:5.6,w:54}, "Wendy":{d:5.4,w:39.1},
        "Mico":{d:5.3,w:55.5}, "Grom":{d:3.8,w:56.7}, "Angelo":{d:3.7,w:55}, "Mr. P":{d:3.6,w:52.8},
        "Charlie":{d:-5.9,w:44.5}, "Frank":{d:-5.6,w:47.9}, "Colette":{d:-5.5,w:56}, "Doug":{d:-4.4,w:47.7},
        "Griff":{d:-4.4,w:48.8}, "Cordelius":{d:-4,w:51.8}, "Shelly":{d:-3.6,w:59.3}, "Rosa":{d:-3.2,w:59.1}
      },
      knockout5V5: {
        "Sprout":{d:6.7,w:54.1}, "Tara":{d:5.7,w:63.2}, "Meg":{d:5.5,w:61}, "Maisie":{d:4.6,w:63.7},
        "Shade":{d:4.5,w:56.8}, "Sandy":{d:4.4,w:62.6}, "Barley":{d:3.8,w:61.8}, "Jacky":{d:3.8,w:65.4},
        "Lumi":{d:-5.5,w:34.6}, "Rosa":{d:-4.5,w:40.4}, "Damian":{d:-3.2,w:44.9}, "Clancy":{d:-3,w:53.5},
        "Bo":{d:-2.9,w:42.5}, "Eve":{d:-2.6,w:47}, "Najia":{d:-2.5,w:49.6}, "Bull":{d:-2.3,w:49.3}
      }
    }
  },
  "Gray": {
    vs: {
      "Dynamike":{d:2.9,w:63}, "Crow":{d:2.7,w:63.3}, "Piper":{d:2.2,w:59.2}, "Mico":{d:1.9,w:51.8},
      "Bea":{d:1.8,w:58.4}, "Edgar":{d:1.5,w:61.7}, "Brock":{d:1.4,w:55.7}, "Mandy":{d:1.4,w:54},
      "Sirius":{d:-5.4,w:44.4}, "Buster":{d:-5.2,w:47.8}, "Eve":{d:-4.9,w:50.2}, "Pearl":{d:-4.4,w:46.5},
      "Wendy":{d:-4.4,w:29}, "Ollie":{d:-4.3,w:53}, "Bonnie":{d:-4.1,w:52.4}, "Pam":{d:-4,w:52.6},
      "Colt":{w:62.6}, "Shelly":{w:62.6}, "Bolt":{w:38.8}, "Damian":{w:41.2}, "Starr Nova":{w:44}
    },
    with: {
      "Ash":{d:5.5,w:67.9}, "Leon":{d:5.2}, "Belle":{d:4.9}, "Rico":{d:4.8}, "Rosa":{d:4.5},
      "Chuck":{d:-8.7,w:47}, "Shade":{d:-6.9}, "Sam":{d:-5.9}, "Kit":{d:-5.7}, "Kaze":{d:-5.6},
      "Wendy":{w:71}, "Bolt":{w:63.4}, "Starr Nova":{w:60.6}, "Pearl":{w:60.2}, "Mortis":{w:47.9},
      "Barley":{w:48.6}, "Shelly":{w:49.8}, "Lola":{w:50}
    },
    modes: {
      airHockey: {
        "Mico":{d:6.6,w:62.8}, "Alli":{d:4.4,w:57.7}, "Dynamike":{d:3.9,w:64.4}, "Nani":{d:3.9,w:59},
        "Kaze":{d:2.9,w:52.7}, "Moe":{d:2.9,w:51}, "Mandy":{d:2.6,w:56.3}, "Willow":{d:2.5,w:52.3},
        "Ash":{d:-8.6,w:48.8}, "Charlie":{d:-5.8,w:53.6}, "Ollie":{d:-5.6,w:58.5}, "Buster":{d:-5.5,w:56.4},
        "Eve":{d:-4.9,w:65.3}, "Wendy":{d:-4.1,w:33.7}, "Otis":{d:-3.7,w:58.9}, "Pearl":{d:-3.7,w:59.4}
      },
      bounty: {
        "Dynamike":{d:3.9,w:59.8}, "Grom":{d:2.6,w:54.9}, "Sprout":{d:2.5,w:52.6}, "Edgar":{d:2.2,w:56.1},
        "Surge":{d:2.2,w:54.4}, "Piper":{d:1.9,w:52.9}, "Tick":{d:1.9,w:49.8}, "Brock":{d:1.8,w:50.6},
        "Draco":{d:-7.3,w:51.2}, "Sirius":{d:-7.1,w:43.1}, "Charlie":{d:-5,w:53.8}, "Ash":{d:-4.3,w:53.6},
        "Pam":{d:-4,w:58.8}, "Trunk":{d:-3.7,w:60.2}, "Eve":{d:-3.6,w:49.2}, "Ollie":{d:-3.6,w:64.7}
      },
      brawlBall: {
        "Dynamike":{d:3.9,w:61.9}, "Brock":{d:2.8,w:56.7}, "Surge":{d:2.8,w:55.7}, "Barley":{d:2.7,w:55.5},
        "Crow":{d:2.3,w:61.4}, "Gus":{d:2.3,w:46.4}, "Nani":{d:2.2,w:58.1}, "Shelly":{d:2.2,w:61.8},
        "Wendy":{d:-8.4,w:21.5}, "Sirius":{d:-7.1,w:38.8}, "Damian":{d:-6.9,w:32.8}, "Buster":{d:-5.3,w:40.5},
        "Ash":{d:-5.2,w:33.5}, "Bolt":{d:-5.2,w:37.1}, "Lola":{d:-4.2,w:46.3}, "Starr Nova":{d:-4.2,w:36.1}
      },
      gemGrab: {
        "Sprout":{d:7.1,w:61.2}, "Meg":{d:3.6,w:53.1}, "Belle":{d:3.5,w:64.4}, "Surge":{d:3.4,w:52.3},
        "Dynamike":{d:3.2,w:58.6}, "Brock":{d:3,w:57.3}, "Otis":{d:2.9,w:57.5}, "Janet":{d:2.8,w:48.6},
        "Sirius":{d:-8.7,w:38}, "Wendy":{d:-7.9,w:21.4}, "Damian":{d:-5.3,w:35.6}, "Nori":{d:-5.3,w:38.8},
        "Ash":{d:-4.7,w:42.3}, "Draco":{d:-4.5,w:43.4}, "Larry & Lawrie":{d:-4.5,w:51.7},
        "Lola":{d:-4.5,w:48.8}
      },
      hotZone: {
        "Sprout":{d:6.3,w:63.2}, "Meeple":{d:5.6,w:61.2}, "Surge":{d:5.6,w:54.2}, "Dynamike":{d:5.1,w:61.6},
        "Grom":{d:4.5,w:67.1}, "Lumi":{d:4.3,w:53.9}, "Clancy":{d:4,w:55}, "Brock":{d:3.9,w:62.8},
        "Rosa":{d:-7.7,w:47.7}, "Alli":{d:-7.1,w:48.7}, "Pam":{d:-7.1,w:44}, "Doug":{d:-7,w:37.2},
        "Bonnie":{d:-6.8,w:59}, "Nani":{d:-6.6,w:53.3}, "Nita":{d:-6.1,w:40.3}, "Shelly":{d:-5.6,w:52.9}
      },
      knockout: {
        "Dynamike":{d:3.9,w:66.9}, "Shelly":{d:2.7,w:67.1}, "Ziggy":{d:2.5,w:57.1}, "Sprout":{d:2.3,w:52.4},
        "Crow":{d:2.2,w:69.5}, "Amber":{d:2.1,w:56.4}, "Lumi":{d:2.1,w:57.7}, "Tick":{d:2.1,w:55.1},
        "Ash":{d:-8.9,w:47.4}, "Wendy":{d:-7,w:28.2}, "Sirius":{d:-5.3,w:45.4}, "Ollie":{d:-4.8,w:50.8},
        "Doug":{d:-4.7,w:49.1}, "Buster":{d:-4.5,w:46.1}, "Damian":{d:-4.2,w:47.9}, "Glowy":{d:-4.1,w:48}
      }
    }
  },
  "Leon": {
    vs: {
      "Rosa":{d:3.1,w:47.7}, "Barley":{d:2.3,w:50.6}, "Clancy":{d:2.2,w:45.3}, "Ollie":{d:2,w:48.5},
      "Najia":{d:1.8,w:43.3}, "Trunk":{d:1.8,w:43.8}, "Amber":{d:1.5,w:38.7}, "El Primo":{d:1.5,w:46.9},
      "Wendy":{d:-3,w:21.5}, "Mortis":{d:-2.9,w:42.8}, "Doug":{d:-2.4,w:37.1}, "Gene":{d:-2.4,w:44},
      "Sprout":{d:-2.4,w:39.1}, "Tara":{d:-2.3,w:39.1}, "Kit":{d:-2.2,w:39.5}, "Sirius":{d:-2,w:37.1},
      "Colt":{w:52.1}, "Shelly":{w:51.1}, "Rico":{w:50.6}, "Dynamike":{w:50.2}, "Bolt":{w:29.8},
      "Damian":{w:32.6}, "Starr Nova":{w:34}, "Nori":{w:34.8}
    },
    with: {
      "Lola":{d:8.3}, "Angelo":{d:7.7}, "Eve":{d:7.7}, "Sprout":{d:7.4}, "Janet":{d:7.1},
      "Crow":{d:-5,w:33.2}, "Melodie":{d:-4.7}, "Bull":{d:-4.5}, "Rico":{d:-4.5,w:33.9},
      "Spike":{d:-3.8,w:36.8}, "Wendy":{w:66.3}, "Bolt":{w:62.1}, "R-T":{w:56}, "Starr Nova":{w:54.7},
      "Damian":{w:54.4}, "Colt":{w:33.4}, "Edgar":{w:35.8}
    },
    modes: {
      airHockey: {
        "Otis":{d:6.1,w:57.6}, "Rosa":{d:5.4,w:61.9}, "Bonnie":{d:4.7,w:70.7}, "Lou":{d:4.5,w:46.9},
        "Barley":{d:4.1,w:61.4}, "Gene":{d:3.9,w:63}, "Pearl":{d:3.9,w:56}, "Ash":{d:3.4,w:49.5},
        "Shade":{d:-5.1,w:32}, "Glowy":{d:-4.8,w:35.2}, "Doug":{d:-4.7,w:33.9}, "Mico":{d:-4.6,w:40.3},
        "Alli":{d:-4.5,w:37.5}, "Ziggy":{d:-4.2,w:36}, "Kit":{d:-3.7,w:39.2}, "Trunk":{d:-3.7,w:36.4}
      },
      bounty: {
        "Sam":{d:5.3,w:57.6}, "Trunk":{d:4.9,w:64.6}, "Rosa":{d:4.4,w:60.6}, "Barley":{d:4.3,w:63.6},
        "Chuck":{d:4,w:56.6}, "Najia":{d:3.4,w:48.4}, "Amber":{d:2.7,w:50.4}, "El Primo":{d:2.6,w:65.3},
        "Tara":{d:-3.4,w:52.2}, "Emz":{d:-3.3,w:48.5}, "Gigi":{d:-2.9,w:44.9}, "Wendy":{d:-2.9,w:25},
        "Mortis":{d:-2.5,w:44.1}, "Jessie":{d:-2.1,w:49.6}, "Sirius":{d:-2.1,w:43.7}, "Meg":{d:-1.8,w:51.5}
      },
      brawlBall: {
        "Chuck":{d:5,w:53.2}, "Gus":{d:3.3,w:39.3}, "Piper":{d:3.2,w:52.5}, "Angelo":{d:2.4,w:60.7},
        "Rico":{d:2.3,w:51.4}, "Dynamike":{d:1.9,w:51.4}, "Bonnie":{d:1.8,w:44.7}, "Colt":{d:1.8,w:53.2},
        "Doug":{d:-4.7,w:32.7}, "Sirius":{d:-4.2,w:33.4}, "Damian":{d:-3.9,w:27.9}, "Kit":{d:-3.8,w:40.1},
        "Wendy":{d:-3.8,w:19.4}, "Berry":{d:-3.6,w:38.7}, "Tara":{d:-3.4,w:34.2}, "Mortis":{d:-3.3,w:43.1}
      },
      duels: {
        "Berry":{d:5.6,w:69.7}, "Clancy":{d:5.1,w:67.4}, "Larry & Lawrie":{d:5.1,w:65.4},
        "Barley":{d:4.6,w:62.7}, "Ollie":{d:4.3,w:66.1}, "Squeak":{d:4.1,w:62.6}, "Belle":{d:3.8,w:57.4},
        "Jessie":{d:3.7,w:55.7}, "Wendy":{d:-8.2,w:21.1}, "Damian":{d:-4.7,w:35.7}, "Mina":{d:-4.7,w:34.9},
        "Doug":{d:-4,w:40.6}, "R-T":{d:-3.9,w:25.7}, "Starr Nova":{d:-3.3,w:33.1}, "Mico":{d:-3.2,w:40.8},
        "Mortis":{d:-3.2,w:51.9}
      },
      gemGrab: {
        "Ollie":{d:6.8,w:60.6}, "Ziggy":{d:3.4,w:51.7}, "Meeple":{d:3.3,w:50.1}, "Nani":{d:3,w:52.4},
        "Angelo":{d:2.9,w:53.7}, "Moe":{d:2.8,w:43.1}, "Najia":{d:2.8,w:50.8}, "Bonnie":{d:2.7,w:59.6},
        "Tara":{d:-2.9,w:38.3}, "Wendy":{d:-2.9,w:21.3}, "Poco":{d:-2.7,w:45.3}, "Jacky":{d:-2.3,w:49.8},
        "Bolt":{d:-2.2,w:26.5}, "Jessie":{d:-2.2,w:40.9}, "Pam":{d:-2.2,w:45.8}, "Doug":{d:-2,w:39}
      },
      hotZone: {
        "Bonnie":{d:6.9,w:62.3}, "Gus":{d:6.5,w:50.1}, "Angelo":{d:6.2,w:61.2}, "Melodie":{d:5.2,w:51.4},
        "Otis":{d:4.8,w:53.2}, "Sam":{d:4.7,w:45.8}, "Belle":{d:4.5,w:60.1}, "Alli":{d:4.4,w:49.2},
        "Wendy":{d:-6.6,w:15.1}, "Tara":{d:-4.3,w:35.2}, "Mortis":{d:-3.7,w:37.8}, "Doug":{d:-3.4,w:30.4},
        "Sprout":{d:-3.4,w:42.5}, "Bibi":{d:-3.3,w:32.1}, "Edgar":{d:-3.3,w:37.6}, "Emz":{d:-2.9,w:34.4}
      },
      knockout: {
        "Rosa":{d:4.4,w:54.4}, "Clancy":{d:3.1,w:55.3}, "Najia":{d:3.1,w:40.8}, "Chuck":{d:2.4,w:49.8},
        "Jacky":{d:2.1,w:56.5}, "Grom":{d:1.9,w:42.4}, "Gray":{d:1.6,w:37.8}, "Ash":{d:1.5,w:43.7},
        "Tara":{d:-4,w:39}, "Jessie":{d:-2.6,w:40.8}, "Buster":{d:-2.4,w:34.3}, "Sandy":{d:-2.3,w:39.9},
        "Penny":{d:-2.2,w:37.9}, "Alli":{d:-2.1,w:39.2}, "Mortis":{d:-2,w:41.5}, "Buzz":{d:-1.8,w:44.1}
      }
    }
  },
  "Mandy": {
    vs: {
      "Jacky":{d:7.7,w:58.9}, "Trunk":{d:5.9,w:55.9}, "Lou":{d:4.7,w:53.4}, "Amber":{d:4.5,w:49.5},
      "R-T":{d:4.5,w:49.3}, "Pam":{d:4.4,w:58.4}, "Maisie":{d:4.2,w:56}, "Buzz":{d:4.1,w:57.6},
      "Wendy":{d:-4.2,w:26.9}, "Mortis":{d:-3.5,w:50.3}, "Bolt":{d:-3.2,w:35}, "Grom":{d:-3,w:50.4},
      "Mr. P":{d:-2.6,w:49.7}, "Mico":{d:-2.5,w:44.7}, "Mina":{d:-2.3,w:45.4}, "Najia":{d:-2.3,w:47.2},
      "Shelly":{w:62.1}, "Colette":{w:59.8}, "Crow":{w:59.8}, "Rico":{w:59.5}, "Colt":{w:58.9},
      "Damian":{w:39.7}, "Starr Nova":{w:42.2}, "Ash":{w:42.3}
    },
    with: {
      "Leon":{d:4.8}, "Bonnie":{d:4.6}, "Mr. P":{d:4.2}, "Bull":{d:4}, "Shelly":{d:3.6,w:47.9},
      "Lumi":{d:-8.5}, "Amber":{d:-8}, "Chester":{d:-7.5,w:47.4}, "Shade":{d:-7.4}, "Draco":{d:-6.2},
      "Wendy":{w:67.1}, "Bolt":{w:63.7}, "Ash":{w:59}, "8-Bit":{w:57.6}, "Damian":{w:57.3},
      "Colette":{w:47.7}, "Colt":{w:47.8}, "Buzz":{w:48.3}
    },
    modes: {
      airHockey: {
        "Larry & Lawrie":{d:4.9,w:68.2}, "Alli":{d:4.4,w:54}, "Belle":{d:4,w:65.4}, "Berry":{d:3.9,w:68.9},
        "Otis":{d:3.9,w:63}, "Charlie":{d:3.8,w:59.6}, "Gus":{d:3.5,w:51.4}, "Meg":{d:3.1,w:51.9},
        "Wendy":{d:-8.4,w:26}, "Damian":{d:-6.9,w:32}, "Bolt":{d:-5.4,w:32}, "Mico":{d:-3.6,w:48.9},
        "Mortis":{d:-3.4,w:48.2}, "Tick":{d:-3.4,w:49.6}, "Starr Nova":{d:-3.1,w:37.5}, "Sam":{d:-2.8,w:42.4}
      },
      bounty: {
        "Nita":{d:4.4,w:66.6}, "Emz":{d:4,w:60.4}, "Jessie":{d:3.9,w:60.3}, "Jacky":{d:3.8,w:71.8},
        "Meg":{d:3.5,w:61.4}, "Berry":{d:3.2,w:67.2}, "Cordelius":{d:3.1,w:64.7}, "Griff":{d:3.1,w:56.7},
        "Wendy":{d:-4.1,w:27.8}, "Bolt":{d:-3.5,w:32.3}, "Kit":{d:-3,w:46.4}, "Frank":{d:-2.9,w:53.2},
        "Ziggy":{d:-2.8,w:52.6}, "Najia":{d:-2.5,w:47.3}, "Sam":{d:-2.4,w:54.5}, "Grom":{d:-2,w:50.6}
      },
      brawlBall: {
        "Shelly":{d:3.3,w:58.8}, "Colette":{d:2.5,w:53.7}, "Crow":{d:2.5,w:57.4}, "Rico":{d:2.4,w:55.9},
        "Nita":{d:1.8,w:47}, "Bea":{d:1.7,w:47.2}, "8-Bit":{d:1.6,w:44}, "Amber":{d:1.6,w:37.5},
        "Wendy":{d:-7.7,w:18.8}, "Damian":{d:-6.3,w:29.5}, "Mortis":{d:-4.5,w:46.3}, "Sirius":{d:-4.3,w:37.4},
        "Mina":{d:-4.1,w:39.4}, "Ash":{d:-4,w:30.8}, "Squeak":{d:-3.6,w:43.3}, "Ziggy":{d:-3.4,w:42.1}
      },
      brawlBall5V5: {
        "Angelo":{d:7.3,w:67.7}, "Juju":{d:6.1,w:64.7}, "Trunk":{d:5.2,w:59}, "Gene":{d:4.9,w:62.7},
        "R-T":{d:4.8,w:58.1}, "Pam":{d:4.5,w:57.8}, "Meeple":{d:4.4,w:59.1}, "Bonnie":{d:4.3,w:57.9},
        "Bolt":{d:-3.3,w:31.4}, "Damian":{d:-2.5,w:38.4}, "Mina":{d:-2.5,w:48.1}, "Edgar":{d:-2.3,w:53.1},
        "Mortis":{d:-2,w:50}, "Cordelius":{d:-1.8,w:55.9}, "Bibi":{d:-1.5,w:47}, "Wendy":{d:-1.5,w:26}
      },
      deathmatch5v5: {
        "Nita":{d:8.5,w:70.8}, "Jacky":{d:5.9,w:68.6}, "Trunk":{d:4.8,w:67}, "Rosa":{d:4.2,w:64},
        "Lola":{d:3.3,w:64}, "Shelly":{d:3.2,w:65.5}, "Lumi":{d:3,w:64.8}, "El Primo":{d:2.7,w:65.9},
        "Buster":{d:-2.5,w:45.9}, "Janet":{d:-2.2,w:47.9}, "Mico":{d:-1.8,w:54.2}, "Kenji":{d:-1.6,w:51.3},
        "Sirius":{d:-1.6,w:55.6}, "Eve":{d:-1.5,w:53.7}, "Ziggy":{d:-1.4,w:51.9}, "Gray":{d:-1.3,w:51.1}
      },
      gemGrab: {
        "Otis":{d:3.7,w:55.2}, "Jacky":{d:3.6,w:59}, "8-Bit":{d:3.3,w:50}, "Doug":{d:3.1,w:47.4},
        "R-T":{d:3.1,w:50.1}, "Nita":{d:2.9,w:50.7}, "Meg":{d:2.6,w:49}, "Lou":{d:2.4,w:54.1},
        "Wendy":{d:-5.7,w:21}, "Damian":{d:-5.2,w:32.7}, "Mina":{d:-5.2,w:38.2}, "Mico":{d:-5.1,w:40},
        "Alli":{d:-4.3,w:41.9}, "Eve":{d:-3.8,w:45.2}, "Ziggy":{d:-3.8,w:47.8}, "Bonnie":{d:-3.7,w:56.4}
      },
      heist: {
        "R-T":{d:11.5,w:57.1}, "Buzz":{d:11.1,w:74}, "Gale":{d:9.2,w:80.6}, "Pam":{d:8.9,w:79.8},
        "Gus":{d:8.2,w:73.2}, "Jacky":{d:8.2,w:80.1}, "Doug":{d:7.9,w:60.7}, "Ash":{d:7.8,w:74.5},
        "Piper":{d:-10,w:49.6}, "Emz":{d:-6.6,w:42.4}, "Bolt":{d:-5,w:44.9}, "Sirius":{d:-3.9,w:43.5},
        "Nori":{d:-3.7,w:31.4}, "Brock":{d:-3.3,w:53.7}, "Kaze":{d:-3.3,w:42.2}, "Max":{d:-3.2,w:62.3}
      },
      hotZone: {
        "Jacky":{d:6.6,w:48.7}, "Otis":{d:5.9,w:53.6}, "Gigi":{d:5.7,w:46.4}, "R-T":{d:5.2,w:39.7},
        "Buzz":{d:4.4,w:48.9}, "Bea":{d:4.1,w:54.9}, "Mr. P":{d:4.1,w:52.8}, "Larry & Lawrie":{d:3.7,w:44.7},
        "Wendy":{d:-10.5,w:10.6}, "Bo":{d:-5.7,w:25.8}, "Damian":{d:-4.8,w:25.6}, "Mortis":{d:-4.3,w:36.6},
        "Finx":{d:-4.1,w:30.9}, "Squeak":{d:-4.1,w:40}, "Hank":{d:-3.3,w:26.8}, "Sirius":{d:-3.3,w:32.2}
      },
      knockout: {
        "Nita":{d:5.2,w:64.7}, "Tara":{d:4.5,w:57.6}, "Jessie":{d:4.4,w:58}, "Sandy":{d:3.8,w:56.2},
        "Colette":{d:3.7,w:63}, "Lou":{d:3.4,w:53.3}, "Shelly":{d:3.1,w:63.8}, "Gale":{d:3,w:56.6},
        "Bolt":{d:-5.2,w:33.3}, "Rosa":{d:-3.9,w:56.2}, "Wendy":{d:-3.9,w:27.7}, "Damian":{d:-3.5,w:44.6},
        "Ollie":{d:-3.3,w:48.3}, "Najia":{d:-3.2,w:44.5}, "Frank":{d:-3.1,w:48.1}, "Buster":{d:-2.9,w:43.6}
      },
      knockout5V5: {
        "Jacky":{d:7,w:68.7}, "Nita":{d:4.6,w:61.1}, "Barley":{d:4.2,w:62.3}, "Maisie":{d:3.8,w:62.9},
        "Tara":{d:3.7,w:61.2}, "Lou":{d:3.4,w:55.7}, "Jessie":{d:3.2,w:56.8}, "Larry & Lawrie":{d:3.2,w:61.3},
        "Wendy":{d:-9.5,w:30.8}, "Ash":{d:-7.5,w:29.1}, "Damian":{d:-7.3,w:40.9}, "Draco":{d:-7.2,w:39.6},
        "Starr Nova":{d:-6.4,w:35.7}, "Bolt":{d:-6.2,w:46}, "Rosa":{d:-3.7,w:41.3}, "Sirius":{d:-3.7,w:42}
      }
    }
  },
  "Mortis": {
    vs: {
      "Sprout":{d:8.2,w:53.9}, "Grom":{d:7.8,w:57.4}, "Mico":{d:7.4,w:50.8}, "Ziggy":{d:6.8,w:54.5},
      "Dynamike":{d:6.3,w:60.1}, "Barley":{d:6.2,w:58.8}, "Angelo":{d:5.5,w:53}, "Bo":{d:5.3,w:48.5},
      "Wendy":{d:-6,w:21.9}, "Damian":{d:-5,w:33.1}, "Jacky":{d:-4.9,w:42.4}, "Shade":{d:-4.8,w:35.3},
      "Trunk":{d:-4.5,w:41.7}, "Ash":{d:-4.4,w:36}, "Bolt":{d:-4.1,w:30.5}, "Gus":{d:-3.8,w:40.1},
      "Leon":{w:57.2}, "Gene":{w:55.2}
    },
    with: {
      "Rosa":{d:5.9}, "Pam":{d:5.4}, "Shelly":{d:5.2}, "Bonnie":{d:5}, "Barley":{d:4.5},
      "Wendy":{d:-11.1,w:57.3}, "Nori":{d:-9.2}, "Mico":{d:-8.4,w:44.7}, "Mina":{d:-7}, "Shade":{d:-6.5},
      "Bolt":{w:58.1}, "Ash":{w:56.3}, "8-Bit":{w:54.2}, "Lou":{w:53.7}, "Alli":{w:43.2}, "Colt":{w:44.1},
      "Kit":{w:44.5}, "Lily":{w:44.5}
    },
    modes: {
      airHockey: {
        "Nani":{d:6.8,w:56.7}, "Mico":{d:6.4,w:57.3}, "Angelo":{d:6.2,w:62.5}, "Juju":{d:5.5,w:53.7},
        "Barley":{d:4.9,w:68}, "Ziggy":{d:4.9,w:51}, "Janet":{d:4.8,w:55.9}, "Gene":{d:4.2,w:69},
        "Clancy":{d:-4.6,w:42.3}, "Wendy":{d:-4.4,w:28.7}, "Bolt":{d:-3.9,w:31.9}, "Jacky":{d:-3.8,w:46.1},
        "Ollie":{d:-3,w:56.1}, "Ash":{d:-2.8,w:49.3}, "Damian":{d:-2.6,w:34.8}, "Tick":{d:-2.5,w:49}
      },
      basketBrawl: {
        "Ziggy":{d:11.2,w:58.8}, "Barley":{d:10.2,w:68.9}, "Gene":{d:10.2,w:72.9},
        "Larry & Lawrie":{d:10.1,w:66.4}, "Janet":{d:8.4,w:57.3}, "Alli":{d:8.3,w:56}, "Penny":{d:7.9,w:63.3},
        "Grom":{d:7.3,w:71.8}, "Wendy":{d:-8.8,w:21.6}, "Rosa":{d:-4.9,w:32.8}, "Damian":{d:-4.5,w:27.2},
        "Bolt":{d:-4.3,w:33.1}, "Melodie":{d:-3.8,w:47.9}, "Doug":{d:-3.2,w:36.4}, "R-T":{d:-3.1,w:34.7},
        "Clancy":{d:-3,w:40}
      },
      bounty: {
        "Grom":{d:9.9,w:61.3}, "Dynamike":{d:7.2,w:62.2}, "Sprout":{d:7,w:56.1}, "Ziggy":{d:6.9,w:61.1},
        "Bo":{d:4.5,w:52.4}, "Willow":{d:4.2,w:59.1}, "Mico":{d:3.6,w:51.7}, "Najia":{d:3.5,w:52},
        "Rosa":{d:-8.3,w:51.2}, "Hank":{d:-7.4,w:42.6}, "Doug":{d:-6.6,w:46.4}, "Melodie":{d:-6.5,w:52},
        "Damian":{d:-6.1,w:41.1}, "Ash":{d:-6,w:51}, "Bull":{d:-6,w:54.8}, "Trunk":{d:-6,w:57}
      },
      brawlBall: {
        "Sprout":{d:7.8,w:55.1}, "Grom":{d:7.5,w:56.8}, "Ziggy":{d:7,w:51.7}, "Mico":{d:6.9,w:56.4},
        "Barley":{d:6.8,w:54.7}, "Gene":{d:6.8,w:61}, "Dynamike":{d:6.7,w:59.8}, "Squeak":{d:6.6,w:52.7},
        "Gus":{d:-5.5,w:33.9}, "Bolt":{d:-4.9,w:32.7}, "Wendy":{d:-4.7,w:21.3}, "Damian":{d:-3.9,w:31.1},
        "Trunk":{d:-3.6,w:37.4}, "R-T":{d:-3.4,w:35.4}, "Shade":{d:-3.4,w:32.4}, "Amber":{d:-2.9,w:32.3}
      },
      brawlBall5V5: {
        "Ziggy":{d:7.1,w:54.9}, "Barley":{d:7,w:62.4}, "Sprout":{d:6.4,w:61.5}, "Grom":{d:6,w:56.6},
        "Larry & Lawrie":{d:5.6,w:59.8}, "Dynamike":{d:5.2,w:58}, "Willow":{d:5,w:58.3},
        "Gene":{d:4.4,w:60.2}, "Shade":{d:-10.6,w:36.7}, "Gus":{d:-7.1,w:41}, "Lumi":{d:-7.1,w:37.1},
        "Wendy":{d:-6.9,w:19}, "8-Bit":{d:-6.1,w:34.5}, "Otis":{d:-6,w:38.5}, "Meg":{d:-5,w:35.7},
        "Amber":{d:-4.4,w:38}
      },
      deathmatch5v5: {
        "Nita":{d:6,w:64.8}, "Grom":{d:5.5,w:51.9}, "Ziggy":{d:5.1,w:54.7}, "Barley":{d:5,w:59.9},
        "Dynamike":{d:4.3,w:57.1}, "Larry & Lawrie":{d:4,w:58.3}, "Sprout":{d:3.9,w:53.1},
        "Lou":{d:3.3,w:57.9}, "8-Bit":{d:-6.8,w:34.4}, "Melodie":{d:-5.9,w:51.2}, "Damian":{d:-5.5,w:36.7},
        "Sam":{d:-4.9,w:51.8}, "Doug":{d:-4.2,w:38.5}, "Hank":{d:-4.2,w:54.7}, "Bull":{d:-3.9,w:51.3},
        "Wendy":{d:-3.9,w:30.1}
      },
      duels: {
        "Barley":{d:9.2,w:62.3}, "Mr. P":{d:8.9,w:54.8}, "Squeak":{d:8.3,w:61.8}, "Berry":{d:7.8,w:67.1},
        "Dynamike":{d:7.6,w:59.3}, "Ollie":{d:7.4,w:64.3}, "Tick":{d:6.6,w:62.2}, "Grom":{d:6.5,w:67.6},
        "Wendy":{d:-11.1,w:14.1}, "R-T":{d:-8.6,w:16.9}, "Chuck":{d:-5.4,w:29.2}, "Pearl":{d:-4.4,w:26.4},
        "Moe":{d:-4.2,w:25.6}, "Draco":{d:-4.1,w:25.2}, "Glowy":{d:-4,w:23.2}, "Mina":{d:-3.9,w:31}
      },
      gemGrab: {
        "Ziggy":{d:9.8,w:66.1}, "Sprout":{d:8.3,w:64.1}, "Grom":{d:6.9,w:70.6}, "Dynamike":{d:6.7,w:63.8},
        "Barley":{d:6.1,w:69.6}, "Angelo":{d:5.8,w:64.6}, "Bo":{d:5.5,w:50.3}, "Squeak":{d:4.7,w:59.8},
        "Bolt":{d:-6.7,w:29.1}, "Wendy":{d:-6.2,w:24.4}, "Melodie":{d:-5,w:54}, "Clancy":{d:-4.7,w:45.4},
        "Ash":{d:-4.6,w:44}, "Doug":{d:-4.3,w:44.8}, "Gus":{d:-4.2,w:48.5}, "Damian":{d:-3.9,w:38.6}
      },
      hotZone: {
        "Sprout":{d:10.8,w:65.3}, "Grom":{d:10.7,w:70.9}, "Dynamike":{d:9.4,w:63.4}, "Ziggy":{d:9.3,w:60.3},
        "Barley":{d:6.8,w:58.5}, "Mr. P":{d:6.2,w:64.1}, "Brock":{d:6.1,w:62.6}, "Willow":{d:6.1,w:59.6},
        "Wendy":{d:-8.5,w:19.5}, "Hank":{d:-7.9,w:30.5}, "Melodie":{d:-7.7,w:47}, "Bolt":{d:-7.3,w:29.6},
        "Draco":{d:-5.3,w:36}, "R-T":{d:-5,w:38.2}, "Ash":{d:-4.6,w:42.3}, "Gus":{d:-4.6,w:47.6}
      },
      knockout: {
        "Grom":{d:7.5,w:54.3}, "Sprout":{d:7.4,w:49.8}, "Ziggy":{d:7.2,w:54.1}, "Dynamike":{d:6.7,w:62.3},
        "Barley":{d:5.2,w:58}, "Larry & Lawrie":{d:5.1,w:51.3}, "Jessie":{d:4.7,w:54.5},
        "Mico":{d:4.2,w:48.3}, "Hank":{d:-9.1,w:35.6}, "Doug":{d:-8.5,w:37.6}, "Rosa":{d:-8.4,w:48.1},
        "Bolt":{d:-7.9,w:27.1}, "Wendy":{d:-6.8,w:21.6}, "Melodie":{d:-6.6,w:42.6}, "Sam":{d:-5.3,w:44.8},
        "Bibi":{d:-5.2,w:48.6}
      },
      knockout5V5: {
        "Angelo":{d:5.8,w:53.7}, "Amber":{d:5.5,w:52.3}, "Ziggy":{d:4.8,w:54.1}, "Sprout":{d:4.5,w:50.2},
        "Gus":{d:4.3,w:56.5}, "Maisie":{d:4.1,w:61.4}, "Gene":{d:4,w:61.3}, "Barley":{d:3.8,w:60.2},
        "Rosa":{d:-9.5,w:33.7}, "Lumi":{d:-6.4,w:32.1}, "Wendy":{d:-6.2,w:32.3}, "Starr Nova":{d:-5,w:35.3},
        "Melodie":{d:-4.9,w:53.8}, "Hank":{d:-4.6,w:33.8}, "Ash":{d:-4.2,w:30.7}, "Clancy":{d:-4.2,w:50.6}
      }
    }
  },
  "Shelly": {
    vs: {
      "Bolt":{d:6.7,w:36.3}, "Bull":{d:3.2,w:48.3}, "Bonnie":{d:3,w:47.2}, "Rosa":{d:3,w:46.2},
      "Bibi":{d:2.8,w:45.1}, "Edgar":{d:2.3,w:50.3}, "Fang":{d:2.3,w:47.3}, "Sam":{d:2.3,w:42.2},
      "Pierce":{d:-4.2,w:33.9}, "Sirius":{d:-3.9,w:33.9}, "Jessie":{d:-3.7,w:37}, "Meg":{d:-3.4,w:35.7},
      "Lumi":{d:-3.3,w:32.6}, "Bea":{d:-3.2,w:41.1}, "Larry & Lawrie":{d:-3.1,w:39.8}, "Bo":{d:-3,w:34.7},
      "Colt":{w:50.3}, "Rico":{w:49.2}, "Leon":{w:48.9}, "Wendy":{w:21.8}, "Starr Nova":{w:32.4},
      "Nori":{w:32.5}, "Amber":{w:33.4}
    },
    with: {
      "Squeak":{d:5.7}, "Clancy":{d:5.5}, "Bea":{d:5.2}, "Mortis":{d:5.2}, "Chester":{d:4.9},
      "Bonnie":{d:-5.8,w:34.7}, "Edgar":{d:-4.7,w:32.7}, "Eve":{d:-4.4}, "Angelo":{d:-4}, "Charlie":{d:-3.7},
      "Wendy":{w:64}, "Bolt":{w:55.6}, "Nori":{w:55.2}, "Starr Nova":{w:55}, "Damian":{w:54.3},
      "Colt":{w:33.8}, "Rico":{w:34.3}, "Crow":{w:37.3}
    },
    modes: {
      airHockey: {
        "Ollie":{d:8.8,w:63.2}, "Jacky":{d:6.1,w:51.3}, "Ash":{d:5.6,w:53.1}, "Mr. P":{d:4.3,w:67.1},
        "Otis":{d:4.2,w:57.1}, "Pearl":{d:4,w:57.4}, "Grom":{d:3.9,w:59.6}, "Belle":{d:3.8,w:59.1},
        "Mico":{d:-4.6,w:41.7}, "Sirius":{d:-4.5,w:35.7}, "Moe":{d:-4,w:34.4}, "Pierce":{d:-3.9,w:35},
        "Bo":{d:-3.5,w:36.7}, "Lumi":{d:-3.5,w:33.3}, "Wendy":{d:-3.5,w:25.5}, "Chester":{d:-3.4,w:36.6}
      },
      bounty: {
        "Bolt":{d:11.5,w:34.8}, "Trunk":{d:6.6,w:55.8}, "Rosa":{d:6.3,w:52}, "Kenji":{d:5.9,w:42.6},
        "Draco":{d:5.8,w:49.4}, "Sam":{d:5.6,w:47.4}, "Damian":{d:5,w:38.8}, "Alli":{d:4.8,w:42.7},
        "Emz":{d:-5.6,w:35.7}, "Bea":{d:-5.1,w:36.1}, "Jessie":{d:-4.8,w:36.5}, "Pierce":{d:-4.7,w:30.5},
        "Crow":{d:-4.2,w:36.3}, "Dynamike":{d:-3.6,w:37.5}, "Larry & Lawrie":{d:-3.6,w:38.3},
        "Clancy":{d:-3.5,w:46.1}
      },
      brawlBall: {
        "Bull":{d:3.3,w:48.3}, "Bibi":{d:3,w:45.5}, "Chuck":{d:2.8,w:49.8}, "Edgar":{d:2.8,w:52.3},
        "Fang":{d:2.5,w:47.6}, "Bolt":{d:2.2,w:35.4}, "Rico":{d:1.8,w:49.7}, "Sam":{d:1.7,w:38.5},
        "Nani":{d:-4.2,w:42}, "Meg":{d:-3.8,w:33.3}, "Sprout":{d:-3.7,w:38.9},
        "Larry & Lawrie":{d:-3.6,w:33.3}, "Pierce":{d:-3.6,w:33.3}, "Bo":{d:-3.4,w:34.3},
        "Jessie":{d:-3.4,w:35.2}, "Juju":{d:-3.4,w:36.7}
      },
      brawlBall5V5: {
        "Sam":{d:6.5,w:51}, "R-T":{d:5.9,w:51.1}, "Eve":{d:5.6,w:49.8}, "Darryl":{d:5.3,w:45.1},
        "Ash":{d:5.2,w:44.4}, "Moe":{d:5.1,w:47.1}, "Gigi":{d:5,w:47.2}, "Rosa":{d:4.9,w:50.6},
        "Wendy":{d:-13.3,w:8.1}, "Nori":{d:-6.6,w:29}, "Lumi":{d:-5.5,w:32.9}, "Surge":{d:-4.6,w:33.9},
        "Meg":{d:-4.2,w:30.8}, "Cordelius":{d:-3.8,w:45.8}, "Pierce":{d:-3.1,w:38.4}, "Emz":{d:-2.7,w:39.4}
      },
      duels: {
        "Frank":{d:4.7,w:56}, "Buzz":{d:4.3,w:60.8}, "Sam":{d:4.1,w:48.4}, "Belle":{d:3.9,w:62},
        "Darryl":{d:3.9,w:55.5}, "Kaze":{d:3.9,w:53.1}, "Larry & Lawrie":{d:3.9,w:68.4},
        "Damian":{d:3.8,w:48.7}, "Najia":{d:-5.5,w:37.2}, "Juju":{d:-5.3,w:37.6}, "Moe":{d:-4.9,w:33.7},
        "Finx":{d:-4.1,w:33.9}, "Griff":{d:-4.1,w:43}, "Wendy":{d:-4.1,w:29.1}, "Lola":{d:-3.6,w:36.9},
        "Meeple":{d:-3.6,w:35.6}
      },
      gemGrab: {
        "Bolt":{d:6.7,w:35.5}, "Ollie":{d:5.1,w:59.1}, "Trunk":{d:4.7,w:49.8}, "Gigi":{d:4.4,w:48.7},
        "Alli":{d:4.3,w:47.4}, "Sam":{d:4.1,w:50.4}, "Rosa":{d:3.9,w:50.7}, "Bonnie":{d:3.7,w:60.7},
        "Sirius":{d:-4.2,w:36.3}, "Emz":{d:-3.1,w:40.1}, "Bo":{d:-2.7,w:34.5}, "Glowy":{d:-2.5,w:42.7},
        "Pierce":{d:-2.5,w:40.1}, "Crow":{d:-2.4,w:41.7}, "Mandy":{d:-2.2,w:44.6}, "Jessie":{d:-2.1,w:41}
      },
      hotZone: {
        "Bolt":{d:8.7,w:40.2}, "Sam":{d:8.3,w:51.8}, "Alli":{d:7.4,w:54.7}, "Gus":{d:7.1,w:53.2},
        "Gigi":{d:6.6,w:50.3}, "Trunk":{d:6.2,w:44.3}, "Gray":{d:5.6,w:47.1}, "Kaze":{d:5.2,w:47},
        "Sirius":{d:-6.1,w:32.3}, "Emz":{d:-4.4,w:35.1}, "Jessie":{d:-4.3,w:33}, "Tick":{d:-4.2,w:35.6},
        "Dynamike":{d:-4.1,w:43.9}, "Bo":{d:-3.5,w:30.7}, "Tara":{d:-3.4,w:38.4}, "Spike":{d:-3.2,w:42.1}
      },
      knockout: {
        "Bolt":{d:10.4,w:39.2}, "Rosa":{d:7.4,w:56.7}, "Darryl":{d:5.2,w:46.2}, "Sam":{d:5.1,w:48.1},
        "Trunk":{d:4.9,w:55}, "Bibi":{d:4.5,w:51.2}, "Frank":{d:4.5,w:45}, "Bull":{d:4.3,w:55.2},
        "Pierce":{d:-5.5,w:31.2}, "Sirius":{d:-5,w:31.3}, "Bo":{d:-4.6,w:35}, "Griff":{d:-4.5,w:35.6},
        "Larry & Lawrie":{d:-4.2,w:35.1}, "Jessie":{d:-4,w:38.8}, "Lou":{d:-4,w:35.2}, "Bea":{d:-3.8,w:40.9}
      },
      knockout5V5: {
        "Rosa":{d:7.8,w:43.4}, "Bolt":{d:6.8,w:49.2}, "Charlie":{d:6.4,w:54.9}, "Sam":{d:5.5,w:47.8},
        "Bonnie":{d:5.1,w:51.4}, "Ollie":{d:5,w:52.9}, "Bull":{d:4.9,w:46.7}, "Jacky":{d:4.8,w:56.8},
        "Pierce":{d:-4.6,w:34}, "Amber":{d:-3.6,w:35.3}, "Lumi":{d:-3.1,w:28}, "Jessie":{d:-3,w:40.8},
        "Mandy":{d:-3,w:37.3}, "Mico":{d:-2.9,w:36.8}, "Bea":{d:-2.7,w:43.8}, "Stu":{d:-2.7,w:39.6}
      }
    }
  },
  "Willow": {
    vs: {
      "Surge":{d:2.9,w:55.1}, "Lumi":{d:2.8,w:47.6}, "R-T":{d:2.7,w:47.3}, "Ruffs":{d:2.4,w:49.9},
      "Chester":{d:2.3,w:50.9}, "Draco":{d:2.1,w:49.4}, "Rico":{d:2.1,w:59.7}, "8-Bit":{d:2,w:49.1},
      "Tick":{d:-5,w:44.7}, "Grom":{d:-4.5,w:48.7}, "Nori":{d:-4.3,w:37.9}, "Sirius":{d:-4.2,w:42.6},
      "Bolt":{d:-4.1,w:33.8}, "Mico":{d:-3.9,w:43}, "Najia":{d:-3.8,w:45.5}, "Mr. P":{d:-3.7,w:48.4},
      "Shelly":{w:61.3}, "Colt":{w:59.3}, "Crow":{w:59}, "Colette":{w:57.4}, "Wendy":{w:28.3},
      "Starr Nova":{w:41.2}, "Damian":{w:42.1}
    },
    with: {
      "Edgar":{d:6.7}, "Rico":{d:6.5}, "Crow":{d:5.8}, "Leon":{d:5.8}, "Bibi":{d:5.3},
      "Chuck":{d:-13.1,w:39.6}, "Rosa":{d:-10.2,w:40.7}, "Angelo":{d:-10,w:42.3}, "Jae-Yong":{d:-9.1},
      "Ziggy":{d:-8.9}, "Wendy":{w:71.8}, "Nori":{w:59.9}, "Starr Nova":{w:59.3}, "Damian":{w:59.2},
      "Ash":{w:58.9}, "Barley":{w:40}, "Gene":{w:42.4}
    },
    modes: {
      brawlBall: {
        "Nani":{d:3.7,w:62.8}, "Pam":{d:3.6,w:56.3}, "R-T":{d:3.6,w:50.4}, "8-Bit":{d:3.4,w:53.1},
        "Gene":{d:3.3,w:65.5}, "Gus":{d:3.2,w:50.5}, "Belle":{d:3.1,w:60.3}, "Lumi":{d:3.1,w:48.2},
        "Nori":{d:-5.8,w:38.4}, "Kenji":{d:-4.9,w:48.8}, "Sirius":{d:-4.3,w:44.7}, "Mortis":{d:-4.2,w:53.9},
        "Mico":{d:-4.1,w:53.5}, "Bolt":{d:-4,w:41.4}, "Grom":{d:-4,w:53.4}, "Tick":{d:-3.8,w:49.2}
      },
      knockout: {
        "Lola":{d:5.9,w:57.4}, "Amber":{d:4.5,w:53.4}, "8-Bit":{d:3.9,w:52.6}, "Jae-Yong":{d:3.8,w:51.4},
        "Jessie":{d:3.7,w:55.9}, "Lou":{d:3.7,w:52.2}, "Finx":{d:3.6,w:52.5}, "Gale":{d:3.4,w:55.5},
        "Wendy":{d:-6.1,w:24.4}, "Bolt":{d:-5.1,w:32.2}, "Tick":{d:-4.5,w:43.2}, "Najia":{d:-4,w:42.3},
        "Grom":{d:-3.8,w:45.4}, "Nori":{d:-3.8,w:39.8}, "Jacky":{d:-3.5,w:59.4}, "Mortis":{d:-3.3,w:49.1}
      }
    }
  },
  "Ziggy": {
    vs: {
      "8-Bit":{d:7,w:52.8}, "Lumi":{d:6.5,w:50.1}, "Ash":{d:5.6,w:48.3}, "Gus":{d:5.6,w:51.7},
      "Tara":{d:5.1,w:52.9}, "Charlie":{d:4.9,w:54.5}, "R-T":{d:4.7,w:48}, "Finx":{d:4.4,w:51.6},
      "Bolt":{d:-8.3,w:28.5}, "Mortis":{d:-6.8,w:45.5}, "Lily":{d:-5.8,w:47}, "Kenji":{d:-5.2,w:44},
      "Edgar":{d:-5,w:51.1}, "Mico":{d:-4.6,w:41}, "Nori":{d:-3.9,w:37.1}, "Alli":{d:-3.7,w:46.5},
      "Shelly":{w:60.2}, "Rico":{w:59.3}, "Colt":{w:58.7}, "Dynamike":{w:57.1}, "Bea":{w:56.5},
      "Wendy":{w:27.6}, "Damian":{w:37.7}, "Starr Nova":{w:38.9}
    },
    with: {
      "Crow":{d:7}, "Leon":{d:6.4}, "Edgar":{d:5.6}, "Bibi":{d:5.1}, "Spike":{d:4.8}, "Rosa":{d:-11.3,w:38.3},
      "Lola":{d:-9.5,w:40.3}, "Willow":{d:-8.9,w:43.3}, "Jacky":{d:-8}, "Barley":{d:-7.7,w:38.4},
      "Wendy":{w:71.7}, "Bolt":{w:60}, "Nori":{w:59.7}, "Damian":{w:59.6}, "Starr Nova":{w:58.8},
      "Pam":{w:42.7}
    },
    modes: {
      brawlBall: {
        "8-Bit":{d:10.4,w:57.3}, "Charlie":{d:9.7,w:55.4}, "Gus":{d:8,w:52.5}, "Lumi":{d:7.4,w:49.6},
        "Amber":{d:7,w:47.2}, "Jessie":{d:6.1,w:54.5}, "Lola":{d:5.8,w:56.6}, "Lou":{d:5.7,w:48.8},
        "Bolt":{d:-7,w:35.6}, "Mortis":{d:-7,w:48.3}, "Kenji":{d:-5,w:45.9}, "Lily":{d:-4.8,w:49.2},
        "Nori":{d:-4.5,w:36.9}, "Mina":{d:-4.4,w:43.6}, "Edgar":{d:-4.2,w:55.2}, "Kit":{d:-3.7,w:49.1}
      },
      knockout: {
        "Tara":{d:8.8,w:61.3}, "8-Bit":{d:8.5,w:57.9}, "Sandy":{d:6.6,w:58.4}, "Finx":{d:6.1,w:55.7},
        "Charlie":{d:5.8,w:53.2}, "Hank":{d:5.7,w:53.6}, "R-T":{d:5.4,w:51}, "Pearl":{d:5.2,w:46.3},
        "Bolt":{d:-11.2,w:26.7}, "Mortis":{d:-7.2,w:45.9}, "Lily":{d:-7,w:45.2}, "Edgar":{d:-6.4,w:54},
        "Mico":{d:-5.9,w:41.4}, "Alli":{d:-5.3,w:45.5}, "Nori":{d:-4.6,w:39.7}, "Wendy":{d:-4.5,w:26.5}
      }
    }
  },
  "Amber": {
    vs: {
      "Wendy":{d:11.4,w:46.9}, "Shade":{d:5.2,w:54.1}, "Stu":{d:4.6,w:59}, "Mina":{d:4.1,w:56.8},
      "Mortis":{d:3.3,w:62}, "Ollie":{d:3.3,w:62.9}, "Ash":{d:3.2,w:52.3}, "Bibi":{d:3,w:59.8},
      "Grom":{d:-5,w:53.4}, "Mico":{d:-4.8,w:47.4}, "Squeak":{d:-4.8,w:51.9}, "Sirius":{d:-4.7,w:47.4},
      "Mandy":{d:-4.5,w:50.5}, "Ziggy":{d:-4.3,w:52.2}, "Bo":{d:-3.5,w:48.5}, "Sprout":{d:-3.4,w:51.2},
      "Shelly":{w:66.6}, "Colt":{w:66.1}, "Rico":{w:63.6}, "Colette":{w:62}, "Bolt":{w:40.9}, "Nori":{w:44.7},
      "Starr Nova":{w:45.4}, "Damian":{w:46.4}
    },
    with: {
      "Gus":{d:13.4,w:73.8}, "El Primo":{d:13.3,w:68.6}, "Shade":{d:10.6,w:74.9}, "Maisie":{d:5},
      "Ollie":{d:5}, "Kit":{d:-8.5,w:50.5}, "Mandy":{d:-8,w:50.5}, "Nani":{d:-8}, "Angelo":{d:-7.9,w:49.4},
      "Najia":{d:-7.8}, "Wendy":{w:76}, "Ash":{w:64.4}, "Barley":{w:49.6}, "Grom":{w:50}
    },
    modes: {
      bounty: {
        "Wendy":{d:22.3,w:52.1}, "Chuck":{d:7.5,w:62.4}, "Gus":{d:6.6,w:55.8}, "Eve":{d:6.2,w:56.8},
        "Ash":{d:5.9,w:61.8}, "Doug":{d:5.6,w:57.5}, "Jacky":{d:5.5,w:71.4}, "Max":{d:5.3,w:55},
        "Spike":{d:-5.1,w:46.7}, "Emz":{d:-4.4,w:49.7}, "Ziggy":{d:-4.4,w:48.7}, "Surge":{d:-4.2,w:45.9},
        "Squeak":{d:-4.1,w:44.8}, "Willow":{d:-4.1,w:49.8}, "Edgar":{d:-4,w:47.9}, "Meeple":{d:-3.9,w:44.6}
      },
      brawlBall: {
        "Wendy":{d:11.1,w:50.3}, "Shade":{d:4.3,w:55}, "Stu":{d:3.9,w:62.2}, "Mina":{d:3.3,w:61.2},
        "Mortis":{d:2.9,w:67.7}, "Ollie":{d:2.6,w:58.9}, "Melodie":{d:2.4,w:61.1}, "Bea":{d:1.9,w:61.8},
        "Ziggy":{d:-7,w:52.8}, "Grom":{d:-6.3,w:57.8}, "Sirius":{d:-6.2,w:49.9}, "Squeak":{d:-6.2,w:55.1},
        "Sprout":{d:-5.1,w:57.2}, "Larry & Lawrie":{d:-4.8,w:51.7}, "Eve":{d:-4.3,w:58.8},
        "Bonnie":{d:-4.2,w:57.2}
      },
      gemGrab: {
        "Wendy":{d:13.1,w:45.1}, "Clancy":{d:3.8,w:55.4}, "Melodie":{d:3.8,w:64.4}, "Ash":{d:3.3,w:53.5},
        "Chuck":{d:3,w:57.4}, "Glowy":{d:3,w:57.8}, "Bolt":{d:2.4,w:39.7}, "Poco":{d:1.9,w:59.6},
        "Sirius":{d:-3.6,w:46.4}, "Moe":{d:-3.2,w:46.6}, "Gigi":{d:-3,w:50.9}, "Hank":{d:-3,w:49.7},
        "Kit":{d:-2.7,w:50.2}, "Gene":{d:-2.6,w:59.9}, "Nori":{d:-2.3,w:45.1}, "Alli":{d:-2.2,w:50.4}
      },
      hotZone: {
        "Chuck":{d:4.1,w:54.4}, "Wendy":{d:3.5,w:36.9}, "Jae-Yong":{d:3.3,w:67.6}, "Byron":{d:3.1,w:70.6},
        "Piper":{d:3.1,w:73.4}, "Stu":{d:3.1,w:57.4}, "Tick":{d:3,w:55.3}, "Mr. P":{d:2.8,w:66.8},
        "Gigi":{d:-6.1,w:50.2}, "Najia":{d:-5,w:58.1}, "Damian":{d:-4.5,w:40.5}, "Gus":{d:-4.3,w:54.2},
        "Mico":{d:-3.4,w:50.3}, "Hank":{d:-3.3,w:41.4}, "Sprout":{d:-3.2,w:57.5}, "Kit":{d:-3.1,w:53.9}
      },
      knockout: {
        "Wendy":{d:8.7,w:40}, "Chuck":{d:6.9,w:64.2}, "Doug":{d:5.9,w:55.4}, "Ollie":{d:5.1,w:56.4},
        "Ash":{d:4.8,w:56.8}, "Rosa":{d:4.2,w:64}, "Jacky":{d:4.1,w:68}, "Gus":{d:4,w:52},
        "Sirius":{d:-6.1,w:40.4}, "Gigi":{d:-5.6,w:41.8}, "Grom":{d:-5,w:45.3}, "Willow":{d:-4.5,w:46.6},
        "Meeple":{d:-4.3,w:42.6}, "Ziggy":{d:-4.2,w:46.1}, "Gale":{d:-3.9,w:49.3}, "Chester":{d:-3.8,w:48}
      }
    }
  },
  "Shade": {
    vs: {
      "Wendy":{d:11.5,w:48.1}, "Mina":{d:4.8,w:58.7}, "Mortis":{d:4.8,w:64.7}, "Sprout":{d:2.9,w:58.6},
      "Dynamike":{d:2.6,w:66.1}, "Moe":{d:2.6,w:55.6}, "Bolt":{d:2.5,w:46.7}, "Stu":{d:2.5,w:58},
      "Jacky":{d:-6.9,w:50.4}, "Trunk":{d:-6.4,w:49.8}, "Amber":{d:-5.2,w:45.9}, "Doug":{d:-5.2,w:48.5},
      "R-T":{d:-4.9,w:46.1}, "Gus":{d:-4.1,w:49.7}, "Juju":{d:-3.9,w:51.4}, "Lou":{d:-3.4,w:51.5},
      "Shelly":{w:66.5}, "Colt":{w:66.3}, "Rico":{w:64.3}, "Starr Nova":{w:46.5}, "Nori":{w:47.6}
    },
    with: {
      "Amber":{d:10.6,w:74.9}, "Gus":{d:10.3,w:72}, "El Primo":{d:8.6,w:65}, "Rico":{d:7.7}, "Maisie":{d:4.9},
      "Angelo":{d:-15.2,w:43.3}, "Bolt":{d:-12.8}, "Nani":{d:-12.2,w:48.6}, "Kit":{d:-10.3,w:49.7},
      "Janet":{d:-8.3}, "Wendy":{w:73.3}, "Lumi":{w:65.7}, "Rosa":{w:48.6}, "Gene":{w:49.6}
    },
    modes: {
      bounty: {
        "Wendy":{d:8.7,w:39.7}, "Sprout":{d:6.3,w:55.8}, "Bolt":{d:5.9,w:41}, "Grom":{d:3.9,w:55.6},
        "Mico":{d:3.6,w:52.1}, "Mortis":{d:2.4,w:52.8}, "Kaze":{d:2.3,w:54.7}, "Tick":{d:2,w:49.3},
        "Ollie":{d:-7,w:60.8}, "Jacky":{d:-5.8,w:61.5}, "Trunk":{d:-5.7,w:57.6}, "R-T":{d:-5.1,w:45.6},
        "Ash":{d:-5,w:52.3}, "Surge":{d:-4.9,w:46.7}, "Otis":{d:-4.8,w:53.8}, "Lumi":{d:-4.7,w:50.4}
      },
      brawlBall: {
        "Wendy":{d:10.6,w:49.2}, "Mico":{d:4.8,w:68.5}, "Mina":{d:4.1,w:61.4}, "Mortis":{d:3.4,w:67.6},
        "Tick":{d:3.4,w:62.7}, "Angelo":{d:2.8,w:77.2}, "Mr. P":{d:2.8,w:65.9}, "Pam":{d:2.8,w:61.9},
        "Jacky":{d:-5.9,w:48.1}, "Trunk":{d:-5.1,w:50.3}, "Amber":{d:-4.3,w:45}, "Gus":{d:-4.3,w:49.5},
        "Doug":{d:-4.2,w:51}, "Frank":{d:-3.5,w:58.6}, "Rosa":{d:-3.1,w:55.5}, "El Primo":{d:-3,w:57}
      },
      gemGrab: {
        "Wendy":{d:17.6,w:49.8}, "Bolt":{d:7.8,w:45.3}, "Angelo":{d:5.6,w:66.1}, "Mina":{d:4.5,w:54.5},
        "Janet":{d:4.4,w:53.6}, "Chuck":{d:3.9,w:58.4}, "Sprout":{d:3.8,w:61.3}, "Mr. P":{d:3.6,w:61},
        "Frank":{d:-5.5,w:52.6}, "Jacky":{d:-5.4,w:56.4}, "Cordelius":{d:-4.4,w:54.5}, "Sirius":{d:-4.2,w:46},
        "Kit":{d:-4.1,w:49}, "Doug":{d:-3.4,w:47.5}, "Buzz":{d:-3.3,w:55}, "Ollie":{d:-3.3,w:60.1}
      },
      hotZone: {
        "Wendy":{d:8.4,w:40.6}, "Sprout":{d:7.2,w:66.7}, "Bolt":{d:4.3,w:46.1}, "Tick":{d:4.1,w:55},
        "Eve":{d:4,w:62.6}, "8-Bit":{d:3.8,w:54.6}, "Byron":{d:3.7,w:70}, "Poco":{d:3.7,w:57.4},
        "Jacky":{d:-6.4,w:49.9}, "R-T":{d:-6.4,w:41.8}, "Trunk":{d:-5.7,w:43.3}, "Kit":{d:-5.4,w:50.2},
        "Doug":{d:-5.3,w:41.5}, "Frank":{d:-5,w:47.6}, "Pierce":{d:-4.8,w:48.6}, "Buzz":{d:-4.1,w:54.7}
      },
      knockout: {
        "Wendy":{d:12.9,w:44.2}, "Ollie":{d:6.1,w:57.4}, "Sprout":{d:5.1,w:50.9}, "Bolt":{d:4.8,w:43},
        "Darryl":{d:4.8,w:56.2}, "Gigi":{d:4.6,w:52.1}, "Rosa":{d:4.3,w:64.1}, "Chuck":{d:3.9,w:61.2},
        "Sirius":{d:-7.7,w:38.7}, "Juju":{d:-4.6,w:43.8}, "R-T":{d:-4.6,w:41.3}, "Frank":{d:-4.4,w:46.5},
        "Griff":{d:-4.4,w:46.1}, "Clancy":{d:-4.2,w:57.6}, "Kit":{d:-3.5,w:43.8}, "Nita":{d:-3.4,w:55.9}
      }
    }
  },
  "Wendy": {
    vs: {
      "Mico":{d:8.9,w:75.4}, "Crow":{d:6.6,w:81.9}, "Chester":{d:6.4,w:74.4}, "Bo":{d:6.2,w:72.6},
      "Mortis":{d:6,w:78.1}, "Stu":{d:6,w:74.4}, "Nani":{d:5.7,w:73.7}, "Alli":{d:5.6,w:76},
      "Pam":{d:-16,w:56.3}, "Rosa":{d:-15.7,w:55.5}, "R-T":{d:-15.6,w:48.7}, "Shade":{d:-11.5,w:51.9},
      "Amber":{d:-11.4,w:53.1}, "Ash":{d:-10.5,w:53.2}, "Trunk":{d:-9.3,w:59.7}, "El Primo":{d:-8.9,w:63},
      "Dynamike":{w:79.5}, "Colt":{w:78.6}, "Leon":{w:78.5}, "Shelly":{w:78.2}
    },
    with: {
      "Barley":{d:7.2}, "Rico":{d:6.7}, "Belle":{d:6.2}, "Pam":{d:6.1}, "Charlie":{d:5.7},
      "Mico":{d:-11.9,w:61.7}, "Mortis":{d:-11.1,w:57.3}, "Sirius":{d:-7.9}, "Damian":{d:-7.3},
      "Kit":{d:-7.2,w:64.4}, "Lou":{w:77.8}, "8-Bit":{w:77.2}, "Ash":{w:77.2}, "Lumi":{w:76.8},
      "Trunk":{w:76.6}, "Edgar":{w:61.5}, "Shelly":{w:64}
    },
    modes: {
      brawlBall: {
        "Gene":{d:10.3,w:87.4}, "Nani":{d:10,w:84.8}, "Mico":{d:9.1,w:82.7}, "Gray":{d:8.4,w:78.5},
        "Bo":{d:7.9,w:75.6}, "Sprout":{d:7.9,w:79.8}, "Mandy":{d:7.7,w:81.2}, "Kit":{d:6.7,w:78.8},
        "Gus":{d:-13.8,w:51.1}, "Amber":{d:-11.1,w:49.7}, "Shade":{d:-10.6,w:50.8}, "Chuck":{d:-9.3,w:66.1},
        "El Primo":{d:-9,w:61.5}, "Trunk":{d:-8.1,w:58.3}, "Ash":{d:-6.3,w:53.3}, "Rosa":{d:-5.4,w:63.9}
      },
      knockout: {
        "Mico":{d:10.8,w:77.3}, "Stu":{d:8.6,w:78.4}, "Chester":{d:8.1,w:78.3}, "Gale":{d:7.6,w:79},
        "Jessie":{d:7.4,w:78.8}, "Alli":{d:7,w:76.7}, "Gray":{d:7,w:71.8}, "Nani":{d:7,w:73.6},
        "Rosa":{d:-21.9,w:54.6}, "Shade":{d:-12.9,w:55.8}, "Bibi":{d:-12.3,w:62.3}, "Ash":{d:-11.4,w:59},
        "Trunk":{d:-9.9,w:67.1}, "Amber":{d:-8.7,w:60}, "Doug":{d:-8.7,w:59.6}, "Hank":{d:-7.9,w:59.2}
      }
    }
  },
  "Gus": {
    vs: {
      "Wendy":{d:8.1,w:41.2}, "Stu":{d:4.4,w:56.2}, "Shade":{d:4.1,w:50.3}, "Bibi":{d:3.8,w:58.1},
      "Mortis":{d:3.8,w:59.9}, "Griff":{d:3.5,w:53.5}, "Melodie":{d:3.5,w:56}, "Mina":{d:3.2,w:53.2},
      "Pam":{d:-6.9,w:49.4}, "Sirius":{d:-6.3,w:43.2}, "Mr. P":{d:-6.1,w:48.7}, "Penny":{d:-5.8,w:48.5},
      "Bonnie":{d:-5.7,w:50.5}, "Grom":{d:-5.7,w:50.1}, "Ziggy":{d:-5.6,w:48.3}, "Sprout":{d:-5.5,w:46.4},
      "Colt":{w:64}, "Crow":{w:62.8}, "Edgar":{w:62.3}, "Shelly":{w:61.8}, "Rico":{w:60.8}, "Bolt":{w:39.8},
      "Ash":{w:44.1}, "Damian":{w:44.3}
    },
    with: {
      "Amber":{d:13.4,w:73.8}, "El Primo":{d:10.5,w:62.9}, "Shade":{d:10.3,w:72}, "Rico":{d:5.6},
      "Leon":{d:4.7}, "Rosa":{d:-18,w:35}, "Sam":{d:-13.5,w:42.9}, "Trunk":{d:-13,w:42.7},
      "Barley":{d:-12.7,w:36.9}, "Hank":{d:-12.1}, "Wendy":{w:70}, "Bolt":{w:60.2}, "Shelly":{w:42.9}
    },
    modes: {
      bounty: {
        "Wendy":{d:6.4,w:37}, "Sam":{d:3.4,w:58.9}, "Hank":{d:3.2,w:52.9}, "Bull":{d:3,w:63.5},
        "Melodie":{d:2.7,w:60.9}, "Rosa":{d:2.7,w:62}, "Surge":{d:2.3,w:53.2}, "Bibi":{d:2.2,w:54.6},
        "Amber":{d:-6.6,w:44.2}, "Sirius":{d:-5.1,w:43.9}, "Ash":{d:-4.8,w:51.9}, "Charlie":{d:-3.8,w:53.8},
        "Glowy":{d:-3.6,w:49.5}, "Pam":{d:-3.6,w:58}, "Ziggy":{d:-3.6,w:50.3}, "Jae-Yong":{d:-3.5,w:50.8}
      },
      brawlBall: {
        "Wendy":{d:13.8,w:48.9}, "Mortis":{d:5.5,w:66.1}, "Mina":{d:4.9,w:58.4}, "Tick":{d:4.8,w:60.4},
        "Shade":{d:4.3,w:50.5}, "Stu":{d:3.9,w:57.7}, "Griff":{d:3.6,w:55.7}, "Bibi":{d:2.7,w:60.6},
        "Mr. P":{d:-10.1,w:49.5}, "Larry & Lawrie":{d:-8.7,w:43.5}, "Squeak":{d:-8.4,w:48.5},
        "Grom":{d:-8.1,w:51.9}, "Jae-Yong":{d:-8,w:49.2}, "Ziggy":{d:-8,w:47.5}, "Sprout":{d:-7.9,w:50.1},
        "Angelo":{d:-7.8,w:63.6}
      },
      gemGrab: {
        "Wendy":{d:14.8,w:43.2}, "Bolt":{d:9.3,w:42.6}, "Clancy":{d:5.3,w:52.6}, "Chuck":{d:5.2,w:55.3},
        "Janet":{d:4.7,w:49.5}, "Mortis":{d:4.2,w:51.5}, "Mina":{d:3.7,w:49.2}, "Tick":{d:3.5,w:52.8},
        "Sirius":{d:-10,w:35.7}, "Mico":{d:-5,w:42.1}, "Trunk":{d:-5,w:45.4}, "Barley":{d:-4.1,w:56.9},
        "Frank":{d:-4.1,w:49.5}, "Pam":{d:-4.1,w:49.3}, "Charlie":{d:-3.9,w:48.3}, "Chester":{d:-3.9,w:42.9}
      },
      knockout: {
        "Wendy":{d:3.3,w:36.5}, "Crow":{d:2.8,w:68.1}, "Stu":{d:2.3,w:55.8}, "Colette":{d:2.2,w:63.1},
        "Kaze":{d:1.8,w:55.2}, "Lou":{d:1.8,w:53.4}, "Shelly":{d:1.8,w:64.1}, "Melodie":{d:1.7,w:56.3},
        "Ash":{d:-6,w:48.1}, "Sirius":{d:-5.1,w:43.4}, "Amber":{d:-4,w:48}, "Ziggy":{d:-3.4,w:48.9},
        "Pam":{d:-3.1,w:53.3}, "Clancy":{d:-3,w:60.8}, "Trunk":{d:-3,w:59.4}, "Najia":{d:-2.9,w:46.5}
      }
    }
  },
  "Ash": {
    vs: {
      "Wendy":{d:10.5,w:46.8}, "Stu":{d:5.5,w:60.7}, "Mina":{d:5.3,w:58.8}, "Surge":{d:4.7,w:63},
      "Meeple":{d:4.6,w:58.9}, "Mortis":{d:4.4,w:64}, "Chester":{d:4.2,w:59}, "Fang":{d:4,w:64.2},
      "Chuck":{d:-8.7,w:48}, "Rosa":{d:-8.5,w:50}, "Jessie":{d:-6.6,w:49.5}, "Berry":{d:-6.1,w:53.6},
      "Larry & Lawrie":{d:-5.9,w:52.4}, "Sirius":{d:-5.8,w:47.2}, "Pam":{d:-5.7,w:54},
      "Ziggy":{d:-5.6,w:51.7}, "Colt":{w:65.4}, "Shelly":{w:64.6}, "Leon":{w:63.2}, "Bolt":{w:46.9},
      "Damian":{w:46.9}, "Amber":{w:47.7}
    },
    with: {
      "Crow":{d:6.1}, "Rico":{d:5.7}, "Gray":{d:5.5,w:67.9}, "Surge":{d:4}, "Buzz":{d:3.7},
      "Bonnie":{d:-19.9,w:36.1}, "Pearl":{d:-13.9}, "Angelo":{d:-12.4,w:46.1}, "Eve":{d:-11.1,w:46.6},
      "Barley":{d:-9.3,w:44.3}, "Wendy":{w:77.2}, "Nori":{w:68.7}, "Starr Nova":{w:68.6}, "Lumi":{w:67.2},
      "Ollie":{w:47}
    },
    modes: {
      brawlBall: {
        "Wendy":{d:6.3,w:46.7}, "Bea":{d:6.1,w:67.1}, "Meeple":{d:6.1,w:65}, "Belle":{d:5.6,w:70.7},
        "Gray":{d:5.2,w:66.5}, "Stu":{d:5.1,w:64.5}, "Chester":{d:4.6,w:63}, "Pierce":{d:4.5,w:62.3},
        "Sirius":{d:-6.4,w:50.9}, "Rosa":{d:-6,w:54.5}, "Frank":{d:-5,w:58.8}, "Ziggy":{d:-4.4,w:56.6},
        "Trunk":{d:-4,w:53.3}, "Damian":{d:-3.7,w:47.3}, "Emz":{d:-3.7,w:59.8}, "Nita":{d:-3,w:57.7}
      },
      gemGrab: {
        "Wendy":{d:12.2,w:44}, "Ollie":{d:5.3,w:68.3}, "Mina":{d:5.2,w:54.7}, "Bolt":{d:4.9,w:42},
        "Gray":{d:4.7,w:57.7}, "Mortis":{d:4.6,w:56}, "Ruffs":{d:4.5,w:54.5}, "Fang":{d:4.4,w:59.2},
        "Barley":{d:-8.2,w:56.6}, "Pam":{d:-6.8,w:50.6}, "Berry":{d:-5.8,w:56.3}, "Frank":{d:-5.8,w:51.8},
        "Grom":{d:-5.3,w:59.7}, "Sirius":{d:-5.1,w:44.6}, "Larry & Lawrie":{d:-4.5,w:54.7},
        "Buzz":{d:-4.2,w:53.7}
      },
      hotZone: {
        "Wendy":{d:12,w:42.5}, "Mina":{d:5.7,w:52.4}, "Sam":{d:5.5,w:58.2}, "Lily":{d:5.4,w:64.7},
        "Fang":{d:5.3,w:59.9}, "Tick":{d:5,w:54}, "Bolt":{d:4.9,w:44.8}, "Clancy":{d:4.9,w:56.4},
        "Ziggy":{d:-7.5,w:46.6}, "Charlie":{d:-7,w:55.3}, "Frank":{d:-6.3,w:44.3}, "Sirius":{d:-5.5,w:42},
        "Larry & Lawrie":{d:-5.3,w:47.9}, "Rosa":{d:-5.3,w:50.6}, "Rico":{d:-4.9,w:57.1}, "Kit":{d:-4.7,w:49}
      },
      knockout5V5: {
        "Najia":{d:9,w:74.4}, "Mandy":{d:7.5,w:70.9}, "Mr. P":{d:7.4,w:67.7}, "Draco":{d:7.2,w:67.5},
        "Chester":{d:7,w:72.8}, "Tick":{d:7,w:71.5}, "Bolt":{d:6.8,w:72.3}, "Mico":{d:6.6,w:69.4},
        "Rosa":{d:-17.4,w:41.2}, "Lou":{d:-17,w:48.5}, "Otis":{d:-15.9,w:49.4}, "Lumi":{d:-14.3,w:39.5},
        "Frank":{d:-13.7,w:53}, "Ollie":{d:-12.3,w:57.9}, "Melodie":{d:-10.2,w:62.3}, "Gray":{d:-10.1,w:42.4}
      }
    }
  },
  "El Primo": {
    vs: {
      "Wendy":{d:8.9,w:37}, "Mortis":{d:3.4,w:53.7}, "Bibi":{d:3.1,w:51.4}, "Frank":{d:2.9,w:52.4},
      "Bolt":{d:2.6,w:37.5}, "Shade":{d:2.4,w:42.8}, "Surge":{d:2.4,w:51.3}, "Mina":{d:2,w:46.1},
      "Colette":{d:-5.8,w:47.1}, "Lou":{d:-4.9,w:40.2}, "Sirius":{d:-4.9,w:38.7}, "Jessie":{d:-4.6,w:42.1},
      "Larry & Lawrie":{d:-3.9,w:45}, "Pierce":{d:-3.8,w:40.2}, "Bea":{d:-3.7,w:46.7}, "Gale":{d:-3.6,w:43.1},
      "Colt":{w:55.4}, "Rico":{w:55}, "Shelly":{w:55}, "Edgar":{w:54.8}, "Dynamike":{w:54.7},
      "Starr Nova":{w:36.8}, "Damian":{w:38.7}
    },
    with: {
      "Amber":{d:13.3,w:68.6}, "Gus":{d:10.5,w:62.9}, "Shade":{d:8.6,w:65}, "Maisie":{d:3.8}, "Poco":{d:3.8},
      "Angelo":{d:-12.4,w:36.7}, "Bonnie":{d:-11.8,w:34.7}, "Gene":{d:-10.4,w:35.3}, "Bolt":{d:-10.3},
      "Mr. P":{d:-9.6,w:38.8}, "Wendy":{w:64.7}, "Lumi":{w:57.4}, "Grom":{w:38.9}
    },
    modes: {
      airHockey: {
        "Ollie":{d:5,w:61.5}, "Otis":{d:3.7,w:58.6}, "Eve":{d:3.4,w:66.6}, "Wendy":{d:2.6,w:33.3},
        "Ash":{d:2.5,w:52}, "Pearl":{d:2,w:57.5}, "Ziggy":{d:2,w:45.5}, "Bonnie":{d:1.9,w:70.8},
        "Juju":{d:-5.2,w:40.3}, "Sirius":{d:-4.5,w:37.7}, "Angelo":{d:-3.6,w:50}, "Shelly":{d:-3.1,w:48.9},
        "Amber":{d:-3,w:36.5}, "Colette":{d:-2.9,w:45.9}, "Lumi":{d:-2.9,w:35.7},
        "Larry & Lawrie":{d:-2.8,w:56.4}
      },
      basketBrawl: {
        "Wendy":{d:4.7,w:39.6}, "Ziggy":{d:4.3,w:57}, "Alli":{d:3.3,w:56.1}, "Lily":{d:3.2,w:62.4},
        "Sam":{d:2.9,w:44.9}, "Byron":{d:2.4,w:65.1}, "Frank":{d:2.4,w:50.7}, "Meeple":{d:2.3,w:57},
        "Gus":{d:-5.4,w:44.7}, "Gene":{d:-5.3,w:62.2}, "Charlie":{d:-4.8,w:51.6}, "Lou":{d:-3.9,w:47.1},
        "Colette":{d:-3.7,w:48.9}, "R-T":{d:-3.6,w:39.2}, "Amber":{d:-3.1,w:40.7}, "Barley":{d:-3,w:60.6}
      },
      bounty: {
        "Sam":{d:7.3,w:46.7}, "Bolt":{d:5.4,w:27}, "Gigi":{d:5.4,w:40.6}, "Rosa":{d:5.1,w:48.3},
        "Bibi":{d:4.6,w:41.1}, "Pearl":{d:4.6,w:41.2}, "Bull":{d:4.4,w:48.9}, "Wendy":{d:4,w:22.7},
        "Pierce":{d:-7,w:25.9}, "Colette":{d:-6.9,w:35.5}, "Crow":{d:-4.9,w:33.2}, "Stu":{d:-4.9,w:32.1},
        "Najia":{d:-4.8,w:27.9}, "Chester":{d:-4.6,w:33}, "Clancy":{d:-4.4,w:42.7}, "Amber":{d:-3.7,w:31.4}
      },
      brawlBall: {
        "Wendy":{d:9,w:38.5}, "Shade":{d:3,w:43}, "Meeple":{d:2.4,w:49.3}, "Mortis":{d:2.2,w:56.7},
        "Frank":{d:2.1,w:54.3}, "Ollie":{d:2,w:47.6}, "Nori":{d:1.9,w:42.4}, "Ash":{d:1.7,w:39.9},
        "Colette":{d:-5.8,w:49.1}, "Lou":{d:-4.1,w:38.2}, "Sirius":{d:-3.9,w:41.5}, "Gale":{d:-3.6,w:42.9},
        "Charlie":{d:-3.3,w:41.6}, "Melodie":{d:-2.5,w:45.5}, "R-T":{d:-2.5,w:40.6}, "Jessie":{d:-2.4,w:45.2}
      },
      brawlBall5V5: {
        "Wendy":{d:10.7,w:35.8}, "Eve":{d:4.4,w:53.6}, "Finx":{d:3.3,w:52.4}, "Janet":{d:2.9,w:50.3},
        "Ash":{d:2.8,w:47}, "8-Bit":{d:2.7,w:42.3}, "Buster":{d:2.5,w:46.4}, "Bonnie":{d:2.3,w:52.8},
        "Buzz":{d:-3.7,w:51.1}, "Colette":{d:-3.2,w:47.2}, "Sirius":{d:-3.2,w:45.6}, "Nani":{d:-3.1,w:51},
        "Gene":{d:-2.9,w:51.8}, "Shelly":{d:-2.9,w:52.2}, "Willow":{d:-2.8,w:49.5}, "Sprout":{d:-2.7,w:51.3}
      },
      gemGrab: {
        "Wendy":{d:9.8,w:32.7}, "Bolt":{d:4.7,w:32.1}, "Chuck":{d:4.6,w:47.6}, "Gigi":{d:4.4,w:46.8},
        "Angelo":{d:4.3,w:53.4}, "Rosa":{d:3.9,w:48.9}, "Trunk":{d:3.8,w:47}, "Carl":{d:3.6,w:46.4},
        "Sirius":{d:-6,w:32.7}, "Colette":{d:-4.1,w:43.7}, "Crow":{d:-3.6,w:38.7}, "Pierce":{d:-3.5,w:37.3},
        "Starr Nova":{d:-3.2,w:30.8}, "Edgar":{d:-3.1,w:39.5}, "Glowy":{d:-3,w:40.4}, "Nori":{d:-2.9,w:33.3}
      },
      hotZone: {
        "Wendy":{d:8.1,w:32.9}, "Bolt":{d:6.2,w:39.5}, "Buster":{d:5.6,w:53.2}, "Sam":{d:5.6,w:51.2},
        "Poco":{d:3.7,w:48.3}, "Draco":{d:3.4,w:41}, "Ash":{d:3.2,w:46.1}, "Damian":{d:2.9,w:37.9},
        "Colette":{d:-5.3,w:44.9}, "Sirius":{d:-5.2,w:35.2}, "Jessie":{d:-4.1,w:35.2}, "Tara":{d:-4.1,w:39.9},
        "Leon":{d:-3.4,w:51.1}, "Spike":{d:-3.3,w:44.1}, "Shelly":{d:-2.9,w:49.2}, "Nani":{d:-2.7,w:50.9}
      },
      knockout: {
        "Bolt":{d:6.6,w:35}, "Wendy":{d:6.4,w:29.1}, "Buster":{d:5.1,w:40.7}, "Ollie":{d:4,w:44.4},
        "Frank":{d:3.9,w:43.8}, "Pearl":{d:3.5,w:34.7}, "Chuck":{d:3.4,w:49.7}, "Gigi":{d:3.4,w:40.1},
        "Colette":{d:-6.4,w:41.6}, "Clancy":{d:-6.2,w:44.9}, "Larry & Lawrie":{d:-5.9,w:33},
        "Griff":{d:-5.8,w:33.8}, "Sirius":{d:-5.6,w:30.2}, "Stu":{d:-5.3,w:35.2}, "Tara":{d:-5.2,w:36.6},
        "Pierce":{d:-4.8,w:31.4}
      },
      knockout5V5: {
        "Wendy":{d:7.2,w:45.5}, "Draco":{d:4.6,w:49.3}, "Ash":{d:4.5,w:39.2}, "Moe":{d:4.3,w:49.7},
        "Bolt":{d:3.7,w:53.9}, "Damian":{d:3.6,w:49.7}, "Mr. P":{d:3.6,w:48.2}, "Starr Nova":{d:3.5,w:43.5},
        "Lou":{d:-5.9,w:44.3}, "Clancy":{d:-5.6,w:48.9}, "Lumi":{d:-4.3,w:33.9}, "Otis":{d:-4,w:45.9},
        "Colette":{d:-3.5,w:46.7}, "Jacky":{d:-3.4,w:56.3}, "Larry & Lawrie":{d:-3.2,w:52.9},
        "Sandy":{d:-3.2,w:53}
      }
    }
  },
  "Rico": {
    vs: {
      "Wendy":{d:3.2,w:27.8}, "Griff":{d:2.7,w:42.5}, "Doug":{d:2.6,w:42.3}, "Clancy":{d:2.4,w:45.7},
      "R-T":{d:2.1,w:39.2}, "Bolt":{d:2,w:33}, "Bull":{d:2,w:48.6}, "Bibi":{d:1.7,w:45.7},
      "Sprout":{d:-4.7,w:36.9}, "Angelo":{d:-3.3,w:40}, "Gigi":{d:-3,w:36.1}, "Larry & Lawrie":{d:-3,w:41.6},
      "Ziggy":{d:-2.9,w:40.7}, "Barley":{d:-2.6,w:45.9}, "Grom":{d:-2.4,w:43}, "Buster":{d:-2.3,w:40.1},
      "Colt":{w:51.6}, "Shelly":{w:50.8}, "Crow":{w:50.5}, "Edgar":{w:49.9}, "Leon":{w:49.4}, "Nori":{w:34.8},
      "Starr Nova":{w:35.4}, "Shade":{w:35.7}
    },
    with: {
      "Trunk":{d:8.1}, "Shade":{d:7.7,w:59.9}, "Alli":{d:6.9}, "Jacky":{d:6.7}, "Ollie":{d:6.7},
      "Spike":{d:-4.8}, "Leon":{d:-4.5,w:33.9}, "Piper":{d:-4.4}, "Crow":{d:-4.1,w:34.4}, "Frank":{d:-3.6},
      "Wendy":{w:71.3}, "Bolt":{w:62.1}, "Damian":{w:59.4}, "Ash":{w:58.1}, "Colt":{w:33.9},
      "Shelly":{w:34.3}, "Dynamike":{w:36}
    },
    modes: {
      airHockey: {
        "Charlie":{d:4.1,w:53.8}, "Clancy":{d:3.1,w:45.4}, "Rosa":{d:3.1,w:61}, "Juju":{d:2.7,w:46.4},
        "Otis":{d:2.7,w:55.7}, "Maisie":{d:2.1,w:50.7}, "8-Bit":{d:2,w:49.7}, "Bull":{d:1.8,w:49.7},
        "Alli":{d:-3.3,w:40.2}, "Najia":{d:-3.2,w:41.3}, "Belle":{d:-2.8,w:52.7}, "Gene":{d:-2.8,w:57.6},
        "Glowy":{d:-2.6,w:38.8}, "Janet":{d:-2.4,w:44.1}, "Kit":{d:-2.4,w:42}, "Grom":{d:-2.3,w:53.5}
      },
      basketBrawl: {
        "Meeple":{d:7.6,w:54.9}, "Charlie":{d:2.6,w:51.5}, "Eve":{d:2.4,w:62.6}, "Lou":{d:2.3,w:45.8},
        "R-T":{d:2.3,w:37.9}, "Nita":{d:2.2,w:45.9}, "Ollie":{d:2.1,w:57}, "Wendy":{d:1.9,w:30.4},
        "Kit":{d:-6.2,w:36.7}, "Gray":{d:-5.8,w:42.9}, "Gigi":{d:-3.8,w:31.7},
        "Larry & Lawrie":{d:-3.5,w:50.4}, "Mr. P":{d:-3.1,w:63.5}, "Bonnie":{d:-3,w:56.5},
        "Mandy":{d:-2.5,w:44.8}, "Mico":{d:-2.5,w:44.1}
      },
      bounty: {
        "Rosa":{d:7.5,w:60}, "Draco":{d:5.8,w:56.2}, "Sam":{d:5.8,w:54.3}, "Trunk":{d:5.7,w:61.8},
        "Ash":{d:5.6,w:55.4}, "Chuck":{d:5.1,w:54}, "Pam":{d:5,w:59.9}, "Wendy":{d:4.9,w:29.9},
        "Sprout":{d:-3.2,w:38.9}, "Grom":{d:-3.1,w:41.2}, "Mandy":{d:-3,w:38.7}, "Dynamike":{d:-2.8,w:45.1},
        "Nani":{d:-2.8,w:35.7}, "Piper":{d:-2.8,w:40.1}, "Buster":{d:-2.7,w:48.8}, "Brock":{d:-2.6,w:38.2}
      },
      brawlArena: {
        "Otis":{d:4,w:60.9}, "Stu":{d:2.8,w:49}, "Cordelius":{d:2.6,w:54.2}, "Lou":{d:2.6,w:56.2},
        "Maisie":{d:2.2,w:57.8}, "Belle":{d:2.1,w:54.9}, "Gus":{d:2.1,w:58.9}, "Bea":{d:2,w:55},
        "Buster":{d:-5.2,w:37.9}, "Gigi":{d:-3.3,w:42.2}, "Hank":{d:-3.1,w:39.3}, "Bolt":{d:-2.6,w:36},
        "Kaze":{d:-2.4,w:53.3}, "Lumi":{d:-2.3,w:48.6}, "Pam":{d:-2.2,w:51.5}, "Sirius":{d:-2.2,w:49.6}
      },
      brawlBall: {
        "Wendy":{d:3.6,w:27.5}, "Griff":{d:3.5,w:42.4}, "Doug":{d:3,w:41.2}, "Clancy":{d:2.4,w:44.6},
        "Sirius":{d:2.4,w:40.8}, "R-T":{d:2.3,w:38.6}, "Damian":{d:2.1,w:34.7}, "Ash":{d:2,w:33.7},
        "Sprout":{d:-5.8,w:38.8}, "Gene":{d:-5.2,w:46.4}, "Nani":{d:-4.1,w:44.2}, "Angelo":{d:-4,w:55.3},
        "Barley":{d:-3.6,w:41.6}, "Grom":{d:-3.6,w:43}, "Squeak":{d:-3.6,w:40}, "Mico":{d:-3.4,w:43.4}
      },
      brawlBall5V5: {
        "Larry & Lawrie":{d:4.7,w:57.5}, "Charlie":{d:4.4,w:52.5}, "R-T":{d:3.8,w:53.8}, "Rosa":{d:3.6,w:54},
        "Angelo":{d:3.2,w:60.3}, "Jae-Yong":{d:3,w:53.9}, "Hank":{d:2.9,w:53.3}, "Melodie":{d:2.4,w:44.9},
        "Lumi":{d:-2,w:40.9}, "Ruffs":{d:-2,w:49.5}, "Mico":{d:-1.9,w:51.2}, "Grom":{d:-1.8,w:47.4},
        "Meg":{d:-1.8,w:37.6}, "Buster":{d:-1.6,w:41.9}, "Cordelius":{d:-1.6,w:52.7}, "Penny":{d:-1.6,w:46.5}
      },
      deathmatch5v5: {
        "Sam":{d:8.6,w:62}, "Trunk":{d:7,w:62.4}, "R-T":{d:6.8,w:56.2}, "Melodie":{d:5.5,w:59.3},
        "Hank":{d:4.9,w:60.6}, "Ash":{d:4.8,w:54.2}, "Rosa":{d:4.8,w:57.7}, "Pearl":{d:4.3,w:49.6},
        "Grom":{d:-3,w:40.3}, "Dynamike":{d:-2,w:47.5}, "Crow":{d:-1.7,w:49.1}, "Sprout":{d:-1.7,w:44.3},
        "Gigi":{d:-1.4,w:46.2}, "Jessie":{d:-1.3,w:46.6}, "Mortis":{d:-1.3,w:45.4}, "Spike":{d:-1.3,w:48.2}
      },
      duels: {
        "Ash":{d:6.5,w:49.5}, "Rosa":{d:6,w:44.2}, "Sam":{d:4.5,w:44.4}, "Berry":{d:4.2,w:68.4},
        "Amber":{d:4.1,w:39.1}, "Charlie":{d:3.8,w:45.9}, "Larry & Lawrie":{d:3.8,w:64.1},
        "Nita":{d:3.3,w:51.7}, "Wendy":{d:-6.4,w:22.9}, "Glowy":{d:-4.9,w:26.5}, "Najia":{d:-4.9,w:33.4},
        "Gigi":{d:-4.7,w:32.8}, "Alli":{d:-3.9,w:39.3}, "Stu":{d:-3.7,w:40.3}, "Mina":{d:-3.6,w:36.1},
        "Bolt":{d:-3.4,w:35.9}
      },
      gemGrab: {
        "Clancy":{d:2.4,w:48.8}, "Doug":{d:2.3,w:47.6}, "R-T":{d:2.2,w:50.2}, "Nita":{d:2.1,w:50.9},
        "Trunk":{d:1.6,w:50.9}, "Wendy":{d:1.6,w:29.1}, "Griff":{d:1.5,w:46.4}, "Juju":{d:1.5,w:50.4},
        "Sprout":{d:-3.2,w:48.9}, "Buster":{d:-3.1,w:51.6}, "Meg":{d:-2.4,w:45.1}, "Gigi":{d:-2.3,w:46.2},
        "Ollie":{d:-2.1,w:56.1}, "Dynamike":{d:-1.9,w:51.5}, "Poco":{d:-1.7,w:50.7}, "Gray":{d:-1.6,w:46.3}
      },
      heist: {
        "Bonnie":{d:4.4,w:67.7}, "Maisie":{d:4.4,w:60.9}, "Buster":{d:4.2,w:68}, "R-T":{d:4.2,w:38.4},
        "Eve":{d:3.3,w:58.3}, "Otis":{d:3.2,w:55.7}, "Jacky":{d:3.1,w:64.5}, "Lou":{d:3,w:60.8},
        "Kit":{d:-4.2,w:42.4}, "Hank":{d:-3.9,w:31.4}, "Sprout":{d:-3.7,w:41.3}, "Gray":{d:-3.6,w:45.3},
        "Ziggy":{d:-3.4,w:41.4}, "Mortis":{d:-3.3,w:51.6}, "Moe":{d:-3,w:40.7}, "Mandy":{d:-2.7,w:35.6}
      },
      hotZone: {
        "Gus":{d:5.7,w:48.8}, "Sam":{d:5.7,w:46.3}, "Ash":{d:4.9,w:42.9}, "Rosa":{d:4.8,w:48.6},
        "Trunk":{d:4.2,w:39.4}, "Angelo":{d:3.8,w:58.2}, "Alli":{d:3.4,w:47.7}, "Bea":{d:3.4,w:54.4},
        "Wendy":{d:-4.8,w:16.5}, "Mortis":{d:-4.6,w:36.4}, "Sprout":{d:-4,w:41.4}, "Squeak":{d:-3.9,w:40.4},
        "Kit":{d:-3.5,w:38.1}, "Penny":{d:-3.2,w:34.6}, "Gigi":{d:-2.8,w:38.1}, "Leon":{d:-2.7,w:46.7}
      },
      knockout: {
        "Wendy":{d:6.8,w:29.1}, "Rosa":{d:6.3,w:54.7}, "Doug":{d:6,w:44.2}, "Ash":{d:5.4,w:45.9},
        "Damian":{d:3.8,w:40.4}, "Mina":{d:3.8,w:39.9}, "Bolt":{d:3.6,w:31.6}, "Ollie":{d:3.3,w:43.2},
        "Sprout":{d:-3,w:31.7}, "Angelo":{d:-2.9,w:34.3}, "Gigi":{d:-2.8,w:33.4}, "Jessie":{d:-2.6,w:39.2},
        "Bo":{d:-2.4,w:36.2}, "Dynamike":{d:-2.3,w:45.2}, "Ziggy":{d:-2.2,w:36.7}, "Barley":{d:-2.1,w:42.6}
      },
      knockout5V5: {
        "Jacky":{d:5.1,w:59.3}, "Lou":{d:5.1,w:49.7}, "Clancy":{d:4.8,w:53.7}, "Charlie":{d:4,w:54.7},
        "Rosa":{d:4,w:41.6}, "Bonnie":{d:3.8,w:52.2}, "Pearl":{d:3.8,w:53.2}, "Larry & Lawrie":{d:3.4,w:53.9},
        "Finx":{d:-3.8,w:40.7}, "Damian":{d:-3.6,w:37}, "Draco":{d:-3.2,w:36}, "Kit":{d:-3.2,w:39.2},
        "Wendy":{d:-3.2,w:30}, "Mico":{d:-3.1,w:38.6}, "Mortis":{d:-3,w:41.1}, "Angelo":{d:-2.8,w:39.3}
      }
    }
  },
  "Stu": {
    vs: {
      "Dynamike":{d:4.3,w:62.4}, "Mico":{d:4,w:51.8}, "Edgar":{d:2.9,w:61.1}, "Brock":{d:1.6,w:53.8},
      "Bull":{d:1.6,w:56.8}, "Lily":{d:1.6,w:56.5}, "Shelly":{d:1.6,w:61.7}, "Barley":{d:1.5,w:58.6},
      "Glowy":{d:-6.4,w:42.6}, "Wendy":{d:-6,w:25.6}, "Ash":{d:-5.5,w:39.3}, "Sirius":{d:-5.4,w:42.4},
      "Amber":{d:-4.6,w:41}, "Gus":{d:-4.4,w:43.8}, "Buster":{d:-4,w:47}, "Damian":{d:-3.9,w:38.5},
      "Colt":{w:60.5}, "Crow":{w:59.3}, "Bolt":{w:37.3}, "Starr Nova":{w:40.1}
    },
    with: {
      "Rico":{d:5.7}, "Crow":{d:4.7}, "Shelly":{d:4.3}, "Colt":{d:4.1}, "Spike":{d:4}, "Mico":{d:-7.8},
      "Kit":{d:-7,w:47.8}, "Nani":{d:-6.6}, "Alli":{d:-6.4,w:46.3}, "Sirius":{d:-6.4}, "Wendy":{w:68.7},
      "Ash":{w:62}, "Bolt":{w:60.4}, "Lumi":{w:59}, "Amber":{w:58.9}, "Mortis":{w:45.6}, "Chuck":{w:47.4},
      "Angelo":{w:47.6}
    },
    modes: {
      airHockey: {
        "Nani":{d:3.7,w:56.9}, "Barley":{d:3.6,w:69.7}, "Squeak":{d:3.6,w:62.7}, "Belle":{d:3.5,w:66.5},
        "Berry":{d:3.5,w:70.1}, "Larry & Lawrie":{d:3.4,w:68.3}, "Angelo":{d:3.1,w:62.6},
        "Janet":{d:3.1,w:57.5}, "Wendy":{d:-3.6,w:32.5}, "Bolt":{d:-2.4,w:36.6}, "Damian":{d:-2.4,w:38.2},
        "Clancy":{d:-2.3,w:47.9}, "Buster":{d:-2.2,w:57.9}, "Sirius":{d:-2.2,w:46}, "Ash":{d:-2,w:53.4},
        "Charlie":{d:-1.9,w:55.7}
      },
      bounty: {
        "Gigi":{d:5.1,w:53.2}, "El Primo":{d:4.9,w:67.9}, "Barley":{d:4.6,w:64.1}, "Chuck":{d:4.6,w:57.5},
        "Darryl":{d:3.9,w:62.7}, "Bull":{d:3.8,w:61.5}, "Rosa":{d:3.7,w:60.2}, "Jacky":{d:3.2,w:67.3},
        "Sirius":{d:-5.5,w:40.6}, "Wendy":{d:-4.9,w:23.3}, "Eve":{d:-3.6,w:45.1}, "Pierce":{d:-3,w:42.6},
        "Finx":{d:-2.9,w:48.5}, "Ruffs":{d:-2.7,w:44.4}, "Mandy":{d:-2.6,w:43}, "Sandy":{d:-2.6,w:54.2}
      },
      brawlBall: {
        "Mico":{d:5.4,w:61.8}, "Dynamike":{d:3.8,w:63.7}, "Tick":{d:3.5,w:55.3}, "Nani":{d:3.4,w:61.3},
        "Angelo":{d:2.6,w:70.7}, "Gene":{d:2.4,w:63.4}, "Brock":{d:2.3,w:58.1}, "Barley":{d:2.2,w:57.1},
        "Wendy":{d:-5.4,w:26.3}, "Ash":{d:-5.1,w:35.5}, "Sirius":{d:-4.6,w:43.2}, "Buster":{d:-4.1,w:43.7},
        "Amber":{d:-3.9,w:37.8}, "Bolt":{d:-3.9,w:40.3}, "Damian":{d:-3.9,w:37.7}, "Gus":{d:-3.9,w:42.3}
      },
      duels: {
        "Squeak":{d:6.2,w:70.5}, "Berry":{d:4.1,w:73.6}, "Edgar":{d:3.8,w:63.1}, "Emz":{d:3.8,w:62},
        "Mico":{d:3.7,w:53.7}, "Rico":{d:3.7,w:59.7}, "Jessie":{d:3.6,w:61.6}, "Kenji":{d:3.5,w:64.9},
        "Wendy":{d:-10.3,w:24.2}, "Glowy":{d:-5.9,w:31}, "Gus":{d:-4.5,w:35.4}, "R-T":{d:-4.5,w:30.4},
        "Moe":{d:-4.3,w:35.7}, "Amber":{d:-3.6,w:37}, "Meeple":{d:-3.5,w:37.1}, "Ruffs":{d:-3.1,w:39.3}
      },
      gemGrab: {
        "Dynamike":{d:3,w:59.8}, "Melodie":{d:2.9,w:61.6}, "Lumi":{d:2.8,w:52.3}, "Barley":{d:2.5,w:65.9},
        "Bo":{d:2.5,w:47.2}, "Tick":{d:2.5,w:54.3}, "Berry":{d:2.1,w:62.7}, "Brock":{d:2.1,w:57.7},
        "Sirius":{d:-5.8,w:42.4}, "Wendy":{d:-4.7,w:25.8}, "Hank":{d:-4.6,w:46.3}, "Ash":{d:-3.4,w:45},
        "Buster":{d:-3,w:55.1}, "Damian":{d:-3,w:39.3}, "Charlie":{d:-2.7,w:52}, "Glowy":{d:-2.6,w:50.4}
      },
      hotZone: {
        "Brock":{d:3.6,w:62.2}, "Tick":{d:3.5,w:51.6}, "Bo":{d:3.1,w:45.2}, "Juju":{d:3,w:46.5},
        "Mortis":{d:2.7,w:54.9}, "Lumi":{d:2.6,w:51.9}, "Surge":{d:2.6,w:50.9}, "Dynamike":{d:2.5,w:58.8},
        "Charlie":{d:-6.2,w:55.2}, "Sirius":{d:-5.5,w:41}, "Frank":{d:-5.1,w:44.6}, "Wendy":{d:-4.6,w:25.2},
        "Sandy":{d:-3.9,w:45.9}, "Lola":{d:-3.8,w:51}, "Ash":{d:-3.7,w:45.3}, "Glowy":{d:-3.3,w:45.3}
      },
      knockout: {
        "El Primo":{d:5.3,w:64.8}, "Buzz":{d:4,w:58.4}, "Edgar":{d:3.4,w:62.7}, "Dynamike":{d:3.2,w:60.8},
        "Trunk":{d:3.1,w:62.2}, "Chuck":{d:2.4,w:58.4}, "Kenji":{d:2.4,w:51.5}, "Sam":{d:2.3,w:54.4},
        "Wendy":{d:-8.6,w:21.6}, "Sirius":{d:-8,w:37}, "Buster":{d:-6.1,w:38.7}, "Glowy":{d:-4.8,w:41.6},
        "Doug":{d:-4.1,w:44}, "Pearl":{d:-3.9,w:36.1}, "Najia":{d:-3.6,w:42.3}, "Damian":{d:-3.5,w:42.9}
      }
    }
  },
  "Damian": {
    vs: {
      "Bolt":{d:9.6,w:55.9}, "Sprout":{d:8.1,w:65.9}, "Kaze":{d:6.1,w:63.3}, "Gene":{d:5.1,w:67.7},
      "Mortis":{d:5,w:66.9}, "Jae-Yong":{d:4.8,w:64.9}, "Mina":{d:4.7,w:60.6}, "Mico":{d:4.5,w:60},
      "Rosa":{d:-4.4,w:56.4}, "Emz":{d:-4.3,w:56.5}, "8-Bit":{d:-3.4,w:52.3}, "Jacky":{d:-3.4,w:55.9},
      "Colette":{d:-3.3,w:61}, "R-T":{d:-3.1,w:50}, "Crow":{d:-2.9,w:62.9}, "Bull":{d:-2.5,w:60.1},
      "Colt":{w:67.4}, "Leon":{w:67.4}, "Shelly":{w:66.3}, "Wendy":{w:36.5}, "Starr Nova":{w:51},
      "Shade":{w:51.8}
    },
    with: {
      "Crow":{d:5.3}, "Rico":{d:5}, "Clancy":{d:3.3}, "Otis":{d:3.2}, "Dynamike":{d:2.9},
      "Angelo":{d:-12.7,w:47.9}, "Mico":{d:-11.7}, "Nani":{d:-10.4,w:52.5}, "Chuck":{d:-9.8,w:51.2},
      "Gus":{d:-8.4}, "Wendy":{w:70.3}, "Bolt":{w:68.6}, "Starr Nova":{w:68}, "8-Bit":{w:66.4},
      "Griff":{w:66.2}, "Mortis":{w:52.6}, "Gene":{w:52.9}
    },
    modes: {
      brawlBall: {
        "Gene":{d:9.8,w:78.5}, "Mr. P":{d:8.5,w:72.5}, "Sprout":{d:8.2,w:70.6}, "Belle":{d:7,w:71.1},
        "Eve":{d:7,w:70.2}, "Pam":{d:7,w:66.9}, "Gray":{d:6.9,w:67.2}, "Lola":{d:6.4,w:67.1},
        "Emz":{d:-5.2,w:57.4}, "Edgar":{d:-3.7,w:65}, "Bull":{d:-3.6,w:61.1}, "Frank":{d:-3.4,w:59.5},
        "Griff":{d:-2.9,w:53.9}, "Bibi":{d:-2.7,w:59.7}, "Crow":{d:-2.5,w:66.2}, "Surge":{d:-2.2,w:60.8}
      },
      gemGrab: {
        "Bolt":{d:11.3,w:54.3}, "Jae-Yong":{d:8.2,w:73.1}, "Sprout":{d:7.2,w:70.3}, "Chuck":{d:5.9,w:66.1},
        "Gray":{d:5.3,w:64.4}, "Mandy":{d:5.2,w:67.3}, "Kaze":{d:5.1,w:64.2}, "Belle":{d:4.8,w:74.1},
        "Clancy":{d:-4.3,w:53.2}, "Cordelius":{d:-4,w:60.2}, "Jacky":{d:-3.8,w:63.2}, "R-T":{d:-3.7,w:55.4},
        "Frank":{d:-3.6,w:59.9}, "Bull":{d:-3.5,w:58.2}, "Lou":{d:-3.3,w:60.3}, "Colette":{d:-3.2,w:61.5}
      },
      hotZone: {
        "Bolt":{d:9.2,w:57.3}, "Sprout":{d:8.4,w:73.8}, "Chuck":{d:7.2,w:62.6}, "Ziggy":{d:6.1,w:68.3},
        "Brock":{d:4.8,w:72}, "Mandy":{d:4.8,w:74.4}, "Amber":{d:4.5,w:59.5}, "Mortis":{d:4.4,w:65.7},
        "Wendy":{d:-5.6,w:32.4}, "Cordelius":{d:-5,w:60.2}, "Maisie":{d:-4.8,w:63.7},
        "Colette":{d:-4.4,w:60.7}, "Doug":{d:-4.3,w:48.9}, "Bull":{d:-4.2,w:59.7}, "Otis":{d:-4.2,w:63.4},
        "Jacky":{d:-3.3,w:59.2}
      },
      knockout: {
        "Bolt":{d:17.5,w:57.8}, "Gigi":{d:7.7,w:57.3}, "Kaze":{d:6.7,w:60.2}, "Mina":{d:6.6,w:56.1},
        "Alli":{d:6.2,w:59.5}, "Sprout":{d:6.2,w:54.2}, "Najia":{d:5.9,w:55.5}, "Mr. P":{d:5.5,w:54.2},
        "Jacky":{d:-7.5,w:58.4}, "Nita":{d:-7,w:54.3}, "Frank":{d:-6.7,w:46.4}, "Colette":{d:-6.4,w:54.7},
        "Juju":{d:-6.2,w:44.4}, "Emz":{d:-5.7,w:55.7}, "Crow":{d:-5.5,w:60}, "Lou":{d:-4.9,w:46.9}
      }
    }
  },
  "Piper": {
    vs: {
      "Jacky":{d:7.6,w:54.4}, "Emz":{d:4.2,w:52.6}, "Clancy":{d:3.8,w:50.8}, "Trunk":{d:3.7,w:49.5},
      "Griff":{d:3.2,w:46.6}, "Crow":{d:3.1,w:56.8}, "Jessie":{d:3.1,w:49.1}, "Nita":{d:3.1,w:49.9},
      "Sprout":{d:-5.3,w:40}, "Mr. P":{d:-5.1,w:43}, "Bonnie":{d:-4.9,w:44.6}, "Gene":{d:-4.7,w:45.6},
      "Jae-Yong":{d:-4.4,w:43.3}, "Pearl":{d:-4.2,w:39.7}, "Eve":{d:-4,w:44.1}, "Alli":{d:-3.9,w:43.6},
      "Colt":{w:55.5}, "Edgar":{w:55.3}, "Shelly":{w:55.2}, "Rico":{w:54.9}, "Wendy":{w:24.8},
      "Bolt":{w:31.3}, "Damian":{w:37.3}, "Ash":{w:37.5}, "Nori":{w:38}
    },
    with: {
      "Bonnie":{d:7.1}, "Eve":{d:7}, "Pearl":{d:7,w:58.1}, "Jae-Yong":{d:5.8}, "Mr. P":{d:5.8},
      "Emz":{d:-5.1}, "Crow":{d:-4.6,w:37.5}, "Rico":{d:-4.4,w:37.8}, "Jacky":{d:-4.3}, "Tara":{d:-3.5},
      "Wendy":{w:69}, "Bolt":{w:65.7}, "Ash":{w:57.9}, "Hank":{w:56.7}, "Colt":{w:39.7}, "Shelly":{w:39.8},
      "Leon":{w:40}
    },
    modes: {
      airHockey: {
        "Clancy":{d:4,w:45.5}, "Maisie":{d:3.7,w:51.4}, "Bonnie":{d:2.5,w:69}, "Griff":{d:2.4,w:41.6},
        "Jessie":{d:2.3,w:45.3}, "Gale":{d:2,w:41.1}, "Lou":{d:2,w:45}, "Ollie":{d:1.9,w:55.6},
        "Glowy":{d:-3.9,w:36.7}, "Pam":{d:-3.9,w:52}, "Damian":{d:-3.6,w:28.9}, "Nori":{d:-3.6,w:33.3},
        "Bolt":{d:-3.4,w:27.6}, "Kaze":{d:-3.3,w:35.9}, "Mico":{d:-3.3,w:42.2}, "Barley":{d:-2.9,w:54.9}
      },
      bounty: {
        "Clancy":{d:4.9,w:68.1}, "Emz":{d:4.7,w:59.8}, "Cordelius":{d:4.1,w:64.5}, "Crow":{d:4.1,w:58.4},
        "Berry":{d:3.9,w:66.6}, "Edgar":{d:3.9,w:56.9}, "Griff":{d:3.8,w:56.2}, "Jessie":{d:3.5,w:58.6},
        "Wendy":{d:-5.1,w:25.6}, "Kaze":{d:-4.3,w:47.7}, "Alli":{d:-4,w:47.6}, "Chuck":{d:-4,w:52},
        "Sam":{d:-3.8,w:51.8}, "Bolt":{d:-3.7,w:30.9}, "Glowy":{d:-3.7,w:49.6}, "Sprout":{d:-3.5,w:45.6}
      },
      brawlBall: {
        "Barley":{d:2.9,w:47.9}, "Tick":{d:2.9,w:44.8}, "Dynamike":{d:2.7,w:52.8}, "Brock":{d:2.6,w:48.5},
        "Griff":{d:2.4,w:40.9}, "Clancy":{d:2,w:43.9}, "Crow":{d:2,w:53.2}, "Rico":{d:1.9,w:51.5},
        "Glowy":{d:-6.2,w:35.7}, "Jae-Yong":{d:-6,w:37.5}, "Draco":{d:-5.3,w:32.7}, "Damian":{d:-5.2,w:27.1},
        "Wendy":{d:-5.1,w:18.6}, "Najia":{d:-5,w:40.1}, "Kaze":{d:-4.7,w:35.9}, "Gene":{d:-4.6,w:46.6}
      },
      brawlBall5V5: {
        "Trunk":{d:5,w:54.9}, "Shade":{d:4.3,w:49.8}, "Angelo":{d:4.2,w:60.9}, "Otis":{d:4.2,w:47},
        "Eve":{d:3.8,w:52.3}, "Lola":{d:3.8,w:54.1}, "Rosa":{d:3.4,w:53.4}, "Bonnie":{d:3.3,w:53.1},
        "Damian":{d:-3.7,w:33.6}, "Bolt":{d:-3.4,w:27.9}, "Mina":{d:-3.2,w:43.6}, "Mortis":{d:-2.8,w:45.4},
        "Najia":{d:-2.6,w:51.1}, "Wendy":{d:-2.4,w:22.2}, "Nori":{d:-2.2,w:37.5}, "Buzz":{d:-2,w:52}
      },
      deathmatch5v5: {
        "Nita":{d:7,w:67.4}, "Trunk":{d:5.7,w:66}, "Jacky":{d:4.8,w:65.7}, "Rosa":{d:4.2,w:62},
        "Hank":{d:3.9,w:64.5}, "Lumi":{d:3.9,w:63.8}, "Shelly":{d:3.7,w:64.1}, "El Primo":{d:3.2,w:64.5},
        "Wendy":{d:-4,w:31.5}, "Najia":{d:-3.5,w:48.2}, "Bolt":{d:-2.9,w:34.3}, "Mr. P":{d:-2.3,w:45.8},
        "Eve":{d:-2,w:51.3}, "Mina":{d:-2,w:52.2}, "Damian":{d:-1.6,w:42.4}, "Chuck":{d:-1.5,w:51.1}
      },
      duels: {
        "Barley":{d:3.6,w:64.8}, "Berry":{d:3.5,w:70.6}, "Larry & Lawrie":{d:3.5,w:66.9},
        "Jessie":{d:3.4,w:58.7}, "Hank":{d:3,w:52.6}, "Mandy":{d:2.3,w:55.3}, "Emz":{d:2.1,w:57.6},
        "Squeak":{d:2.1,w:63.8}, "Wendy":{d:-6.3,w:25.8}, "Bolt":{d:-3.5,w:39}, "Buster":{d:-3.4,w:54.8},
        "Damian":{d:-3.3,w:40.4}, "Mico":{d:-3.3,w:43.9}, "Eve":{d:-2.9,w:49.4}, "Glowy":{d:-2.9,w:31.4},
        "Grom":{d:-2.9,w:65.8}
      },
      gemGrab: {
        "Jessie":{d:3,w:46.1}, "Tick":{d:2.9,w:46.9}, "Clancy":{d:2.8,w:44.9}, "Crow":{d:2.4,w:46.5},
        "Mandy":{d:2.4,w:49.2}, "Lumi":{d:2.1,w:43.8}, "Dynamike":{d:1.8,w:50.9}, "Juju":{d:1.8,w:46.4},
        "Nori":{d:-6,w:31.9}, "Wendy":{d:-5.7,w:18.5}, "Alli":{d:-5.4,w:37.6}, "Sam":{d:-4.7,w:41.6},
        "Damian":{d:-4.5,w:30.4}, "Lola":{d:-4.3,w:42.6}, "Najia":{d:-4.1,w:44}, "Kaze":{d:-4,w:39.6}
      },
      hotZone: {
        "Jacky":{d:3.7,w:40.1}, "Sam":{d:3.5,w:38.3}, "R-T":{d:3.2,w:32.6}, "Maisie":{d:3,w:45.7},
        "Alli":{d:2.9,w:41.3}, "Cordelius":{d:2.9,w:42.2}, "Otis":{d:2.8,w:44.7}, "Colette":{d:2.2,w:41.3},
        "Wendy":{d:-6.7,w:10.7}, "Bonnie":{d:-4.6,w:44.1}, "Kaze":{d:-4.5,w:28.9}, "Nori":{d:-4.2,w:21.2},
        "Mico":{d:-4.1,w:28.8}, "Mortis":{d:-3.6,w:31.6}, "Meeple":{d:-3.5,w:34.7}, "Lola":{d:-3.3,w:34.4}
      },
      knockout: {
        "Sirius":{d:2.8,w:43.2}, "Griff":{d:2.5,w:46.8}, "Tick":{d:2.1,w:44.7}, "Colette":{d:1.7,w:54.5},
        "Edgar":{d:1.7,w:56.4}, "Crow":{d:1.4,w:58.9}, "Spike":{d:1.4,w:52.9}, "Brock":{d:1.3,w:46.3},
        "Ash":{d:-4.2,w:41.6}, "Alli":{d:-3.4,w:41.6}, "Ollie":{d:-3.4,w:41.7}, "Pam":{d:-3.4,w:44.8},
        "Draco":{d:-3.3,w:44.8}, "Kaze":{d:-3.2,w:41.9}, "Trunk":{d:-3,w:51.5}, "Chuck":{d:-2.7,w:48.5}
      },
      knockout5V5: {
        "Lou":{d:3.3,w:52.9}, "Lumi":{d:3.2,w:40.7}, "Belle":{d:2.4,w:48.6}, "Jacky":{d:2,w:61.1},
        "Charlie":{d:1.9,w:57.6}, "Larry & Lawrie":{d:1.8,w:57.3}, "Colette":{d:1.6,w:51.2},
        "Frank":{d:1.5,w:52.4}, "Wendy":{d:-7,w:30.7}, "Ash":{d:-5.5,w:28.6}, "Bolt":{d:-5.1,w:44.4},
        "Damian":{d:-4.6,w:40.9}, "Draco":{d:-4.4,w:39.7}, "Chuck":{d:-3.3,w:44.3}, "Mr. P":{d:-3.1,w:41},
        "Glowy":{d:-2.8,w:42.1}
      },
      wipeout: {
        "Rosa":{d:6.6,w:63.7}, "Emz":{d:5.9,w:57.6}, "Nita":{d:5.6,w:62.7}, "Frank":{d:5.4,w:60.5},
        "Barley":{d:5.2,w:66.4}, "Clancy":{d:4.8,w:64.5}, "Griff":{d:4.8,w:53.1}, "Bull":{d:4.7,w:61.5},
        "Damian":{d:-6,w:33.4}, "Mico":{d:-5.4,w:46.5}, "Wendy":{d:-4.8,w:20.7}, "Mina":{d:-4.6,w:41.5},
        "Bolt":{d:-4.4,w:27.7}, "Najia":{d:-4.3,w:40.3}, "Sam":{d:-4.2,w:51.7}, "Gigi":{d:-4.1,w:42.1}
      }
    }
  },
  "Tick": {
    vs: {
      "Sirius":{d:5.5,w:52.7}, "Glowy":{d:5.1,w:53.6}, "Willow":{d:5,w:55.3}, "Pierce":{d:4.5,w:52.1},
      "R-T":{d:4,w:48.9}, "Finx":{d:3.5,w:52.3}, "Meeple":{d:3.5,w:52}, "Jae-Yong":{d:3.4,w:55.4},
      "Bolt":{d:-6.1,w:32.2}, "Ash":{d:-3.8,w:40.5}, "Wendy":{d:-3.5,w:27.7}, "Mr. P":{d:-3,w:49.4},
      "Mina":{d:-2.9,w:44.8}, "Lily":{d:-2.8,w:51.6}, "Bibi":{d:-2.3,w:49.7}, "Edgar":{d:-2.3,w:55.4},
      "Shelly":{w:61.7}, "Colette":{w:59}, "Dynamike":{w:58.5}, "Crow":{w:58.1}, "Barley":{w:57.9},
      "Starr Nova":{w:40.8}, "Damian":{w:41.6}
    },
    with: {
      "Shelly":{d:4.9}, "Leon":{d:4.1}, "Bibi":{d:4}, "Edgar":{d:4}, "Rosa":{d:3.7}, "Lumi":{d:-7},
      "Wendy":{d:-6.2,w:65.1}, "Amber":{d:-6.1}, "Shade":{d:-5.2}, "Gus":{d:-4.3}, "Bolt":{w:61.9},
      "Damian":{w:61.2}, "Hank":{w:60.7}, "Starr Nova":{w:59}, "Colt":{w:45.2}, "Barley":{w:45.6},
      "Rico":{w:47}, "Colette":{w:47.1}, "Dynamike":{w:47.7}
    },
    modes: {
      airHockey: {
        "Sirius":{d:6.9,w:50.3}, "Willow":{d:6.1,w:49.3}, "Kit":{d:5.6,w:53.1}, "Doug":{d:4.8,w:47.9},
        "Jae-Yong":{d:4.3,w:46.7}, "Glowy":{d:4,w:48.5}, "Nani":{d:3.7,w:52.1},
        "Larry & Lawrie":{d:3.4,w:63.8}, "Gus":{d:-6.6,w:38.2}, "Otis":{d:-6.5,w:49.6},
        "Charlie":{d:-6,w:46.8}, "Shade":{d:-5.3,w:36.1}, "Ash":{d:-5,w:45.6}, "Wendy":{d:-4.7,w:27.1},
        "Ollie":{d:-4.1,w:53.5}, "Belle":{d:-4,w:54.5}
      },
      bounty: {
        "Colette":{d:4.8,w:66.4}, "Emz":{d:4.1,w:62.3}, "Spike":{d:3.7,w:59.7}, "Doug":{d:3.5,w:59.6},
        "Gale":{d:3.4,w:65.9}, "Meg":{d:3.4,w:63.1}, "Finx":{d:3.3,w:60.9}, "Glowy":{d:3.2,w:59.5},
        "Bolt":{d:-8.2,w:29.4}, "Sam":{d:-6.6,w:52.1}, "Rosa":{d:-5.6,w:56.9}, "Lily":{d:-5,w:51.2},
        "Mina":{d:-4.9,w:46}, "Wendy":{d:-4.9,w:28.6}, "Ash":{d:-4.6,w:55.4}, "El Primo":{d:-3.4,w:65.3}
      },
      brawlArena: {
        "Lou":{d:4,w:58.4}, "Pierce":{d:3.9,w:58.6}, "Sirius":{d:3.9,w:56.5}, "Colette":{d:3.8,w:54.7},
        "Otis":{d:3.3,w:61.1}, "Glowy":{d:3.2,w:60.5}, "Tara":{d:3.2,w:52.4}, "Frank":{d:2.9,w:57.8},
        "Bolt":{d:-6.3,w:33.1}, "Angelo":{d:-6,w:52.6}, "Wendy":{d:-4.9,w:20.6}, "Gray":{d:-4.4,w:40.1},
        "Lily":{d:-4.2,w:47.5}, "Ash":{d:-4,w:45.5}, "Sam":{d:-3.6,w:56.8}, "Stu":{d:-3.6,w:43.5}
      },
      brawlBall: {
        "Sirius":{d:6.8,w:52.8}, "Doug":{d:6.6,w:52.5}, "Glowy":{d:6.2,w:56.2}, "Berry":{d:5.1,w:56.1},
        "Kit":{d:4.5,w:57.1}, "Gale":{d:4.4,w:51.6}, "Squeak":{d:4.4,w:55.8}, "Pierce":{d:3.9,w:50.4},
        "Chuck":{d:-5.7,w:51.3}, "Gus":{d:-4.8,w:39.6}, "Colt":{d:-4.7,w:55.4}, "Wendy":{d:-4,w:26.2},
        "Stu":{d:-3.5,w:44.7}, "Shade":{d:-3.4,w:37.3}, "Mina":{d:-3.3,w:44.6}, "Piper":{d:-2.9,w:55.2}
      },
      brawlBall5V5: {
        "Barley":{d:4.2,w:62.3}, "Berry":{d:4.1,w:59.9}, "Larry & Lawrie":{d:3.7,w:60.5},
        "Dynamike":{d:3.6,w:59}, "Juju":{d:3.4,w:62.6}, "Angelo":{d:3.2,w:64.2}, "Willow":{d:3.1,w:59.1},
        "Pam":{d:3,w:57}, "Wendy":{d:-8.3,w:19.7}, "Shade":{d:-7.2,w:42.8}, "Mina":{d:-4.8,w:46.4},
        "Bolt":{d:-4.1,w:31.2}, "Damian":{d:-3.8,w:37.7}, "Darryl":{d:-3.4,w:45.2}, "Alli":{d:-3.2,w:51.5},
        "Gus":{d:-3.1,w:47.6}
      },
      deathmatch5v5: {
        "Nita":{d:7.5,w:68.2}, "Pam":{d:4.2,w:61.1}, "Larry & Lawrie":{d:3.9,w:60.1}, "Barley":{d:3.6,w:60.5},
        "Frank":{d:3.3,w:62.6}, "Lou":{d:3.3,w:59.9}, "Lola":{d:3.2,w:62.2}, "Hank":{d:3,w:63.8},
        "Wendy":{d:-6.5,w:29.3}, "Bolt":{d:-4.4,w:33.1}, "Damian":{d:-4.4,w:39.9}, "Mina":{d:-3.4,w:51.1},
        "Ollie":{d:-2.7,w:53.3}, "Doug":{d:-2.2,w:42.5}, "Nori":{d:-2.2,w:45.4}, "Starr Nova":{d:-2.1,w:46.9}
      },
      gemGrab: {
        "Sirius":{d:4.8,w:51.3}, "Meg":{d:4.2,w:53.4}, "Doug":{d:4,w:51}, "Emz":{d:3.4,w:52.5},
        "Colette":{d:3.3,w:58.9}, "Frank":{d:3.2,w:57.6}, "Glowy":{d:2.9,w:54.2}, "Pierce":{d:2.9,w:51.5},
        "Wendy":{d:-8.1,w:20.9}, "Bolt":{d:-6.5,w:27.5}, "Sam":{d:-5.4,w:46.8}, "Ollie":{d:-5,w:54.8},
        "Bonnie":{d:-4.6,w:58.2}, "Melodie":{d:-4.2,w:52.9}, "Ash":{d:-4,w:42.6}, "Mina":{d:-3.9,w:42.3}
      },
      hotZone: {
        "Sirius":{d:6,w:54.5}, "Shelly":{d:4.2,w:64.4}, "Berry":{d:4.1,w:54.7}, "Frank":{d:4,w:55.6},
        "Kit":{d:3.8,w:58.4}, "Spike":{d:3.8,w:59.3}, "Doug":{d:3.6,w:49.4}, "Colette":{d:3.2,w:61.4},
        "Gus":{d:-6.9,w:49.4}, "Bolt":{d:-5.9,w:34.9}, "Mr. P":{d:-5.2,w:56.5}, "Ash":{d:-5,w:46},
        "Starr Nova":{d:-4.5,w:38}, "Eve":{d:-4.4,w:53.2}, "Sam":{d:-4.4,w:49.2}, "Shade":{d:-4.1,w:45}
      },
      knockout: {
        "Tara":{d:6.7,w:60.8}, "Doug":{d:5.8,w:56.7}, "Finx":{d:5.8,w:57}, "Glowy":{d:5.8,w:54.9},
        "Berry":{d:5.1,w:57.7}, "Meg":{d:5.1,w:54.3}, "Chester":{d:4.9,w:58}, "Sirius":{d:4.8,w:52.5},
        "Bolt":{d:-7.5,w:32}, "Sam":{d:-5.4,w:49.3}, "Lily":{d:-4.8,w:49}, "Rosa":{d:-4.4,w:56.6},
        "Edgar":{d:-4.1,w:57.8}, "Mina":{d:-3.7,w:44.9}, "Wendy":{d:-2.9,w:29.6}, "Bibi":{d:-2.6,w:55.9}
      },
      knockout5V5: {
        "Amber":{d:2.7,w:50.1}, "Byron":{d:2.7,w:55.2}, "Finx":{d:2.6,w:53.6}, "Nani":{d:2.5,w:49.8},
        "Pierce":{d:2.3,w:49.3}, "Bea":{d:2.2,w:57.4}, "Gus":{d:2.2,w:55}, "Meeple":{d:2.1,w:51.7},
        "Starr Nova":{d:-7.9,w:33}, "Ash":{d:-7,w:28.5}, "Ollie":{d:-6.9,w:49.6}, "Damian":{d:-6.2,w:40.9},
        "Wendy":{d:-5.9,w:33.3}, "Draco":{d:-4.8,w:40.8}, "Bolt":{d:-4.6,w:46.5}, "Sam":{d:-4.5,w:46.4}
      }
    }
  },
  "Byron": {
    vs: {
      "Jacky":{d:5.4,w:52.5}, "Lumi":{d:3.3,w:44.3}, "Clancy":{d:3.1,w:50.3}, "Trunk":{d:3.1,w:49},
      "Maisie":{d:2.7,w:50.4}, "Emz":{d:2.6,w:51.1}, "Gale":{d:2.5,w:48.7}, "Lou":{d:2.5,w:47.1},
      "Sprout":{d:-4.3,w:41.1}, "Bonnie":{d:-4.1,w:45.6}, "Chuck":{d:-4,w:42.7}, "Mr. P":{d:-3.7,w:44.6},
      "Eve":{d:-3.2,w:45.1}, "Grom":{d:-2.9,w:46.5}, "Gene":{d:-2.8,w:47.7}, "Wendy":{d:-2.8,w:24.8},
      "Shelly":{w:57.3}, "Colt":{w:56.3}, "Crow":{w:56.3}, "Rico":{w:55.5}, "Colette":{w:54.5}, "Bolt":{w:32},
      "Damian":{w:37.3}, "Nori":{w:38.2}, "Starr Nova":{w:38.5}
    },
    with: {
      "Bonnie":{d:6.4}, "Nani":{d:5.3,w:56.2}, "Angelo":{d:4.7}, "Pearl":{d:4.3}, "Najia":{d:4.2},
      "Lou":{d:-4.4}, "Crow":{d:-4,w:38}, "Tara":{d:-4}, "Emz":{d:-3.9}, "Gale":{d:-3.6}, "Wendy":{w:69.5},
      "Bolt":{w:65.2}, "Damian":{w:56.9}, "Starr Nova":{w:56.9}, "Rico":{w:39.8}, "Colt":{w:40},
      "Edgar":{w:41.2}, "Leon":{w:41.7}
    },
    modes: {
      bounty: {
        "Clancy":{d:7.2,w:69.7}, "Cordelius":{d:4.7,w:64.4}, "Jacky":{d:4.6,w:70.9}, "Buster":{d:4,w:61.9},
        "Emz":{d:4,w:58.4}, "Crow":{d:3.4,w:57}, "Lumi":{d:3.3,w:57.3}, "Maisie":{d:3.2,w:61.1},
        "Kenji":{d:-3.1,w:46.6}, "Sprout":{d:-3.1,w:45.3}, "Sam":{d:-3,w:51.9}, "Jae-Yong":{d:-2.7,w:51},
        "Chuck":{d:-2.6,w:52.7}, "Wendy":{d:-2.5,w:27.6}, "Alli":{d:-2.4,w:48.5}, "Kaze":{d:-2.4,w:48.8}
      },
      brawlBall: {
        "Colette":{d:2.9,w:54.4}, "Shelly":{d:2.6,w:58.4}, "Clancy":{d:2.1,w:48}, "Rico":{d:2,w:55.7},
        "Juju":{d:1.7,w:47.5}, "Surge":{d:1.6,w:50.6}, "Brock":{d:1.5,w:51.5}, "Crow":{d:1.5,w:56.8},
        "Wendy":{d:-6.6,w:20.2}, "Bolt":{d:-6.4,w:32.2}, "Damian":{d:-5.8,w:30.3}, "Nori":{d:-5.1,w:32.3},
        "Sirius":{d:-4.4,w:37.6}, "Doug":{d:-4.2,w:37.6}, "Mr. P":{d:-4.2,w:45.7}, "Eve":{d:-3.9,w:45.3}
      },
      deathmatch5v5: {
        "Hank":{d:6.7,w:64.7}, "Nita":{d:6.5,w:64.3}, "Jacky":{d:5.7,w:64}, "Juju":{d:5.6,w:60},
        "Lola":{d:4.8,w:60.9}, "Stu":{d:4.1,w:61.3}, "Darryl":{d:3.8,w:57.8}, "Shelly":{d:3.7,w:61.6},
        "Bolt":{d:-2.8,w:31.9}, "Grom":{d:-1.9,w:43.6}, "R-T":{d:-1.9,w:49.8}, "Nori":{d:-1.8,w:42.8},
        "Ziggy":{d:-1.8,w:47}, "Najia":{d:-1.7,w:47.4}, "Mortis":{d:-1.5,w:47.6}, "Damian":{d:-1.4,w:40}
      },
      duels: {
        "Willow":{d:3.6,w:53.9}, "Gale":{d:3.2,w:52.4}, "Otis":{d:2.7,w:46.7},
        "Larry & Lawrie":{d:2.6,w:68.5}, "Emz":{d:2.2,w:60.5}, "Moe":{d:2.2,w:42.2}, "Griff":{d:2.1,w:50.7},
        "Janet":{d:2.1,w:48.4}, "Wendy":{d:-5.6,w:29}, "Jae-Yong":{d:-3.8,w:41}, "Sprout":{d:-2.7,w:42.2},
        "Kit":{d:-2.6,w:47.8}, "Jacky":{d:-2.5,w:62.3}, "Bonnie":{d:-2.4,w:46.1}, "Lola":{d:-2.4,w:39.7},
        "Sam":{d:-2.2,w:43.7}
      },
      gemGrab: {
        "Otis":{d:3,w:50.8}, "Clancy":{d:2.8,w:44.5}, "Gale":{d:2.8,w:50.6}, "Cordelius":{d:2.5,w:51.2},
        "Buster":{d:1.9,w:51.9}, "Surge":{d:1.9,w:44.1}, "Shelly":{d:1.8,w:51.4}, "Buzz":{d:1.6,w:49.7},
        "Nori":{d:-6,w:31.5}, "Ollie":{d:-4.9,w:48.6}, "Wendy":{d:-4.5,w:19.4}, "Gigi":{d:-4.1,w:39.7},
        "Willow":{d:-3.7,w:48.1}, "Eve":{d:-3.6,w:41.8}, "Trunk":{d:-3.4,w:41.3}, "Sprout":{d:-3.2,w:44.2}
      },
      hotZone: {
        "Maisie":{d:4.6,w:50.7}, "Bull":{d:3.1,w:44.2}, "Lou":{d:3.1,w:38.4}, "Shelly":{d:2.6,w:47},
        "R-T":{d:2.4,w:34.6}, "Jacky":{d:2.3,w:41.9}, "Barley":{d:2.2,w:42.2}, "Belle":{d:2.2,w:54.6},
        "Wendy":{d:-6.9,w:12.6}, "Sprout":{d:-5.6,w:37.1}, "Hank":{d:-4,w:24.1}, "Mina":{d:-3.9,w:28.6},
        "Ruffs":{d:-3.9,w:32.8}, "Kit":{d:-3.7,w:35.3}, "Shade":{d:-3.7,w:30}, "Ziggy":{d:-3.6,w:35.7}
      },
      knockout: {
        "Clancy":{d:3.3,w:60.4}, "Colette":{d:2.5,w:56.5}, "Griff":{d:2.4,w:47.9}, "Frank":{d:2.2,w:48.1},
        "Shelly":{d:2.2,w:57.7}, "Nita":{d:2.1,w:56.4}, "Emz":{d:1.7,w:56.1}, "Otis":{d:1.7,w:44.8},
        "Sprout":{d:-2.4,w:38.5}, "Chuck":{d:-2.1,w:50.3}, "Sam":{d:-2,w:46.6}, "Kaze":{d:-1.9,w:44.5},
        "Wendy":{d:-1.8,w:25.4}, "Grom":{d:-1.6,w:43.7}, "Bolt":{d:-1.5,w:32.1}, "Najia":{d:-1.5,w:40.9}
      },
      knockout5V5: {
        "Jacky":{d:5,w:63.2}, "Lou":{d:4.3,w:52.9}, "Lola":{d:4.2,w:52}, "Otis":{d:4.2,w:52.5},
        "Pam":{d:4.2,w:54.6}, "Amber":{d:3.8,w:48.7}, "Barley":{d:3.2,w:57.7}, "Buster":{d:2.8,w:54.2},
        "Wendy":{d:-8.1,w:28.7}, "Bolt":{d:-4.3,w:44.3}, "Draco":{d:-4,w:39.1}, "Damian":{d:-3.1,w:41.4},
        "Sirius":{d:-3.1,w:38.9}, "Ash":{d:-2.9,w:30.3}, "Starr Nova":{d:-2.8,w:35.7}, "Tick":{d:-2.7,w:44.8}
      }
    }
  },
  "Max": {
    vs: {
      "Dynamike":{d:2.8,w:61}, "Brock":{d:1.8,w:54}, "Edgar":{d:1.8,w:60}, "Tick":{d:1.7,w:52.3},
      "Bull":{d:1.3,w:56.6}, "Colt":{d:1.2,w:61.3}, "Grom":{d:1.2,w:55.3}, "El Primo":{d:1.1,w:55.4},
      "Chuck":{d:-4.5,w:47.1}, "Glowy":{d:-4,w:45.1}, "Pam":{d:-3.9,w:50.8}, "Buster":{d:-3.7,w:47.3},
      "Gigi":{d:-3.6,w:44.1}, "Sandy":{d:-3.6,w:47}, "Lola":{d:-3.4,w:49.7}, "Poco":{d:-3.3,w:51},
      "Shelly":{w:61.1}, "Crow":{w:59.4}, "Wendy":{w:30.1}, "Bolt":{w:38.4}, "Damian":{w:40.5},
      "Starr Nova":{w:40.6}, "Nori":{w:41.1}
    },
    with: {
      "Ollie":{d:5.8}, "Pearl":{d:3.2}, "Pam":{d:3.1}, "Leon":{d:3}, "Bea":{d:2.7}, "Berry":{d:-5.9,w:45.1},
      "Chuck":{d:-5}, "Mico":{d:-4.5}, "Mr. P":{d:-4.2}, "Barley":{d:-4.1,w:44.3}, "Wendy":{w:74},
      "Bolt":{w:65.1}, "Damian":{w:64.9}, "Starr Nova":{w:62.4}, "Ash":{w:62.2}, "Edgar":{w:45},
      "Colt":{w:45.9}, "Shelly":{w:47}
    },
    modes: {
      airHockey: {
        "Ziggy":{d:4.5,w:53.7}, "Chuck":{d:3.9,w:58.5}, "Wendy":{d:3.5,w:39.2}, "Rosa":{d:2.3,w:67.4},
        "Grom":{d:1.6,w:64.6}, "Jessie":{d:1.6,w:53}, "Lumi":{d:1.6,w:45.7}, "Moe":{d:1.6,w:47.4},
        "Doug":{d:-3.2,w:44.3}, "Belle":{d:-2.9,w:59.9}, "Janet":{d:-2.6,w:51.5}, "Berry":{d:-2.1,w:64.2},
        "Gigi":{d:-2,w:44.5}, "Larry & Lawrie":{d:-2,w:62.6}, "Poco":{d:-2,w:54.2}, "Jacky":{d:-1.9,w:51}
      },
      bounty: {
        "Grom":{d:4.3,w:54.9}, "Brock":{d:3.1,w:50.1}, "Tick":{d:3,w:49.2}, "Mico":{d:2.5,w:49.9},
        "Rosa":{d:2.5,w:61.3}, "Jacky":{d:2.4,w:68.7}, "Trunk":{d:2.4,w:64.6}, "Edgar":{d:2.2,w:54.4},
        "Amber":{d:-5.3,w:45}, "Glowy":{d:-4.2,w:48.4}, "Lola":{d:-4.1,w:51.2}, "Clancy":{d:-3.6,w:58.9},
        "Finx":{d:-3.6,w:50.1}, "Poco":{d:-3.6,w:54.7}, "Tara":{d:-3.6,w:54.5}, "Draco":{d:-3.5,w:53.3}
      },
      brawlBall: {
        "Dynamike":{d:2.7,w:62.7}, "Juju":{d:2,w:53.9}, "El Primo":{d:1.9,w:54.5}, "Mico":{d:1.7,w:58.3},
        "Chuck":{d:1.5,w:60.4}, "Angelo":{d:1.4,w:69.7}, "Brock":{d:1.3,w:57.2}, "Ziggy":{d:1.3,w:53},
        "Buster":{d:-4.1,w:43.9}, "Gigi":{d:-3.5,w:43.5}, "Poco":{d:-3.4,w:50.6}, "Pam":{d:-3.3,w:48.4},
        "Glowy":{d:-3.2,w:48.6}, "Charlie":{d:-2.8,w:44.7}, "Tara":{d:-2.7,w:45.4}, "Damian":{d:-2.6,w:39.1}
      },
      brawlBall5V5: {
        "Wendy":{d:15.8,w:54.2}, "Cordelius":{d:5.8,w:75}, "Lumi":{d:5.7,w:64.4}, "Bolt":{d:5.4,w:52.1},
        "Damian":{d:5.2,w:58.5}, "Mina":{d:5,w:67.8}, "Buzz":{d:4.8,w:74.1}, "Edgar":{d:4.3,w:71.4},
        "Lola":{d:-5.2,w:60.8}, "Ruffs":{d:-4.8,w:61.9}, "Sprout":{d:-4.5,w:64.1}, "Eve":{d:-4.4,w:59.9},
        "Gigi":{d:-4.4,w:58}, "Poco":{d:-4,w:59.2}, "Larry & Lawrie":{d:-3.8,w:64.1},
        "Squeak":{d:-3.8,w:59.7}
      },
      duels: {
        "Najia":{d:2.8,w:47.3}, "Larry & Lawrie":{d:2.4,w:68.7}, "El Primo":{d:2.1,w:58.5},
        "Brock":{d:1.9,w:50.8}, "Cordelius":{d:1.8,w:59.7}, "Willow":{d:1.8,w:52.5}, "Doug":{d:1.7,w:52.8},
        "Maisie":{d:1.6,w:57.4}, "Wendy":{d:-7.3,w:27.6}, "Shade":{d:-4.8,w:43.4}, "Jessie":{d:-4.1,w:54.3},
        "Amber":{d:-3.9,w:37.2}, "Ollie":{d:-3.8,w:64}, "Clancy":{d:-3.1,w:65.1}, "Lola":{d:-3.1,w:39.3},
        "Glowy":{d:-2.9,w:34.4}
      },
      gemGrab: {
        "Juju":{d:3.6,w:52.7}, "Bo":{d:3.3,w:44.7}, "Tick":{d:2.8,w:51.2}, "Nani":{d:2.4,w:56.3},
        "Dynamike":{d:1.8,w:55.3}, "Jessie":{d:1.7,w:49.3}, "R-T":{d:1.7,w:49.8}, "Piper":{d:1.6,w:56.1},
        "Damian":{d:-4.2,w:34.9}, "Nori":{d:-3.8,w:38.5}, "Alli":{d:-3.6,w:43.7}, "Sirius":{d:-3.1,w:41.7},
        "Hank":{d:-3,w:44.5}, "Starr Nova":{d:-3,w:36.9}, "Kaze":{d:-2.8,w:45.3}, "Lola":{d:-2.6,w:48.7}
      },
      hotZone: {
        "Bo":{d:6.1,w:40.7}, "Mr. P":{d:4.4,w:56.5}, "Bolt":{d:3.5,w:35.3}, "8-Bit":{d:3,w:43},
        "R-T":{d:3,w:40.7}, "Clancy":{d:2.9,w:45.6}, "Tick":{d:2.9,w:43.1}, "Pierce":{d:2.8,w:45.4},
        "Kit":{d:-7.1,w:37.7}, "Hank":{d:-6,w:27.1}, "Buster":{d:-5.2,w:40.7}, "Wendy":{d:-5.2,w:18.4},
        "Poco":{d:-4.9,w:37.9}, "Sandy":{d:-4.3,w:37.7}, "Sprout":{d:-4.3,w:44.3}, "Kaze":{d:-4.2,w:38}
      },
      knockout: {
        "Dynamike":{d:2.9,w:61.7}, "Edgar":{d:2.8,w:63.4}, "Brock":{d:2,w:53.1}, "Shelly":{d:1.8,w:62.1},
        "El Primo":{d:1.7,w:62.5}, "Grom":{d:1.5,w:51.6}, "Crow":{d:1.3,w:64.7}, "Mico":{d:1.1,w:48.6},
        "Buster":{d:-5.9,w:40.3}, "Sirius":{d:-5.8,w:40.6}, "Wendy":{d:-4.4,w:26.8}, "Damian":{d:-4.2,w:43.5},
        "Poco":{d:-4.1,w:50.6}, "Bolt":{d:-3.5,w:34.7}, "Starr Nova":{d:-3.5,w:41.8},
        "Chester":{d:-3.3,w:48.4}
      }
    }
  },
  "Meg": {
    vs: {
      "Shelly":{d:3.4,w:64.3}, "Surge":{d:3.4,w:57.4}, "Brock":{d:3.3,w:56.4}, "Belle":{d:2.4,w:57.3},
      "Colt":{d:2.4,w:63.2}, "Max":{d:2.3,w:53.1}, "Gene":{d:2.2,w:58.2}, "Colette":{d:2.1,w:60},
      "Chuck":{d:-5.8,w:46.6}, "Sirius":{d:-5.1,w:43.5}, "Gigi":{d:-5,w:43.4}, "Jessie":{d:-4.9,w:46.9},
      "Juju":{d:-4.7,w:46}, "Rosa":{d:-4.2,w:50}, "Lola":{d:-3.8,w:50}, "Pam":{d:-3.8,w:51.7},
      "Crow":{w:61.1}, "Leon":{w:60.3}, "Wendy":{w:33.8}, "Bolt":{w:39.3}, "Damian":{w:41.5}, "Nori":{w:41.5},
      "Starr Nova":{w:42.2}
    },
    with: {
      "Rosa":{d:5}, "Ollie":{d:4}, "Trunk":{d:3.9}, "Frank":{d:2.9}, "Leon":{d:2.6}, "Kit":{d:-5},
      "Berry":{d:-4.8,w:46.6}, "Sirius":{d:-4.2}, "Surge":{d:-4.2}, "Nani":{d:-4.1}, "Wendy":{w:73.9},
      "Bolt":{w:66.8}, "Damian":{w:63.3}, "Nori":{w:62.9}, "Starr Nova":{w:62.8}, "Colt":{w:47.5},
      "Edgar":{w:47.5}, "Shelly":{w:47.5}, "Barley":{w:47.6}
    },
    modes: {
      airHockey: {
        "Berry":{d:4.6,w:70.6}, "Maisie":{d:4.5,w:60.4}, "Colette":{d:3.1,w:57.3}, "Jacky":{d:3.1,w:55.7},
        "Lou":{d:2.8,w:54}, "Barley":{d:2.7,w:68.2}, "Shelly":{d:2.7,w:60}, "8-Bit":{d:2.5,w:57.5},
        "Gigi":{d:-6.4,w:39.8}, "Glowy":{d:-5.8,w:42.9}, "Ollie":{d:-5.1,w:56.6}, "Mico":{d:-4.7,w:49},
        "Eve":{d:-4.4,w:63.7}, "Sirius":{d:-4.4,w:43.1}, "Nori":{d:-4.3,w:40.5}, "Bolt":{d:-3.2,w:35.2}
      },
      bounty: {
        "Damian":{d:5.6,w:46.1}, "Wendy":{d:4.4,w:29.7}, "Mr. P":{d:3.6,w:49.3}, "Otis":{d:3.6,w:55.2},
        "Lily":{d:3.4,w:49.8}, "Belle":{d:3.2,w:48.3}, "Charlie":{d:3.1,w:54.3}, "Pearl":{d:3.1,w:49.1},
        "Berry":{d:-6.7,w:49.7}, "Hank":{d:-6.1,w:37.2}, "Buster":{d:-6,w:45.9}, "Sam":{d:-4.9,w:44.1},
        "Draco":{d:-4.8,w:46.1}, "Janet":{d:-4.6,w:35.6}, "Larry & Lawrie":{d:-4.4,w:44.7},
        "Bo":{d:-4.3,w:37}
      },
      brawlBall: {
        "Brock":{d:3.8,w:61}, "Shelly":{d:3.8,w:66.7}, "Colette":{d:3.2,w:61.9}, "Surge":{d:2.9,w:59.2},
        "Crow":{d:2.5,w:64.8}, "Colt":{d:2.3,w:65.5}, "Gus":{d:1.7,w:49.3}, "Nani":{d:1.7,w:60.9},
        "Sirius":{d:-5.9,w:43.4}, "Gigi":{d:-5.8,w:42.4}, "Rosa":{d:-5.3,w:47.2},
        "Larry & Lawrie":{d:-4.6,w:45.2}, "Pam":{d:-4.4,w:48.5}, "Bolt":{d:-3.8,w:41.9},
        "Ash":{d:-3.7,w:38.3}, "Damian":{d:-3.7,w:39.3}
      },
      duels: {
        "Bolt":{d:3.8,w:56.1}, "Glowy":{d:3.4,w:47.1}, "Mina":{d:3.2,w:55.9}, "R-T":{d:3,w:44.6},
        "Mortis":{d:2.6,w:70.2}, "Nani":{d:2.5,w:56.1}, "Pierce":{d:2.4,w:52.9}, "Chester":{d:2.3,w:56.2},
        "Mr. P":{d:-5.6,w:58.2}, "Nita":{d:-5.5,w:55.9}, "Ziggy":{d:-4.2,w:53}, "Tara":{d:-4.1,w:51.1},
        "Ash":{d:-4,w:52.1}, "Larry & Lawrie":{d:-3.8,w:68.3}, "Sandy":{d:-3.8,w:65.4},
        "Jessie":{d:-3.6,w:61.1}
      },
      gemGrab: {
        "Otis":{d:4.6,w:59.7}, "Surge":{d:4.6,w:54}, "Belle":{d:3.8,w:65.2}, "Fang":{d:3.8,w:56.1},
        "Gene":{d:3.7,w:63.5}, "Maisie":{d:3.5,w:63.4}, "Cordelius":{d:3.4,w:59.3}, "Buzz":{d:2.9,w:58.2},
        "Hank":{d:-8.5,w:41.5}, "Barley":{d:-7.6,w:54.8}, "Ziggy":{d:-6.1,w:49.2}, "Juju":{d:-5.7,w:45.7},
        "Janet":{d:-5.6,w:40.8}, "Sam":{d:-5.6,w:47.5}, "Larry & Lawrie":{d:-5.4,w:51.3},
        "Moe":{d:-5.3,w:41.8}
      },
      hotZone: {
        "Crow":{d:4.1,w:61}, "Brock":{d:3.9,w:65}, "Grom":{d:3.5,w:68.2}, "Pearl":{d:3.5,w:63.5},
        "Otis":{d:3.1,w:64.6}, "Colette":{d:2.8,w:61.7}, "Max":{d:2.6,w:63.1}, "Surge":{d:2.5,w:53.3},
        "Sam":{d:-5.9,w:48.5}, "Juju":{d:-5.8,w:40.3}, "Kit":{d:-5.7,w:49.6}, "Gigi":{d:-5.6,w:49.1},
        "Hank":{d:-5.6,w:37.5}, "Ollie":{d:-5.6,w:61.1}, "Sirius":{d:-5.3,w:43.8}, "Rosa":{d:-5.2,w:52.4}
      },
      knockout: {
        "Shelly":{d:3.2,w:65.6}, "Colette":{d:2.7,w:63.7}, "Crow":{d:2.5,w:67.7}, "Brock":{d:2.3,w:55.5},
        "Colt":{d:2,w:66.3}, "Piper":{d:2,w:60.2}, "Frank":{d:1.9,w:54.9}, "Sam":{d:1.9,w:57.4},
        "Sirius":{d:-9.5,w:39}, "Clancy":{d:-6.9,w:56.9}, "Pam":{d:-5.7,w:50.7}, "Lola":{d:-5.5,w:49.1},
        "Larry & Lawrie":{d:-5.3,w:46.4}, "Moe":{d:-5.1,w:45.2}, "Tick":{d:-5.1,w:45.7},
        "Gigi":{d:-4.7,w:44.8}
      }
    }
  },
  "Pierce": {
    vs: {
      "Jacky":{d:5.5,w:59.2}, "Shelly":{d:4.2,w:66.1}, "Buzz":{d:3.9,w:59.9}, "El Primo":{d:3.8,w:59.8},
      "Trunk":{d:3.4,w:55.9}, "Nita":{d:3.3,w:56.8}, "Melodie":{d:3,w:55.7}, "Doug":{d:2.8,w:52.9},
      "Grom":{d:-4.7,w:51.2}, "Tick":{d:-4.5,w:47.9}, "Sirius":{d:-4.4,w:45.2}, "Buster":{d:-3.6,w:49.3},
      "Najia":{d:-3.5,w:48.6}, "Eve":{d:-2.9,w:52.1}, "Mr. P":{d:-2.7,w:52.2}, "Penny":{d:-2.7,w:51.8},
      "Colt":{w:63.2}, "Crow":{w:61.5}, "Rico":{w:61.3}, "Colette":{w:61.1}, "Wendy":{w:33.4}, "Bolt":{w:40},
      "Damian":{w:42.4}, "Starr Nova":{w:44.2}
    },
    with: {
      "Ollie":{d:5.5}, "Bonnie":{d:5.2}, "Rosa":{d:4.5}, "Shelly":{d:4.5}, "Leon":{d:4.2}, "Bo":{d:-5.7},
      "Amber":{d:-5.3}, "Sirius":{d:-5.2}, "Kit":{d:-5.1}, "Lumi":{d:-4.9}, "Wendy":{w:73.2}, "Bolt":{w:66.8},
      "Ash":{w:63}, "Damian":{w:62.1}, "Starr Nova":{w:61.7}, "Mortis":{w:48.8}, "Dynamike":{w:49.2},
      "Barley":{w:49.5}, "Colt":{w:50.1}, "Berry":{w:50.3}
    },
    modes: {
      bounty: {
        "El Primo":{d:7,w:74.1}, "Nita":{d:6,w:68.3}, "Jacky":{d:5.4,w:73.4}, "Hank":{d:5.2,w:56.5},
        "Bull":{d:5.1,w:67.1}, "Rosa":{d:5.1,w:65.9}, "Shelly":{d:4.7,w:69.5}, "Doug":{d:4.5,w:58.8},
        "Grom":{d:-4.2,w:48.5}, "Sirius":{d:-3.4,w:47}, "Ziggy":{d:-3.4,w:52.1}, "Tick":{d:-2.5,w:45.7},
        "Mico":{d:-2.4,w:47.1}, "Najia":{d:-2.4,w:47.4}, "Brock":{d:-1.9,w:47.2}, "Squeak":{d:-1.8,w:49.5}
      },
      brawlBall: {
        "Nani":{d:4.2,w:63.7}, "R-T":{d:4.2,w:51.5}, "Shelly":{d:3.6,w:66.7}, "Jacky":{d:3,w:51.1},
        "Pam":{d:2.8,w:56}, "Buzz":{d:2.5,w:57.1}, "Gene":{d:2.5,w:65.1}, "Mandy":{d:2.4,w:60.2},
        "Sirius":{d:-5.3,w:44.2}, "Ash":{d:-4.5,w:37.7}, "Tick":{d:-3.9,w:49.6}, "Ziggy":{d:-3.8,w:49.5},
        "Najia":{d:-3.5,w:53.2}, "Damian":{d:-3.3,w:39.9}, "Eve":{d:-3.3,w:53.5}, "Buster":{d:-2.9,w:46.7}
      },
      duels: {
        "Doug":{d:5.4,w:62.6}, "Nita":{d:5.2,w:66.1}, "Bo":{d:4.6,w:60.2}, "Jessie":{d:4.3,w:68.5},
        "Ash":{d:4.2,w:59.8}, "Clancy":{d:3.7,w:77}, "Cordelius":{d:3.4,w:67.2}, "Grom":{d:3.3,w:79.5},
        "Wendy":{d:-6.3,w:34.5}, "Najia":{d:-3.8,w:47}, "Lola":{d:-3.6,w:45}, "Ruffs":{d:-3.5,w:45.5},
        "Gigi":{d:-3.2,w:46.6}, "Janet":{d:-3.1,w:49.7}, "Moe":{d:-3,w:43.5}, "Kit":{d:-2.7,w:54.2}
      },
      gemGrab: {
        "Draco":{d:5.3,w:54.2}, "Doug":{d:4.1,w:52.6}, "Poco":{d:4,w:59.6}, "Lola":{d:3.8,w:58.1},
        "Jacky":{d:3.6,w:63.2}, "El Primo":{d:3.5,w:62.7}, "Gene":{d:3.4,w:63.9}, "Ollie":{d:3.3,w:64.5},
        "Sirius":{d:-5.1,w:42.8}, "Damian":{d:-3.7,w:38.3}, "Meeple":{d:-3.5,w:50.8}, "Najia":{d:-3,w:52.5},
        "Mico":{d:-2.9,w:46.4}, "Tick":{d:-2.9,w:48.5}, "Eve":{d:-2.6,w:50.6}, "Leon":{d:-2.5,w:55}
      },
      hotZone: {
        "Doug":{d:6.7,w:50.2}, "Jacky":{d:6.6,w:59.6}, "Trunk":{d:6.2,w:51.8}, "R-T":{d:6.1,w:51},
        "Sprout":{d:5.8,w:61.9}, "Buzz":{d:4.8,w:60.3}, "Shade":{d:4.8,w:51.4}, "Frank":{d:4.4,w:53.6},
        "Wendy":{d:-6,w:23.4}, "Buster":{d:-4.1,w:49.3}, "Gray":{d:-3.4,w:45.9}, "Mina":{d:-3.1,w:42.2},
        "Bolt":{d:-3,w:35.5}, "Damian":{d:-3,w:37.3}, "Max":{d:-2.8,w:54.6}, "Moe":{d:-2.7,w:47.5}
      },
      knockout: {
        "Nita":{d:5.7,w:67.8}, "Shelly":{d:5.5,w:68.8}, "El Primo":{d:4.8,w:68.6}, "Jacky":{d:4.7,w:71.4},
        "Pam":{d:4.7,w:62.1}, "Jessie":{d:4.6,w:60.9}, "Melodie":{d:4.4,w:60}, "Buzz":{d:4.2,w:63},
        "Sirius":{d:-5.8,w:43.7}, "Tick":{d:-4.5,w:47.3}, "Grom":{d:-3.3,w:50}, "Najia":{d:-3,w:47.4},
        "Buster":{d:-2.6,w:46.7}, "Ziggy":{d:-2.6,w:50.8}, "Lily":{d:-1.9,w:53.7}, "Brock":{d:-1.7,w:52.5}
      }
    }
  },
  "Colt": {
    vs: {
      "Rosa":{d:2.8,w:46}, "Doug":{d:2.4,w:40.6}, "Bull":{d:2.3,w:47.3}, "Chuck":{d:2.3,w:43.7},
      "Tick":{d:2.1,w:42.6}, "R-T":{d:1.6,w:37.3}, "Bibi":{d:1.5,w:44}, "Jessie":{d:1.5,w:42.3},
      "Angelo":{d:-3,w:38.8}, "Jae-Yong":{d:-2.8,w:39.7}, "Sprout":{d:-2.8,w:37.3}, "Gigi":{d:-2.7,w:35},
      "Glowy":{d:-2.4,w:36.6}, "Meeple":{d:-2.4,w:36.6}, "Meg":{d:-2.4,w:36.8}, "Gus":{d:-2.3,w:36},
      "Shelly":{w:49.7}, "Edgar":{w:49.5}, "Crow":{w:49.3}, "Dynamike":{w:49}, "Rico":{w:48.4},
      "Wendy":{w:21.4}, "Bolt":{w:30.5}, "Starr Nova":{w:32.1}, "Nori":{w:32.3}, "Damian":{w:32.6}
    },
    with: {
      "Glowy":{d:4.7}, "Angelo":{d:4.6}, "Bonnie":{d:4.6}, "Kaze":{d:4.3}, "Mico":{d:4.3},
      "Leon":{d:-3.6,w:33.4}, "Crow":{d:-3.4,w:33.8}, "Rico":{d:-3.4,w:33.9}, "Edgar":{d:-3.3,w:34.6},
      "Spike":{d:-3}, "Wendy":{w:66.1}, "Bolt":{w:60.1}, "Nori":{w:55.8}, "Starr Nova":{w:55.5},
      "Damian":{w:55.2}, "Shelly":{w:33.8}
    },
    modes: {
      airHockey: {
        "Chuck":{d:1.7,w:51.3}, "Kit":{d:1.6,w:48.4}, "Doug":{d:1.5,w:44}, "Shade":{d:1.5,w:42.3},
        "Sirius":{d:1.3,w:44.1}, "Frank":{d:1.2,w:49.9}, "Tick":{d:1.2,w:50.6}, "Willow":{d:1.2,w:43.7},
        "Ollie":{d:-3.9,w:53.2}, "Buster":{d:-3.7,w:51.1}, "Pearl":{d:-2.6,w:53.4}, "Glowy":{d:-2.5,w:41.4},
        "Jae-Yong":{d:-2.4,w:39.4}, "Eve":{d:-2.2,w:61.5}, "Belle":{d:-1.9,w:56}, "Gene":{d:-1.6,w:61.2}
      },
      basketBrawl: {
        "R-T":{d:4.8,w:40.6}, "Tick":{d:3.9,w:52.1}, "Damian":{d:3.8,w:33.6}, "Jae-Yong":{d:3.7,w:46.9},
        "Willow":{d:3.6,w:47.7}, "Bolt":{d:3.5,w:38.9}, "Rosa":{d:3.3,w:39}, "Doug":{d:2.9,w:40.4},
        "Eve":{d:-5.2,w:55.1}, "Charlie":{d:-5.1,w:44}, "Nani":{d:-4.5,w:39.4}, "Buster":{d:-4.1,w:41.6},
        "Leon":{d:-3.8,w:53.6}, "Meeple":{d:-3.7,w:43.7}, "Chuck":{d:-3.5,w:42.1}, "Bonnie":{d:-3,w:56.7}
      },
      bounty: {
        "Trunk":{d:5.1,w:62.2}, "Rosa":{d:5,w:58.5}, "Bull":{d:4.1,w:58.9}, "Jacky":{d:3.8,w:65.1},
        "Sam":{d:3.4,w:53}, "El Primo":{d:3.1,w:63.3}, "Nita":{d:3.1,w:58.2}, "Doug":{d:3,w:49.9},
        "Wendy":{d:-2.7,w:23.1}, "Sprout":{d:-2.3,w:40.8}, "Gigi":{d:-2,w:43}, "Angelo":{d:-1.6,w:42.8},
        "Sandy":{d:-1.6,w:52.3}, "Gene":{d:-1.4,w:46.9}, "Nori":{d:-1.4,w:41.2}, "Kaze":{d:-1.1,w:44.8}
      },
      brawlArena: {
        "R-T":{d:7.2,w:54}, "Bonnie":{d:6.8,w:56.5}, "Gus":{d:6.3,w:54}, "Sam":{d:5.9,w:56.5},
        "Lola":{d:5,w:48.8}, "Rosa":{d:4.9,w:54.8}, "Angelo":{d:4.8,w:53.4}, "Ruffs":{d:4.8,w:47.8},
        "Wendy":{d:-4,w:14.7}, "Damian":{d:-3.2,w:39}, "Byron":{d:-2.6,w:36}, "Pierce":{d:-2.3,w:42.5},
        "Mortis":{d:-2,w:46.5}, "Meg":{d:-1.7,w:38.4}, "Griff":{d:-1.3,w:38.3}, "Kit":{d:-1.1,w:37.1}
      },
      brawlBall: {
        "Tick":{d:4.7,w:44.6}, "Doug":{d:3.1,w:39.1}, "Sirius":{d:3,w:39.2}, "Bull":{d:2.5,w:47.1},
        "R-T":{d:2.3,w:36.4}, "Jacky":{d:1.9,w:36.7}, "Bibi":{d:1.7,w:43.9}, "Griff":{d:1.7,w:38.3},
        "Angelo":{d:-4.7,w:52.2}, "Gene":{d:-4.5,w:44.6}, "Belle":{d:-3.9,w:40}, "Glowy":{d:-3.8,w:36},
        "Jae-Yong":{d:-3.5,w:38}, "Lola":{d:-3.1,w:37.4}, "Pam":{d:-3.1,w:36.5}, "Bonnie":{d:-2.9,w:38.4}
      },
      brawlBall5V5: {
        "R-T":{d:3.3,w:51.2}, "Mico":{d:2.8,w:53.8}, "Nita":{d:2.7,w:51.9}, "Berry":{d:2.4,w:52},
        "Jacky":{d:2.2,w:48.8}, "Ollie":{d:2.2,w:46.6}, "Sam":{d:2.1,w:49.3}, "Bull":{d:1.9,w:50.9},
        "Wendy":{d:-8.3,w:15}, "Lumi":{d:-5.4,w:35.5}, "Meg":{d:-5,w:32.4}, "8-Bit":{d:-4.1,w:33.2},
        "Surge":{d:-3.7,w:37.4}, "Mina":{d:-3.2,w:41.9}, "Glowy":{d:-2.8,w:46.7}, "Max":{d:-2.8,w:30}
      },
      deathmatch5v5: {
        "Ollie":{d:6.1,w:54.5}, "Sam":{d:5.9,w:57}, "Bull":{d:4.1,w:53.7}, "Buster":{d:3.9,w:43.1},
        "Meeple":{d:3.9,w:53.2}, "Cordelius":{d:3.8,w:53.9}, "Jacky":{d:3.6,w:57.2}, "R-T":{d:3.5,w:50.5},
        "Bo":{d:-2,w:38.3}, "Grom":{d:-2,w:38.9}, "Meg":{d:-1.6,w:47.3}, "Spike":{d:-1.6,w:45.5},
        "Byron":{d:-1.5,w:43.8}, "Pierce":{d:-1.4,w:42.5}, "Piper":{d:-1.4,w:41.3}, "Squeak":{d:-1,w:41}
      },
      duels: {
        "Barley":{d:5.1,w:64.2}, "Nita":{d:4.9,w:54.5}, "Trunk":{d:3.7,w:45.2}, "Doug":{d:3.5,w:49.2},
        "Dynamike":{d:3.5,w:61.4}, "Bull":{d:3.4,w:50.9}, "El Primo":{d:3.4,w:54.5}, "Kenji":{d:3.4,w:60},
        "Wendy":{d:-7.7,w:22.6}, "Glowy":{d:-3.4,w:29}, "Moe":{d:-3.1,w:32.2}, "Pearl":{d:-2.7,w:33.8},
        "Draco":{d:-2.6,w:32.1}, "Meeple":{d:-2.5,w:33.6}, "Finx":{d:-2.3,w:32.6}, "Najia":{d:-2.3,w:37.1}
      },
      gemGrab: {
        "R-T":{d:4.6,w:46.3}, "Rosa":{d:3.8,w:48.6}, "Larry & Lawrie":{d:2.8,w:50.7},
        "El Primo":{d:2.6,w:52.4}, "Trunk":{d:2.4,w:45.5}, "Melodie":{d:2.3,w:51.4}, "Sam":{d:2.3,w:46.6},
        "Ziggy":{d:2.3,w:48.7}, "Buster":{d:-2.8,w:45.6}, "Glowy":{d:-2.8,w:40.5}, "Wendy":{d:-2.8,w:20},
        "Nori":{d:-2.5,w:33.6}, "Bonnie":{d:-2,w:53.1}, "Damian":{d:-2,w:31.2}, "Gigi":{d:-2,w:40.3},
        "Mortis":{d:-1.8,w:38.4}
      },
      heist: {
        "Doug":{d:3.1,w:47.6}, "Juju":{d:3.1,w:47.1}, "Mandy":{d:3.1,w:44.8}, "Janet":{d:2.8,w:55.9},
        "Gus":{d:2.4,w:59.5}, "R-T":{d:2.4,w:40}, "Najia":{d:2.2,w:55.9}, "Trunk":{d:2.2,w:45.8},
        "Wendy":{d:-3.9,w:41.3}, "Hank":{d:-3.8,w:34.9}, "Sandy":{d:-3.5,w:73.5}, "Moe":{d:-2.9,w:44.4},
        "Charlie":{d:-2.7,w:55.7}, "Mina":{d:-2.3,w:46.5}, "Starr Nova":{d:-2.2,w:36.2},
        "Meg":{d:-2.1,w:51.6}
      },
      hotZone: {
        "R-T":{d:6.7,w:39.4}, "Rosa":{d:5.3,w:47}, "Trunk":{d:4.9,w:38.3}, "Ruffs":{d:3.5,w:40.8},
        "Gus":{d:3.3,w:44.4}, "Maisie":{d:2.8,w:49.5}, "Charlie":{d:2.5,w:50.7}, "El Primo":{d:2.4,w:45.3},
        "Wendy":{d:-5.7,w:14.1}, "Emz":{d:-3,w:31.9}, "Mortis":{d:-2.8,w:36.2}, "Chester":{d:-2.5,w:33.4},
        "Spike":{d:-2.3,w:38}, "Finx":{d:-2.2,w:31.1}, "Meg":{d:-2.2,w:32.3}, "Jae-Yong":{d:-2.1,w:45}
      },
      knockout: {
        "Rosa":{d:5.2,w:52.5}, "Doug":{d:3.5,w:40.6}, "Jacky":{d:3.1,w:54.8}, "Ash":{d:2.6,w:42.1},
        "Bull":{d:2.6,w:51.3}, "Frank":{d:2.2,w:40.7}, "Sirius":{d:2.1,w:36.4}, "Clancy":{d:1.6,w:51},
        "Gigi":{d:-3.6,w:31.6}, "Angelo":{d:-2.7,w:33.6}, "Kaze":{d:-2.2,w:36.7}, "Sprout":{d:-2.2,w:31.5},
        "Bo":{d:-2,w:35.5}, "Meg":{d:-2,w:33.7}, "Amber":{d:-1.8,w:35.8}, "Tara":{d:-1.7,w:38.6}
      },
      knockout5V5: {
        "Trunk":{d:5,w:52.2}, "Ollie":{d:3.6,w:54.8}, "Rosa":{d:3.6,w:42.3}, "Bull":{d:2.8,w:48},
        "Gigi":{d:2.8,w:48.4}, "Otis":{d:2.8,w:48.4}, "Sam":{d:2.4,w:48.1}, "Buster":{d:2,w:50.7},
        "Clancy":{d:-5,w:45.2}, "Chester":{d:-2.6,w:43.6}, "Moe":{d:-2.6,w:38.5}, "Sprout":{d:-2.5,w:38.7},
        "Charlie":{d:-2,w:49.9}, "Maisie":{d:-1.9,w:50.8}, "Wendy":{d:-1.9,w:32.4}, "Stu":{d:-1.8,w:43.8}
      }
    }
  },
  "Meeple": {
    vs: {
      "Stu":{d:3.8,w:54.8}, "Lumi":{d:3.6,w:50.2}, "Nori":{d:2.9,w:46.9}, "Griff":{d:2.7,w:51.9},
      "Bea":{d:2.6,w:58}, "Colt":{d:2.4,w:63.4}, "Shade":{d:2.4,w:47.8}, "Colette":{d:2.2,w:60.2},
      "Sirius":{d:-6.4,w:42.3}, "Grom":{d:-5,w:50}, "Pam":{d:-4.9,w:50.7}, "Mr. P":{d:-4.8,w:49.1},
      "Ash":{d:-4.6,w:41.1}, "Ollie":{d:-4.5,w:51.8}, "Eve":{d:-4.1,w:49.9}, "Penny":{d:-4.1,w:49.5},
      "Shelly":{w:62.3}, "Crow":{w:61.6}, "Rico":{w:60.6}, "Wendy":{w:28.5}, "Bolt":{w:38.5},
      "Damian":{w:40.2}
    },
    with: {
      "Leon":{d:6.1}, "Crow":{d:5.5}, "Rico":{d:5}, "Edgar":{d:4.5}, "Spike":{d:4.1}, "Rosa":{d:-14.4,w:37.8},
      "Chuck":{d:-12.4,w:41.7}, "Sam":{d:-10.7}, "Jacky":{d:-10,w:44}, "Hank":{d:-9.2}, "Wendy":{w:73.3},
      "Bolt":{w:62.1}, "Nori":{w:61.9}, "Starr Nova":{w:60.8}, "Damian":{w:60}, "Barley":{w:41.8},
      "Pam":{w:44.5}
    },
    modes: {
      bounty: {
        "Nori":{d:4.8,w:53.8}, "Moe":{d:4.1,w:55.8}, "Amber":{d:3.9,w:55.4}, "Kaze":{d:3,w:55.4},
        "Shade":{d:3,w:53.1}, "Chester":{d:2.6,w:56.9}, "Emz":{d:2.6,w:58.3}, "Griff":{d:2.6,w:55.4},
        "Ollie":{d:-9.9,w:58}, "Eve":{d:-4.7,w:47.6}, "Pam":{d:-4.2,w:58}, "Grom":{d:-3.6,w:48.2},
        "Buster":{d:-3.4,w:55.6}, "El Primo":{d:-3.4,w:62.9}, "Mr. P":{d:-3.4,w:49.4},
        "Sirius":{d:-3.3,w:46.3}
      },
      brawlBall: {
        "Lumi":{d:3.5,w:47.9}, "Bea":{d:3.3,w:55.5}, "Griff":{d:3.2,w:52.1}, "Lou":{d:2.9,w:48.3},
        "Stu":{d:2.8,w:53.3}, "Colette":{d:2.7,w:60.5}, "Amber":{d:2.6,w:44.9}, "Piper":{d:2.5,w:62.9},
        "Sirius":{d:-8,w:40.4}, "Ash":{d:-6.1,w:35}, "Trunk":{d:-5.1,w:43.2}, "Mr. P":{d:-4.7,w:51.6},
        "Damian":{d:-4.6,w:37.5}, "Doug":{d:-4.4,w:43.8}, "Wendy":{d:-4.3,w:27.8}, "Juju":{d:-4.2,w:48.1}
      },
      gemGrab: {
        "Clancy":{d:6.1,w:51.3}, "Lumi":{d:5.8,w:50.5}, "Pierce":{d:3.5,w:49.2}, "Chuck":{d:3.2,w:51.1},
        "8-Bit":{d:3,w:49.6}, "Lou":{d:3,w:54.5}, "Piper":{d:2.6,w:55.7}, "Belle":{d:2.4,w:60.2},
        "Sirius":{d:-6.1,w:37.4}, "Willow":{d:-4.4,w:50.9}, "Wendy":{d:-4.2,w:22.4}, "Mico":{d:-3.9,w:41.1},
        "Kit":{d:-3.5,w:42.9}, "Leon":{d:-3.3,w:49.9}, "Buzz":{d:-3.1,w:48.5}, "Trunk":{d:-3.1,w:45.1}
      },
      knockout: {
        "Lumi":{d:4.7,w:59.1}, "Meg":{d:4.5,w:55.5}, "Amber":{d:4.3,w:57.4}, "Gale":{d:4.2,w:60.5},
        "Jessie":{d:4,w:60.3}, "Lou":{d:3.7,w:56.4}, "Stu":{d:3.3,w:57.8}, "Chester":{d:3.1,w:58},
        "Sirius":{d:-8,w:41.5}, "Wendy":{d:-6.1,w:27.9}, "Ash":{d:-5.8,w:49.3}, "Ollie":{d:-5.4,w:49},
        "Ziggy":{d:-4.8,w:48.6}, "Grom":{d:-4.3,w:49}, "Frank":{d:-3.4,w:50.6}, "Tick":{d:-2.9,w:48.9}
      }
    }
  },
  "Gene": {
    vs: {
      "Bea":{d:4.9,w:54.2}, "Gus":{d:4.9,w:48}, "Piper":{d:4.7,w:54.4}, "Maisie":{d:3.2,w:50.4},
      "Byron":{d:2.8,w:52.3}, "Gray":{d:2.8,w:45.7}, "R-T":{d:2.6,w:43}, "Leon":{d:2.4,w:56},
      "Chuck":{d:-10.8,w:35.5}, "Jessie":{d:-7.5,w:38.2}, "Sirius":{d:-7,w:35.7}, "Frank":{d:-5.5,w:43},
      "Damian":{d:-5.1,w:32.3}, "Nita":{d:-4.8,w:41.7}, "Penny":{d:-4.8,w:42.7}, "Mortis":{d:-4.5,w:44.8},
      "Colt":{w:57.1}, "Crow":{w:55.3}, "Rico":{w:55.1}, "Wendy":{w:26}, "Bolt":{w:33.9}
    },
    with: {
      "Brock":{d:5.8}, "Rico":{d:5.3}, "Piper":{d:5.1}, "Angelo":{d:4.7}, "Edgar":{d:4.6},
      "Clancy":{d:-15.6,w:32.5}, "Ollie":{d:-14.7,w:30.3}, "Jacky":{d:-13.9}, "Berry":{d:-13.2,w:32.2},
      "Rosa":{d:-12.6,w:33.7}, "Wendy":{w:71}, "Bolt":{w:61.8}, "Nori":{w:57.2}, "Starr Nova":{w:56.2},
      "Gray":{w:54.7}, "Barley":{w:34.1}
    },
    modes: {
      bounty: {
        "Carl":{d:3.1,w:48.8}, "Bull":{d:2.7,w:59.1}, "Jacky":{d:2.7,w:65.6}, "Lily":{d:2.5,w:51.2},
        "Bibi":{d:2.4,w:50.6}, "Otis":{d:2.4,w:56.3}, "Surge":{d:2.2,w:49}, "Buster":{d:2,w:56.2},
        "Clancy":{d:-5,w:54}, "Sirius":{d:-4.8,w:39.9}, "Frank":{d:-4,w:46.3}, "Juju":{d:-4,w:41.5},
        "Gigi":{d:-3.6,w:43.1}, "Doug":{d:-3.2,w:45.3}, "Finx":{d:-3.2,w:46.8},
        "Larry & Lawrie":{d:-3.2,w:48.1}
      },
      brawlBall: {
        "Janet":{d:7.1,w:50.2}, "Gus":{d:6.3,w:41.7}, "Rico":{d:5.2,w:53.6}, "Crow":{d:5,w:55},
        "Piper":{d:4.6,w:53.4}, "Colt":{d:4.5,w:55.4}, "Belle":{d:4.4,w:49.3}, "Barley":{d:3.7,w:47.4},
        "Sirius":{d:-11.2,w:25.7}, "Wendy":{d:-10.3,w:12.6}, "Damian":{d:-9.8,w:21.5}, "Doug":{d:-8.7,w:28.1},
        "Chester":{d:-6.9,w:31.2}, "Mortis":{d:-6.8,w:39}, "Nori":{d:-6.8,w:25.8},
        "Starr Nova":{d:-6.5,w:25.3}
      },
      gemGrab: {
        "Ollie":{d:6.4,w:57.2}, "Clancy":{d:6.2,w:45.3}, "Melodie":{d:6.2,w:54.1}, "Carl":{d:4.8,w:46.4},
        "Lou":{d:3.9,w:49.2}, "Bea":{d:3.3,w:52.9}, "Rosa":{d:2.9,w:46.5}, "Buster":{d:2.7,w:50},
        "Sirius":{d:-6.7,w:30.8}, "Doug":{d:-4.7,w:33.4}, "Willow":{d:-4.3,w:44.7}, "Nori":{d:-4.2,w:30.8},
        "Najia":{d:-4.1,w:40.8}, "Alli":{d:-4,w:35.9}, "Ziggy":{d:-4,w:41.3}, "Meg":{d:-3.7,w:36.5}
      },
      knockout: {
        "Stu":{d:2.5,w:55.2}, "Crow":{d:2,w:66.6}, "Gale":{d:2,w:56.6}, "Melodie":{d:1.9,w:55.9},
        "Moe":{d:1.9,w:51.5}, "Shelly":{d:1.8,w:63.4}, "Bea":{d:1.7,w:58.2}, "Maisie":{d:1.6,w:54.4},
        "Sirius":{d:-7.5,w:40.2}, "Ash":{d:-5.5,w:47.8}, "Damian":{d:-5.2,w:43.9}, "Wendy":{d:-4.9,w:27.6},
        "Glowy":{d:-4.2,w:44.9}, "Gigi":{d:-4,w:44.8}, "Eve":{d:-3.8,w:43.8}, "Ollie":{d:-3.7,w:48.9}
      }
    }
  },
  "Spike": {
    vs: {
      "Rosa":{d:3.4,w:50.6}, "Trunk":{d:3.3,w:47.9}, "Jacky":{d:2.8,w:48.4}, "R-T":{d:2.6,w:42.1},
      "Bull":{d:2.3,w:51.4}, "Charlie":{d:1.9,w:47.6}, "Doug":{d:1.9,w:44}, "Lou":{d:1.8,w:45},
      "Wendy":{d:-3.4,w:23.1}, "Mico":{d:-3.1,w:38.7}, "Sprout":{d:-3.1,w:41}, "Grom":{d:-2.3,w:45.6},
      "Brock":{d:-2,w:44.1}, "Dynamike":{d:-2,w:50.1}, "Mortis":{d:-2,w:46.3}, "Chuck":{d:-1.9,w:43.5},
      "Shelly":{w:54.8}, "Colt":{w:54}, "Rico":{w:53}, "Crow":{w:52.7}, "Leon":{w:52.7}, "Bolt":{w:32.7},
      "Starr Nova":{w:37}, "Damian":{w:37.1}, "Nori":{w:37.4}
    },
    with: {
      "Sam":{d:8.4}, "Juju":{d:7.2}, "Trunk":{d:6.5}, "Lola":{d:6.4}, "R-T":{d:6.3,w:58.5},
      "Rico":{d:-4.8,w:36}, "Leon":{d:-3.8,w:36.8}, "Colt":{d:-3,w:36.5}, "Dynamike":{d:-3,w:38.2},
      "Crow":{d:-2.7,w:38}, "Wendy":{w:69.6}, "Bolt":{w:64}, "Damian":{w:59.5}, "Starr Nova":{w:58.3}
    },
    modes: {
      airHockey: {
        "Ash":{d:4.3,w:52.3}, "Rosa":{d:3.8,w:62.1}, "Clancy":{d:3.5,w:46.3}, "Pearl":{d:3.4,w:57.3},
        "Charlie":{d:3.3,w:53.4}, "Eve":{d:3,w:64.8}, "Ollie":{d:2.7,w:57.7}, "Mr. P":{d:2.5,w:65.7},
        "Mico":{d:-6.1,w:40.7}, "Ziggy":{d:-4.8,w:37.3}, "Nani":{d:-4.7,w:41}, "Janet":{d:-3.8,w:43.2},
        "Draco":{d:-3.6,w:36.3}, "Sprout":{d:-3.6,w:40.5}, "Gene":{d:-3.4,w:57.4}, "Kaze":{d:-3,w:37.5}
      },
      bounty: {
        "Trunk":{d:7.3,w:67.4}, "Lola":{d:6,w:59.1}, "Rosa":{d:6,w:62.7}, "Draco":{d:5.9,w:60.6},
        "Doug":{d:5.5,w:55.6}, "Hank":{d:5.5,w:52.5}, "Amber":{d:5.1,w:53.3}, "Finx":{d:5,w:56.6},
        "Grom":{d:-4.7,w:43.8}, "Wendy":{d:-3.9,w:24.4}, "Tick":{d:-3.7,w:40.3}, "Sprout":{d:-3.2,w:43},
        "Dynamike":{d:-2.8,w:49.3}, "Piper":{d:-2.5,w:44.6}, "Brock":{d:-2.4,w:42.5},
        "Squeak":{d:-2.3,w:44.7}
      },
      brawlBall: {
        "Chuck":{d:4,w:55.5}, "R-T":{d:2.9,w:41.4}, "Gus":{d:2.2,w:41.2}, "Trunk":{d:2.1,w:42.7},
        "Jacky":{d:2,w:41.1}, "Bull":{d:1.9,w:51.3}, "Fang":{d:1.9,w:51.3}, "Amber":{d:1.5,w:36.4},
        "Wendy":{d:-3.3,w:22.4}, "Sprout":{d:-3.1,w:43.8}, "Ziggy":{d:-2.9,w:41.5}, "Gigi":{d:-2.7,w:37},
        "Larry & Lawrie":{d:-2.7,w:38.3}, "Mico":{d:-2.7,w:46.5}, "Mortis":{d:-2.6,w:47.1},
        "Kaze":{d:-2.5,w:40.6}
      },
      brawlBall5V5: {
        "Angelo":{d:7.5,w:65.7}, "Gus":{d:5.2,w:52.9}, "Sam":{d:5,w:55.3}, "Finx":{d:4.7,w:54.5},
        "Meeple":{d:4.3,w:56.7}, "Jacky":{d:4.2,w:53.9}, "Nita":{d:4.1,w:56.4}, "Buster":{d:3.7,w:48.2},
        "Bolt":{d:-4.6,w:28.1}, "Wendy":{d:-3.9,w:21.7}, "Damian":{d:-2.5,w:36.2}, "Mortis":{d:-2.5,w:47.1},
        "Cordelius":{d:-2.2,w:53.2}, "Pearl":{d:-2.1,w:47.3}, "Lily":{d:-2,w:51.1}, "Edgar":{d:-1.7,w:51.4}
      },
      duels: {
        "Jessie":{d:3.6,w:61.2}, "Trunk":{d:3,w:49}, "Nita":{d:2.8,w:56.9}, "Shelly":{d:2.5,w:53.6},
        "El Primo":{d:2.4,w:57.9}, "Fang":{d:1.5,w:58.3}, "Leon":{d:1.5,w:57.1}, "Bull":{d:1.4,w:53.3},
        "Wendy":{d:-8.5,w:25.7}, "Sprout":{d:-7.2,w:37.3}, "Glowy":{d:-3.7,w:32.9}, "Ollie":{d:-3.7,w:63.4},
        "Buster":{d:-3.6,w:56.9}, "Najia":{d:-3.5,w:40.3}, "Sam":{d:-3.4,w:42.1}, "Willow":{d:-3.3,w:46.6}
      },
      gemGrab: {
        "Trunk":{d:6.5,w:55.2}, "R-T":{d:5.4,w:52.8}, "Hank":{d:5.2,w:52}, "Lumi":{d:4.4,w:49.7},
        "Juju":{d:4.2,w:52.4}, "Angelo":{d:3.9,w:58.5}, "Willow":{d:3.9,w:59.8}, "Gus":{d:3.8,w:52.2},
        "Wendy":{d:-5.3,w:21.8}, "Bonnie":{d:-2.5,w:58}, "Mortis":{d:-2.5,w:43.2}, "Tick":{d:-2.5,w:45.2},
        "Sprout":{d:-2.3,w:49.2}, "Bolt":{d:-2.2,w:29.7}, "Dynamike":{d:-2.2,w:50.6}, "Penny":{d:-2.1,w:47.4}
      },
      hotZone: {
        "R-T":{d:6.7,w:48.5}, "Bonnie":{d:5.8,w:68.1}, "Gus":{d:5.8,w:56.6}, "Rosa":{d:5.8,w:57.2},
        "Ollie":{d:5.6,w:66.6}, "Lola":{d:5.3,w:56.6}, "Angelo":{d:4.8,w:66.7}, "Melodie":{d:4.8,w:58.1},
        "Wendy":{d:-8.2,w:18.6}, "Mico":{d:-4,w:41.9}, "Tick":{d:-3.8,w:40.7}, "Penny":{d:-3,w:42.3},
        "Mortis":{d:-2.4,w:46.2}, "Bo":{d:-2.3,w:36.3}, "Brock":{d:-2.2,w:53}, "Dynamike":{d:-2.1,w:50.6}
      },
      knockout: {
        "Rosa":{d:7.5,w:59.8}, "Ash":{d:5.5,w:49.9}, "Bull":{d:5.5,w:59.3}, "Jacky":{d:5.4,w:62.1},
        "Hank":{d:4.8,w:45.5}, "Chuck":{d:4.2,w:54}, "Doug":{d:4,w:46}, "Damian":{d:3.9,w:44.2},
        "Grom":{d:-3.6,w:39.1}, "Sprout":{d:-3.3,w:35.1}, "Gigi":{d:-2.4,w:37.6}, "Angelo":{d:-2.3,w:38.8},
        "Mico":{d:-2.3,w:37.8}, "Najia":{d:-2,w:37.9}, "Brock":{d:-1.9,w:41.7}, "Dynamike":{d:-1.9,w:49.5}
      },
      knockout5V5: {
        "Buster":{d:5,w:54.6}, "Lumi":{d:4.9,w:39.9}, "Otis":{d:4.7,w:51.2}, "Lou":{d:4.4,w:51.1},
        "Larry & Lawrie":{d:4.2,w:56.8}, "Rosa":{d:4,w:43.5}, "Berry":{d:3.4,w:53.6},
        "Melodie":{d:3.4,w:58.4}, "Wendy":{d:-6.1,w:28.9}, "Mico":{d:-4.6,w:39.2}, "Sprout":{d:-3.7,w:38.3},
        "Damian":{d:-3.4,w:39.3}, "Alli":{d:-3.1,w:43.9}, "Bolt":{d:-2.9,w:43.8}, "Draco":{d:-2.8,w:38.4},
        "Najia":{d:-2.3,w:44.3}
      }
    }
  },
  "Penny": {
    vs: {
      "Charlie":{d:7.2,w:56.4}, "Gus":{d:5.8,w:51.5}, "Lou":{d:5.8,w:52.5}, "Maisie":{d:5.7,w:55.4},
      "Ollie":{d:5.4,w:58.1}, "Otis":{d:5.2,w:52.9}, "Bea":{d:5.1,w:57}, "R-T":{d:5.1,w:48},
      "Mico":{d:-6.5,w:38.7}, "Bolt":{d:-5,w:31.3}, "Nori":{d:-4.9,w:35.6}, "Bibi":{d:-4.4,w:45.6},
      "Wendy":{d:-3.9,w:25.5}, "Mortis":{d:-3.8,w:48.1}, "Kaze":{d:-3.7,w:43.2}, "Edgar":{d:-3.5,w:52.2},
      "Shelly":{w:59}, "Leon":{w:57.9}, "Colt":{w:57.5}, "Gene":{w:57.3}, "Starr Nova":{w:38.5}
    },
    with: {
      "Edgar":{d:4.3}, "Wendy":{d:3.6,w:73.4}, "Bibi":{d:3.4}, "Piper":{d:3.1}, "Fang":{d:2.8},
      "Rosa":{d:-8.7,w:40.5}, "Otis":{d:-8.1,w:43.9}, "Pearl":{d:-8}, "Ollie":{d:-7.1,w:40.8},
      "Gene":{d:-6.4,w:40.9}, "Bolt":{w:63.4}, "Nori":{w:61.4}, "Starr Nova":{w:58.8}, "Damian":{w:57.9},
      "Barley":{w:43.9}
    },
    modes: {
      bounty: {
        "8-Bit":{d:4.7,w:53.5}, "Eve":{d:4.5,w:54.6}, "Lola":{d:4.3,w:58.6}, "Pam":{d:3.6,w:63.8},
        "Ash":{d:3.4,w:58.7}, "Frank":{d:3.2,w:56.3}, "Charlie":{d:3,w:59.2}, "Juju":{d:2.9,w:51.1},
        "Ziggy":{d:-4.9,w:47.6}, "Bolt":{d:-4.2,w:29}, "Bibi":{d:-3.2,w:47.8}, "Barley":{d:-3.1,w:57.8},
        "Kenji":{d:-3.1,w:45.6}, "Sam":{d:-2.4,w:51.6}, "Berry":{d:-2.3,w:58.9}, "Buster":{d:-2.3,w:54.6}
      },
      brawlArena: {
        "Gus":{d:6,w:62.7}, "Jae-Yong":{d:5.7,w:66.9}, "Eve":{d:5.5,w:66.4}, "Charlie":{d:4.8,w:64.9},
        "Pierce":{d:4.1,w:57.8}, "Sirius":{d:4.1,w:55.8}, "Pam":{d:4,w:57.5}, "Angelo":{d:3.6,w:61.2},
        "Bolt":{d:-6.7,w:31.7}, "Gigi":{d:-5.2,w:40.2}, "Wendy":{d:-5.2,w:19.5}, "Mortis":{d:-4.5,w:53},
        "Nori":{d:-4.4,w:35.1}, "Alli":{d:-3.8,w:52}, "Kit":{d:-3.5,w:43.6}, "Lily":{d:-3.4,w:47.4}
      },
      brawlBall: {
        "Gus":{d:7.3,w:49.2}, "8-Bit":{d:6.2,w:50.4}, "Charlie":{d:5.6,w:48.6}, "Bea":{d:5.4,w:52.8},
        "Lola":{d:5,w:53.1}, "Lou":{d:4.9,w:45.4}, "Tara":{d:3.8,w:47.5}, "Crow":{d:3.7,w:60.5},
        "Grom":{d:-6.4,w:45.5}, "Damian":{d:-5.9,w:31.6}, "Squeak":{d:-5.2,w:43.6}, "Wendy":{d:-4.8,w:23.3},
        "Nori":{d:-4.7,w:34.2}, "Doug":{d:-4.6,w:38.8}, "Starr Nova":{d:-4.6,w:33.3}, "Bolt":{d:-4.3,w:35.8}
      },
      brawlBall5V5: {
        "Lumi":{d:9.3,w:54.1}, "8-Bit":{d:8.7,w:49.8}, "Charlie":{d:7,w:57}, "Lola":{d:6.3,w:59},
        "Shade":{d:6.2,w:54.1}, "Otis":{d:6.1,w:51.2}, "Gus":{d:5.2,w:53.8}, "Meg":{d:4.6,w:45.9},
        "Bolt":{d:-5.1,w:28.4}, "Edgar":{d:-3.9,w:50.1}, "Bibi":{d:-3.7,w:43.3}, "Gray":{d:-3.6,w:46.8},
        "Mortis":{d:-3.6,w:47}, "Cordelius":{d:-3.5,w:52.7}, "Kenji":{d:-3.3,w:40.6}, "Buzz":{d:-2.9,w:53.5}
      },
      deathmatch5v5: {
        "8-Bit":{d:4.5,w:48.2}, "Frank":{d:4.5,w:64.3}, "Meg":{d:3.6,w:60.7}, "Nita":{d:3.4,w:64.7},
        "Juju":{d:3.2,w:61}, "Pam":{d:2.9,w:60.4}, "R-T":{d:2.9,w:58.1}, "Jae-Yong":{d:2.8,w:60.3},
        "Bolt":{d:-4.2,w:33.7}, "Gigi":{d:-3.5,w:49.9}, "Ollie":{d:-3.5,w:53}, "Nori":{d:-2.7,w:45.4},
        "Ziggy":{d:-2.3,w:49.9}, "Alli":{d:-2.1,w:56.1}, "Mortis":{d:-2.1,w:50.5}, "Mico":{d:-2,w:52.8}
      },
      gemGrab: {
        "8-Bit":{d:4.5,w:52.1}, "Jessie":{d:3.4,w:50.6}, "Sirius":{d:3.2,w:47.7}, "Meg":{d:3,w:50.3},
        "Pam":{d:2.6,w:54.9}, "Tick":{d:2.5,w:50.6}, "Tara":{d:2.3,w:47.6}, "Clancy":{d:2.2,w:48.3},
        "Bolt":{d:-6.6,w:25.7}, "Ziggy":{d:-6.1,w:46.5}, "Grom":{d:-5.6,w:54.4}, "Nori":{d:-5.2,w:36.7},
        "Bonnie":{d:-4.5,w:56.4}, "Berry":{d:-4,w:53.1}, "Barley":{d:-3.5,w:56.4}, "Doug":{d:-3.5,w:41.7}
      },
      heist: {
        "Otis":{d:5.6,w:63.5}, "Ollie":{d:5.4,w:90.4}, "Charlie":{d:4.6,w:64.8}, "Gus":{d:4,w:62.9},
        "R-T":{d:4,w:43.3}, "Ash":{d:3.9,w:64.5}, "Bea":{d:3.9,w:71.5}, "Leon":{d:3.7,w:68.1},
        "Mico":{d:-6.3,w:31.3}, "Kaze":{d:-5.6,w:33.5}, "Nori":{d:-5.5,w:23.9}, "Gigi":{d:-4.4,w:33.6},
        "Mortis":{d:-4.4,w:55.7}, "Kit":{d:-4.3,w:47.7}, "Bolt":{d:-3.9,w:39.5}, "Doug":{d:-3.8,w:42.5}
      },
      hotZone: {
        "Sirius":{d:5.9,w:53.6}, "8-Bit":{d:3.9,w:52.9}, "Jessie":{d:3.7,w:50.3}, "Tara":{d:3.4,w:54.7},
        "Rico":{d:3.2,w:65.4}, "Spike":{d:3,w:57.7}, "Charlie":{d:2.8,w:65.4}, "Nani":{d:2.8,w:63.5},
        "Wendy":{d:-10.2,w:20.6}, "Bolt":{d:-7.1,w:33.1}, "Mina":{d:-5.1,w:41.8}, "Gigi":{d:-4.4,w:48.9},
        "Ziggy":{d:-3.9,w:50.5}, "Draco":{d:-3.8,w:40.9}, "Starr Nova":{d:-3.5,w:38.4},
        "Mico":{d:-3.3,w:47.4}
      },
      knockout: {
        "Charlie":{d:5.9,w:53.8}, "Lola":{d:4.9,w:57.6}, "8-Bit":{d:4.1,w:54}, "Pam":{d:4.1,w:58.6},
        "Meg":{d:3,w:51.1}, "Eve":{d:2.9,w:49.3}, "Ruffs":{d:2.6,w:50.2}, "Frank":{d:2.5,w:53.5},
        "Bolt":{d:-5.8,w:32.5}, "Ziggy":{d:-4.8,w:45.7}, "Grom":{d:-4.7,w:45.7}, "Jacky":{d:-4.5,w:59.5},
        "Najia":{d:-3.8,w:43.6}, "Squeak":{d:-3.7,w:45.4}, "Mico":{d:-3.1,w:44.6}, "Barley":{d:-3,w:53.3}
      },
      knockout5V5: {
        "Gray":{d:6.2,w:45.1}, "Otis":{d:4.9,w:56.9}, "Lou":{d:4.1,w:56.4}, "Max":{d:3.4,w:59.3},
        "Melodie":{d:3.4,w:63.7}, "Frank":{d:3.2,w:56.7}, "Tara":{d:3.2,w:60.7}, "Belle":{d:3.1,w:52},
        "Wendy":{d:-6.5,w:33.7}, "Bolt":{d:-5.6,w:46.7}, "Meeple":{d:-4.5,w:46.3}, "Damian":{d:-3.5,w:44.7},
        "Sam":{d:-3.1,w:48.9}, "Draco":{d:-3,w:43.8}, "Nori":{d:-3,w:46.3}, "Bibi":{d:-2.9,w:51.9}
      }
    }
  },
  "Kenji": {
    vs: {
      "Grom":{d:5.8,w:58.6}, "Ziggy":{d:5.2,w:56}, "Mr. P":{d:4.7,w:56.3}, "Sprout":{d:4.4,w:53.2},
      "Squeak":{d:4.2,w:55.2}, "Mico":{d:4,w:50.4}, "Brock":{d:3.5,w:54.4}, "Willow":{d:3.5,w:53.1},
      "Jacky":{d:-4.4,w:46}, "R-T":{d:-4.4,w:39.7}, "Doug":{d:-4.1,w:42.7}, "Trunk":{d:-3.8,w:45.5},
      "Nita":{d:-3,w:47.3}, "Rosa":{d:-2.9,w:49}, "Bull":{d:-2.8,w:51}, "Buzz":{d:-2.8,w:50},
      "Dynamike":{w:59.8}, "Barley":{w:58}, "Colt":{w:58}, "Leon":{w:57.7}, "Wendy":{w:30.6}, "Bolt":{w:35.7},
      "Damian":{w:38.7}, "Starr Nova":{w:40}
    },
    with: {
      "Pam":{d:7.3}, "Rosa":{d:6.5}, "Jacky":{d:6.4}, "Barley":{d:6.3}, "Lola":{d:5.3},
      "Belle":{d:-4.1,w:46.2}, "Edgar":{d:-3.8,w:42.5}, "Nori":{d:-3.8}, "8-Bit":{d:-3}, "Kaze":{d:-3},
      "Wendy":{w:69}, "Bolt":{w:63.7}, "Hank":{w:61.4}, "R-T":{w:60.7}, "Damian":{w:60.3}, "Shelly":{w:43.5},
      "Colt":{w:44.5}, "Leon":{w:46.3}
    },
    modes: {
      airHockey: {
        "Barley":{d:3.9,w:66.3}, "Larry & Lawrie":{d:3.8,w:65}, "Grom":{d:3.3,w:62.9}, "Sandy":{d:2.9,w:53.3},
        "Gus":{d:2.8,w:48.5}, "Buster":{d:2.7,w:59}, "Byron":{d:2.6,w:60.7}, "Gene":{d:2.6,w:66.8},
        "Bolt":{d:-3.7,w:31.6}, "Doug":{d:-3.1,w:40.8}, "Damian":{d:-2.8,w:34.1}, "Gigi":{d:-2.8,w:40},
        "Glowy":{d:-2.5,w:42.8}, "Trunk":{d:-2.5,w:43}, "R-T":{d:-2.2,w:39.7}, "Tick":{d:-2,w:48.9}
      },
      basketBrawl: {
        "Grom":{d:5.7,w:74.6}, "Barley":{d:5.4,w:68.7}, "Mr. P":{d:5,w:77.6}, "Ziggy":{d:4.9,w:57.3},
        "Penny":{d:3.5,w:63.7}, "Mandy":{d:3.3,w:57.7}, "Willow":{d:3.1,w:54.2}, "Mina":{d:3,w:50.3},
        "R-T":{d:-6.2,w:36.3}, "Doug":{d:-5.2,w:39.1}, "Gigi":{d:-5,w:37.4}, "Bolt":{d:-4.7,w:37.3},
        "Jacky":{d:-4.4,w:42.4}, "Sam":{d:-3.7,w:38.1}, "Damian":{d:-3.4,w:32.6}, "Bull":{d:-3.3,w:47.2}
      },
      bounty: {
        "Sprout":{d:5.4,w:54.1}, "Grom":{d:5.3,w:56.3}, "Squeak":{d:5.3,w:54.9}, "Ziggy":{d:5.1,w:58.8},
        "Willow":{d:4.7,w:59.2}, "Mico":{d:4.5,w:52.2}, "Mr. P":{d:4.4,w:56.3}, "Mortis":{d:4.2,w:53.8},
        "Berry":{d:-7.4,w:55}, "Rosa":{d:-6.6,w:52.5}, "Melodie":{d:-6.4,w:51.7}, "Bull":{d:-6.3,w:54},
        "Griff":{d:-6.3,w:45.7}, "Lou":{d:-5.9,w:53.4}, "Shelly":{d:-5.9,w:57.4}, "Hank":{d:-5.8,w:43.8}
      },
      brawlBall: {
        "Ziggy":{d:5,w:54.1}, "Willow":{d:4.9,w:51.2}, "Squeak":{d:4,w:54.6}, "Angelo":{d:3.4,w:69.3},
        "Grom":{d:3.4,w:57.2}, "Meeple":{d:3.2,w:50.2}, "Mico":{d:3.2,w:57.2}, "Mr. P":{d:3.1,w:56.4},
        "R-T":{d:-4.5,w:38.7}, "Doug":{d:-4.3,w:40.8}, "Bolt":{d:-3.9,w:38}, "Jacky":{d:-3.5,w:40.3},
        "Trunk":{d:-3.1,w:42.3}, "Bull":{d:-2.8,w:51.4}, "Rosa":{d:-2.6,w:45.9}, "Darryl":{d:-2.5,w:46.9}
      },
      brawlBall5V5: {
        "Meeple":{d:5.8,w:65.1}, "Angelo":{d:5.4,w:70.2}, "Chuck":{d:4.7,w:67.9}, "Gene":{d:4.7,w:67},
        "Meg":{d:4.7,w:52}, "Gus":{d:4.4,w:59.2}, "Sprout":{d:4.3,w:65.9}, "Grom":{d:3.4,w:60.7},
        "Bolt":{d:-4.6,w:34.5}, "Cordelius":{d:-3.6,w:58.7}, "Bull":{d:-3.2,w:55.8}, "Edgar":{d:-3,w:57},
        "Doug":{d:-2.8,w:54.6}, "Clancy":{d:-2.2,w:49}, "Damian":{d:-2.1,w:43.4}, "Jacky":{d:-2.1,w:54.7}
      },
      duels: {
        "Ollie":{d:8.9,w:65.4}, "Sprout":{d:7.9,w:41.8}, "Penny":{d:7,w:51.1}, "Mr. P":{d:6.8,w:52.2},
        "Grom":{d:5.8,w:66.5}, "Willow":{d:5.8,w:44.7}, "Ash":{d:5.6,w:43.3}, "Barley":{d:5.5,w:58.1},
        "R-T":{d:-4.5,w:20.7}, "Mandy":{d:-4.3,w:39.8}, "Bull":{d:-3.9,w:36.9}, "Nori":{d:-3.8,w:30.3},
        "Shelly":{d:-3.8,w:36.2}, "Sam":{d:-3.7,w:31.1}, "Stu":{d:-3.5,w:35.1}, "Chester":{d:-3.4,w:32.1}
      },
      gemGrab: {
        "Mico":{d:4.3,w:53.6}, "Ziggy":{d:3.7,w:59.5}, "Belle":{d:3.6,w:65.6}, "Sprout":{d:3.5,w:58.7},
        "Mr. P":{d:3.3,w:58.4}, "Jae-Yong":{d:2.8,w:60.1}, "Alli":{d:2.7,w:53.1}, "Dynamike":{d:2.6,w:59.1},
        "Berry":{d:-5,w:55.3}, "Melodie":{d:-4.6,w:53.9}, "R-T":{d:-3.4,w:47.8}, "Doug":{d:-3.2,w:45.3},
        "Clancy":{d:-3.1,w:46.3}, "Sam":{d:-3,w:50.7}, "Lou":{d:-2.9,w:53}, "Nita":{d:-2.9,w:49.1}
      },
      hotZone: {
        "Ziggy":{d:5.7,w:63.7}, "Mico":{d:5.4,w:59.8}, "Bo":{d:4.9,w:51.8}, "Grom":{d:4.5,w:71.2},
        "Squeak":{d:4.3,w:64.4}, "Willow":{d:3.8,w:64.2}, "Mortis":{d:3.7,w:60.6}, "Dynamike":{d:3.6,w:64.6},
        "R-T":{d:-6.3,w:43.9}, "Doug":{d:-5.6,w:43.1}, "Nita":{d:-4.3,w:46.6}, "Trunk":{d:-4.2,w:46.8},
        "Rosa":{d:-4.1,w:55.6}, "Hank":{d:-4,w:41.3}, "Berry":{d:-3.7,w:49.7}, "Bonnie":{d:-3.7,w:66.1}
      },
      knockout: {
        "Buster":{d:5.5,w:51.3}, "Ollie":{d:4.7,w:55.5}, "Mico":{d:4.5,w:51.6}, "Mortis":{d:4.2,w:57.1},
        "Grom":{d:4,w:53.7}, "Brock":{d:3.4,w:54}, "Mr. P":{d:3.3,w:49.3}, "Ziggy":{d:3.3,w:53.1},
        "Hank":{d:-7.3,w:40.4}, "Griff":{d:-6.9,w:43.1}, "Rosa":{d:-6.8,w:52.5}, "Bibi":{d:-6.2,w:50.5},
        "Otis":{d:-5.3,w:42.3}, "Clancy":{d:-4.7,w:56.7}, "R-T":{d:-4.6,w:40.8}, "Bull":{d:-4.5,w:56.3}
      }
    }
  },
  "Mina": {
    vs: {
      "Bo":{d:5.2,w:54.6}, "Mico":{d:4.9,w:54.5}, "Dynamike":{d:4.6,w:64.4}, "Nani":{d:3.8,w:55},
      "Grom":{d:3.6,w:59.3}, "Sprout":{d:3.5,w:55.4}, "Ziggy":{d:3.2,w:57.1}, "Tick":{d:2.9,w:55.2},
      "Ash":{d:-5.3,w:41.2}, "Glowy":{d:-4.9,w:45.8}, "Shade":{d:-4.8,w:41.3}, "Damian":{d:-4.7,w:39.4},
      "Trunk":{d:-4.5,w:47.9}, "Buster":{d:-4.3,w:48.4}, "Ollie":{d:-4.3,w:52.7}, "Amber":{d:-4.1,w:43.2},
      "Shelly":{w:62.9}, "Colt":{w:62.6}, "Edgar":{w:62.3}, "Leon":{w:62}, "Wendy":{w:30}, "Bolt":{w:41}
    },
    with: {
      "Rico":{d:4.9}, "Crow":{d:4.2}, "Leon":{d:3.5}, "Shelly":{d:3.3}, "Spike":{d:3.3}, "Mico":{d:-7.8},
      "Mortis":{d:-7,w:45.6}, "Chuck":{d:-6.5,w:48.7}, "Kit":{d:-6}, "Nani":{d:-5}, "Wendy":{w:68.6},
      "Bolt":{w:64.2}, "Ash":{w:62}, "Starr Nova":{w:60.9}, "Damian":{w:60.7}, "Barley":{w:49.3},
      "Alli":{w:49.5}, "Colt":{w:49.7}
    },
    modes: {
      bounty: {
        "Tick":{d:4.9,w:54}, "Bo":{d:4.1,w:54.1}, "Grom":{d:3.9,w:57.4}, "Edgar":{d:3.8,w:58.9},
        "Larry & Lawrie":{d:3.7,w:61.6}, "Dynamike":{d:3.6,w:60.6}, "Sprout":{d:3.6,w:54.8},
        "Gigi":{d:3,w:56.3}, "Glowy":{d:-7.2,w:48.2}, "Damian":{d:-6.3,w:42.9}, "Ollie":{d:-6.3,w:63},
        "Buster":{d:-6.1,w:54.5}, "Jae-Yong":{d:-5.7,w:50.8}, "Ash":{d:-5.1,w:53.9}, "Lou":{d:-5.1,w:56.6},
        "Finx":{d:-4.3,w:52.3}
      },
      brawlBall: {
        "Nani":{d:6.6,w:64.9}, "Bo":{d:5.5,w:55.1}, "Gene":{d:5.3,w:66.6}, "Mico":{d:4.8,w:61.6},
        "Dynamike":{d:4.7,w:65}, "Barley":{d:4.5,w:59.7}, "Ziggy":{d:4.4,w:56.4}, "Grom":{d:4.3,w:60.9},
        "Gus":{d:-4.9,w:41.6}, "Wendy":{d:-4.4,w:27.6}, "Damian":{d:-4.1,w:37.8}, "Shade":{d:-4.1,w:38.6},
        "Trunk":{d:-3.9,w:44.3}, "Ash":{d:-3.4,w:37.5}, "Amber":{d:-3.3,w:38.8}, "Bolt":{d:-2.4,w:42.3}
      },
      gemGrab: {
        "Sprout":{d:7.4,w:65}, "Bo":{d:7.1,w:53.8}, "Ziggy":{d:6.1,w:64.2}, "Mandy":{d:5.2,w:61.8},
        "Juju":{d:4.3,w:58.7}, "Tick":{d:3.9,w:57.7}, "Dynamike":{d:3.6,w:62.5}, "Bolt":{d:3.4,w:40.9},
        "Ash":{d:-5.2,w:45.3}, "Damian":{d:-4.7,w:39.7}, "Finx":{d:-4.5,w:48.7}, "Shade":{d:-4.5,w:45.5},
        "Ollie":{d:-4.3,w:59.1}, "Hank":{d:-3.9,w:49}, "Pearl":{d:-3.8,w:52.8}, "Trunk":{d:-3.8,w:51.1}
      },
      hotZone: {
        "Bo":{d:7,w:53.4}, "Sprout":{d:6.6,w:67.4}, "Ziggy":{d:6.3,w:63.8}, "Grom":{d:5.3,w:71.5},
        "Dynamike":{d:5.1,w:65.5}, "Penny":{d:5.1,w:58.2}, "Brock":{d:5,w:67.7}, "Nani":{d:4.8,w:68.5},
        "Wendy":{d:-7.5,w:25.9}, "Buster":{d:-6.7,w:51.4}, "Rosa":{d:-5.9,w:53.3}, "Ash":{d:-5.7,w:47.6},
        "Hank":{d:-4.7,w:40}, "Gus":{d:-4.3,w:54.2}, "Damian":{d:-4,w:41.1}, "Bibi":{d:-3.7,w:46.4}
      },
      knockout: {
        "Bo":{d:5.4,w:58}, "Jessie":{d:5.2,w:61.1}, "Larry & Lawrie":{d:4.3,w:56.6}, "Ziggy":{d:4.2,w:57.2},
        "Buzz":{d:4,w:62.5}, "Grom":{d:4,w:56.9}, "Mico":{d:3.7,w:54}, "Sandy":{d:3.7,w:58.4},
        "Damian":{d:-6.6,w:43.9}, "Ollie":{d:-6.5,w:47.5}, "Rosa":{d:-6.1,w:56.3}, "Buster":{d:-4.5,w:44.4},
        "Ash":{d:-4,w:50.7}, "Draco":{d:-3.8,w:53.1}, "Glowy":{d:-3.8,w:46.7}, "Rico":{d:-3.8,w:60.1}
      }
    }
  },
  "Tara": {
    vs: {
      "Bonnie":{d:4.2,w:58.6}, "Charlie":{d:3.4,w:55.2}, "Gene":{d:3.1,w:58.3}, "Shelly":{d:3,w:63.1},
      "El Primo":{d:2.9,w:57}, "Max":{d:2.9,w:52.7}, "Bull":{d:2.8,w:57.9}, "Buzz":{d:2.8,w:57},
      "Chuck":{d:-5.3,w:46.2}, "Ziggy":{d:-5.1,w:47.1}, "Jessie":{d:-4.9,w:46}, "Penny":{d:-4.1,w:48.5},
      "Mandy":{d:-3.9,w:46.7}, "Sirius":{d:-3.8,w:43.9}, "Grom":{d:-3.6,w:50.4}, "Mico":{d:-3.6,w:44.2},
      "Leon":{w:60.9}, "Colt":{w:60.7}, "Rico":{w:58.4}, "Wendy":{w:32.4}, "Bolt":{w:38.8}, "Damian":{w:40.6},
      "Starr Nova":{w:41.4}, "Nori":{w:41.7}
    },
    with: {
      "Bull":{d:3.9}, "Crow":{d:3.5}, "Colt":{d:3.1}, "Trunk":{d:3.1}, "Frank":{d:2.8},
      "Mr. P":{d:-8.8,w:43.7}, "Charlie":{d:-8.5,w:44.7}, "Belle":{d:-7.1,w:44.3}, "Pearl":{d:-6},
      "Eve":{d:-5.4}, "Wendy":{w:73.3}, "Bolt":{w:66.5}, "Damian":{w:63}, "Starr Nova":{w:62.1},
      "Ash":{w:61.8}, "Byron":{w:46.4}, "Leon":{w:46.7}
    },
    modes: {
      bounty: {
        "Sam":{d:7.9,w:54.7}, "Ash":{d:6.8,w:54.9}, "Melodie":{d:6.6,w:56.2}, "Glowy":{d:6.1,w:50.4},
        "Rosa":{d:6,w:56.7}, "Bull":{d:5.9,w:57.8}, "Darryl":{d:5.7,w:58.7}, "Eve":{d:4.5,w:47.4},
        "Sprout":{d:-5.3,w:35}, "Dynamike":{d:-5,w:41}, "Edgar":{d:-4,w:40.1}, "Emz":{d:-4,w:42.2},
        "Jessie":{d:-3.6,w:42.6}, "Ziggy":{d:-3.6,w:41.6}, "Bo":{d:-3.5,w:35.6}, "Grom":{d:-3.4,w:39.1}
      },
      brawlBall: {
        "Gus":{d:4.4,w:52.6}, "Angelo":{d:3.9,w:73.8}, "Bea":{d:3.5,w:57.1}, "Gray":{d:3.5,w:57.5},
        "Leon":{d:3.4,w:65.8}, "Bonnie":{d:3,w:58.4}, "Colette":{d:3,w:62.3}, "Shelly":{d:3,w:66.4},
        "Ziggy":{d:-5.4,w:48.3}, "Grom":{d:-4.5,w:53.7}, "Sirius":{d:-4.3,w:45.6}, "Damian":{d:-4,w:39.6},
        "Penny":{d:-3.8,w:52.5}, "Jessie":{d:-3.7,w:48.4}, "Sprout":{d:-3.6,w:52.6}, "Barley":{d:-3.2,w:53.7}
      },
      gemGrab: {
        "Bonnie":{d:4.4,w:69.7}, "Wendy":{d:3.2,w:34.5}, "Charlie":{d:3.1,w:58.7}, "Leon":{d:2.9,w:61.7},
        "Chester":{d:2.8,w:53.1}, "Clancy":{d:2.7,w:53.6}, "Mina":{d:2.7,w:51.7}, "Hank":{d:2.6,w:54.5},
        "Sprout":{d:-5.1,w:51.5}, "Dynamike":{d:-3.8,w:54.1}, "Jessie":{d:-3.5,w:48.5},
        "Juju":{d:-3.5,w:49.9}, "Brock":{d:-2.9,w:53.8}, "Grom":{d:-2.5,w:61.9}, "Squeak":{d:-2.5,w:53.4},
        "Mr. P":{d:-2.4,w:54.1}
      },
      hotZone: {
        "Ollie":{d:6.1,w:70.4}, "Maisie":{d:5.9,w:65.7}, "Angelo":{d:5.5,w:70.6}, "R-T":{d:5,w:50.2},
        "Gus":{d:4.9,w:59.2}, "Bea":{d:4.8,w:66.7}, "Leon":{d:4.3,w:64.8}, "Ash":{d:4.2,w:53.1},
        "Wendy":{d:-6.6,w:23}, "Emz":{d:-3.6,w:44}, "Ziggy":{d:-3.6,w:49.5}, "Penny":{d:-3.4,w:45.3},
        "Sirius":{d:-3.2,w:43.2}, "Bolt":{d:-3.1,w:35.8}, "Frank":{d:-3,w:46.6}, "Juju":{d:-3,w:40.3}
      },
      knockout: {
        "Ash":{d:7.3,w:56.5}, "Pam":{d:5.4,w:57}, "El Primo":{d:5.2,w:63.4}, "Melodie":{d:4.7,w:54.5},
        "Rosa":{d:4.5,w:61.5}, "Buzz":{d:4,w:57}, "Leon":{d:4,w:61}, "Sam":{d:3.8,w:54.5},
        "Sirius":{d:-9.6,w:34}, "Ziggy":{d:-8.8,w:38.7}, "Grom":{d:-7.3,w:40.1}, "Tick":{d:-6.7,w:39.2},
        "Sprout":{d:-6.6,w:36.4}, "Wendy":{d:-5.3,w:23.7}, "Lumi":{d:-5.2,w:43.3},
        "Larry & Lawrie":{d:-4.9,w:42}
      }
    }
  },
  "Bull": {
    vs: {
      "Bolt":{d:7.3,w:41.3}, "Chuck":{d:5.5,w:51.7}, "Mico":{d:4.4,w:47}, "Sprout":{d:4.3,w:49.3},
      "Mr. P":{d:3.8,w:51.6}, "Gigi":{d:3.7,w:46.1}, "Gene":{d:3.6,w:53.5}, "Bonnie":{d:3.4,w:52.7},
      "Bea":{d:-4.2,w:45.1}, "Lou":{d:-3.7,w:40.4}, "Shelly":{d:-3.2,w:51.7}, "Maisie":{d:-2.9,w:44.3},
      "Crow":{d:-2.8,w:50.6}, "Tara":{d:-2.8,w:42.1}, "Otis":{d:-2.4,w:42.7}, "Colt":{d:-2.3,w:52.7},
      "Edgar":{w:53.4}, "Mortis":{w:52.4}, "Wendy":{w:29.8}, "R-T":{w:38.2}, "Shade":{w:38.3},
      "Lumi":{w:38.7}, "Amber":{w:39.2}
    },
    with: {
      "Mico":{d:5.5,w:57.7}, "Jessie":{d:5.2}, "Melodie":{d:5.2}, "Mandy":{d:4}, "Tara":{d:3.9},
      "Angelo":{d:-9.6}, "Bonnie":{d:-7.2}, "Mr. P":{d:-7.2}, "Gene":{d:-7,w:37.7}, "Eve":{d:-6.9},
      "Wendy":{w:65}, "Nori":{w:60}, "Starr Nova":{w:58}, "Damian":{w:57.6}, "Leon":{w:37}, "Crow":{w:37.4},
      "Shelly":{w:37.7}, "Colt":{w:37.8}
    },
    modes: {
      airHockey: {
        "Bolt":{d:3.5,w:37.1}, "Pearl":{d:3.5,w:59.1}, "Nori":{d:2.6,w:42.2}, "Mortis":{d:2.3,w:49.8},
        "Sprout":{d:2.3,w:48}, "Trunk":{d:2.3,w:45.9}, "Wendy":{d:2.3,w:33.1}, "Bibi":{d:2,w:46.2},
        "Eve":{d:-5.3,w:58.1}, "Belle":{d:-5.2,w:52.3}, "Gene":{d:-4.4,w:58}, "Lou":{d:-3.4,w:42.6},
        "Colette":{d:-3.3,w:45.7}, "Nani":{d:-3,w:44.4}, "Larry & Lawrie":{d:-2.5,w:56.9},
        "Shelly":{d:-2.4,w:49.7}
      },
      basketBrawl: {
        "Gigi":{d:4.5,w:46.4}, "Bolt":{d:4.4,w:46}, "Sam":{d:4.2,w:45.5}, "Doug":{d:3.9,w:47.8},
        "Ziggy":{d:3.8,w:55.7}, "Nori":{d:3.7,w:42.5}, "Kenji":{d:3.3,w:52.8}, "Kaze":{d:3.2,w:50.7},
        "Mr. P":{d:-8.5,w:63.8}, "Ollie":{d:-4.2,w:57.2}, "Belle":{d:-4.1,w:61.1},
        "Larry & Lawrie":{d:-3.4,w:57.2}, "Otis":{d:-3.4,w:51.9}, "Charlie":{d:-3.3,w:52.3},
        "Clancy":{d:-2.9,w:44.5}, "Tara":{d:-2.8,w:46.6}
      },
      bounty: {
        "Bolt":{d:10.3,w:35.9}, "Kenji":{d:6.3,w:46}, "Kit":{d:6.2,w:43.7}, "Mortis":{d:6,w:45.2},
        "Alli":{d:5.3,w:46.1}, "Bibi":{d:4.6,w:46.4}, "Damian":{d:4.5,w:41.1}, "Gigi":{d:4.3,w:44.7},
        "Tara":{d:-5.9,w:42.2}, "Lou":{d:-5.5,w:43.4}, "Pierce":{d:-5.1,w:32.9}, "Bea":{d:-5,w:39.2},
        "Charlie":{d:-4.9,w:42.1}, "Colette":{d:-4.8,w:43}, "Angelo":{d:-4.6,w:35.1},
        "Maisie":{d:-4.5,w:43.4}
      },
      brawlArena: {
        "Gigi":{d:6.8,w:53.7}, "Bolt":{d:4.6,w:44.6}, "Kenji":{d:4.1,w:54.9}, "Mortis":{d:3.4,w:62.4},
        "Alli":{d:3.2,w:60.6}, "Lily":{d:3.1,w:55.4}, "Jacky":{d:3,w:60}, "Nori":{d:3,w:44},
        "Bonnie":{d:-7.9,w:52.2}, "Meeple":{d:-5.7,w:57.4}, "Gus":{d:-5.3,w:53}, "Sirius":{d:-4.7,w:48.6},
        "Shade":{d:-4.1,w:40.7}, "Stu":{d:-3.8,w:43.8}, "Bea":{d:-3.6,w:50.9}, "Angelo":{d:-3.5,w:55.6}
      },
      brawlBall: {
        "Bolt":{d:5,w:42.8}, "Nori":{d:4.3,w:40.9}, "Damian":{d:3.6,w:38.9}, "Wendy":{d:3.6,w:29.8},
        "Sam":{d:3.5,w:45.2}, "Gigi":{d:3.4,w:43.7}, "Grom":{d:3.2,w:52.8}, "Pearl":{d:3.1,w:44.3},
        "Shelly":{d:-3.3,w:51.7}, "Crow":{d:-3,w:51.5}, "Colt":{d:-2.5,w:52.9}, "Colette":{d:-2.4,w:48.3},
        "R-T":{d:-2.4,w:36.8}, "Bea":{d:-2,w:43}, "Clancy":{d:-1.9,w:43.2}, "Lou":{d:-1.9,w:36.4}
      },
      brawlBall5V5: {
        "Ollie":{d:4.7,w:50.1}, "Kenji":{d:3.2,w:44.2}, "Ziggy":{d:3,w:48.3}, "Bonnie":{d:2.5,w:51.6},
        "Mr. P":{d:2.5,w:50.9}, "Buster":{d:2.4,w:44.9}, "Bolt":{d:2,w:32.8}, "Larry & Lawrie":{d:1.8,w:53.5},
        "Wendy":{d:-9,w:15.1}, "Lumi":{d:-4.5,w:37.4}, "Charlie":{d:-3.6,w:43.4}, "Meeple":{d:-3.2,w:47},
        "Surge":{d:-2.9,w:39.1}, "Meg":{d:-2.8,w:35.6}, "Nani":{d:-2.6,w:50}, "Pierce":{d:-2.6,w:42.5}
      },
      gemGrab: {
        "Bolt":{d:7,w:38.9}, "Gigi":{d:4.7,w:52.6}, "Nori":{d:4.4,w:45.8}, "Wendy":{d:3.9,w:30.9},
        "Damian":{d:3.5,w:41.8}, "Alli":{d:3.4,w:50}, "Mortis":{d:3.1,w:48.7}, "Trunk":{d:2.9,w:51.6},
        "Charlie":{d:-2.7,w:47.8}, "Otis":{d:-2.7,w:49.1}, "Gene":{d:-2.4,w:54.3}, "Ollie":{d:-2.4,w:55.1},
        "Shelly":{d:-2.4,w:51.1}, "Gale":{d:-2.3,w:49.5}, "Pam":{d:-2.2,w:49.6}, "Maisie":{d:-2.1,w:54.7}
      },
      heist: {
        "Wendy":{d:9.4,w:62.7}, "Gigi":{d:5.9,w:50.1}, "Nori":{d:5.8,w:40.7}, "Gray":{d:5.3,w:65.8},
        "Kit":{d:5.2,w:63.4}, "Bolt":{d:4.9,w:54.6}, "Sprout":{d:4.6,w:61.2}, "Mortis":{d:4.5,w:70.5},
        "Lou":{d:-4.6,w:64.1}, "R-T":{d:-4.1,w:41.3}, "Finx":{d:-3.5,w:54.5}, "Eve":{d:-2.6,w:63.5},
        "Emz":{d:-2.4,w:46.3}, "Buster":{d:-2.3,w:71.5}, "Bea":{d:-2.2,w:70.6}, "Otis":{d:-2.1,w:61.7}
      },
      hotZone: {
        "Bolt":{d:8.6,w:42.9}, "Sam":{d:6.1,w:52.8}, "Starr Nova":{d:6,w:41.9}, "Gigi":{d:5.5,w:52.6},
        "Nori":{d:5.4,w:41.4}, "Alli":{d:5.3,w:55.9}, "Janet":{d:5.3,w:57.3}, "Jacky":{d:4.9,w:53.3},
        "Jessie":{d:-4.5,w:36}, "Bea":{d:-4,w:53.2}, "Sirius":{d:-4,w:37.6}, "Spike":{d:-3.6,w:45.1},
        "Tara":{d:-3.6,w:41.6}, "Rico":{d:-3.2,w:53.1}, "Byron":{d:-3.1,w:55.8}, "Griff":{d:-3.1,w:37.4}
      },
      knockout: {
        "Bolt":{d:12.4,w:40.6}, "Ollie":{d:7.2,w:47.2}, "Gigi":{d:6.7,w:43.1}, "Nori":{d:6.3,w:40.1},
        "Ash":{d:6.2,w:46.9}, "Alli":{d:5.3,w:45.1}, "Chuck":{d:5.2,w:51.1}, "Sam":{d:5.2,w:47.4},
        "Crow":{d:-6,w:46.3}, "Spike":{d:-5.5,w:40.7}, "Colette":{d:-4.8,w:42.8}, "Dynamike":{d:-4.7,w:42.9},
        "Griff":{d:-4.6,w:34.6}, "Emz":{d:-4.3,w:43.6}, "Shelly":{d:-4.3,w:44.8}, "Sirius":{d:-4.3,w:31.2}
      },
      knockout5V5: {
        "Ash":{d:8.5,w:43.5}, "Bolt":{d:8.4,w:59}, "Draco":{d:7.5,w:52.6}, "Starr Nova":{d:7.3,w:47.7},
        "Wendy":{d:6,w:44.7}, "Damian":{d:5.9,w:52.5}, "Gigi":{d:4.8,w:55.1}, "Najia":{d:4.8,w:55.3},
        "Otis":{d:-7.7,w:42.7}, "Clancy":{d:-6.9,w:48}, "Lou":{d:-5.9,w:44.7}, "Maisie":{d:-5.3,w:52.2},
        "Shelly":{d:-4.9,w:53.3}, "Gale":{d:-4.7,w:49.6}, "Jacky":{d:-4.6,w:55.5}, "Bonnie":{d:-4.4,w:50}
      }
    }
  },
  "Fang": {
    vs: {
      "Nori":{d:3.5,w:41.6}, "Mico":{d:3.3,w:46}, "Squeak":{d:2.4,w:49.6}, "Ziggy":{d:2.4,w:49.4},
      "Grom":{d:2.3,w:51.2}, "Barley":{d:2.2,w:54.2}, "Bolt":{d:2.2,w:36.3}, "Gigi":{d:2.1,w:44.6},
      "Ash":{d:-4,w:35.8}, "R-T":{d:-3.3,w:37.1}, "Pam":{d:-3.2,w:46.3}, "Charlie":{d:-3.1,w:43.6},
      "8-Bit":{d:-2.5,w:40.4}, "Sirius":{d:-2.5,w:40.2}, "Jacky":{d:-2.4,w:44.3}, "Shelly":{d:-2.3,w:52.7},
      "Dynamike":{w:54.4}, "Colt":{w:53.8}, "Edgar":{w:53.8}, "Leon":{w:53}, "Wendy":{w:25.9},
      "Damian":{w:36.9}
    },
    with: {
      "Rosa":{d:6}, "Trunk":{d:5}, "Barley":{d:4.8}, "Gale":{d:4.6}, "Lola":{d:4.6}, "Pam":{d:-3.3},
      "Bull":{d:-2.7}, "Crow":{d:-2.7,w:39.1}, "Edgar":{d:-2,w:40.6}, "Emz":{d:-2}, "Wendy":{w:66.9},
      "Bolt":{w:63.5}, "Ash":{w:59}, "Damian":{w:58.8}, "Starr Nova":{w:57.6}, "Rico":{w:40}, "Colt":{w:40.3},
      "Leon":{w:40.3}
    },
    modes: {
      airHockey: {
        "Nori":{d:3.4,w:44.8}, "Ziggy":{d:2.8,w:48.3}, "Gigi":{d:2.4,w:45.2}, "Starr Nova":{d:2.3,w:40.7},
        "Alli":{d:2.2,w:49.5}, "Mortis":{d:2.1,w:51.4}, "Sprout":{d:2.1,w:49.6}, "Lumi":{d:1.9,w:42.5},
        "Charlie":{d:-5.9,w:47.7}, "Pam":{d:-4,w:56.6}, "Pearl":{d:-3.8,w:53.7}, "Ash":{d:-3.5,w:48},
        "8-Bit":{d:-2.9,w:48.7}, "Gene":{d:-2.9,w:61.2}, "Maisie":{d:-2.9,w:49.6}, "Jacky":{d:-2.5,w:46.8}
      },
      basketBrawl: {
        "Mico":{d:4.5,w:56.7}, "Starr Nova":{d:4.2,w:41.7}, "Grom":{d:4.1,w:71.5}, "Barley":{d:4,w:65.8},
        "Moe":{d:3.3,w:50.4}, "Nori":{d:3.1,w:40.8}, "Ruffs":{d:2.9,w:51.3}, "Alli":{d:2.6,w:53.5},
        "Charlie":{d:-5.7,w:48.8}, "Ash":{d:-4.4,w:46.7}, "R-T":{d:-2.8,w:38.1}, "Wendy":{d:-2.8,w:30.5},
        "Jacky":{d:-2.7,w:42.4}, "Rosa":{d:-2.7,w:38.1}, "Meeple":{d:-2.5,w:50.2}, "Lola":{d:-2.4,w:46.3}
      },
      bounty: {
        "Bolt":{d:4.8,w:35.7}, "Chuck":{d:3.7,w:55.4}, "Nori":{d:3.6,w:47.9}, "Ziggy":{d:3.6,w:53.4},
        "Alli":{d:3.4,w:50.7}, "Bonnie":{d:3.3,w:51.5}, "Barley":{d:3.2,w:61.5}, "Trunk":{d:3.2,w:62},
        "Pam":{d:-5.7,w:51.9}, "Sirius":{d:-4.4,w:40.4}, "Ash":{d:-4.2,w:48.4}, "8-Bit":{d:-3.3,w:42.9},
        "Griff":{d:-3,w:45}, "Hank":{d:-3,w:42.7}, "Charlie":{d:-2.5,w:51.1}, "R-T":{d:-2.5,w:43.6}
      },
      brawlBall: {
        "Nori":{d:3.1,w:39.7}, "Gigi":{d:2.7,w:42.9}, "Ziggy":{d:2.1,w:47.1}, "Kenji":{d:2,w:47.8},
        "Starr Nova":{d:2,w:37.8}, "Bibi":{d:1.9,w:49.3}, "Mico":{d:1.8,w:51.5}, "Mortis":{d:1.6,w:51.8},
        "Pam":{d:-4,w:40.8}, "Ash":{d:-3.4,w:30.9}, "8-Bit":{d:-3.2,w:38.7}, "Charlie":{d:-3.2,w:37.5},
        "R-T":{d:-3.2,w:35.9}, "Lola":{d:-3,w:42.8}, "Nani":{d:-2.5,w:48.7}, "Shelly":{d:-2.5,w:52.4}
      },
      brawlBall5V5: {
        "Juju":{d:6.1,w:64.6}, "Angelo":{d:5.4,w:65.7}, "Barley":{d:5.1,w:62.5}, "Ziggy":{d:4.2,w:54},
        "Larry & Lawrie":{d:3.7,w:59.8}, "Rosa":{d:3.5,w:57.2}, "Grom":{d:3.4,w:56}, "Gene":{d:3.2,w:60.9},
        "Wendy":{d:-4.3,w:23.2}, "Mina":{d:-3.1,w:47.4}, "Damian":{d:-2.7,w:38.2}, "Ash":{d:-2.4,w:44.7},
        "Stu":{d:-2.2,w:50.6}, "Clancy":{d:-2.1,w:44.3}, "Cordelius":{d:-2.1,w:55.6}, "Darryl":{d:-2,w:45.9}
      },
      deathmatch5v5: {
        "Nita":{d:7.5,w:65.7}, "Sam":{d:6.7,w:62.8}, "Trunk":{d:5,w:63}, "El Primo":{d:4.6,w:63.7},
        "Hank":{d:4.5,w:62.9}, "Barley":{d:4.2,w:58.6}, "Jacky":{d:4,w:62.7}, "Chuck":{d:3.1,w:53.5},
        "Wendy":{d:-5.2,w:28.3}, "Doug":{d:-3.6,w:38.6}, "8-Bit":{d:-3.5,w:37.2}, "Damian":{d:-3.1,w:38.6},
        "Chester":{d:-2.4,w:50.3}, "Gigi":{d:-2.4,w:48}, "Cordelius":{d:-2.3,w:52.8}, "Eve":{d:-2.2,w:48.7}
      },
      duels: {
        "Buster":{d:6.5,w:60.5}, "Mr. P":{d:5.8,w:55.7}, "Ollie":{d:5.3,w:66.1}, "Berry":{d:4.7,w:67.8},
        "Larry & Lawrie":{d:4.6,w:63.8}, "Jae-Yong":{d:2.8,w:40.6}, "Kenji":{d:2.8,w:57.2},
        "Moe":{d:2.6,w:35.9}, "R-T":{d:-4.1,w:24.5}, "Bull":{d:-3.7,w:41.5}, "Wendy":{d:-3.6,w:24.8},
        "Shelly":{d:-3.5,w:40.8}, "Sirius":{d:-2.4,w:40.2}, "Otis":{d:-2.3,w:34.8}, "Sam":{d:-2.1,w:36.8},
        "Doug":{d:-2,w:41.5}
      },
      gemGrab: {
        "Gigi":{d:3,w:51.9}, "Ollie":{d:2.7,w:61.1}, "Mico":{d:2.6,w:49}, "Ziggy":{d:2.3,w:55.3},
        "Berry":{d:2.2,w:59.6}, "Bolt":{d:2.2,w:34.9}, "Mortis":{d:2.2,w:48.8}, "Nori":{d:2.2,w:44.6},
        "Ash":{d:-4.4,w:40.8}, "Meg":{d:-3.8,w:43.9}, "Pam":{d:-3.8,w:48.9}, "R-T":{d:-3.2,w:45.1},
        "Angelo":{d:-3,w:52.4}, "Hank":{d:-3,w:44.7}, "Jacky":{d:-2.6,w:54.1}, "8-Bit":{d:-2.5,w:45.5}
      },
      hotZone: {
        "Nori":{d:5,w:42.1}, "Ziggy":{d:4.7,w:54.2}, "Lily":{d:3.8,w:58.6}, "Jae-Yong":{d:3,w:59.7},
        "Squeak":{d:3,w:54.8}, "Edgar":{d:2.9,w:50.7}, "Shade":{d:2.9,w:46.3}, "Grom":{d:2.6,w:61.3},
        "Wendy":{d:-7,w:19.7}, "Ash":{d:-5.3,w:40.1}, "Pam":{d:-4.4,w:42.8}, "8-Bit":{d:-4.1,w:40.1},
        "Gus":{d:-3.5,w:47.1}, "Gene":{d:-2.9,w:67.4}, "Nita":{d:-2.9,w:39.6}, "Griff":{d:-2.6,w:39.2}
      },
      knockout: {
        "Bolt":{d:5.2,w:37.4}, "Nori":{d:4.7,w:43.1}, "Gigi":{d:3.2,w:44.2}, "Lily":{d:3,w:49.1},
        "Sam":{d:3,w:50}, "Mortis":{d:2.9,w:49.8}, "Kenji":{d:2.7,w:46.7}, "Alli":{d:2.6,w:47.2},
        "Sirius":{d:-5.9,w:34.1}, "Pam":{d:-4.5,w:43.4}, "Tara":{d:-3.7,w:42.6}, "8-Bit":{d:-3.5,w:39.8},
        "R-T":{d:-3.4,w:36.1}, "Griff":{d:-2.9,w:41.1}, "Charlie":{d:-2.7,w:38.6}, "Lou":{d:-2.7,w:40.4}
      },
      knockout5V5: {
        "Ollie":{d:6,w:57.2}, "Sandy":{d:3.6,w:55.5}, "Lou":{d:3.2,w:49.1}, "Larry & Lawrie":{d:3,w:54.7},
        "Clancy":{d:2.9,w:53}, "Berry":{d:2.1,w:51.4}, "Gale":{d:2.1,w:51.6}, "Janet":{d:1.8,w:40.1},
        "Wendy":{d:-6.9,w:27.4}, "Ash":{d:-4.4,w:26.4}, "Sirius":{d:-3.9,w:35.5}, "Bolt":{d:-3.7,w:42.1},
        "Hank":{d:-3.6,w:30.6}, "Doug":{d:-3.4,w:43.4}, "Alli":{d:-3.3,w:42.8}, "Moe":{d:-3.2,w:38}
      }
    }
  },
  "Otis": {
    vs: {
      "Nori":{d:3,w:45.7}, "Bolt":{d:2.5,w:41}, "Buzz":{d:2.5,w:56.3}, "Darryl":{d:2.5,w:55.6},
      "Starr Nova":{d:2.5,w:45}, "Bull":{d:2.4,w:57.3}, "Cordelius":{d:2.1,w:55.4}, "Kenji":{d:2.1,w:53.1},
      "Chuck":{d:-6.9,w:44.2}, "Pam":{d:-5.4,w:48.8}, "Penny":{d:-5.2,w:47.1}, "Grom":{d:-4.7,w:49},
      "Jessie":{d:-4,w:46.5}, "Sirius":{d:-3.6,w:43.8}, "Eve":{d:-3.5,w:49.2}, "Lola":{d:-3.1,w:49.5},
      "Shelly":{w:61.7}, "Colt":{w:60.6}, "Edgar":{w:58.2}, "Rico":{w:58.1}, "Crow":{w:58}, "Wendy":{w:31.6},
      "Amber":{w:43.6}, "Damian":{w:43.6}
    },
    with: {
      "Damian":{d:3.2,w:65}, "Nori":{d:3,w:64}, "Starr Nova":{d:2.7,w:64}, "Rico":{d:2.6}, "Chester":{d:2.4},
      "Berry":{d:-13.3,w:36.8}, "Bonnie":{d:-11.1,w:38.8}, "Jessie":{d:-8.3}, "Penny":{d:-8.1},
      "Pam":{d:-7.4,w:41.7}, "Wendy":{w:73.7}, "Bolt":{w:66.2}, "Barley":{w:41.4}, "Gene":{w:42.4}
    },
    modes: {
      bounty: {
        "Clancy":{d:7.4,w:62.6}, "Damian":{d:6.9,w:45.9}, "Starr Nova":{d:6.5,w:44.4}, "Rosa":{d:5.9,w:57.3},
        "Darryl":{d:5.6,w:59.3}, "Bolt":{d:5.5,w:33.1}, "Jae-Yong":{d:4.9,w:51.1}, "Shade":{d:4.8,w:46.2},
        "Buster":{d:-8.1,w:42.2}, "Belle":{d:-4.6,w:39}, "Gale":{d:-4.4,w:47}, "Bea":{d:-4,w:42.8},
        "Grom":{d:-3.8,w:39.3}, "Mr. P":{d:-3.7,w:40.4}, "Meg":{d:-3.6,w:44.8}, "Angelo":{d:-3.5,w:38.7}
      },
      brawlBall: {
        "Nani":{d:3.8,w:64.7}, "Gene":{d:3.2,w:67.1}, "R-T":{d:3,w:51.7}, "Buzz":{d:2.4,w:58.4},
        "Darryl":{d:2.4,w:57.5}, "Melodie":{d:2.3,w:55.9}, "Shelly":{d:2,w:66.5}, "Cordelius":{d:1.8,w:56.7},
        "Sirius":{d:-5.1,w:45.9}, "Wendy":{d:-4.7,w:29.8}, "Ash":{d:-3.4,w:40.3}, "Najia":{d:-2.8,w:55.4},
        "Grom":{d:-2.2,w:57.1}, "Willow":{d:-2.2,w:49.7}, "Larry & Lawrie":{d:-1.9,w:49.5},
        "Ziggy":{d:-1.9,w:52.9}
      },
      duels: {
        "Bull":{d:5,w:63.3}, "Shelly":{d:2.9,w:60.4}, "Bolt":{d:2.8,w:54}, "Clancy":{d:2.3,w:75.2},
        "Fang":{d:2.3,w:65.2}, "Darryl":{d:2.2,w:61.2}, "Mortis":{d:2.2,w:68.7}, "Bibi":{d:2.1,w:65.6},
        "Mr. P":{d:-4.6,w:58.2}, "Larry & Lawrie":{d:-4.4,w:66.8}, "Wendy":{d:-4.2,w:36},
        "Eve":{d:-4.1,w:56.8}, "Lola":{d:-4.1,w:44}, "Belle":{d:-3.8,w:61.4}, "Ollie":{d:-3.8,w:68.6},
        "Charlie":{d:-3.5,w:50.6}
      },
      gemGrab: {
        "Bolt":{d:5,w:35.3}, "Clancy":{d:4.5,w:48.4}, "Starr Nova":{d:3.9,w:41.3}, "Melodie":{d:3.3,w:56.1},
        "Rosa":{d:3.3,w:51.8}, "Sam":{d:3.3,w:51.3}, "Wendy":{d:3.3,w:28.8}, "Damian":{d:3.2,w:39.8},
        "Sprout":{d:-5.9,w:43.6}, "Meg":{d:-4.6,w:40.3}, "Jae-Yong":{d:-4,w:47.7}, "Mandy":{d:-3.7,w:44.8},
        "Sirius":{d:-3.7,w:38.5}, "Grom":{d:-3.6,w:54.1}, "Willow":{d:-3.3,w:50.7}, "Byron":{d:-3,w:49.2}
      },
      knockout: {
        "Darryl":{d:5.6,w:58.9}, "Trunk":{d:5.5,w:67.9}, "Kenji":{d:5.3,w:57.7}, "Buzz":{d:4.8,w:62.5},
        "Tara":{d:4.7,w:59.5}, "El Primo":{d:4.4,w:67.2}, "Sandy":{d:3.7,w:57.8}, "Chuck":{d:3.5,w:62.7},
        "Sirius":{d:-6.3,w:42.1}, "Grom":{d:-4.1,w:48.1}, "Najia":{d:-3.7,w:45.5}, "Wendy":{d:-3.4,w:29.6},
        "Buster":{d:-3.3,w:44.9}, "Ziggy":{d:-2.9,w:49.4}, "Juju":{d:-2.6,w:47.7}, "Sprout":{d:-2.6,w:45.1}
      }
    }
  },
  "Carl": {
    vs: {
      "Mico":{d:1.7,w:49.9}, "Surge":{d:1.7,w:55.2}, "Max":{d:1.6,w:51.9}, "Tara":{d:1.6,w:52.1},
      "Dynamike":{d:1.4,w:60}, "Alli":{d:1.1,w:53.9}, "Mortis":{d:0.9,w:55.8}, "Nani":{d:0.8,w:50.7},
      "Bolt":{d:-2.7,w:36.5}, "Chuck":{d:-2.6,w:49.3}, "Hank":{d:-2.6,w:44.8}, "Berry":{d:-2.2,w:52.9},
      "Barley":{d:-2,w:55.4}, "Doug":{d:-2,w:46.6}, "Rosa":{d:-2,w:51.8}, "Pearl":{d:-1.9,w:47.4},
      "Colt":{w:60.9}, "Shelly":{w:60.5}, "Crow":{w:59.7}, "Rico":{w:59.5}, "Wendy":{w:32.5},
      "Damian":{w:41.5}, "Nori":{w:42.6}, "Starr Nova":{w:42.8}
    },
    with: {
      "Edgar":{d:2.8}, "Crow":{d:2.7}, "Leon":{d:2.7}, "Surge":{d:2.6}, "Colt":{d:2.5},
      "Rosa":{d:-6.8,w:45.3}, "Trunk":{d:-5.7}, "Lola":{d:-5.6,w:46.7}, "Barley":{d:-5.4,w:43.2},
      "Mr. P":{d:-5}, "Wendy":{w:72.9}, "Nori":{w:62.8}, "Bolt":{w:62.6}, "Starr Nova":{w:61.2},
      "Damian":{w:61}, "Shelly":{w:45.5}, "Gene":{w:46.9}
    },
    modes: {
      bounty: {
        "Wendy":{d:5,w:35.6}, "Mico":{d:4.9,w:53}, "Alli":{d:3.9,w:55.5}, "Ollie":{d:3.3,w:70.6},
        "Draco":{d:2.2,w:59.6}, "Moe":{d:2.1,w:53.2}, "Mr. P":{d:2.1,w:54.3}, "Ruffs":{d:1.8,w:52},
        "Maisie":{d:-4,w:54.6}, "El Primo":{d:-3.9,w:61.9}, "Lou":{d:-3.3,w:56.3}, "Gene":{d:-3.1,w:51.2},
        "Chuck":{d:-3,w:52.9}, "Finx":{d:-3,w:51.4}, "Chester":{d:-2.9,w:50.8}, "Berry":{d:-2.7,w:60}
      },
      brawlBall: {
        "Tara":{d:3.1,w:52.7}, "Nani":{d:2.8,w:62.3}, "Mico":{d:2.7,w:60.8}, "Nita":{d:2,w:55},
        "Larry & Lawrie":{d:1.7,w:51.6}, "Dynamike":{d:1.6,w:63.1}, "Jessie":{d:1.3,w:53},
        "Sirius":{d:1.3,w:50.8}, "Chuck":{d:-4.2,w:56.1}, "Bolt":{d:-4,w:41.9}, "Bonnie":{d:-3,w:52},
        "Sam":{d:-2.9,w:47}, "Hank":{d:-2.5,w:47.2}, "Angelo":{d:-2.4,w:67.2}, "Meeple":{d:-2.4,w:48.7},
        "Damian":{d:-2.1,w:41.1}
      },
      gemGrab: {
        "Mico":{d:4.7,w:51.9}, "Moe":{d:2.8,w:48.3}, "Alli":{d:2.4,w:50.7}, "Sirius":{d:2.3,w:48},
        "Wendy":{d:2.1,w:30.5}, "Tara":{d:1.9,w:48.4}, "Tick":{d:1.7,w:51}, "Jessie":{d:1.6,w:50.1},
        "Gene":{d:-4.8,w:53.6}, "El Primo":{d:-3.6,w:53.6}, "Frank":{d:-3.4,w:50.3}, "Belle":{d:-3.2,w:56.8},
        "Berry":{d:-3.1,w:55.1}, "Lou":{d:-3.1,w:50.7}, "Jacky":{d:-2.8,w:54.8}, "Shelly":{d:-2.6,w:52.7}
      },
      hotZone: {
        "Mico":{d:4.1,w:50.3}, "Tick":{d:2.9,w:47.8}, "8-Bit":{d:2.6,w:47.2}, "Surge":{d:2.5,w:47.5},
        "Eve":{d:2.2,w:54.7}, "Mortis":{d:2.2,w:51.2}, "Wendy":{d:2.2,w:29.3}, "Sam":{d:1.9,w:50.4},
        "Darryl":{d:-6.8,w:49.1}, "Buzz":{d:-4.4,w:48.3}, "Angelo":{d:-3.7,w:58.6}, "Meeple":{d:-3.5,w:48.6},
        "Pearl":{d:-3.3,w:51}, "Frank":{d:-3.2,w:43.3}, "Mandy":{d:-3.1,w:55}, "Gale":{d:-3,w:45.6}
      },
      knockout: {
        "Mico":{d:4.9,w:54.8}, "Meg":{d:3,w:53.3}, "Tara":{d:2.9,w:58.1}, "Charlie":{d:2.8,w:52.9},
        "Sandy":{d:2.5,w:57}, "Larry & Lawrie":{d:2.4,w:54.5}, "Max":{d:2.2,w:54.7}, "Mortis":{d:2.1,w:57.9},
        "Clancy":{d:-4.1,w:60}, "Bolt":{d:-3.9,w:36.6}, "Bull":{d:-3.7,w:59.7}, "Rosa":{d:-3.6,w:58.5},
        "Hank":{d:-2.8,w:47.8}, "Berry":{d:-2.7,w:51}, "Glowy":{d:-2.4,w:47.8}, "Pearl":{d:-2.4,w:41.4}
      }
    }
  },
  "Sirius": {
    vs: {
      "Draco":{d:8.7,w:59.1}, "Darryl":{d:7.3,w:62.9}, "Gene":{d:7,w:64.3}, "Lola":{d:6.9,w:62.1},
      "Pam":{d:6.8,w:63.7}, "Glowy":{d:6.7,w:58}, "Angelo":{d:6.6,w:60.8}, "Doug":{d:6.4,w:56.8},
      "Grom":{d:-6.1,w:50.1}, "Tick":{d:-5.5,w:47.3}, "Dynamike":{d:-4.9,w:55.5}, "Edgar":{d:-4.5,w:55.8},
      "Bibi":{d:-4.1,w:50.7}, "Emz":{d:-3.6,w:51.9}, "Brock":{d:-3.4,w:51}, "Squeak":{d:-3.1,w:51.5},
      "Shelly":{w:66.1}, "Ollie":{w:63.1}, "Wendy":{w:32.6}, "Bolt":{w:38.2}, "Damian":{w:45.6},
      "Hank":{w:47.4}
    },
    with: {
      "Crow":{d:5.1}, "Frank":{d:3.9}, "Leon":{d:3.4}, "Shelly":{d:3.4}, "Edgar":{d:3.2},
      "Wendy":{d:-7.9,w:65.7}, "Shade":{d:-7.3}, "Gus":{d:-6.7}, "Amber":{d:-6.5}, "Angelo":{d:-6.4,w:48.9},
      "Bolt":{w:62.7}, "Damian":{w:61.9}, "Starr Nova":{w:61.3}, "Ash":{w:60.9}, "Mortis":{w:47.8},
      "Colt":{w:49.3}, "Gene":{w:49.8}, "Jae-Yong":{w:50}
    },
    modes: {
      bounty: {
        "Ash":{d:7.8,w:65.6}, "Angelo":{d:7.4,w:58.7}, "Draco":{d:7.3,w:65.6}, "Gray":{d:7.1,w:56.9},
        "R-T":{d:6.9,w:58.1}, "Pam":{d:6.7,w:69.3}, "Lola":{d:5.9,w:62.8}, "Glowy":{d:5.7,w:59.8},
        "Grom":{d:-7.2,w:45}, "Wendy":{d:-3.5,w:28}, "Jessie":{d:-3.4,w:52.6}, "Damian":{d:-3.3,w:44.7},
        "Squeak":{d:-3.2,w:47.7}, "Edgar":{d:-3.1,w:50.8}, "Ziggy":{d:-3.1,w:51.9}, "Dynamike":{d:-2.9,w:53}
      },
      brawlBall: {
        "Gene":{d:11.2,w:74.3}, "Pam":{d:11.1,w:64.8}, "Draco":{d:10.3,w:60.2}, "Glowy":{d:9.7,w:63.6},
        "Angelo":{d:8.8,w:78.7}, "Lou":{d:8.7,w:55.7}, "Chuck":{d:8.6,w:69.3}, "Mr. P":{d:8.6,w:66.5},
        "Dynamike":{d:-7.4,w:54.6}, "Tick":{d:-6.8,w:47.2}, "Bibi":{d:-5.5,w:50.8}, "Edgar":{d:-5.5,w:57.6},
        "Emz":{d:-3.8,w:52.7}, "Mortis":{d:-3.5,w:55.5}, "Colt":{d:-3,w:60.8}, "Rico":{d:-2.4,w:59.2}
      },
      gemGrab: {
        "Angelo":{d:11.6,w:71.9}, "R-T":{d:11.4,w:64.7}, "Gus":{d:10,w:64.3}, "Gray":{d:8.7,w:62},
        "Juju":{d:8.3,w:62.4}, "Glowy":{d:7.8,w:62.6}, "Lola":{d:7.7,w:64.2}, "Pam":{d:7.4,w:65.1},
        "Tick":{d:-4.8,w:48.7}, "Bolt":{d:-4.4,w:32.9}, "Bibi":{d:-4.1,w:47}, "Dynamike":{d:-3.9,w:54.7},
        "Squeak":{d:-3.6,w:53.1}, "Penny":{d:-3.2,w:52.3}, "Edgar":{d:-3.1,w:50.8}, "Jessie":{d:-2.9,w:49.8}
      },
      hotZone: {
        "Gus":{d:11.9,w:69.7}, "Draco":{d:9.2,w:56.2}, "Glowy":{d:8.5,w:60.6}, "Lola":{d:8,w:66.2},
        "Angelo":{d:7.5,w:75.8}, "Pam":{d:7.5,w:61.8}, "Doug":{d:7.3,w:54.6}, "Darryl":{d:7.2,w:69.6},
        "Tick":{d:-6,w:45.5}, "Penny":{d:-5.9,w:46.4}, "Bolt":{d:-5.7,w:36.7}, "Grom":{d:-5,w:60.5},
        "Edgar":{d:-4.6,w:50.4}, "Bibi":{d:-4.3,w:44.9}, "Mortis":{d:-3.7,w:52}, "Emz":{d:-3.4,w:47.8}
      },
      knockout: {
        "Kaze":{d:9.6,w:64.5}, "Tara":{d:9.6,w:66}, "Meg":{d:9.5,w:61}, "Draco":{d:9.4,w:67.2},
        "Glowy":{d:9.2,w:60.6}, "Nori":{d:9,w:57.2}, "Chester":{d:8.6,w:63.9}, "Lola":{d:8.4,w:64.5},
        "Grom":{d:-7.3,w:46.5}, "Edgar":{d:-6.4,w:57.6}, "Wendy":{d:-5.7,w:28.8}, "Brock":{d:-5.2,w:49.6},
        "Dynamike":{d:-4.9,w:57.4}, "Tick":{d:-4.8,w:47.5}, "Frank":{d:-4.6,w:49.9}, "Squeak":{d:-4.3,w:48.3}
      }
    }
  },
  "Grom": {
    vs: {
      "R-T":{d:6.5,w:48}, "Sirius":{d:6.1,w:49.9}, "Gus":{d:5.7,w:49.9}, "Amber":{d:5,w:46.6},
      "Bea":{d:5,w:55.4}, "Meeple":{d:5,w:50}, "Ruffs":{d:4.8,w:49.1}, "Otis":{d:4.7,w:51},
      "Bolt":{d:-9.7,w:25.3}, "Mortis":{d:-7.8,w:42.6}, "Chuck":{d:-5.9,w:41.5}, "Edgar":{d:-5.8,w:48.4},
      "Kenji":{d:-5.8,w:41.4}, "Bibi":{d:-4.8,w:43.7}, "Kaze":{d:-4.7,w:40.8}, "Mico":{d:-4.7,w:39.1},
      "Rico":{w:57}, "Colt":{w:56.6}, "Shelly":{w:55.9}, "Barley":{w:55.1}, "Wendy":{w:24.4}, "Nori":{w:35.1},
      "Damian":{w:35.4}, "Starr Nova":{w:37.1}
    },
    with: {
      "Edgar":{d:4.8}, "Crow":{d:3.9}, "Surge":{d:3.9}, "Shelly":{d:3.2}, "Leon":{d:3.1},
      "Buster":{d:-9,w:41.6}, "Ollie":{d:-8.7,w:37.9}, "El Primo":{d:-8.5,w:38.9}, "Rosa":{d:-8,w:39.9},
      "Jacky":{d:-7.7}, "Wendy":{w:69.4}, "Bolt":{w:61.8}, "Nori":{w:57.7}, "Starr Nova":{w:56.7},
      "Damian":{w:56.2}, "Barley":{w:39.4}
    },
    modes: {
      bounty: {
        "Sirius":{d:7.2,w:55}, "8-Bit":{d:4.9,w:54}, "Spike":{d:4.7,w:56.2}, "Griff":{d:4.6,w:55.6},
        "Chester":{d:4.5,w:56.9}, "Lumi":{d:4.5,w:57.8}, "Hank":{d:4.3,w:52.9}, "R-T":{d:4.3,w:53.3},
        "Bolt":{d:-11.7,w:21.7}, "Mortis":{d:-9.9,w:38.7}, "Gigi":{d:-8.1,w:41.7}, "Alli":{d:-5.8,w:44.5},
        "Kaze":{d:-5.7,w:44.9}, "Mico":{d:-5.5,w:41.2}, "Nori":{d:-5.4,w:41.8}, "Kenji":{d:-5.3,w:43.7}
      },
      brawlBall: {
        "Gus":{d:8.1,w:48.1}, "Eve":{d:7.6,w:56.4}, "8-Bit":{d:7,w:49.3}, "Juju":{d:6.9,w:52.4},
        "Nani":{d:6.7,w:58.4}, "Pam":{d:6.7,w:52}, "Penny":{d:6.4,w:54.5}, "Amber":{d:6.3,w:42.2},
        "Mortis":{d:-7.5,w:43.2}, "Nori":{d:-6.5,w:30.5}, "Damian":{d:-5.8,w:29.9}, "Gigi":{d:-5.6,w:35.1},
        "Alli":{d:-5.4,w:41.7}, "Bolt":{d:-5.2,w:33}, "Edgar":{d:-5,w:50}, "Wendy":{d:-4.9,w:21.6}
      },
      deathmatch5v5: {
        "Larry & Lawrie":{d:6.4,w:64.1}, "Nita":{d:6.3,w:68.4}, "Sirius":{d:6.2,w:63.2}, "Lou":{d:5.7,w:63.7},
        "Charlie":{d:5,w:65}, "Lola":{d:4.5,w:65}, "Buster":{d:4.3,w:52.5}, "8-Bit":{d:4.1,w:48.8},
        "Bolt":{d:-10.6,w:28.3}, "Gigi":{d:-5.9,w:48.5}, "Mortis":{d:-5.5,w:48.1}, "Alli":{d:-4.9,w:54.2},
        "Damian":{d:-4.8,w:41}, "Draco":{d:-4.7,w:57}, "Nori":{d:-4.5,w:44.6}, "Ollie":{d:-4.4,w:53.1}
      },
      gemGrab: {
        "Hank":{d:8.2,w:45.5}, "Pam":{d:6.6,w:48.7}, "Buster":{d:6.5,w:50.9}, "Penny":{d:5.6,w:45.6},
        "Ash":{d:5.3,w:40.3}, "Larry & Lawrie":{d:5.2,w:49.1}, "Clancy":{d:5.1,w:41.5}, "Rosa":{d:4.9,w:45.7},
        "Edgar":{d:-8.3,w:30.2}, "Nori":{d:-8.3,w:24.2}, "Mortis":{d:-6.9,w:29.4}, "Bolt":{d:-6.6,w:17.6},
        "Starr Nova":{d:-5.1,w:25.3}, "Kaze":{d:-4.6,w:33.2}, "Alli":{d:-4,w:33.2}, "Buzz":{d:-3.4,w:39.2}
      },
      hotZone: {
        "R-T":{d:6.1,w:39.5}, "Gus":{d:5.4,w:47.3}, "Sirius":{d:5,w:39.5}, "Colette":{d:4.8,w:48.6},
        "Eve":{d:4.5,w:47.7}, "Ollie":{d:4.3,w:56.5}, "Bonnie":{d:4.1,w:57.6}, "Lola":{d:4,w:46.3},
        "Wendy":{d:-10.9,w:9.5}, "Mortis":{d:-10.7,w:29.1}, "Bolt":{d:-5.9,w:22}, "Mina":{d:-5.3,w:28.5},
        "Nori":{d:-5.3,w:24}, "Gene":{d:-5,w:57.3}, "Mico":{d:-4.7,w:32.5}, "Gray":{d:-4.5,w:32.9}
      },
      knockout: {
        "Lou":{d:7.3,w:56.6}, "Sirius":{d:7.3,w:53.5}, "Tara":{d:7.3,w:59.9}, "Jessie":{d:6.9,w:59.9},
        "Lumi":{d:6.4,w:57.5}, "8-Bit":{d:5.7,w:55.3}, "Sandy":{d:5.6,w:57.5}, "Pam":{d:5.5,w:59.7},
        "Bolt":{d:-13,w:25.1}, "Mortis":{d:-7.5,w:45.7}, "Gigi":{d:-6.9,w:40.3}, "Nori":{d:-6.9,w:37.6},
        "Edgar":{d:-6.3,w:54.2}, "Mico":{d:-6,w:41.4}, "Lily":{d:-5.7,w:46.6}, "Wendy":{d:-5.3,w:25.8}
      }
    }
  },
  "Pearl": {
    vs: {
      "Lily":{d:4.6,w:60.6}, "Gray":{d:4.4,w:53.5}, "Wendy":{d:4.4,w:37}, "Nori":{d:4.2,w:48.4},
      "Piper":{d:4.2,w:60.3}, "Bolt":{d:3.9,w:43.8}, "Nani":{d:3.5,w:54.1}, "Gus":{d:3.3,w:52.7},
      "Chuck":{d:-7.8,w:44.8}, "Pam":{d:-7.3,w:48.5}, "Jessie":{d:-6.4,w:45.7}, "Nita":{d:-4.4,w:48.4},
      "Sirius":{d:-4.2,w:44.7}, "Barley":{d:-3.9,w:54.3}, "Emz":{d:-3.7,w:50.7}, "Penny":{d:-3.7,w:50.1},
      "Colt":{w:62.3}, "Leon":{w:61.3}, "Edgar":{w:60.1}, "Damian":{w:42.7}, "Ash":{w:44.2}
    },
    with: {
      "Piper":{d:7}, "Brock":{d:6}, "Byron":{d:4.3}, "Rico":{d:4.3}, "Leon":{d:4}, "Rosa":{d:-14.3,w:37.9},
      "Ash":{d:-13.9}, "Barley":{d:-11.3,w:37.5}, "Jacky":{d:-10,w:44.1}, "Buster":{d:-9.6}, "Wendy":{w:75.5},
      "Bolt":{w:65.9}, "Nori":{w:64.3}, "Starr Nova":{w:63.7}, "Damian":{w:60.4}, "Ollie":{w:42.4},
      "Pam":{w:43.1}
    },
    modes: {
      bounty: {
        "Wendy":{d:9.5,w:38}, "Bolt":{d:7.2,w:39.5}, "Starr Nova":{d:5.6,w:48.9}, "Nori":{d:3.8,w:49.7},
        "Buzz":{d:3.7,w:60.3}, "Mina":{d:3.7,w:48.9}, "Shade":{d:3.6,w:50.5}, "Kaze":{d:3.5,w:52.8},
        "Pam":{d:-6.8,w:52.4}, "Charlie":{d:-5.3,w:49.8}, "Maisie":{d:-5.2,w:50.8}, "Hank":{d:-5,w:42.3},
        "Nita":{d:-5,w:53.4}, "Berry":{d:-4.7,w:55.5}, "El Primo":{d:-4.6,w:58.8}, "Eve":{d:-4.6,w:44.4}
      },
      brawlBall: {
        "Nani":{d:3.5,w:63.4}, "Mandy":{d:3.1,w:61.4}, "Berry":{d:3,w:58}, "Gus":{d:2.9,w:51.2},
        "Amber":{d:2.7,w:46.6}, "Byron":{d:2.7,w:60.7}, "Piper":{d:2.7,w:64.5}, "Bea":{d:2.5,w:56.4},
        "Sirius":{d:-7.4,w:42.5}, "Wendy":{d:-6.5,w:27}, "Damian":{d:-4.2,w:39.5}, "Najia":{d:-3.8,w:53.4},
        "Grom":{d:-3.6,w:54.7}, "Bull":{d:-3.1,w:55.7}, "Angelo":{d:-2.7,w:67.3},
        "Larry & Lawrie":{d:-2.7,w:47.8}
      },
      duels: {
        "Damian":{d:5.1,w:60.5}, "Mortis":{d:4.4,w:73.6}, "Starr Nova":{d:4,w:55.1}, "Bolt":{d:3.3,w:57.4},
        "Finx":{d:3.3,w:51.6}, "Surge":{d:3.3,w:64.1}, "Janet":{d:3.2,w:58.3}, "Mina":{d:3.2,w:57.7},
        "Mr. P":{d:-7.7,w:57.8}, "Larry & Lawrie":{d:-6.4,w:67.1}, "Nita":{d:-6.4,w:56.7},
        "Eve":{d:-5.7,w:57.9}, "El Primo":{d:-5.6,w:58.9}, "Amber":{d:-5.5,w:44.1}, "Berry":{d:-5.5,w:71.1},
        "Ash":{d:-5.4,w:52.5}
      },
      gemGrab: {
        "Bolt":{d:4.6,w:36.1}, "Mina":{d:3.8,w:47.2}, "Starr Nova":{d:3.2,w:42}, "Penny":{d:3,w:52.1},
        "Lily":{d:2.8,w:52.9}, "Mortis":{d:2.8,w:48}, "Gigi":{d:2.6,w:50.2}, "Tick":{d:2.4,w:49.6},
        "Buster":{d:-5.5,w:48.2}, "Jae-Yong":{d:-5.2,w:48}, "Mr. P":{d:-4.7,w:46.2},
        "Larry & Lawrie":{d:-4.5,w:48.7}, "Pam":{d:-4.1,w:47.2}, "Bonnie":{d:-4,w:56.1},
        "Frank":{d:-3.8,w:47.8}, "Grom":{d:-3.8,w:55.4}
      },
      knockout: {
        "Lily":{d:5.5,w:66.6}, "Kaze":{d:5,w:64.9}, "Mortis":{d:4.8,w:66.8}, "Alli":{d:4.3,w:64},
        "Nori":{d:4.3,w:57.7}, "Nani":{d:3.9,w:60.3}, "Stu":{d:3.9,w:63.9}, "Bolt":{d:3,w:49.7},
        "Sirius":{d:-6.9,w:48.3}, "Pam":{d:-6.6,w:56.3}, "Ash":{d:-6.3,w:54.3}, "Ollie":{d:-5.7,w:54.2},
        "Rosa":{d:-5.3,w:62.5}, "Ziggy":{d:-5.2,w:53.7}, "Clancy":{d:-3.9,w:65.8}, "Nita":{d:-3.8,w:63.6}
      }
    }
  },
  "Najia": {
    vs: {
      "Bea":{d:6.9,w:61.3}, "Lou":{d:4.2,w:53.3}, "Gus":{d:4.1,w:52.2}, "Maisie":{d:4,w:56.3},
      "Willow":{d:3.8,w:54.5}, "Pierce":{d:3.5,w:51.4}, "Piper":{d:3.4,w:58.1}, "Stu":{d:3.4,w:53.3},
      "Bolt":{d:-9.1,w:29.6}, "Kit":{d:-5.7,w:44.4}, "Damian":{d:-4,w:38.3}, "Edgar":{d:-4,w:54.1},
      "Bibi":{d:-3.8,w:48.6}, "Mortis":{d:-3.8,w:50.5}, "Sirius":{d:-3.6,w:44}, "Chuck":{d:-3.5,w:47.8},
      "Colt":{w:61.8}, "Shelly":{w:61.2}, "Crow":{w:60.3}, "Rico":{w:59.8}, "Wendy":{w:30.2},
      "Starr Nova":{w:41.4}, "Nori":{w:42}
    },
    with: {
      "Leon":{d:6.4}, "Piper":{d:5.1}, "Crow":{d:4.4}, "Byron":{d:4.2}, "Edgar":{d:3.7},
      "Jacky":{d:-15.1,w:38.1}, "Rosa":{d:-14.2,w:37.1}, "Hank":{d:-11.3}, "Sam":{d:-11.2,w:43.4},
      "Draco":{d:-10.3}, "Wendy":{w:69.6}, "Bolt":{w:63.7}, "Starr Nova":{w:58.5}, "Nori":{w:58.2},
      "Pearl":{w:57.5}, "Barley":{w:39.4}, "El Primo":{w:41.5}
    },
    modes: {
      bounty: {
        "El Primo":{d:4.8,w:72.1}, "Emz":{d:4.7,w:61.4}, "Bea":{d:4.4,w:61}, "Jacky":{d:4,w:72.3},
        "Lou":{d:4,w:65.1}, "Barley":{d:3.9,w:67.8}, "Meg":{d:3.9,w:62}, "Griff":{d:3.8,w:57.7},
        "Bolt":{d:-8.4,w:27.7}, "Kit":{d:-5.7,w:44}, "Lily":{d:-4.3,w:50.3}, "Edgar":{d:-3.9,w:50.6},
        "Mr. P":{d:-3.7,w:50.2}, "Damian":{d:-3.5,w:45.1}, "Mortis":{d:-3.5,w:48}, "Leon":{d:-3.4,w:51.6}
      },
      brawlBall: {
        "Lou":{d:6.1,w:46}, "Pam":{d:5,w:51.4}, "Piper":{d:5,w:59.9}, "Bea":{d:4.9,w:51.6},
        "Belle":{d:4.6,w:55.6}, "Nani":{d:4.4,w:57.3}, "8-Bit":{d:4.2,w:47.7}, "Byron":{d:3.9,w:54.7},
        "Bolt":{d:-7.5,w:31.9}, "Mico":{d:-5.6,w:45.8}, "Sirius":{d:-5.5,w:37.3}, "Kit":{d:-4.8,w:44.6},
        "Doug":{d:-3.8,w:38.9}, "Bibi":{d:-3.6,w:45.5}, "Damian":{d:-3.6,w:33.2}, "Buster":{d:-3.3,w:39.5}
      },
      knockout: {
        "Jessie":{d:6.5,w:62.4}, "Bea":{d:5.9,w:63.7}, "Sandy":{d:5.6,w:60.4}, "Lou":{d:5.2,w:57.5},
        "Draco":{d:5,w:61.9}, "Nani":{d:4.8,w:55.1}, "Gale":{d:4.6,w:60.4}, "Bo":{d:4.5,w:57.1},
        "Bolt":{d:-10.6,w:30.2}, "Kit":{d:-6.1,w:43.9}, "Damian":{d:-5.9,w:44.5}, "Edgar":{d:-5.9,w:57.3},
        "Sirius":{d:-4.4,w:44.7}, "Nori":{d:-4.3,w:43}, "Doug":{d:-4.2,w:48}, "Ollie":{d:-4.2,w:49.8}
      }
    }
  },
  "Sprout": {
    vs: {
      "Bea":{d:7.1,w:61.4}, "Gus":{d:5.5,w:53.6}, "Piper":{d:5.3,w:60}, "Rico":{d:4.7,w:63.1},
      "Belle":{d:4.5,w:58.3}, "Lola":{d:4.4,w:57.2}, "8-Bit":{d:4.3,w:52.1}, "Byron":{d:4.3,w:58.9},
      "Bolt":{d:-10.2,w:28.4}, "Mortis":{d:-8.2,w:46.1}, "Damian":{d:-8.1,w:34.1}, "Nori":{d:-6.5,w:36.4},
      "Alli":{d:-5.8,w:46.4}, "Lily":{d:-5.4,w:49.4}, "Kit":{d:-5.2,w:44.9}, "Doug":{d:-5,w:43},
      "Colt":{w:62.7}, "Crow":{w:62.4}, "Shelly":{w:61.5}, "Wendy":{w:27.5}, "Starr Nova":{w:38.6}
    },
    with: {
      "Leon":{d:7.4}, "Rico":{d:5.6}, "Piper":{d:5}, "Crow":{d:4.8}, "Edgar":{d:4.7}, "Chuck":{d:-8.6,w:44.7},
      "Trunk":{d:-8.5,w:45.7}, "Amber":{d:-7.7}, "Damian":{d:-7.4}, "Hank":{d:-7.4}, "Wendy":{w:72.6},
      "Bolt":{w:61}, "Nori":{w:59.8}, "Pearl":{w:57}, "Starr Nova":{w:56.9}, "Barley":{w:43.8},
      "Rosa":{w:45.3}, "El Primo":{w:46.6}
    },
    modes: {
      bounty: {
        "Gale":{d:6.4,w:66.8}, "Bea":{d:5.5,w:61.4}, "Tara":{d:5.3,w:65}, "Belle":{d:5.1,w:57.8},
        "8-Bit":{d:5,w:56.3}, "Emz":{d:4.8,w:60.8}, "Jacky":{d:4.6,w:72.2}, "Jessie":{d:4.4,w:60.4},
        "Bolt":{d:-10.1,w:25.4}, "Alli":{d:-7.9,w:44.6}, "Nori":{d:-7.5,w:41.9}, "Mico":{d:-7.4,w:41.6},
        "Mortis":{d:-7,w:43.9}, "Gigi":{d:-6.4,w:45.6}, "Shade":{d:-6.3,w:44.2}, "Ziggy":{d:-6,w:49}
      },
      brawlBall: {
        "Gus":{d:7.9,w:49.9}, "Lola":{d:7.5,w:55.7}, "R-T":{d:6.2,w:47.7}, "Bea":{d:6.1,w:53.6},
        "Rico":{d:5.8,w:61.2}, "8-Bit":{d:5.2,w:49.5}, "Amber":{d:5.1,w:42.8}, "Lou":{d:5.1,w:45.7},
        "Sirius":{d:-8.3,w:35.4}, "Damian":{d:-8.2,w:29.4}, "Wendy":{d:-7.9,w:20.2}, "Mortis":{d:-7.8,w:44.9},
        "Nori":{d:-7.6,w:31.3}, "Kit":{d:-7.1,w:43.2}, "Bolt":{d:-7,w:33.2}, "Alli":{d:-5.8,w:43.4}
      },
      knockout: {
        "Tara":{d:6.6,w:63.6}, "Charlie":{d:5.5,w:57.4}, "Bea":{d:5.2,w:64.5}, "8-Bit":{d:4.7,w:58.6},
        "Lola":{d:4.3,w:61}, "Jessie":{d:4.2,w:61.6}, "Colette":{d:4.1,w:67.1}, "Lou":{d:4,w:57.7},
        "Bolt":{d:-13.4,w:28.9}, "Nori":{d:-8.6,w:40.2}, "Mortis":{d:-7.4,w:50.2}, "Lily":{d:-7.2,w:49.5},
        "Mico":{d:-6.7,w:45.1}, "Damian":{d:-6.2,w:45.8}, "Alli":{d:-5.9,w:49.4}, "Ollie":{d:-5.9,w:49.6}
      }
    }
  },
  "Lily": {
    vs: {
      "Ziggy":{d:5.8,w:53}, "Sprout":{d:5.4,w:50.6}, "Grom":{d:4.5,w:53.6}, "Najia":{d:3.3,w:48.5},
      "Willow":{d:3.3,w:49.2}, "Barley":{d:3,w:55.2}, "Shade":{d:3,w:42.6}, "Tick":{d:2.8,w:48.4},
      "Doug":{d:-5.1,w:38.2}, "Pearl":{d:-4.6,w:39.4}, "R-T":{d:-3.9,w:36.7}, "Frank":{d:-2.8,w:45.9},
      "Hank":{d:-2.8,w:39.4}, "Wendy":{d:-2.7,w:24.8}, "Mortis":{d:-2.6,w:46.9}, "Bull":{d:-2.4,w:47.9},
      "Dynamike":{w:55.8}, "Colt":{w:55.2}, "Rico":{w:54.2}, "Leon":{w:54}, "Bolt":{w:33.6},
      "Damian":{w:36.2}
    },
    with: {
      "Bonnie":{d:6.1}, "Mr. P":{d:5.8}, "Gene":{d:4}, "Ollie":{d:3.9}, "Dynamike":{d:3.6},
      "Jacky":{d:-8.5,w:40.5}, "Cordelius":{d:-6.1,w:41.1}, "Buster":{d:-5.1}, "Damian":{d:-4.5},
      "Maisie":{d:-4.2}, "Wendy":{w:65.1}, "Bolt":{w:59.8}, "Starr Nova":{w:54.7}, "Bo":{w:54.3},
      "Janet":{w:54.2}, "Leon":{w:41}, "Pam":{w:41.2}, "Colt":{w:41.6}
    },
    modes: {
      bounty: {
        "Ziggy":{d:5.5,w:56.5}, "Grom":{d:5.1,w:53.4}, "Tick":{d:5,w:48.8}, "Sprout":{d:4.9,w:50.9},
        "Najia":{d:4.3,w:49.7}, "Willow":{d:4.2,w:56}, "Mico":{d:3.6,w:48.6}, "Dynamike":{d:2.9,w:54.8},
        "Jacky":{d:-10.1,w:54.1}, "Ash":{d:-5.4,w:48.5}, "Doug":{d:-5.1,w:44.8}, "Wendy":{d:-5.1,w:23.1},
        "Draco":{d:-4.6,w:49.9}, "Clancy":{d:-4.3,w:56}, "Rosa":{d:-4.1,w:52.4}, "Buster":{d:-4,w:51.5}
      },
      brawlBall: {
        "Janet":{d:5.2,w:53.8}, "Angelo":{d:5.1,w:68.2}, "Sprout":{d:5.1,w:53.7}, "Chuck":{d:4.9,w:58.1},
        "Ziggy":{d:4.8,w:50.8}, "Barley":{d:4.4,w:53.7}, "Grom":{d:3.9,w:54.5}, "Belle":{d:3.7,w:54.1},
        "Doug":{d:-6.6,w:35.5}, "Jacky":{d:-5.8,w:35}, "Damian":{d:-5.1,w:31.1}, "Wendy":{d:-4.9,w:22.1},
        "Sirius":{d:-4.3,w:37.9}, "Chester":{d:-3.7,w:39.7}, "Mortis":{d:-3.2,w:48.1}, "R-T":{d:-3.2,w:37}
      },
      gemGrab: {
        "Ziggy":{d:4.3,w:55.8}, "Mico":{d:3.9,w:48.8}, "Sprout":{d:3.6,w:54.5}, "Najia":{d:3.4,w:54.6},
        "Shade":{d:3,w:46.4}, "Barley":{d:2.9,w:61.8}, "Nori":{d:2.9,w:43.8}, "Dynamike":{d:2.5,w:54.7},
        "Jacky":{d:-5,w:50.3}, "R-T":{d:-4,w:42.8}, "Doug":{d:-3.8,w:40.3}, "Frank":{d:-3.1,w:48.3},
        "Pearl":{d:-2.8,w:47.1}, "Pam":{d:-2.7,w:48.5}, "Rosa":{d:-2.6,w:47.3}, "Ash":{d:-2.5,w:41.2}
      },
      hotZone: {
        "Ziggy":{d:6.4,w:51.1}, "Angelo":{d:4.7,w:61.9}, "Moe":{d:4,w:46.4}, "Gus":{d:3.3,w:49.2},
        "Rosa":{d:3.2,w:49.8}, "Belle":{d:3.1,w:60.9}, "Mico":{d:3,w:44.1}, "Max":{d:2.7,w:52.2},
        "Ash":{d:-5.4,w:35.3}, "Wendy":{d:-4.4,w:18.8}, "R-T":{d:-4.1,w:33.1}, "Pearl":{d:-3.9,w:45.1},
        "Doug":{d:-3.8,w:32}, "Fang":{d:-3.8,w:41.4}, "Shelly":{d:-3.5,w:46.4}, "Frank":{d:-3.1,w:38.3}
      },
      knockout: {
        "Sprout":{d:7.2,w:50.5}, "Ziggy":{d:7,w:54.8}, "Grom":{d:5.7,w:53.4}, "Tick":{d:4.8,w:51},
        "Squeak":{d:3.9,w:50.3}, "Barley":{d:3.7,w:57.4}, "Najia":{d:3.4,w:48.2}, "Willow":{d:3.2,w:51.7},
        "Doug":{d:-8.4,w:38.6}, "Pearl":{d:-5.5,w:33.4}, "Ash":{d:-4.1,w:45.4}, "Rosa":{d:-4,w:53.4},
        "Bull":{d:-3.8,w:55}, "Wendy":{d:-3.6,w:25.6}, "Buster":{d:-3.5,w:40.2}, "Frank":{d:-3.5,w:44.8}
      }
    }
  },
  "Mico": {
    vs: {
      "Chuck":{d:7.9,w:61.6}, "Jessie":{d:7.8,w:60.8}, "Sandy":{d:7.1,w:59.8}, "Penny":{d:6.5,w:61.3},
      "Ollie":{d:6.3,w:63.8}, "Larry & Lawrie":{d:6.1,w:61.5}, "Colette":{d:5.4,w:64.6},
      "Belle":{d:5.1,w:61.3}, "Wendy":{d:-8.9,w:24.6}, "Bolt":{d:-7.8,w:33.1}, "Mortis":{d:-7.4,w:49.2},
      "Nori":{d:-7,w:38.2}, "R-T":{d:-7,w:40.6}, "Doug":{d:-6.9,w:43.4}, "Mina":{d:-4.9,w:45.5},
      "Damian":{d:-4.5,w:40}, "Barley":{w:63.8}, "Crow":{w:63.7}, "Dynamike":{w:63.3}
    },
    with: {
      "Bull":{d:5.5}, "Emz":{d:5.5}, "Nita":{d:5.1,w:60.7}, "Rico":{d:4.6}, "Dynamike":{d:4.4},
      "Wendy":{d:-11.9,w:61.7}, "Damian":{d:-11.7}, "Jae-Yong":{d:-8.7,w:45.8}, "Bolt":{d:-8.6},
      "Mortis":{d:-8.4,w:44.7}, "Nori":{w:62.8}, "8-Bit":{w:61.2}, "Melodie":{w:60.3}, "Rosa":{w:45.5},
      "Ollie":{w:45.9}, "Poco":{w:47.4}
    },
    modes: {
      bounty: {
        "Sprout":{d:7.4,w:58.4}, "Grom":{d:5.5,w:58.8}, "Willow":{d:4.9,w:61.7}, "Bo":{d:4.8,w:54.6},
        "Ziggy":{d:4.7,w:60.7}, "Dynamike":{d:4.6,w:61.5}, "Squeak":{d:4.5,w:56.4}, "Belle":{d:4.4,w:58.1},
        "Bolt":{d:-7.9,w:28.6}, "Sam":{d:-6.5,w:51.1}, "Wendy":{d:-6.2,w:26.2}, "Doug":{d:-5.8,w:49.1},
        "Jae-Yong":{d:-5.6,w:50.7}, "Carl":{d:-4.9,w:47}, "Berry":{d:-4.7,w:59.8}, "Kenji":{d:-4.5,w:47.8}
      },
      brawlBall: {
        "Gus":{d:7.2,w:47}, "Barley":{d:6.7,w:55.1}, "Belle":{d:5.9,w:55.4}, "Lola":{d:5.9,w:51.9},
        "Najia":{d:5.6,w:54.2}, "Finx":{d:5.3,w:48.1}, "Sprout":{d:4.4,w:52.1}, "Janet":{d:4.3,w:52.1},
        "Wendy":{d:-9.1,w:17.3}, "Mortis":{d:-6.9,w:43.6}, "Doug":{d:-6.1,w:35.2}, "Bolt":{d:-6,w:32},
        "Nori":{d:-6,w:30.8}, "Stu":{d:-5.4,w:38.2}, "Gigi":{d:-5,w:35.5}, "Mina":{d:-4.8,w:38.4}
      },
      gemGrab: {
        "Sprout":{d:8.6,w:64.6}, "Bo":{d:5.1,w:50.1}, "Mandy":{d:5.1,w:60}, "Gus":{d:5,w:57.9},
        "Dynamike":{d:4.6,w:61.8}, "Lola":{d:4.6,w:59.6}, "Belle":{d:4.4,w:67.1}, "Meg":{d:4.3,w:55.6},
        "Bolt":{d:-9.3,w:26.6}, "Melodie":{d:-6.9,w:52.3}, "Trunk":{d:-4.9,w:48.4}, "Carl":{d:-4.7,w:48.1},
        "Sam":{d:-4.5,w:50}, "Kenji":{d:-4.3,w:46.4}, "Doug":{d:-4.2,w:44.9}, "Lily":{d:-3.9,w:51.2}
      },
      heist: {
        "Sprout":{d:10.3,w:73}, "Ziggy":{d:10.1,w:72.7}, "Juju":{d:9.6,w:67.9},
        "Larry & Lawrie":{d:9.4,w:76.8}, "Janet":{d:8.7,w:75.5}, "Bo":{d:8,w:69}, "Willow":{d:8,w:70},
        "Squeak":{d:7.6,w:77.9}, "R-T":{d:-11.2,w:40.5}, "Cordelius":{d:-6.4,w:53.7},
        "Melodie":{d:-4.3,w:49.2}, "Otis":{d:-4.3,w:65.2}, "Gigi":{d:-3.9,w:46.5}, "Nori":{d:-3.9,w:37},
        "Bull":{d:-3.6,w:52.7}, "Shade":{d:-3.6,w:47.9}
      },
      hotZone: {
        "Belle":{d:8.7,w:75}, "Sandy":{d:7.9,w:58.2}, "Lola":{d:6.2,w:61.5}, "Ziggy":{d:6.1,w:59.8},
        "Ruffs":{d:5.7,w:56.6}, "Dynamike":{d:5.4,w:62.2}, "Sprout":{d:4.9,w:62}, "Grom":{d:4.7,w:67.5},
        "R-T":{d:-9.6,w:36.3}, "Nori":{d:-8,w:33.2}, "Trunk":{d:-7.6,w:39.1}, "Bolt":{d:-7,w:32.5},
        "Doug":{d:-6.2,w:38.2}, "Wendy":{d:-5.8,w:24.3}, "Kenji":{d:-5.4,w:40.2}, "Sam":{d:-4.7,w:47.5}
      },
      knockout: {
        "Sprout":{d:6.7,w:54.9}, "Bo":{d:6.5,w:58.9}, "Grom":{d:6,w:58.6}, "Ziggy":{d:5.9,w:58.6},
        "Belle":{d:5.5,w:59.1}, "Jessie":{d:5.3,w:61}, "Sandy":{d:5,w:59.5}, "Tara":{d:4.7,w:59.9},
        "Bolt":{d:-12.6,w:27.9}, "Wendy":{d:-10.8,w:22.7}, "Frank":{d:-8.1,w:45.2}, "Hank":{d:-7.8,w:42.8},
        "Doug":{d:-6.6,w:45.4}, "Kit":{d:-5.3,w:44.5}, "Nori":{d:-5.2,w:41.8}, "Carl":{d:-4.9,w:45.2}
      }
    }
  },
  "Squeak": {
    vs: {
      "Lumi":{d:4.9,w:48.3}, "R-T":{d:4.9,w:48.1}, "Amber":{d:4.8,w:48.1}, "Gus":{d:4.5,w:50.4},
      "Lola":{d:4.2,w:54.8}, "Charlie":{d:4.1,w:53.5}, "Maisie":{d:4.1,w:54.1}, "Bea":{d:4,w:56.2},
      "Bolt":{d:-6.7,w:29.9}, "Chuck":{d:-4.9,w:44.2}, "Mortis":{d:-4.9,w:47.2}, "Kenji":{d:-4.2,w:44.8},
      "Mico":{d:-3.9,w:41.5}, "Edgar":{d:-3.8,w:52.1}, "Bibi":{d:-3.5,w:46.7}, "Kaze":{d:-3,w:44.3},
      "Shelly":{w:59.6}, "Colt":{w:58.5}, "Rico":{w:58.4}, "Leon":{w:56.5}, "Crow":{w:56.3}, "Wendy":{w:27.5},
      "Damian":{w:37.8}, "Nori":{w:38.1}, "Starr Nova":{w:39}
    },
    with: {
      "Eve":{d:7.3}, "Shelly":{d:5.7}, "Sam":{d:4.5}, "Hank":{d:3.6,w:59.6}, "Bibi":{d:3.4},
      "Ollie":{d:-7,w:41.1}, "Lumi":{d:-6.4}, "Amber":{d:-5.7}, "Lou":{d:-5}, "Otis":{d:-4.9},
      "Wendy":{w:71.6}, "Bolt":{w:65}, "Ash":{w:58.2}, "Starr Nova":{w:57.7}, "Colt":{w:43.4},
      "Cordelius":{w:45.2}, "Leon":{w:45.4}, "Crow":{w:45.5}
    },
    modes: {
      bounty: {
        "Lola":{d:6.3,w:62.3}, "Ruffs":{d:5.3,w:55.6}, "Finx":{d:5,w:59.5}, "Glowy":{d:4.8,w:58.1},
        "8-Bit":{d:4.3,w:54.8}, "Amber":{d:4.1,w:55.2}, "Lumi":{d:4.1,w:58.9}, "Pam":{d:3.5,w:65.3},
        "Bolt":{d:-5.6,w:29.1}, "Kenji":{d:-5.3,w:45.1}, "Mico":{d:-4.5,w:43.6}, "Edgar":{d:-4,w:48.9},
        "Nori":{d:-3.5,w:45.1}, "Rosa":{d:-3.2,w:56.4}, "Mortis":{d:-2.9,w:47.1}, "Wendy":{d:-2.7,w:28.1}
      },
      brawlBall: {
        "Chuck":{d:8.6,w:64.2}, "Gus":{d:8.4,w:51.5}, "Angelo":{d:6.9,w:72.2}, "Amber":{d:6.2,w:44.9},
        "Lola":{d:6.2,w:55.5}, "8-Bit":{d:5.7,w:51.1}, "Penny":{d:5.2,w:56.4}, "Belle":{d:4.8,w:57.7},
        "Mortis":{d:-6.6,w:47.3}, "Wendy":{d:-5.7,w:23.3}, "Nori":{d:-5.5,w:34.5}, "Damian":{d:-4.8,w:33.8},
        "Starr Nova":{d:-4.7,w:34.4}, "Tick":{d:-4.4,w:44.2}, "Bolt":{d:-4.1,w:37.1}, "Kenji":{d:-4,w:45.4}
      },
      brawlBall5V5: {
        "Shade":{d:9.5,w:57.5}, "Gus":{d:8.4,w:57.2}, "Lumi":{d:8.3,w:53.3}, "Meeple":{d:8,w:61.4},
        "8-Bit":{d:7.3,w:48.5}, "Otis":{d:7.3,w:52.5}, "Meg":{d:6.1,w:47.5}, "Amber":{d:6,w:49.1},
        "Bolt":{d:-8,w:25.5}, "Edgar":{d:-5.3,w:48.8}, "Cordelius":{d:-4.4,w:52}, "Mortis":{d:-4.1,w:46.6},
        "Bibi":{d:-3.6,w:43.6}, "Damian":{d:-3,w:36.7}, "Fang":{d:-2.9,w:45.8}, "Nori":{d:-2.9,w:39.1}
      },
      deathmatch5v5: {
        "Nita":{d:8.1,w:69.2}, "Hank":{d:6.5,w:67.8}, "Trunk":{d:6.4,w:67.4}, "Finx":{d:6.3,w:64.7},
        "Lumi":{d:6.1,w:66.7}, "Pam":{d:5.2,w:62.5}, "Rosa":{d:4.9,w:63.5}, "8-Bit":{d:4.8,w:48.4},
        "Bolt":{d:-6.1,w:31.8}, "Gigi":{d:-4.7,w:48.6}, "Nori":{d:-4.5,w:43.5}, "Alli":{d:-3.5,w:54.6},
        "Wendy":{d:-3.5,w:32.7}, "Mico":{d:-3.1,w:51.6}, "Najia":{d:-3.1,w:49.3}, "Mortis":{d:-2.9,w:49.5}
      },
      gemGrab: {
        "R-T":{d:4.9,w:51.4}, "Hank":{d:4.1,w:50.1}, "Sirius":{d:3.6,w:46.9}, "Ruffs":{d:3.5,w:47},
        "Buster":{d:3.4,w:56.7}, "Gus":{d:3.2,w:50.8}, "Lumi":{d:2.9,w:47.4}, "Tara":{d:2.5,w:46.6},
        "Bolt":{d:-8.2,w:23}, "Wendy":{d:-8.2,w:18.3}, "Nori":{d:-5.4,w:35.3}, "Mortis":{d:-4.7,w:40.2},
        "Bo":{d:-3,w:36.9}, "Chuck":{d:-3,w:44.6}, "Starr Nova":{d:-2.9,w:35.5}, "Edgar":{d:-2.7,w:44.6}
      },
      hotZone: {
        "Lola":{d:7.3,w:56.6}, "Charlie":{d:6.5,w:62.5}, "Gus":{d:5.9,w:54.8}, "R-T":{d:4.8,w:44.9},
        "Mandy":{d:4.1,w:60}, "Angelo":{d:4,w:64.1}, "Rico":{d:3.9,w:59.6}, "Nani":{d:3.6,w:57.8},
        "Bolt":{d:-6.8,w:27.1}, "Wendy":{d:-6.4,w:18.9}, "Nori":{d:-5.4,w:30.1}, "Mortis":{d:-4.6,w:42.1},
        "Kenji":{d:-4.3,w:35.6}, "Starr Nova":{d:-4.2,w:31.3}, "Mico":{d:-3.8,w:40.3}, "Kaze":{d:-3.5,w:41.1}
      },
      knockout: {
        "Hank":{d:5.1,w:54.3}, "Buster":{d:4.8,w:52.1}, "Sirius":{d:4.3,w:51.7}, "Lumi":{d:4,w:56.3},
        "Sandy":{d:3.9,w:57}, "Tara":{d:3.9,w:57.8}, "Penny":{d:3.7,w:54.6}, "Jessie":{d:3.6,w:57.9},
        "Bolt":{d:-7,w:32.2}, "Rosa":{d:-5.1,w:55.7}, "Edgar":{d:-4,w:57.7}, "Lily":{d:-3.9,w:49.7},
        "Nori":{d:-3.5,w:42.2}, "Mico":{d:-3.4,w:45.3}, "Kaze":{d:-3.3,w:49.1}, "Mina":{d:-3.2,w:45.1}
      },
      knockout5V5: {
        "Lumi":{d:9.7,w:48}, "Otis":{d:8.3,w:58.3}, "Gray":{d:3.8,w:40.9}, "Lou":{d:3.7,w:54},
        "Belle":{d:3.2,w:50.1}, "Jacky":{d:3.1,w:62.9}, "Barley":{d:3,w:59.2}, "Lola":{d:2.9,w:52.4},
        "Wendy":{d:-8,w:30.3}, "Damian":{d:-7.7,w:38.5}, "Bolt":{d:-6.5,w:43.8}, "Draco":{d:-5.8,w:39},
        "Mico":{d:-3.4,w:43.9}, "Ash":{d:-3.1,w:31.6}, "Mr. P":{d:-2.9,w:41.9}, "Chester":{d:-2.8,w:47.8}
      }
    }
  },
  "Dynamike": {
    vs: {
      "Frank":{d:5.7,w:51.1}, "Sirius":{d:4.9,w:44.5}, "Hank":{d:4.5,w:43.4}, "8-Bit":{d:4.1,w:44},
      "Jessie":{d:3.8,w:46.4}, "Emz":{d:3.6,w:48.6}, "Nita":{d:3.6,w:47.1}, "Pam":{d:3.4,w:49.8},
      "Mortis":{d:-6.3,w:39.9}, "Kaze":{d:-5.7,w:35.7}, "Nori":{d:-5.2,w:30.1}, "Bolt":{d:-4.9,w:26.5},
      "Mina":{d:-4.6,w:35.6}, "Alli":{d:-4.4,w:39.8}, "Wendy":{d:-4.4,w:20.5}, "Stu":{d:-4.3,w:37.6},
      "Shelly":{w:52.9}, "Rico":{w:52.4}, "Crow":{w:51.1}, "Colt":{w:51}, "Starr Nova":{w:31.8},
      "Shade":{w:33.9}
    },
    with: {
      "Sam":{d:6.5}, "Jacky":{d:5.9}, "Ollie":{d:5.1}, "Rosa":{d:4.8}, "Hank":{d:4.5,w:54.7},
      "Rico":{d:-3,w:36}, "Spike":{d:-3}, "Colt":{d:-2.8,w:34.9}, "Crow":{d:-2.5,w:36.4}, "Frank":{d:-2.2},
      "Wendy":{w:66.4}, "Bolt":{w:59.7}, "Damian":{w:57.7}, "Starr Nova":{w:55.6}, "Shelly":{w:37.3},
      "Leon":{w:38.1}
    },
    modes: {
      airHockey: {
        "Frank":{d:5.5,w:50.9}, "Charlie":{d:5.4,w:54.2}, "Otis":{d:4.3,w:56.4}, "Pearl":{d:4,w:56.7},
        "Jacky":{d:3.8,w:48.3}, "Pam":{d:3.7,w:59.6}, "Tara":{d:3.7,w:48.4}, "Cordelius":{d:3.3,w:51.3},
        "Bolt":{d:-4.9,w:26.1}, "Wendy":{d:-4.3,w:24.1}, "Alli":{d:-4.2,w:38.4}, "Mortis":{d:-4.1,w:40.5},
        "Nori":{d:-4,w:32.9}, "Gray":{d:-3.9,w:35.6}, "Mico":{d:-3.7,w:41.8}, "Trunk":{d:-3.7,w:37}
      },
      bounty: {
        "Frank":{d:7.1,w:57}, "Buster":{d:5.9,w:59.6}, "Pam":{d:5.2,w:62.3}, "Tara":{d:5,w:59},
        "Doug":{d:4.7,w:52.7}, "Emz":{d:4.7,w:54.9}, "Griff":{d:4.4,w:51.8}, "8-Bit":{d:4.2,w:49.7},
        "Bolt":{d:-7.8,w:22.6}, "Mortis":{d:-7.2,w:37.8}, "Mico":{d:-4.6,w:38.5}, "Angelo":{d:-4.4,w:41.1},
        "Nori":{d:-4.3,w:39.3}, "Wendy":{d:-4.3,w:22.4}, "Alli":{d:-4.1,w:42.6}, "Gray":{d:-3.9,w:40.2}
      },
      brawlArena: {
        "Hank":{d:5,w:48.4}, "Frank":{d:3.4,w:58.4}, "Meg":{d:3.4,w:53.5}, "8-Bit":{d:2.9,w:41.5},
        "Clancy":{d:2.8,w:60.2}, "Jessie":{d:2.6,w:52.9}, "Buster":{d:2.3,w:46.3}, "Emz":{d:2.3,w:51.8},
        "Bolt":{d:-8,w:31.5}, "Mortis":{d:-7,w:51.5}, "Mina":{d:-6.2,w:46.7}, "Gray":{d:-5.8,w:38.8},
        "Nori":{d:-5.3,w:35.3}, "Wendy":{d:-5.1,w:20.5}, "Kenji":{d:-5,w:45.4}, "Kaze":{d:-4.6,w:52.1}
      },
      brawlBall: {
        "Sirius":{d:7.4,w:45.4}, "Frank":{d:6.2,w:50.9}, "Doug":{d:4.5,w:42.3}, "Emz":{d:4.5,w:48.9},
        "Nita":{d:4.4,w:45.8}, "Hank":{d:4.3,w:42.5}, "8-Bit":{d:3.5,w:42.2}, "Jessie":{d:3.4,w:43.6},
        "Mortis":{d:-6.7,w:40.2}, "Kaze":{d:-6.1,w:34.4}, "Alli":{d:-5.1,w:38.2}, "Nori":{d:-4.8,w:28.8},
        "Mina":{d:-4.7,w:35}, "Gray":{d:-3.9,w:38.1}, "Mico":{d:-3.9,w:42.5}, "Stu":{d:-3.8,w:36.3}
      },
      brawlBall5V5: {
        "Gus":{d:10,w:55.3}, "Shade":{d:8.4,w:52.9}, "Lumi":{d:8,w:49.6}, "Lola":{d:7.7,w:56.9},
        "Meeple":{d:7.4,w:57.3}, "8-Bit":{d:7.2,w:45.1}, "Buster":{d:6.8,w:48.9}, "Otis":{d:6.4,w:48.2},
        "Bolt":{d:-7.2,w:23.4}, "Mortis":{d:-5.2,w:42}, "Edgar":{d:-4.5,w:46.2}, "Buzz":{d:-4.2,w:48.9},
        "Tick":{d:-3.6,w:41}, "Nori":{d:-3.1,w:35.6}, "Fang":{d:-3,w:42.3}, "Damian":{d:-2.8,w:33.6}
      },
      deathmatch5v5: {
        "Ash":{d:7.1,w:57.1}, "Hank":{d:7.1,w:63.3}, "8-Bit":{d:6.8,w:45.4}, "Pearl":{d:6.1,w:51.9},
        "Sam":{d:5.2,w:59.1}, "R-T":{d:4.7,w:54.6}, "Charlie":{d:4.4,w:58.2}, "Trunk":{d:4.4,w:60.3},
        "Bolt":{d:-7.1,w:25.9}, "Mortis":{d:-4.3,w:42.9}, "Lily":{d:-3.4,w:43.5}, "Grom":{d:-3.2,w:40.5},
        "Nori":{d:-3.2,w:39.6}, "Tick":{d:-2.5,w:42.7}, "Fang":{d:-2.2,w:45.6}, "Edgar":{d:-2,w:47.5}
      },
      gemGrab: {
        "Frank":{d:5.2,w:54.4}, "Jacky":{d:4.1,w:57.3}, "Buster":{d:4,w:55.3}, "Sirius":{d:3.9,w:45.3},
        "Tara":{d:3.8,w:45.9}, "Jessie":{d:3.7,w:47.8}, "8-Bit":{d:3.6,w:48}, "Pam":{d:3.3,w:52.3},
        "Bolt":{d:-8.8,w:20.8}, "Wendy":{d:-6.8,w:18.1}, "Mortis":{d:-6.7,w:36.2}, "Alli":{d:-5.9,w:38},
        "Nori":{d:-5.9,w:32.9}, "Kaze":{d:-5.7,w:38.9}, "Mico":{d:-4.6,w:38.2}, "Starr Nova":{d:-4.4,w:32.2}
      },
      heist: {
        "Hank":{d:3.8,w:43.5}, "Ollie":{d:3.7,w:88.3}, "Emz":{d:3.6,w:45.3}, "Maisie":{d:3.4,w:64.4},
        "Frank":{d:3.1,w:62.7}, "8-Bit":{d:2.8,w:43.3}, "Poco":{d:2.8,w:68.6}, "Gale":{d:2.6,w:67.7},
        "Kaze":{d:-7.6,w:30.8}, "Mortis":{d:-6.8,w:52.5}, "Shade":{d:-6.4,w:31.8}, "Alli":{d:-6.2,w:44.8},
        "Nori":{d:-6,w:22.7}, "Starr Nova":{d:-5.6,w:33.7}, "Bolt":{d:-5.4,w:37.3}, "Janet":{d:-4.6,w:49.5}
      },
      hotZone: {
        "Frank":{d:6.9,w:50.4}, "Charlie":{d:5.9,w:61.2}, "Nita":{d:4.8,w:44.9}, "Gus":{d:4.5,w:52.6},
        "Bonnie":{d:4.4,w:64.1}, "Shelly":{d:4.1,w:56.1}, "Hank":{d:4,w:38.7}, "Jessie":{d:3.9,w:43.1},
        "Mortis":{d:-9.4,w:36.6}, "Wendy":{d:-9.2,w:15.5}, "Nori":{d:-8.2,w:26.6}, "Bolt":{d:-8,w:25.2},
        "Kaze":{d:-6.3,w:37.5}, "Chuck":{d:-5.4,w:34.6}, "Mico":{d:-5.4,w:37.8}, "Gray":{d:-5.1,w:38.4}
      },
      knockout: {
        "Frank":{d:7.4,w:49.3}, "Rosa":{d:7,w:57.9}, "Ash":{d:6.8,w:49.9}, "Doug":{d:6.2,w:46.8},
        "Hank":{d:5.7,w:45}, "Clancy":{d:5.6,w:58.7}, "Buster":{d:5.5,w:42.9}, "Sirius":{d:4.9,w:42.6},
        "Mortis":{d:-6.7,w:37.7}, "Bolt":{d:-5.8,w:24.3}, "Kaze":{d:-5.5,w:36.9}, "Alli":{d:-5.1,w:37.1},
        "Mico":{d:-4.6,w:34.1}, "Nori":{d:-4.3,w:31.6}, "Gray":{d:-3.9,w:33.1}, "Wendy":{d:-3.6,w:20.5}
      },
      knockout5V5: {
        "Lumi":{d:5.9,w:41.3}, "Rosa":{d:4.8,w:44.9}, "Lou":{d:4.7,w:52}, "Otis":{d:4.3,w:51.4},
        "Charlie":{d:4.2,w:57.6}, "Clancy":{d:3.3,w:54.9}, "Pam":{d:3.1,w:52.2},
        "Larry & Lawrie":{d:2.9,w:56.2}, "Wendy":{d:-6.1,w:29.5}, "Kaze":{d:-4.6,w:41.1},
        "Alli":{d:-3.8,w:43.8}, "Najia":{d:-3.6,w:43.6}, "Janet":{d:-3.4,w:36.3}, "Mortis":{d:-3.3,w:43.5},
        "Draco":{d:-2.9,w:38.9}, "Mico":{d:-2.7,w:41.7}
      }
    }
  },
  "Chester": {
    vs: {
      "Kaze":{d:3.7,w:53.7}, "Melodie":{d:2.7,w:54}, "Jae-Yong":{d:2.3,w:55.4}, "Buzz":{d:2.2,w:56.9},
      "Gene":{d:2,w:57.6}, "Shelly":{d:2,w:62.6}, "Alli":{d:1.9,w:54.8}, "Nori":{d:1.8,w:45.3},
      "Wendy":{d:-6.4,w:25.6}, "Sirius":{d:-5.9,w:42.3}, "Ash":{d:-4.2,w:41}, "Tick":{d:-3.1,w:47.9},
      "Najia":{d:-2.8,w:47.8}, "Grom":{d:-2.5,w:52}, "Mandy":{d:-2.4,w:48.7}, "Willow":{d:-2.3,w:49.1},
      "Colt":{w:61.5}, "Leon":{w:60.2}, "Barley":{w:59.2}, "Edgar":{w:59.2}, "Bolt":{w:39.7},
      "Damian":{w:41.5}
    },
    with: {
      "Rico":{d:4.9}, "Shelly":{d:4.9}, "Ollie":{d:4.8}, "Crow":{d:4.6}, "Rosa":{d:3.9},
      "Kit":{d:-8.5,w:46.7}, "Nani":{d:-8.1,w:47.9}, "Mandy":{d:-7.5,w:47.4}, "Mico":{d:-6.6},
      "Amber":{d:-5.9}, "Wendy":{w:68.3}, "Bolt":{w:63.4}, "Ash":{w:62.1}, "Damian":{w:60.4},
      "Starr Nova":{w:59.1}, "Mortis":{w:47.1}, "Angelo":{w:48}
    },
    modes: {
      airHockey: {
        "Gene":{d:6.8,w:76.3}, "Barley":{d:6.5,w:74.5}, "Alli":{d:5.9,w:59.4}, "Nani":{d:5.1,w:60.4},
        "Ruffs":{d:4.9,w:55.3}, "Pam":{d:4.5,w:70.8}, "Larry & Lawrie":{d:4.2,w:71.1}, "Berry":{d:4,w:72.5},
        "Wendy":{d:-4.6,w:33.4}, "Sirius":{d:-3.4,w:46.9}, "Willow":{d:-3.1,w:47}, "Clancy":{d:-2.4,w:50},
        "Tick":{d:-2.4,w:54.5}, "Draco":{d:-2.3,w:47.1}, "Sam":{d:-2.2,w:46.9}, "Lola":{d:-2.1,w:50.4}
      },
      bounty: {
        "Chuck":{d:7.4,w:59.6}, "Jacky":{d:6.9,w:70.3}, "Draco":{d:6.7,w:60.4}, "Sam":{d:6.7,w:58.6},
        "Kaze":{d:6,w:54.2}, "Gigi":{d:5.6,w:52.9}, "Glowy":{d:5,w:54.4}, "Ollie":{d:5,w:69},
        "Buster":{d:-4.6,w:50.2}, "Grom":{d:-4.5,w:43.1}, "Sirius":{d:-4.4,w:40.9}, "Emz":{d:-3.9,w:47.5},
        "Mr. P":{d:-3.6,w:44.9}, "Najia":{d:-3.1,w:41.6}, "Surge":{d:-3.1,w:44.2}, "Dynamike":{d:-3,w:48.1}
      },
      brawlBall: {
        "Gene":{d:6.9,w:68.8}, "Nani":{d:5.9,w:64.7}, "Angelo":{d:5.2,w:74.2}, "Belle":{d:4.2,w:61.1},
        "Chuck":{d:3.9,w:63.6}, "Lily":{d:3.7,w:60.3}, "Kaze":{d:3.4,w:54.9}, "Jae-Yong":{d:3.2,w:57.6},
        "Sirius":{d:-6.3,w:42.6}, "Wendy":{d:-5.7,w:26.8}, "Ash":{d:-4.6,w:37}, "Tick":{d:-2.5,w:50.3},
        "Willow":{d:-2.5,w:47.4}, "Frank":{d:-2.1,w:53.6}, "Eve":{d:-1.9,w:54.2}, "Damian":{d:-1.8,w:40.8}
      },
      duels: {
        "Jessie":{d:5.4,w:66.5}, "Kaze":{d:4.8,w:58.8}, "Kenji":{d:3.4,w:67.9}, "Shelly":{d:3.4,w:58.2},
        "Rico":{d:3.1,w:62.3}, "Leon":{d:2.8,w:62.1}, "Mortis":{d:2.7,w:66.7}, "Buster":{d:2.6,w:66.6},
        "Wendy":{d:-11.2,w:26.4}, "Sam":{d:-5.1,w:44}, "Ash":{d:-5,w:47.2}, "Glowy":{d:-4.3,w:35.7},
        "Sirius":{d:-3.9,w:49.1}, "Meeple":{d:-3.8,w:40}, "Moe":{d:-3.7,w:39.4}, "R-T":{d:-3.5,w:34.3}
      },
      gemGrab: {
        "Sprout":{d:5.5,w:61.8}, "Barley":{d:5.3,w:69.3}, "Belle":{d:4.9,w:67.9}, "Angelo":{d:4.8,w:64.1},
        "Lola":{d:4.3,w:59.7}, "Gus":{d:3.9,w:57.1}, "Jae-Yong":{d:3.8,w:62.1}, "Chuck":{d:3.5,w:56.8},
        "Wendy":{d:-4.2,w:26.8}, "Sirius":{d:-3.4,w:45.5}, "Tara":{d:-2.8,w:46.9}, "Mico":{d:-2.2,w:48.1},
        "Ash":{d:-1.9,w:47.3}, "Janet":{d:-1.5,w:46.5}, "Surge":{d:-1.5,w:49.5}, "Bo":{d:-1.4,w:43.9}
      },
      hotZone: {
        "Gigi":{d:6.6,w:59.8}, "Jae-Yong":{d:6.2,w:67.6}, "Gus":{d:6,w:61.5}, "Sprout":{d:5.2,w:62.9},
        "Kaze":{d:4.8,w:56.1}, "Gene":{d:4.5,w:78.6}, "Bonnie":{d:4.1,w:70.7}, "Belle":{d:3.7,w:70.5},
        "Wendy":{d:-8.5,w:22.2}, "Sirius":{d:-4.3,w:43.4}, "Frank":{d:-3.5,w:47.4}, "Charlie":{d:-3.2,w:59.3},
        "Hank":{d:-3.2,w:38.4}, "Ollie":{d:-2,w:63.4}, "Bibi":{d:-1.9,w:45}, "Buster":{d:-1.9,w:53.1}
      },
      knockout: {
        "Rosa":{d:7,w:65}, "Chuck":{d:6.8,w:62.4}, "Trunk":{d:5.6,w:64.4}, "Alli":{d:4.9,w:54.2},
        "Buzz":{d:4.7,w:58.8}, "El Primo":{d:4.6,w:63.8}, "Nita":{d:4.5,w:62}, "Kaze":{d:4.3,w:53.8},
        "Sirius":{d:-8.6,w:36.1}, "Wendy":{d:-8.1,w:21.7}, "Tick":{d:-4.9,w:42}, "Grom":{d:-4.3,w:44.2},
        "Juju":{d:-3.9,w:42.7}, "Eve":{d:-3.3,w:41.3}, "Mico":{d:-3.2,w:42.6}, "Meeple":{d:-3.1,w:42}
      }
    }
  },
  "Belle": {
    vs: {
      "Jacky":{d:4.2,w:52}, "Bea":{d:3.3,w:53.8}, "Maisie":{d:3.1,w:51.5}, "Melodie":{d:2.5,w:49.3},
      "Gus":{d:2.4,w:46.7}, "Ollie":{d:2.3,w:53.6}, "Colette":{d:2.2,w:55.3}, "Crow":{d:2.2,w:56.9},
      "Chuck":{d:-6.4,w:41.1}, "Mico":{d:-5.1,w:38.7}, "Sprout":{d:-4.5,w:41.7}, "Mortis":{d:-4.1,w:46.4},
      "Alli":{d:-3.9,w:44.5}, "Eve":{d:-3.5,w:45.5}, "Ziggy":{d:-3.5,w:44.7}, "Bonnie":{d:-3.2,w:47.3},
      "Colt":{w:58.2}, "Rico":{w:56.9}, "Shelly":{w:56.6}, "Wendy":{w:28.8}, "Bolt":{w:33.1},
      "Damian":{w:37.7}, "Nori":{w:38.4}
    },
    with: {
      "Wendy":{d:6.2,w:75}, "Gray":{d:4.9,w:58.4}, "Surge":{d:4.7}, "Gene":{d:4}, "Sprout":{d:3.7},
      "Jacky":{d:-12.5,w:37.4}, "Sandy":{d:-9.3}, "Charlie":{d:-9.1}, "Nita":{d:-9}, "Trunk":{d:-9},
      "Bolt":{w:65}, "Nori":{w:59.8}, "Starr Nova":{w:58.6}, "Shelly":{w:38.4}, "Barley":{w:39},
      "Rosa":{w:40.1}, "El Primo":{w:40.3}
    },
    modes: {
      bounty: {
        "Ollie":{d:6,w:71.9}, "Jacky":{d:5.8,w:71.1}, "Otis":{d:4.6,w:61}, "Bull":{d:4,w:62.9},
        "Rosa":{d:3.7,w:61.4}, "Bibi":{d:3.5,w:54.4}, "Clancy":{d:3.5,w:65}, "Frank":{d:3.5,w:56.4},
        "Sprout":{d:-5.1,w:42.2}, "Draco":{d:-5,w:50.7}, "Mico":{d:-4.4,w:41.9}, "Willow":{d:-4.2,w:48.9},
        "Alli":{d:-3.9,w:46}, "Meg":{d:-3.2,w:51.7}, "Sirius":{d:-2.8,w:44.5}, "Kaze":{d:-2.6,w:47.6}
      },
      brawlBall: {
        "Bea":{d:5.1,w:50.8}, "Charlie":{d:4.6,w:46.1}, "Brock":{d:4.3,w:54.1}, "Gus":{d:4,w:44.2},
        "Colt":{d:3.9,w:60}, "Maisie":{d:3.6,w:46.2}, "Crow":{d:3.5,w:58.6}, "Melodie":{d:3,w:47.5},
        "Kit":{d:-7.2,w:41.3}, "Damian":{d:-7,w:28.9}, "Doug":{d:-6.1,w:35.6}, "Sirius":{d:-6.1,w:35.8},
        "Mico":{d:-5.9,w:44.6}, "Nori":{d:-5.9,w:31.4}, "Ash":{d:-5.6,w:29.3}, "Trunk":{d:-5.5,w:36.4}
      },
      gemGrab: {
        "Charlie":{d:9.4,w:51.5}, "Melodie":{d:4.9,w:51.2}, "Maisie":{d:3.9,w:52.4}, "8-Bit":{d:3.5,w:42.3},
        "Wendy":{d:3.5,w:24.5}, "Clancy":{d:3.3,w:40.8}, "Carl":{d:3.2,w:43.2}, "Ollie":{d:2.8,w:52},
        "Jae-Yong":{d:-6.2,w:38.9}, "Nori":{d:-5.8,w:27.8}, "Gigi":{d:-5.2,w:34.5}, "Hank":{d:-5.2,w:33.3},
        "Willow":{d:-5,w:42.4}, "Chester":{d:-4.9,w:32.1}, "Sprout":{d:-4.9,w:38.2}, "Damian":{d:-4.8,w:25.9}
      },
      knockout: {
        "Frank":{d:4.5,w:54.2}, "Hank":{d:3.9,w:50.9}, "Shelly":{d:3.4,w:62.6}, "Colette":{d:3.2,w:61},
        "Emz":{d:3,w:61.1}, "Doug":{d:2.9,w:51.2}, "Melodie":{d:2.7,w:54.1}, "Crow":{d:2.4,w:64.7},
        "Mico":{d:-5.5,w:40.9}, "Ziggy":{d:-4.6,w:44.5}, "Najia":{d:-4.2,w:42}, "Alli":{d:-3.9,w:46},
        "Sprout":{d:-3.7,w:40.9}, "Bolt":{d:-3.5,w:33.5}, "Ash":{d:-3.2,w:47.6}, "Buster":{d:-2.7,w:42.4}
      }
    }
  },
  "Bea": {
    vs: {
      "Jacky":{d:5.3,w:52.6}, "Bibi":{d:4.7,w:52.7}, "Melodie":{d:4.5,w:50.8}, "Bull":{d:4.2,w:54.9},
      "El Primo":{d:3.7,w:53.3}, "Clancy":{d:3.5,w:50.9}, "Rosa":{d:3.3,w:52.1}, "Shelly":{d:3.2,w:58.9},
      "Sprout":{d:-7.1,w:38.6}, "Najia":{d:-6.9,w:38.7}, "Mr. P":{d:-6.1,w:42.4}, "Eve":{d:-5.8,w:42.8},
      "Penny":{d:-5.1,w:43}, "Grom":{d:-5,w:44.6}, "Chuck":{d:-4.9,w:42.1}, "Gene":{d:-4.9,w:45.8},
      "Colt":{w:57.2}, "Crow":{w:56.3}, "Rico":{w:55.6}, "Edgar":{w:55.4}, "Wendy":{w:25.7}, "Bolt":{w:33.2},
      "Starr Nova":{w:38.5}, "Nori":{w:38.6}
    },
    with: {
      "Shelly":{d:5.2}, "Frank":{d:3.9}, "Surge":{d:3.3}, "Jae-Yong":{d:3.1}, "Wendy":{d:3.1,w:71.1},
      "Nita":{d:-3.7}, "Hank":{d:-3.6}, "Chuck":{d:-3.1}, "Trunk":{d:-2.4}, "Charlie":{d:-2.3},
      "Bolt":{w:63.2}, "Damian":{w:58.2}, "Starr Nova":{w:58.1}, "Nori":{w:57.2}, "Leon":{w:40.3},
      "Crow":{w:41}, "Edgar":{w:41.8}, "Colt":{w:42}, "Barley":{w:42.5}
    },
    modes: {
      bounty: {
        "Jacky":{d:7.8,w:70}, "Rosa":{d:6.8,w:61.3}, "Clancy":{d:6.1,w:64.5}, "Trunk":{d:5.6,w:63.7},
        "Cordelius":{d:5.2,w:60.6}, "Shelly":{d:5.1,w:63.9}, "Bull":{d:5,w:60.8}, "Bibi":{d:4.6,w:52.2},
        "Sprout":{d:-5.5,w:38.6}, "Sirius":{d:-5.1,w:39}, "Najia":{d:-4.4,w:39}, "Ziggy":{d:-3.3,w:45.7},
        "Nani":{d:-2.5,w:38}, "Tick":{d:-2.4,w:39.5}, "Alli":{d:-2.2,w:44.4}, "Juju":{d:-2.2,w:42.7}
      },
      brawlBall: {
        "Melodie":{d:3,w:51.8}, "Bibi":{d:2.7,w:55.2}, "R-T":{d:2.4,w:46.4}, "Shelly":{d:2.2,w:62.1},
        "Bull":{d:2,w:57}, "Colette":{d:2,w:57.6}, "El Primo":{d:1.6,w:52.4}, "Cordelius":{d:1.5,w:51.6},
        "Eve":{d:-7.2,w:46.2}, "Larry & Lawrie":{d:-6.3,w:40.3}, "Sirius":{d:-6.3,w:39.9},
        "Ash":{d:-6.1,w:32.9}, "Mr. P":{d:-6.1,w:48.1}, "Sprout":{d:-6.1,w:46.4}, "Ziggy":{d:-5.6,w:44.4},
        "Juju":{d:-5.4,w:44.7}
      },
      gemGrab: {
        "Melodie":{d:5.2,w:53.6}, "Buzz":{d:3.8,w:49.6}, "Bonnie":{d:3.7,w:58}, "Rosa":{d:3.3,w:47.4},
        "Clancy":{d:3.2,w:42.7}, "Jacky":{d:2.9,w:52.4}, "Bibi":{d:2.7,w:41.6}, "Colette":{d:2.1,w:49.1},
        "Sirius":{d:-6.8,w:31.2}, "Sprout":{d:-6.1,w:39}, "Willow":{d:-5.2,w:44.3}, "Najia":{d:-4.9,w:40.5},
        "Wendy":{d:-4.7,w:17.7}, "Jae-Yong":{d:-4.1,w:43.1}, "Mr. P":{d:-3.9,w:41.1}, "Nori":{d:-3.8,w:31.6}
      },
      hotZone: {
        "Ollie":{d:7.6,w:60.1}, "Rosa":{d:4.8,w:47.6}, "Clancy":{d:4.6,w:43.2}, "Bull":{d:4,w:46.8},
        "Bolt":{d:3.8,w:31.9}, "Bonnie":{d:3.8,w:57.6}, "Otis":{d:3.3,w:50.2}, "R-T":{d:3.3,w:37},
        "Wendy":{d:-5.1,w:15.5}, "Tara":{d:-4.8,w:33.3}, "Nani":{d:-4.6,w:43}, "Sirius":{d:-4.4,w:30.3},
        "Mandy":{d:-4.1,w:45.1}, "Mortis":{d:-3.8,w:36.3}, "Najia":{d:-3.7,w:43.2}, "Juju":{d:-3.5,w:28.5}
      },
      knockout: {
        "Rosa":{d:5,w:59.7}, "Bibi":{d:4.8,w:56.9}, "Trunk":{d:4.6,w:60.1}, "Frank":{d:4.5,w:50.2},
        "Hank":{d:4.4,w:47.4}, "Sam":{d:4.3,w:52.6}, "Bull":{d:4,w:60.2}, "Shelly":{d:3.8,w:59.1},
        "Najia":{d:-5.9,w:36.3}, "Sprout":{d:-5.2,w:35.5}, "Mr. P":{d:-4.5,w:36.8}, "Ziggy":{d:-3.4,w:41.8},
        "Grom":{d:-3.3,w:41.7}, "Eve":{d:-3.2,w:38}, "Sirius":{d:-3.1,w:38.2}, "Wendy":{d:-2.9,w:24.1}
      }
    }
  },
  "Nani": {
    vs: {
      "Jacky":{d:4.9,w:57.2}, "Bea":{d:4,w:59}, "Maisie":{d:2.9,w:55.8}, "Colette":{d:2.7,w:60.3},
      "Ollie":{d:2.6,w:58.4}, "Amber":{d:2.5,w:48.6}, "Crow":{d:2.5,w:61.5}, "Gus":{d:2.3,w:51.1},
      "Wendy":{d:-5.7,w:26.3}, "Damian":{d:-3.8,w:39.1}, "Mina":{d:-3.8,w:45}, "Glowy":{d:-3.7,w:45.9},
      "Sprout":{d:-3.6,w:47.1}, "Pearl":{d:-3.5,w:45.9}, "Bolt":{d:-3.1,w:36.2}, "Mortis":{d:-3.1,w:51.9},
      "Colt":{w:61.3}, "Shelly":{w:61}, "Rico":{w:60.9}, "Starr Nova":{w:41.3}, "Nori":{w:42.9}
    },
    with: {
      "Byron":{d:5.3}, "Leon":{d:5.3}, "Piper":{d:5.3}, "Colt":{d:4.3}, "Brock":{d:4.1,w:57.5},
      "Trunk":{d:-14.5,w:40.3}, "Shade":{d:-12.2}, "Jacky":{d:-11.4,w:42.5}, "Lumi":{d:-11.4},
      "Damian":{d:-10.4}, "Wendy":{w:69.9}, "Bolt":{w:65}, "8-Bit":{w:59.1}, "Pearl":{w:56.3}, "Rosa":{w:42},
      "Barley":{w:43.3}, "El Primo":{w:44.8}
    },
    modes: {
      bounty: {
        "Jacky":{d:5.7,w:76.5}, "Berry":{d:4.6,w:71.5}, "Nita":{d:4.2,w:69.4}, "Hank":{d:4.1,w:58.5},
        "Emz":{d:3.6,w:63.2}, "Trunk":{d:3.5,w:70.6}, "Bull":{d:3.2,w:68.1}, "Clancy":{d:3.2,w:70.6},
        "Wendy":{d:-6.8,w:27.9}, "Sam":{d:-3.7,w:56.4}, "Glowy":{d:-3.6,w:54.2}, "Draco":{d:-3.5,w:58.4},
        "Bolt":{d:-3.1,w:35.8}, "Ziggy":{d:-3.1,w:55.5}, "Mina":{d:-3,w:49.4}, "Kit":{d:-2.9,w:49.7}
      },
      brawlBall: {
        "Gus":{d:4.8,w:43.2}, "Shelly":{d:4.2,w:58}, "Rico":{d:4.1,w:55.8}, "Chuck":{d:3.7,w:54.6},
        "Crow":{d:3.2,w:56.4}, "Edgar":{d:3.1,w:56.3}, "Angelo":{d:3,w:63.9}, "Colt":{d:2.7,w:56.8},
        "Wendy":{d:-10,w:15.2}, "Sirius":{d:-7.5,w:32.5}, "Grom":{d:-6.7,w:41.6}, "Mina":{d:-6.6,w:35.1},
        "Damian":{d:-6.3,w:27.8}, "Chester":{d:-5.9,w:35.3}, "Mortis":{d:-5.5,w:43.5}, "Nori":{d:-5.5,w:29.9}
      },
      gemGrab: {
        "Hank":{d:6.1,w:49.8}, "Ollie":{d:4.8,w:59.3}, "Jacky":{d:4,w:56.8}, "Bonnie":{d:3.9,w:61.4},
        "Buster":{d:3.8,w:54.8}, "Sam":{d:3.6,w:50.4}, "Clancy":{d:3.5,w:46.1}, "Rosa":{d:3.5,w:50.8},
        "Sirius":{d:-5.5,w:35.5}, "Bo":{d:-4,w:33.6}, "Mortis":{d:-3.6,w:39}, "Spike":{d:-3.5,w:43.4},
        "Damian":{d:-3.2,w:32.2}, "Leon":{d:-3,w:47.6}, "Mr. P":{d:-3,w:45.2}, "Bolt":{d:-2.9,w:26.4}
      },
      knockout: {
        "Colette":{d:3.5,w:64.7}, "Melodie":{d:2.8,w:57.8}, "Shelly":{d:2.8,w:65.4}, "Bull":{d:2.5,w:66},
        "Jessie":{d:2.5,w:58.1}, "El Primo":{d:2.4,w:65.5}, "Hank":{d:2.4,w:52.9}, "Nita":{d:2.4,w:63.9},
        "Wendy":{d:-7,w:26.4}, "Bolt":{d:-5.2,w:35.3}, "Najia":{d:-4.8,w:44.9}, "Pearl":{d:-3.9,w:39.7},
        "Damian":{d:-3.7,w:46.5}, "Glowy":{d:-3.7,w:46.4}, "Mina":{d:-3.6,w:46.1}, "Sirius":{d:-3.5,w:45.3}
      }
    }
  },
  "Jessie": {
    vs: {
      "Charlie":{d:8.5,w:59.4}, "Ollie":{d:8.1,w:62.6}, "Gene":{d:7.5,w:61.8}, "Pam":{d:6.7,w:60.5},
      "Ash":{d:6.6,w:50.5}, "Bonnie":{d:6.4,w:60}, "Pearl":{d:6.4,w:54.3}, "Eve":{d:6.3,w:58.5},
      "Mico":{d:-7.8,w:39.2}, "Nori":{d:-7.2,w:35}, "Kaze":{d:-4.9,w:43.8}, "Dynamike":{d:-3.8,w:53.6},
      "Bolt":{d:-3.7,w:34.3}, "Gigi":{d:-3.5,w:43.2}, "Wendy":{d:-3.4,w:27.5}, "Piper":{d:-3.1,w:50.9},
      "Shelly":{w:63}, "Starr Nova":{w:40.2}
    },
    with: {
      "Bull":{d:5.2}, "Bibi":{d:3.2}, "Edgar":{d:3.2}, "Crow":{d:3.1}, "Frank":{d:3},
      "Ollie":{d:-10.9,w:38.6}, "Charlie":{d:-9.7,w:42.7}, "Otis":{d:-8.3}, "Ash":{d:-7.5},
      "Eve":{d:-7.2,w:44.2}, "Wendy":{w:72.1}, "Nori":{w:63.6}, "Bolt":{w:63.3}, "Starr Nova":{w:60.4},
      "Damian":{w:59.9}, "Gene":{w:43.1}, "Rosa":{w:45.2}
    },
    modes: {
      bounty: {
        "Charlie":{d:6.9,w:59.7}, "Jacky":{d:6.8,w:69}, "Frank":{d:6.6,w:56.3}, "Trunk":{d:6.5,w:64.5},
        "Damian":{d:5.9,w:47.9}, "Darryl":{d:5.5,w:62.3}, "Sam":{d:5.2,w:55.8}, "Hank":{d:5,w:49.8},
        "Sprout":{d:-4.4,w:39.6}, "Dynamike":{d:-4.2,w:45.6}, "Ziggy":{d:-4,w:45}, "Mandy":{d:-3.9,w:39.7},
        "Pierce":{d:-3.5,w:40}, "Piper":{d:-3.5,w:41.4}, "Grom":{d:-3.2,w:43}, "Bo":{d:-2.9,w:39.8}
      },
      brawlArena: {
        "Gus":{d:8.9,w:66.4}, "Najia":{d:6.4,w:70.9}, "Ollie":{d:6.3,w:68}, "Chuck":{d:5.7,w:59.3},
        "Pam":{d:5.2,w:59.6}, "Juju":{d:4.8,w:58.7}, "Eve":{d:4.7,w:66.4}, "Hank":{d:4.5,w:47.6},
        "Wendy":{d:-5.2,w:20.2}, "Nori":{d:-4.9,w:35.4}, "Bolt":{d:-4.7,w:34.6}, "Gigi":{d:-4,w:42.2},
        "Brock":{d:-2.6,w:42.4}, "Dynamike":{d:-2.6,w:47.1}, "Gray":{d:-2.5,w:41.8}, "Piper":{d:-2.5,w:42.3}
      },
      brawlBall: {
        "Charlie":{d:5.2,w:52.5}, "Gus":{d:4.9,w:51}, "Gene":{d:3.7,w:64.6}, "Tara":{d:3.7,w:51.6},
        "Meg":{d:3.6,w:52.1}, "Pam":{d:3.6,w:55}, "Shelly":{d:3.4,w:64.8}, "Nita":{d:2.5,w:53.7},
        "Ziggy":{d:-6.1,w:45.5}, "Grom":{d:-5.1,w:51.1}, "Sprout":{d:-3.9,w:50.2}, "Wendy":{d:-3.9,w:27.7},
        "Nori":{d:-3.6,w:39.4}, "Dynamike":{d:-3.4,w:56.4}, "Alli":{d:-3.3,w:50}, "Bolt":{d:-3.3,w:40.9}
      },
      brawlBall5V5: {
        "Lumi":{d:8,w:55}, "Gus":{d:6.8,w:57.6}, "Meg":{d:6.3,w:49.7}, "Otis":{d:4.8,w:52},
        "8-Bit":{d:4.7,w:48}, "Lola":{d:4.4,w:59.2}, "Ash":{d:4.3,w:52.2}, "Shade":{d:3.6,w:53.6},
        "Bolt":{d:-4.5,w:30.9}, "Mr. P":{d:-3.2,w:50.4}, "Sprout":{d:-2.9,w:54.8}, "Nani":{d:-2.8,w:55},
        "Ruffs":{d:-2.8,w:52.8}, "Chuck":{d:-2.6,w:56.7}, "Ziggy":{d:-2.5,w:48.1}, "Clancy":{d:-2.4,w:44.8}
      },
      deathmatch5v5: {
        "Sam":{d:8.7,w:64.2}, "Rosa":{d:5.8,w:60.7}, "Hank":{d:5.6,w:63.3}, "8-Bit":{d:5.2,w:45.3},
        "Melodie":{d:5.2,w:61.1}, "Shelly":{d:4.9,w:62.4}, "Damian":{d:4.1,w:45.2}, "Ruffs":{d:3.9,w:54.5},
        "Grom":{d:-4,w:41.2}, "Mico":{d:-3.4,w:47.7}, "Cordelius":{d:-2.9,w:51.6}, "Mortis":{d:-2.9,w:45.9},
        "Bolt":{d:-2.8,w:31.6}, "Squeak":{d:-2.4,w:44}, "Tick":{d:-2.4,w:44.4}, "Dynamike":{d:-1.9,w:49.7}
      },
      gemGrab: {
        "Charlie":{d:5,w:58.8}, "Pam":{d:4.7,w:59.7}, "Frank":{d:3.7,w:58.9}, "Tara":{d:3.5,w:51.5},
        "Sirius":{d:2.9,w:50.2}, "Jacky":{d:2.8,w:61.8}, "Nita":{d:2.8,w:54.3}, "Darryl":{d:2.7,w:59.5},
        "Ziggy":{d:-5.4,w:49.9}, "Bolt":{d:-4.9,w:29.8}, "Sprout":{d:-4.6,w:50}, "Dynamike":{d:-3.7,w:52.2},
        "Wendy":{d:-3.6,w:26.1}, "Penny":{d:-3.4,w:49.4}, "Grom":{d:-3.2,w:59.4}, "Finx":{d:-3.1,w:47.1}
      },
      heist: {
        "Jae-Yong":{d:5.6,w:70.9}, "Gus":{d:4.4,w:67.7}, "Poco":{d:4.3,w:74.8}, "Bea":{d:4.2,w:75.7},
        "Rosa":{d:3.9,w:68.3}, "Pam":{d:3.7,w:73.1}, "Finx":{d:3.5,w:59.8}, "Meeple":{d:3.2,w:65.7},
        "Wendy":{d:-6.8,w:44.8}, "Gigi":{d:-5.5,w:37}, "Nori":{d:-5.4,w:27.9}, "Mico":{d:-5.3,w:36.7},
        "Kaze":{d:-5.1,w:38.5}, "Bolt":{d:-3.6,w:44.3}, "Starr Nova":{d:-3.2,w:41.4}, "Shade":{d:-3,w:40.5}
      },
      hotZone: {
        "Charlie":{d:4.9,w:70.6}, "Nita":{d:4.8,w:55.6}, "Darryl":{d:4.6,w:68.1}, "Bull":{d:4.5,w:64},
        "Shelly":{d:4.3,w:67}, "El Primo":{d:4.1,w:64.8}, "Pam":{d:3.8,w:59.3}, "Frank":{d:3.4,w:57.8},
        "Ziggy":{d:-5.1,w:52.7}, "Barley":{d:-4.6,w:53.8}, "Bolt":{d:-4.5,w:39}, "Nori":{d:-4.5,w:40.7},
        "Dynamike":{d:-3.9,w:56.9}, "Penny":{d:-3.7,w:49.7}, "Sprout":{d:-3.6,w:57.6},
        "Shade":{d:-3.4,w:48.4}
      },
      knockout: {
        "Frank":{d:5.1,w:52.7}, "Rosa":{d:4.6,w:61.3}, "Pam":{d:4.5,w:55.6}, "Charlie":{d:4.3,w:48.8},
        "El Primo":{d:4.3,w:62}, "Trunk":{d:4.1,w:61.4}, "Lola":{d:4,w:53.3}, "Shelly":{d:4,w:61.2},
        "Wendy":{d:-7.4,w:21.2}, "Grom":{d:-6.9,w:40.1}, "Najia":{d:-6.5,w:37.6}, "Mico":{d:-5.3,w:39},
        "Mina":{d:-5.2,w:38.9}, "Mortis":{d:-4.7,w:45.5}, "Pierce":{d:-4.6,w:39.1}, "Mandy":{d:-4.4,w:42}
      }
    }
  },
  "Berry": {
    vs: {
      "Ash":{d:6.1,w:46.4}, "Charlie":{d:5.1,w:52.2}, "Ollie":{d:5.1,w:55.8}, "Eve":{d:5,w:53.4},
      "Bonnie":{d:4.3,w:54.1}, "Gene":{d:4.3,w:54.9}, "Buster":{d:3.7,w:50.1}, "Moe":{d:3.6,w:46.5},
      "Nori":{d:-4.7,w:33.9}, "Bo":{d:-2.8,w:40.2}, "Tick":{d:-2.7,w:43.3}, "Kaze":{d:-2.5,w:42.5},
      "Griff":{d:-2,w:41.6}, "Starr Nova":{d:-2,w:36.4}, "Emz":{d:-1.9,w:46.8}, "Piper":{d:-1.9,w:48.4},
      "Shelly":{w:56.9}, "Rico":{w:55.8}, "Colt":{w:54.9}, "Wendy":{w:29.9}, "Bolt":{w:33.6},
      "Damian":{w:38.7}
    },
    with: {
      "Bibi":{d:5.8}, "Hank":{d:5.1,w:58.8}, "Nori":{d:4.6,w:62}, "Kenji":{d:4.4}, "Edgar":{d:4.1},
      "Bonnie":{d:-14.2,w:32}, "Otis":{d:-13.3,w:36.8}, "Gene":{d:-13.2,w:32.2}, "Charlie":{d:-10.2},
      "Ollie":{d:-10,w:36}, "Wendy":{w:68.6}, "Bolt":{w:59.6}, "Damian":{w:59.2}, "Barley":{w:38.5}
    },
    modes: {
      bounty: {
        "Alli":{d:8.5,w:47.3}, "Hank":{d:7.9,w:45}, "Kenji":{d:7.4,w:45}, "Ash":{d:7.3,w:51.2},
        "Meg":{d:6.7,w:50.3}, "Damian":{d:5.9,w:40.4}, "Rosa":{d:5.6,w:52.1}, "Juju":{d:4.9,w:42},
        "Nani":{d:-4.6,w:28.5}, "Bea":{d:-4.2,w:37.8}, "Piper":{d:-3.9,w:33.4}, "Bo":{d:-3.7,w:31.6},
        "Pierce":{d:-3.5,w:32.5}, "Darryl":{d:-3.3,w:45.6}, "Lumi":{d:-3.3,w:38.4}, "Mandy":{d:-3.2,w:32.8}
      },
      brawlBall: {
        "Chuck":{d:5.3,w:61.3}, "Gus":{d:5.3,w:48.7}, "Leon":{d:3.6,w:61.3}, "Charlie":{d:3.1,w:47.7},
        "Janet":{d:2.9,w:54.3}, "Rico":{d:2.6,w:59.4}, "Shelly":{d:2.6,w:61.4}, "Ash":{d:2.5,w:40.4},
        "Tick":{d:-5.1,w:43.9}, "Doug":{d:-3.7,w:41.2}, "Nori":{d:-3.7,w:36.6}, "Starr Nova":{d:-3.6,w:35.8},
        "Griff":{d:-3.5,w:42}, "Grom":{d:-3.5,w:50}, "Damian":{d:-3,w:35.9}, "Pearl":{d:-3,w:42}
      },
      gemGrab: {
        "Eve":{d:8.2,w:51.1}, "Moe":{d:6.1,w:43.6}, "Ash":{d:5.8,w:43.7}, "Kenji":{d:5,w:44.7},
        "Meg":{d:4.9,w:45.2}, "Charlie":{d:4.8,w:48.7}, "Buster":{d:4.2,w:51.6}, "Hank":{d:4,w:44.2},
        "Nori":{d:-5.9,w:29.3}, "Jae-Yong":{d:-4.9,w:42}, "Darryl":{d:-4.3,w:42.8}, "Barley":{d:-3.7,w:49.2},
        "Bo":{d:-3.7,w:30.7}, "Chester":{d:-3.4,w:35.3}, "Grom":{d:-3.2,w:49.8}, "Lumi":{d:-3.2,w:35.7}
      },
      heist: {
        "Ollie":{d:5.7,w:91.7}, "Eve":{d:4.2,w:66.5}, "Tara":{d:3.9,w:64.4}, "Ash":{d:3.5,w:66.2},
        "Belle":{d:3.3,w:71.2}, "Piper":{d:3,w:58.3}, "Bea":{d:2.9,w:72.3}, "Gene":{d:2.9,w:91.9},
        "Angelo":{d:-6.1,w:49}, "Doug":{d:-4.3,w:44.1}, "Chester":{d:-3.6,w:47.9}, "Alli":{d:-3.4,w:50.6},
        "Glowy":{d:-3.3,w:49}, "Nori":{d:-3.2,w:28}, "Pierce":{d:-3.1,w:46.4}, "Ruffs":{d:-3.1,w:44.2}
      },
      hotZone: {
        "Charlie":{d:4.5,w:67.1}, "Gray":{d:4.3,w:55.4}, "Ash":{d:4.2,w:54.6}, "Kenji":{d:3.7,w:50.3},
        "Mortis":{d:3.5,w:57.1}, "Wendy":{d:3.3,w:34.1}, "Janet":{d:3.1,w:61.3}, "Colette":{d:2.9,w:60.6},
        "Tick":{d:-4.1,w:45.3}, "R-T":{d:-3.9,w:42.9}, "Trunk":{d:-3.9,w:43.6}, "Nori":{d:-3.8,w:38.1},
        "Glowy":{d:-3.6,w:46.3}, "Pierce":{d:-3.5,w:48.3}, "Bo":{d:-3.1,w:40.4}, "Ziggy":{d:-3.1,w:51.4}
      },
      knockout: {
        "Buzz":{d:5,w:59.6}, "Ash":{d:4.8,w:55.6}, "Buster":{d:4.7,w:49.7}, "Ollie":{d:4.6,w:54.7},
        "Kaze":{d:4.4,w:54.5}, "Tara":{d:4.1,w:55.7}, "Kenji":{d:3.8,w:53.1}, "Mortis":{d:3.7,w:55.9},
        "Tick":{d:-5.1,w:42.3}, "Griff":{d:-4.3,w:45}, "Ziggy":{d:-3.4,w:45.7}, "Squeak":{d:-3.3,w:44.4},
        "Grom":{d:-3.2,w:45.7}, "Pierce":{d:-2.4,w:43.3}, "Bea":{d:-2.3,w:51.6}, "Clancy":{d:-2.2,w:58.5}
      }
    }
  },
  "Doug": {
    vs: {
      "Bolt":{d:7.1,w:47.6}, "Mico":{d:6.9,w:56.6}, "Nori":{d:6.7,w:51.5}, "Kaze":{d:6.5,w:57.9},
      "Gigi":{d:6.4,w:55.8}, "Alli":{d:5.4,w:59.6}, "Jae-Yong":{d:5.2,w:59.6}, "Shade":{d:5.2,w:51.5},
      "Sirius":{d:-6.4,w:43.2}, "Griff":{d:-4.6,w:45.4}, "Lou":{d:-4.6,w:46.5}, "Lumi":{d:-4,w:43.5},
      "Frank":{d:-3.5,w:52}, "Colette":{d:-3.3,w:55.6}, "Dynamike":{d:-3.3,w:56.6}, "Emz":{d:-3.3,w:51.9},
      "Leon":{w:62.9}, "Lily":{w:61.8}, "Edgar":{w:61.6}, "Shelly":{w:61.5}, "Gene":{w:61.1},
      "Wendy":{w:36.4}, "Ash":{w:45.2}
    },
    with: {
      "Rico":{d:6.3}, "Crow":{d:4.4}, "Shelly":{d:3.7}, "Spike":{d:3.7}, "Leon":{d:3.5}, "Angelo":{d:-9,w:46},
      "Glowy":{d:-7.6,w:48.6}, "Gus":{d:-7.3}, "Lola":{d:-7.3,w:46.4}, "Meeple":{d:-6.7}, "Wendy":{w:66.8},
      "Bolt":{w:64.4}, "Damian":{w:61.8}, "Ash":{w:61.5}, "8-Bit":{w:61.1}, "Bonnie":{w:47.7},
      "Jae-Yong":{w:48}
    },
    modes: {
      brawlBall: {
        "Gene":{d:8.7,w:71.9}, "Kaze":{d:7,w:59.8}, "Mr. P":{d:6.9,w:65}, "Lily":{d:6.6,w:64.5},
        "Nori":{d:6.4,w:51.7}, "Alli":{d:6.2,w:61.9}, "Gigi":{d:6.2,w:55.4}, "Belle":{d:6.1,w:64.4},
        "Sirius":{d:-7.5,w:42.7}, "Tick":{d:-6.6,w:47.5}, "Lou":{d:-5.2,w:41.9}, "Lumi":{d:-5.1,w:41.1},
        "Griff":{d:-4.9,w:45.7}, "Frank":{d:-4.6,w:52.4}, "Dynamike":{d:-4.5,w:57.7}, "Emz":{d:-3.5,w:53.2}
      },
      gemGrab: {
        "Nori":{d:8.5,w:55.2}, "Kaze":{d:6.4,w:59}, "Bolt":{d:5.8,w:42.5}, "Gigi":{d:5.8,w:59.1},
        "Melodie":{d:5.5,w:65.4}, "Sprout":{d:4.8,w:61.5}, "Gene":{d:4.7,w:66.6}, "Chuck":{d:4.6,w:58.4},
        "R-T":{d:-6.4,w:46.3}, "Frank":{d:-5.6,w:51.6}, "Clancy":{d:-5.2,w:45.8}, "Griff":{d:-4.8,w:44.8},
        "Sirius":{d:-4.5,w:44.8}, "Pierce":{d:-4.1,w:47.4}, "Tick":{d:-4,w:49}, "Gale":{d:-3.7,w:53.5}
      },
      hotZone: {
        "Jae-Yong":{d:7.4,w:73.4}, "Gigi":{d:7.1,w:65.2}, "Gray":{d:7,w:62.8}, "Bolt":{d:6.9,w:51.8},
        "Mico":{d:6.2,w:61.8}, "Nori":{d:5.7,w:52.4}, "Kenji":{d:5.6,w:56.9}, "Alli":{d:5.4,w:66.8},
        "Sirius":{d:-7.3,w:45.4}, "R-T":{d:-6.9,w:44.6}, "Pierce":{d:-6.7,w:49.8}, "Griff":{d:-5.8,w:45.7},
        "Lou":{d:-5.6,w:49.4}, "Bo":{d:-5.3,w:42.9}, "Ruffs":{d:-5.3,w:51.3}, "Lumi":{d:-5.2,w:50.2}
      },
      knockout: {
        "Bolt":{d:14.8,w:53.5}, "Nori":{d:10.3,w:55.5}, "Gigi":{d:9,w:56.9}, "Wendy":{d:8.7,w:40.4},
        "Mortis":{d:8.5,w:62.4}, "Lily":{d:8.4,w:61.4}, "Kaze":{d:8.2,w:60}, "Alli":{d:7.4,w:59},
        "Clancy":{d:-8.3,w:54}, "Frank":{d:-7.9,w:43.5}, "Sirius":{d:-7.7,w:39.2}, "Griff":{d:-7.4,w:43.6},
        "Juju":{d:-6.5,w:42.4}, "Dynamike":{d:-6.2,w:53.2}, "Lou":{d:-6.2,w:43.8}, "Rico":{d:-6,w:55.8}
      }
    }
  },
  "Buzz": {
    vs: {
      "Bonnie":{d:2.9,w:53.1}, "Kenji":{d:2.8,w:50}, "Sprout":{d:2.8,w:48.8}, "Bibi":{d:2.3,w:50.7},
      "Mortis":{d:2.1,w:52.3}, "Dynamike":{d:1.9,w:55.9}, "Grom":{d:1.6,w:51.5}, "Draco":{d:1.3,w:45.3},
      "Sirius":{d:-4.2,w:39.4}, "Mandy":{d:-4.1,w:42.4}, "Pierce":{d:-3.9,w:40.1}, "Gale":{d:-3.7,w:42.9},
      "Lou":{d:-3.7,w:41.4}, "R-T":{d:-3.4,w:37.9}, "Colette":{d:-3,w:49.9}, "Jessie":{d:-2.9,w:43.7},
      "Colt":{w:56.4}, "Leon":{w:55.1}, "Shelly":{w:55}, "Edgar":{w:54.9}, "Wendy":{w:28.5}, "Bolt":{w:35.6},
      "Damian":{w:36.5}, "Starr Nova":{w:38.1}
    },
    with: {
      "Jacky":{d:5.9}, "Nita":{d:4.2}, "Barley":{d:3.9}, "Ash":{d:3.7,w:60.3}, "Willow":{d:3.7},
      "Mr. P":{d:-6.4,w:42}, "Ollie":{d:-6.2,w:40.2}, "Bonnie":{d:-4.9,w:41.6}, "Nani":{d:-3.5},
      "Najia":{d:-3.2}, "Wendy":{w:67.9}, "Bolt":{w:59.2}, "Shade":{w:58.2}, "Lumi":{w:57.6}, "Crow":{w:41.5},
      "Colt":{w:41.6}
    },
    modes: {
      airHockey: {
        "Rosa":{d:7.1,w:67.8}, "Pearl":{d:4.5,w:60.9}, "Bonnie":{d:3.2,w:73.1}, "Ollie":{d:2.7,w:60.2},
        "Ash":{d:2.1,w:52.6}, "Otis":{d:1.9,w:57.8}, "Pam":{d:1.6,w:61.2}, "Buster":{d:1.5,w:56.8},
        "Nani":{d:-5.6,w:42.7}, "Sirius":{d:-4.4,w:38.8}, "Pierce":{d:-4.3,w:37.5}, "Finx":{d:-4.2,w:36.8},
        "Hank":{d:-4.2,w:40.5}, "Najia":{d:-4.1,w:43.3}, "Glowy":{d:-4,w:40.3}, "Lumi":{d:-4,w:35.7}
      },
      bounty: {
        "Sam":{d:5.8,w:52.2}, "Chuck":{d:5.2,w:51.8}, "Barley":{d:4.8,w:58.2}, "Willow":{d:4.2,w:49.8},
        "Gigi":{d:3.9,w:45.7}, "Ash":{d:3.7,w:51.4}, "Bolt":{d:3.7,w:30.4}, "Bonnie":{d:3.7,w:46.9},
        "Griff":{d:-5,w:38}, "Lou":{d:-4.7,w:45.7}, "Pam":{d:-4.4,w:48.3}, "Tara":{d:-4.4,w:45.2},
        "Emz":{d:-4.3,w:41.6}, "Pierce":{d:-3.9,w:35.6}, "Sandy":{d:-3.8,w:46.9}, "Pearl":{d:-3.7,w:39.7}
      },
      brawlBall: {
        "Angelo":{d:4.1,w:69.7}, "Chuck":{d:4.1,w:60}, "Glowy":{d:3.3,w:52.1}, "Bonnie":{d:2.6,w:53},
        "Sprout":{d:2.6,w:53.9}, "Kenji":{d:2.4,w:52}, "Janet":{d:2.3,w:53.6}, "Draco":{d:2.2,w:47},
        "Gale":{d:-3.7,w:42.3}, "Sirius":{d:-3.6,w:41.3}, "Jacky":{d:-2.8,w:40.6}, "Lou":{d:-2.8,w:39.1},
        "Damian":{d:-2.7,w:36.1}, "Maisie":{d:-2.7,w:43}, "Doug":{d:-2.5,w:42.2}, "Pierce":{d:-2.5,w:42.9}
      },
      gemGrab: {
        "Trunk":{d:4.7,w:51.3}, "Ash":{d:4.2,w:46.3}, "Grom":{d:3.4,w:60.8}, "Barley":{d:3.3,w:60.6},
        "Bonnie":{d:3.3,w:61.8}, "Shade":{d:3.3,w:45}, "Finx":{d:3.2,w:48.1}, "Meeple":{d:3.1,w:51.5},
        "Bea":{d:-3.8,w:50.4}, "Ollie":{d:-3.2,w:52.2}, "Meg":{d:-2.9,w:41.8}, "Jae-Yong":{d:-2.8,w:48.6},
        "Colette":{d:-2.7,w:48.5}, "Juju":{d:-2.7,w:43.4}, "Lou":{d:-2.7,w:47.2}, "Gale":{d:-2.6,w:47.1}
      },
      hotZone: {
        "Ollie":{d:6.7,w:65.5}, "Alli":{d:5.4,w:55}, "Janet":{d:5.3,w:56.4}, "Kaze":{d:4.6,w:48.8},
        "Carl":{d:4.4,w:51.7}, "Eve":{d:4.3,w:54.1}, "Lola":{d:4.2,w:53.1}, "Mico":{d:4.2,w:47.8},
        "Pierce":{d:-4.8,w:39.7}, "Mandy":{d:-4.4,w:51.1}, "Griff":{d:-3.7,w:35.9}, "Frank":{d:-3.4,w:40.4},
        "Shelly":{d:-3.3,w:49.1}, "Nani":{d:-3.1,w:50.7}, "Tara":{d:-3.1,w:41.2}, "Spike":{d:-3,w:44.7}
      },
      knockout: {
        "Chuck":{d:5.6,w:57.1}, "Rosa":{d:5.1,w:59.2}, "Sprout":{d:3.3,w:43.3}, "Grom":{d:2.6,w:47},
        "Gigi":{d:2.3,w:43.9}, "Trunk":{d:2,w:56.8}, "Pam":{d:1.9,w:50.4}, "Kaze":{d:1.8,w:47.3},
        "Sirius":{d:-7.5,w:33.2}, "Griff":{d:-6.8,w:37.8}, "Hank":{d:-5.2,w:37.2}, "Berry":{d:-5,w:40.4},
        "Otis":{d:-4.8,w:37.5}, "Chester":{d:-4.7,w:41.2}, "Doug":{d:-4.4,w:39.3}, "Pierce":{d:-4.2,w:37}
      }
    }
  }
};
