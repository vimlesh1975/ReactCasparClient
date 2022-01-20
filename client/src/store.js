import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux';

// var ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
const initialStateCanvasList = { canvasList: [{ 'pageName': 'untitled_page', 'pageValue': '' }] };
const canvasListReducer = (state = initialStateCanvasList, action) => {
    switch (action.type) {
        case 'CHANGE_CANVAS_LIST':
            return {
                ...state,
                canvasList: action.payload
            }
        default: return state
    }
}

const initialPlaylist = { playlist: [{ fileName: 'amb.mp4' }, { fileName: 'go1080p25.mp4' }, { fileName: 'anchor.png' }] };
const playlistReducer = (state = initialPlaylist, action) => {
    switch (action.type) {
        case 'CHANGE_PLAYLIST':
            return {
                ...state,
                playlist: action.payload
            }
        default: return state
    }
}
const initialCurrentFile = { currentFile: 0 };
const currentFileReducer = (state = initialCurrentFile, action) => {
    switch (action.type) {
        case 'CHANGE_CURRENT_FILE':
            return {
                ...state,
                currentFile: action.payload
            }
        default: return state
    }
}

const initialCurrentPage = { currentPage: 0 };
const currentPageReducer = (state = initialCurrentPage, action) => {
    switch (action.type) {
        case 'CHANGE_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.payload
            }
        default: return state
    }
}

const initialMedia = { media: [] };
const mediaReducer = (state = initialMedia, action) => {
    switch (action.type) {
        case 'CHANGE_MEDIA':
            return {
                ...state,
                media: action.payload
            }
        default: return state
    }
}

const initialImageName = { imageName: `http://${window.location.host}${process.env.PUBLIC_URL}/img/pine-wood-500x500.jpg` };
const imageNameReducer = (state = initialImageName, action) => {
    switch (action.type) {
        case 'CHANGE_IMAGENAME':
            return {
                ...state,
                imageName: action.payload
            }
        default: return state
    }
}

const initialOnlineImageUrl = { onlineImageUrl: 'https://fixthephoto.com/images/content/shirt-fabric-texture-471614080378.jpg' };
const onlineImageUrleReducer = (state = initialOnlineImageUrl, action) => {
    switch (action.type) {
        case 'CHANGE_ONLINEIMAGE_URL':
            return {
                ...state,
                onlineImageUrl: action.payload
            }
        default: return state
    }
}

const initialCanvas = { canvas: null };
const canvasReducer = (state = initialCanvas, action) => {
    switch (action.type) {
        case 'CHANGE_CANVAS':
            return {
                ...state,
                canvas: action.payload
            }
        default: return state
    }
}

const initialcurrentscreenSize = { currentscreenSize: 1024 };

const currentscreenSizeReducer = (state = initialcurrentscreenSize, action) => {
    switch (action.type) {
        case 'CHANGE_CURRENTSCREENSIZE':
            return {
                ...state,
                currentscreenSize: action.payload
            }
        default: return state
    }
}

const rootReducer = combineReducers({
    canvasListReducer,
    currentPageReducer,
    mediaReducer,
    imageNameReducer,
    onlineImageUrleReducer,
    canvasReducer,
    playlistReducer,
    currentFileReducer,
    currentscreenSizeReducer
})
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, thunk)))
export default store