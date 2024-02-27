import {ToastAndroid} from 'react-native';
import Toast, {ToastType} from 'react-native-toast-message';

export const SUCCESS_TOAST = 'successToast';
export const ERROR_TOAST = 'errorToast';

export const InAppToastManager = {
  showToast: (type: ToastType, propsObject: any) => {
    Toast.show({
      type: type,
      props: propsObject,
    });

    // ToastAndroid.showWithGravityAndOffset(
    //   msg,
    //   ToastAndroid.LONG,
    //   ToastAndroid.TOP,
    //   25,
    //   50,
    // );
  },
};
