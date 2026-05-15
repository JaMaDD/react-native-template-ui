/** @internal */
import { createBox } from '@shopify/restyle';
import type { Theme } from '../../types/theme';

/**
 * @internal
 * Base box component created with @shopify/restyle's createBox.
 * Provides typed access to theme layout, spacing, and styling properties.
 */
const Box = createBox<Theme>();

export default Box;
