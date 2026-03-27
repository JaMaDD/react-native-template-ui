import ThemedIconText from '../../components/text/ThemedIconText';
import ThemedText from '../../components/text/ThemedText';
import { getThemeColors, renderAsync, screen } from '../utils';

describe('ThemedText', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(<ThemedText>Test Text</ThemedText>);
    expect(screen.getByText('Test Text')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Change color', async () => {
    const { themePri } = await getThemeColors();
    await renderAsync(<ThemedText color={'themePri'}>Colored Text</ThemedText>);
    expect(screen.getByText('Colored Text')).toHaveStyle({
      color: themePri,
    });
  });

  test('Change variant', async () => {
    await renderAsync(
      <ThemedText variant={'textXLBold'}>Bold Text</ThemedText>
    );
    const textElement = screen.getByText('Bold Text');
    expect(textElement).toBeOnTheScreen();
  });
});

describe('ThemedIconText', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(
      <ThemedIconText iconName={'check'} text={'Icon Text'} />
    );
    expect(screen.getByText('Icon Text')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render with flip', async () => {
    const { toJSON } = await renderAsync(
      <ThemedIconText iconName={'check'} text={'Flipped Text'} flip={true} />
    );
    expect(screen.getByText('Flipped Text')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Change icon and text colors', async () => {
    const { themePri } = await getThemeColors();
    await renderAsync(
      <ThemedIconText
        iconName={'check'}
        iconColor={'themeSec'}
        text={'Colored Icon Text'}
        textColor={'themePri'}
      />
    );
    expect(screen.getByText('Colored Icon Text')).toHaveStyle({
      color: themePri,
    });
  });
});
