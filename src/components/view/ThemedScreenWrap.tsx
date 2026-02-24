import { useEffect, type FC } from 'react';
import type { ViewStyle } from 'react-native';
import { useInsetsStyle } from '../../hooks/style';
import type { ThemedScreenWrapProps } from '../../types/view';
import { composeStyles } from '../../utils/style/func';
import ThemedView from './ThemedView';

const ThemedScreenWrap: FC<ThemedScreenWrapProps> = ({
  effectSetup,
  effectCleanup,
  effectDependencies = [],
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
  useEffect(() => {
    effectSetup?.();

    return effectCleanup;
  }, effectDependencies);

  const style = composeStyles<ViewStyle>(themedScreenWrapStyle, insetsStyle);

  return <ThemedView flex={1} style={style} {...props} />;
};

export default ThemedScreenWrap;
