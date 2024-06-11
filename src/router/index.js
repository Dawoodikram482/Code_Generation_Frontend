import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../components/Authentication/Login.vue'
import Registration from '../components/Authentication/Registration.vue'
import AccountsOverview from "@/components/AccountsOverview.vue";
import TransferFunds from "@/components/transactions/TransferFunds.vue";
import PendingApprovals from "@/components/PendingApprovals.vue";
import TransactionHistory from "@/components/transactions/TransactionHistory.vue";
import ATM from "@/components/ATM/ATM.vue";
import ATMLogin from "@/components/ATM/ATMLogin.vue";
import ATMAccounts from "@/components/ATM/ATMAccounts.vue";
import ATMActions from "@/components/ATM/ATMActions.vue";
import ATMTransaction from "@/components/ATM/ATMTransaction.vue";
import ATMThankYou from "@/components/ATM/ATMThankYou.vue";
import CustomerAccountOverview from "@/components/CustomerAccountOverview.vue";
import RegistrationSuccessful from "@/views/RegistrationSuccessful.vue";

import {useUserSessionStore} from "@/stores/UserSession.js";
import Transfer from "@/components/transactions/Transfer.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/atm',
      component: ATM,
      children: [
        {
          path: '/atm/login',
          name: 'atm-login',
          component: ATMLogin
        },
        {
          path: '/atm/accounts',
          name: 'atm-accounts',
          component: ATMAccounts
        },
        {
          path: '/atm/actions',
          name: 'atm-actions',
          component: ATMActions,
          props: route => ({
            accountNumber: route.query.accountNumber,
          })
        },
        {
          path: '/atm/transaction/:type',
          name: 'atm-transaction',
          component: ATMTransaction,
          props: route => ({
            transactionType: route.params.type,
            accountNumber: route.query.accountNumber,
          })
        },
        {
          path: '/atm/thank-you',
          name: 'atm-thank-you',
          component: ATMThankYou
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/Registration',
      name: 'Registration',
      component: Registration
    },
    {
      path: '/CustomerAccountOverview',
      name: 'CustomerAccountOverview',
      component: CustomerAccountOverview
    },
    {
      path: '/RegistrationSuccessful',
      name: 'RegistrationSuccessful',
      component: RegistrationSuccessful
    },
    {
      path: '/accountsOverview',
      name: 'Accounts Overview',
      meta: { role: ['ROLE_EMPLOYEE']}, // Specify roles needed to access the route
      component: AccountsOverview
    },
    {
      path: '/transferFunds',
      name: 'Transfer Funds',
      meta: { role: ['ROLE_EMPLOYEE', 'ROLE_CUSTOMER'] }, // Specify roles needed to access the route
      component: TransferFunds
    },
    {
      path: '/transfer',
      name: 'Transfer',
      meta: { role: ['ROLE_EMPLOYEE', 'ROLE_CUSTOMER'] }, // Specify roles needed to access the route
      component: Transfer
    },
    {
      path: '/approval',
      name: 'Pending Approvals',
      meta: { role: ['ROLE_EMPLOYEE'] }, // Specify roles needed to access the route
      component: PendingApprovals
    },
    {
      path: '/transactions',
      name: 'Transaction History',
      meta: { role: ['ROLE_EMPLOYEE', 'ROLE_CUSTOMER'] }, // Specify roles needed to access the route
      component: TransactionHistory
    }
  ]
});

router.beforeEach((to, from, next) => {
  const userSessionStore = useUserSessionStore();
  if (!userSessionStore.user) {
    userSessionStore.checkUserRole();
  }
  // Check if the route has meta roles defined
  if (to.meta.role) {
    // If user has the required role, proceed to the route
    if (userSessionStore.user && to.meta.role.includes(userSessionStore.user.role)) {
      next();
    } else {
      // If user doesn't have the required role, redirect to home or login
      next(userSessionStore.user ? '/' : '/login');
    }
  } else {
    // If no roles are specified for the route, proceed to the route
    next();
  }
});
export default router;
