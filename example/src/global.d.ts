import type { customTheme } from './const';

declare global {
  type ReactNativeTemplateTheme = typeof customTheme;
}
