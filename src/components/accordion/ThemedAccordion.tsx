import { IconSize } from '@jamadd/react-native-template-icons';
import { useRecyclingState } from '@shopify/flash-list';
import { lazy, useEffect, useLayoutEffect, type FC } from 'react';
import { useViewRef } from '../../hooks/view';
import type { ThemedAccordionProps } from '../../types/accordion';
import type { AnimatedThemedPressableProps } from '../../types/button';
import type { ThemedIconProps } from '../../types/icon';
import type { ThemedTextProps } from '../../types/text';
import type { ThemedViewProps } from '../../types/view';
import { isPlatformWeb } from '../../utils/common/func';
import { BorderSize } from '../../utils/theme/const';
import ThemedPressable from '../button/ThemedPressable';
import AnimatedThemedView from '../view/AnimatedThemedView';
import ThemedView from '../view/ThemedView';

let ThemedText: FC<ThemedTextProps>;
let ThemedIcon: FC<ThemedIconProps>;
if (isPlatformWeb()) {
  ThemedText = lazy(() => import('../text/ThemedText'));
  ThemedIcon = lazy(() => import('../icon/ThemedIcon'));
} else {
  ThemedText = require('../text/ThemedText').default;
  ThemedIcon = require('../icon/ThemedIcon').default;
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
  textNumberOfLines,
  textVariant,
  textFontSize,
  textFontWeight,
  textColor = 'textButton',
  textStyle,
  textProps,
  description,
  descriptionTextNumberOfLines,
  descriptionTextVariant = 'textS',
  descriptionTextFontSize,
  descriptionTextFontWeight,
  descriptionTextColor = 'textDesc',
  descriptionTextStyle,
  descriptionTextProps,
  iconNameOpened = 'up',
  iconNameClosed = 'down',
  iconSize = IconSize.S,
  iconColor = 'textButton',
  iconStyle,
  iconProps,
  iconComponent,
  contentWrapProps,
  animated = true,
  defaultOpened = false,
  onToggle,
  children,
}) => {
  const recyclingStateDeps = [
    text,
    textVariant,
    textFontSize,
    textFontWeight,
    iconSize,
    children,
  ];
  const wrapRef = useViewRef();
  const headerRef = useViewRef();
  const contentRef = useViewRef();
  const [headerHeight, setHeaderHeight] = useRecyclingState(
    0,
    recyclingStateDeps
  );
  const [contentHeight, setContentHeight] = useRecyclingState(
    0,
    recyclingStateDeps
  );
  const [opened, setOpened] = useRecyclingState(defaultOpened, [
    ...recyclingStateDeps,
    defaultOpened,
  ]);
  useLayoutEffect(() => {
    const headerBounds = headerRef.current?.getBoundingClientRect();
    if (headerBounds) {
      setHeaderHeight(headerBounds.height);
    }
    const contentBounds = contentRef.current?.getBoundingClientRect();
    if (contentBounds) {
      setContentHeight(contentBounds.height);
    }
  }, recyclingStateDeps);
  useEffect(() => {
    onToggle?.(opened);
  }, [onToggle, opened]);

  const animatedStyle: AnimatedThemedPressableProps['animatedStyle'] = {
    width: '100%',
    height: opened ? contentHeight + headerHeight : headerHeight || undefined,
    transitionProperty: animated ? 'height' : undefined,
    transitionDuration: animated ? 200 : undefined,
  };
  const toggleAccordion = () => {
    setOpened((prevOpened) => !prevOpened);
  };
  const onHeaderLayout: ThemedViewProps['onLayout'] = ({
    nativeEvent: {
      layout: { height },
    },
  }) => {
    setHeaderHeight(height);
  };
  const onContentLayout: ThemedViewProps['onLayout'] = ({
    nativeEvent: {
      layout: { height },
    },
  }) => {
    setContentHeight(height);
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
        onLayout={onHeaderLayout}
        position={'absolute'}
        width={'100%'}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        padding={'s'}
        backgroundColor={'themePri'}
        {...headerWrapProps}
      >
        <ThemedView flex={1} backgroundColor={'transparent'}>
          {!!text && (
            <ThemedText
              numberOfLines={textNumberOfLines}
              variant={textVariant}
              fontSize={textFontSize}
              fontWeight={textFontWeight}
              color={textColor}
              flex={1}
              style={textStyle}
              {...textProps}
            >
              {text}
            </ThemedText>
          )}
          {!!description && (
            <ThemedText
              numberOfLines={descriptionTextNumberOfLines}
              variant={descriptionTextVariant}
              fontSize={descriptionTextFontSize}
              fontWeight={descriptionTextFontWeight}
              color={descriptionTextColor}
              flex={1}
              style={descriptionTextStyle}
              {...descriptionTextProps}
            >
              {description}
            </ThemedText>
          )}
        </ThemedView>
        {iconComponent ?? (
          <ThemedIcon
            name={opened ? iconNameOpened : iconNameClosed}
            size={iconSize}
            color={iconColor}
            style={iconStyle}
            {...iconProps}
          />
        )}
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
