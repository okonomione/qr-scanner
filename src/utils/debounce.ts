// NOTE: the any[] here is still type-safe: we're just
// constraining the generic to be a function type and the

import {useRef, useEffect, useMemo} from 'react';

// concrete type of T will be determined at the call site
export function debounce<T extends (...args: any[]) => void>(
  callback: T,
  wait: number,
  immediate = false,
) {
  // This is a number in the browser and an object in Node.js,
  // so we'll use the ReturnType utility to cover both cases.
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function <U>(this: U, ...args: Parameters<typeof callback>) {
    // eslint-disable-next-line consistent-this
    const context = this;

    const later = () => {
      timeout = null;

      if (!immediate) {
        callback.apply(context, args);
      }
    };

    const callNow = immediate && !timeout;

    if (typeof timeout === 'number') {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);

    if (callNow) {
      callback.apply(context, args);
    }
  };
}

export const useDebounce = (callback: any) => {
  const ref = useRef<Function>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return debounce(func, 500);
  }, []);

  return debouncedCallback;
};
