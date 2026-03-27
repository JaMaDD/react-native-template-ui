import type { FC } from 'react';
import AnimatedThemedPressable from '../../components/button/AnimatedThemedPressable';
import ThemedButton from '../../components/button/ThemedButton';
import ThemedIconButton from '../../components/button/ThemedIconButton';
import ThemedIconTextButton from '../../components/button/ThemedIconTextButton';
import ThemedPressable from '../../components/button/ThemedPressable';
import type { ThemedPressableProps } from '../../types/button';
import { OnPressDelayType } from '../../utils/button/const';
import {
  advanceTimers,
  cleanupFakeTimers,
  getThemeColors,
  renderAsync,
  screen,
  setupFakeTimers,
  userEvent,
} from '../utils';

const onPressDelayConfigWait = 1000;

const Pressable: FC<Partial<ThemedPressableProps>> = (props) => (
  <ThemedPressable onPress={() => {}} testID={'pressable'} {...props} />
);

async function renderPressable(props?: Partial<ThemedPressableProps>) {
  return await renderAsync(<Pressable {...props} />);
}

function getPressable() {
  return screen.getByTestId('pressable');
}

function triggerPressDelay() {
  advanceTimers(onPressDelayConfigWait);
}

describe('ThemedPressable', () => {
  beforeEach(() => {
    setupFakeTimers();
  });

  afterEach(() => {
    cleanupFakeTimers();
  });

  test('Render & Snapshot', async () => {
    const { toJSON } = await renderPressable();
    expect(getPressable()).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Press callback', async () => {
    const onPress = jest.fn();
    await renderPressable({ onPress });
    const pressable = getPressable();
    const user = userEvent.setup();
    await user.press(pressable);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  test('Change styles', async () => {
    const { themePri, background } = await getThemeColors();
    await renderPressable({
      backgroundColor: 'themePri',
      borderColor: 'background',
    });
    expect(getPressable()).toHaveStyle({
      backgroundColor: themePri,
      borderColor: background,
    });
  });

  test('Press with delay config (throttle)', async () => {
    const onPress = jest.fn();
    await renderPressable({
      onPress,
      onPressDelayConfig: {
        type: OnPressDelayType.Throttle,
        wait: onPressDelayConfigWait,
      },
    });
    const pressable = getPressable();
    const user = userEvent.setup();
    await user.press(pressable);
    expect(onPress).toHaveBeenCalledTimes(1);

    await user.press(pressable);
    await user.press(pressable);
    expect(onPress).toHaveBeenCalledTimes(1);

    triggerPressDelay();
    await user.press(pressable);
    expect(onPress).toHaveBeenCalledTimes(2);
  });

  test('Press with delay config (debounce)', async () => {
    const onPress = jest.fn();
    await renderPressable({
      onPress,
      onPressDelayConfig: {
        type: OnPressDelayType.Debounce,
        wait: onPressDelayConfigWait,
      },
    });
    const pressable = getPressable();
    const user = userEvent.setup();
    await user.press(pressable);
    expect(onPress).toHaveBeenCalledTimes(0);
    triggerPressDelay();
    expect(onPress).toHaveBeenCalledTimes(1);
    await user.press(pressable);
    await user.press(pressable);
    expect(onPress).toHaveBeenCalledTimes(1);
    triggerPressDelay();
    expect(onPress).toHaveBeenCalledTimes(2);
  });
});

describe('AnimatedThemedPressable', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(
      <AnimatedThemedPressable
        onPress={() => {}}
        testID={'animated-pressable'}
      />
    );
    expect(screen.getByTestId('animated-pressable')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Press callback', async () => {
    const onPress = jest.fn();
    await renderAsync(
      <AnimatedThemedPressable
        onPress={onPress}
        testID={'animated-pressable'}
      />
    );
    const user = userEvent.setup();
    await user.press(screen.getByTestId('animated-pressable'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('ThemedButton', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(
      <ThemedButton text={'Button Text'} onPress={() => {}} />
    );
    expect(screen.getByText('Button Text')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Press callback', async () => {
    const onPress = jest.fn();
    await renderAsync(<ThemedButton text={'Click Me'} onPress={onPress} />);
    const user = userEvent.setup();
    await user.press(screen.getByText('Click Me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  test('Change text color', async () => {
    const { themeSec } = await getThemeColors();
    await renderAsync(
      <ThemedButton
        text={'Colored Button'}
        textColor={'themeSec'}
        onPress={() => {}}
      />
    );
    expect(screen.getByText('Colored Button')).toHaveStyle({
      color: themeSec,
    });
  });

  test('Render with children', async () => {
    const { toJSON } = await renderAsync(
      <ThemedButton text={'Button with Child'} onPress={() => {}}>
        <ThemedButton text={'Child'} onPress={() => {}} />
      </ThemedButton>
    );
    expect(screen.getByText('Button with Child')).toBeOnTheScreen();
    expect(screen.getByText('Child')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });
});

describe('ThemedIconButton', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(
      <ThemedIconButton
        iconName={'check'}
        onPress={() => {}}
        testID={'icon-button'}
      />
    );
    expect(screen.getByTestId('icon-button')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Press callback', async () => {
    const onPress = jest.fn();
    await renderAsync(
      <ThemedIconButton
        iconName={'check'}
        onPress={onPress}
        testID={'icon-button'}
      />
    );
    const user = userEvent.setup();
    await user.press(screen.getByTestId('icon-button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  test('Change icon color', async () => {
    const { themeSec } = await getThemeColors();
    await renderAsync(
      <ThemedIconButton
        iconName={'check'}
        iconColor={'themeSec'}
        iconProps={{ testID: 'icon' }}
        onPress={() => {}}
        testID={'icon-button'}
      />
    );
    expect(screen.getByTestId('icon')).toHaveProp('color', themeSec);
  });
});

describe('ThemedIconTextButton', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(
      <ThemedIconTextButton
        iconName={'check'}
        text={'Icon Text Button'}
        onPress={() => {}}
      />
    );
    expect(screen.getByText('Icon Text Button')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Press callback', async () => {
    const onPress = jest.fn();
    await renderAsync(
      <ThemedIconTextButton
        iconName={'check'}
        text={'Click Me'}
        onPress={onPress}
      />
    );
    const user = userEvent.setup();
    await user.press(screen.getByText('Click Me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  test('Render with flip', async () => {
    const { toJSON } = await renderAsync(
      <ThemedIconTextButton
        iconName={'check'}
        text={'Flipped Button'}
        flip={true}
        onPress={() => {}}
      />
    );
    expect(screen.getByText('Flipped Button')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render with children', async () => {
    await renderAsync(
      <ThemedIconTextButton
        iconName={'check'}
        text={'Parent'}
        onPress={() => {}}
      >
        <ThemedButton text={'Child'} onPress={() => {}} />
      </ThemedIconTextButton>
    );
    expect(screen.getByText('Parent')).toBeOnTheScreen();
    expect(screen.getByText('Child')).toBeOnTheScreen();
  });
});
