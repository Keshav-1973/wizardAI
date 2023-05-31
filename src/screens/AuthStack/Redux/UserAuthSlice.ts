import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthService } from '@screens/AuthStack/Api/Api';
import { InAppToastManager } from '@components/Common/ToastManager/InAppToastManager';
import { User } from '@react-native-google-signin/google-signin';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { RegisterFormData, FindUserFormData } from '@screens/AuthStack/AuthRoutes';


interface initialUserAuthState {
    googleUserState: User;
    isLoggedIn: Boolean
}

const initialUserAuthState: initialUserAuthState = {
    googleUserState: {} as User,
    isLoggedIn: false
};

export const getProfileDetails = createAsyncThunk(
    'learn/getProfileDetails',
    async (_, { dispatch, getState }) => {
        try {
        } catch (error) {
        }
    }
);

export const signInViaGoogle = createAsyncThunk(
    'auth/signInViaGoogle',
    async (_, { dispatch, getState }) => {
        try {
            const response = await AuthService.SigninViaGoogle()
            dispatch(UserAuthActions.logIn(response))
        } catch (error) {
            InAppToastManager.showToast("Sign In Cancelled By User")
        }
    }
);

export const signOutViaGoogle = createAsyncThunk(
    'auth/signOutViaGoogle',
    async (_, { dispatch, getState }) => {
        try {
            await AuthService.SignOutViaGoogle()
            dispatch(UserAuthActions.logOut())
        } catch (error) {
            InAppToastManager.showToast("Sign In Cancelled By User")
        }
    }
);

export const createUserWithEmailAndPassword = createAsyncThunk(
    'auth/createUserWithEmailAndPassword',
    async (data: FindUserFormData, { dispatch, getState }): Promise<FirebaseAuthTypes.UserCredential | any> => {
        try {
            return await AuthService.CreateUserWithEmailAndPassword(data)
        } catch (error) {
            InAppToastManager.showToast(`CreateUserWithEmailAndPassword-------${error}`)
        }
    }
);

export const signInViaEmailPass = createAsyncThunk(
    'auth/signInViaEmailPass',
    async (data: FindUserFormData, { dispatch, getState }) => {
        try {
            const response = await AuthService.SignInViaEmailPass(data)
            dispatch(UserAuthActions.logIn(response))
        } catch (error) {
            InAppToastManager.showToast(`SignInViaEmailPass-------${error}`)
        }
    }
);

export const checkIfEmailExists = createAsyncThunk(
    'auth/checkIfEmailExists',
    async (email: string, { dispatch, getState }) => {
        try {
            return await AuthService.CheckIfEmailExists(email)
        } catch (error) {
            InAppToastManager.showToast(`checkIfEmailExists-------${error}`)
        }
    }
);

export const UserAuthSlice = createSlice({
    name: 'userAuth',
    initialState: initialUserAuthState,
    reducers: {
        logIn: (state, action: PayloadAction<User>) => {
            state.googleUserState = action.payload
            state.isLoggedIn = true
        },
        logOut: (state) => {
            state.googleUserState = {} as User
            state.isLoggedIn = false
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
    checkIfEmailExists
};
