const defaultState = {
  defaultValue: '写点什么东西',
  list: [
    {
      text: '测试'
    }
  ]
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'changeInput':
      return {
        ...state,
        defaultValue: action.value
      };
    case 'ADD':
      const value = state.defaultValue;
      return {
        ...state,
        defaultValue: '',
        list: [...state.list, { text: value }]
      };
  }
  return state;
};
