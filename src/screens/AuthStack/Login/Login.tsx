import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { useForm, Controller, useFormState, useWatch } from 'react-hook-form'
import CustomButton, { BtnTypes } from "@components/Common/CustomButton/CustomButton";
import InputField from "@components/Common/InputField/InputField";
import Wrapper from "@components/Common/Wrapper/Wrapper";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import ViewComponent from "@components/Common/ViewComponent/ViewComponent";
import Container from "@components/Common/Container/Container";
import { OnboardingScreenProps } from "@screens/AuthStack/AuthRoutes";


type FormData = {
    fullName: string;
    password: string;
};

const schema = yup.object().shape({
    fullName: yup.string()
        .required('Required')
        .min(3, 'Too short')
        .max(30, 'Too long'),
    password: yup.string(),
});

const onSubmit = (data: any) => {
    console.log(data, "..........");
}


const Login = (props: OnboardingScreenProps<"/auth/login">) => {
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            fullName: '',
            password: ''
        },
        resolver: yupResolver(schema)
    });

    return (
        <Wrapper navHeading="Login">
            <Container>
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
                        />)}
                    name="password"
                />
                <CustomButton
                    title={"Sign In"}
                    btnType={BtnTypes.PRIMARY}
                    onPress={handleSubmit(onSubmit)}
                    innerStyles={{ borderRadius: 20 }}
                />
            </Container>
        </Wrapper>
    )

}


export default Login;