import { createText } from '@shopify/restyle';
import * as React from 'react';
import { ThemeType } from '@themes/Themes';

const TextComponent = createText<ThemeType>();

export default React.memo(TextComponent);
