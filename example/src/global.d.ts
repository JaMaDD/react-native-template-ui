import type { customLightTheme } from './const';

declare global {
  type ReactNativeTemplateTheme = typeof customLightTheme;
}
