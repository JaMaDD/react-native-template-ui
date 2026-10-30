import ThemedText from '../../components/text/ThemedText';
import { renderAsync, screen } from '../utils';

describe('ThemedText', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(<ThemedText>Hello World</ThemedText>);
    expect(screen.getByText('Hello World')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render with text content', async () => {
    await renderAsync(<ThemedText>Test Content</ThemedText>);
    expect(screen.getByText('Test Content')).toBeOnTheScreen();
  });

  test('Render with custom color', async () => {
    await renderAsync(<ThemedText color="themeSec">Colored Text</ThemedText>);
    expect(screen.getByText('Colored Text')).toBeOnTheScreen();
  });

  test('Render with custom font size', async () => {
    await renderAsync(<ThemedText fontSize={20}>Large Text</ThemedText>);
    expect(screen.getByText('Large Text')).toBeOnTheScreen();
  });

  test('Render with numberOfLines', async () => {
    await renderAsync(<ThemedText numberOfLines={1}>Single Line</ThemedText>);
    const text = screen.getByText('Single Line');
    expect(text).toBeOnTheScreen();
    expect(text).toHaveProp('numberOfLines', 1);
  });
});
