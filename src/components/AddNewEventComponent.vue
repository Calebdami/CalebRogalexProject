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
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-indigo-950/30 backdrop-blur-md">    
        
        <div class="bg-white/90 backdrop-blur-2xl w-full max-w-md rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)] border border-white overflow-hidden transform transition-all">
            
            <div class="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-indigo-50/50 to-purple-50/50">
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                        <svg v-if="!taskToEdit" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </div>
                    <div>
                        <h1 class="text-xl font-black text-slate-800 tracking-tight">
                            {{ taskToEdit ? 'Modifier' : 'Nouvelle tâche' }}
                        </h1>
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-indigo-100 text-indigo-600 uppercase tracking-widest mt-1">
                            {{ theDay }}
                        </span>
                    </div>
                </div>
                <button 
                    @click="emit('close')" 
                    class="text-slate-400 hover:text-rose-500 hover:bg-rose-50 p-2 rounded-xl transition-all duration-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div class="p-8">
                <div class="flex flex-col gap-3">
                    <label class="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                        Que devez-vous faire ?
                    </label>
                    <div class="relative group">
                        <input 
                            ref="inputRef"
                            v-model="title" 
                            type="text" 
                            placeholder="Ex: Séance de Yoga 🧘"
                            @keyup.enter="submit"
                            class="w-full px-6 py-4 rounded-[1.5rem] bg-slate-50 border-2 border-transparent focus:bg-white focus:border-indigo-400 focus:outline-none transition-all duration-300 shadow-inner text-slate-700 font-bold placeholder:text-slate-300"
                        />
                        <div class="absolute inset-y-0 right-4 flex items-center opacity-0 group-focus-within:opacity-100 transition-opacity">
                            <span class="text-[10px] font-bold text-indigo-300 bg-indigo-50 px-2 py-1 rounded-md">Entrée ↵</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="px-8 py-6 bg-slate-50/50 flex gap-4">
                <button 
                    @click="emit('close')" 
                    class="flex-1 px-6 py-4 rounded-2xl bg-white border-2 border-slate-100 text-slate-500 font-black hover:bg-slate-100 hover:text-slate-700 transition-all text-sm uppercase tracking-widest"
                >
                    Annuler
                </button>
                <button 
                    @click="submit"
                    class="flex-[1.5] px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-black shadow-xl shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all active:scale-95 text-sm uppercase tracking-widest"
                >
                    {{ taskToEdit ? 'Mettre à jour' : 'Confirmer' }}
                </button>
            </div>
        </div>
    </div>
</template>