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
  ...animal.data
};

/**
 * Returns SVG path string for a shape name, or fallback default path
 */
export function getShapePath(name) {
  if (!name) return SHAPE_REGISTRY.star || Object.values(SHAPE_REGISTRY)[0];
  const key = String(name).toLowerCase().trim();
  
  // Exact match
  if (SHAPE_REGISTRY[key]) return SHAPE_REGISTRY[key];
  
  // Partial match
  const foundKey = Object.keys(SHAPE_REGISTRY).find(k => k.toLowerCase().includes(key) || key.includes(k.toLowerCase()));
  if (foundKey) return SHAPE_REGISTRY[foundKey];

  // Return star or default
  return SHAPE_REGISTRY.star || Object.values(SHAPE_REGISTRY)[0];
}
