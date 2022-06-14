import { useEffect } from 'react';
import { isFunction } from '../utils';
import useLatest from './useLatest';
// 组件卸载时调用的函数hooks
const useUnmount = fn => {
  if (!isFunction(fn)) {
    throw new Error('useDebounce: fn is not a function');
  }

  const fnRef = useLatest(fn);

  useEffect(
    () => () => {
      fnRef.current();
    },
    []
  );
};

export default useUnmount;
