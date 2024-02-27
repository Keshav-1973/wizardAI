import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useAppDispatch, useAppSelector} from '@helpers/AppStore/AppStore';
import {useTheme} from '@shopify/restyle';
import {FeatureRoutes} from '@navigations/ScreenTypes';
import Login from '@screens/AuthStack/Login/Login';
import SignUp from '@screens/AuthStack/SignUp/SignUp';
import Home from '@screens/AppStack/Home/Home';
import Landing from '@screens/AuthStack/Landing/Landing';
import FindUser from '@screens/AuthStack/FindUser/FindUser';
import VerifyEmail from '@screens/AuthStack/VerifyEmail/VerifyEmail';

const {Navigator, Screen} = createNativeStackNavigator<any>();

const AuthStack = () => {
  const navigation = useNavigation<NativeStackScreenProps<any>>();
  const dispatch = useAppDispatch();
  const theme = useTheme<any>();
  const isLoggedIn = useAppSelector(state => state.userAuth.isLoggedIn);

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!isLoggedIn ? (
        <>
          <Screen name={FeatureRoutes.ONBOARDING.LANDING} component={Landing} />
          <Screen
            name={FeatureRoutes.ONBOARDING.FIND_USER}
            component={FindUser}
          />
          <Screen name={FeatureRoutes.ONBOARDING.LOGIN} component={Login} />
          <Screen name={FeatureRoutes.ONBOARDING.SIGN_UP} component={SignUp} />
          <Screen
            name={FeatureRoutes.ONBOARDING.VERIFY_EMAIL}
            component={VerifyEmail}
          />
        </>
      ) : (
        <>
          <Screen name={FeatureRoutes.APP.HOME} component={Home} />
        </>
      )}
    </Navigator>
  );
};

export default AuthStack;
