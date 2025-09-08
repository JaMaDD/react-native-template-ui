import { lightTheme } from '@jamadd/react-native-template-lib';
import { createTheme } from '@shopify/restyle';

export const customTheme = createTheme({
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    customColor: '#ff6347', // Example custom color
  },
});
