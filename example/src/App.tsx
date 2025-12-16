import {
  ReactNativeTemplateProviders,
  SliderCurrentValueDisplayMode,
  ThemedScreenWrap,
  ThemedSlider,
  useIsDarkColorScheme,
} from '@jamadd/react-native-template-ui';
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
        insetPaddingTop={'xxxl'}
        backgroundColor={'background'}
      >
        <ThemedSlider
          range={[100, 0]}
          steps={1}
          currentValue={75}
          currentValueDisplayMode={SliderCurrentValueDisplayMode.Top}
        />
        <ThemedSlider
          range={['9', '200', '100']}
          currentValue={'100'}
          currentValueDisplayMode={SliderCurrentValueDisplayMode.Bottom}
        />
      </ThemedScreenWrap>
    </ReactNativeTemplateProviders>
  );
}
