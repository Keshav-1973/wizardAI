import {BaseTheme, Breakpoint, createTheme} from '@shopify/restyle';
import {
  ColorPalette,
  SemanticColors,
  Spacings,
  SupportedDevices,
} from '@themes/Scales';

export interface ThemeType extends BaseTheme {
  colors: {[key in SemanticColors]: ColorPalette};
  spacing: {[key in Spacings]: number};
  breakpoints: {[key in SupportedDevices]: Breakpoint};
}

const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',
  primaryButton: '#002852',
  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  black: '#0B0B0B',
  white: '#F0F2F3',
  activeTab: 'rgba(0, 40, 82, 0.03)',
};
const darkPalette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',
  primaryButton: '#000000',
  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  black: '#0B0B0B',
  white: '#F0F2F3',
};
const theme = createTheme({
  colors: {
    mainBackground: ColorPalette.WHITE,
    mainForeground: ColorPalette.BLACK,
    cardPrimaryBackground: palette.purplePrimary,
    // primaryButton: ColorPalette.DARK_BLUE,
    darkBlue: ColorPalette.DARK_BLUE,
    secondaryButton: ColorPalette.WHITE,
    error: ColorPalette.RED,
    activeTabBackground: ColorPalette.ACTIVE_WHITE,
    secondaryText: ColorPalette.DARK_GREEN,
    darkGreen: ColorPalette.DARK_GREEN,
    primaryButton: ColorPalette.DARK_GREEN,
    heading: ColorPalette.DARK_GREEN,
    inputField: ColorPalette.INPUT_LIGHT,
    subscript: ColorPalette.DARK_GREEN,
  },
  spacing: {
    xs: 5,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    primaryButtonText: {
      color: 'mainBackground',
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '400',
      fontFamily: 'Lexend-Medium',
    },
    secondaryButtonText: {
      color: 'darkBlue',
      fontSize: 16,
      lineHeight: 24,
    },
    secondaryText: {
      color: 'secondaryText',
      // fontWeight: '500',
      fontFamily: 'Lexend-Bold',
    },
    heading: {
      color: 'heading',
      fontWeight: '500',
      fontFamily: 'Lexend-Black',
      fontSize: 30,
    },
    subscript: {
      color: 'subscript',
      // fontWeight: '500',
      fontFamily: 'Lexend-Bold',
    },

    defaults: {
      // We can define a default text variant here.
    },
  },
});
export const darkTheme = {
  ...theme,
  colors: {
    mainBackground: ColorPalette.BLACK,
    mainForeground: ColorPalette.WHITE,
    cardPrimaryBackground: darkPalette.purpleLight,
    // primaryButton: ColorPalette.BLACK_BUTTON,
    secondaryButton: ColorPalette.BLACK_BUTTON,
    darkBlue: ColorPalette.DARK_BLUE,
    error: ColorPalette.RED,
    activeTabBackground: ColorPalette.ACTIVE_BLACK,
    secondaryText: ColorPalette.DARK_GREEN,
    darkGreen: ColorPalette.DARK_GREEN,
    primaryButton: ColorPalette.DARK_GREEN,
    heading: ColorPalette.DARK_GREEN,
    inputField: ColorPalette.INPUT_DARK,
    subscript: ColorPalette.DARK_GREEN,
  },
  spacing: {
    xs: 5,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    primaryButtonText: {
      color: 'mainForeground',
      fontSize: 16,
      lineHeight: 24,
    },
    secondaryButtonText: {
      color: 'mainForeground',
      fontSize: 16,
      lineHeight: 24,
    },
    secondaryText: {
      color: 'secondaryText',
      // fontWeight: '500',
      fontFamily: 'Lexend-Bold',
    },
    heading: {
      color: 'heading',
      fontWeight: '500',
      fontFamily: 'Lexend-Black',
      fontSize: 30,
    },
    subscript: {
      color: 'subscript',
      // fontWeight: '500',
      fontFamily: 'Lexend-Bold',
    },
    defaults: {
      // We can define a default text variant here.
    },
  },
};

export type Theme = typeof theme;
export default theme;
