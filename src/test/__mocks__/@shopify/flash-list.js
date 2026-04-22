import React from 'react';
import { FlatList } from 'react-native';

let keyCounter = 0;

const MockFlashList = React.forwardRef((props, ref) => {
  return React.createElement(FlatList, { ...props, ref });
});

MockFlashList.displayName = 'FlashList';

module.exports = {
  FlashList: MockFlashList,
  MasonryFlashList: MockFlashList,
  useMappingHelper: () => ({
    getMappingKey: () => `mock-key-${keyCounter++}`,
  }),
};
