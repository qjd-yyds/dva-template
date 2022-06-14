import { useRef } from 'react';
// 返回最新值的hook
const useLatest = value => {
  const ref = useRef(value);
  console.log("刷新useLatest")
  ref.current = value;
  return ref;
};

export default useLatest;
