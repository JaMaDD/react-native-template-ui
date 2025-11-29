import { useEffect, type FC } from 'react';
import {
  interpolate,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { useAnimationSharedVal } from '../../../hooks/reanimated';
import { useInsetsStyle } from '../../../hooks/style';
import type { ThemedToastProps } from '../../../types/overlay';
import type { AnimatedThemedViewProps } from '../../../types/view';
import {
  OverlayDismissResultType,
  overlayMaxWidthPercent,
  ToastDuration,
  ToastType,
} from '../../../utils/overlay/const';
import ThemedText from '../../text/ThemedText';
import AnimatedThemedView from '../../view/AnimatedThemedView';

const ThemedToast: FC<ThemedToastProps> = ({
  type = ToastType.Bottom,
  duration = ToastDuration.Short,
  onDismiss,
  top: propsTop,
  bottom: propsBottom,
  left: propsLeft,
  right: propsRight,
  insetsPadding,
  insetPaddingTop,
  insetPaddingBottom,
  insetPaddingLeft,
  insetPaddingRight,
  text,
  textVariant = 'textS',
  textFontSize,
  textFontWeight,
  textColor = 'textOverlay',
  textStyle,
  textProps,
  ...props
}) => {
  const showSharedVal = useAnimationSharedVal();
  const { paddingTop, paddingBottom, paddingLeft, paddingRight } =
    useInsetsStyle({
      insets: true,
      insetsPadding: insetsPadding ?? 'm',
      insetPaddingTop,
      insetPaddingBottom,
      insetPaddingLeft,
      insetPaddingRight,
    });
  const animatedStyle = useAnimatedStyle(() => {
    let outputY = 0;
    switch (type) {
      case ToastType.Top:
      case ToastType.TopLeft:
      case ToastType.TopRight:
        if (paddingTop) {
          outputY = -(paddingTop as number) * 2;
        }
        break;
      case ToastType.Bottom:
      case ToastType.BottomLeft:
      case ToastType.BottomRight:
        if (paddingBottom) {
          outputY = (paddingBottom as number) * 2;
        }
        break;
      default:
        break;
    }

    return {
      opacity: showSharedVal.value,
      transform: [
        { translateY: interpolate(showSharedVal.value, [0, 1], [outputY, 0]) },
      ],
    };
  }, [type, showSharedVal, paddingTop, paddingBottom]);
  useEffect(() => {
    showSharedVal.set(withTiming(1));
    const timeout = setTimeout(() => {
      showSharedVal.set(
        withTiming(0, undefined, () => {
          if (onDismiss) {
            scheduleOnRN(onDismiss, {
              resultType: OverlayDismissResultType.Toast,
              type,
              text,
              duration,
            });
          }
        })
      );
    }, duration);

    return () => {
      clearTimeout(timeout);
    };
  }, [text]);

  const top: AnimatedThemedViewProps['top'] = [
    ToastType.Top,
    ToastType.TopLeft,
    ToastType.TopRight,
  ].includes(type)
    ? (propsTop ?? paddingTop)
    : undefined;
  const bottom: AnimatedThemedViewProps['bottom'] = [
    ToastType.Bottom,
    ToastType.BottomLeft,
    ToastType.BottomRight,
  ].includes(type)
    ? (propsBottom ?? paddingBottom)
    : undefined;
  const left: AnimatedThemedViewProps['left'] = [
    ToastType.TopLeft,
    ToastType.BottomLeft,
  ].includes(type)
    ? (propsLeft ?? paddingLeft)
    : undefined;
  const right: AnimatedThemedViewProps['right'] = [
    ToastType.TopRight,
    ToastType.BottomRight,
  ].includes(type)
    ? (propsRight ?? paddingRight)
    : undefined;

  return (
    <AnimatedThemedView
      position={'absolute'}
      top={top}
      bottom={bottom}
      left={left}
      right={right}
      alignSelf={'center'}
      maxWidth={overlayMaxWidthPercent}
      paddingVertical={'xxs'}
      paddingHorizontal={'s'}
      backgroundColor={'backgroundOverlay'}
      style={animatedStyle}
      {...props}
    >
      <ThemedText
        numberOfLines={1}
        variant={textVariant}
        fontSize={textFontSize}
        fontWeight={textFontWeight}
        color={textColor}
        style={textStyle}
        {...textProps}
      >
        {text}
      </ThemedText>
    </AnimatedThemedView>
  );
};

export default ThemedToast;
