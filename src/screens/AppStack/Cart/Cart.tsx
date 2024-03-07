import React, {useCallback} from 'react';
import {AppScreenProps} from '../AppRoutes';
import Wrapper from '@components/Common/Wrapper/Wrapper';
import MenuItemCard from '@components/Common/MenuItemCard/MenuItemCard';
import ViewComponent from '@components/Common/ViewComponent/ViewComponent';
import TextComponent from '@components/Common/TextComponent/TextComponent';
import {SemanticColors} from '@themes/Scales';
import CustomButton, {
  BtnTypes,
} from '@components/Common/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {FeatureRoutes, ScreenNavigationProps} from '@navigations/ScreenTypes';
import styles from './styles';
import {useAppSelector} from '@helpers/AppStore/AppStore';
import {UserType} from '@screens/AuthStack/AuthRoutes';

const Cart = (props: AppScreenProps<'/app/cart'>) => {
  const {payload, count} = props.route.params;

  const navigation = useNavigation<ScreenNavigationProps>();

  const navigateToSuccess = useCallback(() => {
    navigation.navigate(FeatureRoutes.APP.PLACED);
  }, [navigation]);

  const userCredentials = useAppSelector(
    state => state.userAuth.userCredentials,
  );
  const bgColor = useAppSelector(state => state.settings.bgColor);

  const USER_TYPE = userCredentials?.userName;
  const isAdmin = USER_TYPE === UserType.ADMIN;
  const bgForUser = !isAdmin ? bgColor : 'white';

  return (
    <Wrapper navHeading="Cart">
      <ViewComponent style={styles.wrapper1(bgForUser)}>
        <MenuItemCard
          item={{
            id: payload.id,
            title: payload.title,
            imgSrc: payload.imgSrc,
            isVeg: payload.isVeg,
            rating: payload.rating,
            price: payload.price,
            isPresent: payload.isPresent,
          }}
          btnTitle={'Place Order'}
          canShowBtn={false}
        />
        <ViewComponent style={styles.wrapper2}>
          <TextComponent
            color={SemanticColors.MAIN_BACKGROUND}
            style={styles.bill}>
            Total Price: ₹{Number(payload.price) * count}
          </TextComponent>
        </ViewComponent>
        <CustomButton
          title={'Place Order'}
          btnType={BtnTypes.PRIMARY}
          innerStyles={{borderRadius: 20}}
          onPress={navigateToSuccess}
        />
      </ViewComponent>
    </Wrapper>
  );
};
export default Cart;
