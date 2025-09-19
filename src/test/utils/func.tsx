import {
  render as testRender,
  renderAsync as testRenderAsync,
} from '@testing-library/react-native';
import { type FC } from 'react';
import {
  lightTheme,
  ReactNativeTemplateProviders,
  type PropsWithRequiredChildren,
} from '../../index';

const Providers: FC<PropsWithRequiredChildren> = ({ children }) => {
  return (
    <ReactNativeTemplateProviders theme={lightTheme}>
      {children}
    </ReactNativeTemplateProviders>
  );
};

const customTestRender: typeof testRender = (ui, options) =>
  testRender(ui, { wrapper: Providers, ...options });

const customTestRenderAsync: typeof testRenderAsync = async (ui, options) =>
  await testRenderAsync(ui, { wrapper: Providers, ...options });

// re-export everything
export * from '@testing-library/react-native';

// override render method
export { customTestRender as render, customTestRenderAsync as renderAsync };
