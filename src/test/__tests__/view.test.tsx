import ThemedView from '../../components/view/ThemedView';
import { colors } from '../../utils/theme/const';
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
