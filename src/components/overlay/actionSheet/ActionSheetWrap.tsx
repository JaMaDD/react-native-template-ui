/** @internal */
import type { FC } from 'react';
import { useAnimatedStyle } from 'react-native-reanimated';
import { useActionSheetOnDismiss } from '../../../hooks/overlay';
import type {
  ActionSheetWrapProps,
  ThemedModalProps,
} from '../../../types/overlay';
import {
  getActionSheetContext,
  getActionSheetMaxHeight,
} from '../../../utils/overlay/func';
import AnimatedThemedView from '../../view/AnimatedThemedView';
import ThemedModal from '../modal/ThemedModal';

const ActionSheetWrap: FC<ActionSheetWrapProps> = ({
  wrapViewProps,
  children,
}) => {
  const {
    expandable,
    dismissable,
    translateYSharedVal,
    heightSharedVal,
    expandableHeightSharedVal,
  } = getActionSheetContext();
  const onDismiss = useActionSheetOnDismiss();
  const outerWrapAnimatedStyle = useAnimatedStyle(
    () => ({
      ...wrapViewProps?.style,
      height: heightSharedVal?.get() ?? 0,
      transform: [{ translateY: translateYSharedVal?.get() ?? 0 }],
    }),
    [wrapViewProps, translateYSharedVal, heightSharedVal]
  );
  const innerWrapAnimatedStyle = useAnimatedStyle(
    () => ({
      height: expandable
        ? (expandableHeightSharedVal?.get() ?? 0)
        : (heightSharedVal?.get() ?? 0),
    }),
    [expandable, heightSharedVal, expandableHeightSharedVal]
  );

  const contentWrapProps: ThemedModalProps['contentWrapProps'] = {
    justifyContent: 'flex-end',
  };
  const onModalDismiss: ThemedModalProps['onDismiss'] = () => {
    onDismiss();
  };

  return (
    <ThemedModal
      contentWrapProps={contentWrapProps}
      onDismiss={onModalDismiss}
      dismissable={dismissable}
    >
      <AnimatedThemedView
        alignSelf={'stretch'}
        maxHeight={getActionSheetMaxHeight(expandable)}
        overflow={'hidden'}
        {...wrapViewProps}
        style={outerWrapAnimatedStyle}
      >
        <AnimatedThemedView style={innerWrapAnimatedStyle}>
          {children}
        </AnimatedThemedView>
      </AnimatedThemedView>
    </ThemedModal>
  );
};

export default ActionSheetWrap;
