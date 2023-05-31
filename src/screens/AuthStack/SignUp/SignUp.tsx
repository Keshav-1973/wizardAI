import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { useForm, Controller, useFormState, useWatch, Control, FieldErrors, FieldValues } from 'react-hook-form'
import CustomButton, { BtnTypes } from "@components/Common/CustomButton/CustomButton";
import InputField from "@components/Common/InputField/InputField";
import Wrapper from "@components/Common/Wrapper/Wrapper";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import ViewComponent from "@components/Common/ViewComponent/ViewComponent";
import Container from "@components/Common/Container/Container";
import { useNavigation } from "@react-navigation/native";
import { FeatureRoutes, ScreenNavigationProps } from "@navigations/ScreenTypes";
import { RegisterFormData } from "@screens/AuthStack/AuthRoutes";
import TextComponent from "@components/Common/TextComponent/TextComponent";
import { ColorPalette, SemanticColors } from "@themes/Scales";
import User from "@assets/images/user.svg"
import Password from "@assets/images/password.svg"
import { UserAuthActions } from "../Redux/UserAuthSlice";
import { useAppDispatch } from "@helpers/AppStore/AppStore";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { OnboardingScreenProps, FindUserFormData, EmailScreenType } from "@screens/AuthStack/AuthRoutes";




const Schema = yup.object().shape({
    fullName: yup.string()
        .required('Full Name is Required'),
    password: yup.string().required("Password is Required")
});

const defaultValues = {
    fullName: '',
    passWord: ""
}

const SignUp = (props: OnboardingScreenProps<"/auth/signUp">) => {
    const [loading, setLoading] = useState<boolean>(false)
    const navigation = useNavigation<ScreenNavigationProps>()
    const dispatch = useAppDispatch()
    const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
        defaultValues: defaultValues,
        resolver: yupResolver(Schema)
    });

    const email = props.route.params?.payload.email as string

    const onSubmit = async (data: RegisterFormData) => {
        setLoading(true)
        const obj: FindUserFormData = {
            email: email,
            password: data.password
        }
        const res = (await dispatch(UserAuthActions.createUserWithEmailAndPassword(obj)))?.payload as FirebaseAuthTypes.UserCredential

        console.log(res.user, ".....hehe")
        await res?.user?.sendEmailVerification({
            handleCodeInApp: true,
            url: `https://wizardai.page.link/?link=https://wizardai.page.link/email_verification?email=${email}`
        })
        if (res) {
            navigation.navigate(FeatureRoutes.ONBOARDING.VERIFY_EMAIL, { email, screenType: EmailScreenType.EMAIL_VERIFICATION })
        }
        setLoading(false)
    }
    // https://wizardai.page.link/?link=https://wizardai.page.link/auth/verify_email?email=%EMAIL%&isEmailVerified=true&apn=com.wizardai
    return (
        <Wrapper navHeading="Register">
            <Container>
                <ViewComponent style={{ flex: 0.3, justifyContent: "center", alignItems: "center", }}>
                    <ViewComponent style={{
                        width: 100,
                        height: 100,
                        borderRadius: 100,
                        backgroundColor: ColorPalette.DARK_GREEN,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <User width={40} height={40} style={{}} stroke={"black"} />
                    </ViewComponent>
                    <TextComponent variant={SemanticColors.HEADING}>
                        Register
                    </TextComponent>
                    <TextComponent variant={SemanticColors.SECONDARY_TEXT}>
                        Create Your Account with email {`\n`}
                        <TextComponent color={SemanticColors.SUBSCRIPT}
                            style={{
                                textDecorationLine: 'underline',
                            }}>
                            {email}
                        </TextComponent>
                    </TextComponent>
                </ViewComponent>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputField
                            label={''}
                            placeholder="Full Name"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                            error={errors.fullName?.message}
                            icon={<User width={20} height={20} style={{ marginHorizontal: 5 }} stroke={ColorPalette.DARK_GREEN} />
                            }
                            iconPosition="left"
                        />)}
                    name="fullName"
                />
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputField
                            label={''}
                            placeholder="Enter Password"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                            error={errors.password?.message}
                            icon={
                                <Password width={20} height={20} style={{ marginHorizontal: 5 }} fill={ColorPalette.DARK_GREEN} />
                            }
                            iconPosition="left"
                        />)}
                    name="password"
                />
                <CustomButton
                    loading={loading}
                    loadingTitle="Please Wait..."
                    title={"Proceed"}
                    btnType={BtnTypes.PRIMARY}
                    onPress={handleSubmit(onSubmit)}
                    innerStyles={{ borderRadius: 20 }}
                />
            </Container>
        </Wrapper>
    )

}


export default SignUp;