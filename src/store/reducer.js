import { CHANGE_INPUT, ADD, DEL } from './actionTypes';
// 纯函数，返回的参数完全由入参决定，和外部因素无关
const defaultState = {
  defaultValue: '写点什么东西',
  list: [
    {
      text: '测试'
    }
  ]
};
export default (state = defaultState, action) => {
  const value = state.defaultValue;
  switch (action.type) {
    case CHANGE_INPUT:
      return {
        ...state,
        defaultValue: action.value
      };
    case ADD:
      return {
        ...state,
        defaultValue: '',
        list: [...state.list, { text: value }]
      };
    case DEL:
      return {
        ...state,
        list: state.list.filter((item, index) => {
          return index !== action.value;
        })
      };
  }
  return state;
};
