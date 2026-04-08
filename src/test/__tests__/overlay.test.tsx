import ActionSheet from '../../components/overlay/actionSheet/ActionSheet';
import Alert from '../../components/overlay/alert/Alert';
import ThemedLoadingModal from '../../components/overlay/modal/ThemedLoadingModal';
import ThemedModal from '../../components/overlay/modal/ThemedModal';
import ThemedToast from '../../components/overlay/toast/ThemedToast';
import ThemedText from '../../components/text/ThemedText';
import { ToastType } from '../../utils/overlay/const';
import {
  cleanupFakeTimers,
  renderAsync,
  screen,
  setupFakeTimers,
} from '../utils';

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

  test('Render with dismissable false', async () => {
    const { toJSON } = await renderAsync(
      <ThemedModal visible={true} dismissable={false}>
        <ThemedText>Non-dismissable Modal</ThemedText>
      </ThemedModal>
    );
    expect(screen.getByText('Non-dismissable Modal')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render hidden modal', async () => {
    const { toJSON } = await renderAsync(
      <ThemedModal visible={false}>
        <ThemedText>Hidden Content</ThemedText>
      </ThemedModal>
    );
    expect(toJSON()).toMatchSnapshot();
  });
});

describe('ThemedLoadingModal', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(
      <ThemedLoadingModal visible={true} testID={'loading-modal'} />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render with text', async () => {
    const { toJSON } = await renderAsync(
      <ThemedLoadingModal visible={true} text={'Loading...'} />
    );
    expect(screen.getByText('Loading...')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render hidden loading modal', async () => {
    const { toJSON } = await renderAsync(
      <ThemedLoadingModal visible={false} text={'Hidden'} />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});

describe('ThemedToast', () => {
  beforeEach(() => {
    setupFakeTimers();
  });

  afterEach(() => {
    cleanupFakeTimers();
  });

  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(
      <ThemedToast text={'Toast Message'} />
    );
    expect(screen.getByText('Toast Message')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render with top type', async () => {
    const { toJSON } = await renderAsync(
      <ThemedToast text={'Top Toast'} type={ToastType.Top} />
    );
    expect(screen.getByText('Top Toast')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render with custom text color', async () => {
    await renderAsync(
      <ThemedToast text={'Custom Color Toast'} textColor={'themePri'} />
    );
    expect(screen.getByText('Custom Color Toast')).toBeOnTheScreen();
  });
});

describe('Alert', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(
      <Alert
        visible={true}
        title={'Alert Title'}
        description={'Alert description'}
        buttons={[[{ text: 'OK' }]]}
      />
    );
    expect(screen.getByText('Alert Title')).toBeOnTheScreen();
    expect(screen.getByText('Alert description')).toBeOnTheScreen();
    expect(screen.getByText('OK')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render with multiple buttons', async () => {
    const { toJSON } = await renderAsync(
      <Alert
        visible={true}
        title={'Confirm Action'}
        buttons={[[{ text: 'Cancel' }, { text: 'OK' }]]}
      />
    );
    expect(screen.getByText('Confirm Action')).toBeOnTheScreen();
    expect(screen.getByText('Cancel')).toBeOnTheScreen();
    expect(screen.getByText('OK')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render hidden alert', async () => {
    const { toJSON } = await renderAsync(
      <Alert
        visible={false}
        title={'Hidden Alert'}
        buttons={[[{ text: 'OK' }]]}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});

describe('ActionSheet', () => {
  test('Render with options', async () => {
    const options = [
      { text: 'Option 1', onPress: jest.fn() },
      { text: 'Option 2', onPress: jest.fn() },
    ];
    const { toJSON } = await renderAsync(
      <ActionSheet visible={true} options={options} />
    );
    expect(screen.getByText('Option 1')).toBeOnTheScreen();
    expect(screen.getByText('Option 2')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render with children', async () => {
    const { toJSON } = await renderAsync(
      <ActionSheet visible={true}>
        <ThemedText>Action Sheet Content</ThemedText>
      </ActionSheet>
    );
    expect(screen.getByText('Action Sheet Content')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render hidden action sheet', async () => {
    const { toJSON } = await renderAsync(
      <ActionSheet visible={false} options={[{ text: 'Option' }]} />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
