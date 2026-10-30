import List from '../../components/list/List';
import ThemedText from '../../components/text/ThemedText';
import { renderAsync } from '../utils';

const mockData = [
  { id: '1', text: 'Item 1' },
  { id: '2', text: 'Item 2' },
  { id: '3', text: 'Item 3' },
];

const ItemComponent = ({ item }: { item: { id: string; text: string } }) => (
  <ThemedText>{item.text}</ThemedText>
);

describe('List', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(
      <List
        data={mockData}
        Item={ItemComponent}
        estimatedItemSize={50}
        testID="list"
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render with data', async () => {
    const { toJSON } = await renderAsync(
      <List
        data={mockData}
        Item={ItemComponent}
        estimatedItemSize={50}
        testID="list"
      />
    );
    expect(toJSON()).toBeTruthy();
  });

  test('Render empty list', async () => {
    const { toJSON } = await renderAsync(
      <List data={[]} Item={ItemComponent} estimatedItemSize={50} testID="list" />
    );
    expect(toJSON()).toBeTruthy();
  });

  test('Render with insets', async () => {
    const { toJSON } = await renderAsync(
      <List
        data={mockData}
        Item={ItemComponent}
        estimatedItemSize={50}
        insetTop={true}
        insetBottom={true}
        testID="list"
      />
    );
    expect(toJSON()).toBeTruthy();
  });
});
