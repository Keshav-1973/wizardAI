import { FC, useEffect, useState, useRef } from 'react';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from '@navigations/AuthStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import {
    appStore,
    useAppSelector,
    useAppDispatch,
} from '@helpers/AppStore/AppStore';
import { ThemeProvider } from '@shopify/restyle';
import { View, StatusBar, Linking, AccessibilityInfo, useColorScheme, ColorSchemeName, } from 'react-native';
import { LinkingOptions } from '@react-navigation/native';
// import dynamicLinks, {
//     FirebaseDynamicLinksTypes,
// } from '@react-native-firebase/dynamic-links';
import TextComponent from '@components/Common/TextComponent/TextComponent';
// import { ThemeActions } from '@themes/redux/ThemeSlice';
// import { FeatureRoutes, ScreenProps, ScreensMetadata, CombinedScreenProps } from './ScreenTypes';
import theme, { darkTheme } from '@themes/Themes';
import { CombinedScreenProps, FeatureRoutes } from './ScreenTypes';
import dynamicLinks, { FirebaseDynamicLinksTypes } from '@react-native-firebase/dynamic-links';
import { ThemeTypes } from '@themes/redux/ThemeConstant';
import { ThemeActions } from '@themes/redux/ThemeSlice';
import { URL, URLSearchParams } from 'react-native-url-polyfill';


const linking: LinkingOptions<CombinedScreenProps> = {
    prefixes: ['https://wizardai.page.link'],

    async getInitialURL(): Promise<string> {

        let reutendURL: string

        // Check if the app was opened by a deep link
        const url = await Linking.getInitialURL();
        const dynamicLinkUrl = await dynamicLinks().getInitialLink();
        

        if (dynamicLinkUrl) {

            let url = new URL(dynamicLinkUrl.url);

            // var actionCode = url.searchParams.get('oobCode')
            console.log("backGround....", dynamicLinkUrl.url, url.searchParams.get('oobCode'))
            return dynamicLinkUrl.url;
        }

        if (url) {
            console.log(url, "......normal URL")
            return url;
        }

        return ""
    },

    // Custom function to subscribe to incoming links
    subscribe(listener: (deeplink: string) => void) {
        // First, you may want to do the default deep link handling
        const onReceiveURL = ({ url }: { url: string }) => listener(url);

        // Listen to incoming links from deep linking
        const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

        const handleDynamicLink = (
            dynamicLink: FirebaseDynamicLinksTypes.DynamicLink,
        ) => {
            console.log("foreGround....", dynamicLink.url)
            listener(dynamicLink.url);
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
                path: "/auth/verify_email",
            },
        },
    },
};



const MainNavigator = () => {
    const currentTheme = useColorScheme();
    const dispatch = useAppDispatch();
    // const currentTheme = useAppSelector((state) => state.theme.currentTheme);
    let applyTheme: any;
    if (currentTheme === ThemeTypes.DARK) applyTheme = darkTheme;
    if (currentTheme === ThemeTypes.LIGHT) applyTheme = theme;


    useEffect(() => {
        if (currentTheme) {
            switchTheme(currentTheme)
        }
    }, [currentTheme])


    const switchTheme = async (colorScheme: ColorSchemeName) => {
        if (colorScheme === 'dark') {
            await dispatch(ThemeActions.changeTheme(ThemeTypes.DARK));
        } else {
            await dispatch(ThemeActions.changeTheme(ThemeTypes.LIGHT));
        }
    };


    return (
        <ThemeProvider theme={applyTheme}>
            <NavigationContainer
                linking={linking}
                fallback={<TextComponent>Loading...</TextComponent>}
            >
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
        </ThemeProvider>
    );
};

export default MainNavigator;
