import { use as reactUse } from 'react';
import type { AppStateStatus } from 'react-native';
import { AppState } from 'react-native';
import { AppStateContext } from './const';
import { platform } from './const';

export function getAppStateContext() {
  return reactUse(AppStateContext);
}

export function isPlatformAndroid() {
  return platform === 'android';
}

export function isPlatformIOS() {
  return platform === 'ios';
}

export function isPlatformWeb() {
  return platform === 'web';
}

export function addAppStateChangeEventListener(
  callback: (appState: AppStateStatus) => void
) {
  return AppState.addEventListener('change', callback);
}

export function addAppStateFocusEventListener(callback: () => void) {
  return AppState.addEventListener('focus', callback);
}

export function addAppStateBlurEventListener(callback: () => void) {
  return AppState.addEventListener('blur', callback);
}

export function addAppStateMemoryWarningEventListener(callback: () => void) {
  return AppState.addEventListener('memoryWarning', callback);
}
