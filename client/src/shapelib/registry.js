import { basic } from './basic.js';
import { arrow } from './arrow.js';
import { symbol } from './symbol.js';
import { game } from './game.js';
import { dialog_balloon } from './dialog_balloon.js';
import { electronics } from './electronics.js';
import { flowchart } from './flowchart.js';
import { math } from './math.js';
import { misc } from './misc.js';
import { music } from './music.js';
import { object } from './object.js';
import { raphael_1 } from './raphael_1.js';
import { raphael_2 } from './raphael_2.js';
import { animal } from './animal.js';

export const SHAPE_CATEGORIES = {
  basic: Object.keys(basic.data || {}),
  arrow: Object.keys(arrow.data || {}),
  symbol: Object.keys(symbol.data || {}),
  game: Object.keys(game.data || {}),
  dialog_balloon: Object.keys(dialog_balloon.data || {}),
  electronics: Object.keys(electronics.data || {}),
  flowchart: Object.keys(flowchart.data || {}),
  math: Object.keys(math.data || {}),
  misc: Object.keys(misc.data || {}),
  music: Object.keys(music.data || {}),
  object: Object.keys(object.data || {}),
  raphael_1: Object.keys(raphael_1.data || {}),
  raphael_2: Object.keys(raphael_2.data || {}),
  animal: Object.keys(animal.data || {})
};

// Combined dictionary of all SVG shape paths by name
export const SHAPE_REGISTRY = {
  ...basic.data,
  ...arrow.data,
  ...symbol.data,
  ...game.data,
  ...dialog_balloon.data,
  ...electronics.data,
  ...flowchart.data,
  ...math.data,
  ...misc.data,
  ...music.data,
  ...object.data,
  ...raphael_1.data,
  ...raphael_2.data,
  ...animal.data,
  // Key aliases for simple queries
  star: basic.data?.star_points_5 || raphael_1.data?.raph_star,
  user: raphael_1.data?.raph_user || misc.data?.man,
  users: raphael_1.data?.raph_users || misc.data?.man,
  profile: raphael_1.data?.raph_user || misc.data?.man,
  avatar: raphael_1.data?.raph_user || misc.data?.man,
  person: raphael_1.data?.raph_user || misc.data?.man,
  people: raphael_1.data?.raph_users || misc.data?.man,
  human: raphael_1.data?.raph_user || misc.data?.man,
  man: misc.data?.man || raphael_2.data?.raph_man,
  woman: misc.data?.woman || raphael_2.data?.raph_woman,
  child: raphael_1.data?.raph_user || misc.data?.man,
  anchor: raphael_1.data?.raph_user || misc.data?.man,
  player: raphael_1.data?.raph_user || misc.data?.man,
  balloon: basic.data?.dialog_balloon_1,
  dialog: basic.data?.dialog_balloon_1
};

const STOP_WORDS = new Set(["add", "create", "draw", "make", "generate", "put", "show", "insert", "new", "the", "from", "path", "shape", "icon", "svg", "please", "canvas", "object"]);

/**
 * Returns SVG path string for a shape name, or fallback default path
 */
export function getShapePath(name) {
  if (!name) return SHAPE_REGISTRY.person || SHAPE_REGISTRY.star || Object.values(SHAPE_REGISTRY)[0];
  const key = String(name).toLowerCase().trim();
  
  // 1. Exact match
  if (SHAPE_REGISTRY[key]) return SHAPE_REGISTRY[key];
  
  // 2. Check individual words in query for an exact key match (ignoring stop words)
  const words = key.split(/[\s_-]+/).filter(w => !STOP_WORDS.has(w));
  for (const word of words) {
    if (word.length >= 3 && SHAPE_REGISTRY[word]) {
      return SHAPE_REGISTRY[word];
    }
  }

  // 3. Substring match on registry keys (registry key contains full query)
  if (key.length >= 3) {
    const foundKey = Object.keys(SHAPE_REGISTRY).find(k => k.toLowerCase().includes(key));
    if (foundKey) return SHAPE_REGISTRY[foundKey];
  }

  // 4. Substring match for individual words (ignoring stop words)
  for (const word of words) {
    if (word.length >= 3) {
      const match = Object.keys(SHAPE_REGISTRY).find(k => k.toLowerCase().includes(word));
      if (match) return SHAPE_REGISTRY[match];
    }
  }

  // 5. Check if query explicitly contained person keywords as whole words
  if (/\b(person|people|man|woman|child|human|user|profile|avatar|guy|girl)\b/i.test(key)) {
    return SHAPE_REGISTRY.person;
  }

  // Fallback to star
  return SHAPE_REGISTRY.star || Object.values(SHAPE_REGISTRY)[0];
}
