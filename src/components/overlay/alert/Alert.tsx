import { useState, type FC } from 'react';
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
import AlertBtns from './AlertBtns';
import AlertContent from './AlertContent';
import AlertWrap from './AlertWrap';

const Alert: FC<AlertProps> = ({
  customShowAnimation,
  customHideAnimation,
  wrapProps,
  title,
  titleTextProps,
  desc,
  descTextProps,
  btns,
  btnsWrapProps,
  btnProps,
  onDismiss,
  dismissable,
}) => {
  const [visible, setVisible] = useState(true);
  const showSharedVal = useAnimationSharedVal();

  const handleDismiss = (result?: Partial<OverlayDismissAlertResult>) => {
    const tempResult: OverlayDismissAlertResult = {
      resultType: OverlayDismissResultType.Alert,
      title,
      desc,
      text: overlayDismissResultDefaultText,
    };
    onDismiss?.(result ? { ...tempResult, ...result } : tempResult);
    setVisible(false);
  };
  const alertContextVal: AlertContextVal = {
    btnProps,
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
        desc={desc}
        btns={btns}
        dismissable={dismissable}
        visible={visible}
        setVisible={setVisible}
        showSharedVal={showSharedVal}
      >
        <AlertContent
          title={title}
          titleTextProps={titleTextProps}
          desc={desc}
          descTextProps={descTextProps}
        />
        <AlertBtns btns={btns} btnsWrapProps={btnsWrapProps} />
      </AlertWrap>
    </AlertContext.Provider>
  );
};

export default Alert;
