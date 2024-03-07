import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, Image, FlatList, Pressable} from 'react-native';
import CustomButton, {
  BtnTypes,
} from '@components/Common/CustomButton/CustomButton';
import {useAppDispatch, useAppSelector} from '@helpers/AppStore/AppStore';
import ViewComponent from '@components/Common/ViewComponent/ViewComponent';
import TextComponent from '@components/Common/TextComponent/TextComponent';
import {SemanticColors} from '@themes/Scales';
import BottomSheet from '@gorhom/bottom-sheet';
import BottomSheetHelper from '@components/Common/BottomSheet/BottomSheet';
import InputField from '@components/Common/InputField/InputField';
import {HomeActions} from './Redux/HomeSlice';
import {
  AppScreenProps,
  MenuItem,
  editMenuTypes,
} from '@screens/AppStack/AppRoutes';
import MenuItemCard from '@components/Common/MenuItemCard/MenuItemCard';
import Wrapper from '@components/Common/Wrapper/Wrapper';
import {UserType} from '@screens/AuthStack/AuthRoutes';
import Counter from '@components/Common/Counter/Counter';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {FeatureRoutes, ScreenNavigationProps} from '@navigations/ScreenTypes';
import {
  ERROR_TOAST,
  InAppToastManager,
} from '@components/Common/ToastManager/InAppToastManager';

type ItemProps = {item: MenuItem; index: number};

const Home = (props: AppScreenProps<'/app/home'>) => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation<ScreenNavigationProps>();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [currentItem, setCurrentItem] = useState<MenuItem>();
  const [price, setPrice] = useState<string>('');
  const [count, setCount] = useState<number>(1);
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const userCredentials = useAppSelector(
    state => state.userAuth.userCredentials,
  );

  const bgColor = useAppSelector(state => state.settings.bgColor);

  const currentMenu = useAppSelector(state => state.menu.menuData);

  const USER_TYPE = userCredentials?.userName;
  const isAdmin = USER_TYPE === UserType.ADMIN;

  const Header = isAdmin ? 'Your Restaurant' : 'Menu';
  const bgForUser = !isAdmin ? bgColor : 'white';
  const isCurrentItemVeg = currentItem?.isVeg;

  const handleCountChange = useCallback((newCount: number) => {
    setCount(newCount);
  }, []);

  const openBottomSheet = useCallback(
    (item: MenuItem) => {
      setCurrentItem(item);
      bottomSheetRef.current?.snapToIndex(0);
    },
    [currentItem, bottomSheetRef],
  );

  const closeBottomSheet = useCallback(
    (id: string, isPresent: boolean, isEdited: boolean) => {
      if (isEdited) {
        const updatedMenuItems: editMenuTypes = {
          id: id,
          newValue: {
            price: price,
            isPresent: isPresent,
          },
        };
        dispatch(HomeActions.editMenu(updatedMenuItems));
      }
      setCount(1);
      bottomSheetRef.current?.close();
    },
    [price, dispatch, count],
  );

  const gotoCartIfUser = useCallback(() => {
    if (isAdmin) {
      const isEnable = !currentItem?.isPresent;
      closeBottomSheet(currentItem.id, isEnable, true);
    } else {
      bottomSheetRef?.current?.close();
      navigation.navigate(FeatureRoutes.APP.CART, {
        payload: currentItem,
        count: count,
      });
    }
  }, [currentItem, count, isAdmin, navigation]);

  const handleSheetChange = useCallback((data: boolean) => {
    setIsSheetOpen(data);
  }, []);

  const makeLabel = useCallback(() => {
    let title = '';
    if (isAdmin) {
      if (currentItem?.isPresent) {
        title = 'Disable Item';
      } else {
        title = 'Enable Item';
      }
    } else {
      title = 'Go to cart';
    }
    return title;
  }, [currentItem, isAdmin]);

  const ItemCard = ({item, index}: ItemProps) => {
    let btnTitle = '';
    if (isAdmin) {
      if (item.isPresent) {
        btnTitle = 'EDIT';
      } else {
        btnTitle = 'DISABLED';
      }
    } else {
      btnTitle = 'ADD';
    }

    if ((!isAdmin && item.isPresent) || isAdmin) {
      return (
        <MenuItemCard
          item={{
            id: item.id,
            title: item.title,
            imgSrc: item.imgSrc,
            isVeg: item.isVeg,
            rating: item.rating,
            price: item.price,
            isPresent: item.isPresent,
          }}
          btnTitle={btnTitle}
          onPress={() => {
            openBottomSheet(item);
            setPrice(item.price);
          }}
          index={index}
        />
      );
    } else {
      return <></>;
    }
  };

  return (
    <Wrapper navHeading={Header} canGoback={false}>
      <ViewComponent style={styles.container(bgForUser)}>
        <FlatList
          scrollEnabled={!isSheetOpen}
          bounces={false}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          data={currentMenu}
          renderItem={ItemCard}
          keyExtractor={item => item.id}
        />
        <BottomSheetHelper
          isFocsued={isFocused}
          bottomSheetRef={bottomSheetRef}
          getSheetStatus={handleSheetChange}>
          {currentItem && (
            <ViewComponent style={styles.wrapper1}>
              <Pressable
                style={styles.close}
                onPress={() => {
                  closeBottomSheet(currentItem.id, true, false);
                }}>
                <TextComponent>X</TextComponent>
              </Pressable>
              <ViewComponent>
                <Image
                  key={currentItem.id}
                  source={{uri: currentItem.imgSrc}}
                  style={styles.imageBtmSheet}
                />
                <ViewComponent style={styles.wrapper2}>
                  <ViewComponent style={styles.isVegOuter(isCurrentItemVeg)}>
                    <ViewComponent
                      style={styles.isVegInner(
                        isCurrentItemVeg,
                      )}></ViewComponent>
                  </ViewComponent>
                  <ViewComponent style={styles.padding}>
                    <TextComponent color={SemanticColors.MAIN_BACKGROUND}>
                      {currentItem.title}
                    </TextComponent>
                    <TextComponent color={SemanticColors.MAIN_BACKGROUND}>
                      ₹{currentItem.price}
                    </TextComponent>
                  </ViewComponent>
                </ViewComponent>
                {isAdmin ? (
                  <InputField
                    label={'Edit Price'}
                    placeholder="Price"
                    onChange={text => {
                      if (isNaN(Number(text))) {
                        return;
                      } else {
                        setPrice(text.trim());
                      }
                    }}
                    defaultValue={currentItem.price}
                    value={price}
                    keyboardType="number-pad"
                  />
                ) : (
                  <TextComponent
                    color={SemanticColors.MAIN_BACKGROUND}
                    style={styles.bill}>
                    Total Price: ₹{Number(currentItem.price) * count}
                  </TextComponent>
                )}
              </ViewComponent>
              <ViewComponent style={{flexDirection: 'row'}}>
                {isAdmin ? (
                  <CustomButton
                    title={'Save'}
                    btnType={BtnTypes.PRIMARY}
                    customStyles={styles.flex}
                    onPress={() => {
                      closeBottomSheet(currentItem.id, true, true);
                    }}
                  />
                ) : (
                  <Counter
                    customStyles={styles.flex}
                    getCount={handleCountChange}
                    initialValue={count}
                  />
                )}
                <ViewComponent style={styles.space}></ViewComponent>
                <CustomButton
                  title={makeLabel()}
                  btnType={BtnTypes.PRIMARY}
                  customStyles={{flex: 1}}
                  onPress={gotoCartIfUser}
                />
              </ViewComponent>
            </ViewComponent>
          )}
        </BottomSheetHelper>
        {isAdmin && (
          <CustomButton
            title={'Add More Items'}
            btnType={BtnTypes.PRIMARY}
            onPress={() => {
              InAppToastManager.showToast(ERROR_TOAST, {
                title: 'This Feature is yet to be implemented!!',
              });
            }}
            customStyles={styles.zIndex}
          />
        )}
      </ViewComponent>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: color => ({
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: color,
  }),
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },
  imageBtmSheet: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginTop: 8,
  },
  wrapper1: {
    width: '100%',
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
  close: {
    position: 'absolute',
    height: 32,
    width: 32,
    borderRadius: 32,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    right: 6,
    zIndex: 1,
  },
  wrapper2: {flexDirection: 'row', paddingTop: 8},
  isVegOuter: isCurrentItemVeg => ({
    height: 20,
    width: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: isCurrentItemVeg ? 'green' : 'red',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  isVegInner: isVeg => ({
    height: 10,
    width: 10,
    borderRadius: 8,
    backgroundColor: isVeg ? 'green' : 'red',
  }),
  padding: {paddingLeft: 8},
  bill: {
    marginTop: 20,
    marginLeft: 26,
    textDecorationLine: 'underline',
    fontSize: 20,
    fontWeight: 'bold',
  },
  flex: {
    flex: 1,
  },
  zIndex: {
    zIndex: -1,
  },
  space: {width: 8},
});

export default Home;
