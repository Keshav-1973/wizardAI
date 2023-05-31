import React, { useState } from "react";
import { View, Text, Button, Dimensions } from "react-native";
import { useForm, Controller, useFormState, useWatch } from 'react-hook-form'
import CustomButton, { BtnTypes } from "@components/Common/CustomButton/CustomButton";
import InputField from "@components/Common/InputField/InputField";
import Wrapper from "@components/Common/Wrapper/Wrapper";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { ColorPalette, SemanticColors, Spacings } from '@screens/../Themes/Scales';
import ViewComponent from "@components/Common/ViewComponent/ViewComponent";
import Container from "@components/Common/Container/Container";
import { useNavigation } from "@react-navigation/native";
import { FeatureRoutes, ScreenNavigationProps } from '@navigations/ScreenTypes';
import Header from "@assets/images/header.svg"
import Google from "@assets/images/google.svg"
import Email from "@assets/images/email.svg"
import TextComponent from "@components/Common/TextComponent/TextComponent";
import LandingIcon from "@assets/images/Landing.svg";
import { UserAuthActions } from "@screens/AuthStack/Redux/UserAuthSlice";
import { useAppDispatch } from "@helpers/AppStore/AppStore";
import axios from 'axios';

const SCREEN_WIDTH = Dimensions.get("window").width;

const Landing = () => {
    const dispatch = useAppDispatch()
    const navigation = useNavigation<ScreenNavigationProps>()

    return (
        <Container style={{ flex: 1, }}>
            <ViewComponent style={{}}>
                <Header width={"100%"} height={SCREEN_WIDTH * 0.4} preserveAspectRatio="xMaxYMax slice"
                    fill={"green"} style={{}}
                />
                <LandingIcon
                    style={{ height: SCREEN_WIDTH * 0.9, width: "100%" }}
                />
            </ViewComponent>
            <ViewComponent style={{ padding: 10, flex: 1, justifyContent: "center" }}>
                <CustomButton
                    title={"Continue with Email"}
                    btnType={BtnTypes.PRIMARY}
                    innerStyles={{ borderRadius: 20 }}
                    logo={<Email width={30} height={30} style={{ marginLeft: 10 }} stroke={"#263238"} />}
                    onPress={() => navigation.navigate(FeatureRoutes.ONBOARDING.FIND_USER)}
                />
                <CustomButton
                    title={"Continue with Google"}
                    btnType={BtnTypes.PRIMARY}
                    logo={<Google width={30} height={30} style={{ marginLeft: 10 }} stroke={"#263238"} />}
                    innerStyles={{ borderRadius: 20 }}
                    onPress={() => dispatch(UserAuthActions.signInViaGoogle())}
                />
            </ViewComponent>
        </Container>
    )
}


export default Landing;