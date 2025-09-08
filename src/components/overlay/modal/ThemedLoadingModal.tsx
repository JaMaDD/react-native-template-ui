import type { FC } from 'react';
import type { ThemedLoadingModalProps } from '../../../types/overlay';
import { overlayMaxWidthPercent } from '../../../utils/theme/const';
import ThemedLoading from '../../loading/ThemedLoading';
import ThemedText from '../../text/ThemedText';
import ThemedModal from './ThemedModal';

const ThemedLoadingModal: FC<ThemedLoadingModalProps> = ({
  loadingSize,
  loadingColor,
  loadingProps,
  text,
  textVariant,
  textFontSize,
  textFontWeight,
  textColor = 'textOverlay',
  textStyle,
  textProps,
  ...props
}) => {
  return (
    <ThemedModal {...props}>
      <ThemedLoading
        size={loadingSize}
        color={loadingColor}
        {...loadingProps}
      />
      {!!text && (
        <ThemedText
          textAlign={'center'}
          maxWidth={overlayMaxWidthPercent}
          marginTop={'m'}
          variant={textVariant}
          fontSize={textFontSize}
          fontWeight={textFontWeight}
          color={textColor}
          style={textStyle}
          {...textProps}
        >
          {text}
        </ThemedText>
      )}
    </ThemedModal>
  );
};

export default ThemedLoadingModal;
