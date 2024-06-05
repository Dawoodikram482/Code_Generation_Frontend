import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../components/Authentication/Login.vue'
import Registration from '../components/Authentication/Registration.vue'
import AccountsOverview from "@/components/AccountsOverview.vue";
import TransferFunds from "@/components/transactions/TransferFunds.vue";
import PendingApprovals from "@/components/PendingApprovals.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
