<script setup>
    import { ref, watch } from 'vue';

    const props = defineProps({
        theDay: String,
        taskToEdit: Object
    })

    const emit = defineEmits(['saveTask','close'])

    const title = ref('')

    watch(() => props.taskToEdit, (val) => {
        if (val) title.value = val.title
        else title.value = ''
    })

    const submit = () => {
        const task = {
            id: props.taskToEdit ? props.taskToEdit.id : Date.now(),
            title: title.value,
            day: props.theDay
        }
        emit('saveTask', task)
    }
</script>

<template>
    <div class="modal">
        <h2> {{ taskToEdit ? 'Modifier la tâche' : 'Nouvelle tâche' }} </h2>

        <input v-model="title" type="text" />

        <button @click="submit"> {{ taskToEdit ? 'Mettre à jour' : 'Créer' }} </button>

        <button @click="emit('close')">X</button>
    </div>
</template>


<style scoped>
    /* --- VARIABLES DE BASE (S'adapte aux deux modes) --- */
    :root {
        --accent: #6366f1;
        --bg: #f8fafc;
        --card: #ffffff;
        --text: #1e293b;
        --radius: 24px; /* Coins très arrondis pour un aspect organique */
    }

    .dark-mode {
        --bg: #0f172a;
        --card: #1e293b;
        --text: #f8fafc;
    }

    /* --- LE CONTENEUR PRINCIPAL --- */
    .auth-container, .calendar-grid {
        background-color: var(--bg);
        transition: background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        font-family: 'Inter', sans-serif;
    }

    /* --- ANIMATION DE "GONFLEMENT" (Cards & Modals) --- */
    .auth-card, .modal, .day-column, .task-item {
        background: var(--card);
        border-radius: var(--radius);
        color: var(--text);
        border: none;
        /* On remplace la bordure par une ombre très douce qui "respire" */
        box-shadow: 0 10px 40px -10px rgba(0,0,0,0.05);
        animation: breatheIn 0.6s backwards;
    }

    @keyframes breatheIn {
        0% { opacity: 0; transform: scale(0.95); filter: blur(10px); }
        100% { opacity: 1; transform: scale(1); filter: blur(0); }
    }

    /* --- INPUTS ULTRA-SIMPLES --- */
    input {
        background: var(--bg);
        border: 2px solid transparent;
        padding: 16px;
        border-radius: 18px;
        color: var(--text);
        transition: 0.3s;
    }

    input:focus {
        background: var(--card);
        border-color: var(--accent);
        transform: translateY(-2px); /* L'input s'élève quand on tape */
    }

    /* --- BOUTON "GUMMY" (Effet gomme/rebond) --- */
    .btn-primary {
        background: var(--accent);
        color: white;
        border-radius: 18px;
        border: none;
        padding: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .btn-primary:hover {
        transform: scale(1.05);
        box-shadow: 0 15px 20px -5px rgba(99, 102, 241, 0.4);
    }

    .btn-primary:active {
        transform: scale(0.95);
    }

    /* --- TASK ITEMS (Le plus simple possible) --- */
    .task-item {
        padding: 12px 18px;
        margin: 8px 0;
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: grab;
        transition: 0.2s;
    }

    .task-item:hover {
        background: var(--accent);
        color: white;
    }

    .task-item button {
        opacity: 0;
        transition: 0.2s;
    }

    .task-item:hover button {
        opacity: 1;
        color: white;
    }

    /* --- SÉPARATEUR (Connexion) --- */
    .divider {
        height: 1px;
        background: linear-gradient(to right, transparent, var(--text), transparent);
        opacity: 0.1;
        margin: 30px 0;
    }
</style>