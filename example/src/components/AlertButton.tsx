import type { ThemedIconButtonProps } from '@jamadd/react-native-template-ui';
import {
  getAlertWrapContext,
  ThemedIconButton,
} from '@jamadd/react-native-template-ui';
import type { FC } from 'react';

const AlertButton: FC<{}> = ({}) => {
  const { addAlert } = getAlertWrapContext();
  const onPress: ThemedIconButtonProps['onPress'] = () => {
    addAlert({
      title: 'hello',
      onDismiss: (result) => console.log('dismissed', result),
    });
  };

  return <ThemedIconButton onPress={onPress} iconName={'play'} />;
};

export default AlertButton;
