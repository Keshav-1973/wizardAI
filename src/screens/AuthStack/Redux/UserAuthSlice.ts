import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthService} from '@screens/AuthStack/Api/Api';
import {
  InAppToastManager,
  SUCCESS_TOAST,
  ERROR_TOAST,
} from '@components/Common/ToastManager/InAppToastManager';
import {User} from '@react-native-google-signin/google-signin';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {
  RegisterFormData,
  FindUserFormData,
} from '@screens/AuthStack/AuthRoutes';
import {mapAuthCodeToMessage} from '@helpers/CommonFunctions/CommonFunctions';

interface initialUserAuthState {
  googleUserState: User | FirebaseAuthTypes.UserCredential;
  isLoggedIn: Boolean;
  userCredentials: FirebaseAuthTypes.UserCredential;
}

const initialUserAuthState: initialUserAuthState = {
  googleUserState: {} as User,
  isLoggedIn: false,
  userCredentials: {} as FirebaseAuthTypes.UserCredential,
};

export const getProfileDetails = createAsyncThunk(
  'learn/getProfileDetails',
  async (_, {dispatch, getState}) => {
    try {
    } catch (error) {}
  },
);

export const signInViaGoogle = createAsyncThunk(
  'auth/signInViaGoogle',
  async (_, {dispatch, getState}) => {
    try {
      const response = await AuthService.SigninViaGoogle();
      dispatch(UserAuthActions.logIn(response));
    } catch (error) {
      InAppToastManager.showToast(ERROR_TOAST, {
        title: 'Sign In Cancelled',
      });
    }
  },
);

export const signOutViaGoogle = createAsyncThunk(
  'auth/signOutViaGoogle',
  async (_, {dispatch, getState}) => {
    try {
      await AuthService.SignOutViaGoogle();
      dispatch(UserAuthActions.logOut());
    } catch (error) {
      InAppToastManager.showToast(ERROR_TOAST, {
        title: 'Something Went Wrong',
      });
    }
  },
);

export const createUserWithEmailAndPassword = createAsyncThunk(
  'auth/createUserWithEmailAndPassword',
  async (
    data: FindUserFormData,
    {dispatch, getState},
  ): Promise<FirebaseAuthTypes.UserCredential | any> => {
    try {
      const response = await AuthService.CreateUserWithEmailAndPassword(data);
      dispatch(UserAuthActions.saveUserCredentials(response));
      return response;
    } catch (error) {
      const data = mapAuthCodeToMessage(error.code);
      InAppToastManager.showToast(ERROR_TOAST, {
        title: data,
      });
    }
  },
);

export const signInViaEmailPass = createAsyncThunk(
  'auth/signInViaEmailPass',
  async (data: FindUserFormData, {dispatch, getState}) => {
    try {
      return await AuthService.SignInViaEmailPass(data);
    } catch (error) {
      const data = mapAuthCodeToMessage(error.code);
      InAppToastManager.showToast(ERROR_TOAST, {
        title: data,
      });
    }
  },
);

export const checkIfEmailExists = createAsyncThunk(
  'auth/checkIfEmailExists',
  async (email: string, {dispatch, getState}) => {
    try {
      return await AuthService.CheckIfEmailExists(email);
    } catch (error) {
      InAppToastManager.showToast(ERROR_TOAST, {
        title: error.toString(),
      });
    }
  },
);

export const CheckIfEmailVerified = createAsyncThunk(
  'auth/CheckIfEmailVerified',
  async () => {
    try {
      return await AuthService.CheckIfEmailVerified();
    } catch (error) {
      InAppToastManager.showToast(ERROR_TOAST, {
        title: error.toString(),
      });
    }
  },
);

export const VerifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (code: string) => {
    try {
      return await AuthService.VerifyEmail(code);
    } catch (error) {
      const data = mapAuthCodeToMessage(error.code);
      InAppToastManager.showToast(ERROR_TOAST, {
        title: data,
      });
      throw error;
    }
  },
);

export const UserAuthSlice = createSlice({
  name: 'userAuth',
  initialState: initialUserAuthState,
  reducers: {
    logIn: (
      state,
      action: PayloadAction<User | FirebaseAuthTypes.UserCredential>,
    ) => {
      state.googleUserState = action.payload;
      state.isLoggedIn = true;
    },
    logOut: state => {
      state.googleUserState = {} as User;
      state.isLoggedIn = false;
      state.userCredentials = {} as FirebaseAuthTypes.UserCredential;
    },
    saveUserCredentials: (
      state,
      action: PayloadAction<FirebaseAuthTypes.UserCredential>,
    ) => {
      state.userCredentials = action.payload;
    },
  },
});

export const UserAuthActions = {
  ...UserAuthSlice.actions,
  getProfileDetails,
  signInViaGoogle,
  signOutViaGoogle,
  signInViaEmailPass,
  createUserWithEmailAndPassword,
  checkIfEmailExists,
  CheckIfEmailVerified,
  VerifyEmail,
};
