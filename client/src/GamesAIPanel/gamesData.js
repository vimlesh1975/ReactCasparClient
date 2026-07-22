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
    primaryColor: "#884ea0",
    secondaryColor: "#a569bd",
    accentColor: "#f1c40f",
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

export const TEMPLATE_TYPES = [
  { id: "lower-third", name: "Lower Third / Athlete ID", icon: "👤" },
  { id: "scoreboard", name: "Live Match Bug / Scoreboard", icon: "⚽" },
  { id: "start-list", name: "Start List / Heat Lineup", icon: "📋" },
  { id: "results-table", name: "Results & Standings Table", icon: "📊" },
  { id: "medal-tally", name: "Medal Tally Overlay", icon: "🥇" },
  { id: "event-bug", name: "Venue & Event Title Bug", icon: "🏷️" }
];

/**
 * Get OBS 2012 Sport-Specific Graphic Templates for any of the 36 Olympic Sports
 */
export function getSportTemplates(sport) {
  if (!sport) return TEMPLATE_TYPES;

  if (sport.templates && sport.templates.length > 0) {
    return sport.templates;
  }

  const code = sport.code || "";
  const name = sport.name || "";

  if (code === "SW" || name.includes("Swimming")) {
    return [
      // LOWER THIRDS
      { id: "sw-lt-swimmer", name: "Swimmer ID (Name, Country, Lane)", icon: "🏊", subCat: "LOWER THIRDS" },
      { id: "sw-lt-world-record-holder", name: "World Record Holder / Olympic Champion", icon: "🥇", subCat: "LOWER THIRDS" },
      { id: "sw-lt-relay-team", name: "Relay Team Swimmers Card (4 Swimmers)", icon: "👥", subCat: "LOWER THIRDS" },
      { id: "sw-lt-coach", name: "Head Coach & Country ID", icon: "👤", subCat: "LOWER THIRDS" },

      // SPLITS & TIMES
      { id: "sw-split-50m", name: "50m Intermediate Split Times", icon: "⏱️", subCat: "SPLITS & TIMES" },
      { id: "sw-split-100m", name: "100m Intermediate Split Times", icon: "⏱️", subCat: "SPLITS & TIMES" },
      { id: "sw-split-200m", name: "200m Intermediate Split Times", icon: "⏱️", subCat: "SPLITS & TIMES" },
      { id: "sw-reaction-time", name: "Reaction Time Bug (0.64s)", icon: "⚡", subCat: "SPLITS & TIMES" },
      { id: "sw-turn-time", name: "15m Breakout / Turn Speed Bug", icon: "💨", subCat: "SPLITS & TIMES" },

      // SCORES & MATCH
      { id: "sw-start-list-8lane", name: "8-Lane Heat Start List", icon: "📋", subCat: "SCORES & MATCH" },
      { id: "sw-start-list-relay", name: "Relay Team Order of Start", icon: "📋", subCat: "SCORES & MATCH" },
      { id: "sw-heat-draw", name: "Heat Schedule & Lane Assignment", icon: "🗓️", subCat: "SCORES & MATCH" },

      // RESULTS & STANDINGS
      { id: "sw-finish-touch-order", name: "Finish Touch Order & Times (1st to 8th)", icon: "🏁", subCat: "RESULTS & STANDINGS" },
      { id: "sw-heat-results", name: "Heat Final Results Table", icon: "🏆", subCat: "RESULTS & STANDINGS" },
      { id: "sw-semi-final-qualifiers", name: "Top 8 Qualifiers for Final", icon: "📊", subCat: "RESULTS & STANDINGS" },
      { id: "sw-podium-medallists", name: "Medallists & Podium Ceremony (Gold, Silver, Bronze)", icon: "🥇", subCat: "RESULTS & STANDINGS" },

      // RECORDS & BUGS
      { id: "sw-wr-line", name: "World Record Pace Comparison Line (46.91s)", icon: "🏁", subCat: "RECORDS & BUGS" },
      { id: "sw-or-line", name: "Olympic Record Pace Line", icon: "🥇", subCat: "RECORDS & BUGS" },
      { id: "sw-record-broken", name: "NEW WORLD RECORD / OLYMPIC RECORD Flash Bug", icon: "🎉", subCat: "RECORDS & BUGS" },
      { id: "sw-pool-title-bug", name: "Aquatics Centre Event Title Corner Bug", icon: "🏷️", subCat: "RECORDS & BUGS" }
    ];
  }

  if (code === "AT" || name.includes("Athletics") || name.includes("Track")) {
    return [
      // LOWER THIRDS
      { id: "at-lt-athlete", name: "Athlete ID (Bib, Country, Event)", icon: "🏃", subCat: "LOWER THIRDS" },
      { id: "at-lt-champion", name: "Olympic Champion / World Record Holder", icon: "🥇", subCat: "LOWER THIRDS" },
      { id: "at-lt-relay-team", name: "4x100m / 4x400m Relay Team Card", icon: "👥", subCat: "LOWER THIRDS" },

      // SPLITS & TIMES
      { id: "at-split-100m", name: "100m / 200m Sector Splits", icon: "⏱️", subCat: "SPLITS & TIMES" },
      { id: "at-reaction-time", name: "Reaction Time Bug (0.145s)", icon: "⚡", subCat: "SPLITS & TIMES" },
      { id: "at-speed-trap", name: "Sprint Speed Trap (44.7 km/h)", icon: "💨", subCat: "SPLITS & TIMES" },

      // SCORES & MATCH
      { id: "at-start-list", name: "8-Lane Track Start List", icon: "📋", subCat: "SCORES & MATCH" },
      { id: "at-field-start", name: "Field Event Competitor Order", icon: "📋", subCat: "SCORES & MATCH" },
      { id: "at-heat-schedule", name: "Round 1 / Semi-Final Heat Schedule", icon: "🗓️", subCat: "SCORES & MATCH" },

      // RESULTS & STANDINGS
      { id: "at-results", name: "100m/Final Results Table (1st to 8th)", icon: "🏆", subCat: "RESULTS & STANDINGS" },
      { id: "at-attempt-board", name: "High Jump / Pole Vault Attempts (O O X O)", icon: "📊", subCat: "RESULTS & STANDINGS" },
      { id: "at-field-standings", name: "Long Jump / Throw Standings", icon: "📊", subCat: "RESULTS & STANDINGS" },
      { id: "at-podium-medallists", name: "Podium Medallists (Gold, Silver, Bronze)", icon: "🥇", subCat: "RESULTS & STANDINGS" },

      // RECORDS & BUGS
      { id: "at-wind-indicator", name: "Wind Speed Bug (+1.5 m/s)", icon: "💨", subCat: "RECORDS & BUGS" },
      { id: "at-lane-id", name: "Lane Identifier Overlay", icon: "🎽", subCat: "RECORDS & BUGS" },
      { id: "at-wr-line", name: "World Record Pace Line (9.58s)", icon: "🏁", subCat: "RECORDS & BUGS" },
      { id: "at-or-line", name: "Olympic Record Line (9.63s)", icon: "🥇", subCat: "RECORDS & BUGS" },
      { id: "at-false-start", name: "DQ / False Start Warning Bug", icon: "⚠️", subCat: "RECORDS & BUGS" }
    ];
  }

  if (code === "BK" || name.includes("Basketball")) {
    return [
      { id: "bk-scoreboard", name: "Scoreboard Bug (Shot Clock 24s)", icon: "🏀" },
      { id: "bk-player-stats", name: "Player Stats (PTS/REB/AST)", icon: "👤" },
      { id: "bk-lineup", name: "Starting Lineup (5 Players)", icon: "📋" },
      { id: "bk-fouls-summary", name: "Team Fouls & Quarter Summary", icon: "📊" }
    ];
  }

  if (code === "FB" || name.includes("Football")) {
    return [
      { id: "fb-scoreboard", name: "Scoreboard Bug (Added Time/Cards)", icon: "⚽" },
      { id: "fb-lineup-formation", name: "Tactical Lineup (4-4-2)", icon: "📋" },
      { id: "fb-substitution", name: "Player Substitution (IN/OUT)", icon: "🔄" },
      { id: "fb-match-stats", name: "Match Statistics (Poss/Shots)", icon: "📊" }
    ];
  }

  if (code === "AR" || name.includes("Archery")) {
    return [
      { id: "ar-target-score", name: "Target Arrow Score (10,9,8)", icon: "🎯" },
      { id: "ar-set-points", name: "Set Points Tracker (6-2)", icon: "📊" },
      { id: "ar-bracket", name: "Match Bracket Tree", icon: "🌿" }
    ];
  }

  if (code === "GY" || name.includes("Gymnastics")) {
    return [
      { id: "gy-score-breakdown", name: "D & E Score Breakdown", icon: "🤸" },
      { id: "gy-apparatus-bug", name: "Apparatus Bug (Vault/Beam)", icon: "🏷️" },
      { id: "gy-rankings", name: "Apparatus Standings Table", icon: "🏆" }
    ];
  }

  if (code === "WL" || name.includes("Weightlifting")) {
    return [
      { id: "wl-attempt", name: "Bar Weight Attempt (175 kg)", icon: "🏋️" },
      { id: "wl-lights", name: "Referee Lights (⚪ ⚪ 🔴)", icon: "🔴" },
      { id: "wl-standings", name: "Total Weight Standings", icon: "🏆" }
    ];
  }

  if (code === "TE" || name.includes("Tennis")) {
    return [
      { id: "te-match-score", name: "Sets & Games Scoreboard", icon: "🎾" },
      { id: "te-serve-speed", name: "Serve Speed Bug (210 km/h)", icon: "⚡" },
      { id: "te-match-stats", name: "Aces & Double Faults Stats", icon: "📊" }
    ];
  }

  if (code === "CT" || code === "CR" || code === "BM" || code === "MT" || name.includes("Cycling")) {
    return [
      // LOWER THIRDS
      { id: "ct-lt-rider", name: "Rider ID Lower Third", icon: "🚴", subCat: "LOWER THIRDS" },
      { id: "ct-lt-team", name: "Team Pursuit Lower Third", icon: "👥", subCat: "LOWER THIRDS" },
      { id: "ct-lt-champion", name: "World Record Holder / Olympic Champion", icon: "🥇", subCat: "LOWER THIRDS" },
      
      // SPLITS & TIMES
      { id: "ct-250m-split", name: "250m Lap Split Time", icon: "⏱️", subCat: "SPLITS & TIMES" },
      { id: "ct-500m-split", name: "500m Time Trial Split", icon: "⏱️", subCat: "SPLITS & TIMES" },
      { id: "ct-1000m-final", name: "1000m Time Trial Final Time", icon: "⏱️", subCat: "SPLITS & TIMES" },
      { id: "ct-team-pursuit-split", name: "Team Pursuit 4km Split Times", icon: "⏱️", subCat: "SPLITS & TIMES" },
      { id: "ct-team-sprint-split", name: "Team Sprint 3-Lap Splits", icon: "⏱️", subCat: "SPLITS & TIMES" },
      
      // SCORES & MATCH
      { id: "ct-sprint-1v1", name: "Sprint 1v1 Match Scoreboard (Best of 3)", icon: "🥊", subCat: "SCORES & MATCH" },
      { id: "ct-keirin-draw", name: "Keirin Starting Draw & Lineup", icon: "📋", subCat: "SCORES & MATCH" },
      { id: "ct-heat-lineup", name: "Heat Lineup & Lane Draw", icon: "📋", subCat: "SCORES & MATCH" },

      // RESULTS & STANDINGS
      { id: "ct-keirin-result", name: "Keirin Final Finish Order", icon: "🏆", subCat: "RESULTS & STANDINGS" },
      { id: "ct-omnium-standings", name: "Omnium Overall Points Table", icon: "📊", subCat: "RESULTS & STANDINGS" },
      { id: "ct-omnium-flying-lap", name: "Omnium Flying 250m Lap Results", icon: "⏱️", subCat: "RESULTS & STANDINGS" },
      { id: "ct-omnium-elimination", name: "Omnium Elimination Order", icon: "🚫", subCat: "RESULTS & STANDINGS" },
      { id: "ct-madison-points", name: "Madison Points & Laps Gained Table", icon: "📊", subCat: "RESULTS & STANDINGS" },
      { id: "ct-qualifying-rankings", name: "Qualifying Round Standings", icon: "🏆", subCat: "RESULTS & STANDINGS" },
      { id: "ct-podium-medallists", name: "Podium Medallists & Country Tally", icon: "🥇", subCat: "RESULTS & STANDINGS" },

      // RECORDS & BUGS
      { id: "ct-speed-trap", name: "Speed Trap Max Speed (73.4 km/h)", icon: "⚡", subCat: "RECORDS & BUGS" },
      { id: "ct-lap-counter", name: "Velodrome Lap Counter Bug", icon: "🔢", subCat: "RECORDS & BUGS" },
      { id: "ct-wr-line", name: "World Record Pace Line (1:00.255)", icon: "🏁", subCat: "RECORDS & BUGS" },
      { id: "ct-or-line", name: "Olympic Record Pace Line", icon: "🥇", subCat: "RECORDS & BUGS" },
      { id: "cr-time-gap", name: "Road Race Time Gap Bug (+1'45\")", icon: "⏱️", subCat: "RECORDS & BUGS" }
    ];
  }

  if (code === "SW" || name.includes("Swimming")) {
    return [
      { id: "sw-lt-swimmer", name: "Swimmer Lower Third", icon: "🏊", subCat: "LOWER THIRDS" },
      { id: "sw-start-list", name: "8-Lane Start List", icon: "📋", subCat: "SCORES & MATCH" },
      { id: "sw-split-times", name: "50m/100m Split Times", icon: "⏱️", subCat: "SPLITS & TIMES" },
      { id: "sw-reaction-time", name: "Reaction Time Bug (0.64s)", icon: "⚡", subCat: "SPLITS & TIMES" },
      { id: "sw-record-line", name: "WR/OR Pace Line", icon: "🥇", subCat: "RECORDS & BUGS" },
      { id: "sw-lane-order", name: "Finish Order & Touch Times", icon: "🏁", subCat: "RESULTS & STANDINGS" }
    ];
  }

  if (code === "AT" || name.includes("Athletics") || name.includes("Track")) {
    return [
      { id: "at-lt-athlete", name: "Athlete Lower Third", icon: "🏃", subCat: "LOWER THIRDS" },
      { id: "at-start-list", name: "8-Lane Track Start List", icon: "📋", subCat: "SCORES & MATCH" },
      { id: "at-results", name: "100m/Final Results Table", icon: "🏆", subCat: "RESULTS & STANDINGS" },
      { id: "at-wind-indicator", name: "Wind Speed Bug (+1.5m/s)", icon: "💨", subCat: "RECORDS & BUGS" },
      { id: "at-attempt-board", name: "Jump/Vault Attempts (O O X O)", icon: "📊", subCat: "RESULTS & STANDINGS" },
      { id: "at-lane-id", name: "Lane Identifier Overlay", icon: "🎽", subCat: "RECORDS & BUGS" }
    ];
  }

  if (code === "BK" || name.includes("Basketball")) {
    return [
      { id: "bk-scoreboard", name: "Scoreboard Bug (Shot Clock 24s)", icon: "🏀", subCat: "SCORES & MATCH" },
      { id: "bk-player-stats", name: "Player Stats (PTS/REB/AST)", icon: "👤", subCat: "LOWER THIRDS" },
      { id: "bk-lineup", name: "Starting Lineup (5 Players)", icon: "📋", subCat: "SCORES & MATCH" },
      { id: "bk-fouls-summary", name: "Team Fouls & Quarter Summary", icon: "📊", subCat: "RESULTS & STANDINGS" }
    ];
  }

  if (code === "FB" || name.includes("Football")) {
    return [
      { id: "fb-scoreboard", name: "Scoreboard Bug (Added Time/Cards)", icon: "⚽", subCat: "SCORES & MATCH" },
      { id: "fb-lineup-formation", name: "Tactical Lineup (4-4-2)", icon: "📋", subCat: "SCORES & MATCH" },
      { id: "fb-substitution", name: "Player Substitution (IN/OUT)", icon: "🔄", subCat: "LOWER THIRDS" },
      { id: "fb-match-stats", name: "Match Statistics (Poss/Shots)", icon: "📊", subCat: "RESULTS & STANDINGS" }
    ];
  }

  if (code === "AR" || name.includes("Archery")) {
    return [
      { id: "ar-target-score", name: "Target Arrow Score (10,9,8)", icon: "🎯", subCat: "SPLITS & TIMES" },
      { id: "ar-set-points", name: "Set Points Tracker (6-2)", icon: "📊", subCat: "SCORES & MATCH" },
      { id: "ar-bracket", name: "Match Bracket Tree", icon: "🌿", subCat: "RESULTS & STANDINGS" }
    ];
  }

  if (code === "GY" || name.includes("Gymnastics")) {
    return [
      { id: "gy-score-breakdown", name: "D & E Score Breakdown", icon: "🤸", subCat: "LOWER THIRDS" },
      { id: "gy-apparatus-bug", name: "Apparatus Bug (Vault/Beam)", icon: "🏷️", subCat: "RECORDS & BUGS" },
      { id: "gy-rankings", name: "Apparatus Standings Table", icon: "🏆", subCat: "RESULTS & STANDINGS" }
    ];
  }

  if (code === "WL" || name.includes("Weightlifting")) {
    return [
      { id: "wl-attempt", name: "Bar Weight Attempt (175 kg)", icon: "🏋️", subCat: "LOWER THIRDS" },
      { id: "wl-lights", name: "Referee Lights (⚪ ⚪ 🔴)", icon: "🔴", subCat: "RECORDS & BUGS" },
      { id: "wl-standings", name: "Total Weight Standings", icon: "🏆", subCat: "RESULTS & STANDINGS" }
    ];
  }

  if (code === "TE" || name.includes("Tennis")) {
    return [
      { id: "te-match-score", name: "Sets & Games Scoreboard", icon: "🎾", subCat: "SCORES & MATCH" },
      { id: "te-serve-speed", name: "Serve Speed Bug (210 km/h)", icon: "⚡", subCat: "RECORDS & BUGS" },
      { id: "te-match-stats", name: "Aces & Double Faults Stats", icon: "📊", subCat: "RESULTS & STANDINGS" }
    ];
  }

  if (code === "BX" || name.includes("Boxing")) {
    return [
      // LOWER THIRDS
      { id: "bx-lt-boxer", name: "Boxer ID (Red / Blue Corner)", icon: "🥊", subCat: "LOWER THIRDS" },
      { id: "bx-lt-tale-tape", name: "Tale of the Tape (Height/Weight/Reach)", icon: "📊", subCat: "LOWER THIRDS" },
      { id: "bx-lt-champion", name: "Olympic Champion / World Rank Card", icon: "🥇", subCat: "LOWER THIRDS" },
      { id: "bx-lt-corner", name: "Corner Coach & Seconds ID", icon: "👤", subCat: "LOWER THIRDS" },

      // SCORES & MATCH
      { id: "bx-scoreboard", name: "Bout Scoreboard Bug (Round 1/2/3)", icon: "🥊", subCat: "SCORES & MATCH" },
      { id: "bx-round-banner", name: "Round Title Banner (Round 1 / 2 / 3)", icon: "🔔", subCat: "SCORES & MATCH" },
      { id: "bx-bout-schedule", name: "Bout Schedule & Matchup List", icon: "📋", subCat: "SCORES & MATCH" },
      { id: "bx-weight-title", name: "Weight Class Bug (Men's 69kg)", icon: "🏷️", subCat: "SCORES & MATCH" },

      // RESULTS & STANDINGS
      { id: "bx-judges-scores", name: "5-Judges Score Card (10-9, 10-9)", icon: "⭐", subCat: "RESULTS & STANDINGS" },
      { id: "bx-decision-result", name: "Official Decision (Unanimous/KO)", icon: "🏆", subCat: "RESULTS & STANDINGS" },
      { id: "bx-tournament-bracket", name: "Tournament Bracket Tree", icon: "🌿", subCat: "RESULTS & STANDINGS" },
      { id: "bx-podium-medallists", name: "Podium Medallists (Gold, Silver, Bronze)", icon: "🥇", subCat: "RESULTS & STANDINGS" },

      // RECORDS & BUGS
      { id: "bx-punch-stats", name: "Punches Landed / Compubox Stats", icon: "📊", subCat: "RECORDS & BUGS" },
      { id: "bx-warning-bug", name: "Referee Warning / Caution Bug", icon: "⚠️", subCat: "RECORDS & BUGS" },
      { id: "bx-clock-bug", name: "3-Minute Round Clock Bug", icon: "⏱️", subCat: "RECORDS & BUGS" }
    ];
  }

  if (code === "JU" || name.includes("Judo")) {
    return [
      { id: "ju-lt-judoka", name: "Judoka ID (White / Blue Gi)", icon: "🥋", subCat: "LOWER THIRDS" },
      { id: "ju-scoreboard", name: "Scoreboard (Ippon / Waza-ari / Yuko)", icon: "🥋", subCat: "SCORES & MATCH" },
      { id: "ju-penalty-bug", name: "Shido Penalty & Golden Score Bug", icon: "⚠️", subCat: "RECORDS & BUGS" },
      { id: "ju-results", name: "Match Winner & Technique Result", icon: "🏆", subCat: "RESULTS & STANDINGS" }
    ];
  }

  if (code === "TK" || name.includes("Taekwondo")) {
    return [
      { id: "tk-lt-fighter", name: "Taekwondo Fighter ID (Red / Blue)", icon: "🥋", subCat: "LOWER THIRDS" },
      { id: "tk-scoreboard", name: "Match Scoreboard (Body / Head Kicks)", icon: "🥊", subCat: "SCORES & MATCH" },
      { id: "tk-gam-jeom", name: "Gam-jeom Penalty & Deduction Bug", icon: "⚠️", subCat: "RECORDS & BUGS" },
      { id: "tk-results", name: "Final Point Gap Victory Result", icon: "🏆", subCat: "RESULTS & STANDINGS" }
    ];
  }

  if (code === "WR" || name.includes("Wrestling")) {
    return [
      { id: "wr-lt-wrestler", name: "Wrestler ID (Red / Blue Singlet)", icon: "🤼", subCat: "LOWER THIRDS" },
      { id: "wr-scoreboard", name: "Period Scoreboard & Passivity Clock", icon: "⏱️", subCat: "SCORES & MATCH" },
      { id: "wr-challenge", name: "Video Challenge Status Bug", icon: "📺", subCat: "RECORDS & BUGS" },
      { id: "wr-results", name: "Victory by Fall / Technical Superiority", icon: "🏆", subCat: "RESULTS & STANDINGS" }
    ];
  }

  if (code === "RO" || code === "CS" || name.includes("Rowing") || name.includes("Canoe")) {
    return [
      { id: "ro-split-500m", name: "500m Intermediate Splits", icon: "🚣", subCat: "SPLITS & TIMES" },
      { id: "ro-position-bug", name: "6-Boat Position Bug", icon: "📊", subCat: "RESULTS & STANDINGS" }
    ];
  }

  if (code === "VB" || code === "BV" || name.includes("Volleyball")) {
    return [
      { id: "vb-set-scoreboard", name: "Sets & Points Scoreboard", icon: "🏐", subCat: "SCORES & MATCH" },
      { id: "vb-rotation", name: "Court Rotation Grid", icon: "📋", subCat: "SCORES & MATCH" }
    ];
  }

  const c = code.toLowerCase();
  return [
    // LOWER THIRDS
    { id: `${c}-lt-athlete`, name: `${sport.name} Athlete ID Lower Third`, icon: "👤", subCat: "LOWER THIRDS" },
    { id: `${c}-lt-team`, name: `${sport.name} Team & Country Profile`, icon: "🏳️", subCat: "LOWER THIRDS" },
    { id: `${c}-lt-champion`, name: `${sport.name} Olympic Champion Card`, icon: "🥇", subCat: "LOWER THIRDS" },
    
    // SPLITS & TIMES
    { id: `${c}-splits`, name: `${sport.name} Intermediate Split Times`, icon: "⏱️", subCat: "SPLITS & TIMES" },
    { id: `${c}-reaction`, name: `${sport.name} Reaction / Sector Time Bug`, icon: "⚡", subCat: "SPLITS & TIMES" },
    
    // SCORES & MATCH
    { id: `${c}-scoreboard`, name: `${sport.name} Live Match Scoreboard Bug`, icon: "📊", subCat: "SCORES & MATCH" },
    { id: `${c}-start-list`, name: `${sport.name} Heat / Lane Lineup Draw`, icon: "📋", subCat: "SCORES & MATCH" },
    { id: `${c}-match-schedule`, name: `${sport.name} Daily Schedule & Matchups`, icon: "🗓️", subCat: "SCORES & MATCH" },

    // RESULTS & STANDINGS
    { id: `${c}-results`, name: `${sport.name} Final Results & Standings Table`, icon: "🏆", subCat: "RESULTS & STANDINGS" },
    { id: `${c}-bracket`, name: `${sport.name} Tournament Bracket Tree`, icon: "🌿", subCat: "RESULTS & STANDINGS" },
    { id: `${c}-podium`, name: `${sport.name} Medal Ceremony & Country Tally`, icon: "🥇", subCat: "RESULTS & STANDINGS" },

    // RECORDS & BUGS
    { id: `${c}-wr-line`, name: `${sport.name} World Record Pace Line`, icon: "🏁", subCat: "RECORDS & BUGS" },
    { id: `${c}-event-bug`, name: `${sport.name} Venue & Title Corner Bug`, icon: "🏷️", subCat: "RECORDS & BUGS" },
    { id: `${c}-penalty-bug`, name: `${sport.name} Penalty / Caution Status Bug`, icon: "⚠️", subCat: "RECORDS & BUGS" }
  ];
}
