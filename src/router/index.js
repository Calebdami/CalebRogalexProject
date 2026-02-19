import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '@/services/authService'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'
import CalendarView from '@/views/CalendarView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { 
            path: '/', 
            component: SignInView,
            meta: { guestOnly: true }
        },
        { 
            path: '/signUp', 
            component: SignUpView,
            meta: { guestOnly: true }
        },
        { 
            path: '/calendar', 
            component: CalendarView,
            meta: { requiresAuth: true }
        }
    ]
})

router.beforeEach((to, from, next) => {

    // 1️⃣ Route protégée → user non connecté
    if (to.meta.requiresAuth && !isAuthenticated.value) {
        return next('/')
    }
    
    // 2️⃣ Route login/signup → user déjà connecté
    if (to.meta.guestOnly && isAuthenticated.value) {
        return next('/calendar')
    }
    
    // 3️⃣ Sinon accès normal
    
    next()
})

export default router;