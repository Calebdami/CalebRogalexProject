import CalendarView from '@/views/CalendarView.vue';
import SignInView from '@/views/SignInView.vue';
import SignUpView from '@/views/SignUpView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {   path: '/calendar',
        name: 'calendar',
        component: CalendarView,
        meta: {
            hideNav: true
        }
    },
    {
        path: '/',
        name: 'signIn',
        component: SignInView
    },
    {
        path: '/signUp',
        name: 'signUp',
        component: SignUpView
        },
    ];

const router = createRouter({
    history: createWebHistory(),
    routes ,
})
export default router;
