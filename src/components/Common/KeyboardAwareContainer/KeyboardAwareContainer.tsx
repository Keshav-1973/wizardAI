import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {StyleProp, ViewStyle} from 'react-native';

type Props = {
  children: JSX.Element | JSX.Element[];
  style?: StyleProp<ViewStyle>;
};
const KeyboardAwareContainer = ({children, style}: Props) => {
  return (
    <KeyboardAwareScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      enableOnAndroid={true}
      scrollEnabled={false}
      keyboardShouldPersistTaps="always"
      scrollToOverflowEnabled={true}
      enableAutomaticScroll={true}
      extraScrollHeight={100}
      // contentContainerStyle={{flex: 1}}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

export default KeyboardAwareContainer;
