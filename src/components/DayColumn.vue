<script setup>
    import EventComponent from './EventComponent.vue';

    const props = defineProps({
        day: String,
        tasks: Array
    })
    const emit = defineEmits(['openAdd','editTask','deleteTask','dropTask']);
    const allowDrop = (event) => { event.preventDefault()}
    const drop = (event) => { emit('dropTask', event, props.day) }
</script>

<template>
    <div 
        class="flex flex-col h-full min-h-[500px] bg-slate-50/50 rounded-2xl p-4 transition-all duration-300 border-2 border-transparent hover:border-indigo-100 group"
        @dragover="allowDrop"
        @drop="drop"
    >
        <div class="flex justify-between items-center mb-5">
            <h3 
                @click="emit('openAdd', day)" 
                class="text-sm font-bold text-slate-700 uppercase tracking-widest cursor-pointer hover:text-indigo-600 transition-colors flex items-center gap-2"
            >
                {{ day }}
                <span class="bg-slate-200 text-slate-600 text-[10px] px-2 py-0.5 rounded-full group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                    {{ tasks.length }}
                </span>
            </h3>
            
            <button 
                @click="emit('openAdd', day)"
                class="opacity-0 group-hover:opacity-100 p-1 hover:bg-indigo-100 text-indigo-600 rounded-md transition-all"
                title="Ajouter une tâche"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
            </button>
        </div>

        <div class="flex flex-col gap-3 h-full">
            <EventComponent
                v-for="task in tasks"
                :key="task.id"
                :theTask="task"
                @editTask="emit('editTask', task)"
                @deleteTask="emit('deleteTask', task.id)"
            />
            
            <div 
                v-if="tasks.length === 0" 
                class="flex-grow border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center p-4 group-hover:border-indigo-200 transition-colors"
            >
                <p class="text-xs text-slate-400 font-medium text-center italic">Déposez ou ajoutez une tâche</p>
            </div>
        </div>
    </div>
</template>