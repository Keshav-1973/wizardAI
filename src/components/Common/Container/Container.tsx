import React, { useRef, useState, useEffect } from 'react';
import { Keyboard, StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native';
import { SemanticColors } from '@screens/../Themes/Scales';
import ViewComponent from '@components/Common/ViewComponent/ViewComponent';


type Props = {
    children: JSX.Element | JSX.Element[];
    style?: StyleProp<ViewStyle>
};

const Container = ({ children, style }: Props) => {

    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                scrollViewRef.current?.scrollToEnd({ animated: true })
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                scrollViewRef.current?.scrollTo({
                    y: 0,
                    animated: true,
                });
            }
        );

        return () => {

            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);


    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="always"
            ref={scrollViewRef}
        >
            <ViewComponent
                style={[style ? style : styles.wrapper]}
                backgroundColor={SemanticColors.MAIN_BACKGROUND}
            >
                {children}
            </ViewComponent>
        </ScrollView>
    );
};

export default Container;


const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        flex: 1,
        height: '100%',
    },
});


