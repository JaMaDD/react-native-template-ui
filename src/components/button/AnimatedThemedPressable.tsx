import type { FC } from 'react';
import { useAnimatedThemedPressable } from '../../hooks/button';
import type { AnimatedThemedPressableProps } from '../../types/button';
import AnimatedPressable from './AnimatedPressable';

const AnimatedThemedPressable: FC<AnimatedThemedPressableProps> = (props) => {
  const animatedThemedPressableProps = useAnimatedThemedPressable(props);

  return <AnimatedPressable {...animatedThemedPressableProps} />;
};

export default AnimatedThemedPressable;
