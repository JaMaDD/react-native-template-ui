import type { FC } from 'react';
import { Modal, StyleSheet } from 'react-native';
import type { ThemedModalProps } from '../../../types/overlay';
import ThemedPressable from '../../btn/ThemedPressable';
import GestureProvider from '../../provider/GestureProvider';
import ThemedView from '../../view/ThemedView';

const ThemedModal: FC<ThemedModalProps> = ({
  modalProps,
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
      {...modalProps}
    >
      <GestureProvider>
        <ThemedView
          alignItems={'center'}
          justifyContent={'center'}
          backgroundColor={'backgroundOverlay'}
          style={StyleSheet.absoluteFill}
          {...props}
        >
          <ThemedPressable
            onPress={onDismiss}
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
