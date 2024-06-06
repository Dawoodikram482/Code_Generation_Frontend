import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../components/Authentication/Login.vue'
import Registration from '../components/Authentication/Registration.vue'
import AccountsOverview from "@/components/AccountsOverview.vue";
import TransferFunds from "@/components/TransferFunds.vue";
import PendingApprovals from "@/components/PendingApprovals.vue";
import ATM from "@/components/ATM/ATM.vue";
import ATMLogin from "@/components/ATM/ATMLogin.vue";
import ATMAccounts from "@/components/ATM/ATMAccounts.vue";
import ATMActions from "@/components/ATM/ATMActions.vue";
import ATMTransaction from "@/components/ATM/ATMTransaction.vue";
import ATMThankYou from "@/components/ATM/ATMThankYou.vue";

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
          component: ATMActions
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
      path: '/registration',
      name: 'registrationn',
      component: Registration
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/accountsOverview',
      name: 'Accounts Overview',
      component: AccountsOverview
    },
    {
      path: '/transferFunds',
      name: 'Transfer Funds',
      component: TransferFunds
    },
    {
      path: '/approval',
      name: 'Pending Approvals',
      component: PendingApprovals
    }
    
  ]
})

export default router
