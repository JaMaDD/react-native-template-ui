import { IconSize } from '@jamadd/react-native-template-icons';
import ThemedIcon from '../../components/icon/ThemedIcon';
import { getThemeColors } from '../utils/func';
import { renderAsync, screen } from '../utils/testingLib';

describe('ThemedIcon', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(
      <ThemedIcon name={'check'} testID={'icon'} />
    );
    expect(screen.getByTestId('icon')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Change icon size', async () => {
    await renderAsync(
      <ThemedIcon name={'check'} size={IconSize.L} testID={'large-icon'} />
    );
    expect(screen.getByTestId('large-icon')).toBeOnTheScreen();
  });

  test('Change icon color', async () => {
    const { themeSec } = await getThemeColors();
    await renderAsync(
      <ThemedIcon name={'check'} color={'themeSec'} testID={'colored-icon'} />
    );
    const icon = screen.getByTestId('colored-icon');
    expect(icon).toBeOnTheScreen();
    expect(icon).toHaveProp('color', themeSec);
  });
});
