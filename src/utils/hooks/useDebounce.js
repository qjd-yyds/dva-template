import { debounce } from 'lodash';
import { useMemo } from 'react';
import { isFunction } from '../utils';
import useLatest from './useLatest';
import useUnmount from './useUnmount';
function useDebounce(fn, options = {}) {
  if (!isFunction(fn)) {
    throw new Error('useDebounce: fn is not a function');
  }
  const fnRef = useLatest(fn);
  const { wait = 1000, trailing = false, leading = true } = options;
  // 使用useMemo缓存执行的函数
  const debounced = useMemo(() => {
    return debounce(
      function callback(...args) {
        fnRef.current(...args);
      },
      wait,
      {
        trailing, // 先等待后调用
        leading // 先调用后等待
      }
    );
  }, []);
  // 组件销毁时调用，防止产生副作用
  useUnmount(() => {
    debounced.cancel();
  });
  return {
    run: debounced,
    cancel: debounced.cancel,
    flush: debounced.flush
  };
}
export default useDebounce;
