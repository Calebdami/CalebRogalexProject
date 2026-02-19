<script setup>
    import { ref, watch, onMounted } from 'vue';

    const props = defineProps({
        theDay: String,
        taskToEdit: Object
    })

    const emit = defineEmits(['saveTask','close'])
    const title = ref('')

    // Focus automatique sur l'input à l'ouverture
    const inputRef = ref(null);
    onMounted(() => {
        inputRef.value?.focus();
    })

    watch(() => props.taskToEdit, (val) => {
        if (val) title.value = val.title
        else title.value = ''
    }, { immediate: true })

    const submit = () => {
        if (!title.value.trim()) return; // Évite les tâches vides
        const task = {
            id: props.taskToEdit ? props.taskToEdit.id : Date.now(),
            title: title.value,
            day: props.theDay
        }
        emit('saveTask', task)
    }
</script>

<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">    
        <div class="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all">
            <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <div>
                    <h1 class="text-lg font-bold text-slate-900">
                        {{ taskToEdit ? 'Modifier la tâche' : 'Nouvelle tâche' }}
                    </h1>
                    <p class="text-xs text-indigo-600 font-bold uppercase tracking-wider italic">
                        {{ theDay }}
                    </p>
                </div>
                <button 
                    @click="emit('close')" 
                    class="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-2 rounded-full transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div class="p-6">
                <div class="flex flex-col gap-2">
                    <label class="text-sm font-semibold text-slate-700 ml-1">Titre de la tâche</label>
                    <input 
                        ref="inputRef"
                        v-model="title" 
                        type="text" 
                        placeholder="Ex: Réunion d'équipe, Sport..."
                        @keyup.enter="submit"
                        class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                </div>
            </div>

            <div class="px-6 py-4 bg-slate-50 flex gap-3">
                <button 
                    @click="emit('close')" 
                    class="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-white transition-all text-sm"
                >
                    Annuler
                </button>
                <button 
                    @click="submit"
                    class="flex-1 px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all text-sm"
                >
                    {{ taskToEdit ? 'Mettre à jour' : 'Confirmer' }}
                </button>
            </div>
        </div>
    </div>
</template>