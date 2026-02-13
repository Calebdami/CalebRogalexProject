<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import authService from '@/services/authService';

const router = useRouter()
const email = ref("")
const password = ref("")
const error = ref(false)


function connexion(){
    if(authService.login(email.value , password.value)){
        router.push("/")
    }else{
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
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8fafc; /* Gris très léger */
  font-family: 'Inter', sans-serif;
}

.auth-card {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 400px;
}

h2 {
  margin-bottom: 0.5rem;
  color: #1e293b;
  text-align: center;
}

.subtitle {
  text-align: center;
  color: #64748b;
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

.form-group {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}

label {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #475569;
}

input {
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #3b82f6; /* Bleu pro */
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.btn-primary {
  width: 100%;
  padding: 0.75rem;
  background-color: #1e293b;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover {
  background-color: #0f172a;
}

.divider {
  text-align: center;
  margin: 1.5rem 0;
  position: relative;
}

.divider::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e2e8f0;
}

.divider span {
  background: white;
  padding: 0 10px;
  color: #94a3b8;
  font-size: 0.8rem;
  position: relative;
}

.btn-secondary {
  display: block;
  text-align: center;
  text-decoration: none;
  color: #3b82f6;
  font-size: 0.9rem;
  font-weight: 500;
}

.btn-secondary:hover {
  text-decoration: underline;
}

</style>
