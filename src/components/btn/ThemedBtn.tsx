import type { FC } from 'react';
import type { ThemedBtnProps } from '../../types/btn';
import { BtnScaleRatio } from '../../utils/btn/const';
import ThemedText from '../text/ThemedText';
import ThemedPressable from './ThemedPressable';

const ThemedBtn: FC<ThemedBtnProps> = ({
  text,
  textVariant,
  textFontSize,
  textFontWeight,
  textColor = 'textBtn',
  textStyle,
  textProps,
  ...props
}) => {
  return (
    <ThemedPressable
      scaleRatio={BtnScaleRatio.Rectangle}
      alignItems={'center'}
      paddingVertical={'s'}
      paddingHorizontal={'m'}
      backgroundColor={'theme'}
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
    </ThemedPressable>
  );
};

export default ThemedBtn;
