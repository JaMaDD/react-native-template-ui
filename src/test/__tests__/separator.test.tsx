import ThemedSeparator from '../../components/separator/ThemedSeparator';
import { BorderSize } from '../../utils/theme/const';
import { getThemeColors, renderAsync, screen } from '../utils';

function getSeparator() {
  return screen.getByRole('group');
}

describe('ThemedSeparator', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(<ThemedSeparator />);
    expect(getSeparator()).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render horizontal separator with default size', async () => {
    const { separator } = await getThemeColors();
    await renderAsync(<ThemedSeparator />);
    const sep = getSeparator();
    expect(sep).toHaveStyle({
      height: BorderSize.S,
      backgroundColor: separator,
    });
  });

  test('Render vertical separator', async () => {
    await renderAsync(<ThemedSeparator vertical={true} size={BorderSize.M} />);
    const sep = getSeparator();
    expect(sep).toHaveStyle({
      width: BorderSize.M,
    });
  });

  test('Change background color', async () => {
    const { themePri } = await getThemeColors();
    await renderAsync(<ThemedSeparator backgroundColor={'themePri'} />);
    expect(getSeparator()).toHaveStyle({
      backgroundColor: themePri,
    });
  });
});
