import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import CustomButton, {
  BtnTypes,
} from '@components/Common/CustomButton/CustomButton';
import InputField from '@components/Common/InputField/InputField';
import Wrapper from '@components/Common/Wrapper/Wrapper';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ViewComponent from '@components/Common/ViewComponent/ViewComponent';
import Container from '@components/Common/Container/Container';
import {FindUserFormData, UserType} from '@screens/AuthStack/AuthRoutes';
import TextComponent from '@components/Common/TextComponent/TextComponent';
import {ColorPalette, SemanticColors} from '@themes/Scales';
import User from '@assets/images/user.svg';
import {UserAuthActions} from '../Redux/UserAuthSlice';
import {useAppDispatch} from '@helpers/AppStore/AppStore';
import {OnboardingScreenProps} from '@screens/AuthStack/AuthRoutes';
import KeyboardAwareContainer from '@components/Common/KeyboardAwareContainer/KeyboardAwareContainer';
import PasswordInput from '@components/Common/PasswordInput/PasswordInput';
import {
  ERROR_TOAST,
  InAppToastManager,
} from '@components/Common/ToastManager/InAppToastManager';
import styles from './styles';

const loginSchema = yup.object().shape({
  userName: yup.string().required('Username is Required'),
  password: yup.string().required('Password is Required'),
});

const loginDefaultValues = {
  userName: '',
  password: '',
};

const FindUser = (props: OnboardingScreenProps<'/auth/findUser'>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const userType = props.route.params?.payload;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FindUserFormData>({
    defaultValues: loginDefaultValues,
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (payload: FindUserFormData) => {
    setLoading(true);
    const {userName, password} = payload;
    if (userType === UserType.ADMIN) {
      if (userName === UserType.ADMIN && password === UserType.ADMIN) {
        dispatch(UserAuthActions.logIn(payload));
      } else {
        InAppToastManager.showToast(ERROR_TOAST, {
          title: 'Wrong Credentials',
        });
      }
    } else if (userType === UserType.USER) {
      if (userName === UserType.USER && password === UserType.USER) {
        dispatch(UserAuthActions.logIn(payload));
      } else {
        InAppToastManager.showToast(ERROR_TOAST, {
          title: 'Wrong Credentials',
        });
      }
    }
    setLoading(false);
  };

  return (
    <Wrapper navHeading="Login">
      <Container isPadded={true}>
        <KeyboardAwareContainer>
          <ViewComponent style={styles.wrapper1}>
            <ViewComponent style={styles.wrapper2}>
              <User width={40} height={40} stroke={ColorPalette.BLACK} />
            </ViewComponent>
            <TextComponent
              variant={SemanticColors.SUBSCRIPT}
              style={styles.label}>
              Enter Your UserName and Password to continue as {userType}
            </TextComponent>
          </ViewComponent>
          <ViewComponent style={styles.flex}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputField
                  label={''}
                  placeholder="UserName"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.userName?.message}
                  icon={
                    <User
                      width={20}
                      height={20}
                      stroke={ColorPalette.DARK_GREEN}
                      style={styles.margin}
                    />
                  }
                  iconPosition="left"
                />
              )}
              name="userName"
            />
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
            <CustomButton
              loading={loading}
              title={'Proceed'}
              loadingTitle="Please Wait..."
              btnType={BtnTypes.PRIMARY}
              onPress={handleSubmit(onSubmit)}
              customStyles={styles.padding}
              innerStyles={styles.borderRad}
            />
          </ViewComponent>
        </KeyboardAwareContainer>
      </Container>
    </Wrapper>
  );
};

export default FindUser;
