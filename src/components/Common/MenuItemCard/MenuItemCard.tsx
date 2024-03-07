import React, {memo} from 'react';
import {MenuItem} from '@screens/AppStack/AppRoutes';
import ViewComponent from '../ViewComponent/ViewComponent';
import TextComponent from '../TextComponent/TextComponent';
import {Image} from 'react-native';
import CustomButton, {BtnTypes} from '../CustomButton/CustomButton';
import {SemanticColors} from '@themes/Scales';
import styles from './styles';

type Props = {
  item: MenuItem;
  index?: number;
  onPress?: () => void;
  btnTitle: string;
  canShowBtn?: boolean;
};

const MenuItemCard = (props: Props) => {
  const {item, onPress, btnTitle, canShowBtn = true} = props;
  const FoodTypeColor = item.isVeg ? 'green' : 'red';
  return (
    <ViewComponent key={item.id} style={styles.wrapper1}>
      <ViewComponent style={styles.flexRow}>
        <ViewComponent
          style={[
            {
              borderColor: FoodTypeColor,
            },
            styles.wrapper2,
          ]}>
          <ViewComponent
            style={[
              {
                backgroundColor: FoodTypeColor,
              },
              styles.wrapper3,
            ]}></ViewComponent>
        </ViewComponent>
        <ViewComponent style={{paddingLeft: 8}}>
          <TextComponent color={SemanticColors.MAIN_BACKGROUND}>
            {item.title}
          </TextComponent>
          <TextComponent color={SemanticColors.MAIN_BACKGROUND}>
            ₹{item.price}
          </TextComponent>
        </ViewComponent>
      </ViewComponent>
      <ViewComponent style={{alignItems: 'center'}}>
        <Image key={item.id} source={{uri: item.imgSrc}} style={styles.image} />
        {canShowBtn && (
          <CustomButton
            customColor={!item?.isPresent ? SemanticColors.DISABLED_BUTTON : ''}
            isOpacity={false}
            title={btnTitle}
            btnType={BtnTypes.PRIMARY}
            innerStyles={{borderRadius: 12}}
            onPress={onPress}
            customStyles={{
              position: 'absolute',
              bottom: -16,
              width: 100,
            }}
          />
        )}
      </ViewComponent>
    </ViewComponent>
  );
};

export default memo(MenuItemCard);
