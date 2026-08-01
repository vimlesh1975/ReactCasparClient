/**
 * TemplateGenerator2.js (games2)
 * Clean per-image template generator engine.
 * Routes template IDs to exact sport template builders.
 */

import { generateSwimming2Fabric, generateSwimming2HTML } from './sports2/swimming2';
import { generateDiving2Fabric, generateDiving2HTML } from './sports2/diving2';
import { generateWaterPolo2Fabric, generateWaterPolo2HTML } from './sports2/waterpolo2';

/**
 * Creates Fabric.js vector graphic group for games2 templates.
 */
export async function createFabricGraphicGroup2(
  sport,
  templateType,
  customFields = {},
  customColors = {},
  effectiveTemplateId = '',
  templateName = ''
) {
  const code = (sport?.code || '').toUpperCase();
  const normId = (effectiveTemplateId || templateType || '').toUpperCase();

  // Swimming (SW) templates (SW002 Venue ID, SW003 Event Schedule, SW004 Event ID, SW005 Start List, etc.)
  if (code === 'SW' || normId.startsWith('SW')) {
    const group = await generateSwimming2Fabric(normId, customFields, customColors);
    if (group) return group;
  }

  // Diving (DV) templates (DV002 Venue ID)
  if (code === 'DV' || normId.startsWith('DV')) {
    const group = await generateDiving2Fabric(normId, customFields, customColors);
    if (group) return group;
  }

  // Water Polo (WP) templates
  if (code === 'WP' || normId.startsWith('WP')) {
    const group = await generateWaterPolo2Fabric(normId, customFields, customColors);
    if (group) return group;
  }

  return null; // Clean empty state for unbuilt templates
}

/**
 * Generates alpha-safe 1920x1080 HTML broadcast template string.
 */
export function generateBroadcastHTML2(
  sport,
  templateType,
  customFields = {},
  customColors = {},
  effectiveTemplateId = '',
  templateName = ''
) {
  const code = (sport?.code || '').toUpperCase();
  const normId = (effectiveTemplateId || templateType || '').toUpperCase();

  // Swimming (SW) templates (SW002 Venue ID, SW003 Event Schedule, SW004 Event ID, SW005 Start List, etc.)
  if (code === 'SW' || normId.startsWith('SW')) {
    const html = generateSwimming2HTML(normId, customFields, customColors);
    if (html) return html;
  }

  // Diving (DV) templates (DV002 Venue ID)
  if (code === 'DV' || normId.startsWith('DV')) {
    const html = generateDiving2HTML(normId, customFields, customColors);
    if (html) return html;
  }

  // Water Polo (WP) templates
  if (code === 'WP' || normId.startsWith('WP')) {
    const html = generateWaterPolo2HTML(normId, customFields, customColors);
    if (html) return html;
  }

  return '';
}

