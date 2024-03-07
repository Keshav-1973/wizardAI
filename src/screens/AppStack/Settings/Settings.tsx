import React, {useCallback, useState} from 'react';
import CustomButton, {
  BtnTypes,
} from '@components/Common/CustomButton/CustomButton';
import ViewComponent from '@components/Common/ViewComponent/ViewComponent';
import Wrapper from '@components/Common/Wrapper/Wrapper';
import {useAppDispatch, useAppSelector} from '@helpers/AppStore/AppStore';
import {UserAuthActions} from '@screens/AuthStack/Redux/UserAuthSlice';
import styles from './styles';
import {UserType} from '@screens/AuthStack/AuthRoutes';
import InputField from '@components/Common/InputField/InputField';
import {SettingsActions} from './Redux/SettingsSlice';

const Settings = () => {
  const [color, setColor] = useState<string>('');

  const dispatch = useAppDispatch();
  const userCredentials = useAppSelector(
    state => state.userAuth.userCredentials,
  );
  const bgColor = useAppSelector(state => state.settings.bgColor);

  const USER_TYPE = userCredentials?.userName;
  const isAdmin = USER_TYPE === UserType.ADMIN;
  const bgForUser = !isAdmin ? bgColor : 'white';

  const logout = useCallback(() => {
    dispatch(UserAuthActions.logOut());
  }, [dispatch]);

  const editBg = useCallback(() => {
    dispatch(SettingsActions.editBg(color));
  }, [color]);

  return (
    <Wrapper navHeading="Settings" canGoback={false}>
      <ViewComponent style={styles.wrapper(bgForUser)}>
        {isAdmin && (
          <ViewComponent style={styles.wrapper2}>
            <InputField
              label={'Edit Background Color for user'}
              placeholder="hex value of color eg:#0000"
              onChange={text => {
                setColor(text.trim());
              }}
              defaultValue={color}
              value={color}
            />
            <CustomButton
              title={'Set Color'}
              btnType={BtnTypes.PRIMARY}
              onPress={editBg}
            />
          </ViewComponent>
        )}

        <CustomButton
          title={'LogOut'}
          btnType={BtnTypes.PRIMARY}
          onPress={logout}
        />
      </ViewComponent>
    </Wrapper>
  );
};

export default Settings;
