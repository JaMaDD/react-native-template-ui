import Icon, { IconSize } from '@jamadd/react-native-template-icons';
import { useRestyle } from '@shopify/restyle';
import type { FC } from 'react';
import type { ThemedIconProps } from '../../types/icon';
import {
  themedIconColorRestyleFuncs,
  themedIconRestyleFuncs,
} from '../../utils/theme/restyle';

/**
 * A themed icon component that renders icons with theme-aware colors and styling.
 * Integrates with the @jamadd/react-native-template-icons package and applies theme colors
 * through the restyle system. Supports all standard icon props plus themed styling properties.
 * @param props - Component props of type ThemedIconProps
 * @returns JSX element rendering a themed icon
 * @example
 * <ThemedIcon
 *   name="heart"
 *   size={IconSize.M}
 *   color="themePri"
 * />
 */
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
