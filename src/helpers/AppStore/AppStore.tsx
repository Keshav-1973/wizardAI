import { configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { rootReducer } from "@helpers/AppStore/Reducers/Reducers";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const appStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(appStore);
export type AppStoreRootState = ReturnType<typeof appStore.getState>;
export type AppStoreDispatch = typeof appStore.dispatch;
export const useAppDispatch = () => useDispatch<AppStoreDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppStoreRootState> = useSelector;
