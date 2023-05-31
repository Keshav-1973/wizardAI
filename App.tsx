import React from 'react';
import type { PropsWithChildren } from 'react';
import { Text } from 'react-native';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { appStore, persistor } from '@helpers/AppStore/AppStore';
import MainNavigator from '@navigations/MainNavigator';

function App(): JSX.Element {

  return (
    <Provider store={appStore}>
      <PersistGate loading={<Text>Welcome...</Text>} persistor={persistor}>
        <MainNavigator />
      </PersistGate>
    </Provider>
  );
}

export default App;
