<script setup>
    import { ref, computed, onMounted } from 'vue';
    import DayColumn from '@/components/DayColumn.vue';
    import AddNewEventComponent from '@/components/AddNewEventComponent.vue';

    const daysOfWeek = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];
    import { useRouter } from 'vue-router';
    import authService from '@/services/authService';

    const router = useRouter()

    const handleLogout = () => {
        authService.logout()   // supprime currentUser + met isAuthenticated à false
        router.replace('/')    // redirection propre (pas de retour arrière possible)
    }
    // SOURCE DE VÉRITÉ
    const tasks = ref([]);

    const selectedDay = ref(null);
    const isModalOpen = ref(false);
    const taskToEdit = ref(null);

    onMounted(() => {
        const saved = localStorage.getItem('tasks')
        if (saved) tasks.value = JSON.parse(saved)
    })

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks.value))
    }

    // Ouvrir modale pour ajout
    const openAddModal = (day) => {
        selectedDay.value = day;
        taskToEdit.value = null;
        isModalOpen.value = true;
    }

    // Ajouter ou modifier
    const handleSaveTask = (task) => {
        if (taskToEdit.value) {
            const index = tasks.value.findIndex(t => t.id === task.id)
            tasks.value[index] = task
        } else {
            tasks.value.push(task)
        }
        saveTasks()
        isModalOpen.value = false
    }

    // Supprimer
    const deleteTask = (id) => {
        tasks.value = tasks.value.filter(t => t.id !== id)
        saveTasks()
    }

    // Editer
    const editTask = (task) => {
        selectedDay.value = task.day
        taskToEdit.value = task
        isModalOpen.value = true
    }

    // Drag & Drop
    const handleDrop = (event, newDay) => {
        const taskId = event.dataTransfer.getData('taskId')
        const task = tasks.value.find(t => t.id == taskId)
        if (task) {
            task.day = newDay
            saveTasks()
        }
    }
</script>

<template>
    <AddNewEventComponent
        v-if="isModalOpen"
        :theDay="selectedDay"
        :taskToEdit="taskToEdit"
        @saveTask="handleSaveTask"
        @close="isModalOpen = false"
    />
    <div class="calendar-grid">
        <DayColumn
        v-for="day in daysOfWeek"
        :key="day"
        :day="day"
        :tasks="tasks.filter(t => t.day === day)"
        @openAdd="openAddModal"
        @editTask="editTask"
        @deleteTask="deleteTask"
        @dropTask="handleDrop"
        />
    </div>
    <div class="sidebar-bottom">
        <button @click="handleLogout" class="btn-logout"> ⎋ Déconnexion </button>
    </div>
</template>

<style scoped>
    /* --- CONFIGURATION DU DASHBOARD --- */
    .calendar-grid {
        --bg-dashboard: #f1f5f9;
        --bg-column: rgba(255, 255, 255, 0.6);
        --column-border: #e2e8f0;
        --text-day: #1e293b;
        --btn-logout-bg: #fee2e2;
        --btn-logout-text: #ef4444;
        --btn-logout-hover: #b91c1c;
        
        display: grid;
        grid-template-columns: repeat(7, minmax(150px, 1fr)); /* 7 colonnes égales */
        gap: 16px;
        padding: 24px;
        background-color: var(--bg-dashboard);
        min-height: calc(100vh - 80px); /* Ajusté pour laisser de la place au footer */
        transition: all 0.4s ease;
        overflow-x: auto; /* Scroll horizontal sur petit écran */
    }

    /* --- CLASSE DARK MODE --- */
    .dark-mode .calendar-grid {
        --bg-dashboard: #0f172a;
        --bg-column: rgba(30, 41, 59, 0.7);
        --column-border: #334155;
        --text-day: #f1f5f9;
        --btn-logout-bg: #450a0a;
        --btn-logout-text: #fca5a5;
    }

    /* --- STYLE DES COLONNES (DayColumn) --- */
    /* Note : Ces styles s'appliquent aux composants enfants */
    :deep(.day-column) {
        background-color: var(--bg-column);
        border: 1px solid var(--column-border);
        border-radius: 16px;
        padding: 16px;
        min-height: 500px;
        backdrop-filter: blur(8px); /* Effet de verre moderne */
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        animation: slideUpFade 0.6s ease-out both;
    }

    :deep(.day-column:hover) {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
    }

    /* --- BARRE DE DÉCONNEXION --- */
    .sidebar-bottom {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 15px 24px;
        background: var(--bg-card); /* Utilise la variable de la carte auth si dispo */
        border-top: 1px solid var(--column-border);
        display: flex;
        justify-content: flex-end;
        z-index: 10;
    }

    .btn-logout {
        background-color: var(--btn-logout-bg);
        color: var(--btn-logout-text);
        border: none;
        padding: 10px 20px;
        border-radius: 10px;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.3s ease;
    }

    .btn-logout:hover {
        background-color: var(--btn-logout-text);
        color: white;
        transform: scale(1.05);
    }

    /* --- ANIMATIONS --- */
    @keyframes slideUpFade {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Décalage de l'animation pour chaque colonne (effet cascade) */
    :deep(.day-column:nth-child(1)) { animation-delay: 0.1s; }
    :deep(.day-column:nth-child(2)) { animation-delay: 0.15s; }
    :deep(.day-column:nth-child(3)) { animation-delay: 0.2s; }
    :deep(.day-column:nth-child(4)) { animation-delay: 0.25s; }
    :deep(.day-column:nth-child(5)) { animation-delay: 0.3s; }
    :deep(.day-column:nth-child(6)) { animation-delay: 0.35s; }
    :deep(.day-column:nth-child(7)) { animation-delay: 0.4s; }

    /* --- RESPONSIVE --- */
    @media (max-width: 1024px) {
        .calendar-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        }
    }
</style>