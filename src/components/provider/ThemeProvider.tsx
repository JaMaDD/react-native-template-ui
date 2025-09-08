import { ThemeProvider as RestyleThemeProvider } from '@shopify/restyle';
import type { ComponentProps, FC } from 'react';

const ThemeProvider: FC<ComponentProps<typeof RestyleThemeProvider>> = (
  props
) => <RestyleThemeProvider {...props} />;

export default ThemeProvider;
