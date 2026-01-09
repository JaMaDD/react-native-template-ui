// Mock react-native-worklets first before reanimated
jest.mock('react-native-worklets', () => require('react-native-worklets/lib/module/mock'));

require('react-native-reanimated').setUpTests();

import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);
