import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { useInsetsStyle, useWindowDimensionsHeight } from '../../hooks/style';
import type { ThemedScreenWrapProps } from '../../types/view';
import { composeStyles } from '../../utils/style/func';
import ThemedView from './ThemedView';

const ThemedScreenWrap: FC<ThemedScreenWrapProps> = ({
  style: themedScreenWrapStyle,
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
  ...props
}) => {
  const height = useWindowDimensionsHeight();
  const insetsStyle = useInsetsStyle({
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
  });

  const style = composeStyles<ViewStyle>(themedScreenWrapStyle, insetsStyle);

  return <ThemedView height={height} style={style} {...props} />;
};

export default ThemedScreenWrap;
