import type { FC } from 'react';
import type { ThemedViewProps } from '../../types/view';
import Box from './Box';

const ThemedView: FC<ThemedViewProps> = ({
  backgroundColor = 'background',
  ...props
}) => {
  return (
    <Box
      backgroundColor={backgroundColor}
      accessible={true}
      role={'group'}
      {...props}
    />
  );
};

export default ThemedView;
