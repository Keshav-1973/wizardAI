import { Alert } from "react-native"


interface alertDialogData {
    title: string;
    message: string;
    btnTextOne: string;
    btnTextTwo: string;
    onOk: () => void;
    onCancel: () => void;
};

export const InAppNotificationManager = {
    notifySuccess: (title: string, message: string) => {
        Alert.alert(title, message);
    },
    notifyError: (title: string, message: string) => {
        Alert.alert(title, message);
    },
    notifyWarning: (title: string, message: string) => {
        Alert.alert(title, message);
    },
    createTwoButtonAlert: (alertDialogData: alertDialogData) => {
        const { title, message, onOk, onCancel, btnTextOne, btnTextTwo } = alertDialogData
        Alert.alert(
            title,
            message,
            [
                { text: btnTextOne, onPress: () => onOk() },
                {
                    text: btnTextTwo,
                    onPress: () => onCancel(),
                    style: "cancel"
                },

            ]
        );
    },
    createOneButtonAlert: (title: string, message: string) => {
        Alert.alert(title, message, [{ text: 'OK' }], { cancelable: true })
    },
}