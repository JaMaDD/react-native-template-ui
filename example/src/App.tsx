import {
  ReactNativeTemplateProviders,
  ThemedScreenWrap,
  useIsDarkColorScheme,
} from '@jamadd/react-native-template-lib';
import { customDarkTheme, customLightTheme } from './const';

export default function App() {
  const isDarkColorScheme = useIsDarkColorScheme();

  return (
    <ReactNativeTemplateProviders
      theme={isDarkColorScheme ? customDarkTheme : customLightTheme}
    >
      <ThemedScreenWrap
        insetTop={true}
        insetBottom={true}
        backgroundColor={'theme'}
      ></ThemedScreenWrap>
    </ReactNativeTemplateProviders>
  );
}
