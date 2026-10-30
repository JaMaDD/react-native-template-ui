import type {
  ActionSheetHeaderRef,
  ThemedIconButtonProps,
} from '@jamadd/react-native-template-ui';
import {
  ActionSheetExpandableHeightRatio,
  ThemedIconButton,
  ThemedView,
  useActionSheetContext,
} from '@jamadd/react-native-template-ui';
import { useEffect, useRef, type FC } from 'react';

const AlertButton: FC<{}> = ({}) => {
  // const { addAlert } = useAlertContext();
  const { setActionSheet } = useActionSheetContext();
  const headerRef = useRef<ActionSheetHeaderRef>(undefined);

  const onPress: ThemedIconButtonProps['onPress'] = () => {
    // addAlert({
    //   title: 'hello',
    //   onDismiss: (result) => console.log('dismissed', result),
    // });
    setActionSheet({
      options: [{ text: 'Option 1' }, { text: 'Option 2' }],
      expandable: true,
      expandableInitialHeightRatio: ActionSheetExpandableHeightRatio.Top,
      headerRef,
      headerChildren: <ThemedView height={200} backgroundColor={'err'} />,
      contentGestureEnabled: false,
      title: 'Alert Title',
      onDismiss: (result) => console.log('dismissed', result),
    });
    setTimeout(() => {
      headerRef.current?.setTitle('Updated Title');
    }, 5000);
  };

  return <ThemedIconButton onPress={onPress} iconName={'play'} />;
};

export default AlertButton;
