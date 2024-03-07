import {RouteMetadata, ValueOf} from '@navigations/BasicNavigationTypes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export const AuthRoutes = {
  LANDING: '/auth/landing',
  FIND_USER: '/auth/findUser',
} as const;

export const AuthScreensMetadata: RouteMetadata<ValueOf<typeof AuthRoutes>> = {
  [AuthRoutes.LANDING]: {
    name: 'Landing',
  },
  [AuthRoutes.FIND_USER]: {
    name: 'Find User',
  },
};

export type FindUserFormData = {
  userName: string;
  password: string;
};

export enum UserType {
  ADMIN = 'admin',
  USER = 'user',
}

export type AuthScreenPropsType = {
  [AuthRoutes.FIND_USER]: {payload: string} | undefined;
  [AuthRoutes.LANDING]: {payload: string} | undefined;
};

export type OnboardingScreenProps<t extends ValueOf<typeof AuthRoutes>> =
  NativeStackScreenProps<AuthScreenPropsType, t>;
