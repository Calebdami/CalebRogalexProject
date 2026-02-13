import { ref } from "vue";

// On récupère les utilisateurs ou un tableau vide
const getUsers = () => JSON.parse(localStorage.getItem('usersI')) || [];

export const isAuthenticated = ref(!!localStorage.getItem('currentUser'));

export default {  
    register(name, email, password) {
        const users = getUsers();
        if (users.find(u => u.email === email)) return { success: false, message: "Email déjà utilisé" };
        users.push({ name, email, password });
        localStorage.setItem('usersI', JSON.stringify(users));
        return { success: true };
    },
    login(email, password) {
        const users = getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            isAuthenticated.value = true;
            return true;
        }
        return false;
    },
    logout() {
        localStorage.removeItem('currentUser');
        isAuthenticated.value = false;
        window.location.replace('/');
    },
    getUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }
}