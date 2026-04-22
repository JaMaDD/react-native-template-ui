import ThemedSlider from '../../components/slider/ThemedSlider';
import { renderAsync } from '../utils';

describe('ThemedSlider', () => {
  test('Render & Snapshot with number range', async () => {
    const { toJSON } = await renderAsync(
      <ThemedSlider range={[0, 100]} defaultValue={50} />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render with string range', async () => {
    const { toJSON } = await renderAsync(
      <ThemedSlider range={['Low', 'Medium', 'High']} defaultValue={'Medium'} />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render with default value', async () => {
    const { toJSON } = await renderAsync(
      <ThemedSlider range={[0, 10]} defaultValue={5} />
    );
    expect(toJSON()).toBeTruthy();
  });

  test('Render with custom steps', async () => {
    const { toJSON } = await renderAsync(
      <ThemedSlider range={[0, 100]} defaultValue={50} steps={10} />
    );
    expect(toJSON()).toBeTruthy();
  });

  test('Render with step indicator', async () => {
    const { toJSON } = await renderAsync(
      <ThemedSlider range={[0, 10]} defaultValue={5} stepIndicator={true} />
    );
    expect(toJSON()).toBeTruthy();
  });
});
