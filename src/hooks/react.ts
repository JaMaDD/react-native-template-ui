import { useDeferredValue, useEffect, useRef, useState } from 'react';

/**
 * Hook to manage a timeout with automatic cleanup.
 * @returns Object containing timeoutRef and clearTimeoutRef function
 * @returns timeoutRef - Ref to store the timeout ID
 * @returns clearTimeoutRef - Function to clear the timeout
 * @example
 * const { timeoutRef, clearTimeoutRef } = useTimeout();
 * timeoutRef.current = setTimeout(() => {
 *   console.log('Delayed action');
 * }, 1000);
 * // Cleanup happens automatically on unmount
 */
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

/**
 * Hook to manage an interval with automatic cleanup.
 * @returns Object containing intervalRef and clearIntervalRef function
 * @returns intervalRef - Ref to store the interval ID
 * @returns clearIntervalRef - Function to clear the interval
 * @example
 * const { intervalRef, clearIntervalRef } = useInterval();
 * intervalRef.current = setInterval(() => {
 *   console.log('Repeating action');
 * }, 1000);
 * // Cleanup happens automatically on unmount
 */
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

/**
 * Hook to manage state with a deferred version for performance optimization.
 * @template T - The type of the state value
 * @param initialState - Initial state value
 * @returns Object containing state, setState, and deferredState
 * @returns state - The current state value
 * @returns setState - Function to update the state
 * @returns deferredState - Deferred version of state that updates after urgent updates
 * @example
 * const { state, setState, deferredState } = useDeferredState('');
 * // Use state for input control, deferredState for expensive operations
 * <TextInput value={state} onChangeText={setState} />
 * <ExpensiveList filter={deferredState} />
 */
export function useDeferredState<T>(initialState?: T) {
  const [state, setState] = useState<T | undefined>(initialState);
  const deferredState = useDeferredValue(state);

  return { state, setState, deferredState };
}
