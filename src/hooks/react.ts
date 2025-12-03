import { useEffect, useRef } from 'react';

export function useTimeout() {
  const timeoutRef = useRef<number>(null);
  const clearTimeoutRef = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
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
    }
  };
  useEffect(() => clearIntervalRef, []);

  return { intervalRef, clearIntervalRef };
}
