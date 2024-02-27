import {Platform} from 'react-native';

/**
 * isIOS
 */
export const isIOS = () => {
  return Platform.OS === 'ios';
};

/**
 * isAndroid
 */
export const isAndroid = () => {
  return Platform.OS === 'android';
};

/**
 * firebase error messages
 */
export function mapAuthCodeToMessage(authCode: string) {
  switch (authCode) {
    case 'auth/invalid-password':
      return 'Password provided is not corrected';

    case 'auth/invalid-email':
      return 'Email provided is invalid';

    case 'auth/email-already-in-use':
      return 'Email already in use';

    case 'auth/invalid-email':
      return 'Email address is not valid';

    case 'auth/operation-not-allowed':
      return 'Something went wrong';

    case 'auth/weak-password':
      return 'Password is not strong enough';

    case 'auth/wrong-password':
      return 'Incorrect Password';

    case 'auth/user-disabled':
      return 'Account disabled by admin';

    case 'auth/expired-action-code':
      return 'Verification link expired';

    case 'auth/user-not-found':
      return 'User not found';

    case 'auth/email-not-verified':
      return 'Please verify your email address first!';

    default:
      return 'Something went wrong, try again later';
  }
}
