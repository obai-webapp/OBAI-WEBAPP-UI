import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosWrapper from '../../utils/api';

interface LoginPayload {
    email: string;
    password: string;
}

interface RegisterPayload extends LoginPayload {
    name: string;
}

interface LoginResponse {
    user: {
        email: string;
        name?: string;
    };
    token: string;
}

const API_URL = import.meta.env.VITE_API_URL || '';

export const loginUser = createAsyncThunk<LoginResponse, LoginPayload>(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axiosWrapper<LoginResponse>('post', `${API_URL}/api/admin/login`, {
                email,
                password
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error as string);
        }
    }
);

export const registerUser = createAsyncThunk<LoginResponse, RegisterPayload>(
    'auth/register',
    async ({ email, password, name }, { rejectWithValue }) => {
        try {
            const response = await axiosWrapper<LoginResponse>('post', `${API_URL}/api/user/register`, {
                email,
                password,
                name
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error as string);
        }
    }
);
