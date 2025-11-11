import type { FC } from 'react';
import type { ThemedIconTextProps } from '../../types/text';
import ThemedIcon from '../icon/ThemedIcon';
import ThemedView from '../view/ThemedView';
import ThemedText from './ThemedText';

const ThemedIconText: FC<ThemedIconTextProps> = ({
  flip = false,
  iconName,
  iconSize,
  iconColor,
  iconStyle,
  iconProps,
  text,
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
      numberOfLines={1}
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
