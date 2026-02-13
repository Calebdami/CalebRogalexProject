<script setup>
    import { ref } from 'vue'

    const name = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')

    const handleSignUp = () => {
        if (password.value !== confirmPassword.value) {
            alert("Les mots de passe ne correspondent pas !")
            return
        }
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

                <p class="footer-text">
                    Déjà un compte ? 
                    <router-link to="/" class="link">Se connecter</router-link>
                </p>
            </form>
        </div>
    </div>
</template>

<style scoped>
    .auth-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        font-family: 'Inter', system-ui, sans-serif;
        padding: 20px;
    }

    .auth-card {
        background: white;
        padding: 40px;
        border-radius: 16px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 450px;
    }

    .header {
        text-align: center;
        margin-bottom: 32px;
    }

    h2 {
        color: #1a202c;
        font-size: 1.8rem;
        margin-bottom: 8px;
    }

    .header p {
        color: #718096;
        font-size: 0.95rem;
    }

    .form-group {
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
    }

    /* Aligne mot de passe et confirmation côte à côte sur écran large */
    .form-group-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
    }

    @media (max-width: 480px) {
        .form-group-row {
            grid-template-columns: 1fr;
        }
    }

    label {
        font-size: 0.85rem;
        font-weight: 600;
        color: #4a5568;
        margin-bottom: 6px;
    }

    input {
        padding: 12px 16px;
        border: 1.5px solid #edf2f7;
        border-radius: 10px;
        font-size: 1rem;
        transition: all 0.3s ease;
        background-color: #f7fafc;
    }

    input:focus {
        outline: none;
        border-color: #4299e1;
        background-color: #fff;
        box-shadow: 0 0 0 4px rgba(66, 153, 225, 0.1);
    }

    .btn-primary {
        width: 100%;
        padding: 14px;
        background-color: #2d3748;
        color: white;
        border: none;
        border-radius: 10px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        margin-top: 10px;
        transition: transform 0.1s, background-color 0.2s;
    }

    .btn-primary:hover {
        background-color: #1a202c;
    }

    .btn-primary:active {
        transform: scale(0.98);
    }

    .footer-text {
        text-align: center;
        margin-top: 24px;
        font-size: 0.9rem;
        color: #718096;
    }

    .link {
        color: #4299e1;
        text-decoration: none;
        font-weight: 600;
    }

    .link:hover {
        text-decoration: underline;
    }
</style>