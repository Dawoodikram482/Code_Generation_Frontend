import { defineStore } from 'pinia';
import axiosInstance from '/axios.js';
import axios from 'axios';

export const useAccountsOverviewStore = defineStore('accountsOverview', {
    state: () => ({
        accounts: [],
        transactions: [],
        loading: true,
        error: null,
    }),
    actions: {
        async fetchAccountsAndTransactions() {
            this.loading = true;
            try {
                const [accountsResponse, transactionsResponse] = await axios.all([
                    axiosInstance.get('/accounts/status', { params: { limit: 50, offset: 0 } }),
                    axiosInstance.get('/transactions')
                ]);
                this.accounts = accountsResponse.data;
                this.transactions = transactionsResponse.data;
            } catch (error) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        async closeAccount(iban) {
            try {
                await axiosInstance.post(`/accounts/closeAccount/${iban}`);
                // Handle successful account closure
                alert("Account closed successfully!");
                await this.fetchAccountsAndTransactions();
            } catch (error) {
                // Handle error
                alert("Failed to close account: " + error.message);
            }
        },
        async updateAbsoluteLimit(iban, absoluteLimit) {
            await axiosInstance.put(`/accounts/${iban}/limit`, {
                absoluteLimit
            });
        },
        async updateDayLimit(userId, dayLimit) {
            await axiosInstance.put(`/users/${userId}/limits`, {
                dayLimit
            });
        },
        async updateUserDetails(selectedUser) {
            try {
                await this.updateAbsoluteLimit(selectedUser.iban, selectedUser.absoluteLimit);
                await this.updateDayLimit(selectedUser.customer.id, selectedUser.customer.dayLimit);
                alert("User details updated successfully!");
                await this.fetchAccountsAndTransactions();
            } catch (error) {
                console.error("Failed to update user details:", error);
                alert("Failed to update user details: " + error.message);
            }
        },
    }
});
