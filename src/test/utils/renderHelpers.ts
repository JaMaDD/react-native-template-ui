import React, { type ReactElement } from 'react';
import { renderAsync } from './testingLib';

/**
 * Helper function to render a component and return common test utilities
 */
export async function renderComponent<T>(
  component: ReactElement,
  options?: Parameters<typeof renderAsync>[1]
) {
  const result = await renderAsync(component, options);
  return {
    ...result,
    toJSON: result.toJSON,
  };
}

/**
 * Helper to create a simple component wrapper for testing
 * Useful when you need to test with default props
 */
export function createTestComponent<P extends object>(
  Component: React.ComponentType<P>,
  defaultProps: Partial<P> = {}
): React.FC<Partial<P>> {
  return function TestWrapper(props) {
    return React.createElement(Component, {
      ...(defaultProps as P),
      ...(props as P),
    });
  };
}
