import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },

  wrapper1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxHeight: 150,
    backgroundColor: '#e3e2de',
    marginTop: 16,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },

  flexRow: {
    flexDirection: 'row',
  },
  wrapper2: {
    height: 20,
    width: 20,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  wrapper3: {
    height: 10,
    width: 10,
    borderRadius: 8,
  },
});
