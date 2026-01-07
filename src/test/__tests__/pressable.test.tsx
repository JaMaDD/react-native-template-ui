import AnimatedThemedPressable from '../../components/button/AnimatedThemedPressable';
import ThemedPressable from '../../components/button/ThemedPressable';
import ThemedText from '../../components/text/ThemedText';
import { renderAsync, screen, userEvent } from '../utils';

describe('ThemedPressable', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(
      <ThemedPressable testID="pressable">
        <ThemedText>Press me</ThemedText>
      </ThemedPressable>
    );
    expect(screen.getByText('Press me')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render with children', async () => {
    await renderAsync(
      <ThemedPressable testID="pressable">
        <ThemedText>Pressable Content</ThemedText>
      </ThemedPressable>
    );
    expect(screen.getByText('Pressable Content')).toBeOnTheScreen();
  });

  test('Press event', async () => {
    const onPress = jest.fn();
    await renderAsync(
      <ThemedPressable onPress={onPress} testID="pressable">
        <ThemedText>Click</ThemedText>
      </ThemedPressable>
    );
    const pressable = screen.getByTestId('pressable');

    const user = userEvent.setup();
    await user.press(pressable);

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  test('Render with backgroundColor', async () => {
    await renderAsync(
      <ThemedPressable backgroundColor="themePri" testID="pressable">
        <ThemedText>Colored</ThemedText>
      </ThemedPressable>
    );
    expect(screen.getByText('Colored')).toBeOnTheScreen();
  });
});

describe('AnimatedThemedPressable', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(
      <AnimatedThemedPressable testID="animated-pressable">
        <ThemedText>Animated Press</ThemedText>
      </AnimatedThemedPressable>
    );
    expect(screen.getByText('Animated Press')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render with children', async () => {
    await renderAsync(
      <AnimatedThemedPressable testID="animated-pressable">
        <ThemedText>Animated Content</ThemedText>
      </AnimatedThemedPressable>
    );
    expect(screen.getByText('Animated Content')).toBeOnTheScreen();
  });

  test('Press event', async () => {
    const onPress = jest.fn();
    await renderAsync(
      <AnimatedThemedPressable onPress={onPress} testID="animated-pressable">
        <ThemedText>Animated Click</ThemedText>
      </AnimatedThemedPressable>
    );
    const pressable = screen.getByTestId('animated-pressable');

    const user = userEvent.setup();
    await user.press(pressable);

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
