import { useEffect, useState, type FC } from 'react';
import type { AppStateStatus } from 'react-native';
import type {
  AppStateContextVal,
  AppStateProviderProps,
} from '../../types/react';
import { AppStateContext } from '../../utils/react/const';
import {
  addAppStateBlurEventListener,
  addAppStateChangeEventListener,
  addAppStateFocusEventListener,
  addAppStateMemoryWarningEventListener,
} from '../../utils/react/func';

const AppStateProvider: FC<AppStateProviderProps> = ({
  enableStatusListener,
  enableBlurListener,
  enableFocusListener,
  enableMemoryWarningListener,
  children,
}) => {
  const [status, setStatus] = useState<AppStateStatus>('active');
  const [blurCount, setBlurCount] = useState(0);
  const [focusCount, setFocusCount] = useState(0);
  const [memoryWarningCount, setMemoryWarningCount] = useState(0);
  useEffect(() => {
    if (!enableStatusListener) {
      return;
    }

    const { remove } = addAppStateChangeEventListener((appState) => {
      setStatus(appState);
    });

    return remove;
  }, [enableStatusListener]);
  useEffect(() => {
    if (!enableBlurListener) {
      return;
    }

    const { remove } = addAppStateBlurEventListener(() => {
      setBlurCount((prevBlurCount) => prevBlurCount + 1);
    });

    return remove;
  }, [enableBlurListener]);
  useEffect(() => {
    if (!enableFocusListener) {
      return;
    }

    const { remove } = addAppStateFocusEventListener(() => {
      setFocusCount((prevFocusCount) => prevFocusCount + 1);
    });

    return remove;
  }, [enableFocusListener]);
  useEffect(() => {
    if (!enableMemoryWarningListener) {
      return;
    }

    const { remove } = addAppStateMemoryWarningEventListener(() => {
      setMemoryWarningCount(
        (prevMemoryWarningCount) => prevMemoryWarningCount + 1
      );
    });

    return remove;
  }, [enableMemoryWarningListener]);

  const appStateContextValue: AppStateContextVal = {
    status,
    blurCount,
    focusCount,
    memoryWarningCount,
  };

  return (
    <AppStateContext value={appStateContextValue}>{children}</AppStateContext>
  );
};

export default AppStateProvider;
