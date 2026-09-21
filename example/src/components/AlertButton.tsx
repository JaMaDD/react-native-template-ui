import type { ThemedIconButtonProps } from '@jamadd/react-native-template-ui';
import {
  ThemedIconButton,
  useAlertContext,
} from '@jamadd/react-native-template-ui';
import type { FC } from 'react';

const AlertButton: FC<{}> = ({}) => {
  const { addAlert } = useAlertContext();

  const onPress: ThemedIconButtonProps['onPress'] = () => {
    addAlert({
      title: 'hello',
      onDismiss: (result) => console.log('dismissed', result),
    });
  };

  return <ThemedIconButton onPress={onPress} iconName={'play'} />;
};

export default AlertButton;
