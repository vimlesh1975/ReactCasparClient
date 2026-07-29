/**
 * TemplateGenerator2.js (games2)
 * Clean per-image template generator engine.
 * Routes template IDs to exact sport template builders.
 */

import { generateSwimming2Fabric, generateSwimming2HTML } from './sports2/swimming2';

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

  // Swimming (SW) templates (SW002 Venue ID, SW003 Event Schedule, SW004 Event ID, etc.)
  if (code === 'SW' || normId.includes('SW002') || normId.includes('SW003') || normId.includes('SW004') || normId.includes('SW102') || normId.includes('SW103') || normId.includes('SW104')) {
    const group = await generateSwimming2Fabric(normId, customFields, customColors);
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

  // Swimming (SW) templates (SW002 Venue ID, SW003 Event Schedule, SW004 Event ID, etc.)
  if (code === 'SW' || normId.includes('SW002') || normId.includes('SW003') || normId.includes('SW004') || normId.includes('SW102') || normId.includes('SW103') || normId.includes('SW104')) {
    const html = generateSwimming2HTML(normId, customFields, customColors);
    if (html) return html;
  }

  return '';
}
