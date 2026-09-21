import type { FC } from 'react';
import { lazy, useState } from 'react';
import type { AlertProps, AlertContextVal } from '../../types/overlay';
import type { PropsWithRequiredChildren } from '../../types/view';
import { isPlatformWeb } from '../../utils/common/func';
import { AlertContext } from '../../utils/overlay/const';

let Alert: FC<AlertProps> = require('../overlay/alert/Alert').default;
if (isPlatformWeb()) {
  Alert = lazy(() => import('../overlay/alert/Alert'));
} else {
  Alert = require('../overlay/alert/Alert').default;
}

const AlertProvider: FC<PropsWithRequiredChildren> = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertProps[]>([]);

  const alertWrapContextValue: AlertContextVal = {
    addAlert: (alert) => {
      setAlerts((prevAlerts) => [...prevAlerts, alert]);
    },
  };
  const alert = alerts[0];
  const onDismiss: AlertProps['onDismiss'] = (result) => {
    alert?.onDismiss?.(result);
    setAlerts((prevAlerts) => prevAlerts.slice(1));
  };

  return (
    <AlertContext value={alertWrapContextValue}>
      {children}
      {!!alert && <Alert {...alert} visible={true} onDismiss={onDismiss} />}
    </AlertContext>
  );
};

export default AlertProvider;
