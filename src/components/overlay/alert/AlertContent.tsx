import type { FC } from 'react';
import type { AlertProps } from '../../../types/overlay';
import ThemedText from '../../text/ThemedText';

const AlertContent: FC<
  Pick<
    AlertProps,
    'title' | 'titleTextProps' | 'description' | 'descriptionTextProps'
  >
> = ({ title, titleTextProps, description, descriptionTextProps }) => {
  return (
    <>
      <ThemedText textAlign={'center'} fontWeight={'bold'} {...titleTextProps}>
        {title}
      </ThemedText>
      {!!description && (
        <ThemedText
          textAlign={'center'}
          variant={'textS'}
          {...descriptionTextProps}
        >
          {description}
        </ThemedText>
      )}
    </>
  );
};

export default AlertContent;
