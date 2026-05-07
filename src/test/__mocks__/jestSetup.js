// Mock react-native-worklets before importing reanimated
const mockSerializableMappingCache = new Map();
jest.mock('react-native-worklets', () => ({
  useSharedValue: jest.fn((value) => ({ value })),
  useWorklet: jest.fn((fn) => fn),
  runOnUI: jest.fn((fn) => fn),
  runOnJS: jest.fn((fn) => fn),
  createSerializable: jest.fn((value) => value),
  isSerializable: jest.fn(() => false),
  isWorkletFunction: jest.fn(() => false),
  RuntimeKind: { UI: 'ui', JS: 'js' },
  scheduleOnUI: jest.fn((fn) => fn()),
  scheduleOnRN: jest.fn((fn) => fn()),
  serializableMappingCache: mockSerializableMappingCache,
  makeShareable: jest.fn((value) => value),
}));

// Mock global animation timestamp
global._getAnimationTimestamp = () => Date.now();
global.__frameTimestamp = Date.now();

require('react-native-reanimated').setUpTests();

import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);
