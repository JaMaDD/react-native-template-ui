import type { Theme } from './theme';
import type { PropsWithRequiredChildren } from './view';

/**
 * Props for the root ReactNativeTemplate providers wrapper.
 *
 * This component sets up all necessary providers (theme, etc.) for the UI library.
 * Must wrap your application root to enable themed components.
 *
 * @example
 * ```tsx
 * import { ReactNativeTemplateProviders } from '@jamadd/react-native-template-ui';
 * import { theme } from './theme';
 *
 * function App() {
 *   return (
 *     <ReactNativeTemplateProviders theme={theme}>
 *       <YourApp />
 *     </ReactNativeTemplateProviders>
 *   );
 * }
 * ```
 */
export type ReactNativeTemplateProvidersProps = PropsWithRequiredChildren<{
  /** Theme configuration object containing colors, spacing, and other design tokens */
  theme: Theme;
}>;
