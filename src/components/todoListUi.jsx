import React from 'react';
import { Input, Button, List } from 'antd';
export default function todoListUi({ state, handleInput, submit, delItem }) {
  return (
    <div>
      <Input value={state.defaultValue} onChange={handleInput} style={{ width: '300px' }}></Input>
      <Button onClick={submit}>提交</Button>
      <div style={{ width: '300px' }}>
        <List
          bordered
          dataSource={state.list}
          renderItem={(item, index) => (
            <List.Item>
              {item.text}
              <Button onClick={() => delItem(index)}>删除</Button>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}
