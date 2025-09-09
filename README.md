# React Native Template Lib

**React Native Template Lib** provides a set of UI components designed by **JaMa D&D**.

All UI components are built on top of different common React Native packages to provide great performace, usability and flexibility.

## Features

- Comprehensive UI components for building React Native applications with ease
- Built on top of popular packages like [`React Native Reanimated`](https://docs.swmansion.com/react-native-reanimated/), [`React Native Gesture Handler`](https://docs.swmansion.com/react-native-gesture-handler/) and [`FlashList`](https://shopify.github.io/flash-list/)
- Supports theming and customization with [`Restyle`](https://shopify.github.io/restyle/)
- Supports edge-to-edge design with [`React Native Safe Area Context`](https://appandflow.github.io/react-native-safe-area-context/)

## Prerequisites

**React Native Template Lib** requires the following dependencies to function properly:

- [@jamadd/react-native-template-icons](https://github.com/jamadd/react-native-template-icons/#installation)
- [@shopify/flash-list](https://shopify.github.io/flash-list/docs/#installation)
- [@shopify/restyle](https://shopify.github.io/restyle/#installation)
- [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/docs/fundamentals/installation)
- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/#installation)
- [react-native-safe-area-context](https://appandflow.github.io/react-native-safe-area-context/)
- [react-native-worklets](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/#dependencies)

You may want to check the documentation of each dependency for installation and setup instructions.

```sh
yarn add @jamadd/react-native-template-icons @shopify/flash-list @shopify/restyle react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-worklets
```

or

```sh
npm install @jamadd/react-native-template-icons @shopify/flash-list @shopify/restyle react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-worklets
```

## Installation

```sh
yarn add @jamadd/react-native-template-lib
```

or

```sh
npm install @jamadd/react-native-template-lib
```

## Usage

### Setup your theme

1. Create a theme by extending the default theme or creating a new one

```ts
import { lightTheme } from '@jamadd/react-native-template-lib';
import { createTheme } from '@shopify/restyle';

// Minimal example of creating a custom theme by extending the default light theme
const customTheme = createTheme({
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    themePri: '#ff6347',
    themePriT: '#ff634780',
    themeSec: '#4682b4',
  },
});

// Create a new theme from scratch
const customTheme = createTheme({
  colors: {},
});
```

2. Override the default theme's type by declaring the global type `ReactNativeTemplateTheme` in `global.d.ts`

```ts
declare global {
  type ReactNativeTemplateTheme = typeof customTheme;
}
```

```ts
import {} from '@jamadd/react-native-template-lib';
```

## Available Components

### Buttons

- AnimatedThemedPressable
- ThemedBtn
- ThemedIconBtn
- ThemedIconTextBtn
- ThemedPressable

### List

- List

### Icons and Texts

- ThemedIcon
- ThemedIconText
- ThemedText

### Loading Indicator

- ThemedLoading

### Overlays

- ActionSheet
- Alert
- ThemedLoadingModal
- ThemedModal
- ThemedToast

### Providers

- GestureProvider
- InsetsProvider
- ThemeProvider

### Separator

- ThemedSeparator

### Switch

- ThemedSwitch

### Views

- AnimatedThemedView
- ThemedScreenWrap
- ThemedScrollView
- ThemedView

## Demo Applications

TODO

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
