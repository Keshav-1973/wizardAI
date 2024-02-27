import React, {useState} from 'react';
import {
  useForm,
  Controller,
  useFormState,
  useWatch,
  Control,
  FieldErrors,
  FieldValues,
} from 'react-hook-form';
import CustomButton, {
  BtnTypes,
} from '@components/Common/CustomButton/CustomButton';
import InputField from '@components/Common/InputField/InputField';
import Wrapper from '@components/Common/Wrapper/Wrapper';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ViewComponent from '@components/Common/ViewComponent/ViewComponent';
import Container from '@components/Common/Container/Container';
import {useNavigation} from '@react-navigation/native';
import {FeatureRoutes, ScreenNavigationProps} from '@navigations/ScreenTypes';
import {FindUserFormData, EmailScreenType} from '@screens/AuthStack/AuthRoutes';
import Email from '@assets/images/email.svg';
import TextComponent from '@components/Common/TextComponent/TextComponent';
import {ColorPalette, SemanticColors} from '@themes/Scales';
import User from '@assets/images/user.svg';
import LinkText from '@components/Common/LinkText/Linktext';
import {UserAuthActions} from '../Redux/UserAuthSlice';
import {useAppDispatch} from '@helpers/AppStore/AppStore';
import {OnboardingScreenProps} from '@screens/AuthStack/AuthRoutes';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import useKeyboardStatus from '@components/Common/Hooks/useKeyBoardStatus';
import KeyboardAwareContainer from '@components/Common/KeyboardAwareContainer/KeyboardAwareContainer';
import PasswordInput from '@components/Common/PasswordInput/PasswordInput';
import {mapAuthCodeToMessage} from '@helpers/CommonFunctions/CommonFunctions';
import {
  ERROR_TOAST,
  InAppToastManager,
} from '@components/Common/ToastManager/InAppToastManager';

const schema = yup.object().shape({
  email: yup.string().email().required('Email is Required'),
});

const loginSchema = yup.object().shape({
  email: yup.string().email().required('Email is Required'),
  password: yup.string().required('Password is Required'),
});

const renderPass = (
  control: Control<FieldValues> | any,
  errors: FieldErrors<FindUserFormData>,
) => {
  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({field: {onChange, onBlur, value}}) => (
        <PasswordInput
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          error={errors.password?.message}
        />
      )}
      name="password"
    />
  );
};

const defaultValues = {
  email: '',
};

const loginDefaultValues = {
  email: '',
  password: '',
};

const FindUser = (props: OnboardingScreenProps<'/auth/findUser'>) => {
  const [pass, setPass] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation<ScreenNavigationProps>();
  const dispatch = useAppDispatch();

  const checkMailExistence = async (email: string): Promise<string[]> => {
   return await dispatch(UserAuthActions.checkIfEmailExists(email)).unwrap();
  };

  const forgotPass = async () => {
    const {email} = getValues();
    if (email) {
      const res = await checkMailExistence(email);
      if (res.length) {
        navigation.navigate(FeatureRoutes.ONBOARDING.VERIFY_EMAIL, {
          email,
          screenType: EmailScreenType.RESET_PASSWORD,
        });
      }
    }
  };

  const renderForgotPass = () => {
    return (
      <ViewComponent style={{alignSelf: 'flex-end', padding: 10}}>
        <LinkText text={'Forgot Password?'} onPress={forgotPass} />
      </ViewComponent>
    );
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm<FindUserFormData>({
    defaultValues: pass ? loginDefaultValues : defaultValues,
    resolver: yupResolver(pass ? loginSchema : schema),
  });

  const onSubmit = async (payload: FindUserFormData) => {
    setLoading(true);
    const {email, password} = payload;
    const res = await checkMailExistence(email);
    if (res.length) {
      setPass(true);
      if (email && password) {
        try {
          const response = await dispatch(
            UserAuthActions.signInViaEmailPass(payload),
          ).unwrap()
          const isEmailVerified = response?.user?.emailVerified;
          if (isEmailVerified) {
            dispatch(UserAuthActions.logIn(response));
          } else if (!isEmailVerified) {
            throw {
              code: 'auth/email-not-verified',
              error: new Error(),
            };
          }
        } catch (error) {
          const data = mapAuthCodeToMessage(error.code);
          InAppToastManager.showToast(ERROR_TOAST, {
            title: data,
          });

          navigation.navigate(FeatureRoutes.ONBOARDING.VERIFY_EMAIL, {
            email,
            screenType: EmailScreenType.EMAIL_VERIFICATION,
          });
        }
      }
    } else {
      navigation.navigate(FeatureRoutes.ONBOARDING.SIGN_UP, {payload});
    }
    setLoading(false);
  };

  return (
    <Wrapper navHeading="Email">
      <Container isPadded={true}>
        <KeyboardAwareContainer>
          <ViewComponent
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 24,
            }}>
            <ViewComponent
              style={{
                width: 100,
                height: 100,
                borderRadius: 100,
                backgroundColor: ColorPalette.DARK_GREEN,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Email
                width={40}
                height={40}
                style={{}}
                fill={ColorPalette.BLACK}
              />
            </ViewComponent>
            <TextComponent variant={SemanticColors.HEADING}>
              Email
            </TextComponent>
            <TextComponent variant={SemanticColors.SUBSCRIPT}>
              Enter Your Email Address to Login or Register
            </TextComponent>
          </ViewComponent>
          <ViewComponent style={{flex: 0.3}}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputField
                  label={''}
                  placeholder="Enter Email"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.email?.message}
                  icon={
                    <Email
                      width={20}
                      height={20}
                      style={{marginHorizontal: 5}}
                      stroke={ColorPalette.DARK_GREEN}
                    />
                  }
                  iconPosition="left"
                />
              )}
              name="email"
            />
            {pass && renderPass(control, errors)}
            <CustomButton
              loading={loading}
              title={pass ? 'Login' : 'Proceed'}
              loadingTitle="Please Wait..."
              btnType={BtnTypes.PRIMARY}
              onPress={handleSubmit(onSubmit)}
              innerStyles={{borderRadius: 20}}
            />
            {pass && renderForgotPass()}
          </ViewComponent>
        </KeyboardAwareContainer>
      </Container>
    </Wrapper>
  );
};

export default FindUser;
