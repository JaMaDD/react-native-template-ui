import type { FC } from 'react';
import type { ThemedLoadingModalProps } from '../../../types/overlay';
import { overlayMaxWidthPercent } from '../../../utils/overlay/const';
import ThemedLoading from '../../loading/ThemedLoading';
import ThemedText from '../../text/ThemedText';
import ThemedModal from './ThemedModal';

/**
 * A modal component that displays a loading indicator with optional text.
 * Combines ThemedLoading and ThemedText components in a centered modal layout.
 * Ideal for blocking user interaction during asynchronous operations.
 * @param props - Component props of type ThemedLoadingModalProps
 * @returns JSX element rendering a loading modal
 * @example
 * <ThemedLoadingModal
 *   visible={isLoading}
 *   text="Loading data..."
 *   loadingSize="large"
 *   loadingColor="themePri"
 * />
 */
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
