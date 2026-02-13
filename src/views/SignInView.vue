<script setup>
    import { ref } from 'vue';
    import { RouterLink, useRouter } from 'vue-router';
    import authService from '@/services/authService';

    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const error = ref(false);


    function connexion(){
        if(authService.login(email.value , password.value)){ router.push("/calendar") }
        else{
            alert('Identifiants incorrectes')
            error.value = true
        }
        email.value = "";
        password.value = "";
    }

</script>


<template>
    <div class="auth-container">
        <div class="auth-card">
            <h2>Connexion</h2>
            <p class="subtitle">Heureux de vous revoir !</p>

            <form @submit.prevent="connexion" class="auth-form">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input v-model="email" id="email" type="email" placeholder="nom@exemple.com">
                </div>

                <div class="form-group">
                    <label for="password">Mot de passe</label>
                    <input v-model="password" id="password" type="password" placeholder="••••••••">
                </div>

                <button type="submit" class="btn-primary">Se Connecter</button>

                <div class="divider">
                    <span>ou</span>
                </div>

                <router-link to="/signUp" class="btn-secondary">S'inscrire</router-link>
            </form>
        </div>
    </div>
</template>

<style scoped>
    /* --- CONFIGURATION DU DESIGN SYSTEM (Identique pour cohérence) --- */
    .auth-container {
        --bg-page: #f8fafc;
        --bg-card: #ffffff;
        --text-title: #1e293b;
        --text-body: #64748b;
        --input-bg: #ffffff;
        --input-border: #e2e8f0;
        --primary-color: #6366f1;
        --primary-hover: #4f46e5;
        --secondary-bg: #f1f5f9;
        --secondary-text: #475569;
        --shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        --divider-color: #e2e8f0;
        
        min-height: 100vh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--bg-page);
        color: var(--text-title);
        transition: all 0.4s ease;
        font-family: 'Inter', system-ui, sans-serif;
    }

    /* --- CLASSE DARK MODE --- */
    .auth-container.dark-mode {
        --bg-page: #0f172a;
        --bg-card: #1e293b;
        --text-title: #f1f5f9;
        --text-body: #94a3b8;
        --input-bg: #334155;
        --input-border: #475569;
        --secondary-bg: #334155;
        --secondary-text: #cbd5e1;
        --shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
        --divider-color: #475569;
    }

    /* --- CARTE --- */
    .auth-card {
        background-color: var(--bg-card);
        padding: 40px;
        border-radius: 20px;
        box-shadow: var(--shadow);
        width: 100%;
        max-width: 420px;
        text-align: center;
        animation: cardFadeIn 0.8s ease-out;
    }

    h2 {
        margin: 0 0 8px 0;
        font-size: 26px;
        font-weight: 800;
    }

    .subtitle {
        color: var(--text-body);
        margin-bottom: 32px;
        font-size: 15px;
    }

    /* --- FORMULAIRE & INPUTS --- */
    .form-group {
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        text-align: left;
        animation: fadeInSlide 0.5s ease-out both;
    }

    .form-group:nth-child(1) { animation-delay: 0.2s; }
    .form-group:nth-child(2) { animation-delay: 0.3s; }

    label {
        font-size: 13px;
        font-weight: 600;
        margin-bottom: 8px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    input {
        padding: 12px 16px;
        border-radius: 12px;
        border: 2px solid var(--input-border);
        background-color: var(--input-bg);
        color: var(--text-title);
        outline: none;
        transition: all 0.3s ease;
    }

    input:focus {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
    }

    /* --- BOUTONS --- */
    .btn-primary {
        width: 100%;
        padding: 14px;
        border: none;
        border-radius: 12px;
        background-color: var(--primary-color);
        color: white;
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-top: 10px;
        animation: fadeInSlide 0.5s ease-out both;
        animation-delay: 0.4s;
    }

    .btn-primary:hover {
        background-color: var(--primary-hover);
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
    }

    .btn-secondary {
        display: block;
        width: 100%;
        padding: 14px;
        border-radius: 12px;
        background-color: var(--secondary-bg);
        color: var(--secondary-text);
        text-decoration: none;
        font-size: 15px;
        font-weight: 600;
        transition: all 0.3s ease;
        animation: fadeInSlide 0.5s ease-out both;
        animation-delay: 0.6s;
    }

    .btn-secondary:hover {
        filter: brightness(0.95);
    }

    /* --- DIVIDER (OU) --- */
    .divider {
        display: flex;
        align-items: center;
        margin: 25px 0;
        color: var(--text-body);
        font-size: 13px;
        animation: fadeInSlide 0.5s ease-out both;
        animation-delay: 0.5s;
    }

    .divider::before,
    .divider::after {
        content: "";
        flex: 1;
        height: 1px;
        background-color: var(--divider-color);
    }

    .divider span {
        padding: 0 15px;
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing: 1px;
    }

    /* --- ANIMATIONS --- */
    @keyframes cardFadeIn {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes fadeInSlide {
        from { opacity: 0; transform: translateX(-10px); }
        to { opacity: 1; transform: translateX(0); }
    }
</style>