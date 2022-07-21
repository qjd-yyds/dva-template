import React, { useState } from 'react';
import store from '~/store';
import { Input, Button, List } from 'antd';
export default function Home() {
  const state = store.getState();
  const [num, setNum] = useState(1);
  const storeChange = () => {
    setNum(num + 1);
  };
  const submit = () => {
    store.dispatch({ type: 'ADD' });
  };
  store.subscribe(storeChange);

  const handleInput = e => {
    const action = {
      type: 'changeInput',
      value: e.target.value
    };
    store.dispatch(action);
  };
  return (
    <div>
      <Input value={state.defaultValue} onChange={handleInput} style={{ width: '300px' }}></Input>
      <Button onClick={submit}>提交</Button>
      <div style={{ width: '300px' }}>
        <List bordered dataSource={state.list} renderItem={item => <List.Item>{item.text}</List.Item>} />
      </div>
    </div>
  );
}
