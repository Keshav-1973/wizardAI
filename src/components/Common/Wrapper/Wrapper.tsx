import * as React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {FC} from 'react';
import {useTheme} from '@shopify/restyle';
import ViewComponent from '@components/Common/ViewComponent/ViewComponent';
import {ColorPalette} from '@screens/../Themes/Scales';
import {ThemeType} from '@themes/Themes';

interface props {
  navHeading: string;
  icon?: any;
  onPressIcon?: () => void;
  accessibilityLabel?: string;
  children: JSX.Element;
  canGoback?: boolean;
}

const Wrapper: FC<props> = props => {
  const navigation = useNavigation();
  const theme = useTheme<ThemeType>();

  const {canGoback = true} = props;

  return (
    <View style={{flex: 1}}>
      <Appbar.Header
        style={{
          width: '100%',
          backgroundColor: theme.colors.mainBackground,
        }}>
        {canGoback && (
          <Appbar.BackAction
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            }}
            color={ColorPalette.DARK_GREEN}
          />
        )}
        <ViewComponent style={styles.header}>
          <Appbar.Content
            title={props.navHeading}
            style={styles.heading(canGoback)}
            color={ColorPalette.DARK_GREEN}
            titleStyle={{fontWeight: '700'}}
          />
          {props.icon && (
            <TouchableOpacity
              style={styles.icon}
              onPress={props.onPressIcon}
              accessibilityRole="button"
              accessibilityLabel={props.accessibilityLabel}>
              {props.icon}
            </TouchableOpacity>
          )}
        </ViewComponent>
      </Appbar.Header>
      <ViewComponent style={[styles.children]}>{props.children}</ViewComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  children: {
    flex: 1,
    width: '100%',
  },
  heading: canGoback => ({
    width: '80%',
    justifyContent: 'center',
    paddingLeft: !canGoback ? 16 : 0,
  }),
  header: {
    width: '100%',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    right: 0,
    margin: 10,
    width: '20%',
  },
});

export default Wrapper;
