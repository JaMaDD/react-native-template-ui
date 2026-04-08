import type { FC } from 'react';
import { useAnimatedThemedView } from '../../hooks/view';
import type { AnimatedThemedViewProps } from '../../types/view';
import AnimatedView from './AnimatedView';

const AnimatedThemedView: FC<AnimatedThemedViewProps> = ({
  backgroundColor = 'background',
  ...props
}) => {
  const animatedThemedViewProps = useAnimatedThemedView({
    backgroundColor,
    ...props,
  });

  return <AnimatedView {...animatedThemedViewProps} />;
};

export default AnimatedThemedView;
