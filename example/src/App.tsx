import {
  BorderSize,
  getElementBoundingClientRect,
  ReactNativeTemplateProviders,
  ThemedScreenWrap,
  ThemedScrollView,
  ThemedTextInput,
  useIsDarkColorScheme,
  useTextInputRef,
} from '@jamadd/react-native-template-ui';
import { customDarkTheme, customLightTheme } from './const';
import { useLayoutEffect } from 'react';

export default function App() {
  const isDarkColorScheme = useIsDarkColorScheme();
  const textInputRef = useTextInputRef();
  useLayoutEffect(() => {
    textInputRef.current?.measure((x, y, width, height) => {
      console.log('testing here', x, y, width, height);
    });
    console.log(
      'App useLayoutEffect textInputRef',
      textInputRef.current,
      getElementBoundingClientRect(textInputRef)
    );
  }, [textInputRef]);

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
        <ThemedScrollView>
          <ThemedTextInput
            ref={textInputRef}
            borderWidth={BorderSize.S}
            onChange={({ nativeEvent }) => {
              console.log('nativeEvent', nativeEvent);
            }}
            onChangeText={(text) => {
              console.log('text', text);
            }}
          />
        </ThemedScrollView>
      </ThemedScreenWrap>
    </ReactNativeTemplateProviders>
  );
}
