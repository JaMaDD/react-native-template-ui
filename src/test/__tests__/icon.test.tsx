import { IconSize } from '@jamadd/react-native-template-icons';
import ThemedIcon from '../../components/icon/ThemedIcon';
import { renderAsync } from '../utils';

describe('ThemedIcon', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(<ThemedIcon name="home" />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render with default size', async () => {
    const { toJSON } = await renderAsync(<ThemedIcon name="star" />);
    expect(toJSON()).toBeTruthy();
  });

  test('Render with custom size', async () => {
    const { toJSON } = await renderAsync(
      <ThemedIcon name="heart" size={IconSize.L} />
    );
    expect(toJSON()).toBeTruthy();
  });

  test('Render with custom color', async () => {
    const { toJSON } = await renderAsync(
      <ThemedIcon name="settings" color="themeSec" />
    );
    expect(toJSON()).toBeTruthy();
  });

  test('Render with multiple icon sizes', async () => {
    const { toJSON: toJSON1 } = await renderAsync(
      <ThemedIcon name="check" size={IconSize.XS} />
    );
    const { toJSON: toJSON2 } = await renderAsync(
      <ThemedIcon name="check" size={IconSize.S} />
    );
    const { toJSON: toJSON3 } = await renderAsync(
      <ThemedIcon name="check" size={IconSize.M} />
    );
    const { toJSON: toJSON4 } = await renderAsync(
      <ThemedIcon name="check" size={IconSize.L} />
    );
    const { toJSON: toJSON5 } = await renderAsync(
      <ThemedIcon name="check" size={IconSize.XL} />
    );

    expect(toJSON1()).toBeTruthy();
    expect(toJSON2()).toBeTruthy();
    expect(toJSON3()).toBeTruthy();
    expect(toJSON4()).toBeTruthy();
    expect(toJSON5()).toBeTruthy();
  });
});
