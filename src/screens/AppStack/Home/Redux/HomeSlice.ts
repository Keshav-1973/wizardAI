import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  InAppToastManager,
  ERROR_TOAST,
} from '@components/Common/ToastManager/InAppToastManager';
import {MENU_ITEMS} from '../MenuItems';
import {editMenuTypes, MenuItem} from '@screens/AppStack/AppRoutes';

interface MenuData {
  menuData: Array<MenuItem>;
}

const initialMenuState: MenuData = {
  menuData: MENU_ITEMS,
};

export const editMenuThunk = createAsyncThunk(
  'home/editMenu',
  async ({id, newValue}: editMenuTypes, {dispatch}) => {
    try {
      dispatch(HomeActions.editMenu({id, newValue}));
    } catch (error) {
      InAppToastManager.showToast(ERROR_TOAST, {
        title: error,
      });
    }
  },
);

export const HomeSlice = createSlice({
  name: 'menuData',
  initialState: initialMenuState,
  reducers: {
    editMenu: (state, action: PayloadAction<editMenuTypes>) => {
      state.menuData.forEach(item => {
        if (item.id === action.payload.id) {
          Object.assign(item, action.payload.newValue);
        }
      });
    },
    reset: () => initialMenuState,
  },
});
export const HomeActions = {
  ...HomeSlice.actions,
};
