import {
  useWindowDimensions as useRNWindowDimensions,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { InsetsStyleConfig } from '../types/style';
import { Orientation } from '../utils/style/const';
import { useThemeSpacing } from './theme';

export function useInsetsStyle({
  insets,
  insetTop,
  insetBottom,
  insetLeft,
  insetRight,
  insetsPadding,
  insetPaddingTop,
  insetPaddingBottom,
  insetPaddingLeft,
  insetPaddingRight,
}: InsetsStyleConfig) {
  const { top, bottom, left, right } = useSafeAreaInsets();
  const spacing = useThemeSpacing();

  const insetsStyle: Pick<
    ViewStyle,
    'paddingTop' | 'paddingBottom' | 'paddingLeft' | 'paddingRight'
  > = JSON.parse(
    JSON.stringify({
      paddingTop:
        (insetTop ?? insets)
          ? top + spacing[insetPaddingTop ?? insetsPadding ?? 'none']
          : undefined,
      paddingBottom:
        (insetBottom ?? insets)
          ? bottom + spacing[insetPaddingBottom ?? insetsPadding ?? 'none']
          : undefined,
      paddingLeft:
        (insetLeft ?? insets)
          ? left + spacing[insetPaddingLeft ?? insetsPadding ?? 'none']
          : undefined,
      paddingRight:
        (insetRight ?? insets)
          ? right + spacing[insetPaddingRight ?? insetsPadding ?? 'none']
          : undefined,
    })
  );

  return insetsStyle;
}

export function useWindowDimensions() {
  return useRNWindowDimensions();
}

export function useWindowDimensionsWidth() {
  return useWindowDimensions().width;
}

export function useWindowDimensionsHeight() {
  return useWindowDimensions().height;
}

export function useWindowDimensionsScale() {
  return useWindowDimensions().scale;
}

export function useWindowDimensionsFontScale() {
  return useWindowDimensions().fontScale;
}

export function useOrientation() {
  const { width, height } = useWindowDimensions();

  const orientation =
    width > height ? Orientation.Landscape : Orientation.Portrait;

  return orientation;
}
