import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  wrapper1: color => ({
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: color,
  }),
  wrapper2: {
    flex: 1,
  },
  bill: {
    marginTop: 20,
    marginLeft: 26,
    textDecorationLine: 'underline',
    fontSize: 20,
    fontWeight: 'bold',
  },
  borderRad: {
    borderRadius: 20,
  },
});
