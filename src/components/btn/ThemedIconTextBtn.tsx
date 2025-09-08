import type { FC } from 'react';
import type { ThemedIconTextBtnProps } from '../../types/btn';
import { BtnScaleRatio } from '../../utils/btn/const';
import ThemedIconText from '../text/ThemedIconText';
import ThemedPressable from './ThemedPressable';

const ThemedIconTextBtn: FC<ThemedIconTextBtnProps> = ({
  flip,
  iconTextProps,
  iconName,
  iconSize,
  iconColor,
  iconStyle,
  iconProps,
  text,
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
      scaleRatio={BtnScaleRatio.Rectangle}
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

export default ThemedIconTextBtn;
