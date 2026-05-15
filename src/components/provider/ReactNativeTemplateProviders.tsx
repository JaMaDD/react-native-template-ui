import type { FC } from 'react';
import type { ReactNativeTemplateProvidersProps } from '../../types/provider';
import GestureProvider from './GestureProvider';
import InsetsProvider from './InsetsProvider';
import ThemeProvider from './ThemeProvider';

/**
 * A composite provider component that combines all required providers for the template UI library.
 * Wraps children with GestureProvider, InsetsProvider, and ThemeProvider in the correct order.
 * Simplifies app setup by providing a single provider that includes all necessary context.
 * @param props - Component props of type ReactNativeTemplateProvidersProps
 * @returns JSX element with all providers configured
 * @example
 * <ReactNativeTemplateProviders theme={myTheme}>
 *   <App />
 * </ReactNativeTemplateProviders>
 */
const ReactNativeTemplateProviders: FC<ReactNativeTemplateProvidersProps> = ({
  theme,
  children,
}) => {
  return (
    <GestureProvider>
      <InsetsProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </InsetsProvider>
    </GestureProvider>
  );
};

export default ReactNativeTemplateProviders;
