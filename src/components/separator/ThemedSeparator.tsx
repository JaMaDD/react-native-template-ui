import { type FC } from 'react';
import type { ThemedSeparatorProps } from '../../types/separator';
import { BorderSize } from '../../utils/theme/const';
import ThemedView from '../view/ThemedView';

const ThemedSeparator: FC<ThemedSeparatorProps> = ({
  size = BorderSize.S,
  vertical = false,
  backgroundColor = 'separator',
  bg,
  ...props
}) => {
  return (
    <ThemedView
      alignSelf={'stretch'}
      width={vertical ? size : undefined}
      height={vertical ? undefined : size}
      backgroundColor={bg ?? backgroundColor}
      {...props}
    />
  );
};

export default ThemedSeparator;
