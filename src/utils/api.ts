import axios from 'axios';
import { toast } from 'react-toastify';

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        const errorMessage = error?.response?.data?.desc || error?.response?.data?.message || error?.message;
        toast.error(errorMessage);
        return Promise.reject(error);
    }
);

const axiosWrapper = async <T>(
    method: string,
    url: string,
    data?: any,
    token?: string,
    isFormData = false
): Promise<T> => {
    const config: any = {
        method,
        url,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (token) config.headers['Authorization'] = `Bearer ${token}`;

    if (isFormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
        config.data = data;
    } else if (data) {
        config.data = data;
    }

    try {
        const response = await axios(config);
        return response.data;
    } catch (error: any) {
        throw error?.response?.data?.message || error?.message;
    }
};

export default axiosWrapper;
