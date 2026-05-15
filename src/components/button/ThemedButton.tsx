import type { FC } from 'react';
import type { ThemedButtonProps } from '../../types/button';
import { ButtonScaleRatio } from '../../utils/button/const';
import ThemedText from '../text/ThemedText';
import ThemedPressable from './ThemedPressable';

/**
 * A themed button component with text label and optional children.
 * Provides a standard button layout with centered text and customizable appearance.
 * Automatically handles text styling, background colors, and scale animations on press.
 * @param props - Component props of type ThemedButtonProps
 * @returns JSX element rendering a themed button with text
 * @example
 * <ThemedButton
 *   text="Submit"
 *   textColor="textButton"
 *   backgroundColor="themePri"
 *   onPress={() => console.log('submitted')}
 * />
 */
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
