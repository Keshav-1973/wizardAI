import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ValueOf } from './BasicNavigationTypes';
import { AuthRoutes, AuthScreensMetadata, AuthScreenPropsType } from "@screens/AuthStack/AuthRoutes";
import { AppRoutes, AppcreensMetadata, AppScreenPropsType } from '@screens/AppStack/AppRoutes';
const allScreenRoutes = Object.assign({},
    AuthRoutes,
);

export const FeatureRoutes = {
    ONBOARDING: AuthRoutes,
    APP: AppRoutes
};

export const ScreensMetadata = {
    ...AuthScreensMetadata,
    ...AppcreensMetadata
};

export type CombinedScreenProps = AuthScreenPropsType & AppScreenPropsType;

export type ScreenNavigationProps = NativeStackNavigationProp<CombinedScreenProps>;
export type ScreenProps<t extends ValueOf<typeof allScreenRoutes>> = NativeStackNavigationProp<CombinedScreenProps, ValueOf<typeof allScreenRoutes>>;
