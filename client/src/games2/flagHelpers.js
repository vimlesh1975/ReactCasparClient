/**
 * Flag helper utilities for games2 templates.
 * Extracted from GamesAIPanel/TemplateGenerator.js
 */

import * as fabric from 'fabric';
import { generateUniqueId } from '../common';
import { getFlagBase64 } from './flagsBase64';

export async function createFabricFlagObject(nocCode, options = {}) {
  const base64 = getFlagBase64(nocCode);
  if (!base64) return null;
  try {
    const img = await fabric.Image.fromURL(base64);
    img.set({
      id: generateUniqueId({ type: 'flagImage' }),
      name: `Flag ${nocCode || ''}`,
      scaleX: 0.35,
      scaleY: 0.35,
      ...options
    });
    return img;
  } catch (err) {
    console.error('Error creating flag object for NOC:', nocCode, err);
    return null;
  }
}

export function getFlagImgHtml(nocCode, extraStyle = '') {
  const base64 = getFlagBase64(nocCode);
  if (!base64) return '';
  return `<img src="${base64}" alt="${nocCode || ''}" style="height: 26px; width: auto; vertical-align: middle; ${extraStyle}" />`;
}
