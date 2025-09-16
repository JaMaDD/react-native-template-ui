import { darkTheme, lightTheme } from '@jamadd/react-native-template-lib';
import { createTheme } from '@shopify/restyle';

export const customLightTheme = createTheme({
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    theme: '#ff6347',
  },
});

export const customDarkTheme = createTheme({
  ...darkTheme,
  colors: {
    ...darkTheme.colors,
    theme: customLightTheme.colors.theme,
  },
});
