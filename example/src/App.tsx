import {
  ActionSheet,
  ReactNativeTemplateProviders,
  ThemedButton,
  ThemedModal,
  ThemedScreenWrap,
  useIsDarkColorScheme,
} from '@jamadd/react-native-template-ui';
import { useState } from 'react';
import { customDarkTheme, customLightTheme } from './const';

export default function App() {
  const isDarkColorScheme = useIsDarkColorScheme();
  const [visible, setVisible] = useState<boolean>(false);

  const toggleVisible = () => {
    console.log('toggleVisible called. Current visible:', visible);
    setVisible((prev) => !prev);
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
        <ThemedButton text={'click'} onPress={toggleVisible} />
        <ThemedModal contentWrapProps={{ backgroundColor: 'background' }}>
          <ThemedButton
            text={'click'}
            onPress={toggleVisible}
            backgroundColor={'background'}
          />
        </ThemedModal>
        <ActionSheet
          visible={visible}
          onDismiss={toggleVisible}
          options={[
            {
              text: 'testinghere',
            },
          ]}
        />
      </ThemedScreenWrap>
    </ReactNativeTemplateProviders>
  );
}
