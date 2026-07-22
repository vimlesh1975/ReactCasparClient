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
