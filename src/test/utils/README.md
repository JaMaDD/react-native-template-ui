# Test Utilities Documentation

This directory contains centralized testing utilities for the React Native Template UI component library.

## Overview

The test utilities provide a consistent and reusable set of tools for testing UI components with Jest and React Native Testing Library.

## Directory Structure

```
src/test/
├── __mocks__/           # Jest mocks
│   ├── @shopify/        # FlashList mock
│   └── jestSetup.js     # Global test setup
├── __tests__/           # Component tests
└── utils/               # Shared test utilities
    ├── const.ts         # Test wrapper configuration
    ├── func.ts          # Theme helper functions
    ├── index.ts         # Centralized exports
    ├── renderHelpers.ts # Rendering utilities
    ├── testConstants.ts # Common test constants
    ├── testingLib.tsx   # Custom render functions
    └── timer.ts         # Timer management utilities
```

## Available Utilities

### Rendering Utilities

#### `renderAsync(component, options)`
Asynchronous version of render that wraps components with the theme provider.

```typescript
import { renderAsync, screen } from '../utils';

test('renders component', async () => {
  await renderAsync(<MyComponent />);
  expect(screen.getByText('Hello')).toBeOnTheScreen();
});
```

#### `renderComponent(component, options)`
Helper that returns commonly used test utilities.

```typescript
import { renderComponent } from '../utils';

test('renders and snapshots', async () => {
  const { toJSON } = await renderComponent(<MyComponent />);
  expect(toJSON()).toMatchSnapshot();
});
```

### Timer Utilities

#### `setupFakeTimers()`
Initializes Jest fake timers for testing animations and delays.

```typescript
import { setupFakeTimers, cleanupFakeTimers } from '../utils';

beforeEach(() => {
  setupFakeTimers();
});

afterEach(() => {
  cleanupFakeTimers();
});
```

#### `advanceTimersByTime(duration)`
Advances timers by a specific duration in milliseconds.

```typescript
import { advanceTimersByTime } from '../utils';

test('animation completes', async () => {
  await renderAsync(<AnimatedComponent />);
  advanceTimersByTime(300); // Advance by 300ms
  // Assert animation state
});
```

### Theme Utilities

#### `getThemeColors()`
Returns the current theme colors for testing.

```typescript
import { getThemeColors } from '../utils';

test('applies correct colors', async () => {
  const { themePri, background } = await getThemeColors();
  await renderAsync(<ThemedComponent />);
  // Assert colors match theme
});
```

#### `getThemeSpacing()`
Returns theme spacing values.

```typescript
import { getThemeSpacing } from '../utils';

test('applies spacing', async () => {
  const { s, m, l } = await getThemeSpacing();
  // Use spacing in assertions
});
```

#### `hexToRgb(hex)`
Converts hex color to RGB format for animated style testing.

```typescript
import { hexToRgb } from '../utils';

test('animated color', async () => {
  const { themePri } = await getThemeColors();
  expect(element).toHaveAnimatedStyle({
    backgroundColor: hexToRgb(themePri),
  });
});
```

### Test Constants

#### `TEST_IDS`
Common test IDs used across components.

```typescript
import { TEST_IDS } from '../utils';

await renderAsync(<Switch testID={TEST_IDS.SWITCH_THUMB} />);
```

#### `ANIMATION_DURATIONS`
Standard animation durations.

```typescript
import { ANIMATION_DURATIONS, advanceTimersByTime } from '../utils';

advanceTimersByTime(ANIMATION_DURATIONS.DEFAULT);
```

#### `ROLES`
Common accessibility roles for querying elements.

```typescript
import { ROLES, screen } from '../utils';

const button = screen.getByRole(ROLES.BUTTON);
```

## Testing Patterns

### Basic Component Test

```typescript
import MyComponent from '../../components/MyComponent';
import { renderAsync, screen } from '../utils';

describe('MyComponent', () => {
  test('Render & Snapshot', async () => {
    const { toJSON } = await renderAsync(<MyComponent />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('displays text', async () => {
    await renderAsync(<MyComponent text="Hello" />);
    expect(screen.getByText('Hello')).toBeOnTheScreen();
  });
});
```

### Testing with User Interactions

```typescript
import { renderAsync, screen, userEvent } from '../utils';

test('handles press', async () => {
  const onPress = jest.fn();
  await renderAsync(<Button onPress={onPress} testID="btn" />);
  
  const user = userEvent.setup();
  await user.press(screen.getByTestId('btn'));
  
  expect(onPress).toHaveBeenCalledTimes(1);
});
```

### Testing Animated Components

```typescript
import { renderAsync, setupFakeTimers, cleanupFakeTimers, advanceTimersByTime } from '../utils';

describe('AnimatedComponent', () => {
  beforeEach(() => {
    setupFakeTimers();
  });

  afterEach(() => {
    cleanupFakeTimers();
  });

  test('animates on press', async () => {
    await renderAsync(<AnimatedComponent />);
    const user = userEvent.setup();
    await user.press(screen.getByTestId('animated'));
    
    advanceTimersByTime(300);
    // Assert animation state
  });
});
```

### Testing with Theme Colors

```typescript
import { renderAsync, getThemeColors, hexToRgb } from '../utils';

test('uses theme colors', async () => {
  const { themePri } = await getThemeColors();
  await renderAsync(<ThemedComponent />);
  
  expect(screen.getByTestId('element')).toHaveAnimatedStyle({
    backgroundColor: hexToRgb(themePri),
  });
});
```

## Mocks

### FlashList Mock
The `@shopify/flash-list` package is mocked to use React Native's `FlatList` for testing.

### Worklets Mock
React Native Worklets is mocked to support testing of Reanimated components without native dependencies.

### Safe Area Context Mock
The safe area context is mocked to provide consistent inset values during testing.

## Best Practices

1. **Use renderAsync**: Always use `renderAsync` instead of `render` to ensure proper theme provider wrapping.

2. **Cleanup timers**: Always cleanup fake timers in `afterEach` to prevent test interference.

3. **Use testID**: For elements without accessible roles, use `testID` props for reliable querying.

4. **Snapshot testing**: Create snapshots for visual regression testing, but don't rely solely on them.

5. **Avoid implementation details**: Query by text, role, or testID rather than component internals.

6. **Test user behavior**: Focus on testing what users see and do, not implementation details.

## Running Tests

```bash
# Run all tests
yarn test

# Update snapshots
yarn test-snapshot

# Watch mode
yarn test-watch

# With coverage
yarn test --coverage
```

## Coverage Guidelines

- All public components should have tests
- Aim for meaningful coverage, not 100%
- Test user-facing behavior, not implementation
- Internal/helper components can be tested via their public APIs
