import { CHANGE_INPUT, DEL, ADD } from './actionTypes';

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
