import React, { useState } from 'react';
import './styles/test.less';
import { useThrottle } from './utils';
export const App = () => {
  const [num, setNum] = useState(0);
  const fn = () => {
    console.log(num);
    setNum(num + 1);
  };
  const { run } = useThrottle(fn);
  return (
    <div className='font-test'>
      <div>{num}</div>
      <button onClick={run}>+1</button>
    </div>
  );
};
