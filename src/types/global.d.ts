import type { lightTheme } from '../utils/theme/const';

declare global {
  type ReactNativeTemplateTheme = typeof lightTheme;
}
