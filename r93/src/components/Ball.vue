<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

const emit = defineEmits(['drag-start', 'drag-end']);

const ballElement = ref<HTMLElement | null>(null);
const isDragging = ref(false);
const startX = ref(0);
const startY = ref(0);
const translateX = ref(0);
const translateY = ref(0);

defineExpose({
  ballElement // Expose the ball element so App.vue can get its position
});

const handleMouseDown = (event: MouseEvent) => {
  isDragging.value = true;
  startX.value = event.clientX - translateX.value;
  startY.value = event.clientY - translateY.value;
  emit('drag-start');
};

const handleMouseMove = (event: MouseEvent) => {
  if (!isDragging.value) return;
  translateX.value = event.clientX - startX.value;
  translateY.value = event.clientY - startY.value;
};

const handleMouseUp = () => {
  if (!isDragging.value) return;
  isDragging.value = false;
  emit('drag-end');
};

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
});

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseUp);
});

const ballStyle = computed(() => ({
  transform: `translate(${translateX.value}px, ${translateY.value}px)`,
  cursor: isDragging.value ? 'grabbing' : 'grab',
}));

</script>

<template>
  <div
    ref="ballElement"
    class="ball"
    @mousedown="handleMouseDown"
    :style="ballStyle"
  >
  </div>
</template>

<style scoped>
.ball {
  width: 50px;
  height: 50px;
  background-color: blue;
  border-radius: 50%;
  position: absolute; /* Important for positioning with translate */
  touch-action: none;
}
</style>