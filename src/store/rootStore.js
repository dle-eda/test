import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import participantReducer from './participantReducer'
import rootSaga from '../saga'

// apply middle ware for async action
// we use saga for middle ware
// or we can use thunk

const sagaMiddleware = createSagaMiddleware()
const middleWares = [sagaMiddleware]

// create new participant reducer only
// in future, if we want more page, ie: User Management, we can create new one and add to rootReducer

const rootReducer = combineReducers({
    participantReducer
})

const store = createStore(rootReducer, compose(applyMiddleware(...middleWares)))
sagaMiddleware.run(rootSaga)

export default store