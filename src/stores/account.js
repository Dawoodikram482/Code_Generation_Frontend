import { defineStore } from 'pinia';
import axiosInstance from "../../axios.js";

export const useAccountStore = defineStore('account', {
    state: () => ({
        firstName: '',
        lastName: '',
        accounts: []
    }),
    getters: {
        currentAccounts() {
            return this.accounts.filter(account => account.accountType === 'CURRENT');
        },
        savingsAccounts() {
            return this.accounts.filter(account => account.accountType === 'SAVINGS');
        },
    },
    actions: {
        async getAccounts() {
            try {
                const response = await axiosInstance.get('/users/myAccountOverview');
                this.firstName = response.data.firstName;
                this.lastName = response.data.lastName;
                this.accounts = response.data.accounts;
            } catch (error) {
                console.error('Failed to get accounts:', error);
                throw error;
            }
        },
        async handleTransaction(type, accountIBAN, amount) {
            try {
                const endpoint = `/transactions/atm/${type}`;
                const response = await axiosInstance.post(endpoint, {
                    IBAN: accountIBAN,
                    amount: amount,
                    currencyType: "EURO"
                });
                await this.getAccounts();
            } catch (error) {
                console.error(`${type.charAt(0).toUpperCase() + type.slice(1)} failed:`, error);
                throw error;
            }
        },
        async transfer(accountFrom, accountTo, amount) {
            try {
                const response = await axiosInstance.post(`/transactions`, { accountFrom, accountTo, amount });
                await this.getAccounts();
                return { success: true, message: 'Transfer successful.' };
            } catch (error) {
                console.log(error)
                const messageResponse = error.response ? error.response.data : "Transfer failed.";
                console.error('Transfer failed:', messageResponse);

                return { success: false, message: messageResponse };
            }
        },
        async searchIBANByCustomerName(firstName, lastName) {
            try {
                const response = await axiosInstance.get(`/accounts/search-iban`, { params: { firstName, lastName } });
                return response.data.content;
            } catch (error) {
                console.error('Failed to search IBAN by customer name:', error);
                return [];
            }
        },
        async getActiveAccounts(){
            try {
                const response = await axiosInstance.get('/accounts/status');
                this.accounts = response.data.accounts;
            } catch (error) {
                console.error('Failed to get active accounts:', error);
                return [];
            }
        }
    },
});
