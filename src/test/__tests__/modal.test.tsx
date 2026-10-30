import ThemedLoadingModal from '../../components/overlay/modal/ThemedLoadingModal';
import ThemedModal from '../../components/overlay/modal/ThemedModal';
import ThemedText from '../../components/text/ThemedText';
import { renderAsync, screen } from '../utils';

describe('ThemedModal', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(
      <ThemedModal visible={true}>
        <ThemedText>Modal Content</ThemedText>
      </ThemedModal>
    );
    expect(screen.getByText('Modal Content')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render with visible=false', async () => {
    const { toJSON } = await renderAsync(
      <ThemedModal visible={false}>
        <ThemedText>Hidden Modal</ThemedText>
      </ThemedModal>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render dismissable modal', async () => {
    const onDismiss = jest.fn();
    await renderAsync(
      <ThemedModal visible={true} onDismiss={onDismiss} dismissable={true}>
        <ThemedText>Dismissable Modal</ThemedText>
      </ThemedModal>
    );
    expect(screen.getByText('Dismissable Modal')).toBeOnTheScreen();
  });

  test('Render non-dismissable modal', async () => {
    const onDismiss = jest.fn();
    await renderAsync(
      <ThemedModal visible={true} onDismiss={onDismiss} dismissable={false}>
        <ThemedText>Non-dismissable Modal</ThemedText>
      </ThemedModal>
    );
    expect(screen.getByText('Non-dismissable Modal')).toBeOnTheScreen();
  });
});

describe('ThemedLoadingModal', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(
      <ThemedLoadingModal visible={true} text="Loading..." />
    );
    expect(screen.getByText('Loading...')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render without text', async () => {
    const { toJSON } = await renderAsync(
      <ThemedLoadingModal visible={true} />
    );
    expect(toJSON()).toBeTruthy();
  });

  test('Render with custom loading color', async () => {
    await renderAsync(
      <ThemedLoadingModal
        visible={true}
        text="Please wait"
        loadingColor="themeSec"
      />
    );
    expect(screen.getByText('Please wait')).toBeOnTheScreen();
  });

  test('Render with custom text color', async () => {
    await renderAsync(
      <ThemedLoadingModal
        visible={true}
        text="Processing"
        textColor="themePri"
      />
    );
    expect(screen.getByText('Processing')).toBeOnTheScreen();
  });
});
