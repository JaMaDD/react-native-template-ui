import { createTheme } from '@shopify/restyle';
import { StyleSheet } from 'react-native';

export enum Palette {
  Transparent = 'transparent',
  ThemePri = '#7ccf6b',
  ThemePriT = '#7ccf6b80',
  ThemeSec = '#0a8270',
  Black = '#000000',
  BlackT = '#00000080',
  White = '#ffffff',
  WhiteT = '#ffffff80',
  Grey = '#777777',
  GreyT = '#77777780',
  DarkGrey = '#121212',
  DarkGreyT = '#12121280',
  Silver = '#f0f0f0',
  Red = '#ff0000',
}

export enum Spacing {
  None = 0,
  XXXS = 2,
  XXS = 4,
  XS = 6,
  S = 10,
  M = 16,
  L = 26,
  XL = 42,
  XXL = 68,
  XXXL = 110,
}

export enum FontSize {
  XS = 12,
  S = 16,
  M = 20,
  L = 24,
  XL = 28,
}

const FontLineHeightRatio = 1.2;

export enum FontLineHeight {
  XS = FontSize.XS * FontLineHeightRatio,
  S = FontSize.S * FontLineHeightRatio,
  M = FontSize.M * FontLineHeightRatio,
  L = FontSize.L * FontLineHeightRatio,
  XL = FontSize.XL * FontLineHeightRatio,
}

export enum SwitchSize {
  S = 16,
  M = 22,
  L = 28,
}

export enum BorderSize {
  XS = StyleSheet.hairlineWidth,
  S = 1,
  M = 2,
  L = 3,
}

export enum BorderRadius {
  S = 12,
  M = 24,
  L = 36,
  Circle = 9999,
}

export enum ZIndex {
  Bottom = 0,
  Middle = 1,
  Top = 2,
}

const textVariants = {
  textXS: {
    fontSize: FontSize.XS,
    lineHeight: FontLineHeight.XS,
    color: 'text',
  },
  textS: {
    fontSize: FontSize.S,
    lineHeight: FontLineHeight.S,
    color: 'text',
  },
  textM: {
    fontSize: FontSize.M,
    lineHeight: FontLineHeight.M,
    color: 'text',
  },
  textL: {
    fontSize: FontSize.L,
    lineHeight: FontLineHeight.L,
    color: 'text',
  },
  textXL: {
    fontSize: FontSize.XL,
    lineHeight: FontLineHeight.XL,
    color: 'text',
  },
};

export const overlayMaxWidthPercent = '80%';

export const lightTheme = createTheme({
  colors: {
    transparent: Palette.Transparent,
    themePri: Palette.ThemePri,
    themePriT: Palette.ThemePriT,
    themeSec: Palette.ThemeSec,
    background: Palette.White,
    backgroundOverlay: Palette.BlackT,
    backgroundVideo: Palette.Black,
    text: Palette.DarkGrey,
    textOverlay: Palette.White,
    textBtn: Palette.White,
    border: Palette.Silver,
    separator: Palette.Silver,
    err: Palette.Red,
  },
  spacing: {
    none: Spacing.None,
    xxxs: Spacing.XXXS,
    xxs: Spacing.XXS,
    xs: Spacing.XS,
    s: Spacing.S,
    m: Spacing.M,
    l: Spacing.L,
    xl: Spacing.XL,
    xxl: Spacing.XXL,
    xxxl: Spacing.XXXL,
  },
  breakpoints: {
    smallPhone: 0,
    phone: 300,
    smallTablet: 600,
    tablet: 900,
    desktop: 1200,
  },
  zIndices: {
    bottom: ZIndex.Bottom,
    middle: ZIndex.Middle,
    top: ZIndex.Top,
  },
  borderRadii: {
    s: BorderRadius.S,
    m: BorderRadius.M,
    l: BorderRadius.L,
    circle: BorderRadius.Circle,
  },
  textVariants: {
    ...textVariants,
    textXSBold: {
      ...textVariants.textXS,
      fontWeight: 'bold',
    },
    textSBold: {
      ...textVariants.textS,
      fontWeight: 'bold',
    },
    textMBold: {
      ...textVariants.textM,
      fontWeight: 'bold',
    },
    textLBold: {
      ...textVariants.textL,
      fontWeight: 'bold',
    },
    textXLBold: {
      ...textVariants.textXL,
      fontWeight: 'bold',
    },
    defaults: textVariants.textM,
  },
});

export const darkTheme: typeof lightTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    background: Palette.DarkGrey,
    text: Palette.White,
  },
};
