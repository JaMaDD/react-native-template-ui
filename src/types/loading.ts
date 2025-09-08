import type { ActivityIndicatorProps } from 'react-native';
import type { ThemeBaseProps, ThemeColorProps } from './theme';

export type LoadingProps = Omit<ActivityIndicatorProps, 'color'> & {
  color?: ThemeColorProps['color'];
};

export type ThemedLoadingProps = LoadingProps & ThemeBaseProps;

export type CustomThemedLoadingProps = {
  loadingSize?: ThemedLoadingProps['size'];
  loadingColor?: ThemedLoadingProps['color'];
  loadingProps?: Omit<ThemedLoadingProps, 'size' | 'color'>;
};
