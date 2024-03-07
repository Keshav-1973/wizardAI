import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from '@navigations/AuthStack';
import TextComponent from '@components/Common/TextComponent/TextComponent';

import {SafeAreaProvider} from 'react-native-safe-area-context';

const MainNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer fallback={<TextComponent>Loading...</TextComponent>}>
        <AuthStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default MainNavigator;
