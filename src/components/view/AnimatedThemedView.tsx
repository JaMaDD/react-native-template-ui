import type { FC } from 'react';
import type { AnimatedThemedViewProps } from '../../types/view';
import AnimatedBox from './AnimatedBox';

const AnimatedThemedView: FC<AnimatedThemedViewProps> = ({
  backgroundColor = 'background',
  ...props
}) => {
  return <AnimatedBox backgroundColor={backgroundColor} {...props} />;
};

export default AnimatedThemedView;
