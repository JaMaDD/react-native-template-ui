import GestureProvider from '../../components/provider/GestureProvider';
import InsetsProvider from '../../components/provider/InsetsProvider';
import ReactNativeTemplateProviders from '../../components/provider/ReactNativeTemplateProviders';
import ThemeProvider from '../../components/provider/ThemeProvider';
import ThemedText from '../../components/text/ThemedText';
import { lightTheme, darkTheme } from '../../utils/theme/const';
import { renderAsync, screen } from '../utils';

describe('ThemeProvider', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(
      <ThemeProvider theme={lightTheme}>
        <ThemedText>Theme Provider Test</ThemedText>
      </ThemeProvider>
    );
    expect(screen.getByText('Theme Provider Test')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render with dark theme', async () => {
    const { toJSON } = await renderAsync(
      <ThemeProvider theme={darkTheme}>
        <ThemedText>Dark Theme Test</ThemedText>
      </ThemeProvider>
    );
    expect(screen.getByText('Dark Theme Test')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });
});

describe('GestureProvider', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(
      <GestureProvider>
        <ThemedText>Gesture Provider Test</ThemedText>
      </GestureProvider>
    );
    expect(screen.getByText('Gesture Provider Test')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });
});

describe('InsetsProvider', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(
      <InsetsProvider>
        <ThemedText>Insets Provider Test</ThemedText>
      </InsetsProvider>
    );
    expect(screen.getByText('Insets Provider Test')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });
});

describe('ReactNativeTemplateProviders', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(
      <ReactNativeTemplateProviders theme={lightTheme}>
        <ThemedText>All Providers Test</ThemedText>
      </ReactNativeTemplateProviders>
    );
    expect(screen.getByText('All Providers Test')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render with dark theme', async () => {
    const { toJSON } = await renderAsync(
      <ReactNativeTemplateProviders theme={darkTheme}>
        <ThemedText>Dark Theme All Providers</ThemedText>
      </ReactNativeTemplateProviders>
    );
    expect(screen.getByText('Dark Theme All Providers')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });
});
