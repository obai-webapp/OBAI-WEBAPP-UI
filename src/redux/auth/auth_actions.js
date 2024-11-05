import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosWrapper from '../../utils/api';

export const loginUser = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const { data } = await axiosWrapper('post', `${import.meta.env.VITE_API_URL}/api/admin/login`, {
            email,
            password
        });
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ email, password, name }, { rejectWithValue }) => {
        try {
            const { data } = await axiosWrapper('post', `${import.meta.env.VITE_API_URL}/api/user/register`, {
                email,
                password,
                name
            });
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
