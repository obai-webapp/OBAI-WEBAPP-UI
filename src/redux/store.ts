import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createLogger } from 'redux-logger';
import { authSlice } from './auth/authSlice';
import themeReducer from './theme/themeSlice';
import sidebarReducer from './sidebar';
import carImagesReducer from './carImages';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'theme', 'activeSidebarItem'],
    blacklist: ['cars_images']
};

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    theme: themeReducer,
    cars_images: carImagesReducer,
    activeSidebarItem: sidebarReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const isDevelopment = import.meta.env.MODE !== 'production';
const middleware = isDevelopment ? [createLogger()] : [];

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }).concat(middleware),
    devTools: isDevelopment
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

export default store;
