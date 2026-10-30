import ThemedButton from '../../components/button/ThemedButton';
import { renderAsync, screen, userEvent } from '../utils';

describe('ThemedButton', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(<ThemedButton text="Test Button" />);
    expect(screen.getByText('Test Button')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render with text', async () => {
    await renderAsync(<ThemedButton text="Click me" />);
    expect(screen.getByText('Click me')).toBeOnTheScreen();
  });

  test('Render with children', async () => {
    await renderAsync(
      <ThemedButton text="Button">
        <ThemedButton text="Child" />
      </ThemedButton>
    );
    expect(screen.getByText('Button')).toBeOnTheScreen();
    expect(screen.getByText('Child')).toBeOnTheScreen();
  });

  test('Press event', async () => {
    const onPress = jest.fn();
    await renderAsync(
      <ThemedButton text="Press me" onPress={onPress} testID="test-button" />
    );
    const button = screen.getByTestId('test-button');

    const user = userEvent.setup();
    await user.press(button);

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  test('Custom text color', async () => {
    await renderAsync(<ThemedButton text="Colored" textColor="themeSec" />);
    expect(screen.getByText('Colored')).toBeOnTheScreen();
  });
});
