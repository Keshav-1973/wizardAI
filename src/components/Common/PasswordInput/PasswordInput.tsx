import React from 'react';
import InputField from '../InputField/InputField';
import Password from '@assets/images/password.svg';
import Eye from '@assets/images/eye.svg';
import EyeOff from '@assets/images/eyeOff.svg';
import {KeyboardTypeOptions, Platform} from 'react-native';
import {ColorPalette} from '@themes/Scales';
import useToggle from '../Hooks/useToggle';

interface Props {
  value?: string;
  label?: string;
  icon?: React.JSX.Element;
  iconPosition?: string;
  error?: string | undefined;
  touched?: boolean;
  onChange?: () => void;
  onSubmitEditing?: any;
  keyboardType?: KeyboardTypeOptions;
  rightIcon?: React.JSX.Element;
  onBlur?: () => void;
}

const PasswordInput = (props: Props) => {
  const {onChange, onBlur, value, error} = props;
  const {toggleValue, toggle} = useToggle(true);

  const makePasswordIcon = () => {
    if (!toggleValue) {
      return <Eye width={20} height={20} style={{marginHorizontal: 5}} />;
    } else if (toggleValue) {
      return <EyeOff width={20} height={20} style={{marginHorizontal: 5}} />;
    }
  };

  return (
    <InputField
      label={''}
      placeholder="Password"
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      error={error}
      icon={
        <Password
          width={20}
          height={20}
          style={{marginHorizontal: 5}}
          fill={ColorPalette.DARK_GREEN}
        />
      }
      iconPosition="left"
      rightIcon={makePasswordIcon()}
      onIconPress={toggle}
      secureTextEntry={toggleValue}
      keyboardType={toggleValue ? 'default' : 'visible-password'}
    />
  );
};

export default PasswordInput;
