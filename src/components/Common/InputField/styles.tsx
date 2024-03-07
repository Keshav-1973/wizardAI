import {StyleProp, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import Wrapper from './../Wrapper/Wrapper';

export default StyleSheet.create({
  wrapper: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 5,
    marginTop: 5,
  },
  inputContainer: {
    paddingVertical: 12,
  },
  icon: {
    color: 'black',
  },
  textInput: {
    width: '100%',
    height: '100%',
    flex: 1,
  },

  error: {
    color: 'red',
    paddingTop: 4,
    fontSize: 12,
  },
});
