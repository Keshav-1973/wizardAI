import React from 'react';
import {AppScreenProps} from '../AppRoutes';
import Wrapper from '@components/Common/Wrapper/Wrapper';
import TextComponent from '@components/Common/TextComponent/TextComponent';
import {SemanticColors} from '@themes/Scales';
import ViewComponent from '@components/Common/ViewComponent/ViewComponent';
import styles from './styles';
import {useAppSelector} from '@helpers/AppStore/AppStore';
import {UserType} from '@screens/AuthStack/AuthRoutes';

const Success = (props: AppScreenProps<'/app/placed'>) => {
  const userCredentials = useAppSelector(
    state => state.userAuth.userCredentials,
  );
  const bgColor = useAppSelector(state => state.settings.bgColor);

  const USER_TYPE = userCredentials?.userName;
  const isAdmin = USER_TYPE === UserType.ADMIN;
  const bgForUser = !isAdmin ? bgColor : 'white';
  return (
    <Wrapper navHeading="Order Placed">
      <ViewComponent style={styles.wrapper(bgForUser)}>
        <TextComponent
          color={SemanticColors.MAIN_BACKGROUND}
          fontSize={20}
          textAlign={'center'}>
          Thank You for placing an order with us. Your Order will arrive
          shortly!!
        </TextComponent>
      </ViewComponent>
    </Wrapper>
  );
};

export default Success;
