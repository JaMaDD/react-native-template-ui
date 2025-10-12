import { darkTheme, lightTheme } from '@jamadd/react-native-template-ui';
import { createTheme } from '@shopify/restyle';

export const customLightTheme = createTheme({
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    themePri: '#ff6347',
    themeSec: '#4caf50',
    themePriT: '#ff634780',
  },
});

export const customDarkTheme = createTheme({
  ...darkTheme,
  colors: {
    ...darkTheme.colors,
    themePri: customLightTheme.colors.themePri,
    themeSec: customLightTheme.colors.themeSec,
    themePriT: customLightTheme.colors.themePriT,
  },
});
