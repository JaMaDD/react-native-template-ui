import type { FC } from 'react';
import type { AlertProps } from '../../../types/overlay';
import ThemedText from '../../text/ThemedText';

const AlertContent: FC<
  Pick<
    AlertProps,
    'title' | 'titleTextProps' | 'description' | 'descriptionTextProps'
  >
> = ({
  title,
  titleTextProps: {
    textVariant: titleTextVariant,
    textFontSize: titleTextFontSize,
    textFontWeight: titleTextFontWeight,
    textColor: titleTextColor,
    textStyle: titleTextStyle,
    textProps: titleTextProps,
  } = {},
  description,
  descriptionTextProps: {
    textVariant: descriptionTextVariant,
    textFontSize: descriptionTextFontSize,
    textFontWeight: descriptionTextFontWeight,
    textColor: descriptionTextColor,
    textStyle: descriptionTextStyle,
    textProps: descriptionTextProps,
  } = {},
}) => {
  return (
    <>
      <ThemedText
        textAlign={'center'}
        fontWeight={titleTextFontWeight ?? 'bold'}
        variant={titleTextVariant}
        fontSize={titleTextFontSize}
        color={titleTextColor}
        style={titleTextStyle}
        {...titleTextProps}
      >
        {title}
      </ThemedText>
      {!!description && (
        <ThemedText
          textAlign={'center'}
          variant={descriptionTextVariant ?? 'textS'}
          fontSize={descriptionTextFontSize}
          fontWeight={descriptionTextFontWeight}
          color={descriptionTextColor}
          style={descriptionTextStyle}
          {...descriptionTextProps}
        >
          {description}
        </ThemedText>
      )}
    </>
  );
};

export default AlertContent;
