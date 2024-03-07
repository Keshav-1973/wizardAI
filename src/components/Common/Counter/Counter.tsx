import React, {memo, useCallback, useEffect, useState} from 'react';
import ViewComponent from '../ViewComponent/ViewComponent';
import TextComponent from '../TextComponent/TextComponent';
import {Pressable, StyleProp, ViewStyle} from 'react-native';
import {useAppSelector} from '@helpers/AppStore/AppStore';
import {SemanticColors, Spacings} from '@themes/Scales';
import {ThemeTypes} from '@themes/redux/ThemeConstant';

type Props = {
  customStyles?: StyleProp<ViewStyle>;
  getCount: (count: number) => void;
  initialValue: number;
};

const Counter = (props: Props) => {
  const {getCount, initialValue} = props;
  const [count, setCount] = useState<number>();
  const currentTheme = useAppSelector(state => state.theme.currentTheme);

  useEffect(() => {
    setCount(initialValue);
  }, [initialValue]);

  const Increment = useCallback(() => {
    setCount(prev => prev + 1);
    getCount?.(count + 1);
  }, [count, getCount]);

  const Decrement = useCallback(() => {
    if (count > 1) {
      getCount?.(count - 1);
      setCount(prev => prev - 1);
    }
  }, [count, getCount]);

  return (
    <ViewComponent style={props.customStyles}>
      <ViewComponent
        backgroundColor={SemanticColors.PRIMARY_BUTTON}
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
        borderRadius={20}>
        <ViewComponent
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            paddingHorizontal: 30,
          }}>
          <Pressable onPress={Decrement}>
            <TextComponent
              color={SemanticColors.MAIN_FOREGROUND}
              style={{fontSize: 20, padding: 10}}>
              --
            </TextComponent>
          </Pressable>
          <TextComponent
            color={SemanticColors.MAIN_FOREGROUND}
            style={{fontSize: 20, padding: 10}}>
            {count}
          </TextComponent>
          <TextComponent
            color={SemanticColors.MAIN_FOREGROUND}
            onPress={Increment}
            style={{fontSize: 20, padding: 10}}>
            {'+'}
          </TextComponent>
        </ViewComponent>
      </ViewComponent>
    </ViewComponent>
  );
};

export default memo(Counter);
