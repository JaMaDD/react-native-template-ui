import { useState, type FC } from 'react';
import ThemedSwitch from '../../components/switch/ThemedSwitch';
import type { ThemedSwitchProps } from '../../types/switch';
import { OnPressDelayType } from '../../utils/btn/const';
import { switchAnimationDuration } from '../../utils/switch/const';
import { getThemeColors, hexToRgb } from '../utils/func';
import {
  act,
  renderAsync,
  renderHookAsync,
  screen,
  userEvent,
} from '../utils/testingLib';

const onPressDelayConfigWait = 1000;

const Switch: FC<Partial<ThemedSwitchProps>> = ({ thumbProps, ...props }) => (
  <ThemedSwitch
    onPress={() => {}}
    thumbProps={{ ...thumbProps, testID: 'switchThumb' }}
    {...props}
  />
);

async function renderSwitch(props?: Partial<ThemedSwitchProps>) {
  return await renderAsync(<Switch {...props} />);
}

function getSwitch() {
  return screen.getByRole('switch');
}

function getSwitchThumb() {
  return screen.getByTestId('switchThumb');
}

function triggerSwitchAnimation() {
  jest.advanceTimersByTime(switchAnimationDuration);
}

function triggerSwitchPressDelay() {
  jest.advanceTimersByTime(onPressDelayConfigWait);
}

describe('ThemedSwitch', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(Date, 'now').mockImplementation(() => jest.now());
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  test('Render & Snapshot', async () => {
    const { toJSON } = await renderSwitch();
    expect(getSwitch()).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Press with default styles', async () => {
    const { theme, background } = await getThemeColors();
    await renderSwitch();
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
    triggerSwitchAnimation();
    expect(switchComponent).toHaveAnimatedStyle({
      backgroundColor: hexToRgb(theme),
    });
    expect(switchThumb).toHaveAnimatedStyle({
      backgroundColor: hexToRgb(background),
    });
  });

  test('Press with custom styles', async () => {
    const { theme, background } = await getThemeColors();
    await renderSwitch({
      customColors: {
        background: 'theme',
        backgroundEnabled: 'background',
        border: 'background',
        borderEnabled: 'background',
        thumb: 'background',
        thumbEnabled: 'theme',
      },
    });
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
    triggerSwitchAnimation();
    expect(switchComponent).toHaveAnimatedStyle({
      borderColor: hexToRgb(background),
      backgroundColor: hexToRgb(background),
    });
    expect(switchThumb).toHaveAnimatedStyle({
      backgroundColor: hexToRgb(theme),
    });
  });

  test('Change Enabled prop', async () => {
    const { theme, background } = await getThemeColors();
    const { result } = await renderHookAsync(() => useState(false));
    expect(result.current[0]).toBe(false);
    const { rerenderAsync } = await renderAsync(
      <Switch enabled={result.current[0]} />
    );
    act(() => result.current[1](true));
    await rerenderAsync(<Switch enabled={result.current[0]} />);
    triggerSwitchAnimation();
    const switchComponent = getSwitch();
    const switchThumb = getSwitchThumb();
    expect(switchComponent).toHaveAnimatedStyle({
      backgroundColor: hexToRgb(theme),
    });
    expect(switchThumb).toHaveAnimatedStyle({
      backgroundColor: hexToRgb(background),
    });
  });

  test('Press with delay config (throttle)', async () => {
    const onPress = jest.fn();
    await renderSwitch({
      onPress,
      onPressDelayConfig: {
        type: OnPressDelayType.Throttle,
        wait: onPressDelayConfigWait,
      },
    });
    const switchComponent = getSwitch();
    const user = userEvent.setup();
    await user.press(switchComponent);
    triggerSwitchAnimation();
    expect(onPress).toHaveBeenCalledTimes(1);

    await user.press(switchComponent);
    await user.press(switchComponent);
    expect(onPress).toHaveBeenCalledTimes(1);

    triggerSwitchPressDelay();
    await user.press(switchComponent);
    triggerSwitchAnimation();
    expect(onPress).toHaveBeenCalledTimes(2);
  });

  test('Press with delay config (debounce)', async () => {
    const onPress = jest.fn();
    await renderSwitch({
      onPress,
      onPressDelayConfig: {
        type: OnPressDelayType.Debounce,
        wait: onPressDelayConfigWait,
      },
    });
    const switchComponent = getSwitch();
    const user = userEvent.setup();
    await user.press(switchComponent);
    triggerSwitchAnimation();
    expect(onPress).toHaveBeenCalledTimes(0);
    triggerSwitchPressDelay();
    expect(onPress).toHaveBeenCalledTimes(1);
    await user.press(switchComponent);
    triggerSwitchAnimation();
    await user.press(switchComponent);
    triggerSwitchAnimation();
    expect(onPress).toHaveBeenCalledTimes(1);
    triggerSwitchPressDelay();
    expect(onPress).toHaveBeenCalledTimes(2);
  });
});
