import {FC} from 'react';
import * as React from 'react';
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  TextInput,
  KeyboardTypeOptions,
} from 'react-native';
import {} from 'react-native';
import styles from './styles';
import {InputProps} from '@components/Common/CommonProps/InputProps';
import TextComponent from '@components/Common/TextComponent/TextComponent';
import {SemanticColors} from '@screens/../Themes/Scales';
import {useTheme} from '@shopify/restyle';
import {useAppSelector} from '@helpers/AppStore/AppStore';
import {ThemeTypes} from '@themes/redux/ThemeConstant';
import {ThemeType} from '@themes/Themes';
import {FieldError} from 'react-hook-form';
import {memo} from 'react';
import ViewComponent from '@components/Common/ViewComponent/ViewComponent';

interface Props extends InputProps {
  value?: string;
  label?: string;
  icon?: React.JSX.Element;
  iconPosition?: string;
  error?: string | undefined;
  touched?: boolean;
  onIconPress?: () => void;
  secureTextEntry?: boolean;
  editable?: boolean;
  defaultValue?: string;
  onSubmitEditing?: any;
  keyboardType?: KeyboardTypeOptions;
  rightIcon?: React.JSX.Element;
  style?: StyleProp<ViewStyle>;
  onChange?: (text: string) => void;
  onBlur?: () => void;
}

const InputField: FC<Props> = ({
  value,
  label,
  icon,
  iconPosition,
  error,
  onIconPress,
  secureTextEntry,
  editable,
  defaultValue,
  onSubmitEditing,
  keyboardType,
  rightIcon,
  style,
  onChange,
  onBlur,
  placeholder,
}: Props) => {
  const theme = useTheme<ThemeType>();
  const currentTheme = useAppSelector(state => state.theme.currentTheme);

  const wrapperStyle: StyleProp<ViewStyle> = {
    borderColor: error
      ? theme.colors.error
      : currentTheme === ThemeTypes.LIGHT
      ? theme.colors.secondaryText
      : theme.colors.mainForeground,
    flexDirection: icon
      ? iconPosition === 'left'
        ? 'row'
        : 'row-reverse'
      : 'row',
    alignItems: icon ? 'center' : 'baseline',
  };

  return (
    <ViewComponent style={styles.error}>
      {!!label && (
        <TextComponent color={SemanticColors.MAIN_BACKGROUND}>
          {label}
        </TextComponent>
      )}
      <ViewComponent
        backgroundColor={SemanticColors.INPUT_FIELD}
        style={[styles.wrapper, wrapperStyle]}>
        {!!icon && (
          <ViewComponent>
            <ViewComponent>{icon}</ViewComponent>
          </ViewComponent>
        )}
        <TextInput
          placeholder={placeholder}
          style={[
            styles.textInput,
            style,
            {color: theme.colors.mainForeground},
          ]}
          onChangeText={onChange}
          defaultValue={defaultValue}
          value={value}
          onBlur={onBlur}
          placeholderTextColor={
            currentTheme === ThemeTypes.LIGHT
              ? theme.colors.secondaryText
              : theme.colors.mainForeground
          }
          editable={editable}
          selectTextOnFocus={editable}
          onEndEditing={onSubmitEditing}
          blurOnSubmit={false}
          keyboardType={keyboardType}
          autoCapitalize="none"
          secureTextEntry={secureTextEntry}
        />
        {!!rightIcon && (
          <TouchableOpacity onPress={onIconPress}>
            <ViewComponent>{rightIcon}</ViewComponent>
          </TouchableOpacity>
        )}
      </ViewComponent>
      {!!error && (
        <TextComponent
          style={{color: theme.colors.error}}
          accessibilityLiveRegion="polite">
          {error}
        </TextComponent>
      )}
    </ViewComponent>
  );
};

export default memo(InputField);
