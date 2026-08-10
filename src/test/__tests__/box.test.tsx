import AnimatedBox from '../../components/view/AnimatedBox';
import Box from '../../components/view/Box';
import { renderAsync } from '../utils';

describe('Box', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(<Box testID="box" />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render with padding', async () => {
    const { toJSON } = await renderAsync(<Box padding="m" testID="box" />);
    expect(toJSON()).toBeTruthy();
  });

  test('Render with margin', async () => {
    const { toJSON } = await renderAsync(<Box margin="s" testID="box" />);
    expect(toJSON()).toBeTruthy();
  });

  test('Render with background color', async () => {
    const { toJSON } = await renderAsync(
      <Box backgroundColor="themePri" testID="box" />
    );
    expect(toJSON()).toBeTruthy();
  });
});

describe('AnimatedBox', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(<AnimatedBox testID="animated-box" />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render with animated styles', async () => {
    const { toJSON } = await renderAsync(
      <AnimatedBox
        padding="l"
        backgroundColor="themeSec"
        testID="animated-box"
      />
    );
    expect(toJSON()).toBeTruthy();
  });
});
