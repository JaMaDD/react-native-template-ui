import type { FC } from 'react';
import type { ThemedTextProps } from '../../types/text';
import Text from './Text';

const ThemedText: FC<ThemedTextProps> = (props) => (
  <Text color={'text'} {...props} />
);

export default ThemedText;
