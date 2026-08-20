import {
  AlertProvider,
  ContextMenu,
  ReactNativeTemplateProviders,
  ThemedScreenWrap,
  ThemedScrollView,
  ThemedText,
  useIsDarkColorScheme,
} from '@jamadd/react-native-template-ui';
import { customDarkTheme, customLightTheme } from './const';
import AlertButton from './components/AlertButton';

export default function App() {
  const isDarkColorScheme = useIsDarkColorScheme();

  return (
    <ReactNativeTemplateProviders
      theme={isDarkColorScheme ? customDarkTheme : customLightTheme}
    >
      <AlertProvider>
        <ThemedScreenWrap
          insetTop={true}
          insetBottom={true}
          insetPaddingTop={'xxxl'}
          backgroundColor={'background'}
          paddingHorizontal={'l'}
        >
          <ThemedScrollView>
            <AlertButton />
            <ContextMenu
              options={[
                {
                  onPress: () => {
                    console.log('hi');
                  },
                  text: 'hihihihihihihihihihi',
                },
                {
                  onPress: () => {
                    console.log('bye');
                  },
                  text: 'bye bye',
                },
                {
                  onPress: () => {
                    console.log('bye');
                  },
                  text: 'bye bye',
                },
                {
                  onPress: () => {
                    console.log('bye');
                  },
                  text: 'bye bye',
                },
                {
                  onPress: () => {
                    console.log('bye');
                  },
                  text: 'bye bye',
                },
                {
                  onPress: () => {
                    console.log('bye');
                  },
                  text: 'bye bye',
                },
                {
                  onPress: () => {
                    console.log('bye');
                  },
                  text: 'bye bye',
                },
                {
                  onPress: () => {
                    console.log('bye');
                  },
                  text: 'bye bye',
                },
                {
                  onPress: () => {
                    console.log('bye');
                  },
                  text: 'bye bye',
                },
                {
                  onPress: () => {
                    console.log('bye');
                  },
                  text: 'bye bye',
                },
                {
                  onPress: () => {
                    console.log('bye');
                  },
                  text: 'bye bye',
                },
                {
                  onPress: () => {
                    console.log('bye');
                  },
                  text: 'bye bye',
                },
                {
                  onPress: () => {
                    console.log('bye');
                  },
                  text: 'bye bye',
                },
              ]}
              onDismiss={(result) => {
                console.log('result', result);
              }}
            >
              <ThemedText style={{ backgroundColor: 'red' }}>
                testiere
              </ThemedText>
            </ContextMenu>
          </ThemedScrollView>
        </ThemedScreenWrap>
      </AlertProvider>
    </ReactNativeTemplateProviders>
  );
}
