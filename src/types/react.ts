import type { Dispatch, SetStateAction } from 'react';
import type { LayoutChangeEvent } from 'react-native';

/**
 * Type for setTimeout return value.
 *
 * Used for storing and managing timeout IDs that can be cleared with clearTimeout.
 */
export type Timeout = ReturnType<typeof setTimeout>;

/**
 * Type for React setState function.
 *
 * Generic setter function returned by useState hook, supporting both direct values
 * and updater functions.
 *
 * @example
 * ```tsx
 * const [count, setCount]: [number, SetState<number>] = useState(0);
 * setCount(5); // Direct value
 * setCount(prev => prev + 1); // Updater function
 * ```
 */
export type SetState<T> = Dispatch<SetStateAction<T>>;

/**
 * Callback handler for layout change events.
 *
 * Invoked when a component's layout is measured or changes.
 * Provides layout information like position and dimensions.
 *
 * @example
 * ```tsx
 * const handleLayout: OnLayout = (event) => {
 *   const { width, height } = event.nativeEvent.layout;
 *   console.log(`Size: ${width}x${height}`);
 * };
 * ```
 */
export type OnLayout = (event: LayoutChangeEvent) => void;
