import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://meowbankapi.onrender.com'
});

// Add an interceptor to include authentication tokens
instance.interceptors.request.use(function (config) {
    const authToken = localStorage.getItem('jwt');
    console.log("Auth Token:", authToken);
    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response && error.response.data === "Invalid JWT token") {
        console.error("Invalid JWT token");
        localStorage.removeItem('jwt');
        window.location.href = '/login';
    }
    return Promise.reject(error);
});

export default instance;