import type { Theme } from './theme';
import type { PropsWithRequiredChildren } from './view';

export type ReactNativeTemplateProvidersProps = PropsWithRequiredChildren<{
  theme: Theme;
}>;
