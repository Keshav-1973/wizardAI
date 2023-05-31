import * as React from 'react';
import {
    AccessibilityInfo,
    findNodeHandle,
    StyleSheet,
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { FC } from 'react';
import { useTheme } from '@shopify/restyle';
import ViewComponent from '@components/Common/ViewComponent/ViewComponent';
import TextComponent from '@components/Common/TextComponent/TextComponent';
import { ColorPalette, SemanticColors } from '@screens/../Themes/Scales';
import { ThemeType } from '@themes/Themes';

interface props {
    navHeading: string;
    icon?: any;
    onPressIcon?: () => void;
    accessibilityLabel?: string;
    children: JSX.Element
}

const Wrapper: FC<props> = (props) => {

    const navigation = useNavigation();
    const theme = useTheme<ThemeType>();

    return (
        <ViewComponent style={{ flex: 1 }}>
            <Appbar.Header
                style={{
                    width: '100%',
                    backgroundColor: theme.colors.mainBackground,
                }}
            >
                <Appbar.BackAction
                    onPress={() => {
                        if (navigation.canGoBack()) {
                            navigation.goBack();
                        }
                    }}
                    color={ColorPalette.DARK_GREEN}
                />
                <ViewComponent style={styles.header}>
                    <Appbar.Content
                        title={props.navHeading}
                        style={styles.heading}
                        color={ColorPalette.DARK_GREEN}
                        titleStyle={{fontWeight:"700"}}
                    />
                    {props.icon && <TouchableOpacity
                        style={styles.icon}
                        onPress={props.onPressIcon}
                        accessibilityRole="button"
                        accessibilityLabel={props.accessibilityLabel}
                    >
                        {props.icon}
                    </TouchableOpacity>}
                </ViewComponent>
            </Appbar.Header>
            <ViewComponent style={[styles.children]}>{props.children}</ViewComponent>
        </ViewComponent>
    );
};

const styles = StyleSheet.create({
    children: {
        flex: 1,
        width: '100%',
    },
    heading: {
        width: "80%",
        justifyContent: "center",
    },
    header: {
        width: "100%",
        justifyContent: "center",
    },
    icon: {
        position: "absolute",
        right: 0,
        margin: 10,
        width: "20%"
    }
});

export default Wrapper;

