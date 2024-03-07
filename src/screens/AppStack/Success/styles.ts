import {color} from '@shopify/restyle';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  wrapper: color => ({
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color,
  }),
});
