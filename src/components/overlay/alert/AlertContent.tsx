import type { FC } from 'react';
import type { AlertProps } from '../../../types/overlay';
import ThemedText from '../../text/ThemedText';

const AlertContent: FC<
  Pick<AlertProps, 'title' | 'titleTextProps' | 'desc' | 'descTextProps'>
> = ({ title, titleTextProps, desc, descTextProps }) => {
  return (
    <>
      <ThemedText textAlign={'center'} fontWeight={'bold'} {...titleTextProps}>
        {title}
      </ThemedText>
      {!!desc && (
        <ThemedText textAlign={'center'} variant={'textS'} {...descTextProps}>
          {desc}
        </ThemedText>
      )}
    </>
  );
};

export default AlertContent;
