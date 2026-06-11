import type { FC } from 'react';
import type { ThemedIconTextButtonProps } from '../../types/button';
import { ButtonScaleRatio } from '../../utils/button/const';
import ThemedIconText from '../text/ThemedIconText';
import ThemedPressable from './ThemedPressable';

/**
 * A themed button component that displays both an icon and text label.
 * Combines icon and text in a flexible layout with customizable ordering via the flip prop.
 * Perfect for primary action buttons that need both visual and textual context.
 * @param props - Component props of type ThemedIconTextButtonProps
 * @returns JSX element rendering a themed button with icon and text
 * @example
 * <ThemedIconTextButton
 *   iconName="plus"
 *   iconSize={IconSize.S}
 *   text="Add Item"
 *   textColor="themePri"
 *   onPress={() => console.log('add')}
 * />
 */
const ThemedIconTextButton: FC<ThemedIconTextButtonProps> = ({
  flip,
  iconTextProps,
  iconName,
  iconSize,
  iconColor,
  iconStyle,
  iconProps,
  text,
  textNumberOfLines = 1,
  textVariant,
  textFontSize,
  textFontWeight,
  textColor = 'themePri',
  textStyle,
  textProps,
  children,
  ...props
}) => {
  return (
    <ThemedPressable
      scaleRatio={ButtonScaleRatio.Rectangle}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={children ? 'space-between' : 'center'}
      paddingVertical={'s'}
      paddingHorizontal={'m'}
      {...props}
    >
      <ThemedIconText
        iconName={iconName}
        iconSize={iconSize}
        iconColor={iconColor}
        iconStyle={iconStyle}
        iconProps={iconProps}
        text={text}
        textNumberOfLines={textNumberOfLines}
        textVariant={textVariant}
        textFontSize={textFontSize}
        textFontWeight={textFontWeight}
        textColor={textColor}
        textStyle={textStyle}
        textProps={textProps}
        flip={flip}
        {...iconTextProps}
      />
      {children}
    </ThemedPressable>
  );
};

export default ThemedIconTextButton;
