import Alert from '../../components/overlay/alert/Alert';
import { renderAsync, screen } from '../utils';

describe('Alert', () => {
  test('Render & Snapshot with title only', async () => {
    const { toJSON } = await renderAsync(<Alert title="Alert Title" />);
    expect(screen.getByText('Alert Title')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render with title and description', async () => {
    const { toJSON } = await renderAsync(
      <Alert title="Confirm" description="Are you sure?" />
    );
    expect(screen.getByText('Confirm')).toBeOnTheScreen();
    expect(screen.getByText('Are you sure?')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render with buttons', async () => {
    const onDismiss = jest.fn();
    await renderAsync(
      <Alert
        title="Confirm Action"
        description="This action cannot be undone"
        buttons={[
          [
            { text: 'Cancel', onPress: onDismiss },
            { text: 'Delete', onPress: onDismiss },
          ],
        ]}
      />
    );
    expect(screen.getByText('Confirm Action')).toBeOnTheScreen();
    expect(screen.getByText('Cancel')).toBeOnTheScreen();
    expect(screen.getByText('Delete')).toBeOnTheScreen();
  });

  test('Render dismissable alert', async () => {
    const onDismiss = jest.fn();
    await renderAsync(
      <Alert
        title="Notice"
        description="Important information"
        onDismiss={onDismiss}
        dismissable={true}
      />
    );
    expect(screen.getByText('Notice')).toBeOnTheScreen();
  });

  test('Render with visible=false', async () => {
    const { toJSON } = await renderAsync(
      <Alert title="Hidden Alert" visible={false} />
    );
    // When not visible, component still renders but may not be on screen
    expect(toJSON()).toBeTruthy();
  });
});
