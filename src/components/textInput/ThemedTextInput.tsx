import type { FC } from 'react';
import { TextInput } from 'react-native';
import { useThemedTextInput } from '../../hooks/textInput';
import type { ThemedTextInputProps } from '../../types/textInput';

const ThemedTextInput: FC<ThemedTextInputProps> = (props) => {
  const { restyle, ...themedTextInputProps } = useThemedTextInput(props);

  return <TextInput {...restyle} {...themedTextInputProps} />;
};

export default ThemedTextInput;
