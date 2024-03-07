import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppSelector} from '@helpers/AppStore/AppStore';
import {FeatureRoutes} from '@navigations/ScreenTypes';
import Home from '@screens/AppStack/Home/Home';
import Landing from '@screens/AuthStack/Landing/Landing';
import FindUser from '@screens/AuthStack/FindUser/FindUser';
import Cart from '@screens/AppStack/Cart/Cart';
import Success from '@screens/AppStack/Success/Success';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Settings from '@screens/AppStack/Settings/Settings';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const {Navigator, Screen} = createNativeStackNavigator<any>();
const Tab = createBottomTabNavigator<any>();

const AuthStack = () => {
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
        </>
      ) : (
        <>
          <Screen name={FeatureRoutes.APP.TAB} component={TabNavigator} />
          <Screen name={FeatureRoutes.APP.HOME} component={Home} />
          <Screen name={FeatureRoutes.APP.CART} component={Cart} />
          <Screen name={FeatureRoutes.APP.PLACED} component={Success} />
        </>
      )}
    </Navigator>
  );
};

const TabNavigator = (): any => {
  return (
    <Tab.Navigator
      initialRouteName={FeatureRoutes.ONBOARDING.LANDING}
      screenOptions={{headerShown: false}}>
      <Tab.Screen
        name={FeatureRoutes.APP.HOME}
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={FeatureRoutes.APP.SETTINGS}
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color, size}) => (
            <Icon name="gear" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AuthStack;
