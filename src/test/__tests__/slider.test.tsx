import ThemedSlider from '../../components/slider/ThemedSlider';
import { SliderValueDisplayMode } from '../../utils/slider/const';
import { renderAsync, screen } from '../utils';

const defaultRange = [0, 100];

describe('ThemedSlider', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(
      <ThemedSlider defaultValue={50} range={defaultRange} />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render with value display on top', async () => {
    const { toJSON } = await renderAsync(
      <ThemedSlider
        defaultValue={25}
        range={defaultRange}
        valueDisplayMode={SliderValueDisplayMode.Top}
      />
    );
    expect(screen.getByText('25')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render with value display on bottom', async () => {
    const { toJSON } = await renderAsync(
      <ThemedSlider
        defaultValue={75}
        range={defaultRange}
        valueDisplayMode={SliderValueDisplayMode.Bottom}
      />
    );
    expect(screen.getByText('75')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render with value description', async () => {
    await renderAsync(
      <ThemedSlider
        defaultValue={50}
        range={defaultRange}
        valueDisplayMode={SliderValueDisplayMode.Top}
        valueDescription={'Volume'}
      />
    );
    expect(screen.getByText('Volume')).toBeOnTheScreen();
    expect(screen.getByText('50')).toBeOnTheScreen();
  });

  test('Render with custom range', async () => {
    const { toJSON } = await renderAsync(
      <ThemedSlider
        defaultValue={150}
        range={[100, 200]}
        valueDisplayMode={SliderValueDisplayMode.Top}
      />
    );
    expect(screen.getByText('150')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });
});
