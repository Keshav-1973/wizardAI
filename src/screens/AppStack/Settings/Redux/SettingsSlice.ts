import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  InAppToastManager,
  ERROR_TOAST,
} from '@components/Common/ToastManager/InAppToastManager';

interface SettingsData {
  bgColor: string;
}

const initialSettingsState: SettingsData = {
  bgColor: 'white',
};

export const editBgThunk = createAsyncThunk(
  'settings/editBg',
  async (color: string, {dispatch}) => {
    try {
      dispatch(SettingsActions.editBg(color));
    } catch (error) {
      InAppToastManager.showToast(ERROR_TOAST, {
        title: error,
      });
    }
  },
);

export const SettingsSlice = createSlice({
  name: 'menuData',
  initialState: initialSettingsState,
  reducers: {
    editBg: (state, action: PayloadAction<string>) => {
      state.bgColor = action.payload;
    },
    reset: () => initialSettingsState,
  },
});
export const SettingsActions = {
  ...SettingsSlice.actions,
};
