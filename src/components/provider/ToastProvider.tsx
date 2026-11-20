import { lazy, useState, type FC } from 'react';
import type { ThemedToastProps, ToastContextVal } from '../../types/overlay';
import type { PropsWithRequiredChildren } from '../../types/view';
import { ToastContext } from '../../utils/overlay/const';
import { isPlatformWeb } from '../../utils/react/func';

let ThemedToast: FC<ThemedToastProps>;
if (isPlatformWeb()) {
  ThemedToast = lazy(() => import('../overlay/toast/ThemedToast'));
} else {
  ThemedToast = require('../overlay/toast/ThemedToast').default;
}

const ToastProvider: FC<PropsWithRequiredChildren> = ({ children }) => {
  const [toast, setToast] = useState<ThemedToastProps>();

  const handleToast = (toastProps: ThemedToastProps) => {
    setToast((previousToast) => previousToast ?? toastProps);
  };
  const toastContextValue: ToastContextVal = {
    setToast: handleToast,
  };
  const onDismiss: ThemedToastProps['onDismiss'] = (result) => {
    toast?.onDismiss?.(result);
    setToast(undefined);
  };

  return (
    <ToastContext value={toastContextValue}>
      {children}
      {!!toast && <ThemedToast {...toast} onDismiss={onDismiss} />}
    </ToastContext>
  );
};

export default ToastProvider;
