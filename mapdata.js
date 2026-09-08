// Per-map RANKED win rates (all leagues), source: Brawl Planet, Sept 2026
// Only brawlers in Kerry's pool (25 x Lv11 + 4 season-free) are recorded.
const MAPS = [
{name:"Kaboom Canyon", mode:"Heist", n:"1.93M", wr:{
"Nori":64.8,"Bolt":57.2,"Bibi":56.5,"Nita":56.3,"Edgar":55.0,"8-Bit":54.5,"Starr Nova":54.2,
"Chuck":53.2,"Griff":53.1,"Kaze":51.0,"Emz":49.5,"Colette":49.4,"Bo":49.2,"Cordelius":49.1,
"Surge":48.9,"Crow":48.5,"Gale":48.2,"Lumi":47.2,"Trunk":46.7,"Brock":46.5,"Frank":44.3,
"Kit":42.9,"Gray":42.5,"Leon":40.7,"Mandy":38.7,"Mortis":38.3,"Shelly":37.9,"Willow":33.6,"Ziggy":32.0}},

{name:"Ring of Fire", mode:"Hot Zone", n:"1.94M", wr:{
"Bolt":63.9,"Bo":59.7,"Griff":57.7,"Chuck":55.4,"Starr Nova":55.1,"Gray":53.9,"Gale":53.8,
"Bibi":53.3,"8-Bit":52.9,"Surge":52.1,"Nita":51.6,"Emz":51.3,"Mortis":51.1,"Nori":50.4,
"Edgar":50.2,"Frank":49.7,"Crow":49.7,"Trunk":48.5,"Cordelius":44.9,"Kaze":44.2,"Colette":43.8,
"Leon":43.6,"Brock":42.1,"Shelly":40.4,"Kit":38.7,"Lumi":38.4,"Ziggy":36.0,"Willow":32.5,"Mandy":32.3}},

{name:"Belle's Rock", mode:"Knockout", n:"1.97M", wr:{
"Bolt":59.9,"Brock":56.4,"Gray":55.6,"Edgar":55.0,"Leon":50.9,"Ziggy":49.9,"Starr Nova":49.6,
"Mortis":49.4,"Willow":49.3,"8-Bit":49.1,"Kit":48.9,"Nori":48.6,"Mandy":48.3,"Cordelius":48.2,
"Surge":48.0,"Bibi":47.2,"Bo":46.8,"Gale":46.2,"Emz":45.6,"Griff":45.0,"Chuck":44.3,
"Trunk":43.5,"Lumi":43.1,"Frank":42.8,"Crow":41.9,"Shelly":41.9,"Colette":41.2,"Nita":40.9,"Kaze":40.4}},
];

MAPS.push(
{name:"Flaring Phoenix", mode:"Knockout", n:"1.97M", wr:{
"Bolt":58.2,"Brock":56.6,"Edgar":55.5,"Gray":54.0,"8-Bit":51.7,"Mandy":50.7,"Surge":50.2,
"Bo":49.7,"Leon":49.6,"Starr Nova":49.5,"Emz":49.1,"Willow":49.0,"Cordelius":48.8,"Griff":48.6,
"Gale":48.4,"Bibi":48.1,"Kit":48.1,"Mortis":47.8,"Ziggy":47.5,"Nori":46.4,"Frank":46.0,
"Trunk":45.7,"Shelly":45.5,"Crow":44.4,"Chuck":43.8,"Nita":42.9,"Lumi":42.6,"Colette":41.7,"Kaze":40.0}},

{name:"Undermine", mode:"Gem Grab", n:"1.94M", wr:{
"Bolt":62.6,"Bo":55.9,"Surge":53.9,"8-Bit":53.8,"Starr Nova":53.7,"Nita":53.2,"Griff":52.9,
"Bibi":50.6,"Emz":50.3,"Edgar":50.2,"Gale":50.2,"Crow":51.0,"Mortis":48.7,"Nori":47.9,
"Trunk":47.7,"Frank":46.7,"Cordelius":46.6,"Leon":46.1,"Brock":45.7,"Gray":45.7,"Lumi":45.1,
"Shelly":44.4,"Chuck":43.8,"Colette":43.3,"Kit":42.9,"Kaze":41.5,"Mandy":40.8,"Ziggy":40.4,"Willow":39.5}}
);

MAPS.push(
{name:"Hard Rock Mine", mode:"Gem Grab", n:"1.93M", wr:{
"Bolt":60.6,"Bo":56.1,"Surge":53.7,"Bibi":53.2,"Nita":53.2,"8-Bit":53.1,"Starr Nova":52.8,
"Griff":51.6,"Edgar":51.3,"Crow":50.1,"Emz":50.1,"Trunk":49.4,"Gale":49.0,"Mortis":49.1,
"Nori":48.7,"Cordelius":47.6,"Leon":47.1,"Brock":45.9,"Frank":45.2,"Shelly":44.9,"Kit":44.7,
"Gray":44.6,"Lumi":44.4,"Chuck":43.8,"Colette":42.2,"Ziggy":41.9,"Kaze":41.6,"Mandy":40.5,"Willow":40.5}}
);

MAPS.push(
{name:"Sneaky Fields", mode:"Brawl Ball", n:"1.96M", wr:{
"Nita":55.8,"Griff":55.5,"Bibi":55.3,"Frank":53.8,"Emz":52.4,"Gale":50.8,"Surge":50.7,
"Edgar":49.7,"Cordelius":48.9,"Bo":48.8,"Trunk":48.5,"8-Bit":48.1,"Starr Nova":47.8,
"Lumi":47.7,"Shelly":47.3,"Willow":46.7,"Bolt":46.1,"Crow":45.4,"Nori":44.4,"Ziggy":42.3,
"Colette":42.9,"Brock":42.4,"Mortis":40.8,"Leon":39.6,"Kit":39.4,"Gray":37.8,"Kaze":37.7,
"Mandy":35.8,"Chuck":31.7}}
);

MAPS.push(
{name:"Hideout", mode:"Bounty", n:"1.97M", wr:{
"Bolt":66.2,"Brock":55.2,"Bo":53.2,"Leon":53.0,"8-Bit":52.7,"Mortis":51.4,"Gray":51.2,
"Edgar":50.5,"Surge":50.5,"Starr Nova":49.8,"Mandy":49.4,"Griff":47.2,"Gale":46.6,
"Crow":46.2,"Kaze":45.9,"Nori":45.5,"Kit":45.4,"Ziggy":45.4,"Willow":45.0,"Emz":44.9,
"Cordelius":43.6,"Chuck":43.4,"Bibi":43.3,"Colette":41.9,"Lumi":40.6,"Trunk":40.0,
"Nita":39.7,"Frank":39.2,"Shelly":38.6}}
);
