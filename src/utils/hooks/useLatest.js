import { useRef } from 'react';
// 返回最新值的hook
const useLatest = value => {
  const ref = useRef(value);
  ref.current = value;
  return ref;
};

export default useLatest;
