import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux';


const initialState = {
    element1: []
}
const reducer1 = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_ELEMENT': return {
            ...state,
            element1: [...state.element1, action.payload]
        }

        default: return state
    }
}

const initialStateOneLiner = {
    onelinerData: [{ id: 1, name: 'Vimlesh Kumar Tanti 1' }, { id: 2, name: 'Vimlesh Kumar Tanti 2' }, { id: 3, name: 'Vimlesh Kumar Tanti 3' }]
}
const oneLinerReducer = (state = initialStateOneLiner, action) => {
    switch (action.type) {
        case 'UPDATE_ONELINER':
            const updatedOneLinerData = state.onelinerData.map((val) => {
                return val.id === parseInt(action.payload.id) ? { ...val, name: action.payload.name } : val;
            });
            return {
                ...state,

                onelinerData: [...updatedOneLinerData]

            }
        default: return state
    }
}


const initialStateStyle1 = {
    style1: {
        color: 'rgb(255, 255, 255)',
        backgroundColor: 'rgb(80, 3, 124)'
    }
}
const style1Reducer = (state = initialStateStyle1, action) => {
    switch (action.type) {
        case 'CHANGE_STYLE1':
            return {
                ...state,

                style1: { ...state.style1, ...action.payload }

            }
        default: return state
    }
}

const initialStateCanvas1 = { aa:''}


const canvas1Reducer = (state = initialStateCanvas1, action) => {
    switch (action.type) {
        case 'CHANGE_CANVAS1':
            return {
                ...state,
                aa: action.payload
            }
        default: return state
    }
}


const initialStatetextEditor1 = { aa: 'Vimlesh Kumar' }

const textEditor1Reducer = (state = initialStatetextEditor1, action) => {
    switch (action.type) {
        case 'CHANGE_TEXT1':
            return {
                ...state,
                aa: action.payload
            }
        default: return state
    }
}

const rootReducer = combineReducers({
    reducer1,
    oneLinerReducer,
    style1Reducer,
    canvas1Reducer,
    textEditor1Reducer

})
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, thunk)))
export default store