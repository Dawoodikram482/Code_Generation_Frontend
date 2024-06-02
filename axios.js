import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://localhost:8080'
});

// Add an interceptor to include authentication tokens
// instance.interceptors.request.use(
//     config => {
//         const token = sessionStorage.getItem('jwt'); // Get the JWT token from sessionStorage
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`; // Set the Authorization header
//         }
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );
export default instance;