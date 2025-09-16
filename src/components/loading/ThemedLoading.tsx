import { useRestyle } from '@shopify/restyle';
import type { FC } from 'react';
import { ActivityIndicator } from 'react-native';
import type { ThemedLoadingProps } from '../../types/loading';
import {
  themedLoadingColorRestyleFuncs,
  themedLoadingRestyleFuncs,
} from '../../utils/theme/restyle';

const ThemedLoading: FC<ThemedLoadingProps> = ({
  size = 'large',
  color = 'theme',
  ...props
}) => {
  const restyle = useRestyle(themedLoadingRestyleFuncs, props);
  const colorRestyle = useRestyle(themedLoadingColorRestyleFuncs, {
    color,
  } as Pick<ThemedLoadingProps, 'color'>) as { style: { color: string }[] };

  return (
    <ActivityIndicator
      size={size}
      color={colorRestyle.style[0]?.color}
      {...restyle}
    />
  );
};

export default ThemedLoading;
