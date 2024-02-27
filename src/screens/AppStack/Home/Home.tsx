import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import CustomButton, {
  BtnTypes,
} from '@components/Common/CustomButton/CustomButton';
import {useDispatch} from 'react-redux';
import {UserAuthActions} from '@screens/AuthStack/Redux/UserAuthSlice';
const Home = () => {
  console.log('Home');
  const dispatch = useDispatch();

  return (
    <View style={{backgroundColor: 'yellow', height: '100%'}}>
      <CustomButton
        title={'Continue with Google'}
        btnType={BtnTypes.PRIMARY}
        innerStyles={{borderRadius: 20}}
        onPress={() => dispatch(UserAuthActions.signOutViaGoogle())}
      />
    </View>
  );
};

export default Home;
