import {
  ReactNativeTemplateProviders,
  ThemedScreenWrap,
  ThemedSwitch,
  useIsDarkColorScheme,
  type ThemedSwitchProps,
} from '@jamadd/react-native-template-ui';
import { withSpring } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { customDarkTheme, customLightTheme } from './const';

export default function App() {
  const isDarkColorScheme = useIsDarkColorScheme();

  const customEnableAnimation: ThemedSwitchProps['customEnableAnimation'] = (
    sharedVal,
    toVal,
    animationCompletedCb
  ) => {
    console.log('enable animation');
    sharedVal.set(
      withSpring(
        toVal,
        {
          duration: 300,
          dampingRatio: 0.25,
          mass: 40,
        },
        () => {
          if (animationCompletedCb) {
            scheduleOnRN(animationCompletedCb);
          }
        }
      )
    );
  };
  const customDisableAnimation: ThemedSwitchProps['customDisableAnimation'] = (
    sharedVal,
    toVal,
    animationCompletedCb
  ) => {
    console.log('disable animation');
    sharedVal.set(
      withSpring(
        toVal,
        {
          duration: 300,
          dampingRatio: 0.25,
          mass: 40,
        },
        () => {
          if (animationCompletedCb) {
            scheduleOnRN(animationCompletedCb);
          }
        }
      )
    );
  };

  return (
    <ReactNativeTemplateProviders
      theme={isDarkColorScheme ? customDarkTheme : customLightTheme}
    >
      <ThemedScreenWrap
        insetTop={true}
        insetBottom={true}
        backgroundColor={'themePri'}
      >
        <ThemedSwitch
          onPress={() => {}}
          customEnableAnimation={customEnableAnimation}
          customDisableAnimation={customDisableAnimation}
        />
      </ThemedScreenWrap>
    </ReactNativeTemplateProviders>
  );
}
