<script setup>
    import { ref, onMounted } from 'vue';
    import DayColumn from '@/components/DayColumn.vue';
    import AddNewEventComponent from '@/components/AddNewEventComponent.vue';
    import { useRouter } from 'vue-router';
    import authService from '@/services/authService';

    const name = ref(authService.getUser().name);
    const router = useRouter();
    const daysOfWeek = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];
    
    // --- ÉTAT DES TÂCHES ---
    const tasks = ref([]);
    const selectedDay = ref(null);
    const isModalOpen = ref(false);
    const taskToEdit = ref(null);

    // --- ÉTAT DES NOTIFICATIONS (TOASTS) ---
    const showNotification = ref(false);
    const notificationMessage = ref("");
    const notificationType = ref("success"); // 'success' ou 'danger'

    const triggerToast = (message, type = "success") => {
        notificationMessage.value = message;
        notificationType.value = type;
        showNotification.value = true;
        // Disparition automatique après 3 secondes
        setTimeout(() => {
            showNotification.value = false;
        }, 3000);
    }

    onMounted(() => {
        const saved = localStorage.getItem('tasks')
        if (saved) tasks.value = JSON.parse(saved)
    })

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks.value))
    }

    const handleLogout = () => {
        authService.logout()
        router.replace('/')
    }

    const openAddModal = (day) => {
        selectedDay.value = day;
        taskToEdit.value = null;
        isModalOpen.value = true;
    }

    // Ajouter ou modifier avec notification
    const handleSaveTask = (task) => {
        const isEdit = !!taskToEdit.value;
        if (isEdit) {
            const index = tasks.value.findIndex(t => t.id === task.id)
            tasks.value[index] = task
            triggerToast("Tâche mise à jour avec succès !");
        } else {
            tasks.value.push(task)
            triggerToast("Nouvelle tâche ajoutée !");
        }
        saveTasks()
        isModalOpen.value = false
    }

    // Supprimer avec CONFIRMATION et notification
    const deleteTask = (id) => {
        const confirmDelete = confirm("Voulez-vous vraiment supprimer cette tâche ?");
        if (confirmDelete) {
            tasks.value = tasks.value.filter(t => t.id !== id)
            saveTasks()
            triggerToast("Tâche supprimée", "danger");
        }
    }

    const editTask = (task) => {
        selectedDay.value = task.day
        taskToEdit.value = task
        isModalOpen.value = true
    }

    const handleDrop = (event, newDay) => {
        const taskId = event.dataTransfer.getData('taskId')
        const task = tasks.value.find(t => t.id == taskId)
        if (task) {
            task.day = newDay
            saveTasks()
            triggerToast(`Déplacé vers ${newDay}`);
        }
    }
</script>

<template>
    <div class="min-h-screen bg-slate-50 flex flex-col relative overflow-x-hidden font-sans">
        
        <transition 
            enter-active-class="transform transition duration-500 ease-out"
            enter-from-class="-translate-y-full opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transition duration-300 ease-in"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="-translate-y-full opacity-0"
        >
            <div 
                v-if="showNotification"
                class="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4 px-6 py-3 rounded-2xl shadow-2xl bg-white border-l-4 min-w-[340px]"
                :class="notificationType === 'success' ? 'border-emerald-500' : 'border-red-500'"
            >
                <div :class="notificationType === 'success' ? 'text-emerald-500' : 'text-red-500'">
                    <svg v-if="notificationType === 'success'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div class="flex flex-col">
                    <span class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Système</span>
                    <span class="text-sm font-bold text-slate-700">{{ notificationMessage }}</span>
                </div>
            </div>
        </transition>

        <header class="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 px-6 py-4">
            <div class="max-w-[1600px] mx-auto flex justify-between items-center">
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <h1 class="text-xl font-bold text-slate-900">{{ name }} Planning</h1>
                        <p class="text-xs text-slate-500 font-medium uppercase tracking-wider">Vue Hebdomadaire</p>
                    </div>
                </div>

                <button 
                    @click="openAddModal('Lundi')" 
                    class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-100 flex items-center gap-2 active:scale-95"
                >
                    <span class="text-lg">+</span> Nouvelle tâche
                </button>
            </div>        
        </header>

        <main class="flex-grow p-6 overflow-x-auto">
            <div class="max-w-[1600px] mx-auto h-full">
                <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-6 min-w-[1100px] lg:min-w-0">
                    <DayColumn
                        v-for="day in daysOfWeek"
                        :key="day"
                        :day="day"
                        :tasks="tasks.filter(t => t.day === day)"
                        @openAdd="openAddModal"
                        @editTask="editTask"
                        @deleteTask="deleteTask"
                        @dropTask="handleDrop"
                        class="bg-white/40 rounded-3xl border border-slate-200/60 p-2 transition-all"
                    />
                </div>
            </div>
        </main>

        <footer class="p-6 bg-white border-t border-slate-200 mt-auto">
            <div class="max-w-[1600px] mx-auto flex justify-end">
                <button 
                    @click="handleLogout" 
                    class="flex items-center gap-2 text-slate-400 hover:text-red-500 font-bold text-sm transition-all group px-4 py-2 rounded-lg hover:bg-red-50"
                >
                    <span class="group-hover:-translate-x-1 transition-transform">⎋</span> 
                    Déconnexion
                </button>
            </div>
        </footer>
        <AddNewEventComponent
            v-if="isModalOpen"
            :theDay="selectedDay"
            :taskToEdit="taskToEdit"
            @saveTask="handleSaveTask"
            @close="isModalOpen = false"
        />
    </div>
</template>