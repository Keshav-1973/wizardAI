import React, {useEffect, useState} from 'react';
import {View, Text, Button, Dimensions} from 'react-native';
import {useForm, Controller, useFormState, useWatch} from 'react-hook-form';
import CustomButton, {
  BtnTypes,
} from '@components/Common/CustomButton/CustomButton';
import InputField from '@components/Common/InputField/InputField';
import Wrapper from '@components/Common/Wrapper/Wrapper';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  ColorPalette,
  SemanticColors,
  Spacings,
} from '@screens/../Themes/Scales';
import ViewComponent from '@components/Common/ViewComponent/ViewComponent';
import Container from '@components/Common/Container/Container';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {FeatureRoutes, ScreenNavigationProps} from '@navigations/ScreenTypes';
import Header from '@assets/images/header.svg';
import Google from '@assets/images/google.svg';
import Email from '@assets/images/email.svg';
import TextComponent from '@components/Common/TextComponent/TextComponent';
import LinkText from '@components/Common/LinkText/Linktext';
import VerifyMail from '@assets/images/verifyMail.svg';
import {OnboardingScreenProps} from '@screens/AuthStack/AuthRoutes';
import {openInbox} from 'react-native-email-link';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import dynamicLinks, {
  FirebaseDynamicLinksTypes,
} from '@react-native-firebase/dynamic-links';
import {UserAuthActions} from '../Redux/UserAuthSlice';
import {useAppDispatch, useAppSelector} from '@helpers/AppStore/AppStore';
import {
  ERROR_TOAST,
  InAppToastManager,
} from '@components/Common/ToastManager/InAppToastManager';
import {mapAuthCodeToMessage} from '@helpers/CommonFunctions/CommonFunctions';

const SCREEN_WIDTH = Dimensions.get('window').width;

type FormData = {
  firstName: string;
  lastName: string;
};

const VerifyEmail = (props: OnboardingScreenProps<'/auth/verifyEmail'>) => {
  const navigation = useNavigation<ScreenNavigationProps>();
  const dispatch = useAppDispatch();
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const userData = useAppSelector(state => state.userAuth.userCredentials);

  const email = props.route.params?.email;

  const oobCode = props.route.params?.oobCode;

  console.log(props.route.params);

  const handleEmailVerification = async () => {
    setLoading(true);
    try {
      const data = await dispatch(UserAuthActions.CheckIfEmailVerified());
      if (oobCode && !data?.payload) {
        const response = await dispatch(UserAuthActions.VerifyEmail(oobCode));
        if (!response?.error?.code) {
          dispatch(UserAuthActions.logIn(userData));
          setIsVerified(true);
        }
      } else {
        setIsVerified(false);
      }
    } catch (error) {
      console.error('Error in handleEmailVerification:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isVerified) {
    }
  }, [isFocused, oobCode, isVerified]);

  useEffect(() => {
    if (isFocused) {
      handleEmailVerification();
    }
  }, [oobCode, isFocused]);

  return (
    <Wrapper navHeading="Verify Email Address">
      <Container style={{flex: 1, justifyContent: 'space-evenly'}}>
        <ViewComponent style={{justifyContent: 'center', alignItems: 'center'}}>
          <TextComponent variant={SemanticColors.HEADING}>
            {isVerified ? 'Success' : 'Pending!'}
          </TextComponent>
          <VerifyMail
            width={300}
            height={SCREEN_WIDTH * 0.7}
            fill={'green'}
            stroke={'green'}
          />
        </ViewComponent>
        <ViewComponent style={{padding: 10}}>
          <TextComponent
            style={{alignSelf: 'center', padding: 20, textAlign: 'center'}}
            variant={SemanticColors.SECONDARY_TEXT}>
            We have sent you an email verification {email && 'to'}
            {`\n`}
            {email && (
              <TextComponent color={SemanticColors.MAIN_FOREGROUND}>
                {email}
              </TextComponent>
            )}
          </TextComponent>
          <CustomButton
            loading={loading}
            loadingTitle="Checking"
            title={'Proceed'}
            btnType={BtnTypes.PRIMARY}
            innerStyles={{borderRadius: 20}}
            onPress={openInbox}
          />
        </ViewComponent>
      </Container>
    </Wrapper>
  );
};

export default VerifyEmail;
