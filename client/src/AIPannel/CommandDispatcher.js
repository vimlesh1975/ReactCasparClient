import { createRect, createCircle, createTriangle, createTextBox, gradient, gradient2, resizeTextWidth } from '../common';

const colorToHex = (color) => {
    if (!color || color === 'gradient' || color === 'gradient2') return color;
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.fillStyle = color;
    return ctx.fillStyle;
};

const applyOptions = (obj, options = {}) => {
    if (options.fill) {
        if (options.fill === 'gradient') obj.set('fill', gradient);
        else if (options.fill === 'gradient2') obj.set('fill', gradient2());
        else obj.set('fill', colorToHex(options.fill));
    }
    if (options.left !== undefined && options.left !== null) obj.set('left', options.left);
    if (options.top !== undefined && options.top !== null) obj.set('top', options.top);
    if (options.width !== undefined && options.width !== null) obj.set('width', options.width);
    if (options.height !== undefined && options.height !== null) obj.set('height', options.height);
    if (options.radius !== undefined && options.radius !== null) obj.set('radius', options.radius);
    if (options.opacity !== undefined && options.opacity !== null) obj.set('opacity', options.opacity);
    if (options.stroke !== undefined && options.stroke !== null) obj.set('stroke', colorToHex(options.stroke));
    if (options.strokeWidth !== undefined && options.strokeWidth !== null) obj.set('strokeWidth', options.strokeWidth);
    if (options.angle !== undefined && options.angle !== null) obj.set('angle', options.angle);
    if (options.rx !== undefined && options.rx !== null) obj.set('rx', options.rx);
    if (options.ry !== undefined && options.ry !== null) obj.set('ry', options.ry);
    if (options.originX !== undefined && options.originX !== null) obj.set('originX', options.originX);
    if (options.originY !== undefined && options.originY !== null) obj.set('originY', options.originY);

    const sanitizeString = (str) => String(str).replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');

    if (options.id !== undefined && options.id !== null) obj.set('id_', sanitizeString(options.id));
    if (options.id_ !== undefined && options.id_ !== null) obj.set('id_', sanitizeString(options.id_));
    if (options.className !== undefined && options.className !== null) obj.set('className', sanitizeString(options.className));
    if (options.class !== undefined && options.class !== null) obj.set('className', sanitizeString(options.class));

    if (obj.id) obj.set('id', sanitizeString(obj.id));
    if (obj.class) obj.set('class', sanitizeString(obj.class));
    if (obj.id_) obj.set('id_', sanitizeString(obj.id_));
    if (obj.className) obj.set('className', sanitizeString(obj.className));

    if (options.fontFamily !== undefined && options.fontFamily !== null) obj.set('fontFamily', options.fontFamily);
    if (options.fontWeight !== undefined && options.fontWeight !== null) obj.set('fontWeight', options.fontWeight);
    if (options.fontStyle !== undefined && options.fontStyle !== null) obj.set('fontStyle', options.fontStyle);
    if (options.textAlign !== undefined && options.textAlign !== null) obj.set('textAlign', options.textAlign);

    if (options.fontSize !== undefined && options.fontSize !== null) {
        if (obj.type === 'textbox' || obj.type === 'i-text' || obj.type === 'text') {
            obj.set('fontSize', options.fontSize);
        } else if (obj.type === 'circle') {
            obj.set('radius', options.fontSize);
        } else {
            obj.set({ width: options.fontSize, height: options.fontSize });
        }
    }
    obj.setCoords();
};

const getTargetObjects = (canvas, cmd) => {
    let targets = canvas.getObjects();
    let hasFilter = false;

    if (cmd.id_) {
        targets = targets.filter(o => o.id_ === cmd.id_ || o.id === cmd.id_);
        hasFilter = true;
    }
    
    if (cmd.type) {
        targets = targets.filter(o => o.type === cmd.type);
        hasFilter = true;
    }

    if (!hasFilter) {
        const active = canvas.getActiveObject();
        return active ? [active] : [];
    }

    return targets;
};

export const dispatchCommand = (canvas, cmd) => {
    switch (cmd.action) {
        case 'createRect':
            createRect(canvas);
            const rect = canvas.getActiveObject();
            if (rect) applyOptions(rect, cmd.options);
            break;
        case 'createCircle':
            createCircle(canvas);
            const circle = canvas.getActiveObject();
            if (circle) applyOptions(circle, cmd.options);
            break;
        case 'createTriangle':
            createTriangle(canvas);
            const triangle = canvas.getActiveObject();
            if (triangle) applyOptions(triangle, cmd.options);
            break;
        case 'createTextBox':
            createTextBox(canvas, cmd.text || 'Text');
            const textbox = canvas.getActiveObject();
            if (textbox) applyOptions(textbox, cmd.options);
            break;
        case 'modify':
            getTargetObjects(canvas, cmd).forEach(obj => {
                if (cmd.options && cmd.options.text !== undefined && (obj.type === 'textbox' || obj.type === 'i-text' || obj.type === 'text')) {
                    obj.set('text', cmd.options.text);
                }
                applyOptions(obj, cmd.options);
            });
            break;
        case 'delete':
            getTargetObjects(canvas, cmd).forEach(obj => canvas.remove(obj));
            break;
        case 'autoFitAll':
            const objects = canvas.getObjects();
            let maxArea = 0;
            let bgRect = null;
            objects.filter(o => o.type === 'rect').forEach(r => {
                const area = r.width * r.height;
                if (area > maxArea) { maxArea = area; bgRect = r; }
            });

            if (bgRect) {
                const textObjects = objects.filter(o => o.type === 'textbox' || o.type === 'i-text' || o.type === 'text');

                let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
                textObjects.forEach(o => {
                    const br = o.getBoundingRect();
                    if (br.left < minX) minX = br.left;
                    if (br.top < minY) minY = br.top;
                    if (br.left + br.width > maxX) maxX = br.left + br.width;
                    if (br.top + br.height > maxY) maxY = br.top + br.height;
                });
                const padding = cmd.padding || 30;
                if (minX !== Infinity) {
                    bgRect.set({
                        left: minX - padding,
                        top: minY - padding,
                        width: (maxX - minX) + (padding * 2),
                        height: (maxY - minY) + (padding * 2)
                    });
                    bgRect.setCoords();
                }
            }
            break;
        default:
            console.warn('Unknown command action:', cmd.action);
    }
};

export const postProcessCommands = (canvas) => {
    const allTextObjects = canvas.getObjects().filter(o => o.type === 'textbox' || o.type === 'i-text' || o.type === 'text');
    if (allTextObjects.length > 0) {
        resizeTextWidth(canvas, allTextObjects);
        allTextObjects.forEach(o => o.setCoords());
    }
    canvas.requestRenderAll();
};
