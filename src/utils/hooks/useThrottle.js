import { throttle } from 'lodash';
import { useMemo } from 'react';
import { isFunction } from '../utils';
import useLatest from './useLatest';
import useUnmount from './useUnmount';
function useThrottle(fn, options = {}) {
  if (!isFunction(fn)) {
    throw new Error('useThrottle: fn is not a function');
  }
  const fnRef = useLatest(fn);
  const { wait = 1000, trailing = true, leading = true } = options;
  const throttled = useMemo(() => {
    return throttle(
      (...args) => {
        fnRef.current(...args);
      },
      wait,
      {
        trailing, // 节流前调用
        leading // 节流后调用
      }
    );
  }, []);
  // 组件销毁时调用，防止产生副作用
  useUnmount(() => {
    throttled.cancel();
  });
  return {
    run: throttled,
    cancel: throttled.cancel,
    flush: throttled.flush
  };
}
export default useThrottle;
