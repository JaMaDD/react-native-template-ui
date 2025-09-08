import type { FC } from 'react';
import { useThemedPressable } from '../../hooks/btn';
import type { AnimatedThemedPressableProps } from '../../types/btn';
import AnimatedPressable from './AnimatedPressable';

const AnimatedThemedPressable: FC<AnimatedThemedPressableProps> = (props) => {
  const { onPress, style, restyle } = useThemedPressable(props, true);

  return <AnimatedPressable onPress={onPress} style={style} {...restyle} />;
};

export default AnimatedThemedPressable;
