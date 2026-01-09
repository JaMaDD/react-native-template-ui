# Testing Utilities

This directory contains centralized testing utilities for the react-native-template-ui package.

## Structure

```
src/test/
├── __mocks__/          # Mock files for Jest
│   ├── jestSetup.js    # Global Jest setup (worklets, safe-area-context mocks)
│   └── file-mock.js    # Mock for file imports
├── __tests__/          # Test files for all UI components
└── utils/              # Testing utilities
    ├── const.ts        # Test wrapper component with providers
    ├── func.ts         # Theme utility functions (colors, spacing, etc.)
    ├── testingLib.tsx  # Custom render functions with wrapper
    ├── helpers.ts      # Common test helper functions
    └── index.ts        # Main export file
```

## Usage

### Basic Component Test

```typescript
import ThemedButton from '../../components/button/ThemedButton';
import { renderAsync, screen } from '../utils';

describe('ThemedButton', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(
      <ThemedButton text="Click Me" onPress={() => {}} />
    );
    expect(screen.getByText('Click Me')).toBeOnTheScreen();
    expect(toJSON()).toMatchSnapshot();
  });
});
```

### Testing with Theme Values

```typescript
import { renderAsync, screen, getThemeColors } from '../utils';

test('Change color', async () => {
  const { themePri } = await getThemeColors();
  await renderAsync(<ThemedText color="themePri">Colored</ThemedText>);
  expect(screen.getByText('Colored')).toHaveStyle({ color: themePri });
});
```

### Testing Components with Timers

```typescript
import { renderAsync, setupFakeTimers, cleanupFakeTimers, advanceTimers } from '../utils';

describe('AnimatedComponent', () => {
  beforeEach(() => {
    setupFakeTimers();
  });

  afterEach(() => {
    cleanupFakeTimers();
  });

  test('Animation completes', async () => {
    await renderAsync(<AnimatedComponent />);
    advanceTimers(1000); // Advance 1 second
    // Assert animation state
  });
});
```

### Testing User Interactions

```typescript
import { renderAsync, screen, userEvent } from '../utils';

test('Press callback', async () => {
  const onPress = jest.fn();
  await renderAsync(<ThemedButton text="Press Me" onPress={onPress} />);
  
  const user = userEvent.setup();
  await user.press(screen.getByText('Press Me'));
  
  expect(onPress).toHaveBeenCalledTimes(1);
});
```

## Available Utilities

### Render Functions

- `render` / `renderAsync` - Render components with all providers (Theme, Gesture, Insets)
- `renderHookAsync` - Render hooks with providers

### Theme Utilities

- `getThemeColors()` - Get theme color values
- `getThemeSpacing()` - Get theme spacing values
- `getThemeBreakpoints()` - Get theme breakpoint values
- `getThemeZIndices()` - Get theme z-index values
- `getThemeBorderRadii()` - Get theme border radius values
- `getThemeTextVariants()` - Get theme text variant values
- `hexToRgb(hex)` - Convert hex colors to rgba format for testing

### Test Helpers

- `setupFakeTimers()` - Setup fake timers with Date.now() mock
- `cleanupFakeTimers()` - Cleanup timers and restore mocks
- `advanceTimers(ms)` - Advance fake timers by milliseconds
- `TestIds` - Common test ID constants
- `TestData` - Common test data constants

### Screen Queries

All queries from @testing-library/react-native are available:

- `screen.getByText(text)`
- `screen.getByRole(role)`
- `screen.getByTestId(testId)`
- `screen.queryByText(text)`
- etc.

### User Events

- `userEvent.setup()` - Setup user event instance
- `user.press(element)` - Simulate press event
- `user.type(element, text)` - Simulate typing
- etc.

## Best Practices

1. **Always use `renderAsync`** for component rendering to ensure proper async handling
2. **Use theme utilities** instead of hardcoding color/spacing values
3. **Setup/cleanup timers** in beforeEach/afterEach when testing animations
4. **Use snapshots** for visual regression testing
5. **Test user interactions** with userEvent for realistic behavior
6. **Use semantic queries** (getByRole, getByText) over testID when possible
7. **Centralize common patterns** in the helpers file

## Writing New Tests

When adding tests for a new component:

1. Create a new test file in `__tests__/` named `<component>.test.tsx`
2. Import utilities from `../utils`
3. Write describe blocks for each exported component
4. Include at minimum: render test, snapshot test, and interaction tests
5. Update snapshots with `yarn test-snapshot <test-file>`

## Running Tests

```bash
# Run all tests
yarn test

# Run specific test file
yarn test <filename>

# Update snapshots
yarn test-snapshot

# Watch mode
yarn test-watch
```
