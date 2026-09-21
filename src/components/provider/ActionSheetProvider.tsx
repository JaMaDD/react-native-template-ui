import { lazy, useState, type FC } from 'react';
import type {
  ActionSheetContextVal,
  ActionSheetProps,
} from '../../types/overlay';
import type { PropsWithRequiredChildren } from '../../types/view';
import { isPlatformWeb } from '../../utils/common/func';
import { ActionSheetContext } from '../../utils/overlay/const';

let ActionSheet: FC<ActionSheetProps>;
if (isPlatformWeb()) {
  ActionSheet = lazy(() => import('../overlay/actionSheet/ActionSheet'));
} else {
  ActionSheet = require('../overlay/actionSheet/ActionSheet').default;
}

const ActionSheetProvider: FC<PropsWithRequiredChildren> = ({ children }) => {
  const [actionSheet, setActionSheet] = useState<ActionSheetProps>();

  const actionSheetContextValue: ActionSheetContextVal = {
    setActionSheet,
  };
  const onDismiss: ActionSheetProps['onDismiss'] = (result) => {
    actionSheet?.onDismiss?.(result);
    setActionSheet(undefined);
  };

  return (
    <ActionSheetContext value={actionSheetContextValue}>
      {children}
      {!!actionSheet && <ActionSheet {...actionSheet} onDismiss={onDismiss} />}
    </ActionSheetContext>
  );
};

export default ActionSheetProvider;
