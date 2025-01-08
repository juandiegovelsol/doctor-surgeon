<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import imgUrl from './assets/pawn_white.png'

const props = defineProps({
  piece: {
    type: String,
    required: true,
  },
  isWhite: {
    type: Boolean,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
    default: 10,
  },
  movement: {
    type: Object,
  },
});

const countdown = ref(props.time);
const timerInterval = ref(null);

const getImage = () => {
  const color = props.isWhite ? "white" : "black";
    console.log(new URL(`./assets/pawn_white.png`, import.meta.url).href);
    return new URL(`./assets/pawn_white.png`, import.meta.url).href;
};

onMounted(() => {
  timerInterval.value = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      clearInterval(timerInterval.value);
    }
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timerInterval.value);
});
</script>

<template>
  <div class="chess-piece">
    <img :src="igmUrl" alt="Chess Piece" />
    <p>Time: {{ countdown }}</p>
  </div>
</template>

<style scoped>
.chess-piece {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chess-piece img {
  width: 50px; /* Adjust as needed */
  height: 50px; /* Adjust as needed */
}
</style>
