import { renderHookAsync } from '@testing-library/react-native';
import { useTheme } from '../../hooks/theme';
import { wrapper } from './const';

async function getTheme() {
  return (await renderHookAsync(() => useTheme(), { wrapper })).result.current;
}

export async function getThemeColors() {
  return (await getTheme()).colors;
}

export async function getThemeSpacing() {
  return (await getTheme()).spacing;
}

export async function getThemeBreakpoints() {
  return (await getTheme()).breakpoints;
}

export async function getThemeZIndices() {
  return (await getTheme()).zIndices;
}

export async function getThemeBorderRadii() {
  return (await getTheme()).borderRadii;
}

export async function getThemeTextVariants() {
  return (await getTheme()).textVariants;
}
