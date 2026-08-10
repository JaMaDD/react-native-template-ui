import ThemedToast from '../../components/overlay/toast/ThemedToast';
import { renderAsync, screen } from '../utils';

describe('ThemedToast', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(
      <ThemedToast text="Toast message" />
    );
    expect(screen.getByText('Toast message')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render with custom text', async () => {
    await renderAsync(<ThemedToast text="Success!" />);
    expect(screen.getByText('Success!')).toBeOnTheScreen();
  });

  test('Render with custom text color', async () => {
    await renderAsync(
      <ThemedToast text="Warning message" textColor="themePri" />
    );
    expect(screen.getByText('Warning message')).toBeOnTheScreen();
  });

  test('Render with onDismiss callback', async () => {
    const onDismiss = jest.fn();
    await renderAsync(
      <ThemedToast text="Dismissable toast" onDismiss={onDismiss} />
    );
    expect(screen.getByText('Dismissable toast')).toBeOnTheScreen();
  });
});
