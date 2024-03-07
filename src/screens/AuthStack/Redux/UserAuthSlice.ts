import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  InAppToastManager,
  ERROR_TOAST,
} from '@components/Common/ToastManager/InAppToastManager';

import {FindUserFormData} from '@screens/AuthStack/AuthRoutes';

interface InitialUserAuthState {
  isLoggedIn: boolean;
  userCredentials: FindUserFormData;
}

const initialUserAuthState: InitialUserAuthState = {
  isLoggedIn: false,
  userCredentials: {} as FindUserFormData,
};

export const signInViaUserNamePass = createAsyncThunk(
  'auth/signInUserNamePass',
  async (data: FindUserFormData, {dispatch}) => {
    try {
      dispatch(UserAuthActions.logIn(data));
    } catch (error) {
      InAppToastManager.showToast(ERROR_TOAST, {
        title: error,
      });
    }
  },
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (_, {dispatch}) => {
    try {
      dispatch(UserAuthActions.logOut());
    } catch (error) {
      InAppToastManager.showToast(ERROR_TOAST, {
        title: 'Something Went Wrong',
      });
    }
  },
);
export const UserAuthSlice = createSlice({
  name: 'userAuth',
  initialState: initialUserAuthState,
  reducers: {
    logIn: (state, action: PayloadAction<FindUserFormData>) => {
      state.userCredentials = action.payload;
      state.isLoggedIn = true;
    },
    logOut: state => {
      state.isLoggedIn = false;
      state.userCredentials = {} as FindUserFormData;
    },
    saveUserCredentials: (state, action: PayloadAction<FindUserFormData>) => {
      state.userCredentials = action.payload;
    },
  },
});

export const UserAuthActions = {
  ...UserAuthSlice.actions,
  signInViaUserNamePass,
  signOut,
};
