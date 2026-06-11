import {
  BorderSize,
  ContextMenu,
  ReactNativeTemplateProviders,
  ThemedScreenWrap,
  ThemedScrollView,
  ThemedText,
  ThemedTextInput,
  ThemedView,
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
        <ThemedScrollView>
          <ThemedTextInput
            borderWidth={BorderSize.S}
            onChange={({ nativeEvent }) => {
              console.log('nativeEvent', nativeEvent);
            }}
            onChangeText={(text) => {
              console.log('text', text);
            }}
          />
          <ThemedText>testing here</ThemedText>
          <ThemedText>testing here</ThemedText>
          <ThemedText>testing here</ThemedText>
          <ThemedText>testing here</ThemedText>
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
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
            <ThemedText style={{ backgroundColor: 'red' }}>testiere</ThemedText>
          </ContextMenu>
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
          <ThemedView width={100} height={100} backgroundColor={'err'} />
        </ThemedScrollView>
      </ThemedScreenWrap>
    </ReactNativeTemplateProviders>
  );
}
