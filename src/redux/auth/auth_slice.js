import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './auth_actions';

const initialState = {
    loading: false,
    userInfo: null,
    userToken: null,
    error: null,
    isLoggedIn: false,
    success: false,
    capturedImages: [],
    otpForUser: null
};

const authSlice = createSlice({
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

            // Clear localStorage on logout
            localStorage.removeItem('userToken');
            localStorage.removeItem('userInfo');
        },
        loginWithoutAPI: (state, { payload }) => {
            state.isLoggedIn = true;
            state.userInfo = { email: payload.email };
        },
        addIdForOtpUser: (state, { payload }) => {
            state.otpForUser = payload.data;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(loginUser.pending, (state) => {
                state.userInfo = null;
                state.userToken = null;
                state.loading = true;
                state.error = null;
                state.isLoggedIn = false;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.userInfo = payload.user;
                state.userToken = payload.token;
                state.loading = false;
                state.error = null;
                state.isLoggedIn = true;

                // Store the token and user info in localStorage
                localStorage.setItem('userToken', payload.token);
                localStorage.setItem('userInfo', JSON.stringify(payload.user));
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.userInfo = null;
                state.userToken = null;
                state.loading = false;
                state.error = payload;
                state.isLoggedIn = false;

                // Remove any existing data from localStorage on failed login
                localStorage.removeItem('userToken');
                localStorage.removeItem('userInfo');
            });
    }
});

export const { logoutUser, loginWithoutAPI, addIdForOtpUser } = authSlice.actions;
export default authSlice.reducer;
