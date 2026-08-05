import type { FC } from 'react';
import { lazy } from 'react';
import type { ThemedIconButtonProps } from '../../types/button';
import type { ThemedIconProps } from '../../types/icon';
import { ButtonScaleRatio } from '../../utils/button/const';
import { isPlatformWeb } from '../../utils/common/func';
import ThemedPressable from './ThemedPressable';

let ThemedIcon: FC<ThemedIconProps>;
if (isPlatformWeb()) {
  ThemedIcon = lazy(() => import('../icon/ThemedIcon'));
} else {
  ThemedIcon = require('../icon/ThemedIcon').default;
}

/**
 * A themed button component that displays only an icon.
 * Provides a compact, icon-only button with square scaling animation and centered icon layout.
 * Ideal for toolbar buttons, navigation icons, and action buttons where space is limited.
 * @param props - Component props of type ThemedIconButtonProps
 * @returns JSX element rendering a themed icon button
 * @example
 * <ThemedIconButton
 *   iconName="close"
 *   iconSize={IconSize.M}
 *   iconColor="themePri"
 *   onPress={() => console.log('closed')}
 * />
 */
const ThemedIconButton: FC<ThemedIconButtonProps> = ({
  iconName,
  iconSize,
  iconColor,
  iconStyle,
  iconProps,
  iconComponent,
  ...props
}) => {
  return (
    <ThemedPressable
      scaleRatio={ButtonScaleRatio.Square}
      alignItems={'center'}
      padding={'s'}
      {...props}
    >
      {iconComponent ?? (
        <ThemedIcon
          name={iconName}
          size={iconSize}
          color={iconColor}
          style={iconStyle}
          {...iconProps}
        />
      )}
    </ThemedPressable>
  );
};

export default ThemedIconButton;
