import type { FC } from 'react';
import { lazy, useState } from 'react';
import type { AlertProps, AlertWrapContextVal } from '../../types/overlay';
import type { PropsWithRequiredChildren } from '../../types/view';
import { isPlatformWeb } from '../../utils/common/func';
import { AlertWrapContext } from '../../utils/overlay/const';

let Alert: FC<AlertProps> = require('../overlay/alert/Alert').default;

if (isPlatformWeb()) {
  Alert = lazy(() => import('../overlay/alert/Alert'));
} else {
  Alert = require('../overlay/alert/Alert').default;
}

const AlertProvider: FC<PropsWithRequiredChildren> = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertProps[]>([]);

  const alertWrapContextValue: AlertWrapContextVal = {
    addAlert: (alert) => {
      console.log('addAlert called with:', alert);
    },
  };
  const alert = alerts[0];
  const onDismiss: AlertProps['onDismiss'] = (result) => {
    alert?.onDismiss?.(result);
    setAlerts((prevAlerts) => prevAlerts.slice(1));
  };

  return (
    <AlertWrapContext value={alertWrapContextValue}>
      {children}
      {!!alert && <Alert visible={true} onDismiss={onDismiss} {...alert} />}
    </AlertWrapContext>
  );
};

export default AlertProvider;
