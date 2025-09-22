import ThemedScreenWrap from '../../components/view/ThemedScreenWrap';
import ThemedScrollView from '../../components/view/ThemedScrollView';
import ThemedView from '../../components/view/ThemedView';
import { BorderSize, colors, spacing } from '../../utils/theme/const';
import { renderAsync, screen } from '../utils/func';

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
    await renderAsync(
      <ThemedView
        borderWidth={BorderSize.S}
        borderColor={'border'}
        backgroundColor={'backgroundOverlay'}
      />
    );
    expect(getView()).toHaveStyle({
      borderWidth: BorderSize.S,
      borderColor: colors.border,
      backgroundColor: colors.backgroundOverlay,
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
    await renderAsync(
      <ThemedScreenWrap
        borderWidth={BorderSize.S}
        borderColor={'border'}
        backgroundColor={'backgroundOverlay'}
      />
    );
    expect(getView()).toHaveStyle({
      borderWidth: BorderSize.S,
      borderColor: colors.border,
      backgroundColor: colors.backgroundOverlay,
    });
  });

  test('Change Insets', async () => {
    await renderAsync(
      <ThemedScreenWrap
        insets={true}
        insetPaddingLeft={'s'}
        insetPaddingRight={'l'}
      />
    );
    expect(getView()).toHaveStyle({
      paddingLeft: spacing.s,
      paddingRight: spacing.l,
    });
  });
});

describe('ThemedScrollView', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(<ThemedScrollView />);
    expect(getView()).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Change Insets', async () => {
    await renderAsync(
      <ThemedScrollView
        insetTop={true}
        insetBottom={true}
        insetPaddingTop={'xxl'}
        insetPaddingBottom={'xxs'}
      />
    );
    expect(getView()).toHaveProp('contentContainerStyle', {
      paddingTop: spacing.xxl,
      paddingBottom: spacing.xxs,
    });
  });
});
