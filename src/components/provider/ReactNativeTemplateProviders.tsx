import type { FC } from 'react';
import type { ReactNativeTemplateProvidersProps } from '../../types/provider';
import GestureProvider from './GestureProvider';
import InsetsProvider from './InsetsProvider';
import ThemeProvider from './ThemeProvider';

const ReactNativeTemplateProviders: FC<ReactNativeTemplateProvidersProps> = ({
  theme,
  children,
}) => {
  return (
    <GestureProvider>
      <InsetsProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </InsetsProvider>
    </GestureProvider>
  );
};

export default ReactNativeTemplateProviders;
