import React, { useState } from 'react';
import './styles/test.less';
import { useDebounce } from './utils';
export const App = () => {
  const [num, setNum] = useState(0);
  const fn = () => {
    setNum(num + 1);
  };
  const { run } = useDebounce(fn);
  return (
    <div className='font-test'>
      <div>{num}</div>
      <button onClick={run}>+1</button>
    </div>
  );
};
