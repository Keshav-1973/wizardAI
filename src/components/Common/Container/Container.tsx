import React from 'react';
import {StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {SemanticColors} from '@screens/../Themes/Scales';
import ViewComponent from '@components/Common/ViewComponent/ViewComponent';

type Props = {
  children: JSX.Element | JSX.Element[];
  style?: StyleProp<ViewStyle>;
  isPadded?: boolean;
};

const Container = ({children, style, isPadded}: Props) => {
  return (
    <ViewComponent
      style={[styles(isPadded).wrapper, style]}
      backgroundColor={SemanticColors?.MAIN_BACKGROUND}>
      {children}
    </ViewComponent>
  );
};

export default Container;

const styles = (isPadded: boolean) =>
  StyleSheet.create({
    wrapper: {
      padding: isPadded ? 10 : 0,
      flex: 1,
      height: '100%',
    },
  });
