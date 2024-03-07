import {RouteMetadata, ValueOf} from '@navigations/BasicNavigationTypes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export const AppRoutes = {
  HOME: '/app/home',
  CART: '/app/cart',
  PLACED: '/app/placed',
  TAB: '/app/tab',
  SETTINGS: '/app/settings',
} as const;

export const AppcreensMetadata: RouteMetadata<ValueOf<typeof AppRoutes>> = {
  [AppRoutes.HOME]: {
    name: 'Home',
  },
  [AppRoutes.CART]: {
    name: 'Cart',
  },
  [AppRoutes.PLACED]: {
    name: 'Placed',
  },
  [AppRoutes.TAB]: {
    name: 'Tab',
  },
  [AppRoutes.SETTINGS]: {
    name: 'Settings',
  },
};

export type MenuItem = {
  id: string;
  title: string;
  imgSrc: string;
  isVeg: boolean;
  rating: string;
  price: string;
  isPresent: boolean;
};

export type editMenuTypes = {
  id: string;
  newValue: Partial<MenuItem>;
};

export type AppScreenPropsType = {
  [AppRoutes.HOME]: {payload: string} | undefined;
  [AppRoutes.CART]: {payload: MenuItem; count: number} | undefined;
  [AppRoutes.PLACED]: {payload: string} | undefined;
  [AppRoutes.TAB]: {payload: string} | undefined;
  [AppRoutes.SETTINGS]: {payload: string} | undefined;
};

export type AppScreenProps<t extends ValueOf<typeof AppRoutes>> =
  NativeStackScreenProps<AppScreenPropsType, t>;
