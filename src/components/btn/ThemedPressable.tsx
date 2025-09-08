import { type FC } from 'react';
import { Pressable } from 'react-native';
import { useThemedPressable } from '../../hooks/btn';
import type { ThemedPressableProps } from '../../types/btn';

const ThemedPressable: FC<ThemedPressableProps> = (props) => {
  const { onPress, style, restyle } = useThemedPressable(props);

  return <Pressable onPress={onPress} style={style} {...restyle} />;
};

export default ThemedPressable;
