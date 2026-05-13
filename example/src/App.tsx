import {
  ReactNativeTemplateProviders,
  SliderValueDisplayMode,
  ThemedAccordion,
  ThemedScreenWrap,
  ThemedSlider,
  ThemedSwitch,
  ThemedText,
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
        <ThemedAccordion text={'Accordion Title'}>
          <ThemedText>Accordion Content 1</ThemedText>
          <ThemedText>Accordion Content 2</ThemedText>
          <ThemedText>Accordion Content 3</ThemedText>
          <ThemedSwitch onPress={() => {}} />
          <ThemedText>Accordion Content 4</ThemedText>
          <ThemedText>Accordion Content 5</ThemedText>
          <ThemedSlider
            range={[100, 0]}
            steps={1}
            defaultValue={75}
            valueDisplayMode={SliderValueDisplayMode.Top}
            onValueChange={(value) => {
              console.log('Number Slider Value:', value);
            }}
          />
          <ThemedSlider
            range={['textM', 'textSs', 'textMBold']}
            defaultValue={'100'}
            stepIndicator={true}
            snapToStepAnimated={false}
            valueDisplayMode={SliderValueDisplayMode.Bottom}
            valueDescription={'units'}
            onValueChange={(value) => {
              console.log('String Slider Value:', value);
            }}
          />
        </ThemedAccordion>
      </ThemedScreenWrap>
    </ReactNativeTemplateProviders>
  );
}
