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
    <div class="auth-container">
        <div class="auth-card">
            <div class="header">
                <h2>Créer un compte</h2>
                <p>Rejoignez-nous pour organiser votre calendrier.</p>
            </div>
            <form @submit.prevent="handleSignUp" class="auth-form">
                <div class="form-group">
                    <label for="name">Nom complet</label>
                    <input v-model="name" id="name" type="text" placeholder="Jean Dupont" required>
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input v-model="email" id="email" type="email" placeholder="jean@exemple.com" required>
                </div>

                <div class="form-group-row">
                    <div class="form-group">
                        <label for="password">Mot de passe</label>
                        <input v-model="password" id="password" type="password" placeholder="••••••••" required>
                    </div>

                    <div class="form-group">
                        <label for="confirmPassword">Confirmation</label>
                        <input v-model="confirmPassword" id="confirmPassword" type="password" placeholder="••••••••" required>
                    </div>
                </div>

                <button type="submit" class="btn-primary">S'inscrire</button>

                <p class="footer-text"> Déjà un compte ? <router-link to="/" class="link">Se connecter</router-link></p>
            </form>
        </div>
    </div>
</template>

<style scoped>
    /* --- CONFIGURATION DU DESIGN SYSTEM --- */
    .auth-container {
    /* Couleurs Mode Clair (Par défaut) */
        --bg-page: #f8fafc;
        --bg-card: #ffffff;
        --text-title: #1e293b;
        --text-body: #64748b;
        --input-bg: #ffffff;
        --input-border: #e2e8f0;
        --primary-color: #6366f1;
        --primary-hover: #4f46e5;
        --shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        
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

    /* --- CLASSE POUR LE MODE SOMBRE --- */
    /* (Il suffira d'ajouter cette classe au parent pour tout basculer) */
    .auth-container.dark-mode {
        --bg-page: #0f172a;
        --bg-card: #1e293b;
        --text-title: #f1f5f9;
        --text-body: #94a3b8;
        --input-bg: #334155;
        --input-border: #475569;
        --shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
    }

    /* --- CARTE D'AUTHENTIFICATION --- */
    .auth-card {
        background-color: var(--bg-card);
        padding: 40px;
        border-radius: 20px;
        box-shadow: var(--shadow);
        width: 100%;
        max-width: 450px;
        animation: cardFadeIn 0.8s ease-out;
    }

    .header h2 {
        margin: 0 0 10px 0;
        font-size: 24px;
        font-weight: 800;
    }

    .header p {
    color: var(--text-body);
    margin-bottom: 30px;
    font-size: 14px;
    }

    /* --- FORMULAIRE & INPUTS --- */
    .auth-form {
        display: flex;
        flex-direction: column;
    }

    .form-group {
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        text-align: left;
    }

    .form-group-row {
        display: flex;
        gap: 15px;
    }

    .form-group-row .form-group {
        flex: 1;
    }

    label {
        font-size: 13px;
        font-weight: 600;
        margin-bottom: 8px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    input {
        padding: 12px 16px;
        border-radius: 10px;
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

    /* --- BOUTON PRINCIPAL --- */
    .btn-primary {
        width: 100%;
        padding: 14px;
        margin-top: 10px;
        border: none;
        border-radius: 10px;
        background-color: var(--primary-color);
        color: white;
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .btn-primary:hover {
        background-color: var(--primary-hover);
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(99, 102, 241, 0.4);
    }

    .btn-primary:active {
        transform: translateY(0);
    }

    /* --- TEXTE DE BAS DE PAGE --- */
    .footer-text {
        margin-top: 25px;
        font-size: 14px;
        color: var(--text-body);
    }

    .link {
        color: var(--primary-color);
        text-decoration: none;
        font-weight: 700;
        transition: opacity 0.2s;
    }

    .link:hover {
        text-decoration: underline;
        opacity: 0.8;
    }

    /* --- ANIMATIONS --- */
    @keyframes cardFadeIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Effet d'apparition en cascade pour les éléments du formulaire */
    .form-group, .btn-primary, .footer-text {
        animation: fadeInSlide 0.5s ease-out both;
    }

    @keyframes fadeInSlide {
        from {
            opacity: 0;
            transform: translateX(-10px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    /* Délais pour l'effet de cascade */
    .form-group:nth-child(1) { animation-delay: 0.2s; }
    .form-group:nth-child(2) { animation-delay: 0.3s; }
    .form-group-row { animation-delay: 0.4s; }
    .btn-primary { animation-delay: 0.5s; }
    .footer-text { animation-delay: 0.6s; }
</style>