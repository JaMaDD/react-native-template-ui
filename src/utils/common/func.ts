import { platform } from './const';

export function isPlatformAndroid() {
  return platform === 'android';
}

export function isPlatformIOS() {
  return platform === 'ios';
}

export function isPlatformWeb() {
  return platform === 'web';
}
