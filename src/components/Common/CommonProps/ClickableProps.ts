import { NativeSyntheticEvent } from "react-native";

export interface ClickableProps {
    onPress?: () => void;
    onLongPress?: () => void;
    onFocus?: () => void;
    onBlur?: (e: React.FocusEvent | NativeSyntheticEvent<any>) => void;
}
