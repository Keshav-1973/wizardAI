import { ToastAndroid } from 'react-native';

export const InAppToastManager = {
    showToast: (msg: string) => {
        ToastAndroid.showWithGravityAndOffset(
            msg,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            25,
            50
        );
    },
};
