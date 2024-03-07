import {combineReducers} from '@reduxjs/toolkit';
import {HomeSlice} from '@screens/AppStack/Home/Redux/HomeSlice';
import {SettingsSlice} from '@screens/AppStack/Settings/Redux/SettingsSlice';
import {UserAuthSlice} from '@screens/AuthStack/Redux/UserAuthSlice';
import {ThemeSlice} from '@themes/redux/ThemeSlice';

export const rootReducer = combineReducers({
  userAuth: UserAuthSlice.reducer,
  theme: ThemeSlice.reducer,
  menu: HomeSlice.reducer,
  settings: SettingsSlice.reducer,
});
