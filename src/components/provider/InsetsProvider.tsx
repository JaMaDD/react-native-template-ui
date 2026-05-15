import type { FC } from 'react';
import {
  SafeAreaProvider,
  type SafeAreaProviderProps,
} from 'react-native-safe-area-context';

/**
 * A provider component that provides safe area insets throughout the component tree.
 * Wraps children with SafeAreaProvider from react-native-safe-area-context.
 * Enables components to respect device notches, status bars, and navigation bars.
 * @param props - Component props of type SafeAreaProviderProps
 * @returns JSX element providing safe area insets context
 * @example
 * <InsetsProvider>
 *   <App />
 * </InsetsProvider>
 */
const InsetsProvider: FC<SafeAreaProviderProps> = (props) => (
  <SafeAreaProvider {...props} />
);

export default InsetsProvider;
