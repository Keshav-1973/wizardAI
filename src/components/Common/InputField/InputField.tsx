import { FC } from 'react';
import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { TextInput, KeyboardTypeOptions } from 'react-native';
// import colors from '../../../assets/themes/colors';
import styles from './styles';
// import { FormikErrors, FormikTouched } from 'formik';
import { InputProps } from '@components/Common/CommonProps/InputProps';
import TextComponent from '@components/Common/TextComponent/TextComponent';
import { SemanticColors } from '@screens/../Themes/Scales';
import { useTheme } from '@shopify/restyle';
import { useAppSelector } from '@helpers/AppStore/AppStore';
import { ThemeTypes } from '@themes/redux/ThemeConstant';
import { ThemeType } from '@themes/Themes';
import { FieldError } from 'react-hook-form';
import { memo } from 'react';
import ViewComponent from '@components/Common/ViewComponent/ViewComponent';

interface Props extends InputProps {
  value?: string;
  label?: string;
  icon?: any;
  iconPosition?: string;
  error?: string | undefined
  touched?: boolean
  onIconPress?: () => void;
  secureTextEntry?: boolean;
  editable?: boolean;
  defaultValue?: string;
  onSubmitEditing?: any;
  keyboardType?: KeyboardTypeOptions;
}

const InputField: FC<Props> = (props) => {
  const [focused, setFocused] = React.useState(false);
  const theme = useTheme<ThemeType>();
  const currentTheme = useAppSelector((state) => state.theme.currentTheme);

  const getFlexDirection = () => {
    if (props.icon && props.iconPosition) {
      if (props.iconPosition === 'left') {
        return 'row';
      } else {
        return 'row-reverse';
      }
    }
  };

  const getBorderColor = () => {
    if (props.error) {
      return theme.colors.error;
    }

    return currentTheme === ThemeTypes.LIGHT
      ? theme.colors.secondaryText
      : theme.colors.mainForeground;
  };

  return (
    <ViewComponent style={styles.inputContainer}>
      {props.label && (
        <TextComponent color={SemanticColors.MAIN_FOREGROUND}>
          {props.label}
        </TextComponent>
      )}
      <ViewComponent
        backgroundColor={SemanticColors.INPUT_FIELD}
         style={[
          styles.wrapper,
          { alignItems: props.icon ? 'center' : 'baseline' },
          { borderColor: getBorderColor(), flexDirection: getFlexDirection() },
        ]}
      >
        <TouchableOpacity onPress={props.onIconPress}>
          <ViewComponent>{props.icon && props.icon}</ViewComponent>
        </TouchableOpacity>
        <TextInput
          style={[
            styles.textInput,
            props.style,
            { color: theme.colors.mainForeground },
          ]}
          onChangeText={props.onChange}
          defaultValue={props.defaultValue}
          value={props.value}
          onBlur={props.onBlur}
          {...props}
          placeholderTextColor={
            currentTheme === ThemeTypes.LIGHT
              ? theme.colors.secondaryText
              : theme.colors.mainForeground
          }
          editable={props.editable}
          selectTextOnFocus={props.editable}
          onEndEditing={props.onSubmitEditing}
          blurOnSubmit={false}
          keyboardType={props.keyboardType}
        />
      </ViewComponent>
      {props.error && (
        <TextComponent
          style={{ color: theme.colors.error }}
          accessibilityLiveRegion="polite"
        >
          {props.error}
        </TextComponent>
      )}
    </ViewComponent>
  );
};

export default memo(InputField);
