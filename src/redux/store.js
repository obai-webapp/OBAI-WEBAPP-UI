import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createLogger } from 'redux-logger';
import auth from './auth/auth_slice';
import themeReducer from './theme/theme_slice';
import sidebarReducer from '../redux/sidebar/sidebarSlice';
import cars_images_slice from './cars_images/cars_images_slice';

// Combine all the slices into a single root reducer
const rootReducer = combineReducers({
    auth,
    theme: themeReducer,
    cars_images: cars_images_slice,
    activeSidebarItem: sidebarReducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'theme', 'activeSidebarItem'],
    blacklist: ['cars_images']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const loggerMiddleware = createLogger();
const middleware = import.meta.env.NODE_ENV !== 'production' ? [loggerMiddleware] : [];

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }).concat(middleware),
    devTools: import.meta.env.NODE_ENV !== 'production'
});

export const persistor = persistStore(store);

export default store;
