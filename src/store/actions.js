import { CHANGE_INPUT, DEL, ADD, GET_LIST, GET_SAGA_LIST } from './actionTypes';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

export const changeInputAction = value => {
  return {
    type: CHANGE_INPUT,
    value
  };
};

export const delItemAction = value => {
  return {
    type: DEL,
    value
  };
};
export const addItemAction = () => {
  return {
    type: ADD
  };
};
export const getListAction = list => {
  return {
    type: GET_LIST,
    list
  };
};
export const getToDoList = () => {
  return dispatch => {
    axios('/getList')
      .then(res => {
        dispatch(getListAction(res.data.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const getToDoSagaList = () => ({
  type: GET_SAGA_LIST
});
