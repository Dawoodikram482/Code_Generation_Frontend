import { computed } from 'vue';
import { useUserSessionStore } from '@/stores/UserSession';

export function useUserRole() {
    const userSessionStore = useUserSessionStore();

    const isLoggedIn = computed(() => !!userSessionStore.user);
    const userRole = computed(() => (isLoggedIn.value ? userSessionStore.user.role : null));
    const forEmployee = computed(() => userRole.value === 'ROLE_EMPLOYEE');
    const forCustomer = computed(() => userRole.value === 'ROLE_CUSTOMER');

    return { isLoggedIn, userRole, forEmployee, forCustomer };
}