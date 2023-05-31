import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    wrapper: {
        height: 48,
        borderRadius: 8,
        paddingHorizontal: 5,
        marginTop: 5,

    },
    inputContainer: {
        paddingVertical: 12,
    },
    icon: {
        color: 'black',
    },
    textInput: {
        flex: 1,
        width: '100%',
    },

    error: {
        color: "red",
        paddingTop: 4,
        fontSize: 12,
    },
});
