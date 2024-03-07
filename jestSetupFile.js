
import { ColorPalette } from '@themes/Scales';


jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);


jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
  hide: jest.fn()
}));

const mockTheme = {
  colors: {
    MAIN_BACKGROUND: ColorPalette.WHITE,
  },
};

jest.mock('@screens/../Themes/Scales', () => ({
  ...jest.requireActual('@screens/../Themes/Scales'),
  SemanticColors: mockTheme?.colors,
}));

jest.mock('@shopify/restyle', () => {
  const RealModule = jest.requireActual('@shopify/restyle')
  const RN = jest.requireActual('react-native')
  RealModule.createText = () => RN.Text
  RealModule.createBox = () => RN.View
  RealModule.createRestyleComponent = (f, c) => c || RN.View
  return RealModule
})