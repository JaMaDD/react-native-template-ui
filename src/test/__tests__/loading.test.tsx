import ThemedLoading from '../../components/loading/ThemedLoading';
import { renderAsync, screen } from '../utils';

function getLoading() {
  return screen.getByTestId('loading-indicator');
}

describe('ThemedLoading', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(
      <ThemedLoading testID="loading-indicator" />
    );
    expect(getLoading()).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render with default size', async () => {
    await renderAsync(<ThemedLoading testID="loading-indicator" />);
    const loading = getLoading();
    expect(loading).toBeOnTheScreen();
    expect(loading).toHaveProp('size', 'large');
  });

  test('Render with small size', async () => {
    await renderAsync(
      <ThemedLoading testID="loading-indicator" size="small" />
    );
    const loading = getLoading();
    expect(loading).toHaveProp('size', 'small');
  });

  test('Render with custom color', async () => {
    await renderAsync(
      <ThemedLoading testID="loading-indicator" color="themeSec" />
    );
    expect(getLoading()).toBeOnTheScreen();
  });
});
