import { lazy, useReducer, type FC } from 'react';
import type { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  useElementBoundingClientRect,
  useShadowStyle,
  useWindowDimensionsWidth,
} from '../../../hooks/style';
import type { ThemedPressableProps } from '../../../types/button';
import type {
  ContextMenuOptionListProps,
  ContextMenuProps,
  ThemedModalProps,
} from '../../../types/overlay';
import type { AnimatedThemedViewProps } from '../../../types/view';
import { isPlatformWeb } from '../../../utils/common/func';
import { OverlayDismissResultType } from '../../../utils/overlay/const';
import {
  shadowDefaultOffset,
  ShadowDirection,
} from '../../../utils/style/const';
import ThemedPressable from '../../button/ThemedPressable';

let ThemedModal: FC<ThemedModalProps>;
let AnimatedThemedView: FC<AnimatedThemedViewProps>;
let ContextMenuOptionList: FC<ContextMenuOptionListProps>;
if (isPlatformWeb()) {
  ThemedModal = lazy(() => import('../modal/ThemedModal'));
  AnimatedThemedView = lazy(() => import('../../view/AnimatedThemedView'));
  ContextMenuOptionList = lazy(() => import('./ContextMenuOptionList'));
} else {
  ThemedModal = require('../modal/ThemedModal').default;
  AnimatedThemedView = require('../../view/AnimatedThemedView').default;
  ContextMenuOptionList = require('./ContextMenuOptionList').default;
}

const ContextMenu: FC<ContextMenuProps> = ({
  options,
  optionListProps,
  optionListItemProps,
  onDismiss,
  children,
}) => {
  const windowWidth = useWindowDimensionsWidth();
  const { top } = useSafeAreaInsets();
  const [visible, updateVisible] = useReducer(
    (_prevVisible, nextVisible) => nextVisible,
    false
  );
  const {
    ref,
    elementBoundingClientRect: { width, height, x, y },
  } = useElementBoundingClientRect<View>();
  const shadowStyle = useShadowStyle(ShadowDirection.All);

  const dismissModal = () => {
    updateVisible(false);
  };
  const onModalShow: ThemedPressableProps['onPress'] = () => {
    updateVisible(true);
  };
  const onModalDismiss: ThemedModalProps['onDismiss'] = () => {
    dismissModal();
    onDismiss?.({
      resultType: OverlayDismissResultType.ContextMenu,
      text: '',
    });
  };
  const onItemPress: ContextMenuOptionListProps['onItemPress'] = (text) => {
    dismissModal();
    onDismiss?.({
      resultType: OverlayDismissResultType.ContextMenu,
      text,
    });
  };
  const contentWrapProps: ThemedModalProps['contentWrapProps'] = {
    backgroundColor: 'transparent',
  };
  const contentWidth: AnimatedThemedViewProps['width'] =
    x + width > windowWidth ? windowWidth - x - shadowDefaultOffset : width;
  const contentTop: AnimatedThemedViewProps['top'] = top + y + height;

  return (
    <>
      <ThemedPressable ref={ref} onPress={onModalShow}>
        {children}
      </ThemedPressable>
      {visible && (
        <ThemedModal
          visible={visible}
          onDismiss={onModalDismiss}
          animationType={'none'}
          contentWrapProps={contentWrapProps}
        >
          <AnimatedThemedView
            position={'absolute'}
            left={x}
            top={contentTop}
            width={contentWidth}
            style={shadowStyle}
          >
            <ContextMenuOptionList
              options={options}
              optionListProps={optionListProps}
              optionListItemProps={optionListItemProps}
              onItemPress={onItemPress}
            />
          </AnimatedThemedView>
        </ThemedModal>
      )}
    </>
  );
};

export default ContextMenu;
