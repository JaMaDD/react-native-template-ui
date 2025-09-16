import type { BorderSize } from '../utils/theme/const';
import type { ThemeBackgroundColorProps, ThemeSpacingProps } from './theme';

export type ThemedSeparatorProps = ThemeBackgroundColorProps &
  Pick<
    ThemeSpacingProps,
    | 'margin'
    | 'marginVertical'
    | 'marginHorizontal'
    | 'marginTop'
    | 'marginBottom'
    | 'marginLeft'
    | 'marginRight'
    | 'marginStart'
    | 'marginEnd'
    | 'm'
    | 'my'
    | 'mx'
    | 'mt'
    | 'mb'
    | 'ml'
    | 'mr'
    | 'ms'
    | 'me'
  > & {
    size?: BorderSize | number;
    vertical?: boolean;
  };
