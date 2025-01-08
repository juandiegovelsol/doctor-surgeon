<!-- DraggablePiece.vue -->
<template>
    <img :src="getImage()" alt="Chess Piece" draggable="true" @dragstart="onDragStart" class="draggable-piece" />
</template>

<script setup>
import { defineProps, toRefs } from 'vue';

const props = defineProps({
    piece: {
        type: String,
        required: true,
    },
    isWhite: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(['drag-start']);

const { piece, isWhite } = toRefs(props);

const getImage = () => {
    const color = isWhite.value ? 'white' : 'black';
    return new URL(`../assets/${piece.value}_${color}.png`, import.meta.url).href;
};

const onDragStart = (event) => {
    event.dataTransfer.setData('piece-data', JSON.stringify({ piece: piece.value, isWhite: isWhite.value }));
};
</script>

<style scoped>
.draggable-piece {
    width: 50px;
    /* Adjust as needed */
    height: 50px;
    /* Adjust as needed */
    cursor: grab;
}
</style>