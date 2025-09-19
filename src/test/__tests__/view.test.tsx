import ThemedScreenWrap from '../../components/view/ThemedScreenWrap';
import ThemedView from '../../components/view/ThemedView';
import { colors, spacing } from '../../utils/theme/const';
import { renderAsync, screen } from '../utils/func';

function getView() {
  return screen.getByRole('group');
}

test('ThemedView - snapshot', async () => {
  const { toJSON } = await renderAsync(<ThemedView />);
  expect(toJSON()).toMatchSnapshot();
});

test('ThemedView - render', async () => {
  await renderAsync(<ThemedView />);
  expect(getView()).toBeOnTheScreen();
});

test('ThemedView - change backgroundColor', async () => {
  await renderAsync(<ThemedView backgroundColor={'backgroundOverlay'} />);
  expect(getView()).toHaveStyle({ backgroundColor: colors.backgroundOverlay });
});

test('ThemedScreenWrap - snapshot', async () => {
  const { toJSON } = await renderAsync(<ThemedScreenWrap />);
  expect(toJSON()).toMatchSnapshot();
});

test('ThemedScreenWrap - render', async () => {
  await renderAsync(<ThemedScreenWrap />);
  expect(getView()).toBeOnTheScreen();
});

test('ThemedScreenWrap - change backgroundColor', async () => {
  await renderAsync(<ThemedScreenWrap backgroundColor={'backgroundOverlay'} />);
  expect(getView()).toHaveStyle({ backgroundColor: colors.backgroundOverlay });
});

test('ThemedScreenWrap - change insets', async () => {
  await renderAsync(<ThemedScreenWrap insets={true} insetPaddingRight={'l'} />);
  expect(getView()).toHaveStyle({ paddingRight: spacing.l });
});
