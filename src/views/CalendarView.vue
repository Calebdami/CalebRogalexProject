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
    <div class="min-h-screen bg-gradient-to-br from-rose-50 via-indigo-50 to-cyan-50 flex flex-col relative overflow-x-hidden font-sans selection:bg-pink-200">
        
        <transition 
            enter-active-class="transform transition duration-500 cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            enter-from-class="scale-0 opacity-0"
            enter-to-class="scale-100 opacity-100"
            leave-active-class="transition duration-300 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-90"
        >
            <div 
                v-if="showNotification"
                class="fixed top-10 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4 px-6 py-4 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border-2 backdrop-blur-xl"
                :class="notificationType === 'success' ? 'bg-emerald-500/90 border-emerald-300 text-white' : 'bg-rose-500/90 border-rose-300 text-white'"
            >
                <div class="bg-white/20 p-2 rounded-full shadow-inner">
                    <svg v-if="notificationType === 'success'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <div class="flex flex-col">
                    <span class="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Message</span>
                    <span class="text-sm font-bold">{{ notificationMessage }}</span>
                </div>
            </div>
        </transition>

        <header class="bg-white/60 backdrop-blur-xl border-b border-white/40 sticky top-0 z-30 px-8 py-6">
            <div class="max-w-[1600px] mx-auto flex justify-between items-center">
                <div class="flex items-center gap-6">
                    <div class="relative group">
                        <div class="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-2xl blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <div class="relative w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-xl border border-white/50">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                    </div>
                    <div>
                        <h1 class="text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                            {{ name }} Workspace
                        </h1>
                        <p class="text-[12px] text-slate-400 font-extrabold uppercase tracking-[0.3em]">Week Schedule</p>
                    </div>
                </div>

                <button 
                    @click="openAddModal('Lundi')" 
                    class="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-8 py-4 rounded-[2rem] text-sm font-black transition-all shadow-[0_10px_25px_-5px_rgba(79,70,229,0.4)] hover:-translate-y-1 active:scale-95 flex items-center gap-3"
                >
                    <span class="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-lg">+</span> 
                    AJOUTER UNE TÂCHE
                </button>
            </div>        
        </header>

        <main class="flex-grow p-10 overflow-x-auto">
            <div class="max-w-[1600px] mx-auto h-full">
                <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-10 min-w-[1200px] lg:min-w-0">
                    <DayColumn
                        v-for="(day, index) in daysOfWeek"
                        :key="day"
                        :day="day"
                        :tasks="tasks.filter(t => t.day === day)"
                        @openAdd="openAddModal"
                        @editTask="editTask"
                        @deleteTask="deleteTask"
                        @dropTask="handleDrop"
                        class="relative bg-white/40 hover:bg-white/80 rounded-[2.5rem] border-2 border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 p-2 group overflow-hidden"
                    />
                </div>
            </div>
        </main>

        <footer class="p-8 mt-auto">
            <div class="max-w-[1600px] mx-auto flex justify-between items-center bg-white/40 backdrop-blur-md rounded-3xl p-6 border border-white shadow-sm">
                <div class="flex gap-2">
                    <div v-for="color in ['bg-pink-400', 'bg-purple-400', 'bg-indigo-400', 'bg-cyan-400']" :key="color" :class="color" class="w-3 h-3 rounded-full animate-pulse"></div>
                </div>
                <button 
                    @click="handleLogout" 
                    class="flex items-center gap-2 text-rose-400 hover:text-rose-600 font-black text-xs transition-all tracking-widest uppercase hover:bg-rose-50 px-6 py-3 rounded-2xl"
                >
                    Déconnexion 
                    <span class="text-xl">➔</span>
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