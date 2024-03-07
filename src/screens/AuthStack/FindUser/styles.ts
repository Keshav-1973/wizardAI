import {ColorPalette} from '@themes/Scales';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  wrapper1: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  wrapper2: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: ColorPalette.DARK_GREEN,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
  margin: {
    marginHorizontal: 5,
  },
  borderRad: {
    borderRadius: 20,
  },
  padding: {
    paddingTop: 16,
  },
  label: {
    textAlign: 'center',
    marginTop: 8,
  },
});
