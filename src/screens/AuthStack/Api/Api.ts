import {
    GoogleSignin,
    statusCodes,
    User
} from '@react-native-google-signin/google-signin';
import { EnvVars } from '@config/env';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { FindUserFormData } from '@screens/AuthStack/AuthRoutes';

try {
    GoogleSignin.configure({
        webClientId: EnvVars.OAuth.google.webClientId
    });
} catch (error) {
    console.log(error, "configure")
}


export const AuthService = {
    SigninViaGoogle: async (): Promise<User> => {
        return await GoogleSignin.signIn();
    },

    SignOutViaGoogle: async (): Promise<null> => {
        return await GoogleSignin.signOut();
    },

    CreateUserWithEmailAndPassword: async (credentials: FindUserFormData): Promise<FirebaseAuthTypes.UserCredential> => {
        return await auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
        // auth()
        //     .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
        //     .then(() => {
        //         console.log('User account created & signed in!');
        //     })
        //     .catch(error => {
        //         if (error.code === 'auth/email-already-in-use') {
        //             console.log('That email address is already in use!');
        //         }

        //         if (error.code === 'auth/invalid-email') {
        //             console.log('That email address is invalid!');
        //         }

        //         console.error(error);
        //     });
    },

    SignInViaEmailPass: async (credentials: FindUserFormData): Promise<FirebaseAuthTypes.UserCredential> => {

        return await auth().signInWithEmailAndPassword(credentials.email, credentials.password)
        // auth()
        //     .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
        //     .then(() => {
        //         console.log('User account created & signed in!');
        //     })
        //     .catch(error => {
        //         if (error.code === 'auth/email-already-in-use') {
        //             console.log('That email address is already in use!');
        //         }

        //         if (error.code === 'auth/invalid-email') {
        //             console.log('That email address is invalid!');
        //         }

        //         console.error(error);
        //     });
    },

    CheckIfEmailExists: async (email: string): Promise<string[]> => {
        return await auth().fetchSignInMethodsForEmail(email)
    },

}