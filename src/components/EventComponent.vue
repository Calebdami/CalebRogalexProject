<script setup>
    const props = defineProps({
        theTask: Object
    })

    const emit = defineEmits(['editTask','deleteTask']);

    const dragStart = (event) => {
        event.dataTransfer.setData('taskId', props.theTask.id)
    }
</script>

<template>
    <div class="task-item" draggable="true" @dragstart="dragStart">
        <span>{{ theTask.title }}</span>
        <button @click="emit('editTask')">✏️</button>
        <button @click="emit('deleteTask')">🗑</button>
    </div>
</template>

<style scoped>
    /* --- STYLE DES CARTES DE TÂCHES --- */
    .task-item {
        --task-bg: var(--bg-card, #ffffff);
        --task-text: var(--text-title, #1e293b);
        --task-border: var(--input-border, #e2e8f0);
        --accent-color: #6366f1;
        
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        margin-bottom: 10px;
        background-color: var(--task-bg);
        color: var(--task-text);
        border: 1px solid var(--task-border);
        border-radius: 12px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        cursor: grab;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        animation: popIn 0.3s ease-out both;
    }

    /* État lors du survol */
    .task-item:hover {
        transform: scale(1.02);
        border-color: var(--accent-color);
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
    }

    /* État pendant le Drag (Saisie) */
    .task-item:active {
        cursor: grabbing;
        opacity: 0.6;
        transform: scale(0.98);
    }

    /* --- CONTENU DE LA TÂCHE --- */
    .task-item span {
        flex: 1;
        font-size: 14px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis; /* Coupe le texte trop long proprement */
        margin-right: 10px;
    }

    /* --- BOUTONS D'ACTION --- */
    .task-item button {
        background: transparent;
        border: none;
        font-size: 14px;
        padding: 5px;
        cursor: pointer;
        border-radius: 6px;
        transition: background 0.2s;
        opacity: 0.6; /* Discret par défaut */
    }

    .task-item:hover button {
        opacity: 1; /* Apparaissent au survol de la tâche */
    }

    .task-item button:hover {
        background-color: var(--secondary-bg, #f1f5f9);
        transform: scale(1.2);
    }

    /* --- ANIMATIONS --- */
    @keyframes popIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    /* --- ADAPTATION DARK MODE --- */
    .dark-mode .task-item {
        --task-bg: #334155;
        --task-text: #f1f5f9;
        --task-border: #475569;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    }

    .dark-mode .task-item button:hover {
        background-color: #475569;
    }
</style>