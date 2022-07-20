import React, { useState } from 'react';
import { Input, Button, List } from 'antd';
export default function Home() {
  const [list, setList] = useState([
    {
      text: '测试'
    }
  ]);
  return (
    <div>
      <Input style={{ width: '300px' }}></Input>
      <Button>提交</Button>
      <div style={{ width: '300px' }}>
        <List bordered dataSource={list} renderItem={item => <List.Item>{item.text}</List.Item>} />
      </div>
    </div>
  );
}
