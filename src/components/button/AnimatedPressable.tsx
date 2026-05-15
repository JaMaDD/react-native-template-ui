/** @internal */
import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';

/**
 * @internal
 * An animated version of React Native's Pressable component.
 * Created using react-native-reanimated's createAnimatedComponent API.
 */
export const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default AnimatedPressable;
