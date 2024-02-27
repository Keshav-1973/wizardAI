import {FC, useEffect, useState, useRef} from 'react';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from '@navigations/AuthStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider} from 'react-redux';
import {
  appStore,
  useAppSelector,
  useAppDispatch,
} from '@helpers/AppStore/AppStore';
import {ThemeProvider} from '@shopify/restyle';
import {
  View,
  StatusBar,
  Linking,
  AccessibilityInfo,
  useColorScheme,
  ColorSchemeName,
} from 'react-native';
import {LinkingOptions} from '@react-navigation/native';
// import dynamicLinks, {
//     FirebaseDynamicLinksTypes,
// } from '@react-native-firebase/dynamic-links';
import TextComponent from '@components/Common/TextComponent/TextComponent';
// import { ThemeActions } from '@themes/redux/ThemeSlice';
// import { FeatureRoutes, ScreenProps, ScreensMetadata, CombinedScreenProps } from './ScreenTypes';
import theme, {darkTheme} from '@themes/Themes';
import {CombinedScreenProps, FeatureRoutes} from './ScreenTypes';
import dynamicLinks, {
  FirebaseDynamicLinksTypes,
} from '@react-native-firebase/dynamic-links';
import {ThemeTypes} from '@themes/redux/ThemeConstant';
import {ThemeActions} from '@themes/redux/ThemeSlice';
import {URL, URLSearchParams} from 'react-native-url-polyfill';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {UserAuthActions} from '@screens/AuthStack/Redux/UserAuthSlice';

let recievedURL: URL;
const makeMailRoute = (url: URL) => {
  appStore.dispatch(UserAuthActions.CheckIfEmailVerified());
};

const linking: LinkingOptions<CombinedScreenProps> = {
  prefixes: ['https://wizardai.page.link'],

  async getInitialURL(): Promise<string> {
    // Check if the app was opened by a deep link
    const url = await Linking.getInitialURL();
    const dynamicLinkUrl = await dynamicLinks().getInitialLink();

    if (dynamicLinkUrl) {
      recievedURL = new URL(dynamicLinkUrl.url);
      console.log('backGround....', dynamicLinkUrl);
      const hehe = recievedURL.searchParams;
      console.log('backGround....', hehe.get('continueUrl'));

      return dynamicLinkUrl.url;
    }

    if (url) {
      recievedURL = new URL(dynamicLinkUrl.url);
      // console.log(url, '......normal URL');
      return url;
    }

    return '';
  },

  // Custom function to subscribe to incoming links
  subscribe(listener: (deeplink: string) => void) {
    // First, you may want to do the default deep link handling
    const onReceiveURL = ({url}: {url: string}) => listener(url);

    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

    const handleDynamicLink = (
      dynamicLink: FirebaseDynamicLinksTypes.DynamicLink,
    ) => {
      recievedURL = new URL(dynamicLink.url);
      listener(dynamicLink.url);
      // console.log('foreGround....', dynamicLink);
    };

    const unsubscribeToDynamicLinks = dynamicLinks().onLink(handleDynamicLink);

    return () => {
      unsubscribeToDynamicLinks();
      linkingSubscription.remove();
    };
  },

  config: {
    initialRouteName: FeatureRoutes.ONBOARDING.LANDING,
    screens: {
      [FeatureRoutes.ONBOARDING.VERIFY_EMAIL]: {
        path: '/email_verification',
        parse: {
          actionCode: actionCode => {
            actionCode;
          },
        },
      },
    },
  },
};

const MainNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer
        linking={linking}
        fallback={<TextComponent>Loading...</TextComponent>}>
        {/* <StatusBar
                    backgroundColor={
                        currentTheme === ThemeTypes.DARK ? 'black' : 'white'
                    }
                    barStyle={
                        currentTheme === ThemeTypes.DARK
                            ? 'light-content'
                            : 'dark-content'
                    }
                /> */}
        <AuthStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default MainNavigator;
