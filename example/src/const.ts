import { darkTheme, lightTheme } from '@jamadd/react-native-template-ui';
import { createTheme } from '@shopify/restyle';

export const customLightTheme = createTheme({
  ...lightTheme,
});

export const customDarkTheme = createTheme({
  ...darkTheme,
});
