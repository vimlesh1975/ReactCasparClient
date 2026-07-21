export const autoAnimate1SecTheatre = (canvas) => {
    if (!window.studio || !window.sheet) return;
    
    try {
        const projectId = window.sheet.address.projectId;
        const json = JSON.parse(JSON.stringify(window.studio.createContentOfSaveFile(projectId)));
        
        const objects = canvas.getObjects();
        const sheetId = window.sheet.address.sheetId;
        
        if (!json.sheetsById) json.sheetsById = {};
        if (!json.sheetsById[sheetId]) {
            json.sheetsById[sheetId] = {
                staticObjects: {},
                sequence: { tracksByObject: {} }
            };
        }
        
        if (!json.sheetsById[sheetId].sequence) {
            json.sheetsById[sheetId].sequence = { tracksByObject: {} };
        }
        
        const seq = json.sheetsById[sheetId].sequence;
        if (!seq.tracksByObject) seq.tracksByObject = {};
        
        let objectsAnimated = 0;

        objects.forEach(obj => {
            if (!obj.id) return;
            const objectKey = obj.id.toString();
            
            if (!seq.tracksByObject[objectKey]) {
                seq.tracksByObject[objectKey] = { trackData: {}, trackIdByPropPath: {} };
            }
            
            const tracksObj = seq.tracksByObject[objectKey];
            const propertyKey = JSON.stringify(["opacity"]);
            
            // Check if opacity track already exists, if not, create it
            if (!tracksObj.trackIdByPropPath[propertyKey]) {
                const trackId = "track_" + Date.now() + Math.random().toString(36).substring(2, 9);
                tracksObj.trackIdByPropPath[propertyKey] = trackId;
                
                tracksObj.trackData[trackId] = {
                    type: "BasicKeyframedTrack",
                    keyframes: [
                        { id: "kf1_"+Date.now()+Math.random().toString(36).substring(2, 9), position: 0, value: 0, connectedRight: true, handles: [0.5, 0.5, 0.5, 0.5] },
                        { id: "kf2_"+Date.now()+Math.random().toString(36).substring(2, 9), position: 1, value: obj.opacity !== undefined ? obj.opacity : 1, connectedRight: true, handles: [0.5, 0.5, 0.5, 0.5] }
                    ]
                };
                
                objectsAnimated++;
            }
        });
        
        if (objectsAnimated === 0) {
            alert("No objects found with IDs to animate, or they are already animated.");
            return;
        }
        
        // Save everything to localStorage and reload
        localStorage.setItem("ai_temp_theatre_state", JSON.stringify(json));
        localStorage.setItem("ai_temp_canvas_state", JSON.stringify(canvas.toJSON(["id", "id_"])));
        
        console.log("Theatre.js state updated with 1-second animations. Reloading...");
        // window.location.reload(); // Temporarily disabled due to destructive state wipes
        console.warn("Reload disabled. State injection requires a more stable approach.");
    } catch (e) {
        console.error("Failed to auto-animate Theatre:", e);
        alert("Animation Injection Failed: " + e.message);
    }
};

export const restoreAiTempState = () => {
    try {
        const tempTheatreState = localStorage.getItem("ai_temp_theatre_state");
        if (tempTheatreState) {
            localStorage.removeItem("ai_temp_theatre_state");
            return JSON.parse(tempTheatreState);
        }
    } catch (e) {
        console.error("Error restoring AI theatre state", e);
    }
    return null;
};

export const restoreAiCanvasState = (canvas) => {
    try {
        const tempCanvasState = localStorage.getItem("ai_temp_canvas_state");
        if (tempCanvasState && canvas) {
            localStorage.removeItem("ai_temp_canvas_state");
            canvas.loadFromJSON(tempCanvasState, () => {
                canvas.requestRenderAll();
            });
        }
    } catch (e) {
        console.error("Error restoring AI canvas state", e);
    }
};
