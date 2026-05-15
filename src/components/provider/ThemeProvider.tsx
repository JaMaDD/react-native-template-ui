import { ThemeProvider as RestyleThemeProvider } from '@shopify/restyle';
import type { ComponentProps, FC } from 'react';

/**
 * A provider component that supplies theme configuration to all themed components.
 * Wraps children with ThemeProvider from @shopify/restyle for theme context.
 * Enables dynamic theming and provides typed access to theme tokens throughout the app.
 * @param props - Component props of type ComponentProps<typeof RestyleThemeProvider>
 * @returns JSX element providing theme context
 * @example
 * <ThemeProvider theme={lightTheme}>
 *   <App />
 * </ThemeProvider>
 */
const ThemeProvider: FC<ComponentProps<typeof RestyleThemeProvider>> = (
  props
) => <RestyleThemeProvider {...props} />;

export default ThemeProvider;
