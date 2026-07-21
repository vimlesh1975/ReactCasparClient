export const extractTemplate = (canvas) => {
    if (!canvas) return null;

    const objects = canvas.getObjects();
    const templateData = {
        name: `AI_Template_${Date.now()}`,
        resolution: { width: 1920, height: 1080 },
        backgroundObjects: [],
        fields: []
    };

    objects.forEach((obj, index) => {
        const serializedObj = obj.toObject(['id', 'id_', 'className']);
        
        // If it's a text object, extract it as a field
        if (obj.type === 'textbox' || obj.type === 'i-text' || obj.type === 'text') {
            const fieldId = obj.id_ || obj.id || `field_${index}`;
            templateData.fields.push({
                id: fieldId,
                type: 'text',
                label: obj.text || `Text Field ${index + 1}`,
                default_value: obj.text || '',
                objectRef: serializedObj
            });
        } else {
            // Otherwise, it's a background/static object
            templateData.backgroundObjects.push(serializedObj);
        }
    });

    return templateData;
};

export const saveTemplateFile = (templateData) => {
    if (!templateData) return;
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(templateData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", templateData.name + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
};
