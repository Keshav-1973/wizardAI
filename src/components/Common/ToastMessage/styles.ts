import {StyleSheet} from 'react-native';
import deviceInfoModule from 'react-native-device-info';
import {ColorPalette} from '@themes/Scales';

const styles = StyleSheet.create({
  toastContainer: {
    width: '100%',
    backgroundColor: ColorPalette.DARK_GREEN,
    marginTop: -40,
    paddingTop: deviceInfoModule.hasNotch() ? 60 : 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  toastSuccess: {
    backgroundColor: ColorPalette.DARK_GREEN,
  },
  toastError: {
    backgroundColor: ColorPalette.GREY,
  },
  title: {
    paddingTop: deviceInfoModule.hasNotch() ? 10 : 0,
  },
});
export default styles;
