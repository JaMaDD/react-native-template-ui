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

export function hexToRgb(hex: string) {
  // Remove the '#' if present
  const cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;

  let r, g, b;
  let a = '1';
  if (cleanHex.length === 3) {
    r = parseInt(cleanHex.charAt(0) + cleanHex.charAt(0), 16);
    g = parseInt(cleanHex.charAt(1) + cleanHex.charAt(1), 16);
    b = parseInt(cleanHex.charAt(2) + cleanHex.charAt(2), 16);
  } else if (cleanHex.length === 6) {
    r = parseInt(cleanHex.substring(0, 2), 16);
    g = parseInt(cleanHex.substring(2, 4), 16);
    b = parseInt(cleanHex.substring(4, 6), 16);
  } else if (cleanHex.length === 8) {
    r = parseInt(cleanHex.substring(0, 2), 16);
    g = parseInt(cleanHex.substring(2, 4), 16);
    b = parseInt(cleanHex.substring(4, 6), 16);
    a = (parseInt(cleanHex.substring(6, 8), 16) / 255).toFixed(2); // Convert 0-255 to 0-1
  }

  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
