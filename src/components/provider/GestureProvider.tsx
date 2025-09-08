import type { FC } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import type { GestureHandlerRootViewProps } from 'react-native-gesture-handler/lib/typescript/components/GestureHandlerRootView';

const GestureProvider: FC<GestureHandlerRootViewProps> = (props) => (
  <GestureHandlerRootView {...props} />
);

export default GestureProvider;
