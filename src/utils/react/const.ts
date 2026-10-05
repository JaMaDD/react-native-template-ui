import { createContext } from 'react';
import { Platform } from 'react-native';
import type { AppStateContextVal } from '../../types/react';

export const AppStateContext = createContext<AppStateContextVal>({
  status: 'active',
  blurCount: 0,
  focusCount: 0,
  memoryWarningCount: 0,
});

export const platform = Platform.OS;
