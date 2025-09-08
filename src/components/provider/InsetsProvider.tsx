import type { FC } from 'react';
import {
  SafeAreaProvider,
  type SafeAreaProviderProps,
} from 'react-native-safe-area-context';

const InsetsProvider: FC<SafeAreaProviderProps> = (props) => (
  <SafeAreaProvider {...props} />
);

export default InsetsProvider;
