import type { BorderSize } from '../utils/theme/const';
import type { ThemedPressableProps } from './button';
import type { CustomThemedIconProps } from './icon';
import type { CustomThemedTextProps } from './text';
import type { ThemeColors } from './theme';
import type {
  AnimatedThemedViewProps,
  PropsWithRequiredChildren,
  ThemedViewProps,
} from './view';

/**
 * Props for ThemedAccordion component.
 *
 * An accordion component that can expand and collapse content with animated transitions.
 * Supports customizable header text, icons, borders, and content areas.
 *
 * @example
 * ```tsx
 * <ThemedAccordion
 *   text="Section Title"
 *   iconNameOpened="chevron-up"
 *   iconNameClosed="chevron-down"
 *   borderWidth="sm"
 *   borderColor="border"
 * >
 *   <Text>Accordion content goes here</Text>
 * </ThemedAccordion>
 * ```
 */
export type ThemedAccordionProps = PropsWithRequiredChildren<
  Partial<CustomThemedTextProps> &
    Omit<CustomThemedIconProps, 'iconName'> & {
      /** Border width for the accordion container */
      borderWidth?: BorderSize;
      /** Border color from theme colors */
      borderColor?: ThemeColors;
      /** Props for the outer animated container wrapper */
      wrapProps?: AnimatedThemedViewProps;
      /** Props for the pressable header area that toggles the accordion */
      headerWrapProps?: ThemedPressableProps;
      /** Icon name to display when the accordion is opened/expanded */
      iconNameOpened?: CustomThemedIconProps['iconName'];
      /** Icon name to display when the accordion is closed/collapsed */
      iconNameClosed?: CustomThemedIconProps['iconName'];
      /** Props for the content container wrapper */
      contentWrapProps?: ThemedViewProps;
    }
>;
