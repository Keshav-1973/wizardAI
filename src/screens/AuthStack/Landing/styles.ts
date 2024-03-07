import {Dimensions, StyleSheet} from 'react-native';
import {EdgeInsets} from 'react-native-safe-area-context';
const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = (insets: EdgeInsets) =>
  StyleSheet.create({
    icon: {
      height: SCREEN_WIDTH * 0.9,
      width: '100%',
    },
    label: {
      textAlign: 'center',
      padding: 16,
    },
    btnWrapper: {
      padding: 10,
      flex: 1,
      justifyContent: 'flex-end',
      paddingBottom: insets.bottom,
    },
    btn1: {
      borderRadius: 20,
    },
    btn2: {
      borderRadius: 20,
      marginBottom: 16,
    },
  });

export default styles;
