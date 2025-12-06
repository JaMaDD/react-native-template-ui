import type { FC } from 'react';
import type { ThemedButtonProps } from '../../types/button';
import { ButtonScaleRatio } from '../../utils/button/const';
import ThemedText from '../text/ThemedText';
import ThemedPressable from './ThemedPressable';

const ThemedButton: FC<ThemedButtonProps> = ({
  text,
  textVariant,
  textFontSize,
  textFontWeight,
  textColor = 'textButton',
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
      backgroundColor={'themePri'}
      {...props}
    >
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
      {children}
    </ThemedPressable>
  );
};

export default ThemedButton;
