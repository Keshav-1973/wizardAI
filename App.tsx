import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {ColorSchemeName, Text, useColorScheme} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {appStore, persistor, useAppDispatch} from '@helpers/AppStore/AppStore';
import MainNavigator from '@navigations/MainNavigator';
import Toast from 'react-native-toast-message';
import ToastMessage from '@components/Common/ToastMessage/ToastMessage';
import {ThemeProvider} from '@shopify/restyle';
import theme, {darkTheme} from '@themes/Themes';
import {ThemeTypes} from '@themes/redux/ThemeConstant';
import {ThemeActions} from '@themes/redux/ThemeSlice';

function App(): JSX.Element {
  let applyTheme: any;
  const currentTheme = useColorScheme();
  if (currentTheme === ThemeTypes.DARK) applyTheme = darkTheme;
  if (currentTheme === ThemeTypes.LIGHT) applyTheme = theme;

  const switchTheme = async (colorScheme: ColorSchemeName) => {
    if (colorScheme === ThemeTypes.DARK) {
      appStore.dispatch(ThemeActions.changeTheme(ThemeTypes.DARK));
    } else {
      appStore.dispatch(ThemeActions.changeTheme(ThemeTypes.LIGHT));
    }
  };

  useEffect(() => {
    if (currentTheme) {
      switchTheme(currentTheme);
    }
  }, [currentTheme]);

  const toastConfig = {
    errorToast: ({type, props}) => (
      <ToastMessage type={type} title={props.title} desc={props.desc} />
    ),
    successToast: ({type, props}) => (
      <ToastMessage type={type} title={props.title} desc={props.desc} />
    ),
  };

  return (
    <ThemeProvider theme={applyTheme}>
      <Provider store={appStore}>
        <PersistGate loading={<Text>Welcome...</Text>} persistor={persistor}>
          <MainNavigator />
          <Toast config={toastConfig} />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
