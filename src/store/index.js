import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import createSagaMiddleWare from 'redux-saga';
import mysagas from './sagas';
const sagaMiddleWare = createSagaMiddleWare();
// 增强函数
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(applyMiddleware(sagaMiddleWare));
const store = createStore(reducer, enhancers);
sagaMiddleWare.run(mysagas);
export default store;
