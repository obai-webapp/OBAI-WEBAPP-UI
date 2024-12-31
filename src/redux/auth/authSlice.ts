import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../types/redux';
import { loginUser } from './authActions';

const initialState: AuthState = {
    loading: false,
    userInfo: null,
    userToken: null,
    error: null,
    isLoggedIn: false,
    success: false,
    capturedImages: [],
    otpForUser: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.userInfo = null;
            state.userToken = null;
            state.success = false;
            state.loading = false;
            state.error = null;
            state.isLoggedIn = false;

            localStorage.removeItem('userToken');
            localStorage.removeItem('userInfo');
        },
        loginWithoutAPI: (state, action: PayloadAction<{ email: string }>) => {
            state.isLoggedIn = true;
            state.userInfo = { email: action.payload.email };
        },
        addIdForOtpUser: (state, action: PayloadAction<{ data: any }>) => {
            state.otpForUser = action.payload.data;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.userInfo = null;
                state.userToken = null;
                state.error = null;
                state.isLoggedIn = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload.user;
                state.userToken = action.payload.token;
                state.error = null;
                state.isLoggedIn = true;

                localStorage.setItem('userToken', action.payload.token);
                localStorage.setItem('userInfo', JSON.stringify(action.payload.user));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.userInfo = null;
                state.userToken = null;
                state.error = 'Unknown error';
                state.isLoggedIn = false;

                localStorage.removeItem('userToken');
                localStorage.removeItem('userInfo');
            });
    }
});
