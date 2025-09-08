import { Dimensions, StyleSheet } from 'react-native';
import type { Style, StyleOrStyleProp } from '../../types/style';

export function composeStyles<T extends Style>(
  style1?: StyleOrStyleProp<T>,
  style2?: StyleOrStyleProp<T>
) {
  return StyleSheet.compose<T, T, T>(style1, style2);
}

export function flattenStyle<T extends Style>(style: StyleOrStyleProp<T>) {
  return StyleSheet.flatten<T>(style);
}

export function getWindowDimensions() {
  return Dimensions.get('window');
}

export function getWindowDimensionsWidth() {
  return getWindowDimensions().width;
}

export function getWindowDimensionsHeight() {
  return getWindowDimensions().height;
}

export function getWindowDimensionsScale() {
  return getWindowDimensions().scale;
}

export function getWindowDimensionsFontScale() {
  return getWindowDimensions().fontScale;
}
