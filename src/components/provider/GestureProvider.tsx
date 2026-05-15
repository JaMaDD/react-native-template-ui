import type { FC } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import type { GestureHandlerRootViewProps } from 'react-native-gesture-handler/lib/typescript/components/GestureHandlerRootView';

/**
 * A provider component that enables gesture handling throughout the component tree.
 * Wraps children with GestureHandlerRootView from react-native-gesture-handler.
 * Required for gesture-based interactions in ActionSheet, Slider, and other gesture-enabled components.
 * @param props - Component props of type GestureHandlerRootViewProps
 * @returns JSX element providing gesture handling context
 * @example
 * <GestureProvider>
 *   <App />
 * </GestureProvider>
 */
const GestureProvider: FC<GestureHandlerRootViewProps> = (props) => (
  <GestureHandlerRootView {...props} />
);

export default GestureProvider;
