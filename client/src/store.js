import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux';

var ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
const initialStateCanvasList ={ canvasList:[{ 'pageName': ss + '_pageName', 'pageValue': '' }]};
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

const initialCurrentPage ={currentPage:0};
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
const initialMedia ={media:[]};
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

const rootReducer = combineReducers({
    canvasListReducer,
    currentPageReducer,
    mediaReducer
})
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, thunk)))
export default store