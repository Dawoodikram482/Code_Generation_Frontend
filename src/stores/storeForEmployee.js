// stores/accounts.js
import { defineStore } from 'pinia';
import axiosInstance from "../../axios.js";
import {Notify} from "quasar";

export const useAccountsStore = defineStore('accounts', {
    state: () => ({
        accounts: [],
        loading: false,
        errorMessage: null
    }),
    actions: {
        async fetchAccounts() {
            this.loading = true;
            axiosInstance.get('/accounts/status', { params: { limit: 50, offset: 0 } })
                .then(response => {
                    this.accounts = response.data;
                    this.loading = false;
                })
                .catch(error => {
                    this.errorMessage = error.message;
                    this.loading = false;
                });
        }
    }
});

export const useTransactionsStore = defineStore('transactions', {
    state: () => ({
        loading: false,
        errorMessage: null
    }),
    actions: {
        async submitTransfer({ selectedSourceAccount, selectedDestinationAccount, transferAmount }) {
            this.loading = true;
            try {
                const response = await axiosInstance.post('/transactions', {
                    accountFrom: selectedSourceAccount,
                    accountTo: selectedDestinationAccount,
                    amount: transferAmount
                });
                this.loading = false;
                this.showSuccessNotification("Transfer successful!");
                return { success: true, message: response.data.message };
            } catch (error) {
                this.loading = false;
                let errorMessage = 'An error occurred while processing your request.';
                if (error.response && error.response.status === 400) {
                    this.showErrorNotification(errorMessage);
                }
                return { success: false, message: errorMessage };
            }
        },
        showSuccessNotification(message) {
            Notify.create({
                color: 'positive',
                position: 'top',
                message: message,
                icon: ''
            });
        },
        showErrorNotification(errorMessage){
            Notify.create({
                color: 'negative',
                position: 'top',
                message: errorMessage,
                icon: ''
            });
        }
    }
});

export const usePendingApprovalsStore = defineStore('pendingApprovals',{
    state: () => ({
        users: [],
        loading: true,
        error: null
    }),
    actions: {
        async fetchPendingApprovals() {
            this.loading = true;
            try {
                const response = await axiosInstance.get('/users/pending-approvals', {
                    params: { limit: 50, offset: 0 }
                });
                this.users = response.data;
            } catch (error) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        async approveUser(user) {
            this.loading = true;
            try {
                await axiosInstance.post(`/users/approve/${user.id}`, {
                    accountHolderId: user.id,
                    dayLimit: user.dayLimit,
                    transactionLimit: user.transactionLimit,
                    accountType: ''  // This will be used in the backend logic
                });
                alert('User approved successfully.');
            } catch (error) {
                this.error = error.response?.data?.message || 'An error occurred';
                alert('Failed to approve user.');
            } finally {
                this.loading = false;
            }
        },
    }
});
