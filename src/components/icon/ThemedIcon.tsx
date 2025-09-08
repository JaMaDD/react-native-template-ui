import Icon, { IconSize } from '@jamadd/react-native-template-icons';
import { useRestyle } from '@shopify/restyle';
import type { FC } from 'react';
import type { ThemedIconProps } from '../../types/icon';
import {
  themedIconColorRestyleFuncs,
  themedIconRestyleFuncs,
} from '../../utils/theme/restyle';

const ThemedIcon: FC<ThemedIconProps> = ({
  name,
  size = IconSize.M,
  color = 'themePri',
  ...props
}) => {
  const restyle = useRestyle(themedIconRestyleFuncs, props);
  const colorRestyle = useRestyle(themedIconColorRestyleFuncs, {
    color,
  } as Pick<ThemedIconProps, 'color'>) as { style: { color: string }[] };

  return (
    <Icon
      name={name}
      size={size}
      color={colorRestyle.style[0]?.color}
      {...restyle}
    />
  );
};

export default ThemedIcon;
