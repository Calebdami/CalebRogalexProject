<script setup>
    import { ref } from 'vue';
    import authService from '@/services/authService';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');

    const handleSignUp = () => {
        if (password.value !== confirmPassword.value) {
            alert("Les mots de passe ne correspondent pas !");
            return;
        }
        const result = authService.register(name.value, email.value, password.value);
        if (result.success) {
            alert("Compte créé ! Connectez-vous.");
            router.push('/');
        } 
        else { alert(result.message) }
    }
</script>

<template>
    <div class="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        
        <div class="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
            
            <div class="text-center mb-8">
                <h2 class="text-3xl font-bold text-slate-900 tracking-tight">Créer un compte</h2>
                <p class="text-slate-500 mt-2">Rejoignez-nous pour organiser votre calendrier.</p>
            </div>

            <form @submit.prevent="handleSignUp" class="space-y-5">
                
                <div class="flex flex-col gap-1.5">
                    <label for="name" class="text-sm font-semibold text-slate-700 ml-1">Nom complet</label>
                    <input 
                        v-model="name" 
                        id="name" 
                        type="text" 
                        placeholder="Jean Dupont" 
                        required
                        class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-400"
                    >
                </div>

                <div class="flex flex-col gap-1.5">
                    <label for="email" class="text-sm font-semibold text-slate-700 ml-1">Email</label>
                    <input 
                        v-model="email" 
                        id="email" 
                        type="email" 
                        placeholder="jean@exemple.com" 
                        required
                        class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-400"
                    >
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="flex flex-col gap-1.5">
                        <label for="password" class="text-sm font-semibold text-slate-700 ml-1">Mot de passe</label>
                        <input 
                            v-model="password" 
                            id="password" 
                            type="password" 
                            placeholder="••••••••" 
                            required
                            class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-400"
                        >
                    </div>

                    <div class="flex flex-col gap-1.5">
                        <label for="confirmPassword" class="text-sm font-semibold text-slate-700 ml-1">Confirmation</label>
                        <input 
                            v-model="confirmPassword" 
                            id="confirmPassword" 
                            type="password" 
                            placeholder="••••••••" 
                            required
                            class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-400"
                        >
                    </div>
                </div>

                <button 
                    type="submit" 
                    class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] mt-4"
                >
                    S'inscrire
                </button>

                <p class="text-center text-slate-600 text-sm mt-6">
                    Déjà un compte ? 
                    <router-link to="/" class="text-indigo-600 font-bold hover:text-indigo-500 transition-colors">Se connecter</router-link>
                </p>
            </form>
        </div>
    </div>
</template>