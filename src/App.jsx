import React, { useState } from 'react';
import './styles/test.less';
import useThrottle from './utils/hooks/useThrottle';
let prev;
export const App = () => {
  const [num, setNum] = useState(0);
  const fn = () => {
    if (prev) {
      console.log(prev === fn);
    } else {
      prev = fn;
    }
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
