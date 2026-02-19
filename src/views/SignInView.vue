<script setup>
    import { ref } from 'vue';
    import { RouterLink, useRouter } from 'vue-router';
    import authService from '@/services/authService';

    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const error = ref(false);

    function connexion(){
        if(authService.login(email.value , password.value)){ 
            router.push("/calendar") 
        }
        else{
            alert('Identifiants incorrectes')
            error.value = true
        }
        email.value = "";
        password.value = "";
    }
</script>

<template>
    <div class="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        
        <div class="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
            
            <div class="text-center mb-8">
                <h2 class="text-3xl font-bold text-slate-900 tracking-tight">Connexion</h2>
                <p class="text-slate-500 mt-2">Heureux de vous revoir !</p>
            </div>

            <form @submit.prevent="connexion" class="space-y-6">
                
                <div class="flex flex-col gap-1.5">
                    <label for="email" class="text-sm font-semibold text-slate-700 ml-1">Email</label>
                    <input 
                        v-model="email" 
                        id="email" 
                        type="email" 
                        placeholder="nom@exemple.com"
                        class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        :class="{'border-red-400': error}"
                    >
                </div>

                <div class="flex flex-col gap-1.5">
                    <label for="password" class="text-sm font-semibold text-slate-700 ml-1">Mot de passe</label>
                    <input 
                        v-model="password" 
                        id="password" 
                        type="password" 
                        placeholder="••••••••"
                        class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        :class="{'border-red-400': error}"
                    >
                </div>

                <button 
                    type="submit" 
                    class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-[0.98]"
                >
                    Se Connecter
                </button>

                <div class="relative flex items-center py-2">
                    <div class="flex-grow border-t border-slate-200"></div>
                    <span class="flex-shrink mx-4 text-slate-400 text-sm uppercase font-medium">ou</span>
                    <div class="flex-grow border-t border-slate-200"></div>
                </div>

                <router-link 
                    to="/signUp" 
                    class="block text-center w-full py-3 rounded-xl border-2 border-slate-100 text-slate-600 font-semibold hover:bg-slate-50 hover:border-slate-200 transition-all"
                >
                    S'inscrire
                </router-link>
            </form>

            <p v-if="error" class="mt-4 text-center text-sm text-red-500 font-medium">
                Veuillez vérifier vos accès.
            </p>
        </div>
    </div>
</template>