/** @internal */
import { createText } from '@shopify/restyle';
import type { Theme } from '../../types/theme';

/**
 * @internal
 * Base text component created with @shopify/restyle's createText.
 * Provides typed access to theme text styles and properties.
 */
const Text = createText<Theme>();

export default Text;
