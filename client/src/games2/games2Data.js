/**
 * London 2012 Olympic Games — Sport Metadata & Color Themes (games2)
 */

import * as RealTemplates from "./real_templates_output";

export const OLYMPIC_GAMES_DATA_2 = [
  { id: "aquatics-swimming", name: "Aquatics - Swimming", code: "SW", category: "Aquatics", venue: "Aquatics Centre", primaryColor: "#0077be", secondaryColor: "#00d2ff", accentColor: "#ffffff" },
  { id: "archery", name: "Archery", code: "AR", category: "Precision", venue: "Lord's Cricket Ground", primaryColor: "#27ae60", secondaryColor: "#2ecc71", accentColor: "#f39c12" },
  { id: "athletics", name: "Athletics", code: "AT", category: "Athletics", venue: "Olympic Stadium", primaryColor: "#c0392b", secondaryColor: "#e74c3c", accentColor: "#f1c40f" },
  { id: "badminton", name: "Badminton", code: "BD", category: "Racquet", venue: "Wembley Arena", primaryColor: "#d35400", secondaryColor: "#e67e22", accentColor: "#ffffff" },
  { id: "basketball", name: "Basketball", code: "BK", category: "Ball Sports", venue: "North Greenwich Arena", primaryColor: "#e67e22", secondaryColor: "#d35400", accentColor: "#ffffff" },
  { id: "beach-volleyball", name: "Beach Volleyball", code: "BV", category: "Ball Sports", venue: "Horse Guards Parade", primaryColor: "#f1c40f", secondaryColor: "#f39c12", accentColor: "#2980b9" },
  { id: "boxing", name: "Boxing", code: "BX", category: "Combat", venue: "ExCeL London", primaryColor: "#c0392b", secondaryColor: "#2c3e50", accentColor: "#f1c40f" },
  { id: "canoe-slalom", name: "Canoe Slalom", code: "CS", category: "Canoe", venue: "Lee Valley White Water Centre", primaryColor: "#16a085", secondaryColor: "#1abc9c", accentColor: "#ffffff" },
  { id: "canoe-sprint", name: "Canoe Sprint", code: "CF", category: "Canoe", venue: "Eton Dorney", primaryColor: "#2980b9", secondaryColor: "#3498db", accentColor: "#f1c40f" },
  { id: "cycling-bmx", name: "Cycling - BMX", code: "CB", category: "Cycling", venue: "BMX Track", primaryColor: "#e74c3c", secondaryColor: "#c0392b", accentColor: "#f1c40f" },
  { id: "cycling-mountain-bike", name: "Cycling - Mountain Bike", code: "CM", category: "Cycling", venue: "Hadleigh Farm", primaryColor: "#27ae60", secondaryColor: "#1e8449", accentColor: "#ffffff" },
  { id: "cycling-road", name: "Cycling - Road", code: "CR", category: "Cycling", venue: "The Mall", primaryColor: "#8e44ad", secondaryColor: "#9b59b6", accentColor: "#f1c40f" },
  { id: "cycling-track", name: "Cycling - Track", code: "CT", category: "Cycling", venue: "London Velopark", primaryColor: "#2980b9", secondaryColor: "#1f618d", accentColor: "#f1c40f" },
  { id: "diving", name: "Diving", code: "DV", category: "Aquatics", venue: "Aquatics Centre", primaryColor: "#005b96", secondaryColor: "#6497b1", accentColor: "#ffd700" },
  { id: "equestrian", name: "Equestrian", code: "EQ", category: "Equestrian", venue: "Greenwich Park", primaryColor: "#4a235a", secondaryColor: "#7d3c98", accentColor: "#f1c40f" },
  { id: "fencing", name: "Fencing", code: "FE", category: "Combat", venue: "ExCeL London", primaryColor: "#2c3e50", secondaryColor: "#34495e", accentColor: "#00d2ff" },
  { id: "football", name: "Football", code: "FB", category: "Ball Sports", venue: "Wembley Stadium", primaryColor: "#1e8449", secondaryColor: "#27ae60", accentColor: "#ffffff" },
  { id: "gymnastics-artistic", name: "Gymnastics - Artistic", code: "GA", category: "Gymnastics", venue: "North Greenwich Arena", primaryColor: "#0f172a", secondaryColor: "#1e293b", accentColor: "#38bdf8" },
  { id: "gymnastics-rhythmic", name: "Gymnastics - Rhythmic", code: "GR", category: "Gymnastics", venue: "Wembley Arena", primaryColor: "#d2b4de", secondaryColor: "#bb8fce", accentColor: "#4a235a" },
  { id: "gymnastics-trampoline", name: "Gymnastics - Trampoline", code: "GT", category: "Gymnastics", venue: "North Greenwich Arena", primaryColor: "#5b2c6f", secondaryColor: "#76448a", accentColor: "#f1c40f" },
  { id: "handball", name: "Handball", code: "HB", category: "Ball Sports", venue: "Copper Box Arena", primaryColor: "#d68910", secondaryColor: "#f39c12", accentColor: "#ffffff" },
  { id: "hockey", name: "Hockey", code: "HO", category: "Ball Sports", venue: "Riverbank Arena", primaryColor: "#1f618d", secondaryColor: "#2980b9", accentColor: "#f1c40f" },
  { id: "judo", name: "Judo", code: "JU", category: "Combat", venue: "ExCeL London", primaryColor: "#212f3d", secondaryColor: "#2874a6", accentColor: "#f1c40f" },
  { id: "modern-pentathlon", name: "Modern Pentathlon", code: "MP", category: "Combined", venue: "Greenwich Park", primaryColor: "#117864", secondaryColor: "#16a085", accentColor: "#f1c40f" },
  { id: "rowing", name: "Rowing", code: "RO", category: "Water", venue: "Eton Dorney", primaryColor: "#1f618d", secondaryColor: "#2874a6", accentColor: "#ffffff" },
  { id: "sailing", name: "Sailing", code: "SA", category: "Water", venue: "Weymouth and Portland", primaryColor: "#117a65", secondaryColor: "#138d75", accentColor: "#f1c40f" },
  { id: "shooting", name: "Shooting", code: "SH", category: "Precision", venue: "Royal Artillery Barracks", primaryColor: "#78281f", secondaryColor: "#943126", accentColor: "#f1c40f" },
  { id: "synchro-swimming", name: "Synchronised Swimming", code: "SY", category: "Aquatics", venue: "Aquatics Centre", primaryColor: "#00a896", secondaryColor: "#028090", accentColor: "#f0f3f4" },
  { id: "table-tennis", name: "Table Tennis", code: "TT", category: "Racquet", venue: "ExCeL London", primaryColor: "#b9770e", secondaryColor: "#d68910", accentColor: "#ffffff" },
  { id: "taekwondo", name: "Taekwondo", code: "TK", category: "Combat", venue: "ExCeL London", primaryColor: "#922b21", secondaryColor: "#b03a2e", accentColor: "#f1c40f" },
  { id: "tennis", name: "Tennis", code: "TE", category: "Racquet", venue: "All England Club", primaryColor: "#196f3d", secondaryColor: "#229954", accentColor: "#ffffff" },
  { id: "triathlon", name: "Triathlon", code: "TR", category: "Combined", venue: "Hyde Park", primaryColor: "#0e6655", secondaryColor: "#117864", accentColor: "#f1c40f" },
  { id: "volleyball", name: "Volleyball", code: "VO", category: "Ball Sports", venue: "Earls Court Exhibition Centre", primaryColor: "#1b4f72", secondaryColor: "#21618c", accentColor: "#ffffff" },
  { id: "water-polo", name: "Water Polo", code: "WP", category: "Aquatics", venue: "Water Polo Arena", primaryColor: "#004080", secondaryColor: "#00aaff", accentColor: "#ffffff" },
  { id: "weightlifting", name: "Weightlifting", code: "WL", category: "Weightlifting", venue: "ExCeL London", primaryColor: "#6c3483", secondaryColor: "#7d3c98", accentColor: "#f1c40f" },
  { id: "wrestling", name: "Wrestling", code: "WR", category: "Combat", venue: "ExCeL London", primaryColor: "#7b241c", secondaryColor: "#922b21", accentColor: "#f1c40f" }
];

export function getSportTemplates2(sport) {
  if (!sport || !sport.code) return [];
  const key = `${sport.code.toUpperCase()}_TEMPLATES`;
  return RealTemplates[key] || [];
}
