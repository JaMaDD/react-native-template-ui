import type { FC } from 'react';
import type { ThemedIconTextProps } from '../../types/text';
import ThemedIcon from '../icon/ThemedIcon';
import ThemedView from '../view/ThemedView';
import ThemedText from './ThemedText';

/**
 * A themed component that displays an icon and text together in a flexible layout.
 * Supports customizable icon position (before or after text) via the flip prop.
 * Ideal for labels, menu items, and buttons requiring both icon and text.
 * @param props - Component props of type ThemedIconTextProps
 * @returns JSX element rendering icon and text in a horizontal layout
 * @example
 * <ThemedIconText
 *   iconName="star"
 *   iconSize={IconSize.S}
 *   iconColor="themePri"
 *   text="Favorite"
 *   textColor="text"
 * />
 * @example
 * <ThemedIconText
 *   iconName="arrow-right"
 *   text="Next"
 *   flip={true}
 * />
 */
const ThemedIconText: FC<ThemedIconTextProps> = ({
  flip = false,
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
  textColor,
  textStyle,
  textProps,
  ...props
}) => {
  const themedText = (
    <ThemedText
      numberOfLines={textNumberOfLines}
      variant={textVariant}
      fontSize={textFontSize}
      fontWeight={textFontWeight}
      color={textColor}
      style={textStyle}
      {...textProps}
    >
      {text}
    </ThemedText>
  );

  return (
    <ThemedView
      flexDirection={'row'}
      alignItems={'center'}
      gap={'s'}
      backgroundColor={'transparent'}
      {...props}
    >
      {flip && themedText}
      <ThemedIcon
        name={iconName}
        size={iconSize}
        color={iconColor}
        style={iconStyle}
        {...iconProps}
      />
      {!flip && themedText}
    </ThemedView>
  );
};

export default ThemedIconText;
