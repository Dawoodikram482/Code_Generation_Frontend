import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://localhost:8080'
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
export default instance;