import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInstanceSSR = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? process.env.SSR_BASE_URL : process.env.DEV_BASE_URL
})

axiosInstanceSSR.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error) || 'Something went wrong in the SSR instance')
);

// ----------------------------------------------------------------------

const axiosInstanceCSR = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? process.env.CSR_BASE_URL : process.env.DEV_BASE_URL
})

axiosInstanceCSR.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error) || 'Something went wrong in the CSR instance')
);

// ----------------------------------------------------------------------

export { axiosInstanceSSR, axiosInstanceCSR };
