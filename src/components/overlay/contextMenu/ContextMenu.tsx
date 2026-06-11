import { lazy, useReducer, type FC } from 'react';
import type { View } from 'react-native';
import { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  useElementBoundingClientRect,
  useShadowStyle,
  useWindowDimensionsHeight,
  useWindowDimensionsWidth,
} from '../../../hooks/style';
import { useThemeBreakpoint } from '../../../hooks/theme';
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
  ElementScreenPosition,
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
  pressableProps,
  contentWidth: propsContentWidth,
  children,
}) => {
  const windowWidth = useWindowDimensionsWidth();
  const windowHeight = useWindowDimensionsHeight();
  const { top: insetsTop } = useSafeAreaInsets();
  const breakpoint = useThemeBreakpoint();
  const [visible, updateVisible] = useReducer(
    (_prevVisible, nextVisible) => nextVisible,
    false
  );
  const {
    ref,
    elementBoundingClientRect: { width, height, x, y },
    elementScreenPosition,
    refreshElementBoundingClientReact,
  } = useElementBoundingClientRect<View>();
  const shadowStyle = useShadowStyle(ShadowDirection.All);

  const dismissModal = () => {
    updateVisible(false);
  };
  const onModalShow: ThemedPressableProps['onPress'] = () => {
    refreshElementBoundingClientReact();
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

  const contentWidth: AnimatedThemedViewProps['width'] = Math.min(
    windowWidth,
    (typeof propsContentWidth === 'object'
      ? propsContentWidth[breakpoint]
      : propsContentWidth) || windowWidth
  );
  const contentTop: AnimatedThemedViewProps['top'] =
    elementScreenPosition === ElementScreenPosition.Upper
      ? undefined
      : insetsTop + y + height;
  const contentBottom: AnimatedThemedViewProps['bottom'] =
    elementScreenPosition === ElementScreenPosition.Lower
      ? undefined
      : windowHeight - insetsTop - y;
  const contentLeft: AnimatedThemedViewProps['left'] =
    contentWidth === windowWidth
      ? 0
      : contentWidth > x + width
        ? x
        : x + width - contentWidth;

  return (
    <>
      <ThemedPressable
        ref={ref}
        onPress={onModalShow}
        alignSelf={'baseline'}
        {...pressableProps}
      >
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
            entering={
              elementScreenPosition === ElementScreenPosition.Upper
                ? FadeInDown
                : FadeInUp
            }
            position={'absolute'}
            top={contentTop}
            bottom={contentBottom}
            left={contentLeft}
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
