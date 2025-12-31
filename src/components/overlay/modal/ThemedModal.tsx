import type { FC } from 'react';
import { Modal, StyleSheet } from 'react-native';
import type { ThemedModalProps } from '../../../types/overlay';
import ThemedPressable from '../../button/ThemedPressable';
import GestureProvider from '../../provider/GestureProvider';
import ThemedView from '../../view/ThemedView';

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
