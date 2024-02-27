import React from 'react';
import {Dimensions} from 'react-native';
import CustomButton, {
  BtnTypes,
} from '@components/Common/CustomButton/CustomButton';
import {SemanticColors} from '@screens/../Themes/Scales';
import ViewComponent from '@components/Common/ViewComponent/ViewComponent';
import Container from '@components/Common/Container/Container';
import {useNavigation} from '@react-navigation/native';
import {FeatureRoutes, ScreenNavigationProps} from '@navigations/ScreenTypes';
import Header from '@assets/images/header.svg';
import Google from '@assets/images/google.svg';
import Email from '@assets/images/email.svg';
import TextComponent from '@components/Common/TextComponent/TextComponent';
import LandingIcon from '@assets/images/Landing.svg';
import {UserAuthActions} from '@screens/AuthStack/Redux/UserAuthSlice';
import {useAppDispatch} from '@helpers/AppStore/AppStore';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Landing = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<ScreenNavigationProps>();
  const insets = useSafeAreaInsets();

  return (
    <Container style={{flex: 1}}>
      <ViewComponent style={{}}>
        <Header
          width={'100%'}
          height={SCREEN_WIDTH * 0.4}
          preserveAspectRatio="xMaxYMax slice"
          fill={'green'}
        />
        <LandingIcon style={{height: SCREEN_WIDTH * 0.9, width: '100%'}} />
      </ViewComponent>
      <TextComponent
        variant={SemanticColors.HEADING}
        style={{textAlign: 'center', padding: 16}}>
        Wizard AI
      </TextComponent>
      <ViewComponent
        style={{
          padding: 10,
          flex: 1,
          justifyContent: 'flex-end',
          paddingBottom: insets.bottom,
        }}>
        <CustomButton
          title={'Continue with Email'}
          btnType={BtnTypes.PRIMARY}
          innerStyles={{borderRadius: 20}}
          logo={<Email width={30} height={30} stroke={'#263238'} />}
          onPress={() =>
            navigation.navigate(FeatureRoutes.ONBOARDING.FIND_USER)
          }
        />
        <CustomButton
          title={'Continue with Google'}
          btnType={BtnTypes.PRIMARY}
          logo={<Google width={30} height={30} stroke={'#263238'} />}
          innerStyles={{borderRadius: 20}}
          onPress={() => dispatch(UserAuthActions.signInViaGoogle())}
        />
      </ViewComponent>
    </Container>
  );
};

export default Landing;
