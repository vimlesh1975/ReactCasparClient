import { applyMiddleware } from 'redux'
import { legacy_createStore as createStore } from 'redux'
// import { configureStore} from  '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux';

const initialStateCanvasList = { canvasList: [{ pageName: 'untitled_page', pageValue: '', animation: '', jsfilename: 'main', cssfilename: 'main' }] };
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

const initialCanvaszoom = { zoom: 1 };
const canvaszoomReducer = (state = initialCanvaszoom, action) => {
    switch (action.type) {
        case 'CHANGE_CANVAS_ZOOM':
            return {
                ...state,
                zoom: action.payload
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


const initialjsfilename = { jsfilename: 'main' };
const jsfilenameReducer = (state = initialjsfilename, action) => {
    switch (action.type) {
        case 'CHANGE_JSFILENAME':
            return {
                ...state,
                jsfilename: action.payload
            }
        default: return state
    }
}

const initialcssfilename = { cssfilename: 'main' };
const cssfilenameReducer = (state = initialcssfilename, action) => {
    switch (action.type) {
        case 'CHANGE_CSSFILENAME':
            return {
                ...state,
                cssfilename: action.payload
            }
        default: return state
    }
}


const initialjsfilename2 = { jsfilename2: 'main2' };
const jsfilenameReducer2 = (state = initialjsfilename2, action) => {
    switch (action.type) {
        case 'CHANGE_JSFILENAME2':
            return {
                ...state,
                jsfilename2: action.payload
            }
        default: return state
    }
}

const initialcssfilename2 = { cssfilename2: 'main2' };
const cssfilenameReducer2 = (state = initialcssfilename2, action) => {
    switch (action.type) {
        case 'CHANGE_CSSFILENAME2':
            return {
                ...state,
                cssfilename2: action.payload
            }
        default: return state
    }
}



const initialPath1 = { path1: [] };
const path1Reducer = (state = initialPath1, action) => {
    switch (action.type) {
        case 'CHANGE_PATH1':
            return {
                ...state,
                path1: action.payload
            }
        default: return state
    }
}

const initialPannelEnable = { pannelEnable: true };
const pannelEnableReducer = (state = initialPannelEnable, action) => {
    switch (action.type) {
        case 'CHANGE_PANNEL_ENABLED':
            return {
                ...state,
                pannelEnable: action.payload
            }
        default: return state
    }
}

const initialKf = { kf: Array.from(Array(200).keys()).map(() => [20, 60, 260, 300]) };
const kfReducer = (state = initialKf, action) => {
    switch (action.type) {
        case 'CHANGE_KF':
            return {
                ...state,
                kf: action.payload
            }
        default: return state
    }
}

const initialxpositions = {
    xpositions: Array.from(Array(200).keys()).map(() => ({
        initialx: 0,
        finalx: 100,
        finalx2: 150,
        outx: 700,

        initialy: 500,
        finaly: 250,
        finaly2: 250,
        outy: 400,

        initialScaleX: 1,
        finalScaleX: 1,
        finalScaleX2: 1,
        outScaleX: 1,

        initialScaleY: 1,
        finalScaleY: 1,
        finalScaleY2: 1,
        outScaleY: 1,

        initialAngle: 0,
        finalAngle: 0,
        finalAngle2: 0,
        outAngle: 0,

        finalOpacity: 1,
        finalOpacity2: 1,

        initialMatrix: 'matrix(1,0,0,1,0,500)',
        finalMatrix: 'matrix(1,0,0,1,100,250)',
        finalMatrix2: 'matrix(1,0,0,1,150,250)',
        outMatrix: 'matrix(1,0,0,1,700,400)',
        loop: 1
    }))
};

const xpositionsReducer = (state = initialxpositions, action) => {
    switch (action.type) {
        case 'CHANGE_XPOSITIONS':
            return {
                ...state,
                xpositions: action.payload
            }
        default: return state
    }
}

const initialSpeechRecognition = { currentLanguage: 'en-US', continuous1: false };
const speechRecognitionReducer = (state = initialSpeechRecognition, action) => {
    switch (action.type) {
        case 'CHANGE_CURRENTLANGUAGE':
            return {
                ...state,
                currentLanguage: action.payload
            }
        case 'CHANGE_CONTINUOUS1':
            return {
                ...state,
                continuous1: action.payload
            }
        default: return state
    }
}

const initialClientId = { clientId: '1234' };
const clientIdReducer = (state = initialClientId, action) => {
    switch (action.type) {
        case 'CHANGE_CLIENTID':
            return {
                ...state,
                clientId: action.payload
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
    canvaszoomReducer,
    playlistReducer,
    currentFileReducer,
    currentscreenSizeReducer,
    path1Reducer,
    jsfilenameReducer,
    cssfilenameReducer,
    jsfilenameReducer2,
    cssfilenameReducer2,
    pannelEnableReducer,
    kfReducer,
    xpositionsReducer,
    speechRecognitionReducer,
    clientIdReducer
})
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, thunk)))
export default store