import { type FC } from 'react';
import type { ThemedBtnProps } from '../../../types/btn';
import type { AlertBtnProps } from '../../../types/overlay';
import { AlertBtnType } from '../../../utils/overlay/const';
import { getAlertContext } from '../../../utils/overlay/func';
import { BorderSize } from '../../../utils/theme/const';
import ThemedBtn from '../../btn/ThemedBtn';

const AlertBtn: FC<AlertBtnProps> = ({
  type = AlertBtnType.Primary,
  text,
  onPress,
  props,
}) => {
  const { btnProps, onDismiss } = getAlertContext();
  const themedBtnOnPress: ThemedBtnProps['onPress'] = (event) => {
    onPress?.(event);
    onDismiss?.({ type, text });
  };
  const isPrimary = type === AlertBtnType.Primary;
  const isDestructive = type === AlertBtnType.Destructive;
  const backgroundColor = isPrimary ? 'theme' : 'background';

  return (
    <ThemedBtn
      onPress={themedBtnOnPress}
      flex={1}
      borderWidth={BorderSize.S}
      borderColor={type === AlertBtnType.Destructive ? 'err' : backgroundColor}
      backgroundColor={backgroundColor}
      text={text}
      textColor={isDestructive ? 'err' : isPrimary ? 'background' : 'theme'}
      {...btnProps}
      {...props}
    />
  );
};

export default AlertBtn;
