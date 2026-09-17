import type { ThemedIconButtonProps } from '@jamadd/react-native-template-ui';
import {
  getAlertContext,
  ThemedIconButton,
} from '@jamadd/react-native-template-ui';
import type { FC } from 'react';

const AlertButton: FC<{}> = ({}) => {
  const { addAlert } = getAlertContext();
  const onPress: ThemedIconButtonProps['onPress'] = () => {
    addAlert({
      title: 'hello',
      onDismiss: (result) => console.log('dismissed', result),
    });
  };

  return <ThemedIconButton onPress={onPress} iconName={'play'} />;
};

export default AlertButton;
