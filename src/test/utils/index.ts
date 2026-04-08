/**
 * Centralized testing utilities for react-native-template-ui
 * This module exports all testing utilities in one place for convenience
 */

// Re-export everything from @testing-library/react-native with custom render functions
export * from './testingLib';

// Re-export theme utility functions
export * from './func';

// Re-export test wrapper component
export { wrapper } from './const';

// Re-export test helpers
export * from './helpers';
