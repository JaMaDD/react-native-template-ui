import { IconSize } from '@jamadd/react-native-template-icons';
import ThemedIconButton from '../../components/button/ThemedIconButton';
import { renderAsync, screen, userEvent } from '../utils';

describe('ThemedIconButton', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(
      <ThemedIconButton iconName="home" testID="icon-button" />
    );
    expect(screen.getByTestId('icon-button')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render with icon', async () => {
    await renderAsync(
      <ThemedIconButton iconName="settings" testID="icon-button" />
    );
    expect(screen.getByTestId('icon-button')).toBeOnTheScreen();
  });

  test('Press event', async () => {
    const onPress = jest.fn();
    await renderAsync(
      <ThemedIconButton
        iconName="check"
        onPress={onPress}
        testID="icon-button"
      />
    );
    const button = screen.getByTestId('icon-button');

    const user = userEvent.setup();
    await user.press(button);

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  test('Custom icon size', async () => {
    await renderAsync(
      <ThemedIconButton
        iconName="star"
        iconSize={IconSize.L}
        testID="icon-button"
      />
    );
    expect(screen.getByTestId('icon-button')).toBeOnTheScreen();
  });

  test('Custom icon color', async () => {
    await renderAsync(
      <ThemedIconButton
        iconName="heart"
        iconColor="themeSec"
        testID="icon-button"
      />
    );
    expect(screen.getByTestId('icon-button')).toBeOnTheScreen();
  });
});
