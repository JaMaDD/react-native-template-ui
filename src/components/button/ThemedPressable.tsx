import { type FC } from 'react';
import { Pressable } from 'react-native';
import { useThemedPressable } from '../../hooks/button';
import type { ThemedPressableProps } from '../../types/button';

const ThemedPressable: FC<ThemedPressableProps> = (props) => {
  const themedPressableProps = useThemedPressable(props);

  return <Pressable {...themedPressableProps} />;
};

export default ThemedPressable;
