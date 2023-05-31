import React, { useEffect, useState } from "react";
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
import LinkText from "@components/Common/LinkText/Linktext";
import VerifyMail from "@assets/images/verifyMail.svg"
import { OnboardingScreenProps } from "@screens/AuthStack/AuthRoutes";
import { openInbox } from "react-native-email-link";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import dynamicLinks, { FirebaseDynamicLinksTypes } from '@react-native-firebase/dynamic-links';




const SCREEN_WIDTH = Dimensions.get("window").width;

type FormData = {
    firstName: string;
    lastName: string;
};


const VerifyEmail = (props: OnboardingScreenProps<"/auth/verifyEmail">) => {

    const navigation = useNavigation<ScreenNavigationProps>()

    const email = props.route.params?.email
    console.log(props.route, ",....props.route.params?.email")
    return (
        <Wrapper navHeading="Verify Email Address">
            <Container style={{ flex: 1, justifyContent: "space-evenly" }}>
                <ViewComponent style={{ justifyContent: "center", alignItems: "center", }}>
                    <TextComponent variant={SemanticColors.HEADING}>
                        Success!
                    </TextComponent>
                    <VerifyMail width={300} height={SCREEN_WIDTH * 0.7} fill={"green"} stroke={"green"} />
                </ViewComponent>
                <ViewComponent style={{ padding: 10, }}>
                    <TextComponent style={{ alignSelf: "center", padding: 20, textAlign: "center" }} variant={SemanticColors.SECONDARY_TEXT}>
                        We have sent you an email verification to {`\n`}
                        <TextComponent color={SemanticColors.MAIN_FOREGROUND}>
                            {email}
                        </TextComponent>
                    </TextComponent>
                    <CustomButton
                        title={"Proceed"}
                        btnType={BtnTypes.PRIMARY}
                        innerStyles={{ borderRadius: 20 }}
                        onPress={() => openInbox()}
                    />
                </ViewComponent>
            </Container>
        </Wrapper>
    )

}


export default VerifyEmail;