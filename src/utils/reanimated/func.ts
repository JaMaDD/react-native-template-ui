import type {
  SharedValue,
  WithSpringConfig,
  WithTimingConfig,
} from 'react-native-reanimated';
import { withSpring, withTiming } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

/** @internal */
export function updateSharedValWithTiming(
  sharedVal: SharedValue<number>,
  toVal: number,
  userConfig?: WithTimingConfig,
  cb?: () => void
) {
  sharedVal.set(
    withTiming(toVal, userConfig, () => {
      if (cb) {
        scheduleOnRN(cb);
      }
    })
  );
}

/** @internal */
export function updateSharedValWithSpring(
  sharedVal: SharedValue<number>,
  toVal: number,
  userConfig?: WithSpringConfig,
  cb?: () => void
) {
  sharedVal.set(
    withSpring(toVal, userConfig, () => {
      if (cb) {
        scheduleOnRN(cb);
      }
    })
  );
}
