import type { FC } from 'react';
import type { Theme } from '../../types/theme';
import type { PropsWithRequiredChildren } from '../../types/view';
import GestureProvider from './GestureProvider';
import InsetsProvider from './InsetsProvider';
import ThemeProvider from './ThemeProvider';

const ReactNativeTemplateProviders: FC<
  PropsWithRequiredChildren<{ theme: Theme }>
> = ({ theme, children }) => {
  return (
    <GestureProvider>
      <InsetsProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </InsetsProvider>
    </GestureProvider>
  );
};

export default ReactNativeTemplateProviders;
