import { useLayoutEffect, useState, type FC } from 'react';
import { useAnimationSharedVal } from '../../../hooks/reanimated';
import type {
  AlertContextVal,
  AlertProps,
  OverlayDismissAlertResult,
} from '../../../types/overlay';
import {
  AlertContext,
  overlayDismissResultDefaultText,
  OverlayDismissResultType,
} from '../../../utils/overlay/const';
import AlertButtons from './AlertButtons';
import AlertContent from './AlertContent';
import AlertWrap from './AlertWrap';

const Alert: FC<AlertProps> = ({
  customShowAnimation,
  customHideAnimation,
  wrapProps,
  title,
  titleTextProps,
  description,
  descriptionTextProps,
  buttons,
  buttonsWrapProps,
  buttonProps,
  onDismiss,
  dismissable,
  visible = true,
}) => {
  const [alertVisible, setAlertVisible] = useState(visible);
  const showSharedVal = useAnimationSharedVal();
  useLayoutEffect(() => {
    setAlertVisible(visible);
  }, [visible]);

  const handleDismiss = (result?: Partial<OverlayDismissAlertResult>) => {
    const tempResult: OverlayDismissAlertResult = {
      resultType: OverlayDismissResultType.Alert,
      title,
      description,
      text: overlayDismissResultDefaultText,
    };
    onDismiss?.(result ? { ...tempResult, ...result } : tempResult);
    setAlertVisible(false);
  };
  const alertContextVal: AlertContextVal = {
    buttonProps,
    onDismiss: (result) => {
      if (customHideAnimation) {
        customHideAnimation(showSharedVal, 0, () => {
          handleDismiss(result);
        });
      } else {
        showSharedVal.set(0);
        handleDismiss(result);
      }
    },
  };

  return (
    <AlertContext.Provider value={alertContextVal}>
      <AlertWrap
        customShowAnimation={customShowAnimation}
        wrapProps={wrapProps}
        title={title}
        description={description}
        buttons={buttons}
        dismissable={dismissable}
        visible={alertVisible}
        showSharedVal={showSharedVal}
      >
        <AlertContent
          title={title}
          titleTextProps={titleTextProps}
          description={description}
          descriptionTextProps={descriptionTextProps}
        />
        <AlertButtons buttons={buttons} buttonsWrapProps={buttonsWrapProps} />
      </AlertWrap>
    </AlertContext.Provider>
  );
};

export default Alert;
