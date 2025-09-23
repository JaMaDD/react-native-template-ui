import { createElement, type FC } from 'react';
import ReactNativeTemplateProviders from '../../components/provider/ReactNativeTemplateProviders';
import type { ReactNativeTemplateProvidersProps } from '../../types/provider';
import { lightTheme } from '../../utils/theme/const';

export const wrapper: FC<ReactNativeTemplateProvidersProps> = ({
  theme = lightTheme,
  children,
}) => createElement(ReactNativeTemplateProviders, { theme, children });
