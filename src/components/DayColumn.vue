<script setup>
    import EventComponent from './EventComponent.vue';

    const props = defineProps({
        day: String,
        tasks: Array
    })
    const emit = defineEmits(['openAdd','editTask','deleteTask','dropTask']);
    const allowDrop = (event) => { event.preventDefault()}
    const drop = (event) => { emit('dropTask', event, props.day)}

</script>

<template>
    <div class="day-column"
        @dragover="allowDrop"
        @drop="drop">

        <h3 @click="emit('openAdd', day)"> {{ day }} </h3>

        <div class="tasks-container">
            <EventComponent
                v-for="task in tasks"
                :key="task.id"
                :theTask="task"
                @editTask="emit('editTask', task)"
                @deleteTask="emit('deleteTask', task.id)"
            />
        </div>
    </div>
</template>

<style scoped>
/* --- DESIGN SYSTEM UNIFIÉ --- */
:root {
    /* Palette de couleurs */
    --accent: #6366f1;
    --accent-hover: #4f46e5;
    --success: #10b981;
    --warning: #f59e0b;
    --danger: #ef4444;
    --info: #3b82f6;

    /* Mode Clair (Par défaut) */
    --bg-page: #f8fafc;
    --bg-card: rgba(255, 255, 255, 0.9);
    --bg-input: #f1f5f9;
    --text-main: #1e293b;
    --text-muted: #64748b;
    --column-bg: rgba(255, 255, 255, 0.4);
    --shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.05);
}

.dark-mode {
    /* Mode Sombre */
    --bg-page: #0f172a;
    --bg-card: rgba(30, 41, 59, 0.8);
    --bg-input: #1e293b;
    --text-main: #f8fafc;
    --text-muted: #94a3b8;
    --column-bg: rgba(30, 41, 59, 0.5);
    --shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.3);
}

/* --- STRUCTURE GÉNÉRALE --- */
.auth-wrapper, .calendar-container {
    min-height: 100vh;
    background-color: var(--bg-page);
    color: var(--text-main);
    transition: background-color 0.4s ease, color 0.4s ease;
    font-family: 'Inter', system-ui, sans-serif;
    padding: 20px;
}

/* --- CARTES & MODALES --- */
.auth-card, .modal {
    background: var(--bg-card);
    backdrop-filter: blur(12px);
    border-radius: 24px;
    box-shadow: var(--shadow);
    padding: 40px;
    animation: breatheIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes breatheIn {
    0% { opacity: 0; transform: scale(0.95); filter: blur(8px); }
    100% { opacity: 1; transform: scale(1); filter: blur(0); }
}

/* --- FORMULAIRES & INPUTS --- */
.form-group {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
}

label {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--text-muted);
}

input {
    background: var(--bg-input);
    border: 2px solid transparent;
    padding: 14px 18px;
    border-radius: 14px;
    color: var(--text-main);
    font-size: 16px;
    transition: all 0.3s ease;
}

input:focus {
    outline: none;
    border-color: var(--accent);
    background: var(--bg-card);
    transform: translateY(-2px);
    box-shadow: 0 10px 20px -5px rgba(99, 102, 241, 0.2);
}

/* --- BOUTONS --- */
.btn-primary {
    background: linear-gradient(135deg, var(--accent), var(--info));
    color: white;
    border: none;
    padding: 16px;
    border-radius: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.btn-primary:hover {
    transform: scale(1.03);
    box-shadow: 0 15px 25px -5px rgba(99, 102, 241, 0.4);
}

/* --- CALENDRIER & COLONNES --- */
.calendar-grid {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    padding: 20px 0;
}

.day-column {
    background: var(--column-bg);
    backdrop-filter: blur(8px);
    border-radius: 20px;
    min-width: 280px;
    padding: 20px;
    transition: transform 0.3s ease;
}

.day-column h3 {
    color: var(--accent);
    font-weight: 800;
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
}

.day-column h3:hover {
    background: rgba(99, 102, 241, 0.1);
}

/* --- TÂCHES (Task Items) --- */
.task-item {
    background: var(--bg-card);
    margin-bottom: 12px;
}
</style>