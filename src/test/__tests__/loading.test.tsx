import ThemedLoading from '../../components/loading/ThemedLoading';
import { getThemeColors, renderAsync, screen } from '../utils';

describe('ThemedLoading', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(<ThemedLoading testID={'loading'} />);
    expect(screen.getByTestId('loading')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render with small size', async () => {
    await renderAsync(
      <ThemedLoading size={'small'} testID={'small-loading'} />
    );
    const loading = screen.getByTestId('small-loading');
    expect(loading).toBeOnTheScreen();
    expect(loading).toHaveProp('size', 'small');
  });

  test('Change color', async () => {
    const { themeSec } = await getThemeColors();
    await renderAsync(
      <ThemedLoading color={'themeSec'} testID={'colored-loading'} />
    );
    const loading = screen.getByTestId('colored-loading');
    expect(loading).toBeOnTheScreen();
    expect(loading).toHaveProp('color', themeSec);
  });
});
