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
        paddingHorizontal={'l'}
      >
        <ThemedSlider
          range={[100, 0]}
          steps={1}
          currentValue={75}
          currentValueDisplayMode={SliderCurrentValueDisplayMode.Top}
          onValueChange={(value) => console.log('Number Slider Value:', value)}
        />
        <ThemedSlider
          range={['9', '200', '100']}
          currentValue={'100'}
          currentValueDisplayMode={SliderCurrentValueDisplayMode.Bottom}
          onValueChange={(value) => console.log('String Slider Value:', value)}
        />
      </ThemedScreenWrap>
    </ReactNativeTemplateProviders>
  );
}
