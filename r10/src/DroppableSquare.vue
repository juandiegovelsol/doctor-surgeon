<!-- DroppableSquare.vue -->
<template>
    <div class="droppable-square" :class="{ occupied: isOccupied }" @dragover.prevent @drop="onDrop">
        <slot />
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    row: {
        type: Number,
        required: true,
    },
    col: {
        type: Number,
        required: true,
    },
    isOccupied: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['piece-dropped']);

const onDrop = (event) => {
    const pieceData = JSON.parse(event.dataTransfer.getData('piece-data'));
    emit('piece-dropped', { row: props.row, col: props.col, pieceData });
};
</script>

<style scoped>
.droppable-square {
    width: 80px;
    /* Adjust as needed for square size */
    height: 80px;
    /* Adjust as needed for square size */
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
}

.droppable-square.occupied {
    background-color: lightgray;
    /* Indicate occupied state */
}
</style>