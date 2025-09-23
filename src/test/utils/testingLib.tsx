import {
  render as testRender,
  renderAsync as testRenderAsync,
} from '@testing-library/react-native';
import { wrapper } from './const';

const customTestRender: typeof testRender = (ui, options) =>
  testRender(ui, { wrapper, ...options });

const customTestRenderAsync: typeof testRenderAsync = async (ui, options) =>
  await testRenderAsync(ui, { wrapper, ...options });

// re-export everything
export * from '@testing-library/react-native';

// override render method
export { customTestRender as render, customTestRenderAsync as renderAsync };
