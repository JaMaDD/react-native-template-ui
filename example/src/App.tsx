import {
  ReactNativeTemplateProviders,
  SliderValueDisplayMode,
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
          defaultValue={75}
          valueDisplayMode={SliderValueDisplayMode.Top}
          onValueChange={(value) => console.log('Number Slider Value:', value)}
        />
        <ThemedSlider
          range={['textM', 'textSs', 'textMBold']}
          defaultValue={'100'}
          stepIndicator={true}
          snapToStepAnimated={false}
          valueDisplayMode={SliderValueDisplayMode.Bottom}
          valueDescription={'units'}
          onValueChange={(value) => console.log('String Slider Value:', value)}
        />
      </ThemedScreenWrap>
    </ReactNativeTemplateProviders>
  );
}
