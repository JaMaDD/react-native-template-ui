import { type FC } from 'react';
import type { ThemedButtonProps } from '../../../types/button';
import type { AlertButtonProps } from '../../../types/overlay';
import { AlertButtonType } from '../../../utils/overlay/const';
import { getAlertContext } from '../../../utils/overlay/func';
import { BorderSize } from '../../../utils/theme/const';
import ThemedButton from '../../button/ThemedButton';

const AlertButton: FC<AlertButtonProps> = ({
  type = AlertButtonType.Primary,
  text,
  onPress,
  props,
}) => {
  const { buttonProps, onDismiss } = getAlertContext();
  const themedButtonOnPress: ThemedButtonProps['onPress'] = (event) => {
    onPress?.(event);
    onDismiss?.({ type, text });
  };
  const isPrimary = type === AlertButtonType.Primary;
  const isDestructive = type === AlertButtonType.Destructive;
  const backgroundColor = isPrimary ? 'themePri' : 'background';

  return (
    <ThemedButton
      onPress={themedButtonOnPress}
      flex={1}
      borderWidth={BorderSize.S}
      borderColor={
        type === AlertButtonType.Destructive ? 'err' : backgroundColor
      }
      backgroundColor={backgroundColor}
      text={text}
      textColor={isDestructive ? 'err' : isPrimary ? 'background' : 'themePri'}
      {...buttonProps}
      {...props}
    />
  );
};

export default AlertButton;
