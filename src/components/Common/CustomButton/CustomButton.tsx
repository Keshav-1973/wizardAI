import React, {memo, useEffect, useState} from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
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
};

const CustomButton = ({
  onPress,
  btnType,
  title,
  loading,
  loadingTitle,
  disabled,
  logo,
  accessibilityLabel,
  customStyles,
  titleAfterLogo,
  logoMid,
  innerStyles,
}: Props) => {
  const theme = useTheme<ThemeType>();
  const currentTheme = useAppSelector(state => state.theme.currentTheme);
  const {mainBackground, mainForeground} = theme.colors;
  const activityIndicatorColor =
    btnType === BtnTypes.PRIMARY ? mainBackground : mainForeground;
  // logic to prevent memory leak done by ActivityIndicator
  const [mounted, setMounted] = useState(true);
  useEffect(() => {
    return () => {
      setMounted(false);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={customStyles}
      disabled={disabled || loading}>
      <ViewComponent
        backgroundColor={
          btnType === BtnTypes.PRIMARY
            ? SemanticColors.PRIMARY_BUTTON
            : SemanticColors.SECONDARY_BUTTON
        }
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
        // borderWidth={1.6}
        flexDirection="row"
        style={innerStyles}>
     
          <ActivityIndicator
          animating = {loading}
            color={activityIndicatorColor}
            style={{marginRight: 10}}
          />
 
        <ViewComponent
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: 30,
            top: 0,
            bottom: 0,
          }}>
          {logo && logo}
        </ViewComponent>

        {
          <TextComponent
            variant={
              btnType === BtnTypes.PRIMARY
                ? 'primaryButtonText'
                : 'secondaryButtonText'
            }
            accessibilityRole="button"
            accessibilityLabel={
              loading ? loadingTitle : accessibilityLabel || title
            }>
            {loading ? loadingTitle : title}
          </TextComponent>
        }
        {logoMid && logoMid}
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
    </TouchableOpacity>
  );
};

export default memo(CustomButton);
