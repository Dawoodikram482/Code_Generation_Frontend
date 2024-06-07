import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../components/Authentication/Login.vue'
import Registration from '../components/Authentication/Registration.vue'
import AccountsOverview from "@/components/AccountsOverview.vue";
import TransferFunds from "@/components/transactions/TransferFunds.vue";
import PendingApprovals from "@/components/PendingApprovals.vue";
import TransactionHistory from "@/components/transactions/TransactionHistory.vue";
import {useUserSessionStore} from "@/stores/UserSession.js";


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
      meta: { role: ['ROLE_EMPLOYEE']}, // Specify roles needed to access the route
      component: AccountsOverview
    },
    {
      path: '/transferFunds',
      name: 'Transfer Funds',
      meta: { role: ['ROLE_EMPLOYEE'] }, // Specify roles needed to access the route
      component: TransferFunds
    },
    {
      path: '/approval',
      name: 'Pending Approvals',
      meta: { role: ['ROLE_EMPLOYEE'] }, // Specify roles needed to access the route
      component: PendingApprovals
    },
    {
      path: '/transactions',
      name: 'Transactions',
      meta: { role: ['ROLE_EMPLOYEE'] }, // Specify roles needed to access the route
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
