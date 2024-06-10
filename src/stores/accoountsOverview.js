import axiosInstance from '/axios.js';
import axios from 'axios';

export function fetchAccountsAndTransactions() {
    return axios.all([
        axiosInstance.get('/accounts/status', { params: { limit: 50, offset: 0 } }),
        axiosInstance.get('/transactions')
    ]);
}

export function closeAccount(iban) {
    return axiosInstance.post(`/accounts/closeAccount/${iban}`);
}

export function updateAbsoluteLimit(iban, absoluteLimit) {
    return axiosInstance.put(`/accounts/${iban}/limit`, {
        absoluteLimit
    });
}

export function updateDayLimit(userId, dayLimit) {
    return axiosInstance.put(`/users/${userId}/limits`, {
        dayLimit
    });
}
