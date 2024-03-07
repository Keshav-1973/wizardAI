import React, {useCallback} from 'react';
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
import TextComponent from '@components/Common/TextComponent/TextComponent';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FoodOrder from '@assets/images/foodOrder.svg';
import {UserType} from '../AuthRoutes';
import User from '@assets/images/user.svg';
import Password from '@assets/images/password.svg';
import styles from './styles';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Landing = () => {
  const navigation = useNavigation<ScreenNavigationProps>();
  const insets = useSafeAreaInsets();

  const navigateToLogin = useCallback(
    (userType: string) => {
      navigation.navigate(FeatureRoutes.ONBOARDING.FIND_USER, {
        payload: userType,
      });
    },
    [navigation],
  );

  return (
    <Container>
      <ViewComponent>
        <Header
          width={'100%'}
          height={SCREEN_WIDTH * 0.4}
          preserveAspectRatio="xMaxYMax slice"
          fill={'green'}
        />
        <FoodOrder style={styles(insets).icon} />
      </ViewComponent>
      <TextComponent
        variant={SemanticColors.HEADING}
        style={styles(insets).label}>
        LIQVIDOMATO
      </TextComponent>
      <ViewComponent style={styles(insets).btnWrapper}>
        <CustomButton
          title={'Continue as Admin'}
          btnType={BtnTypes.PRIMARY}
          innerStyles={styles(insets).btn1}
          logo={<Password width={30} height={30} stroke={'#263238'} />}
          onPress={() => {
            navigateToLogin(UserType.ADMIN);
          }}
        />
        <CustomButton
          title={'Continue as User'}
          btnType={BtnTypes.PRIMARY}
          logo={<User width={30} height={30} stroke={'#263238'} />}
          innerStyles={styles(insets).btn2}
          onPress={() => {
            navigateToLogin(UserType.USER);
          }}
        />
      </ViewComponent>
    </Container>
  );
};

export default Landing;
