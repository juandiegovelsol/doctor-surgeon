<template>
  <div class="board">
    <div v-for="row in 8" :key="row" class="board-row">
      <DroppableSquare v-for="col in 8" :key="col" :row="row" :col="col" :isOccupied="isSquareOccupied(row, col)"
        @piece-dropped="handlePieceDropped">
        <DraggablePiece v-if="boardState[row][col]" :piece="boardState[row][col].piece"
          :isWhite="boardState[row][col].isWhite" />
      </DroppableSquare>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DraggablePiece from './DraggablePiece.vue';
import DroppableSquare from './DroppableSquare.vue';

const boardState = ref([
  [{ piece: 'rook', isWhite: true }, { piece: 'knight', isWhite: true }, { piece: 'bishop', isWhite: true }, { piece: 'queen', isWhite: true }, { piece: 'king', isWhite: true }, { piece: 'bishop', isWhite: true }, { piece: 'knight', isWhite: true }, { piece: 'rook', isWhite: true }],
  [{ piece: 'pawn', isWhite: true }, { piece: 'pawn', isWhite: true }, { piece: 'pawn', isWhite: true }, { piece: 'pawn', isWhite: true }, { piece: 'pawn', isWhite: true }, { piece: 'pawn', isWhite: true }, { piece: 'pawn', isWhite: true }, { piece: 'pawn', isWhite: true }],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [{ piece: 'pawn', isWhite: false }, { piece: 'pawn', isWhite: false }, { piece: 'pawn', isWhite: false }, { piece: 'pawn', isWhite: false }, { piece: 'pawn', isWhite: false }, { piece: 'pawn', isWhite: false }, { piece: 'pawn', isWhite: false }, { piece: 'pawn', isWhite: false }],
  [{ piece: 'rook', isWhite: false }, { piece: 'knight', isWhite: false }, { piece: 'bishop', isWhite: false }, { piece: 'queen', isWhite: false }, { piece: 'king', isWhite: false }, { piece: 'bishop', isWhite: false }, { piece: 'knight', isWhite: false }, { piece: 'rook', isWhite: false }],
]);

const handlePieceDropped = (event) => {
  const { row, col, pieceData } = event;
  console.log('Piece dropped on:', row, col, pieceData);
  // Update your game state here based on the drop event
  // For example, move the piece in your boardState array
};

const isSquareOccupied = (row, col) => {
  return boardState.value[row - 1][col - 1] !== null;
};
</script>

<style scoped>
.board {
  display: flex;
  flex-direction: column;
}

.board-row {
  display: flex;
}
</style>