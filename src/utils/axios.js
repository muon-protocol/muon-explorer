import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInstanceSSR = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'http://127.0.0.1:8004/api/v1' : process.env.TEST_BASE_URL
})

axiosInstanceSSR.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error) || 'Something went wrong in the SSR instance')
);

// ----------------------------------------------------------------------

const axiosInstanceCSR = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/api/v1' : process.env.TEST_BASE_URL
})

axiosInstanceCSR.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error) || 'Something went wrong in the CSR instance')
);

// ----------------------------------------------------------------------

export { axiosInstanceSSR, axiosInstanceCSR };
