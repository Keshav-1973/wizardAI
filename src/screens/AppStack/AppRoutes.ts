import { RouteMetadata, ValueOf } from "@navigations/BasicNavigationTypes";
import { NativeStackScreenProps } from '@react-navigation/native-stack';


export const AppRoutes = {
    HOME: "/app/home",
} as const;

export const AppcreensMetadata: RouteMetadata<ValueOf<typeof AppRoutes>> = {
    [AppRoutes.HOME]: {
        name: "Home"
    },
};

export type AppScreenPropsType = {
    [AppRoutes.HOME]: { payload: string } | undefined;
};

export type AppScreenProps<t extends ValueOf<typeof AppRoutes>> = NativeStackScreenProps<AppScreenPropsType, t>;