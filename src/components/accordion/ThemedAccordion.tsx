import { IconSize } from '@jamadd/react-native-template-icons';
import { lazy, useLayoutEffect, useReducer, useState, type FC } from 'react';
import { Platform } from 'react-native';
import { useWindowDimensionsWidth } from '../../hooks/style';
import { useViewRef } from '../../hooks/view';
import type { ThemedAccordionProps } from '../../types/accordion';
import type { AnimatedThemedPressableProps } from '../../types/button';
import type { ThemedTextProps } from '../../types/text';
import type { ThemedViewProps } from '../../types/view';
import { BorderSize } from '../../utils/theme/const';
import ThemedPressable from '../button/ThemedPressable';
import ThemedIcon from '../icon/ThemedIcon';
import AnimatedThemedView from '../view/AnimatedThemedView';
import ThemedView from '../view/ThemedView';

let ThemedText: FC<ThemedTextProps>;
if (Platform.OS === 'web') {
  ThemedText = lazy(() => import('../text/ThemedText'));
} else {
  ThemedText = require('../text/ThemedText').default;
}

/**
 * A themed accordion component that expands and collapses content with smooth animations.
 * Features a clickable header with text and icon, and animates the height of the content area.
 * Supports customization of borders, colors, icons, and internal layout through comprehensive props.
 * @param props - Component props of type ThemedAccordionProps
 * @returns JSX element rendering an expandable/collapsible accordion
 * @example
 * <ThemedAccordion
 *   text="FAQ Section"
 *   iconNameOpened="up"
 *   iconNameClosed="down"
 * >
 *   <ThemedText>This is the accordion content</ThemedText>
 * </ThemedAccordion>
 */
const ThemedAccordion: FC<ThemedAccordionProps> = ({
  borderWidth = BorderSize.S,
  borderColor = 'themePri',
  wrapProps,
  headerWrapProps,
  text,
  textVariant,
  textFontSize,
  textFontWeight,
  textColor = 'textButton',
  textStyle,
  textProps,
  iconNameOpened = 'up',
  iconNameClosed = 'down',
  iconSize = IconSize.S,
  iconColor = 'textButton',
  iconStyle,
  iconProps,
  contentWrapProps,
  children,
}) => {
  const windowWidth = useWindowDimensionsWidth();
  const wrapRef = useViewRef();
  const headerRef = useViewRef();
  const contentRef = useViewRef();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [contentHeight, updateContentHeight] = useReducer(
    (_prevContentHeight, newContentHeight) => newContentHeight,
    0
  );
  const [opened, toggleAccordion] = useReducer(
    (prevOpened) => !prevOpened,
    false
  );
  useLayoutEffect(() => {
    const headerBounds = headerRef.current?.getBoundingClientRect();
    if (headerBounds) {
      setHeaderHeight(headerBounds.height);
    }
    const contentBounds = contentRef.current?.getBoundingClientRect();
    if (contentBounds) {
      updateContentHeight(contentBounds.height);
    }
  }, [
    text,
    textVariant,
    textFontSize,
    textFontWeight,
    iconSize,
    children,
    windowWidth,
  ]);

  const animatedStyle: AnimatedThemedPressableProps['animatedStyle'] = {
    width: '100%',
    height: opened ? contentHeight + headerHeight : headerHeight || undefined,
    transitionProperty: 'height',
    transitionDuration: 200,
  };
  const onContentLayout: ThemedViewProps['onLayout'] = ({
    nativeEvent: {
      layout: { height },
    },
  }) => {
    updateContentHeight(height);
  };

  return (
    <AnimatedThemedView
      ref={wrapRef}
      animatedStyle={animatedStyle}
      overflow={'hidden'}
      borderBottomWidth={borderWidth}
      borderColor={borderColor}
      {...wrapProps}
    >
      <ThemedPressable
        ref={headerRef}
        onPress={toggleAccordion}
        position={'absolute'}
        width={'100%'}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        padding={'s'}
        backgroundColor={'themePri'}
        {...headerWrapProps}
      >
        {text ? (
          <ThemedText
            variant={textVariant}
            fontSize={textFontSize}
            fontWeight={textFontWeight}
            color={textColor}
            style={textStyle}
            {...textProps}
          >
            {text}
          </ThemedText>
        ) : (
          <ThemedView />
        )}
        <ThemedIcon
          name={opened ? iconNameOpened : iconNameClosed}
          size={iconSize}
          color={iconColor}
          alignSelf={'flex-end'}
          style={iconStyle}
          {...iconProps}
        />
      </ThemedPressable>
      <ThemedView
        ref={contentRef}
        onLayout={onContentLayout}
        position={'absolute'}
        top={headerHeight}
        width={'100%'}
        padding={'s'}
        borderStartWidth={borderWidth}
        borderEndWidth={borderWidth}
        borderColor={borderColor}
        {...contentWrapProps}
      >
        {children}
      </ThemedView>
    </AnimatedThemedView>
  );
};

export default ThemedAccordion;
