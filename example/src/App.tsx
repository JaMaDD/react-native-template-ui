import {
  GestureProvider,
  InsetsProvider,
  ThemedScreenWrap,
  ThemeProvider,
} from '@jamadd/react-native-template-lib';
import { customTheme } from './const';

export default function App() {
  return (
    <GestureProvider>
      <ThemeProvider theme={customTheme}>
        <InsetsProvider>
          <ThemedScreenWrap
            insetTop={true}
            insetBottom={true}
            backgroundColor={'customColor'}
          ></ThemedScreenWrap>
        </InsetsProvider>
      </ThemeProvider>
    </GestureProvider>
  );
}
