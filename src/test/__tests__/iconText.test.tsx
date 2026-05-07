import { IconSize } from '@jamadd/react-native-template-icons';
import ThemedIconText from '../../components/text/ThemedIconText';
import { renderAsync, screen } from '../utils';

describe('ThemedIconText', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(
      <ThemedIconText iconName="home" text="Home" />
    );
    expect(screen.getByText('Home')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });

  test('Render with icon and text', async () => {
    await renderAsync(<ThemedIconText iconName="star" text="Favorite" />);
    expect(screen.getByText('Favorite')).toBeOnTheScreen();
  });

  test('Render with flip=true', async () => {
    await renderAsync(
      <ThemedIconText iconName="arrow-right" text="Next" flip={true} />
    );
    expect(screen.getByText('Next')).toBeOnTheScreen();
  });

  test('Render with custom icon size', async () => {
    await renderAsync(
      <ThemedIconText
        iconName="settings"
        text="Settings"
        iconSize={IconSize.L}
      />
    );
    expect(screen.getByText('Settings')).toBeOnTheScreen();
  });

  test('Render with custom colors', async () => {
    await renderAsync(
      <ThemedIconText
        iconName="heart"
        text="Like"
        iconColor="themeSec"
        textColor="themePri"
      />
    );
    expect(screen.getByText('Like')).toBeOnTheScreen();
  });
});
