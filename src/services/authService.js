import { ref } from "vue";

const usersInscription = JSON.parse(localStorage.getItem('usersI')) || [];

export let currentUser = "";
export const isAuthenticated = ref(!!localStorage.getItem('currentUser'));

export default {  
    login(email, password) {
        const user = usersInscription.find(u => u.email === email && u.password === password);
        
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUser = user.email;  
            isAuthenticated.value = true;
            return true;
        }
        return false;
    },

    logout() {
        localStorage.removeItem('currentUser');
        currentUser = "";
        isAuthenticated.value = false;
    },
}
