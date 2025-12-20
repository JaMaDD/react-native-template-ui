import { useDeferredValue, useEffect, useRef, useState } from 'react';

export function useTimeout() {
  const timeoutRef = useRef<number>(null);
  const clearTimeoutRef = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };
  useEffect(() => clearTimeoutRef, []);

  return { timeoutRef, clearTimeoutRef };
}

export function useInterval() {
  const intervalRef = useRef<number>(null);
  const clearIntervalRef = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  useEffect(() => clearIntervalRef, []);

  return { intervalRef, clearIntervalRef };
}

export function useDeferredState<T>(initialState?: T) {
  const [state, setState] = useState<T | undefined>(initialState);
  const deferredState = useDeferredValue(state);

  return { state, setState, deferredState };
}
