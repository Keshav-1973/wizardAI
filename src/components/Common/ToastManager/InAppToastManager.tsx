import Toast, {ToastType} from 'react-native-toast-message';

export const SUCCESS_TOAST = 'successToast';
export const ERROR_TOAST = 'errorToast';

export const InAppToastManager = {
  showToast: (type: ToastType, propsObject: any) => {
    Toast.show({
      type: type,
      props: propsObject,
    });
  },
};
