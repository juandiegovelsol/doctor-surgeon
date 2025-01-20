<script setup lang="ts">
import Ball from './components/Ball.vue';
import Square from './components/Square.vue';
import { ref, onMounted } from 'vue';

const ball1 = ref(null);
const ball2 = ref(null);
const square1 = ref(null);

const collidingBall = ref(null); // Ref to store the ball currently colliding with the square

const checkCollision = () => {
  if (!ball1.value || !square1.value || !ball1.value.ballElement || !square1.value.squareElement) {
    return; // Elements are not yet available in DOM
  }

  const ballRect = ball1.value.ballElement.getBoundingClientRect();
  const squareRect = square1.value.squareElement.getBoundingClientRect();

  const isOverlapping = !(
    ballRect.right < squareRect.left ||
    ballRect.left > squareRect.right ||
    ballRect.bottom < squareRect.top ||
    ballRect.top > squareRect.bottom
  );

  if (isOverlapping) {
    collidingBall.value = ball1.value; // Store the ball instance that is colliding
    console.log('Ball 1 is colliding with Square!');
  } else {
    collidingBall.value = null; // No collision
  }
};

const handleMouseMoveInApp = () => {
  checkCollision(); // Check for collision on mouse move (while dragging)
};

const handleDragStart = () => {
  document.addEventListener('mousemove', handleMouseMoveInApp); // Start checking on drag start
};

const handleDragEnd = () => {
  document.removeEventListener('mousemove', handleMouseMoveInApp); // Stop checking on drag end
  collidingBall.value = null; // Reset collision state when drag ends, in case mouse up is outside square
  checkCollision(); // Final check on drag end (if you want to know collision state right after mouse up)
};

onMounted(() => {
  // You might want to do an initial collision check here if balls are placed initially on squares.
});

</script>

<template>
  <div @mousemove="handleMouseMoveInApp">  <!-- Option 1: Check collision on any mouse move in App -->
    <Ball ref="ball1" @drag-start="handleDragStart" @drag-end="handleDragEnd" />
    <Ball ref="ball2" /> <Square ref="square1" />
    <p v-if="collidingBall"> Currently colliding Ball: Ball 1 (ref)</p> <!-- Display which ball is colliding -->
    <p v-else> No Ball colliding with Square.</p>
  </div>
</template>

<style scoped>
/* Optional: Style the container in App.vue if needed */
div {
  position: relative; /* Needed for absolute positioning of balls to work relative to app container */
  min-height: 300px; /* Just to see things clearly */
}
</style>