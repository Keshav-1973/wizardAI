import * as React from 'react';
import {
    StyleProp,
    TouchableOpacity,
    ViewStyle
} from 'react-native';
import TextComponent from '@components/Common/TextComponent/TextComponent';
import { useAppSelector } from '@helpers/AppStore/AppStore';
import { ThemeTypes } from '@themes/redux/ThemeConstant';
import { SemanticColors } from '@themes/Scales';

type Props = {
    onPress?: () => void;
    text: string;
    styles?: StyleProp<ViewStyle>
};

const LinkText = (props: Props) => {
    const currentTheme = useAppSelector((state) => state.theme.currentTheme);

    return (
        <TouchableOpacity onPress={props.onPress} style={props.styles}>
            <TextComponent
                style={{
                    // color: currentTheme === ThemeTypes.DARK ? 'white' : '#002852',
                    textDecorationLine: 'underline',
                    // fontSize: 14,
                    // marginTop: 15,
                    // marginLeft: 5,
                }}
                variant={SemanticColors.SECONDARY_TEXT}>
                {props.text}
            </TextComponent>
        </TouchableOpacity>
    )

}

export default LinkText;