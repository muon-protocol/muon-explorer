import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: process.env.BASE_URL || '' });

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error) || 'Something went wrong')
);
// .response && error.response.data

export default axiosInstance;
