// Per-map RANKED win rates (all leagues), source: Brawl Planet map pages. Built by scrape-maps.js.
// Only brawlers in Kerry's pool (25 x Lv11 + 4 season-free) are recorded.
//   name/mode = as shown on the page;  img = map picture slug;  n = ranked matches in the sample
//   active    = the map was in the Ranked rotation when scraped
//   updated   = newest match in the sample (ISO date)
const MAPS = [
{name:"Backyard Bowl", mode:"Brawl Ball", img:"backyardbowl", n:199379, active:false, updated:"2025-07-16", wr:{
  "Bibi":55.8,"Frank":54.5,"Crow":53.4,"Nita":52.8,"Griff":52.7,"Bo":51.5,"Gale":51.1,"Surge":50.2,"Leon":50,
  "Emz":48.9,"Willow":48.3,"Edgar":47.9,"Kaze":47.3,"Mortis":46.7,"Kit":46.5,"Cordelius":46.4,"Shelly":46.3,
  "Lumi":46,"Colette":45.6,"8-Bit":45.2,"Brock":44.7,"Gray":44.3,"Mandy":41.3,"Chuck":29.5}},
{name:"Beach Ball", mode:"Brawl Ball", img:"beachball", n:109299, active:true, updated:"2026-09-08", wr:{
  "Emz":53.6,"Bibi":53.4,"Frank":51.4,"Griff":50.7,"Edgar":50.5,"Nita":50.3,"Surge":50.2,"Bolt":49.5,
  "Starr Nova":49.2,"Cordelius":48.1,"Leon":47.3,"Gale":47.2,"8-Bit":47,"Colette":47,"Trunk":47,"Mortis":46.7,
  "Willow":46.6,"Shelly":45.4,"Gray":45.3,"Lumi":45.2,"Brock":45.1,"Ziggy":44,"Bo":43.8,"Nori":43.6,
  "Crow":42.7,"Kaze":41.3,"Mandy":41.3,"Kit":36.5,"Chuck":35.2}},
{name:"Belle's Rock", mode:"Knockout", img:"bellesrock", n:1969610, active:true, updated:"2026-09-08", wr:{
  "Bolt":59.9,"Brock":56.4,"Gray":55.6,"Edgar":55,"Leon":50.9,"Ziggy":49.9,"Starr Nova":49.6,"Mortis":49.4,
  "Willow":49.3,"8-Bit":49.1,"Kit":48.9,"Nori":48.6,"Mandy":48.3,"Cordelius":48.2,"Surge":48,"Bibi":47.2,
  "Bo":46.8,"Gale":46.2,"Emz":45.6,"Griff":45,"Chuck":44.3,"Trunk":43.6,"Lumi":43.1,"Frank":42.8,"Crow":41.9,
  "Shelly":41.9,"Colette":41.2,"Nita":41,"Kaze":40.4}},
{name:"Bridge Too Far", mode:"Heist", img:"bridgetoofar", n:1938308, active:true, updated:"2026-09-08", wr:{
  "Nori":62.8,"8-Bit":60.3,"Chuck":56.5,"Bolt":53.7,"Bibi":53.5,"Edgar":53.1,"Nita":51.6,"Griff":51.5,
  "Kaze":51.5,"Bo":51.4,"Brock":50.4,"Starr Nova":50.1,"Colette":47.6,"Lumi":46.9,"Gale":46.4,
  "Cordelius":45.7,"Mandy":45.7,"Emz":44.6,"Crow":43.4,"Trunk":43.3,"Surge":41.9,"Frank":41.4,"Kit":41.2,
  "Leon":40,"Gray":39,"Mortis":36.1,"Shelly":35.1,"Ziggy":34.6,"Willow":31.7}},
{name:"Canal Grande", mode:"Bounty", img:"canalgrande", n:199899, active:false, updated:"2025-02-24", wr:{
  "Mortis":50.6,"Brock":50.3,"Bibi":49.8,"Gray":48.5,"Edgar":48,"Surge":46.8,"Frank":46.7,"Nita":46.4,
  "Shelly":46,"Bo":45.8,"Willow":45.1,"Griff":44.8,"Cordelius":44.7,"Leon":44.5,"Emz":44,"Colette":43.3,
  "Gale":43.1,"8-Bit":42.6,"Mandy":42,"Crow":41.8,"Kit":40.6,"Chuck":35.8}},
{name:"Center Stage", mode:"Brawl Ball", img:"centerstage", n:1957494, active:true, updated:"2026-09-08", wr:{
  "Griff":56.5,"Bolt":54.8,"Bibi":54.5,"Frank":53.9,"Nita":53.8,"Gale":52.5,"Emz":51.3,"Surge":50.8,
  "Edgar":50.3,"Bo":50,"Starr Nova":48.8,"8-Bit":48.4,"Cordelius":48.4,"Crow":47.2,"Trunk":47.2,"Shelly":46.6,
  "Brock":45.7,"Nori":45.6,"Willow":45.1,"Lumi":44.7,"Mortis":43.3,"Colette":42.9,"Leon":41.6,"Kit":39.7,
  "Gray":39.4,"Kaze":39.1,"Ziggy":37.6,"Mandy":35.7,"Chuck":32.4}},
{name:"Crystal Arcade", mode:"Gem Grab", img:"crystalarcade", n:1564640, active:true, updated:"2026-08-19", wr:{
  "Bolt":65.8,"Bo":56.4,"Surge":54.6,"Starr Nova":54.5,"Griff":53.8,"Nita":53.6,"8-Bit":53.2,"Crow":51.2,
  "Emz":50.8,"Bibi":50.7,"Edgar":50.4,"Gale":50,"Mortis":49.7,"Trunk":49,"Nori":48.5,"Cordelius":47,
  "Leon":46.8,"Brock":46.4,"Frank":45.2,"Lumi":45.2,"Gray":44.5,"Chuck":44.2,"Kit":44,"Kaze":43.7,
  "Shelly":43.7,"Colette":43.6,"Willow":41.6,"Ziggy":40.5,"Mandy":40.4}},
{name:"Deathcap Trap", mode:"Gem Grab", img:"deathcaptrap", n:1556448, active:true, updated:"2026-08-19", wr:{
  "Bolt":63.6,"Bo":56.7,"8-Bit":54.9,"Surge":54.8,"Starr Nova":54.7,"Griff":52.3,"Nita":51.6,"Crow":51.2,
  "Edgar":51.2,"Bibi":50.8,"Gale":50.3,"Emz":50.2,"Mortis":49.7,"Nori":49.1,"Leon":47.9,"Trunk":47.3,
  "Cordelius":46.9,"Gray":46.6,"Brock":46.1,"Ziggy":45.3,"Frank":44.9,"Chuck":44.8,"Lumi":44.8,"Kit":44.4,
  "Kaze":43.5,"Colette":42.9,"Willow":42.5,"Shelly":42.3,"Mandy":42.2}},
{name:"Double Swoosh", mode:"Gem Grab", img:"doubleswoosh", n:1935864, active:true, updated:"2026-09-08", wr:{
  "Bolt":64.5,"Bo":55.6,"Nita":54.9,"Griff":54.6,"Emz":53,"Surge":52.9,"Starr Nova":52.3,"Bibi":51.3,
  "Crow":51,"8-Bit":50.1,"Edgar":49.5,"Gale":48.8,"Trunk":48.5,"Mortis":47.8,"Frank":47.3,"Cordelius":47,
  "Shelly":47,"Nori":46.4,"Brock":44.4,"Lumi":44.3,"Leon":44.2,"Colette":43.2,"Gray":42.6,"Kit":42.5,
  "Chuck":40.8,"Kaze":40.1,"Mandy":38.7,"Willow":37.2,"Ziggy":36.2}},
{name:"Dry Season", mode:"Bounty", img:"dryseason", n:1965743, active:true, updated:"2026-09-08", wr:{
  "Bolt":64.6,"Brock":55.8,"Bo":53.4,"8-Bit":52.8,"Edgar":51.8,"Gray":51.8,"Mortis":51.4,"Starr Nova":51.4,
  "Leon":51.1,"Surge":50.6,"Mandy":50.4,"Ziggy":48,"Kaze":47.8,"Griff":46.9,"Nori":46.8,"Gale":46.7,
  "Emz":46.5,"Crow":46,"Bibi":45.9,"Kit":45.4,"Cordelius":44.5,"Willow":44.2,"Lumi":43.3,"Trunk":42.9,
  "Chuck":42.4,"Nita":42.3,"Colette":41.3,"Shelly":39.2,"Frank":38.9}},
{name:"Dueling Beetles", mode:"Hot Zone", img:"duelingbeetles", n:1956719, active:true, updated:"2026-09-08", wr:{
  "Bolt":58.6,"Bibi":56.5,"Bo":56.5,"Nita":55.5,"Griff":54.9,"Surge":54.7,"Starr Nova":54.2,"Emz":52,
  "Nori":51.6,"Edgar":51.5,"Mortis":50.9,"Chuck":50.6,"Trunk":50.5,"Frank":50.3,"8-Bit":49.9,"Gale":49.4,
  "Gray":49.3,"Cordelius":48,"Crow":45.9,"Ziggy":43.1,"Kaze":42.7,"Lumi":42,"Colette":41.9,"Leon":41.3,
  "Brock":40.8,"Shelly":40.3,"Kit":38.8,"Willow":37.8,"Mandy":31.8}},
{name:"Excel", mode:"Bounty", img:"excel", n:186578, active:false, updated:"2025-10-15", wr:{
  "Bibi":53.3,"Kaze":53.2,"Gray":51.6,"Bo":51.5,"Brock":51.5,"Leon":51.5,"Cordelius":50.9,"Kit":50.5,
  "Mortis":50.5,"Mandy":49.4,"Edgar":48.6,"Crow":48.5,"Trunk":47.7,"8-Bit":47.4,"Willow":46.8,"Surge":45.6,
  "Chuck":45.1,"Griff":44.6,"Emz":44.4,"Gale":44,"Frank":43.9,"Nita":43.6,"Shelly":42.7,"Lumi":41.7,
  "Colette":39.1}},
{name:"Flaring Phoenix", mode:"Knockout", img:"flaringphoenix", n:1969862, active:true, updated:"2026-09-08", wr:{
  "Bolt":58.2,"Brock":56.6,"Edgar":55.5,"Gray":54,"8-Bit":51.7,"Mandy":50.7,"Surge":50.2,"Bo":49.7,
  "Leon":49.6,"Starr Nova":49.5,"Emz":49.1,"Willow":49,"Cordelius":48.8,"Griff":48.6,"Gale":48.4,"Bibi":48.1,
  "Kit":48.1,"Mortis":47.8,"Ziggy":47.5,"Nori":46.4,"Frank":46,"Trunk":45.7,"Shelly":45.5,"Crow":44.4,
  "Chuck":43.8,"Nita":42.9,"Lumi":42.6,"Colette":41.7,"Kaze":40}},
{name:"Flooded Mine", mode:"Gem Grab", img:"floodedmine", n:25976, active:true, updated:"2026-07-19", wr:{
  "Bolt":63.5,"Starr Nova":57.8,"8-Bit":56.4,"Surge":56.4,"Griff":54.4,"Bo":54,"Crow":53.5,"Nita":52.6,
  "Trunk":52.1,"Emz":51.7,"Gale":51.1,"Bibi":50.3,"Edgar":50,"Frank":49,"Mortis":48.9,"Shelly":47.9,
  "Lumi":47.3,"Kit":46.4,"Cordelius":46.1,"Kaze":45.8,"Brock":44.7,"Leon":42.9,"Colette":41.8,"Gray":40.6,
  "Mandy":39.9,"Willow":36.9,"Chuck":35}},
{name:"Flowing Springs", mode:"Knockout", img:"flowingsprings", n:200019, active:false, updated:"2026-06-17", wr:{
  "Frank":54.9,"Brock":53.8,"Mandy":49.7,"8-Bit":49.4,"Leon":49.4,"Shelly":48.8,"Bo":48.6,"Gray":48.3,
  "Mortis":47.9,"Edgar":47.4,"Emz":46.8,"Kit":46.2,"Gale":45.5,"Crow":44.7,"Willow":44.7,"Chuck":44.6,
  "Bibi":44.5,"Ziggy":44,"Cordelius":43.3,"Trunk":42.2,"Kaze":41.7,"Griff":40.8,"Colette":39.9,"Surge":39.3,
  "Nita":36.3,"Lumi":29.6}},
{name:"Gem Fort", mode:"Gem Grab", img:"gemfort", n:1939654, active:true, updated:"2026-09-08", wr:{
  "Bolt":65,"Bo":55.4,"Surge":53.7,"Nita":53.6,"Griff":53.3,"Starr Nova":52.7,"8-Bit":52,"Bibi":51.6,"Emz":51,
  "Edgar":50.8,"Crow":50.5,"Gale":49.5,"Trunk":49.3,"Mortis":48.7,"Cordelius":47.8,"Nori":47.4,"Frank":45.9,
  "Shelly":45.9,"Leon":45.6,"Brock":45.3,"Chuck":45.1,"Gray":44.9,"Lumi":44.5,"Kit":44,"Colette":43.4,
  "Kaze":41,"Ziggy":40.7,"Willow":39.9,"Mandy":39.5}},
{name:"Goldarm Gulch", mode:"Knockout", img:"goldarmgulch", n:200012, active:false, updated:"2026-06-17", wr:{
  "Frank":59.1,"Emz":55.7,"Shelly":53.4,"Leon":52.6,"Mortis":52.3,"Brock":52.1,"Edgar":51,"Gray":49.9,
  "Cordelius":49.8,"Willow":49.8,"Bibi":49.6,"Gale":49.3,"Bo":47.8,"Griff":47.8,"Mandy":47.5,"Surge":47.4,
  "Crow":47.2,"Trunk":47,"8-Bit":46.9,"Kit":46.5,"Ziggy":45.3,"Kaze":44,"Nita":43.1,"Chuck":42.7,
  "Colette":41.7,"Lumi":37.2}},
{name:"Grass Knot", mode:"Brawl Ball", img:"grassknot", n:200000, active:false, updated:"2025-11-19", wr:{
  "Bibi":57.3,"Frank":55.1,"Nita":53.9,"Cordelius":53.7,"Gale":53,"Griff":51.1,"Crow":50.9,"Trunk":50.9,
  "Willow":50.9,"Surge":49.8,"Emz":49.5,"Bo":49.4,"Leon":47.9,"Kit":47.5,"Edgar":46.7,"8-Bit":45.8,
  "Gray":45.5,"Colette":45.2,"Mortis":45.2,"Kaze":44.8,"Shelly":44.8,"Lumi":44.2,"Brock":41.2,"Mandy":39.9,
  "Ziggy":39.1,"Chuck":34.5}},
{name:"Hard Rock Mine", mode:"Gem Grab", img:"hardrockmine", n:1933941, active:true, updated:"2026-09-08", wr:{
  "Bolt":60.6,"Bo":56.1,"Surge":53.7,"Bibi":53.2,"Nita":53.2,"8-Bit":53.1,"Starr Nova":52.8,"Griff":51.6,
  "Edgar":51.3,"Crow":50.1,"Emz":50.1,"Trunk":49.4,"Mortis":49.1,"Gale":49,"Nori":48.7,"Cordelius":47.6,
  "Leon":47.1,"Brock":45.9,"Frank":45.2,"Shelly":44.9,"Kit":44.7,"Gray":44.6,"Lumi":44.4,"Chuck":43.8,
  "Colette":42.3,"Ziggy":41.9,"Kaze":41.6,"Mandy":40.5,"Willow":40.5}},
{name:"Hideout", mode:"Bounty", img:"hideout", n:1968467, active:true, updated:"2026-09-08", wr:{
  "Bolt":66.2,"Brock":55.2,"Bo":53.2,"Leon":53,"8-Bit":52.7,"Mortis":51.4,"Gray":51.2,"Edgar":50.5,
  "Surge":50.5,"Starr Nova":49.8,"Mandy":49.4,"Griff":47.2,"Gale":46.6,"Crow":46.2,"Kaze":45.9,"Nori":45.5,
  "Kit":45.3,"Ziggy":45.3,"Willow":45,"Emz":44.9,"Cordelius":43.6,"Chuck":43.4,"Bibi":43.3,"Colette":41.9,
  "Lumi":40.6,"Trunk":40,"Nita":39.7,"Frank":39.2,"Shelly":38.6}},
{name:"Hot Potato", mode:"Heist", img:"hotpotato", n:1949736, active:true, updated:"2026-09-08", wr:{
  "Nori":61.8,"Bibi":60.9,"Nita":59.6,"Edgar":56.1,"Cordelius":53.8,"Bolt":53.2,"Griff":53.2,"Chuck":52.5,
  "8-Bit":52.1,"Starr Nova":52,"Kaze":51,"Trunk":50.7,"Emz":50.5,"Lumi":49.5,"Frank":47.1,"Surge":47.1,
  "Colette":45.3,"Bo":45.2,"Brock":44.3,"Kit":43.5,"Crow":43.4,"Gale":43.4,"Willow":40.2,"Shelly":39.7,
  "Mandy":39,"Leon":38.9,"Ziggy":38.8,"Mortis":38.7,"Gray":35.1}},
{name:"Infinite Doom", mode:"Bounty", img:"infinitedoom", n:190259, active:false, updated:"2025-10-15", wr:{
  "Crow":56.6,"Bo":55.6,"Emz":53.9,"Frank":52.4,"Cordelius":51.4,"Griff":51.3,"Brock":50.5,"Gale":49.9,
  "8-Bit":49.4,"Bibi":49.3,"Leon":49.2,"Nita":48.6,"Shelly":48.5,"Surge":48.1,"Kaze":47.2,"Chuck":46.9,
  "Mortis":45.4,"Trunk":45.2,"Edgar":44.8,"Mandy":44.5,"Kit":42.4,"Gray":41.7,"Lumi":41.5,"Willow":41.2,
  "Colette":40.7}},
{name:"In the Liminal", mode:"Hot Zone", img:"intheliminal", n:166597, active:false, updated:"2026-05-18", wr:{
  "Bibi":59.2,"Bo":58.2,"Crow":56.1,"Gale":55.9,"Trunk":55.9,"Chuck":55.5,"Frank":55.2,"Nita":55.1,"Emz":53.7,
  "Griff":53.4,"Mortis":51.9,"Cordelius":51.2,"Gray":50.1,"Surge":49.7,"Kaze":49.1,"Leon":46.6,"8-Bit":45.5,
  "Colette":45,"Edgar":44.7,"Shelly":44.5,"Kit":44,"Brock":37.7,"Willow":36.8,"Ziggy":36.1,"Lumi":32.7,
  "Mandy":32.3}},
{name:"Kaboom Canyon", mode:"Heist", img:"kaboomcanyon", n:1932772, active:true, updated:"2026-09-08", wr:{
  "Nori":64.8,"Bolt":57.2,"Bibi":56.5,"Nita":56.3,"Edgar":55,"8-Bit":54.5,"Starr Nova":54.2,"Chuck":53.2,
  "Griff":53.1,"Kaze":51,"Emz":49.5,"Colette":49.4,"Bo":49.2,"Cordelius":49.1,"Surge":48.9,"Crow":48.4,
  "Gale":48.2,"Lumi":47.2,"Trunk":46.7,"Brock":46.4,"Frank":44.4,"Kit":42.9,"Gray":42.5,"Leon":40.8,
  "Mandy":38.7,"Mortis":38.3,"Shelly":37.9,"Willow":33.6,"Ziggy":32}},
{name:"Last Stop", mode:"Gem Grab", img:"laststop", n:199880, active:false, updated:"2025-02-24", wr:{
  "Bo":55.3,"8-Bit":54.1,"Leon":51.5,"Crow":51.3,"Surge":51.1,"Griff":51,"Nita":50.7,"Mortis":50.4,
  "Bibi":49.1,"Gale":48.1,"Emz":47,"Frank":46.7,"Shelly":46.6,"Gray":44.7,"Brock":44.6,"Chuck":44.4,
  "Edgar":44.3,"Colette":43.6,"Cordelius":41.8,"Kit":41.7,"Mandy":35.6,"Willow":35.6}},
{name:"Layer Cake", mode:"Bounty", img:"layercake", n:1958463, active:true, updated:"2026-09-08", wr:{
  "Bolt":64.1,"Brock":55.5,"Bo":53.7,"Surge":52.8,"Edgar":52.4,"Mortis":51.5,"8-Bit":51.4,"Starr Nova":50.9,
  "Gray":50.4,"Griff":50.2,"Bibi":49.9,"Emz":49.7,"Mandy":48.5,"Leon":48.4,"Cordelius":48.3,"Trunk":48.3,
  "Willow":48.3,"Gale":47.9,"Nori":47.9,"Ziggy":47.7,"Crow":46,"Nita":45.7,"Lumi":45.3,"Kaze":45.1,"Kit":45.1,
  "Chuck":44.6,"Shelly":43.1,"Frank":42.8,"Colette":41.5}},
{name:"Lilygear Lake", mode:"Gem Grab", img:"lilygearlake", n:25925, active:true, updated:"2026-07-19", wr:{
  "Bolt":66,"8-Bit":57.1,"Bo":55.9,"Starr Nova":55.6,"Crow":54.6,"Surge":53.9,"Griff":52.6,"Chuck":52.2,
  "Nita":51,"Edgar":49.6,"Brock":48.1,"Bibi":48,"Lumi":47.9,"Mortis":47.7,"Emz":46.7,"Kit":46.5,"Leon":46.4,
  "Gray":46,"Mandy":45.2,"Kaze":44.9,"Colette":43.7,"Cordelius":43.1,"Trunk":42.3,"Gale":41.4,"Frank":40.7,
  "Shelly":40.2}},
{name:"Massive Attack", mode:"Hot Zone", img:"massiveattack", n:27736, active:false, updated:"2025-11-24", wr:{
  "Griff":60.5,"Frank":57.7,"Nita":56,"Trunk":55.7,"Gale":54.6,"8-Bit":54.1,"Bo":53.9,"Cordelius":52.1,
  "Surge":51.4,"Crow":51.2,"Bibi":50.4,"Shelly":50.1,"Edgar":49.6,"Emz":48.2,"Leon":46.9,"Gray":44.4,
  "Chuck":42.8,"Brock":42.5,"Kit":41.6,"Colette":41.1,"Kaze":40.1,"Mortis":39.9,"Mandy":37.8,"Willow":36.7,
  "Lumi":34.6,"Ziggy":32.7}},
{name:"New Horizons", mode:"Knockout", img:"newhorizons", n:1970365, active:true, updated:"2026-09-08", wr:{
  "Bolt":60.6,"Brock":56.7,"Gray":54.9,"Edgar":54.6,"Leon":51.4,"Starr Nova":50.8,"8-Bit":50.1,"Surge":50.1,
  "Mandy":48.9,"Bo":48.4,"Mortis":48.3,"Ziggy":48.1,"Kit":48,"Gale":47.8,"Griff":47.7,"Willow":47.4,
  "Cordelius":47.2,"Nori":47.2,"Emz":45.7,"Bibi":45.5,"Crow":44.4,"Frank":43.8,"Trunk":43,"Shelly":42.3,
  "Colette":41.6,"Chuck":41.4,"Kaze":41.1,"Lumi":41.1,"Nita":40.4}},
{name:"Open Business", mode:"Hot Zone", img:"openbusiness", n:1955003, active:true, updated:"2026-09-08", wr:{
  "Bolt":57.9,"Bibi":56.2,"Nita":55.7,"Surge":55.2,"Bo":55,"Starr Nova":54.8,"Griff":54,"Gray":53.4,
  "Emz":52.7,"Chuck":52.1,"Frank":51.6,"Nori":51.3,"Mortis":51,"Edgar":50.6,"Trunk":50.4,"8-Bit":50.1,
  "Gale":50.1,"Cordelius":48.4,"Crow":46.3,"Ziggy":46.1,"Kaze":43.5,"Leon":42.2,"Lumi":42,"Colette":41.7,
  "Willow":41.5,"Shelly":39.5,"Brock":39.1,"Kit":39.1,"Mandy":31.6}},
{name:"Out in the Open", mode:"Knockout", img:"outintheopen", n:1979079, active:true, updated:"2026-09-08", wr:{
  "Bolt":59,"Brock":58.1,"8-Bit":52.9,"Edgar":51.4,"Bo":50.9,"Gray":50.1,"Leon":49.9,"Starr Nova":49.8,
  "Mandy":49.6,"Griff":49,"Emz":48.8,"Gale":48.5,"Mortis":47.4,"Surge":47.3,"Kit":46.8,"Bibi":46.1,
  "Cordelius":46,"Nori":45.4,"Crow":44.8,"Frank":43.2,"Willow":43.1,"Ziggy":42.6,"Lumi":42.5,"Nita":42,
  "Shelly":42,"Trunk":42,"Colette":41.9,"Kaze":40.8,"Chuck":39.9}},
{name:"Parallel Plays", mode:"Hot Zone", img:"parallelplays", n:1938762, active:true, updated:"2026-09-08", wr:{
  "Bibi":58.3,"Trunk":55.4,"Bolt":55,"Nita":54.4,"Surge":54.2,"Edgar":53.2,"Nori":51.9,"Cordelius":49.9,
  "Starr Nova":49.2,"Griff":49,"Mortis":47.4,"Willow":47.2,"Gale":46.6,"Kit":46.3,"Lumi":45.8,"Emz":45.6,
  "Frank":44.7,"Shelly":44.4,"Leon":43.8,"Ziggy":43.1,"Gray":43,"Bo":42.7,"Kaze":42.6,"Brock":42.2,
  "Chuck":41.8,"Crow":41.2,"8-Bit":40.3,"Colette":40,"Mandy":34.6}},
{name:"Penalty Kick", mode:"Brawl Ball", img:"penaltykick", n:200000, active:false, updated:"2024-11-06", wr:{
  "Frank":61.9,"Nita":58,"Bibi":56.7,"Surge":52.4,"Edgar":51.3,"Cordelius":48.2,"Griff":47.4,"Willow":46.5,
  "Gale":46.2,"Shelly":44.9,"Mortis":44.4,"Crow":43.7,"Emz":43.3,"Leon":42.8,"Kit":42.6,"Gray":40.9,"Bo":40.5,
  "Colette":38.4,"Brock":35.9,"8-Bit":35.2,"Mandy":32.9,"Chuck":25}},
{name:"Pinball Dreams", mode:"Brawl Ball", img:"pinballdreams", n:1958089, active:true, updated:"2026-09-08", wr:{
  "Griff":55.1,"Bibi":55,"Frank":53.1,"Surge":53.1,"Nita":53,"8-Bit":51.4,"Edgar":51.4,"Starr Nova":51.3,
  "Bo":51.1,"Emz":50.8,"Gale":50.7,"Willow":50,"Cordelius":49.7,"Bolt":49.6,"Nori":48.1,"Ziggy":48,
  "Brock":47.6,"Trunk":47.6,"Crow":46.6,"Lumi":45.2,"Mortis":44.7,"Shelly":43.5,"Colette":42.9,"Gray":42.1,
  "Leon":42,"Kit":41.2,"Mandy":39.7,"Kaze":39.4,"Chuck":35.2}},
{name:"Pinhole Punt", mode:"Brawl Ball", img:"pinholepunt", n:204936, active:true, updated:"2026-08-26", wr:{
  "Bibi":55,"Frank":54.1,"Nita":53.4,"Griff":53.2,"Trunk":53.2,"Crow":52.4,"Starr Nova":52.3,"Bolt":51.7,
  "Emz":51.1,"Gale":50.8,"Bo":50.6,"Lumi":48.8,"Surge":48.7,"Edgar":46.5,"Leon":46.5,"Shelly":46.4,
  "Cordelius":45.8,"Colette":45.7,"Willow":45.6,"8-Bit":45.5,"Kaze":45.5,"Nori":45.2,"Mortis":44.2,
  "Brock":41.9,"Kit":41,"Gray":40.4,"Mandy":40.3,"Chuck":29}},
{name:"Pit Stop", mode:"Heist", img:"pitstop", n:859571, active:true, updated:"2026-08-25", wr:{
  "Nori":62.5,"Bibi":60.7,"Edgar":58.1,"Nita":58,"Cordelius":55.6,"Griff":51.1,"Surge":50.2,"Kaze":50.1,
  "Starr Nova":50.1,"Lumi":49.2,"Trunk":48.7,"Kit":48.4,"Bolt":48,"Emz":47.3,"Crow":46.5,"8-Bit":45.9,
  "Frank":45.4,"Brock":44,"Bo":43.2,"Ziggy":43.2,"Leon":42.6,"Colette":42.5,"Willow":42,"Gale":41.8,
  "Chuck":41.7,"Gray":40.7,"Shelly":39.2,"Mortis":38.9,"Mandy":37.7}},
{name:"Quick Travel", mode:"Hot Zone", img:"quicktravel", n:192464, active:false, updated:"2026-05-19", wr:{
  "Nita":60.2,"Trunk":58.5,"Bibi":58,"Frank":56.1,"Cordelius":54.8,"Griff":51.7,"Surge":50.9,"Crow":49.8,
  "Gale":49.3,"Edgar":48.8,"Shelly":48.8,"Emz":48.4,"Bo":47.1,"Gray":47.1,"Leon":47.1,"Kit":45.6,
  "Mortis":45.4,"Willow":43.9,"Colette":43.4,"Kaze":43.3,"8-Bit":42,"Chuck":38.4,"Ziggy":35.3,"Mandy":35.1,
  "Lumi":34.3,"Brock":32.2}},
{name:"Ring of Fire", mode:"Hot Zone", img:"ringoffire", n:1945706, active:true, updated:"2026-09-08", wr:{
  "Bolt":63.8,"Bo":59.6,"Griff":57.7,"Chuck":55.4,"Starr Nova":55.1,"Gale":53.8,"Gray":53.8,"Bibi":53.3,
  "8-Bit":52.9,"Surge":52.1,"Nita":51.6,"Emz":51.3,"Mortis":51.1,"Nori":50.4,"Edgar":50.2,"Crow":49.7,
  "Frank":49.7,"Trunk":48.5,"Cordelius":44.9,"Kaze":44.2,"Colette":43.8,"Leon":43.6,"Brock":42.1,
  "Shelly":40.4,"Kit":38.7,"Lumi":38.5,"Ziggy":36,"Willow":32.5,"Mandy":32.3}},
{name:"Rustic Arcade", mode:"Gem Grab", img:"rusticarcade", n:1838336, active:true, updated:"2026-08-26", wr:{
  "Bolt":67.7,"Bo":57,"8-Bit":56.1,"Starr Nova":54.7,"Surge":53.1,"Griff":52.4,"Crow":51.8,"Mortis":51,
  "Gale":50.3,"Edgar":49.7,"Leon":49.5,"Nita":49.5,"Brock":48.8,"Nori":48.5,"Emz":48.4,"Gray":47.6,
  "Bibi":47.4,"Chuck":47,"Kit":44.8,"Colette":44.6,"Lumi":44.2,"Cordelius":44.1,"Trunk":43.6,"Kaze":43.4,
  "Mandy":43,"Frank":42.3,"Shelly":40.9,"Ziggy":39.8,"Willow":36.6}},
{name:"Safe Zone", mode:"Heist", img:"safezone", n:1932968, active:true, updated:"2026-09-08", wr:{
  "Nori":64.1,"Chuck":63.9,"Bolt":61.8,"Starr Nova":55.6,"Edgar":54.2,"8-Bit":53.6,"Bibi":53.5,"Nita":53.3,
  "Bo":50.7,"Kaze":50.3,"Griff":49.7,"Brock":48.5,"Colette":48.1,"Surge":48.1,"Emz":47.8,"Crow":47,
  "Gale":46.1,"Trunk":45.9,"Cordelius":45.5,"Mandy":45.1,"Lumi":42.9,"Gray":42.1,"Kit":41.6,"Frank":40.5,
  "Mortis":40.5,"Ziggy":38.9,"Leon":38.2,"Shelly":35.4,"Willow":35}},
{name:"Shooting Star", mode:"Bounty", img:"shootingstar", n:1962500, active:true, updated:"2026-09-08", wr:{
  "Bolt":65.5,"Brock":55.4,"8-Bit":53.3,"Bo":52.6,"Leon":51.6,"Mandy":50.7,"Gray":50.2,"Mortis":49,
  "Edgar":48.3,"Surge":47.9,"Starr Nova":47.3,"Gale":45.6,"Chuck":45.5,"Crow":45.3,"Griff":45.1,"Nori":44.5,
  "Kaze":44.3,"Ziggy":44.1,"Emz":43.7,"Kit":43.1,"Willow":42.8,"Bibi":41.9,"Colette":41.2,"Cordelius":40.6,
  "Lumi":39.2,"Nita":39.2,"Shelly":37.8,"Trunk":36.8,"Frank":36.4}},
{name:"Snake Prairie", mode:"Bounty", img:"snakeprairie", n:199887, active:false, updated:"2025-02-24", wr:{
  "Bo":62,"Shelly":55.4,"Emz":54.4,"Frank":51.1,"Griff":47.6,"Crow":45.6,"Surge":45.6,"Nita":44.7,"Gale":44.6,
  "Brock":43.9,"Mortis":43.5,"8-Bit":41.3,"Bibi":41.2,"Colette":40.4,"Leon":40.4,"Cordelius":40,"Edgar":40,
  "Gray":39.8,"Kit":37.9,"Mandy":34,"Willow":29.9,"Chuck":25.5}},
{name:"Sneaky Fields", mode:"Brawl Ball", img:"sneakyfields", n:1963547, active:true, updated:"2026-09-08", wr:{
  "Nita":55.8,"Griff":55.5,"Bibi":55.3,"Frank":53.8,"Emz":52.4,"Gale":50.8,"Surge":50.7,"Edgar":49.7,
  "Cordelius":48.9,"Bo":48.8,"Trunk":48.4,"8-Bit":48.1,"Starr Nova":47.8,"Lumi":47.7,"Shelly":47.3,
  "Willow":46.7,"Bolt":46.1,"Crow":45.4,"Nori":44.4,"Colette":42.9,"Brock":42.4,"Ziggy":42.3,"Mortis":40.8,
  "Leon":39.6,"Kit":39.4,"Gray":37.8,"Kaze":37.7,"Mandy":35.8,"Chuck":31.8}},
{name:"Spiraling Out", mode:"Brawl Ball", img:"spiralingout", n:383915, active:true, updated:"2026-09-08", wr:{
  "Bibi":55,"Bolt":54.7,"Frank":51.9,"Nita":51.9,"Starr Nova":51.6,"Griff":51.5,"Surge":51,"Emz":50.9,
  "Edgar":50.7,"Cordelius":49.5,"Gale":49.5,"8-Bit":48.4,"Nori":47.9,"Leon":46.8,"Trunk":46.7,"Lumi":46.5,
  "Bo":46.4,"Mortis":46.4,"Willow":46.3,"Ziggy":45.8,"Colette":45.4,"Crow":45.3,"Brock":45.2,"Gray":44.7,
  "Shelly":44.2,"Kit":43.7,"Kaze":40.7,"Chuck":36.2,"Mandy":35.4}},
{name:"Triple Dribble", mode:"Brawl Ball", img:"tripledribble", n:1959284, active:true, updated:"2026-09-08", wr:{
  "Bibi":55.6,"Nita":54.5,"Willow":54,"Surge":53.3,"Griff":52.6,"Frank":51.8,"Edgar":51.6,"Emz":51.6,
  "Starr Nova":49.9,"Ziggy":49.9,"Cordelius":49.8,"Gale":49.3,"Lumi":48.5,"Trunk":48.2,"Nori":47.7,"Bo":46.2,
  "Bolt":45.7,"8-Bit":44.6,"Crow":44.5,"Brock":44,"Shelly":43.6,"Mortis":43.1,"Colette":42.1,"Gray":42,
  "Kit":41.2,"Leon":40.8,"Kaze":39.8,"Mandy":36.3,"Chuck":32.1}},
{name:"Undermine", mode:"Gem Grab", img:"undermine", n:1940637, active:true, updated:"2026-09-08", wr:{
  "Bolt":62.6,"Bo":55.9,"Surge":53.9,"8-Bit":53.8,"Starr Nova":53.7,"Nita":53.2,"Griff":52.9,"Crow":51,
  "Bibi":50.6,"Emz":50.3,"Edgar":50.2,"Gale":50.2,"Mortis":48.7,"Nori":47.9,"Trunk":47.7,"Frank":46.7,
  "Cordelius":46.6,"Leon":46.1,"Brock":45.7,"Gray":45.7,"Lumi":45.2,"Shelly":44.4,"Chuck":43.8,"Colette":43.4,
  "Kit":42.9,"Kaze":41.5,"Mandy":40.8,"Ziggy":40.4,"Willow":39.5}}
];
