<script setup>
    const props = defineProps({
        theTask: Object
    })

    const emit = defineEmits(['editTask','deleteTask']);

    const dragStart = (event) => {
        event.dataTransfer.setData('taskId', props.theTask.id)
        // Petit effet visuel pendant le drag
        event.target.style.opacity = "0.5";
        setTimeout(() => {
            event.target.style.opacity = "1";
        }, 0);
    }
</script>

<template>
    <div 
        class="group bg-white p-3 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-grab active:cursor-grabbing flex items-start justify-between gap-2"
        draggable="true" 
        @dragstart="dragStart"
    >
        <span class="text-sm font-medium text-slate-700 leading-tight break-words">
            {{ theTask.title }}
        </span>

        <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
                @click="emit('editTask')" 
                class="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                title="Modifier"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
            </button>
            
            <button 
                @click="emit('deleteTask')" 
                class="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Supprimer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
    </div>
</template>