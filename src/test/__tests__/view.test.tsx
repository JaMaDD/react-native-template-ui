import AnimatedThemedView from '../../components/view/AnimatedThemedView';
import ThemedScreenWrap from '../../components/view/ThemedScreenWrap';
import ThemedScrollView from '../../components/view/ThemedScrollView';
import ThemedView from '../../components/view/ThemedView';
import { BorderSize } from '../../utils/theme/const';
import { getThemeColors, getThemeSpacing } from '../utils/func';
import { renderAsync, screen } from '../utils/testingLib';

function getView() {
  return screen.getByRole('group');
}

describe('ThemedView', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(<ThemedView />);
    expect(getView()).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Change Styles', async () => {
    const { border, backgroundOverlay } = await getThemeColors();
    await renderAsync(
      <ThemedView
        borderWidth={BorderSize.S}
        borderColor={'border'}
        backgroundColor={'backgroundOverlay'}
      />
    );
    expect(getView()).toHaveStyle({
      borderWidth: BorderSize.S,
      borderColor: border,
      backgroundColor: backgroundOverlay,
    });
  });
});

describe('ThemedScreenWrap', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(<ThemedScreenWrap />);
    expect(getView()).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Change Styles', async () => {
    const { border, backgroundOverlay } = await getThemeColors();
    await renderAsync(
      <ThemedScreenWrap
        borderWidth={BorderSize.S}
        borderColor={'border'}
        backgroundColor={'backgroundOverlay'}
      />
    );
    expect(getView()).toHaveStyle({
      borderWidth: BorderSize.S,
      borderColor: border,
      backgroundColor: backgroundOverlay,
    });
  });

  test('Change Insets', async () => {
    const { s, l } = await getThemeSpacing();
    await renderAsync(
      <ThemedScreenWrap
        insets={true}
        insetPaddingLeft={'s'}
        insetPaddingRight={'l'}
      />
    );
    expect(getView()).toHaveStyle({ paddingLeft: s, paddingRight: l });
  });
});

describe('ThemedScrollView', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(<ThemedScrollView />);
    expect(getView()).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Change Insets', async () => {
    const { xxs, xxl } = await getThemeSpacing();
    await renderAsync(
      <ThemedScrollView
        insetTop={true}
        insetBottom={true}
        insetPaddingTop={'xxl'}
        insetPaddingBottom={'xxs'}
      />
    );
    expect(getView()).toHaveProp('contentContainerStyle', {
      paddingTop: xxl,
      paddingBottom: xxs,
    });
  });
});

describe('AnimatedThemedView', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(<AnimatedThemedView />);
    expect(getView()).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Change Styles', async () => {
    const { border, backgroundOverlay } = await getThemeColors();
    await renderAsync(
      <AnimatedThemedView
        borderWidth={BorderSize.S}
        borderColor={'border'}
        backgroundColor={'backgroundOverlay'}
      />
    );
    expect(getView()).toHaveStyle({
      borderWidth: BorderSize.S,
      borderColor: border,
      backgroundColor: backgroundOverlay,
    });
  });
});
