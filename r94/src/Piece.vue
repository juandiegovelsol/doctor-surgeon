<script lang="ts" setup>
import { defineProps, ref, onMounted } from 'vue';

        const props = defineProps<{
                imageUrl: string
                movement?: () => void
        }>();

        const x = ref(0);
        const y = ref(0);
        const dx = ref(0);
        const dy = ref(0);
        const isDragging = ref(false);

        const pieceElement = ref<HTMLElement | null>(null);


        onMounted(() => {
                if (pieceElement.value) {
                        const rect = pieceElement.value.getBoundingClientRect();
                        x.value = rect.left; // Initialize x with element's initial left position
                        y.value = rect.top;  // Initialize y with element's initial top position
                }
        });


        const mouseDownHandler = (e: MouseEvent) => {
                isDragging.value = true;
                if (pieceElement.value) {
                        const rect = pieceElement.value.getBoundingClientRect();
                        dx.value = rect.left - e.clientX; // Offset: piece's current left - mouse x
                        dy.value = rect.top - e.clientY;  // Offset: piece's current top - mouse y
                }

                addEventListener("mousemove", mouseMoveHandler);
                addEventListener("mouseup", mouseUpHandler);
        }

        const mouseMoveHandler = (e: MouseEvent) => {
                if (!isDragging.value) return;
                x.value = e.clientX + dx.value;
                y.value = e.clientY + dy.value;
                console.log(`piece x: ${x.value} | piece y: ${y.value}`)
        }

        const mouseUpHandler = () => {
                isDragging.value = false;
                removeEventListener("mousemove", mouseMoveHandler);
                removeEventListener("mouseup", mouseUpHandler);
        }

</script>

<template>
        <div
                ref="pieceElement"
                @mousedown.left.prevent="mouseDownHandler"
                class="piece"
                :class="{ 'dragging': isDragging }"
                :style="{transform: `translate(${x}px,${y}px)`, position: 'absolute', cursor: 'grab', left: 0, top: 0}" >  <!-- position: absolute and initial left/top: 0, translate will move from 0,0 -->
                <img :src="props.imageUrl" style="pointer-events: none;"></img>
        </div>
</template>

<style scoped>
        .piece {
                user-select: none;
        position: absolute; /* Ensure piece is positioned absolutely */
        left: 0;          /* Initial position at 0,0 within parent if parent is positioned */
        top: 0;
                transition: transform 100ms ease-out; /* smooth transition for non-dragging movement if any */
        }

        .piece.dragging {
                transform: scale(1.4) translate(var(--x-pos), var(--y-pos));
                transition: transform 100ms ease-out; /* smooth transition for scaling and dragging */
                z-index: 10;
                cursor: grabbing;
        }

    .piece > img { /* target image inside piece */
        display: block; /* remove potential bottom spacing from inline-block images */
        width: 100%;    /* ensure image scales within piece div */
        height: auto;
    }
</style>