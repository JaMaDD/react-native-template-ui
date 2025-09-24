import type { FC } from 'react';
import ThemedSwitch from '../../components/switch/ThemedSwitch';
import type { ThemedSwitchProps } from '../../types/switch';
import { switchAnimationDuration } from '../../utils/switch/const';
import { getThemeColors, hexToRgb } from '../utils/func';
import { renderAsync, screen, userEvent } from '../utils/testingLib';

const Switch: FC<Omit<ThemedSwitchProps, 'onPress'>> = ({
  thumbProps,
  ...props
}) => (
  <ThemedSwitch
    onPress={() => {}}
    thumbProps={{ ...thumbProps, testID: 'switchThumb' }}
    {...props}
  />
);

function getSwitch() {
  return screen.getByRole('switch');
}

function getSwitchThumb() {
  return screen.getByTestId('switchThumb');
}

describe('ThemedSwitch', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(<Switch />);
    expect(getSwitch()).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Press with default styles', async () => {
    const { theme, background } = await getThemeColors();
    await renderAsync(<Switch />);
    const switchComponent = getSwitch();
    const switchThumb = getSwitchThumb();
    expect(switchComponent).toHaveAnimatedStyle({
      backgroundColor: hexToRgb(background),
    });
    expect(switchThumb).toHaveAnimatedStyle({
      backgroundColor: hexToRgb(theme),
    });
    const user = userEvent.setup();
    await user.press(switchComponent);
    jest.advanceTimersByTime(switchAnimationDuration + 50);
    expect(switchComponent).toHaveAnimatedStyle({
      backgroundColor: hexToRgb(theme),
    });
    expect(switchThumb).toHaveAnimatedStyle({
      backgroundColor: hexToRgb(background),
    });
  });

  test('Press with custom styles', async () => {
    const { theme, background } = await getThemeColors();
    await renderAsync(
      <Switch
        customColors={{
          background: 'theme',
          backgroundEnabled: 'background',
          border: 'background',
          borderEnabled: 'background',
          thumb: 'background',
          thumbEnabled: 'theme',
        }}
      />
    );
    const switchComponent = getSwitch();
    const switchThumb = getSwitchThumb();
    expect(switchComponent).toHaveAnimatedStyle({
      borderColor: hexToRgb(background),
      backgroundColor: hexToRgb(theme),
    });
    expect(switchThumb).toHaveAnimatedStyle({
      backgroundColor: hexToRgb(background),
    });
    const user = userEvent.setup();
    await user.press(switchComponent);
    jest.advanceTimersByTime(switchAnimationDuration + 50);
    expect(switchComponent).toHaveAnimatedStyle({
      borderColor: hexToRgb(background),
      backgroundColor: hexToRgb(background),
    });
    expect(switchThumb).toHaveAnimatedStyle({
      backgroundColor: hexToRgb(theme),
    });
  });

  test('Change Enabled prop', async () => {});

  test('Press with delay config', async () => {});
});
