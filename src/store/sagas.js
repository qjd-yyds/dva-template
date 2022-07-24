import { takeEvery, put, call } from 'redux-saga/effects';
import { getListAction } from './actions';
import { GET_SAGA_LIST } from './actionTypes';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

function* mysagas() {
  yield takeEvery(GET_SAGA_LIST, getToDoList);
}
function* getToDoList() {
  const res = yield call(axios, '/getList');
  const action = getListAction(res.data.data);
  yield put(action);
}
export default mysagas;
