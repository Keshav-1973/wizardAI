import { createBox } from '@shopify/restyle';
import * as React from 'react';
import { ThemeType } from '@themes/Themes';

const ViewComponent = createBox<ThemeType>();

export default React.memo(ViewComponent);
