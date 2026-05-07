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

  test('Render horizontal separator', async () => {
    const { separator } = await getThemeColors();
    await renderAsync(<ThemedSeparator />);
    const sep = getSeparator();
    expect(sep).toBeOnTheScreen();
    expect(sep).toHaveStyle({
      height: BorderSize.S,
      backgroundColor: separator,
    });
  });

  test('Render vertical separator', async () => {
    const { separator } = await getThemeColors();
    await renderAsync(<ThemedSeparator vertical={true} />);
    const sep = getSeparator();
    expect(sep).toBeOnTheScreen();
    expect(sep).toHaveStyle({
      width: BorderSize.S,
      backgroundColor: separator,
    });
  });

  test('Custom size', async () => {
    await renderAsync(<ThemedSeparator size={BorderSize.M} />);
    const sep = getSeparator();
    expect(sep).toHaveStyle({ height: BorderSize.M });
  });

  test('Custom background color', async () => {
    const { border } = await getThemeColors();
    await renderAsync(<ThemedSeparator backgroundColor="border" />);
    const sep = getSeparator();
    expect(sep).toHaveStyle({ backgroundColor: border });
  });
});
