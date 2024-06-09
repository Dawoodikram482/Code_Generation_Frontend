import axiosInstance from "../../axios";
import { defineStore } from "pinia";
import {computed, ref} from "vue";

export const useTransactionStore = defineStore("transactions", () =>{
    const transactions = ref([])
    const errorMessage = ref(null)

    const getTransactions = computed(() => transactions.value.data)

    async function retrieveAllTransactions() {
        try {
            transactions.value = await axiosInstance.get('/transactions');
        }
        catch (error) {
            errorMessage.value = error.response.status;
            console.log(error);
        }
    }
    async function createTransaction(transaction) {
        try {
            const response = await axiosInstance.post('/transactions', transaction);
            return response.data;
        }
        catch (error) {
            console.error('Error creating transaction:', error);
            throw error;
        }
    }
    return {
        transactions,
        errorMessage,
        getTransactions,
        retrieveAllTransactions,
        createTransaction
    }
});