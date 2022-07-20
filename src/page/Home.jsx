import React from 'react';
import store from '~/store';
import { Input, Button, List } from 'antd';
export default function Home() {
  const state = store.getState()
  return (
    <div>
      <Input placeholder={state.defaultVale} style={{ width: '300px' }}></Input>
      <Button>提交</Button>
      <div style={{ width: '300px' }}>
        <List bordered dataSource={state.list} renderItem={item => <List.Item>{item.text}</List.Item>} />
      </div>
    </div>
  );
}
