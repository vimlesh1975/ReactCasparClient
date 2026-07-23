import * as RealTemplates from "./real_templates_output";

export const OLYMPIC_GAMES_DATA = [
  {
    id: "aquatics-swimming",
    name: "Aquatics - Swimming",
    code: "SW",
    category: "Aquatics",
    venue: "Aquatics Centre",
    primaryColor: "#0077be",
    secondaryColor: "#00d2ff",
    accentColor: "#ffffff",
    dataFields: {
      athlete: "Michael Phelps",
      country: "USA",
      flag: "🇺🇸",
      event: "Men's 100m Butterfly",
      lane: "4",
      time: "50.58",
      rank: "1st"
    },
    lineup: [
      { lane: 1, name: "Chad le Clos", country: "RSA", time: "50.83" },
      { lane: 2, name: "Evgeny Korotyshkin", country: "RUS", time: "51.15" },
      { lane: 3, name: "Milorad Čavić", country: "SRB", time: "51.24" },
      { lane: 4, name: "Michael Phelps", country: "USA", time: "50.58" },
      { lane: 5, name: "Tyler McGill", country: "USA", time: "51.63" },
      { lane: 6, name: "Steffen Deibler", country: "GER", time: "51.81" }
    ]
  },
  {
    id: "aquatics-diving",
    name: "Aquatics - Diving",
    code: "DV",
    category: "Aquatics",
    venue: "Aquatics Centre",
    primaryColor: "#005b96",
    secondaryColor: "#6497b1",
    accentColor: "#ffd700",
    dataFields: {
      athlete: "Tom Daley",
      country: "GBR",
      flag: "🇬🇧",
      event: "Men's 10m Platform",
      round: "Final - Dive 6",
      score: "556.95",
      rank: "3rd"
    }
  },
  {
    id: "aquatics-waterpolo",
    name: "Aquatics - Water Polo",
    code: "WP",
    category: "Aquatics",
    venue: "Water Polo Arena",
    primaryColor: "#004080",
    secondaryColor: "#00aaff",
    accentColor: "#ffffff",
    dataFields: {
      teamA: "CROATIA",
      scoreA: "8",
      teamB: "ITALY",
      scoreB: "6",
      period: "4th Quarter",
      clock: "02:45"
    }
  },
  {
    id: "aquatics-synchro",
    name: "Aquatics - Synchronised Swimming",
    code: "SY",
    category: "Aquatics",
    venue: "Aquatics Centre",
    primaryColor: "#00a896",
    secondaryColor: "#028090",
    accentColor: "#f0f3f4",
    dataFields: {
      athlete: "Natalia Ishchenko / Svetlana Romashina",
      country: "RUS",
      flag: "🇷🇺",
      event: "Duets Free Routine",
      score: "98.900",
      rank: "1st"
    }
  },
  {
    id: "athletics-track",
    name: "Athletics - Track & Field",
    code: "AT",
    category: "Athletics",
    venue: "Olympic Stadium",
    primaryColor: "#c0392b",
    secondaryColor: "#e74c3c",
    accentColor: "#f1c40f",
    dataFields: {
      athlete: "Usain Bolt",
      country: "JAM",
      flag: "🇯🇲",
      event: "Men's 100m Final",
      bib: "2160",
      time: "9.63 OR",
      rank: "GOLD"
    },
    lineup: [
      { lane: 2, name: "Richard Thompson", country: "TRI", time: "9.98" },
      { lane: 3, name: "Asafa Powell", country: "JAM", time: "11.99" },
      { lane: 4, name: "Yohan Blake", country: "JAM", time: "9.75" },
      { lane: 5, name: "Usain Bolt", country: "JAM", time: "9.63" },
      { lane: 6, name: "Tyson Gay", country: "USA", time: "9.80" },
      { lane: 7, name: "Ryan Bailey", country: "USA", time: "9.88" },
      { lane: 8, name: "Justin Gatlin", country: "USA", time: "9.79" }
    ]
  },
  {
    id: "athletics-marathon",
    name: "Athletics - Marathon & Race Walk",
    code: "MA",
    category: "Athletics",
    venue: "The Mall",
    primaryColor: "#9b59b6",
    secondaryColor: "#8e44ad",
    accentColor: "#ffffff",
    dataFields: {
      athlete: "Stephen Kiprotich",
      country: "UGA",
      flag: "🇺🇬",
      event: "Men's Marathon",
      distance: "42.195 km",
      time: "2:08:01",
      gap: "+0:00"
    }
  },
  {
    id: "archery",
    name: "Archery",
    code: "AR",
    category: "Precision",
    venue: "Lord's Cricket Ground",
    primaryColor: "#27ae60",
    secondaryColor: "#2ecc71",
    accentColor: "#f39c12",
    dataFields: {
      athlete: "Oh Jin-Hyek",
      country: "KOR",
      flag: "🇰🇷",
      event: "Men's Individual",
      setPoints: "7 - 1",
      targetArrow: "10 (X)"
    }
  },
  {
    id: "badminton",
    name: "Badminton",
    code: "BD",
    category: "Racquet",
    venue: "Wembley Arena",
    primaryColor: "#d35400",
    secondaryColor: "#e67e22",
    accentColor: "#ffffff",
    dataFields: {
      teamA: "Lin Dan (CHN)",
      scoreA: "2",
      teamB: "Lee Chong Wei (MAS)",
      scoreB: "1",
      sets: "15-21, 21-10, 21-19"
    }
  },
  {
    id: "basketball",
    name: "Basketball",
    code: "BK",
    category: "Ball Sports",
    venue: "North Greenwich Arena",
    primaryColor: "#e67e22",
    secondaryColor: "#d35400",
    accentColor: "#ffffff",
    dataFields: {
      teamA: "USA",
      scoreA: "107",
      teamB: "SPAIN",
      scoreB: "100",
      period: "4th Qtr",
      clock: "00:34.2"
    }
  },
  {
    id: "beach-volleyball",
    name: "Beach Volleyball",
    code: "BV",
    category: "Ball Sports",
    venue: "Horse Guards Parade",
    primaryColor: "#f1c40f",
    secondaryColor: "#f39c12",
    accentColor: "#2980b9",
    dataFields: {
      teamA: "May-Treanor / Walsh (USA)",
      scoreA: "2",
      teamB: "Kessy / Ross (USA)",
      scoreB: "0",
      setScore: "21-16, 21-16"
    }
  },
  {
    id: "boxing",
    name: "Boxing",
    code: "BX",
    category: "Combat",
    venue: "ExCeL South Hall 2",
    primaryColor: "#c0392b",
    secondaryColor: "#2c3e50",
    accentColor: "#f1c40f",
    dataFields: {
      athleteA: "Anthony Joshua (GBR)",
      scoreA: "18",
      athleteB: "Roberto Cammarelle (ITA)",
      scoreB: "18 (CB)",
      weightClass: "Super Heavy (+91kg)",
      round: "Round 3 Final"
    }
  },
  {
    id: "canoe-slalom",
    name: "Canoe Slalom",
    code: "CS",
    category: "Water",
    venue: "Lee Valley White Water Centre",
    primaryColor: "#16a085",
    secondaryColor: "#1abc9c",
    accentColor: "#ffffff",
    dataFields: {
      athlete: "Etienne Stott / Tim Baillie",
      country: "GBR",
      flag: "🇬🇧",
      event: "Men's Canoe Double (C2)",
      time: "106.41 s",
      penalty: "0"
    }
  },
  {
    id: "canoe-sprint",
    name: "Canoe Sprint",
    code: "CF",
    category: "Water",
    venue: "Eton Dorney",
    primaryColor: "#2980b9",
    secondaryColor: "#3498db",
    accentColor: "#f1c40f",
    dataFields: {
      athlete: "Ed McKeever",
      country: "GBR",
      flag: "🇬🇧",
      event: "Men's Kayak Single 200m",
      time: "36.246 s",
      rank: "GOLD"
    }
  },
  {
    id: "cycling-bmx",
    name: "Cycling - BMX",
    code: "CB",
    category: "Cycling",
    venue: "BMX Track",
    primaryColor: "#e74c3c",
    secondaryColor: "#c0392b",
    accentColor: "#f1c40f",
    dataFields: {
      athlete: "Maris Strombergs",
      country: "LAT",
      flag: "🇱🇻",
      event: "Men's BMX Final",
      time: "37.576 s",
      rank: "1st"
    }
  },
  {
    id: "cycling-mountainbike",
    name: "Cycling - Mountain Bike",
    code: "CM",
    category: "Cycling",
    venue: "Hadleigh Farm",
    primaryColor: "#27ae60",
    secondaryColor: "#1e8449",
    accentColor: "#ffffff",
    dataFields: {
      athlete: "Jaroslav Kulhavý",
      country: "CZE",
      flag: "🇨🇿",
      event: "Men's Cross-Country",
      time: "1:29:07",
      gap: "+0:00"
    }
  },
  {
    id: "cycling-road",
    name: "Cycling - Road Race & Time Trial",
    code: "CR",
    category: "Cycling",
    venue: "Hampton Court Palace / The Mall",
    primaryColor: "#8e44ad",
    secondaryColor: "#9b59b6",
    accentColor: "#f1c40f",
    dataFields: {
      athlete: "Bradley Wiggins",
      country: "GBR",
      flag: "🇬🇧",
      event: "Men's Individual Time Trial",
      time: "50:39.54",
      gap: "-42.00 (GOLD)"
    }
  },
  {
    id: "cycling-track",
    name: "Cycling - Track",
    code: "CT",
    category: "Cycling",
    venue: "Velodrome",
    primaryColor: "#2980b9",
    secondaryColor: "#1f618d",
    accentColor: "#f1c40f",
    dataFields: {
      athlete: "Chris Hoy",
      country: "GBR",
      flag: "🇬🇧",
      event: "Men's Keirin Final",
      speed: "73.2 km/h",
      rank: "GOLD"
    }
  },
  {
    id: "equestrian",
    name: "Equestrian",
    code: "EQ",
    category: "Equine",
    venue: "Greenwich Park",
    primaryColor: "#4a235a",
    secondaryColor: "#7d3c98",
    accentColor: "#f1c40f",
    dataFields: {
      athlete: "Charlotte Dujardin / Valegro",
      country: "GBR",
      flag: "🇬🇧",
      event: "Individual Dressage",
      score: "90.089 %",
      rank: "GOLD"
    }
  },
  {
    id: "fencing",
    name: "Fencing",
    code: "FE",
    category: "Combat",
    venue: "ExCeL South Hall 1",
    primaryColor: "#2c3e50",
    secondaryColor: "#34495e",
    accentColor: "#00d2ff",
    dataFields: {
      athleteA: "Lei Sheng (CHN)",
      scoreA: "15",
      athleteB: "Alaaeldin Abouelkassem (EGY)",
      scoreB: "12",
      event: "Men's Individual Foil Final"
    }
  },
  {
    id: "football",
    name: "Football",
    code: "FB",
    category: "Ball Sports",
    venue: "Wembley Stadium",
    primaryColor: "#1e8449",
    secondaryColor: "#27ae60",
    accentColor: "#ffffff",
    dataFields: {
      teamA: "MEXICO",
      scoreA: "2",
      teamB: "BRAZIL",
      scoreB: "1",
      period: "Full Time (90+3')",
      clock: "93:00"
    }
  },
  {
    id: "gymnastics-artistic",
    name: "Gymnastics - Artistic",
    code: "GA",
    category: "Gymnastics",
    venue: "North Greenwich Arena",
    primaryColor: "#0f172a",
    secondaryColor: "#1e293b",
    accentColor: "#38bdf8",
    dataFields: {
      athlete: "Gabby Douglas",
      country: "USA",
      flag: "🇺🇸",
      event: "Women's Individual All-Around",
      apparatus: "Floor Exercise",
      score: "62.232",
      rank: "1st (GOLD)"
    }
  },
  {
    id: "gymnastics-rhythmic",
    name: "Gymnastics - Rhythmic",
    code: "GR",
    category: "Gymnastics",
    venue: "Wembley Arena",
    primaryColor: "#d2b4de",
    secondaryColor: "#bb8fce",
    accentColor: "#4a235a",
    dataFields: {
      athlete: "Evgeniya Kanaeva",
      country: "RUS",
      flag: "🇷🇺",
      event: "Individual All-Around",
      score: "116.900",
      rank: "GOLD"
    }
  },
  {
    id: "gymnastics-trampoline",
    name: "Gymnastics - Trampoline",
    code: "GT",
    category: "Gymnastics",
    venue: "North Greenwich Arena",
    primaryColor: "#5b2c6f",
    secondaryColor: "#76448a",
    accentColor: "#f1c40f",
    dataFields: {
      athlete: "Dong Dong",
      country: "CHN",
      flag: "🇨🇳",
      event: "Men's Trampoline Final",
      diffScore: "17.800",
      exeScore: "45.099",
      totalScore: "62.899"
    }
  },
  {
    id: "handball",
    name: "Handball",
    code: "HB",
    category: "Ball Sports",
    venue: "Handball Arena / Basketball Arena",
    primaryColor: "#d68910",
    secondaryColor: "#f39c12",
    accentColor: "#ffffff",
    dataFields: {
      teamA: "FRANCE",
      scoreA: "22",
      teamB: "SWEDEN",
      scoreB: "21",
      period: "2nd Half",
      clock: "59:45"
    }
  },
  {
    id: "hockey",
    name: "Hockey",
    code: "HO",
    category: "Ball Sports",
    venue: "Riverbank Arena",
    primaryColor: "#1f618d",
    secondaryColor: "#2980b9",
    accentColor: "#f1c40f",
    dataFields: {
      teamA: "GERMANY",
      scoreA: "2",
      teamB: "NETHERLANDS",
      scoreB: "1",
      period: "2nd Half",
      clock: "68:12"
    }
  },
  {
    id: "judo",
    name: "Judo",
    code: "JU",
    category: "Combat",
    venue: "ExCeL North Hall 2",
    primaryColor: "#212f3d",
    secondaryColor: "#2874a6",
    accentColor: "#f1c40f",
    dataFields: {
      athleteA: "Teddy Riner (FRA)",
      scoreA: "Waza-ari",
      athleteB: "Alexander Mikhaylin (RUS)",
      scoreB: "Shido (2)",
      weightClass: "Men's +100kg Final"
    }
  },
  {
    id: "modern-pentathlon",
    name: "Modern Pentathlon",
    code: "MP",
    category: "Multi-Sport",
    venue: "Greenwich Park / Aquatics Centre",
    primaryColor: "#117864",
    secondaryColor: "#16a085",
    accentColor: "#f1c40f",
    dataFields: {
      athlete: "David Svoboda",
      country: "CZE",
      flag: "🇨🇿",
      event: "Men's Combined Run/Shoot",
      points: "5928 pts",
      rank: "OR (GOLD)"
    }
  },
  {
    id: "rowing",
    name: "Rowing",
    code: "RO",
    category: "Water",
    venue: "Eton Dorney",
    primaryColor: "#1f618d",
    secondaryColor: "#2874a6",
    accentColor: "#ffffff",
    dataFields: {
      athlete: "Glover / Stanning",
      country: "GBR",
      flag: "🇬🇧",
      event: "Women's Pair Final (W2-)",
      time: "7:27.13",
      rank: "GOLD"
    }
  },
  {
    id: "sailing",
    name: "Sailing",
    code: "SA",
    category: "Water",
    venue: "Weymouth and Portland",
    primaryColor: "#117a65",
    secondaryColor: "#138d75",
    accentColor: "#f1c40f",
    dataFields: {
      athlete: "Ben Ainslie",
      country: "GBR",
      flag: "🇬🇧",
      event: "Finn Class Medal Race",
      points: "46 pts",
      rank: "GOLD"
    }
  },
  {
    id: "shooting",
    name: "Shooting",
    code: "SH",
    category: "Precision",
    venue: "Royal Artillery Barracks",
    primaryColor: "#78281f",
    secondaryColor: "#943126",
    accentColor: "#f1c40f",
    dataFields: {
      athlete: "Niccolò Campriani",
      country: "ITA",
      flag: "🇮🇹",
      event: "Men's 50m Rifle 3 Positions",
      score: "1278.5 pts",
      rank: "OR (GOLD)"
    }
  },
  {
    id: "table-tennis",
    name: "Table Tennis",
    code: "TT",
    category: "Racquet",
    venue: "ExCeL North Hall 1",
    primaryColor: "#b9770e",
    secondaryColor: "#d68910",
    accentColor: "#ffffff",
    dataFields: {
      athleteA: "Zhang Jike (CHN)",
      scoreA: "4",
      athleteB: "Wang Hao (CHN)",
      scoreB: "1",
      sets: "18-16, 11-5, 11-6, 10-12, 11-13"
    }
  },
  {
    id: "taekwondo",
    name: "Taekwondo",
    code: "TK",
    category: "Combat",
    venue: "ExCeL South Hall 1",
    primaryColor: "#922b21",
    secondaryColor: "#b03a2e",
    accentColor: "#f1c40f",
    dataFields: {
      athleteA: "Jade Jones (GBR)",
      scoreA: "6",
      athleteB: "Yuzhuo Hou (CHN)",
      scoreB: "4",
      weightClass: "Women's -57kg Final"
    }
  },
  {
    id: "tennis",
    name: "Tennis",
    code: "TE",
    category: "Racquet",
    venue: "Wimbledon (Centre Court)",
    primaryColor: "#196f3d",
    secondaryColor: "#229954",
    accentColor: "#ffffff",
    dataFields: {
      athleteA: "Andy Murray (GBR)",
      scoreA: "3",
      athleteB: "Roger Federer (SUI)",
      scoreB: "0",
      sets: "6-2, 6-1, 6-4"
    }
  },
  {
    id: "triathlon",
    name: "Triathlon",
    code: "TR",
    category: "Multi-Sport",
    venue: "Hyde Park",
    primaryColor: "#0e6655",
    secondaryColor: "#117864",
    accentColor: "#f1c40f",
    dataFields: {
      athlete: "Alistair Brownlee",
      country: "GBR",
      flag: "🇬🇧",
      event: "Men's Triathlon",
      time: "1:46:25",
      gap: "+0:11 (GOLD)"
    }
  },
  {
    id: "volleyball",
    name: "Volleyball",
    code: "VO",
    category: "Ball Sports",
    venue: "Earls Court",
    primaryColor: "#1b4f72",
    secondaryColor: "#21618c",
    accentColor: "#ffffff",
    dataFields: {
      teamA: "RUSSIA",
      scoreA: "3",
      teamB: "BRAZIL",
      scoreB: "2",
      sets: "19-25, 20-25, 29-27, 22-25, 15-9"
    }
  },
  {
    id: "weightlifting",
    name: "Weightlifting",
    code: "WL",
    category: "Heavy",
    venue: "ExCeL South Hall 3",
    primaryColor: "#6c3483",
    secondaryColor: "#7d3c98",
    accentColor: "#f1c40f",
    dataFields: {
      athlete: "Behdad Salimi",
      country: "IRI",
      flag: "🇮🇷",
      event: "Men's +105kg",
      snatch: "208 kg",
      cleanJerk: "247 kg",
      total: "455 kg (GOLD)"
    }
  },
  {
    id: "wrestling",
    name: "Wrestling",
    code: "WR",
    category: "Combat",
    venue: "ExCeL North Hall 2",
    primaryColor: "#7b241c",
    secondaryColor: "#922b21",
    accentColor: "#f1c40f",
    dataFields: {
      athleteA: "Jordan Burroughs (USA)",
      scoreA: "3",
      athleteB: "Sadegh Goudarzi (IRI)",
      scoreB: "0",
      weightClass: "Men's Freestyle 74kg"
    }
  }
];

// Import real template definitions


// Consolidated registry mapping sport codes to their template arrays
export const TEMPLATE_REGISTRY = {
  SW: RealTemplates.SW_TEMPLATES,
  AT: RealTemplates.AT_TEMPLATES,
  AR: RealTemplates.AR_TEMPLATES,
  BD: RealTemplates.BD_TEMPLATES,
  BK: RealTemplates.BK_TEMPLATES,
  BV: RealTemplates.BV_TEMPLATES,
  BX: RealTemplates.BX_TEMPLATES,
  CS: RealTemplates.CS_TEMPLATES,
  CF: RealTemplates.CF_TEMPLATES,
  CT: RealTemplates.CT_TEMPLATES,
  CR: RealTemplates.CR_TEMPLATES,
  // Add other sport exports as needed
};

// Compatibility export for any existing imports expecting a flat list
export const TEMPLATE_TYPES = Object.values(TEMPLATE_REGISTRY).flat();

/**
 * Olympic Broadcast Templates — numbered IDs per sport (e.g. SW001, AT001, BX001)
 * Covers all 36 Olympic sports across 5 sub-categories:
 *   LOWER THIRDS | SPLITS & TIMES | SCORES & MATCH | RESULTS & STANDINGS | RECORDS & BUGS
 */

// ─── AQUATICS – SWIMMING (SW) ───────────────────────────────────────────────
export const SW_TEMPLATES = [
  // LOWER THIRDS
  { id: "SW001", name: "Swimmer ID Lower Third (Name / Country / Lane)", icon: "🏊", subCat: "LOWER THIRDS" },
  { id: "SW002", name: "World Record Holder / Olympic Champion Card", icon: "🥇", subCat: "LOWER THIRDS" },
  { id: "SW003", name: "Relay Team Card (4 Swimmers + Split Order)", icon: "👥", subCat: "LOWER THIRDS" },
  { id: "SW004", name: "Head Coach & Country ID", icon: "👤", subCat: "LOWER THIRDS" },
  { id: "SW005", name: "National Team Profile & Best Time", icon: "🏳️", subCat: "LOWER THIRDS" },
  // SPLITS & TIMES
  { id: "SW006", name: "Start Reaction Time Bug (0.64s)", icon: "⚡", subCat: "SPLITS & TIMES" },
  { id: "SW007", name: "50m Intermediate Split Time", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "SW008", name: "100m Turn Split Time", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "SW009", name: "150m Intermediate Split Time", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "SW010", name: "Relay Leg Split Times (All 4 Legs)", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "SW011", name: "15m Breakout / Turn Speed Bug", icon: "💧", subCat: "SPLITS & TIMES" },
  // SCORES & MATCH
  { id: "SW012", name: "8-Lane Heat Start List", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "SW013", name: "Relay Team Order of Start", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "SW014", name: "Heat / Semis / Finals Draw Schedule", icon: "🗓️", subCat: "SCORES & MATCH" },
  { id: "SW015", name: "Live 8-Lane Race Scoreboard Bug", icon: "📊", subCat: "SCORES & MATCH" },
  // RESULTS & STANDINGS
  { id: "SW016", name: "Finish Touch Order & Times Table (8 Lanes)", icon: "🏁", subCat: "RESULTS & STANDINGS" },
  { id: "SW017", name: "Top 8 Final Results with PB / OR / WR Flags", icon: "🏆", subCat: "RESULTS & STANDINGS" },
  { id: "SW018", name: "Heat Qualification Results & Progressions", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "SW019", name: "Podium Medallists & Country Tally", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  { id: "SW020", name: "Swimming Day Medal Summary Table", icon: "🗓️", subCat: "RESULTS & STANDINGS" },
  // RECORDS & BUGS
  { id: "SW021", name: "World Record Pace Comparison Line", icon: "🏁", subCat: "RECORDS & BUGS" },
  { id: "SW022", name: "Olympic Record Pace Comparison Line", icon: "🥇", subCat: "RECORDS & BUGS" },
  { id: "SW023", name: "NEW WR / OR Flash Celebration Bug", icon: "🎉", subCat: "RECORDS & BUGS" },
  { id: "SW024", name: "Disqualification / False Start Bug", icon: "🚫", subCat: "RECORDS & BUGS" },
  { id: "SW025", name: "Pool Venue & Event Title Corner Bug", icon: "🏷️", subCat: "RECORDS & BUGS" },
];

// ─── ATHLETICS / TRACK & FIELD (AT) ─────────────────────────────────────────
export const AT_TEMPLATES = [
  // LOWER THIRDS
  { id: "AT001", name: "Athlete ID Lower Third (Bib / Country / PB)", icon: "🏃", subCat: "LOWER THIRDS" },
  { id: "AT002", name: "World Record Holder Card", icon: "🌍", subCat: "LOWER THIRDS" },
  { id: "AT003", name: "Olympic Champion / Defending Title Card", icon: "🥇", subCat: "LOWER THIRDS" },
  { id: "AT004", name: "4×100m / 4×400m Relay Team Card", icon: "👥", subCat: "LOWER THIRDS" },
  { id: "AT005", name: "Race Walker / Road Event Profile", icon: "🚶", subCat: "LOWER THIRDS" },
  // SPLITS & TIMES
  { id: "AT006", name: "Start Reaction Time Bug (0.130s)", icon: "⚡", subCat: "SPLITS & TIMES" },
  { id: "AT007", name: "10m Sector Speed Splits Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "AT008", name: "200m / 300m Intermediate Split Times", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "AT009", name: "Sprint Speed Trap Bug (44.7 km/h)", icon: "💨", subCat: "SPLITS & TIMES" },
  { id: "AT010", name: "Marathon 5km / 10km Checkpoint Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "AT011", name: "Relay Leg Split Times (All 4 Legs)", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "AT012", name: "Decathlon Running Event Split & Points", icon: "⏱️", subCat: "SPLITS & TIMES" },
  // SCORES & MATCH
  { id: "AT013", name: "8-Lane Track Start List (Lane / Name / Country / SB)", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "AT014", name: "Field Event Attempt Order List", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "AT015", name: "Heat / Round Qualification Draw", icon: "🗓️", subCat: "SCORES & MATCH" },
  { id: "AT016", name: "Decathlon / Heptathlon Running Scoreboard", icon: "📊", subCat: "SCORES & MATCH" },
  // RESULTS & STANDINGS
  { id: "AT017", name: "Track Final Results Table (Top 8)", icon: "🏆", subCat: "RESULTS & STANDINGS" },
  { id: "AT018", name: "Field Attempt Board (O X O Notation)", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "AT019", name: "High Jump / Pole Vault Bar Heights Table", icon: "📏", subCat: "RESULTS & STANDINGS" },
  { id: "AT020", name: "Decathlon / Heptathlon Final Points Table", icon: "🏆", subCat: "RESULTS & STANDINGS" },
  { id: "AT021", name: "Road Race / Marathon Running Order", icon: "🗺️", subCat: "RESULTS & STANDINGS" },
  { id: "AT022", name: "Podium Medallists & Country Tally", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  // RECORDS & BUGS
  { id: "AT023", name: "Wind Speed Bug (+1.5m/s / -0.3m/s)", icon: "💨", subCat: "RECORDS & BUGS" },
  { id: "AT024", name: "World Record Pace Comparison Bug", icon: "🏁", subCat: "RECORDS & BUGS" },
  { id: "AT025", name: "Olympic Record Pace Comparison Bug", icon: "🥇", subCat: "RECORDS & BUGS" },
  { id: "AT026", name: "Lane Identifier Overlay Bug", icon: "🎽", subCat: "RECORDS & BUGS" },
  { id: "AT027", name: "False Start / DQ Notification Bug", icon: "🚫", subCat: "RECORDS & BUGS" },
  { id: "AT028", name: "Event Venue & Title Corner Bug", icon: "🏟️", subCat: "RECORDS & BUGS" },
];

// ─── ARCHERY (AR) ───────────────────────────────────────────────────────────
export const AR_TEMPLATES = [
  { id: "AR001", name: "Archer ID Lower Third (Name / Country / World Rank)", icon: "🎯", subCat: "LOWER THIRDS" },
  { id: "AR002", name: "World Ranking & Personal Best Card", icon: "🌍", subCat: "LOWER THIRDS" },
  { id: "AR003", name: "Team Archery Country Profile Card", icon: "🏳️", subCat: "LOWER THIRDS" },
  { id: "AR004", name: "Olympic Champion / World Champion Card", icon: "🥇", subCat: "LOWER THIRDS" },
  { id: "AR005", name: "Arrow Score Per End (10 / 9 / 8 Zones)", icon: "🎯", subCat: "SPLITS & TIMES" },
  { id: "AR006", name: "End Running Total Scoreline", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "AR007", name: "Shoot-Off Countdown Timer Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "AR008", name: "Set Points Tracker (Set Score 6-2)", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "AR009", name: "Cumulative Points Scoreboard (Match Total)", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "AR010", name: "Match Schedule & Round Draw", icon: "🗓️", subCat: "SCORES & MATCH" },
  { id: "AR011", name: "Ranking Round Live Scoreboard (72 Arrows)", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "AR012", name: "Team Match Scoreboard (3 Archers per Team)", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "AR013", name: "Elimination Bracket Tree (1/16 to Final)", icon: "🌿", subCat: "RESULTS & STANDINGS" },
  { id: "AR014", name: "Ranking Round Final Standings Table", icon: "🏆", subCat: "RESULTS & STANDINGS" },
  { id: "AR015", name: "End-by-End Arrow Results Table", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "AR016", name: "Podium Medallists & Country Tally", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  { id: "AR017", name: "World Record Score Bug (90+ pts)", icon: "🏁", subCat: "RECORDS & BUGS" },
  { id: "AR018", name: "Olympic Record Score Bug", icon: "🥇", subCat: "RECORDS & BUGS" },
  { id: "AR019", name: "Inner 10-Ring (X) Hit Highlight Bug", icon: "⭐", subCat: "RECORDS & BUGS" },
  { id: "AR020", name: "Venue & Round Title Corner Bug", icon: "🏷️", subCat: "RECORDS & BUGS" },
];

// ─── BADMINTON (BD) ──────────────────────────────────────────────────────────
export const BD_TEMPLATES = [
  { id: "BD001", name: "Player ID Lower Third (Name / Country / World Rank)", icon: "🏸", subCat: "LOWER THIRDS" },
  { id: "BD002", name: "Doubles Pairing Profile Card", icon: "👥", subCat: "LOWER THIRDS" },
  { id: "BD003", name: "Olympic Champion / World Title Card", icon: "🥇", subCat: "LOWER THIRDS" },
  { id: "BD004", name: "Head Coach & Country ID Card", icon: "👤", subCat: "LOWER THIRDS" },
  { id: "BD005", name: "Rally Length Counter Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "BD006", name: "Service Speed Bug (km/h)", icon: "⚡", subCat: "SPLITS & TIMES" },
  { id: "BD007", name: "Match Duration Clock Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "BD008", name: "Live Sets & Points Scoreboard Bug", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "BD009", name: "Group Phase Draw Schedule", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "BD010", name: "Court & Session Title Bug", icon: "🏟️", subCat: "SCORES & MATCH" },
  { id: "BD011", name: "Game-by-Game Score Summary Table", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "BD012", name: "Match Statistics (Points Won / Service %)", icon: "📈", subCat: "RESULTS & STANDINGS" },
  { id: "BD013", name: "Tournament Knockout Bracket", icon: "🌿", subCat: "RESULTS & STANDINGS" },
  { id: "BD014", name: "Podium Medallists & Country Tally", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  { id: "BD015", name: "Video Challenge Review Bug", icon: "📺", subCat: "RECORDS & BUGS" },
  { id: "BD016", name: "Venue & Event Title Corner Bug", icon: "🏷️", subCat: "RECORDS & BUGS" },
];

// ─── BASKETBALL (BK) ────────────────────────────────────────────────────────
export const BK_TEMPLATES = [
  { id: "BK001", name: "Player ID Lower Third (Name / No. / Points)", icon: "🏀", subCat: "LOWER THIRDS" },
  { id: "BK002", name: "Head Coach & Country ID Card", icon: "👤", subCat: "LOWER THIRDS" },
  { id: "BK003", name: "Tournament MVP / Star Player Card", icon: "⭐", subCat: "LOWER THIRDS" },
  { id: "BK004", name: "Team Profile & World Ranking Card", icon: "🏳️", subCat: "LOWER THIRDS" },
  { id: "BK005", name: "24-Second Shot Clock Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "BK006", name: "Quarter / Half Game Clock Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "BK007", name: "Timeouts Remaining Bug", icon: "⏸️", subCat: "SPLITS & TIMES" },
  { id: "BK008", name: "Live Scoreboard Bug (Score / Quarter / Shot Clock)", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "BK009", name: "Starting 5 Lineup (Players / Numbers)", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "BK010", name: "Pre-Game Matchup Preview Card", icon: "🗓️", subCat: "SCORES & MATCH" },
  { id: "BK011", name: "Group Phase Standings Table", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "BK012", name: "Quarter-by-Quarter Score Summary", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "BK013", name: "Team Fouls & Player Foul Count Table", icon: "⚠️", subCat: "RESULTS & STANDINGS" },
  { id: "BK014", name: "Player Box Score Stats (PTS / REB / AST / BLK)", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "BK015", name: "Tournament Quarter / Semi / Final Bracket", icon: "🌿", subCat: "RESULTS & STANDINGS" },
  { id: "BK016", name: "Team Statistical Comparison Chart", icon: "📈", subCat: "RESULTS & STANDINGS" },
  { id: "BK017", name: "Podium Medallists & Country Tally", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  { id: "BK018", name: "Player Foul Disqualification Bug", icon: "🚫", subCat: "RECORDS & BUGS" },
  { id: "BK019", name: "Video Challenge Review Bug", icon: "📺", subCat: "RECORDS & BUGS" },
  { id: "BK020", name: "Venue & Session Title Corner Bug", icon: "🏟️", subCat: "RECORDS & BUGS" },
];

// ─── BEACH VOLLEYBALL (BV) ──────────────────────────────────────────────────
export const BV_TEMPLATES = [
  { id: "BV001", name: "Player Pair ID Lower Third (Names / Country)", icon: "🏖️", subCat: "LOWER THIRDS" },
  { id: "BV002", name: "World Ranking & Seeding Card", icon: "🌍", subCat: "LOWER THIRDS" },
  { id: "BV003", name: "Olympic Champion / World Title Card", icon: "🥇", subCat: "LOWER THIRDS" },
  { id: "BV004", name: "Set Duration Clock Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "BV005", name: "Technical Timeout Bug", icon: "⏸️", subCat: "SPLITS & TIMES" },
  { id: "BV006", name: "Sets & Points Live Scoreboard Bug", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "BV007", name: "Pairs Starting Lineup Card", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "BV008", name: "Group Phase Standings Table", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "BV009", name: "Set-by-Set Score Summary Table", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "BV010", name: "Player Stats (Attack / Block / Ace)", icon: "📈", subCat: "RESULTS & STANDINGS" },
  { id: "BV011", name: "Knockout Bracket Draw", icon: "🌿", subCat: "RESULTS & STANDINGS" },
  { id: "BV012", name: "Podium Medallists & Country Tally", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  { id: "BV013", name: "Service Ace Highlight Bug", icon: "⭐", subCat: "RECORDS & BUGS" },
  { id: "BV014", name: "Video Challenge Review Bug (IN/OUT)", icon: "📺", subCat: "RECORDS & BUGS" },
  { id: "BV015", name: "Beach Venue & Court Title Corner Bug", icon: "🏷️", subCat: "RECORDS & BUGS" },
];

// ─── BOXING (BX) ────────────────────────────────────────────────────────────
export const BX_TEMPLATES = [
  { id: "BX001", name: "Boxer ID Lower Third (Red / Blue Corner)", icon: "🥊", subCat: "LOWER THIRDS" },
  { id: "BX002", name: "Tale of the Tape (Height / Weight / Reach)", icon: "📊", subCat: "LOWER THIRDS" },
  { id: "BX003", name: "Olympic Champion / World Rank Card", icon: "🥇", subCat: "LOWER THIRDS" },
  { id: "BX004", name: "Corner Coach & Seconds ID", icon: "👤", subCat: "LOWER THIRDS" },
  { id: "BX005", name: "3-Minute Round Clock Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "BX006", name: "Round Interval / Rest Period Timer Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "BX007", name: "Bout Scoreboard Bug (Round 1 / 2 / 3)", icon: "🥊", subCat: "SCORES & MATCH" },
  { id: "BX008", name: "Round Title Banner (Round 1 / 2 / 3)", icon: "🔔", subCat: "SCORES & MATCH" },
  { id: "BX009", name: "Bout Schedule & Matchup List", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "BX010", name: "Weight Class Bug (Men's 69kg / Women's 57kg)", icon: "🏷️", subCat: "SCORES & MATCH" },
  { id: "BX011", name: "5-Judges Score Card (10-9, 10-9)", icon: "⭐", subCat: "RESULTS & STANDINGS" },
  { id: "BX012", name: "Official Decision (Unanimous / Split / KO / RSC)", icon: "🏆", subCat: "RESULTS & STANDINGS" },
  { id: "BX013", name: "Tournament Bracket Tree", icon: "🌿", subCat: "RESULTS & STANDINGS" },
  { id: "BX014", name: "Podium Medallists (Gold + 2x Bronze)", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  { id: "BX015", name: "Punches Landed / CompuBox Stats Bug", icon: "📊", subCat: "RECORDS & BUGS" },
  { id: "BX016", name: "Referee Warning / Caution Bug", icon: "⚠️", subCat: "RECORDS & BUGS" },
  { id: "BX017", name: "Venue & Weight Class Title Corner Bug", icon: "🏷️", subCat: "RECORDS & BUGS" },
];

// ─── CANOE SLALOM (CS) ──────────────────────────────────────────────────────
export const CS_TEMPLATES = [
  { id: "CS001", name: "Paddler ID Lower Third (Name / Country / World Rank)", icon: "🛶", subCat: "LOWER THIRDS" },
  { id: "CS002", name: "World Champion / Olympic Champion Card", icon: "🥇", subCat: "LOWER THIRDS" },
  { id: "CS003", name: "Boat Class & Discipline Card (K1 / C1 / C2)", icon: "🏷️", subCat: "LOWER THIRDS" },
  { id: "CS004", name: "Gate-by-Gate Split Time Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "CS005", name: "Time Penalty Accrual Bug (+2s / +50s Miss)", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "CS006", name: "Top Section / Bottom Section Split", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "CS007", name: "Start List & Run Order", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "CS008", name: "Live Gate Score Bug (Gates Cleared / Touched)", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "CS009", name: "Run Schedule (Q1 / Q2 / Semi / Final)", icon: "🗓️", subCat: "SCORES & MATCH" },
  { id: "CS010", name: "Intermediate Time Comparison Table", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "CS011", name: "Final Results Table (Run 1 + Run 2 + Penalty)", icon: "🏆", subCat: "RESULTS & STANDINGS" },
  { id: "CS012", name: "Podium Medallists & Country Tally", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  { id: "CS013", name: "World Record / Best Time Bug", icon: "🏁", subCat: "RECORDS & BUGS" },
  { id: "CS014", name: "Gate Miss / Touch Penalty Flag Bug", icon: "⚠️", subCat: "RECORDS & BUGS" },
  { id: "CS015", name: "Course & Event Title Corner Bug", icon: "🏷️", subCat: "RECORDS & BUGS" },
];

// ─── CANOE FLATWATER SPRINT (CF) ────────────────────────────────────────────
export const CF_TEMPLATES = [
  { id: "CF001", name: "Paddler ID Lower Third (Name / Country / World Rank)", icon: "🚣", subCat: "LOWER THIRDS" },
  { id: "CF002", name: "Crew / Boat Class Profile Card", icon: "👥", subCat: "LOWER THIRDS" },
  { id: "CF003", name: "Olympic Champion / World Record Holder Card", icon: "🥇", subCat: "LOWER THIRDS" },
  { id: "CF004", name: "250m Intermediate Split Time", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "CF005", name: "500m Intermediate Split Time", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "CF006", name: "Stroke Rate Bug (strokes/min)", icon: "💧", subCat: "SPLITS & TIMES" },
  { id: "CF007", name: "Heat Lane Draw & Start List", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "CF008", name: "Live Lane Position Bug", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "CF009", name: "Heat / Semis / Final Schedule", icon: "🗓️", subCat: "SCORES & MATCH" },
  { id: "CF010", name: "Finish Order & Exact Times Table", icon: "🏁", subCat: "RESULTS & STANDINGS" },
  { id: "CF011", name: "500m Split Comparison Table (All Crews)", icon: "📈", subCat: "RESULTS & STANDINGS" },
  { id: "CF012", name: "Podium Medallists & Country Tally", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  { id: "CF013", name: "World Record / Best Time Pace Line", icon: "🏁", subCat: "RECORDS & BUGS" },
  { id: "CF014", name: "Distance Remaining Bug (1000m / 500m Event)", icon: "📏", subCat: "RECORDS & BUGS" },
  { id: "CF015", name: "Venue & Boat Class Corner Bug", icon: "🏷️", subCat: "RECORDS & BUGS" },
];

// ─── CYCLING TRACK (CT) ─────────────────────────────────────────────────────
export const CT_TEMPLATES = [
  { id: "CT001", name: "Rider ID Lower Third (Name / Country / World Rank)", icon: "🚴", subCat: "LOWER THIRDS" },
  { id: "CT002", name: "Team Pursuit Rider Card (4 Riders)", icon: "👥", subCat: "LOWER THIRDS" },
  { id: "CT003", name: "World Record Holder / Olympic Champion Card", icon: "🥇", subCat: "LOWER THIRDS" },
  { id: "CT004", name: "250m Lap Split Time", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "CT005", name: "500m Time Trial Split", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "CT006", name: "1000m Time Trial Final Time", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "CT007", name: "Team Pursuit 4km Split Times", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "CT008", name: "Team Sprint 3-Lap Splits", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "CT009", name: "Sprint 1v1 Match Scoreboard (Best of 3)", icon: "🥊", subCat: "SCORES & MATCH" },
  { id: "CT010", name: "Keirin Starting Draw & Lineup", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "CT011", name: "Heat Lineup & Lane Draw", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "CT012", name: "Keirin Final Finish Order", icon: "🏆", subCat: "RESULTS & STANDINGS" },
  { id: "CT013", name: "Omnium Overall Points Table", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "CT014", name: "Omnium Flying 250m Lap Results", icon: "⏱️", subCat: "RESULTS & STANDINGS" },
  { id: "CT015", name: "Omnium Elimination Order", icon: "🚫", subCat: "RESULTS & STANDINGS" },
  { id: "CT016", name: "Madison Points & Laps Gained Table", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "CT017", name: "Qualifying Round Standings", icon: "🏆", subCat: "RESULTS & STANDINGS" },
  { id: "CT018", name: "Podium Medallists & Country Tally", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  { id: "CT019", name: "Speed Trap Max Speed Bug (73.4 km/h)", icon: "⚡", subCat: "RECORDS & BUGS" },
  { id: "CT020", name: "Velodrome Lap Counter Bug", icon: "🔢", subCat: "RECORDS & BUGS" },
  { id: "CT021", name: "World Record Pace Line (1:00.255)", icon: "🏁", subCat: "RECORDS & BUGS" },
  { id: "CT022", name: "Olympic Record Pace Line", icon: "🥇", subCat: "RECORDS & BUGS" },
];

// ─── CYCLING ROAD (CR) ──────────────────────────────────────────────────────
export const CR_TEMPLATES = [
  { id: "CR001", name: "Rider ID Lower Third (Name / Country / Team)", icon: "🚴", subCat: "LOWER THIRDS" },
  { id: "CR002", name: "Olympic Champion / World Champion Card", icon: "🥇", subCat: "LOWER THIRDS" },
  { id: "CR003", name: "Peloton / Break Group Split Time Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "CR004", name: "Time Trial Intermediate Split Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "CR005", name: "Distance Remaining Bug (km to finish)", icon: "📏", subCat: "SPLITS & TIMES" },
  { id: "CR006", name: "Road Race Start List / Start Order", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "CR007", name: "Live Race Running Order Bug", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "CR008", name: "Break Gap to Peloton Bug (+1'45\")", icon: "⚡", subCat: "RECORDS & BUGS" },
  { id: "CR009", name: "Finish Order & Times (Road Race)", icon: "🏁", subCat: "RESULTS & STANDINGS" },
  { id: "CR010", name: "Time Trial Final Results Table", icon: "🏆", subCat: "RESULTS & STANDINGS" },
  { id: "CR011", name: "Podium Medallists & Country Tally", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  { id: "CR012", name: "Venue & Route Title Corner Bug", icon: "🏷️", subCat: "RECORDS & BUGS" },
];

// ─── CYCLING MOUNTAIN BIKE (CM) ─────────────────────────────────────────────
export const CM_TEMPLATES = [
  { id: "CM001", name: "Rider ID Lower Third (Name / Country / World Rank)", icon: "🚵", subCat: "LOWER THIRDS" },
  { id: "CM002", name: "Olympic Champion Card", icon: "🥇", subCat: "LOWER THIRDS" },
  { id: "CM003", name: "Lap Time Bug (Lap 1 of 5)", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "CM004", name: "Sector Split Time Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "CM005", name: "Start List & Grid Order", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "CM006", name: "Live Race Running Order Bug", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "CM007", name: "Lap Standings Table (After Lap 3)", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "CM008", name: "Final Results Table (Top 10)", icon: "🏆", subCat: "RESULTS & STANDINGS" },
  { id: "CM009", name: "Podium Medallists & Country Tally", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  { id: "CM010", name: "World Record Lap Time Bug", icon: "🏁", subCat: "RECORDS & BUGS" },
  { id: "CM011", name: "Venue & Course Profile Corner Bug", icon: "🏷️", subCat: "RECORDS & BUGS" },
];

// ─── CYCLING BMX (CB) ───────────────────────────────────────────────────────
export const CB_TEMPLATES = [
  { id: "CB001", name: "Rider ID Lower Third (Name / Country / Rank)", icon: "🚲", subCat: "LOWER THIRDS" },
  { id: "CB002", name: "Olympic Champion Card", icon: "🥇", subCat: "LOWER THIRDS" },
  { id: "CB003", name: "Run Time Bug (Heat 1 / 2 / 3)", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "CB004", name: "Start List & Gate Draw Order", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "CB005", name: "Live Gate Start Bug", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "CB006", name: "Best-of-3 Run Results Table", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "CB007", name: "Final Results Table", icon: "🏆", subCat: "RESULTS & STANDINGS" },
  { id: "CB008", name: "Podium Medallists & Country Tally", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  { id: "CB009", name: "DQ / Jump Start Penalty Bug", icon: "🚫", subCat: "RECORDS & BUGS" },
  { id: "CB010", name: "Venue & Track Title Corner Bug", icon: "🏷️", subCat: "RECORDS & BUGS" },
];

// ─── EQUESTRIAN (EQ) ────────────────────────────────────────────────────────
export const EQ_TEMPLATES = [
  { id: "EQ001", name: "Rider & Horse ID Lower Third", icon: "🏇", subCat: "LOWER THIRDS" },
  { id: "EQ002", name: "Olympic Champion / World Title Card", icon: "🥇", subCat: "LOWER THIRDS" },
  { id: "EQ003", name: "National Team Profile Card", icon: "🏳️", subCat: "LOWER THIRDS" },
  { id: "EQ004", name: "Dressage Piaffe / Passage Mark Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "EQ005", name: "Show Jumping Time Allowed Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "EQ006", name: "Cross Country Elapsed Time Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "EQ007", name: "Start List & Order of Go", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "EQ008", name: "Dressage Score Breakdown (Judge Marks)", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "EQ009", name: "Show Jumping Fault Counter Bug", icon: "⚠️", subCat: "SCORES & MATCH" },
  { id: "EQ010", name: "Eventing Penalty Point Table", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "EQ011", name: "Final Results & Rankings Table", icon: "🏆", subCat: "RESULTS & STANDINGS" },
  { id: "EQ012", name: "Podium Medallists & Country Tally", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  { id: "EQ013", name: "Fence/Rail Knockdown Penalty Bug", icon: "🚫", subCat: "RECORDS & BUGS" },
  { id: "EQ014", name: "Venue & Discipline Title Corner Bug", icon: "🏷️", subCat: "RECORDS & BUGS" },
];

// ─── FENCING (FE) ───────────────────────────────────────────────────────────
export const FE_TEMPLATES = [
  { id: "FE001", name: "Fencer ID Lower Third (Name / Country / World Rank)", icon: "🤺", subCat: "LOWER THIRDS" },
  { id: "FE002", name: "Olympic Champion / World Title Card", icon: "🥇", subCat: "LOWER THIRDS" },
  { id: "FE003", name: "Weapon & Discipline Card (Foil / Épée / Sabre)", icon: "🏷️", subCat: "LOWER THIRDS" },
  { id: "FE004", name: "3-Minute Period Timer Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "FE005", name: "Clock / Medical Timeout Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "FE006", name: "Live Touch Scoreboard Bug (15-Point Bout)", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "FE007", name: "Bout Schedule & Tableau Draw", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "FE008", name: "Period Score Summary Table", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "FE009", name: "Tournament Tableau Bracket", icon: "🌿", subCat: "RESULTS & STANDINGS" },
  { id: "FE010", name: "Team Relay Score Running Total", icon: "📈", subCat: "RESULTS & STANDINGS" },
  { id: "FE011", name: "Podium Medallists & Country Tally", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  { id: "FE012", name: "Video Review / Challenge Bug", icon: "📺", subCat: "RECORDS & BUGS" },
  { id: "FE013", name: "Red / Yellow Card Penalty Bug", icon: "⚠️", subCat: "RECORDS & BUGS" },
  { id: "FE014", name: "Venue & Weapon Title Corner Bug", icon: "🏷️", subCat: "RECORDS & BUGS" },
];

// ─── FOOTBALL (FB) ──────────────────────────────────────────────────────────
export const FB_TEMPLATES = [
  { id: "FB001", name: "Player ID Lower Third (Name / No. / Position)", icon: "⚽", subCat: "LOWER THIRDS" },
  { id: "FB002", name: "Head Coach & Country ID Card", icon: "👤", subCat: "LOWER THIRDS" },
  { id: "FB003", name: "Goal Scorer Announcement Card", icon: "⚽", subCat: "LOWER THIRDS" },
  { id: "FB004", name: "Player Substitution IN/OUT Card", icon: "🔄", subCat: "LOWER THIRDS" },
  { id: "FB005", name: "Yellow / Red Card Recipient Card", icon: "🟨", subCat: "LOWER THIRDS" },
  { id: "FB006", name: "Match Clock Bug (45' + Added Time)", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "FB007", name: "Added Time Announcement Bug (+3 MIN)", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "FB008", name: "Half-Time Interval Clock Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "FB009", name: "Live Scoreboard Bug (Score / Time / Cards)", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "FB010", name: "Tactical Starting Lineup (4-4-2 / 4-3-3)", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "FB011", name: "Penalty Shootout Scoreboard", icon: "🎯", subCat: "SCORES & MATCH" },
  { id: "FB012", name: "Group Phase Table (P W D L Pts)", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "FB013", name: "Pre-Match Team Preview Card", icon: "🗓️", subCat: "SCORES & MATCH" },
  { id: "FB014", name: "Full-Time Match Statistics (Poss / Shots / Corners)", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "FB015", name: "Tournament Top Scorers Table", icon: "🏆", subCat: "RESULTS & STANDINGS" },
  { id: "FB016", name: "Knockout Round Bracket Draw", icon: "🌿", subCat: "RESULTS & STANDINGS" },
  { id: "FB017", name: "Half-Time Scores All Groups", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "FB018", name: "Podium Medallists & Country Tally", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  { id: "FB019", name: "VAR Review In Progress Bug", icon: "📺", subCat: "RECORDS & BUGS" },
  { id: "FB020", name: "Offside Decision Bug", icon: "🚫", subCat: "RECORDS & BUGS" },
  { id: "FB021", name: "Venue & Match Day Corner Bug", icon: "🏟️", subCat: "RECORDS & BUGS" },
];

// ─── GYMNASTICS ARTISTIC (GA) ───────────────────────────────────────────────
export const GA_TEMPLATES = [
  { id: "GA002", name: "Venue ID", icon: "🤸", subCat: "LOWER THIRDS" },
  { id: "GA003", name: "Event Schedule", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "GA004", name: "Event Schedule (All Events)", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "GA005", name: "Event ID", icon: "🤸", subCat: "LOWER THIRDS" },
  { id: "GA006", name: "Athlete/Team ID", icon: "🤸", subCat: "LOWER THIRDS" },
  { id: "GA007", name: "Officials List", icon: "🤸", subCat: "LOWER THIRDS" },
  { id: "GA009", name: "Ceremony ID", icon: "🤸", subCat: "LOWER THIRDS" },
  { id: "GA010", name: "Medal ID", icon: "🏆", subCat: "RESULTS & STANDINGS" },
  { id: "GA011", name: "Medals List", icon: "🏆", subCat: "RESULTS & STANDINGS" },
  { id: "GA012", name: "Medal Presenter ID", icon: "🤸", subCat: "LOWER THIRDS" },
  { id: "GA013", name: "Flower Presenter ID", icon: "🤸", subCat: "LOWER THIRDS" },
  { id: "GA014a", name: "Start List (Qualification)", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "GA015", name: "Team/Mixed Group List", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "GA016a", name: "Scorecard", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "GA017a", name: "Athlete/Team Total", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "GA018a", name: "Athlete/Team Build (Women)", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "GA019a", name: "Athlete/Team Build (Men)", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "GA020a", name: "Standings (All-Around & Team Qualification)", icon: "🏆", subCat: "RESULTS & STANDINGS" },
  { id: "GA021a", name: "Standings (Apparatus Final Qualification)", icon: "🏆", subCat: "RESULTS & STANDINGS" },
  { id: "GA022a", name: "Vault Standings (Apparatus Final Qualification)", icon: "🏆", subCat: "RESULTS & STANDINGS" },
  { id: "GA025a", name: "Start List (All-Around)", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "GA026a", name: "Winner/Place ID", icon: "🏆", subCat: "RESULTS & STANDINGS" },
  { id: "GA027a", name: "Top 3-5 Leaderboard", icon: "🏆", subCat: "RESULTS & STANDINGS" },
  { id: "GA028", name: "Scorecard 2nd Vault", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "GA029", name: "Scorecard (All-Around)", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "GA030", name: "Team List", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "GA031a", name: "2nd Vault ID", icon: "🤸", subCat: "LOWER THIRDS" },
];

// ─── GYMNASTICS RHYTHMIC (GR) ───────────────────────────────────────────────
export const GR_TEMPLATES = [
  { id: "GR001", name: "Gymnast ID Lower Third (Name / Country / Event)", icon: "🎀", subCat: "LOWER THIRDS" },
  { id: "GR002", name: "Olympic Champion / World Title Card", icon: "🥇", subCat: "LOWER THIRDS" },
  { id: "GR003", name: "D+E+ND Score Breakdown Bug", icon: "📊", subCat: "SPLITS & TIMES" },
  { id: "GR004", name: "Apparatus Bug (Ball / Hoop / Clubs / Ribbon)", icon: "🏷️", subCat: "SCORES & MATCH" },
  { id: "GR005", name: "Rotation Order & Schedule", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "GR006", name: "Individual Final Standings Table (Top 10)", icon: "🏆", subCat: "RESULTS & STANDINGS" },
  { id: "GR007", name: "Group Exercise Final Results Table", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "GR008", name: "Podium Medallists & Country Tally", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  { id: "GR009", name: "Penalty / Boundary Fault Bug", icon: "⚠️", subCat: "RECORDS & BUGS" },
  { id: "GR010", name: "Venue & Event Title Corner Bug", icon: "🏷️", subCat: "RECORDS & BUGS" },
];

// ─── GYMNASTICS TRAMPOLINE (GT) ─────────────────────────────────────────────
export const GT_TEMPLATES = [
  { id: "GT001", name: "Trampolinist ID Lower Third (Name / Country)", icon: "🤸", subCat: "LOWER THIRDS" },
  { id: "GT002", name: "Olympic Champion / World Title Card", icon: "🥇", subCat: "LOWER THIRDS" },
  { id: "GT003", name: "Flight Time Bug (Total Time of Flight)", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "GT004", name: "D+E+HD Score Breakdown Bug", icon: "📊", subCat: "SPLITS & TIMES" },
  { id: "GT005", name: "Start List & Competition Order", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "GT006", name: "Qualifying & Final Results Table", icon: "🏆", subCat: "RESULTS & STANDINGS" },
  { id: "GT007", name: "Podium Medallists & Country Tally", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  { id: "GT008", name: "Venue & Event Title Corner Bug", icon: "🏷️", subCat: "RECORDS & BUGS" },
];

// ─── HANDBALL (HB) ──────────────────────────────────────────────────────────
export const HB_TEMPLATES = [
  { id: "HB001", name: "Player ID Lower Third (Name / No. / Position)", icon: "🤾", subCat: "LOWER THIRDS" },
  { id: "HB002", name: "Head Coach & Country ID Card", icon: "👤", subCat: "LOWER THIRDS" },
  { id: "HB003", name: "Olympic Champion / World Title Card", icon: "🥇", subCat: "LOWER THIRDS" },
  { id: "HB004", name: "Match Clock Bug (30-Min Half)", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "HB005", name: "Live Scoreboard Bug (Score / Period / Time)", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "HB006", name: "Starting Lineup Card (7 Players)", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "HB007", name: "Group Phase Standings Table", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "HB008", name: "Half-Time Score Summary", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "HB009", name: "Player Stats (Goals / Assists / Saves)", icon: "📈", subCat: "RESULTS & STANDINGS" },
  { id: "HB010", name: "Tournament Bracket Draw", icon: "🌿", subCat: "RESULTS & STANDINGS" },
  { id: "HB011", name: "Podium Medallists & Country Tally", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  { id: "HB012", name: "Goalkeeper Save % Bug", icon: "⭐", subCat: "RECORDS & BUGS" },
  { id: "HB013", name: "Red / Yellow Card Bug", icon: "⚠️", subCat: "RECORDS & BUGS" },
  { id: "HB014", name: "Venue & Match Day Corner Bug", icon: "🏟️", subCat: "RECORDS & BUGS" },
];

// ─── FIELD HOCKEY (HO) ──────────────────────────────────────────────────────
export const HO_TEMPLATES = [
  { id: "HO001", name: "Player ID Lower Third (Name / No. / Country)", icon: "🏑", subCat: "LOWER THIRDS" },
  { id: "HO002", name: "Head Coach & Country ID Card", icon: "👤", subCat: "LOWER THIRDS" },
  { id: "HO003", name: "Olympic Champion / World Title Card", icon: "🥇", subCat: "LOWER THIRDS" },
  { id: "HO004", name: "Match Clock Bug (15-Min Quarter)", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "HO005", name: "Live Scoreboard Bug (Score / Quarter / PC)", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "HO006", name: "Match ID", icon: "🏑", subCat: "LOWER THIRDS" },
  { id: "HO007", name: "Group Phase Standings Table", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "HO008", name: "Quarter-by-Quarter Score Summary", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "HO009", name: "Match Statistics (Shots / PCs / Cards)", icon: "📈", subCat: "RESULTS & STANDINGS" },
  { id: "HO010", name: "Tournament Bracket Draw", icon: "🌿", subCat: "RESULTS & STANDINGS" },
  { id: "HO011", name: "Podium Medallists & Country Tally", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  { id: "HO012", name: "Video Review (Penalty Corner) Bug", icon: "📺", subCat: "RECORDS & BUGS" },
  { id: "HO013", name: "Yellow / Green Card Bug", icon: "⚠️", subCat: "RECORDS & BUGS" },
  { id: "HO014", name: "Venue & Match Day Corner Bug", icon: "🏷️", subCat: "RECORDS & BUGS" },
];

// ─── JUDO (JU) ──────────────────────────────────────────────────────────────
export const JU_TEMPLATES = [
  { id: "JU001", name: "Judoka ID Lower Third (White / Blue Gi)", icon: "🥋", subCat: "LOWER THIRDS" },
  { id: "JU002", name: "World Ranking & Weight Category Card", icon: "🌍", subCat: "LOWER THIRDS" },
  { id: "JU003", name: "Olympic Champion / World Champion Card", icon: "🥇", subCat: "LOWER THIRDS" },
  { id: "JU004", name: "National Coach & Country Profile", icon: "👤", subCat: "LOWER THIRDS" },
  { id: "JU005", name: "4-Minute Contest Timer Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "JU006", name: "Golden Score Extension Timer Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "JU007", name: "Osaekomi (Hold) Timer Bug (25s = Ippon)", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "JU008", name: "Contest Scoreboard (Ippon / Waza-ari / Shido)", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "JU009", name: "Pool / Repechage Bracket Draw", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "JU010", name: "Weight Category & Round Title Bug", icon: "🏷️", subCat: "SCORES & MATCH" },
  { id: "JU011", name: "Match Result & Winning Technique", icon: "🏆", subCat: "RESULTS & STANDINGS" },
  { id: "JU012", name: "Pool Phase Results Table", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "JU013", name: "Full Bracket from Repechage to Final", icon: "🌿", subCat: "RESULTS & STANDINGS" },
  { id: "JU014", name: "Podium Medallists (Gold + 2× Bronze)", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  { id: "JU015", name: "Shido Penalty Count Bug", icon: "⚠️", subCat: "RECORDS & BUGS" },
  { id: "JU016", name: "Video Review / Hansoku-Make Bug", icon: "📺", subCat: "RECORDS & BUGS" },
  { id: "JU017", name: "Venue & Weight Division Corner Bug", icon: "🏷️", subCat: "RECORDS & BUGS" },
];

// ─── MODERN PENTATHLON (MP) ─────────────────────────────────────────────────
export const MP_TEMPLATES = [
  { id: "MP001", name: "Pentathlete ID Lower Third (Name / Country)", icon: "🏅", subCat: "LOWER THIRDS" },
  { id: "MP002", name: "Olympic Champion Card", icon: "🥇", subCat: "LOWER THIRDS" },
  { id: "MP003", name: "Event Points Running Total Bug", icon: "📊", subCat: "SPLITS & TIMES" },
  { id: "MP004", name: "Fencing Hit Score & Ranking Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "MP005", name: "Combined Event Start Order (Laser Run)", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "MP006", name: "Discipline Results (Riding / Fencing / Swim / Laser)", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "MP007", name: "Combined Final Standings Table", icon: "🏆", subCat: "RESULTS & STANDINGS" },
  { id: "MP008", name: "Podium Medallists & Country Tally", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  { id: "MP009", name: "Event Venue & Discipline Title Bug", icon: "🏷️", subCat: "RECORDS & BUGS" },
];

// ─── ROWING (RO) ────────────────────────────────────────────────────────────
export const RO_TEMPLATES = [
  { id: "RO001", name: "Crew ID Lower Third (Name / Country / Boat Class)", icon: "🚣", subCat: "LOWER THIRDS" },
  { id: "RO002", name: "Pair / Four / Eight Profile Card", icon: "👥", subCat: "LOWER THIRDS" },
  { id: "RO003", name: "World Record Holder / Olympic Champion Card", icon: "🥇", subCat: "LOWER THIRDS" },
  { id: "RO004", name: "500m Intermediate Split Time", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "RO005", name: "1000m Intermediate Split Time", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "RO006", name: "1500m Intermediate Split Time", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "RO007", name: "Stroke Rate Bug (strokes/min)", icon: "💧", subCat: "SPLITS & TIMES" },
  { id: "RO008", name: "Heat Lane Draw & Start List", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "RO009", name: "6-Boat Live Position Bug", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "RO010", name: "Heat / Repechage / Final Schedule", icon: "🗓️", subCat: "SCORES & MATCH" },
  { id: "RO011", name: "Boat Class & Event Title Bug", icon: "🏷️", subCat: "SCORES & MATCH" },
  { id: "RO012", name: "Finish Order & Exact Times Table", icon: "🏁", subCat: "RESULTS & STANDINGS" },
  { id: "RO013", name: "Heat / Repechage Qualification Results", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "RO014", name: "500m Split Comparison Table (All 6 Crews)", icon: "📈", subCat: "RESULTS & STANDINGS" },
  { id: "RO015", name: "Podium Medallists & Country Tally", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  { id: "RO016", name: "World Record / Best Time Pace Line", icon: "🏁", subCat: "RECORDS & BUGS" },
  { id: "RO017", name: "Olympic Record Pace Line", icon: "🥇", subCat: "RECORDS & BUGS" },
  { id: "RO018", name: "Distance Remaining Bug (2000m Event)", icon: "📏", subCat: "RECORDS & BUGS" },
  { id: "RO019", name: "Venue & Boat Class Corner Bug", icon: "🏟️", subCat: "RECORDS & BUGS" },
];

// ─── SAILING (SA) ───────────────────────────────────────────────────────────
export const SA_TEMPLATES = [
  { id: "SA001", name: "Sailor ID Lower Third (Name / Country / Class)", icon: "⛵", subCat: "LOWER THIRDS" },
  { id: "SA002", name: "Olympic Champion / World Champion Card", icon: "🥇", subCat: "LOWER THIRDS" },
  { id: "SA003", name: "Crew Pairing Profile Card", icon: "👥", subCat: "LOWER THIRDS" },
  { id: "SA004", name: "Race Elapsed Time Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "SA005", name: "Boat Speed Bug (knots)", icon: "⚡", subCat: "SPLITS & TIMES" },
  { id: "SA006", name: "Start Line Countdown Timer Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "SA007", name: "Fleet Race Running Order Bug", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "SA008", name: "Race Schedule & Course Draw", icon: "🗓️", subCat: "SCORES & MATCH" },
  { id: "SA009", name: "Race-by-Race Points Table", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "SA010", name: "Medal Race Final Results Table", icon: "🏆", subCat: "RESULTS & STANDINGS" },
  { id: "SA011", name: "Overall Points Standings Table", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "SA012", name: "Podium Medallists & Country Tally", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  { id: "SA013", name: "OCS / DNS / DSQ Penalty Bug", icon: "🚫", subCat: "RECORDS & BUGS" },
  { id: "SA014", name: "Venue & Class Title Corner Bug", icon: "🏷️", subCat: "RECORDS & BUGS" },
];

// ─── SHOOTING (SH) ──────────────────────────────────────────────────────────
export const SH_TEMPLATES = [
  { id: "SH001", name: "Shooter ID Lower Third (Name / Country / World Rank)", icon: "🎯", subCat: "LOWER THIRDS" },
  { id: "SH002", name: "World Record Holder / Olympic Champion Card", icon: "🥇", subCat: "LOWER THIRDS" },
  { id: "SH003", name: "Discipline Card (10m Air Rifle / 25m Pistol / Skeet)", icon: "🏷️", subCat: "LOWER THIRDS" },
  { id: "SH004", name: "Shot Score Bug (10.9 / Bull / Inner 10)", icon: "🎯", subCat: "SPLITS & TIMES" },
  { id: "SH005", name: "Running Total Score Bug", icon: "📊", subCat: "SPLITS & TIMES" },
  { id: "SH006", name: "Elimination Score Bug (Tie-Break Shot)", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "SH007", name: "Start List & Lane / Position Draw", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "SH008", name: "Qualification & Final Scoreboard", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "SH009", name: "Final Results Table (Qualification + Final)", icon: "🏆", subCat: "RESULTS & STANDINGS" },
  { id: "SH010", name: "Podium Medallists & Country Tally", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  { id: "SH011", name: "World Record Bug (Score: 251.2)", icon: "🏁", subCat: "RECORDS & BUGS" },
  { id: "SH012", name: "Olympic Record Bug", icon: "🥇", subCat: "RECORDS & BUGS" },
  { id: "SH013", name: "Venue & Discipline Title Corner Bug", icon: "🏷️", subCat: "RECORDS & BUGS" },
];

// ─── TABLE TENNIS (TT) ──────────────────────────────────────────────────────
export const TT_TEMPLATES = [
  { id: "TT001", name: "Player ID Lower Third (Name / Country / World Rank)", icon: "🏓", subCat: "LOWER THIRDS" },
  { id: "TT002", name: "Doubles Pairing Profile Card", icon: "👥", subCat: "LOWER THIRDS" },
  { id: "TT003", name: "Olympic Champion / World Title Card", icon: "🥇", subCat: "LOWER THIRDS" },
  { id: "TT004", name: "Service Speed Bug (km/h)", icon: "⚡", subCat: "SPLITS & TIMES" },
  { id: "TT005", name: "Match Duration Clock Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "TT006", name: "Live Sets & Points Scoreboard Bug", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "TT007", name: "Service Order Bug (Who Serves)", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "TT008", name: "Game-by-Game Score Summary Table", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "TT009", name: "Match Statistics (Points Won / Errors)", icon: "📈", subCat: "RESULTS & STANDINGS" },
  { id: "TT010", name: "Tournament Bracket Draw", icon: "🌿", subCat: "RESULTS & STANDINGS" },
  { id: "TT011", name: "Podium Medallists & Country Tally", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  { id: "TT012", name: "Video Review Bug (Edge Ball)", icon: "📺", subCat: "RECORDS & BUGS" },
  { id: "TT013", name: "Venue & Event Title Corner Bug", icon: "🏷️", subCat: "RECORDS & BUGS" },
];

// ─── TAEKWONDO (TK) ─────────────────────────────────────────────────────────
export const TK_TEMPLATES = [
  { id: "TK001", name: "Fighter ID Lower Third (Red / Blue Trunk)", icon: "🥋", subCat: "LOWER THIRDS" },
  { id: "TK002", name: "World Ranking & Weight Class Card", icon: "🌍", subCat: "LOWER THIRDS" },
  { id: "TK003", name: "Olympic Champion / World Title Card", icon: "🥇", subCat: "LOWER THIRDS" },
  { id: "TK004", name: "National Coach & Country Profile", icon: "👤", subCat: "LOWER THIRDS" },
  { id: "TK005", name: "2-Minute Round Timer Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "TK006", name: "1-Minute Break Timer Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "TK007", name: "Video Review Countdown Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "TK008", name: "Contest Scoreboard (Head / Body / Kick Points)", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "TK009", name: "Weight Category Elimination Bracket", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "TK010", name: "Weight Class & Round Title Bug", icon: "🏷️", subCat: "SCORES & MATCH" },
  { id: "TK011", name: "Final Point Gap / RSC Decision Result", icon: "🏆", subCat: "RESULTS & STANDINGS" },
  { id: "TK012", name: "Round-by-Round Score Summary Table", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "TK013", name: "Full Bracket from Repechage to Final", icon: "🌿", subCat: "RESULTS & STANDINGS" },
  { id: "TK014", name: "Podium Medallists (Gold + 2× Bronze)", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  { id: "TK015", name: "Gam-jeom Penalty Deduction Bug", icon: "⚠️", subCat: "RECORDS & BUGS" },
  { id: "TK016", name: "PSS Electronic Chest Guard Score Bug", icon: "⚡", subCat: "RECORDS & BUGS" },
  { id: "TK017", name: "Venue & Weight Division Corner Bug", icon: "🏷️", subCat: "RECORDS & BUGS" },
];

// ─── TENNIS (TE) ────────────────────────────────────────────────────────────
export const TE_TEMPLATES = [
  { id: "TE001", name: "Player ID Lower Third (Name / Country / World Rank)", icon: "🎾", subCat: "LOWER THIRDS" },
  { id: "TE002", name: "World Ranking & Olympic Record Card", icon: "🌍", subCat: "LOWER THIRDS" },
  { id: "TE003", name: "Coach & Support Team ID Card", icon: "👤", subCat: "LOWER THIRDS" },
  { id: "TE004", name: "Doubles Pairing Profile Card", icon: "👥", subCat: "LOWER THIRDS" },
  { id: "TE005", name: "First Serve Speed Bug (210 km/h)", icon: "⚡", subCat: "SPLITS & TIMES" },
  { id: "TE006", name: "Second Serve Speed Bug (165 km/h)", icon: "⚡", subCat: "SPLITS & TIMES" },
  { id: "TE007", name: "Rally Length Counter Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "TE008", name: "Match Duration Clock Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "TE009", name: "Live Sets & Games Scoreboard Bug", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "TE010", name: "Tie-Break Point Scoreboard Bug", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "TE011", name: "Draw Bracket & Match Schedule", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "TE012", name: "Court Name & Match Number Bug", icon: "🏟️", subCat: "SCORES & MATCH" },
  { id: "TE013", name: "Full Match Statistics (Aces / DFs / Points Won)", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "TE014", name: "Set-by-Set Score Summary Table", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "TE015", name: "Service Statistics Table (1st Serve % / Winners)", icon: "📈", subCat: "RESULTS & STANDINGS" },
  { id: "TE016", name: "Tournament Draw Bracket", icon: "🌿", subCat: "RESULTS & STANDINGS" },
  { id: "TE017", name: "Podium Medallists & Country Tally", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  { id: "TE018", name: "Ace Highlight Bug", icon: "⭐", subCat: "RECORDS & BUGS" },
  { id: "TE019", name: "Hawkeye Challenge Result Bug (IN / OUT)", icon: "📺", subCat: "RECORDS & BUGS" },
  { id: "TE020", name: "Break Point / Match Point Bug", icon: "⚡", subCat: "RECORDS & BUGS" },
  { id: "TE021", name: "Venue & Surface Type Corner Bug", icon: "🏷️", subCat: "RECORDS & BUGS" },
];

// ─── TRIATHLON (TR) ─────────────────────────────────────────────────────────
export const TR_TEMPLATES = [
  { id: "TR001", name: "Triathlete ID Lower Third (Name / Country / World Rank)", icon: "🏊🚴🏃", subCat: "LOWER THIRDS" },
  { id: "TR002", name: "Olympic Champion / World Title Card", icon: "🥇", subCat: "LOWER THIRDS" },
  { id: "TR003", name: "Swim Split Time Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "TR004", name: "Bike Split Time & Gap Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "TR005", name: "Run Split & km-to-go Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "TR006", name: "Transition T1 / T2 Time Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "TR007", name: "Start List & Wave Draw", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "TR008", name: "Live Race Running Order Bug", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "TR009", name: "Final Results Table (Swim + Bike + Run + T1 + T2)", icon: "🏆", subCat: "RESULTS & STANDINGS" },
  { id: "TR010", name: "Podium Medallists & Country Tally", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  { id: "TR011", name: "World Record / Course Record Bug", icon: "🏁", subCat: "RECORDS & BUGS" },
  { id: "TR012", name: "Venue & Course Profile Corner Bug", icon: "🏷️", subCat: "RECORDS & BUGS" },
];

// ─── VOLLEYBALL (VO) ────────────────────────────────────────────────────────
export const VO_TEMPLATES = [
  { id: "VO001", name: "Player ID Lower Third (Name / No. / Country)", icon: "🏐", subCat: "LOWER THIRDS" },
  { id: "VO002", name: "Libero / Setter Specialist ID Card", icon: "👤", subCat: "LOWER THIRDS" },
  { id: "VO003", name: "Head Coach & Country ID Card", icon: "👤", subCat: "LOWER THIRDS" },
  { id: "VO004", name: "Team Profile & World Ranking Card", icon: "🏳️", subCat: "LOWER THIRDS" },
  { id: "VO005", name: "Set Duration Clock Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "VO006", name: "Technical Timeout Bug", icon: "⏸️", subCat: "SPLITS & TIMES" },
  { id: "VO007", name: "Video Challenge Timer Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "VO008", name: "Sets & Points Live Scoreboard Bug", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "VO009", name: "Court Service Rotation Grid", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "VO010", name: "6-Player Starting Lineup Card", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "VO011", name: "Group Phase Standings Table", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "VO012", name: "Pre-Match Team Preview Card", icon: "🗓️", subCat: "SCORES & MATCH" },
  { id: "VO013", name: "Set-by-Set Score Summary Table", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "VO014", name: "Player Stats (Attack / Block / Ace)", icon: "📈", subCat: "RESULTS & STANDINGS" },
  { id: "VO015", name: "Team Statistical Comparison Chart", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "VO016", name: "Knockout Bracket Draw", icon: "🌿", subCat: "RESULTS & STANDINGS" },
  { id: "VO017", name: "Podium Medallists & Country Tally", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  { id: "VO018", name: "Service Ace Highlight Bug", icon: "⭐", subCat: "RECORDS & BUGS" },
  { id: "VO019", name: "Video Challenge Review Bug (IN/OUT)", icon: "📺", subCat: "RECORDS & BUGS" },
  { id: "VO020", name: "Venue & Match Day Corner Bug", icon: "🏟️", subCat: "RECORDS & BUGS" },
];

// ─── WEIGHTLIFTING (WL) ─────────────────────────────────────────────────────
export const WL_TEMPLATES = [
  { id: "WL001", name: "Lifter ID Lower Third (Name / Country / Body Weight)", icon: "🏋️", subCat: "LOWER THIRDS" },
  { id: "WL002", name: "World Record Holder / Olympic Champion Card", icon: "🥇", subCat: "LOWER THIRDS" },
  { id: "WL003", name: "National Coach & Delegation Card", icon: "👤", subCat: "LOWER THIRDS" },
  { id: "WL004", name: "Body Weight Category Title Card", icon: "🏷️", subCat: "LOWER THIRDS" },
  { id: "WL005", name: "Current Attempt Bar Weight Bug (175 kg)", icon: "🏋️", subCat: "SPLITS & TIMES" },
  { id: "WL006", name: "Attempt Number Counter Bug (1 / 2 / 3)", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "WL007", name: "60-Second Lift Attempt Countdown Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "WL008", name: "Live Snatch & Clean+Jerk Scoreboard", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "WL009", name: "Starting Weight & Lift Order Table", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "WL010", name: "Current Lifter On Platform Bug", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "WL011", name: "Next Lifter & Requested Weight Bug", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "WL012", name: "Running Total Weight Standings Table", icon: "🏆", subCat: "RESULTS & STANDINGS" },
  { id: "WL013", name: "Snatch Phase Final Results Table", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "WL014", name: "Clean & Jerk Phase Final Results Table", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "WL015", name: "Total Weight Final Rankings Table", icon: "🏆", subCat: "RESULTS & STANDINGS" },
  { id: "WL016", name: "Podium Medallists & Country Tally", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  { id: "WL017", name: "3 Referee Decision Lights Bug (⚪⚪🔴)", icon: "🔴", subCat: "RECORDS & BUGS" },
  { id: "WL018", name: "World Record Weight Bug (193 kg WR)", icon: "🏁", subCat: "RECORDS & BUGS" },
  { id: "WL019", name: "Olympic Record Weight Bug", icon: "🥇", subCat: "RECORDS & BUGS" },
  { id: "WL020", name: "Good Lift / No Lift Announcement Bug", icon: "✅", subCat: "RECORDS & BUGS" },
  { id: "WL021", name: "Venue & Weight Category Corner Bug", icon: "🏷️", subCat: "RECORDS & BUGS" },
];

// ─── WRESTLING (WR) ─────────────────────────────────────────────────────────
export const WR_TEMPLATES = [
  { id: "WR001", name: "Wrestler ID Lower Third (Red / Blue Singlet)", icon: "🤼", subCat: "LOWER THIRDS" },
  { id: "WR002", name: "World Ranking & Weight Class Card", icon: "🌍", subCat: "LOWER THIRDS" },
  { id: "WR003", name: "Olympic Champion / World Title Card", icon: "🥇", subCat: "LOWER THIRDS" },
  { id: "WR004", name: "Discipline Style Card (Freestyle / Greco-Roman)", icon: "🏷️", subCat: "LOWER THIRDS" },
  { id: "WR005", name: "3-Minute Period Timer Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "WR006", name: "30-Second Passivity Clock Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "WR007", name: "Injury Timeout Timer Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "WR008", name: "Period Scoreboard (Takedowns / Exposure / Penalty)", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "WR009", name: "Weight Category Elimination Bracket", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "WR010", name: "Weight Class & Style Title Bug", icon: "🏷️", subCat: "SCORES & MATCH" },
  { id: "WR011", name: "Victory Method Result (Fall / TFS / Decision)", icon: "🏆", subCat: "RESULTS & STANDINGS" },
  { id: "WR012", name: "Period-by-Period Score Summary", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "WR013", name: "Full Bracket from Repechage to Final", icon: "🌿", subCat: "RESULTS & STANDINGS" },
  { id: "WR014", name: "Podium Medallists (Gold + 2× Bronze)", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  { id: "WR015", name: "Video Challenge Review Bug", icon: "📺", subCat: "RECORDS & BUGS" },
  { id: "WR016", name: "Caution / Warning Bug", icon: "⚠️", subCat: "RECORDS & BUGS" },
  { id: "WR017", name: "Venue & Weight Division Corner Bug", icon: "🏷️", subCat: "RECORDS & BUGS" },
];

// ─── AQUATICS – DIVING (DV) ─────────────────────────────────────────────────
export const DV_TEMPLATES = [
  { id: "DV001", name: "Diver ID Lower Third (Name / Country / World Rank)", icon: "🤿", subCat: "LOWER THIRDS" },
  { id: "DV002", name: "Olympic Champion / World Champion Card", icon: "🥇", subCat: "LOWER THIRDS" },
  { id: "DV003", name: "Dive DD (Degree of Difficulty) Bug", icon: "📊", subCat: "SPLITS & TIMES" },
  { id: "DV004", name: "7-Judge Score Display Bug", icon: "⭐", subCat: "SPLITS & TIMES" },
  { id: "DV005", name: "Dive Running Total Score Bug", icon: "📊", subCat: "SPLITS & TIMES" },
  { id: "DV006", name: "Start List & Dive Order", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "DV007", name: "Platform / Springboard Event Title Bug", icon: "🏷️", subCat: "SCORES & MATCH" },
  { id: "DV008", name: "Qualifying & Semi-Final Results Table", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "DV009", name: "Final Results Table (All 6 Dives)", icon: "🏆", subCat: "RESULTS & STANDINGS" },
  { id: "DV010", name: "Podium Medallists & Country Tally", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  { id: "DV011", name: "World Record Score Bug", icon: "🏁", subCat: "RECORDS & BUGS" },
  { id: "DV012", name: "Venue & Board Height Corner Bug", icon: "🏷️", subCat: "RECORDS & BUGS" },
];

// ─── AQUATICS – WATER POLO (WP) ─────────────────────────────────────────────
export const WP_TEMPLATES = [
  { id: "WP001", name: "Player ID Lower Third (Name / Cap No. / Country)", icon: "🤽", subCat: "LOWER THIRDS" },
  { id: "WP002", name: "Olympic Champion Card", icon: "🥇", subCat: "LOWER THIRDS" },
  { id: "WP003", name: "Match Clock Bug (8-Min Period)", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "WP004", name: "Shot Clock Bug (30 Seconds)", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "WP005", name: "Live Scoreboard Bug (Score / Period / Shot Clock)", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "WP006", name: "Starting 7 Lineup Card", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "WP007", name: "Group Phase Standings Table", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "WP008", name: "Period-by-Period Score Summary", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "WP009", name: "Player Stats (Goals / Assists / Saves)", icon: "📈", subCat: "RESULTS & STANDINGS" },
  { id: "WP010", name: "Podium Medallists & Country Tally", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  { id: "WP011", name: "Exclusion / Penalty Bug", icon: "⚠️", subCat: "RECORDS & BUGS" },
  { id: "WP012", name: "Venue & Pool Title Corner Bug", icon: "🏷️", subCat: "RECORDS & BUGS" },
];

// ─── AQUATICS – SYNCHRONISED SWIMMING (SY) ──────────────────────────────────
export const SY_TEMPLATES = [
  { id: "SY001", name: "Swimmer ID Lower Third (Duet / Team)", icon: "🤸", subCat: "LOWER THIRDS" },
  { id: "SY002", name: "Olympic Champion / World Title Card", icon: "🥇", subCat: "LOWER THIRDS" },
  { id: "SY003", name: "Technical / Free Routine Score Bug", icon: "📊", subCat: "SPLITS & TIMES" },
  { id: "SY004", name: "Element-by-Element Mark Bug", icon: "⭐", subCat: "SPLITS & TIMES" },
  { id: "SY005", name: "Start List & Rotation Order", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "SY006", name: "Duet / Team Standings Table", icon: "📊", subCat: "RESULTS & STANDINGS" },
  { id: "SY007", name: "Final Results Table", icon: "🏆", subCat: "RESULTS & STANDINGS" },
  { id: "SY008", name: "Podium Medallists & Country Tally", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  { id: "SY009", name: "Venue & Event Title Corner Bug", icon: "🏷️", subCat: "RECORDS & BUGS" },
];

// ─── MARATHON / ATHLETICS ROAD (MA) ─────────────────────────────────────────
export const MA_TEMPLATES = [
  { id: "MA001", name: "Runner ID Lower Third (Name / Country / PB)", icon: "🏃", subCat: "LOWER THIRDS" },
  { id: "MA002", name: "World Record Holder Card", icon: "🌍", subCat: "LOWER THIRDS" },
  { id: "MA003", name: "Olympic Champion Card", icon: "🥇", subCat: "LOWER THIRDS" },
  { id: "MA004", name: "5km Checkpoint Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "MA005", name: "10km Checkpoint Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "MA006", name: "Half-Marathon (21km) Split Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "MA007", name: "30km / 35km Checkpoint Bug", icon: "⏱️", subCat: "SPLITS & TIMES" },
  { id: "MA008", name: "km-to-Go Distance Bug", icon: "📏", subCat: "SPLITS & TIMES" },
  { id: "MA009", name: "Start List / Elite Start Wave Draw", icon: "📋", subCat: "SCORES & MATCH" },
  { id: "MA010", name: "Live Race Running Order Bug (Top 5)", icon: "📊", subCat: "SCORES & MATCH" },
  { id: "MA011", name: "Gap to Leader Bug (+1'23\")", icon: "⏱️", subCat: "SCORES & MATCH" },
  { id: "MA012", name: "Final Results Table (Top 10)", icon: "🏆", subCat: "RESULTS & STANDINGS" },
  { id: "MA013", name: "Podium Medallists & Country Tally", icon: "🥇", subCat: "RESULTS & STANDINGS" },
  { id: "MA014", name: "World Record Pace Line", icon: "🏁", subCat: "RECORDS & BUGS" },
  { id: "MA015", name: "Olympic Record Pace Line", icon: "🥇", subCat: "RECORDS & BUGS" },
  { id: "MA016", name: "Course Venue & Distance Corner Bug", icon: "🏷️", subCat: "RECORDS & BUGS" },
];

// ─── MASTER LOOKUP TABLE ─────────────────────────────────────────────────────
















/**
 * Get OBS-style numbered templates for any Olympic sport.
 * Returns templates like SW001, AT001, BX001 etc.
 */
function fillMissingTemplates(list, sportCode, sportName) {
  if (!list || list.length === 0) return [];
  const code = (sportCode || "XX").toUpperCase();
  const existingIds = new Set(list.map(t => t.id));

  let maxId = 0;
  list.forEach(t => {
    const num = parseInt((t.id || "").replace(/\D/g, ""), 10);
    if (!isNaN(num) && num > maxId) maxId = num;
  });

  const filledList = [...list];
  const defaultNames = [
    "Intermediate Split Time Bug",
    "50m Lap Split Time",
    "Stroke Rate & Pace Indicator",
    "Relay Team Split Time",
    "World Record Pace Line",
    "Olympic Record Pace Line",
    "Turn Indicator & Reaction Time",
    "Speed & Velocity Corner Bug",
    "Phase Qualifying Summary Table",
    "Head-to-Head Comparison Card"
  ];

  for (let i = 1; i <= maxId; i++) {
    const paddedId = `${code}${String(i).padStart(3, '0')}`;
    if (!existingIds.has(paddedId)) {
      const nameIndex = (i - 1) % defaultNames.length;
      filledList.push({
        id: paddedId,
        name: `${sportName || code} ${defaultNames[nameIndex]}`,
        icon: i % 2 === 0 ? "⏱️" : "📋",
        subCat: i % 3 === 0 ? "SPLITS & TIMES" : i % 2 === 0 ? "SCORES & MATCH" : "RESULTS & STANDINGS"
      });
    }
  }

  return filledList.sort((a, b) => {
    const numA = parseInt((a.id || "").replace(/\D/g, ""), 10) || 0;
    const numB = parseInt((b.id || "").replace(/\D/g, ""), 10) || 0;
    return numA - numB;
  });
}

export function getSportTemplates(sport) {
  if (!sport) return fillMissingTemplates(TEMPLATE_TYPES, "MASTER", "Master");

  // Use inline templates on the sport object if provided
  if (sport.templates && sport.templates.length > 0) {
    return fillMissingTemplates(sport.templates, sport.code, sport.name);
  }

  const code = (sport.code || "").toUpperCase();

  // 1. Primary lookup from RealTemplates by sport code (e.g. AT_TEMPLATES, SW_TEMPLATES)
  const realKey = `${code}_TEMPLATES`;
  if (RealTemplates[realKey] && RealTemplates[realKey].length > 0) {
    return fillMissingTemplates(RealTemplates[realKey], code, sport.name);
  }

  // 2. Name-based fallback for partial matches from RealTemplates
  const name = sport.name || "";
  if (name.includes("Swimming") && RealTemplates.SW_TEMPLATES) return fillMissingTemplates(RealTemplates.SW_TEMPLATES, "SW", sport.name);
  if ((name.includes("Athletics") || name.includes("Track")) && RealTemplates.AT_TEMPLATES) return fillMissingTemplates(RealTemplates.AT_TEMPLATES, "AT", sport.name);
  if (name.includes("Archery") && RealTemplates.AR_TEMPLATES) return fillMissingTemplates(RealTemplates.AR_TEMPLATES, "AR", sport.name);
  if (name.includes("Badminton") && RealTemplates.BD_TEMPLATES) return fillMissingTemplates(RealTemplates.BD_TEMPLATES, "BD", sport.name);
  if (name.includes("Basketball") && RealTemplates.BK_TEMPLATES) return fillMissingTemplates(RealTemplates.BK_TEMPLATES, "BK", sport.name);
  if (name.includes("Beach Volleyball") && RealTemplates.BV_TEMPLATES) return fillMissingTemplates(RealTemplates.BV_TEMPLATES, "BV", sport.name);
  if (name.includes("Boxing") && RealTemplates.BX_TEMPLATES) return fillMissingTemplates(RealTemplates.BX_TEMPLATES, "BX", sport.name);
  if ((name.includes("Canoe Slalom") || name.includes("Slalom")) && RealTemplates.CS_TEMPLATES) return fillMissingTemplates(RealTemplates.CS_TEMPLATES, "CS", sport.name);
  if ((name.includes("Canoe") || name.includes("Flatwater") || name.includes("Sprint")) && RealTemplates.CF_TEMPLATES) return fillMissingTemplates(RealTemplates.CF_TEMPLATES, "CF", sport.name);
  if ((name.includes("Cycling Track") || name.includes("Track Cycling")) && RealTemplates.CT_TEMPLATES) return fillMissingTemplates(RealTemplates.CT_TEMPLATES, "CT", sport.name);
  if ((name.includes("Cycling Road") || name.includes("Road Cycling")) && RealTemplates.CR_TEMPLATES) return fillMissingTemplates(RealTemplates.CR_TEMPLATES, "CR", sport.name);
  if (name.includes("Diving") && RealTemplates.DV_TEMPLATES) return fillMissingTemplates(RealTemplates.DV_TEMPLATES, "DV", sport.name);
  if (name.includes("Water Polo") && RealTemplates.WP_TEMPLATES) return fillMissingTemplates(RealTemplates.WP_TEMPLATES, "WP", sport.name);
  if ((name.includes("Synchronised") || name.includes("Synchronized")) && RealTemplates.SY_TEMPLATES) return fillMissingTemplates(RealTemplates.SY_TEMPLATES, "SY", sport.name);

  // Generic fallback — build numbered templates dynamically
  const c = code.toUpperCase() || "XX";
  return fillMissingTemplates([
    { id: `${c}001`, name: `${sport.name} Athlete ID Lower Third`, icon: "👤", subCat: "LOWER THIRDS" },
    { id: `${c}002`, name: `${sport.name} Olympic Champion Card`, icon: "🥇", subCat: "LOWER THIRDS" },
    { id: `${c}003`, name: `${sport.name} Intermediate Split / Score Bug`, icon: "⏱️", subCat: "SPLITS & TIMES" },
    { id: `${c}004`, name: `${sport.name} Live Scoreboard Bug`, icon: "📊", subCat: "SCORES & MATCH" },
    { id: `${c}005`, name: `${sport.name} Heat / Start List Draw`, icon: "📋", subCat: "SCORES & MATCH" },
    { id: `${c}006`, name: `${sport.name} Final Results & Standings Table`, icon: "🏆", subCat: "RESULTS & STANDINGS" },
    { id: `${c}007`, name: `${sport.name} Tournament Bracket Tree`, icon: "🌿", subCat: "RESULTS & STANDINGS" },
    { id: `${c}008`, name: `${sport.name} Podium Medallists & Country Tally`, icon: "🥇", subCat: "RESULTS & STANDINGS" },
    { id: `${c}009`, name: `${sport.name} World Record Pace Line`, icon: "🏁", subCat: "RECORDS & BUGS" },
    { id: `${c}010`, name: `${sport.name} Venue & Event Title Corner Bug`, icon: "🏷️", subCat: "RECORDS & BUGS" },
  ], c, sport.name);
}

