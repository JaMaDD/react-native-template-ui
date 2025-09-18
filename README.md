# React Native Template UI

**React Native Template UI** provides a set of UI components designed by **JaMa D&D**.

All UI components are built on top of different common React Native packages to provide great performace, usability and flexibility.

## Features

- Comprehensive UI components for building React Native applications with ease
- Built on top of popular packages like [`React Native Reanimated`](https://docs.swmansion.com/react-native-reanimated/), [`React Native Gesture Handler`](https://docs.swmansion.com/react-native-gesture-handler/) and [`FlashList`](https://shopify.github.io/flash-list/)
- Supports theming and customization with [`Restyle`](https://shopify.github.io/restyle/)
- Supports edge-to-edge design with [`React Native Safe Area Context`](https://appandflow.github.io/react-native-safe-area-context/)

## Prerequisites

**React Native Template UI** requires the following dependencies to function properly:

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
yarn add @jamadd/react-native-template-ui
```

or

```sh
npm install @jamadd/react-native-template-ui
```

## Usage

### Creating a Custom Theme

To create a look and feel that matches your application/brand, you **should** create a custom theme by following these steps:

1. Create a theme by extending the default theme or creating a theme from scratch.
   1. Extending the default themes
      <details>
      <summary>Click to expand</summary>

      ```ts
      import { lightTheme, darkTheme } from '@jamadd/react-native-template-ui';
      import { createTheme } from '@shopify/restyle';

      // Minimal example of creating custom light & dark themes by    extending the default themes
      const customLightTheme = createTheme({
        ...lightTheme,
        colors: {
          ...lightTheme.colors,
          theme: '#ff6347',
        },
      });

      const customDarkTheme = createTheme({
        ...darkTheme,
        colors: {
          ...darkTheme.colors,
          theme: customLightTheme.colors.theme,
        },
      });
      ```

      </details>

   2. Or creating themes from scratch
      <details>
      <summary>Click to expand</summary>

      ```ts
      import { createTheme } from '@shopify/restyle';

      // Example of creating light & dark themes from scratch (theme structure must follow the default themes)
      const customLightTheme = createTheme({
        colors: {
          transparent: YOUR_CUSTOM_COLOR,
          theme: YOUR_CUSTOM_COLOR,
          background: YOUR_CUSTOM_COLOR,
          backgroundOverlay: YOUR_CUSTOM_COLOR,
          text: YOUR_CUSTOM_COLOR,
          textOverlay: YOUR_CUSTOM_COLOR,
          textBtn: YOUR_CUSTOM_COLOR,
          border: YOUR_CUSTOM_COLOR,
          separator: YOUR_CUSTOM_COLOR,
          err: YOUR_CUSTOM_COLOR,
        },
        spacing: {
          none: 0,
          xxxs: YOUR_CUSTOM_SPACING,
          xxs: YOUR_CUSTOM_SPACING,
          xs: YOUR_CUSTOM_SPACING,
          s: YOUR_CUSTOM_SPACING,
          m: YOUR_CUSTOM_SPACING,
          l: YOUR_CUSTOM_SPACING,
          xl: YOUR_CUSTOM_SPACING,
          xxl: YOUR_CUSTOM_SPACING,
          xxxl: YOUR_CUSTOM_SPACING,
        },
        breakpoints: {
          smallPhone: YOUR_CUSTOM_BREAKPOINT,
          phone: YOUR_CUSTOM_BREAKPOINT,
          smallTablet: YOUR_CUSTOM_BREAKPOINT,
          tablet: YOUR_CUSTOM_BREAKPOINT,
          desktop: YOUR_CUSTOM_BREAKPOINT,
        },
        zIndices: {
          bottom: YOUR_CUSTOM_Z_INDEX,
          middle: YOUR_CUSTOM_Z_INDEX,
          top: YOUR_CUSTOM_Z_INDEX,
        },
        borderRadii: {
          s: YOUR_CUSTOM_RADIUS,
          m: YOUR_CUSTOM_RADIUS,
          l: YOUR_CUSTOM_RADIUS,
          circle: YOUR_CUSTOM_RADIUS,
        },
        textVariants: {
          textXS: YOUR_CUSTOM_TEXT_VARIANT,
          textXSBold: YOUR_CUSTOM_TEXT_VARIANT,
          textS: YOUR_CUSTOM_TEXT_VARIANT,
          textSBold: YOUR_CUSTOM_TEXT_VARIANT,
          textM: YOUR_CUSTOM_TEXT_VARIANT,
          textMBold: YOUR_CUSTOM_TEXT_VARIANT,
          textL: YOUR_CUSTOM_TEXT_VARIANT,
          textLBold: YOUR_CUSTOM_TEXT_VARIANT,
          textXL: YOUR_CUSTOM_TEXT_VARIANT,
          textXLBold: YOUR_CUSTOM_TEXT_VARIANT,
          defaults: YOUR_CUSTOM_TEXT_VARIANT,
        },
      });

      const customDarkTheme = createTheme({
        ...customLightTheme,
        colors: {
          ...customLightTheme.colors,
          background: YOUR_CUSTOM_COLOR,
          text: YOUR_CUSTOM_COLOR,
        },
      });
      ```

      </details>

   Both extended and from-scratch themes can add more custom properties or override existing properties as needed.

   For more information on how to create a theme, you may refer to the [Restyle documentation](https://shopify.github.io/restyle/fundamentals/defining-your-theme).

2. Override the default theme's type by declaring the global type `ReactNativeTemplateTheme` in `global.d.ts`.

   ```ts
   declare global {
     type ReactNativeTemplateTheme = typeof customLightTheme;
   }
   ```

### Wrapping Your Application with Providers

Wrap your application with ReactNativeTemplateProviders (which includes GestureProvider, InsetsProvider and ThemeProvider).

```tsx
import {
  ReactNativeTemplateProviders,
  useIsDarkColorScheme,
} from '@jamadd/react-native-template-ui';

const isDarkColorScheme = useIsDarkColorScheme();

<ReactNativeTemplateProviders
  theme={isDarkColorScheme ? customDarkTheme : customLightTheme}
>
  {/* Your app code */}
</ReactNativeTemplateProviders>;
```

### Using Components

Now you can use the components provided by **React Native Template UI** in your application.

```tsx
import { ThemedBtn } from '@jamadd/react-native-template-ui';

<ThemedBtn
  onPress={() => {
    console.log('Button pressed');
  }}
  text={'Press Me'}
/>;
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
