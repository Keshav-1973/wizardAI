import React, {memo} from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {SemanticColors, Spacings} from '@screens/../Themes/Scales';
import ViewComponent from '@components/Common/ViewComponent/ViewComponent';
import TextComponent from '@components/Common/TextComponent/TextComponent';
import {ActivityIndicator} from 'react-native';
import {useTheme} from '@shopify/restyle';
import {useAppSelector} from '@helpers/AppStore/AppStore';
import {ThemeType} from '@themes/Themes';
import {ThemeTypes} from '@themes/redux/ThemeConstant';

export enum BtnTypes {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
}
type Props = {
  onPress?: () => void;
  btnType: BtnTypes;
  title: string;
  loading?: boolean;
  loadingTitle?: string;
  disabled?: boolean;
  logo?: any;
  accessibilityLabel?: string;
  customStyles?: StyleProp<ViewStyle>;
  titleAfterLogo?: any;
  logoMid?: any;
  innerStyles?: StyleProp<ViewStyle>;
  isOpacity?: boolean;
  customColor?: any;
};

const CustomButton = ({
  onPress,
  btnType,
  title,
  loadingTitle,
  disabled,
  logo,
  customStyles,
  titleAfterLogo,
  logoMid,
  innerStyles,
  customColor,
  loading = false,
  isOpacity = true,
}: Props) => {
  const theme = useTheme<ThemeType>();
  const currentTheme = useAppSelector(state => state.theme.currentTheme);
  const {mainBackground, mainForeground} = theme.colors;
  const activityIndicatorColor =
    btnType === BtnTypes.PRIMARY ? mainBackground : mainForeground;
  const ViewWrapper = isOpacity ? TouchableOpacity : Pressable;
  const makeBtnColor = () => {
    if (customColor) {
      return customColor;
    } else if (btnType === BtnTypes.PRIMARY) {
      return SemanticColors.PRIMARY_BUTTON;
    } else if (btnType === BtnTypes.SECONDARY) {
      SemanticColors.SECONDARY_BUTTON;
    }
  };
  return (
    <ViewWrapper
      onPress={onPress}
      style={customStyles}
      disabled={disabled || loading}>
      <ViewComponent
        backgroundColor={makeBtnColor()}
        borderColor={
          currentTheme === ThemeTypes.LIGHT
            ? SemanticColors.PRIMARY_BUTTON_COLOR
            : SemanticColors.MAIN_FOREGROUND
        }
        justifyContent="center"
        alignItems="center"
        height={50}
        paddingHorizontal={Spacings.XS}
        marginVertical={Spacings.XS}
        flexDirection="row"
        style={[innerStyles, styles.borderRad]}>
        {loading && (
          <ActivityIndicator
            animating={loading}
            color={activityIndicatorColor}
            style={{marginRight: loading ? 10 : 0}}
          />
        )}
        {logo && <ViewComponent style={styles.logo}>{logo}</ViewComponent>}
        {
          <TextComponent
            variant={
              btnType === BtnTypes.PRIMARY
                ? 'primaryButtonText'
                : 'secondaryButtonText'
            }>
            {loading ? loadingTitle : title}
          </TextComponent>
        }
        {logoMid ? logoMid : null}
        {titleAfterLogo && (
          <TextComponent
            variant={
              btnType === BtnTypes.PRIMARY
                ? 'primaryButtonText'
                : 'secondaryButtonText'
            }>
            {titleAfterLogo}
          </TextComponent>
        )}
      </ViewComponent>
    </ViewWrapper>
  );
};

export default memo(CustomButton);

const styles = StyleSheet.create({
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 30,
    top: 0,
    bottom: 0,
  },
  borderRad: {
    borderRadius: 20,
  },
});
