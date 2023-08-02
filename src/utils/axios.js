import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: process.env.BASE_URL })

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error) || 'Something went wrong in the SSR instance')
);

// ----------------------------------------------------------------------

export default axiosInstance
