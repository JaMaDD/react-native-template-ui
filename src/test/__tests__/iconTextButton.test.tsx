import { IconSize } from '@jamadd/react-native-template-icons';
import ThemedIconTextButton from '../../components/button/ThemedIconTextButton';
import { renderAsync, screen, userEvent } from '../utils';

describe('ThemedIconTextButton', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(
      <ThemedIconTextButton
        iconName="home"
        text="Home"
        testID="icon-text-button"
      />
    );
    expect(screen.getByText('Home')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render with icon and text', async () => {
    await renderAsync(
      <ThemedIconTextButton
        iconName="settings"
        text="Settings"
        testID="icon-text-button"
      />
    );
    expect(screen.getByText('Settings')).toBeOnTheScreen();
  });

  test('Render with flip=true', async () => {
    await renderAsync(
      <ThemedIconTextButton
        iconName="arrow-right"
        text="Next"
        flip={true}
        testID="icon-text-button"
      />
    );
    expect(screen.getByText('Next')).toBeOnTheScreen();
  });

  test('Press event', async () => {
    const onPress = jest.fn();
    await renderAsync(
      <ThemedIconTextButton
        iconName="check"
        text="Confirm"
        onPress={onPress}
        testID="icon-text-button"
      />
    );
    const button = screen.getByTestId('icon-text-button');

    const user = userEvent.setup();
    await user.press(button);

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  test('Custom icon and text colors', async () => {
    await renderAsync(
      <ThemedIconTextButton
        iconName="heart"
        text="Like"
        iconColor="themeSec"
        textColor="themeSec"
        testID="icon-text-button"
      />
    );
    expect(screen.getByText('Like')).toBeOnTheScreen();
  });

  test('Custom icon size', async () => {
    await renderAsync(
      <ThemedIconTextButton
        iconName="star"
        text="Favorite"
        iconSize={IconSize.L}
        testID="icon-text-button"
      />
    );
    expect(screen.getByText('Favorite')).toBeOnTheScreen();
  });
});
