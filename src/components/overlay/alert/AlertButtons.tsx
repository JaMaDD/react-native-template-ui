import type { FC } from 'react';
import type { AlertButtonsProps } from '../../../types/overlay';
import ThemedView from '../../view/ThemedView';
import AlertButton from './AlertButton';

const AlertButtons: FC<AlertButtonsProps> = ({ buttons, buttonsWrapProps }) => {
  const alertButtons: NonNullable<AlertButtonsProps['buttons']> = buttons ?? [
    [{ text: 'OK' }],
  ];

  return (
    <ThemedView marginTop={'m'} gap={'s'} {...buttonsWrapProps}>
      {alertButtons.map((row, rowIndex) => (
        <ThemedView
          key={`row_${row[0]?.text}_${rowIndex}`}
          flexDirection={'row'}
          gap={'s'}
        >
          {row.map(({ text, ...props }, buttonIndex) => (
            <AlertButton
              key={`button_${text}_${buttonIndex}`}
              text={text}
              {...props}
            />
          ))}
        </ThemedView>
      ))}
    </ThemedView>
  );
};

export default AlertButtons;
