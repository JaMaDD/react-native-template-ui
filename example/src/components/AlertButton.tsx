import type { ThemedIconButtonProps } from '@jamadd/react-native-template-ui';
import {
  ThemedIconButton,
  ThemedView,
  useActionSheetContext,
  useAlertContext,
} from '@jamadd/react-native-template-ui';
import type { FC } from 'react';

const AlertButton: FC<{}> = ({}) => {
  const { addAlert } = useAlertContext();
  const { setActionSheet } = useActionSheetContext();

  const onPress: ThemedIconButtonProps['onPress'] = () => {
    // addAlert({
    //   title: 'hello',
    //   onDismiss: (result) => console.log('dismissed', result),
    // });
    setActionSheet({
      options: [{ text: 'Option 1' }, { text: 'Option 2' }],
      expandable: true,
      maxHeight: 600,
      headerShowDismissIcon: false,
      headerChildren: <ThemedView height={200} backgroundColor={'err'} />,
    });
  };

  return <ThemedIconButton onPress={onPress} iconName={'play'} />;
};

export default AlertButton;
