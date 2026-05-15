import type { FC } from 'react';
import { Modal, StyleSheet } from 'react-native';
import type { ThemedModalProps } from '../../../types/overlay';
import ThemedPressable from '../../button/ThemedPressable';
import GestureProvider from '../../provider/GestureProvider';
import ThemedView from '../../view/ThemedView';

/**
 * A themed modal component that provides a full-screen overlay with backdrop.
 * Wraps React Native's Modal with theme-aware styling, dismissable backdrop, and gesture support.
 * Serves as the foundation for Alert, ActionSheet, and other overlay components.
 * @param props - Component props of type ThemedModalProps
 * @returns JSX element rendering a themed modal overlay
 * @example
 * <ThemedModal
 *   visible={isVisible}
 *   dismissable={true}
 *   onDismiss={() => setVisible(false)}
 * >
 *   <ThemedView padding="l">
 *     <ThemedText>Modal Content</ThemedText>
 *   </ThemedView>
 * </ThemedModal>
 */
const ThemedModal: FC<ThemedModalProps> = ({
  contentWrapProps,
  onDismiss,
  dismissable = true,
  children,
  ...props
}) => {
  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      statusBarTranslucent={true}
      {...props}
    >
      <GestureProvider>
        <ThemedView
          alignItems={'center'}
          justifyContent={'center'}
          backgroundColor={'backgroundOverlay'}
          style={StyleSheet.absoluteFill}
          {...contentWrapProps}
        >
          <ThemedPressable
            onPress={onDismiss ?? null}
            disabled={!dismissable}
            style={StyleSheet.absoluteFill}
          />
          {children}
        </ThemedView>
      </GestureProvider>
    </Modal>
  );
};

export default ThemedModal;
