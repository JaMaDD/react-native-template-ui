import type { FC } from 'react';
import type { AlertBtns, AlertProps } from '../../../types/overlay';
import ThemedView from '../../view/ThemedView';
import AlertBtn from './AlertBtn';

const AlertBtns: FC<Pick<AlertProps, 'btns' | 'btnsWrapProps'>> = ({
  btns,
  btnsWrapProps,
}) => {
  const alertBtns: AlertBtns = btns ?? [[{ text: 'OK' }]];

  return (
    <ThemedView marginTop={'m'} gap={'s'} {...btnsWrapProps}>
      {alertBtns.map((row, rowIndex) => (
        <ThemedView
          key={`row_${row[0]?.text}_${rowIndex}`}
          flexDirection={'row'}
          gap={'s'}
        >
          {row.map(({ text, ...props }, btnIndex) => (
            <AlertBtn key={`btn_${text}_${btnIndex}`} text={text} {...props} />
          ))}
        </ThemedView>
      ))}
    </ThemedView>
  );
};

export default AlertBtns;
