import type { ListRenderItemInfo } from '@shopify/flash-list';
import { type FC } from 'react';
import List from '../../components/list/List';
import ThemedText from '../../components/text/ThemedText';
import { renderAsync, screen } from '../utils';

interface TestItem {
  id: string;
  name: string;
}

const TestItemComponent: FC<ListRenderItemInfo<TestItem>> = ({ item }) => (
  <ThemedText testID={`item-${item.id}`}>{item.name}</ThemedText>
);

const testData: TestItem[] = [
  { id: '1', name: 'Item 1' },
  { id: '2', name: 'Item 2' },
  { id: '3', name: 'Item 3' },
];

describe('List', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(
      <List
        Item={TestItemComponent}
        data={testData}
        estimatedItemSize={50}
        testID={'list'}
      />
    );
    expect(screen.getByTestId('list')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render items', async () => {
    await renderAsync(
      <List
        Item={TestItemComponent}
        data={testData}
        estimatedItemSize={50}
        testID={'list-items'}
      />
    );
    expect(screen.getByTestId('list-items')).toBeOnTheScreen();
    expect(screen.getByText('Item 1')).toBeOnTheScreen();
    expect(screen.getByText('Item 2')).toBeOnTheScreen();
    expect(screen.getByText('Item 3')).toBeOnTheScreen();
  });

  test('Render with insets', async () => {
    const { toJSON } = await renderAsync(
      <List
        Item={TestItemComponent}
        data={testData}
        estimatedItemSize={50}
        insetTop={true}
        insetBottom={true}
        testID={'list-insets'}
      />
    );
    expect(screen.getByTestId('list-insets')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });
});
