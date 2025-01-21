<template>
  <div>
    <PickList
      :source="availableItems"
      :target="selectedItems"
      sourceTitle="Available"
      targetTitle="Selected"
      optionLabel="name"
      @update:source="updateAvailableItems"
      @update:target="updateSelectedItems"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PickList from './PickList.vue'; // Adjust the path

interface Item {
  id: number;
  name: string;
  description: string;
}

const availableItems = ref<Item[]>([
  { id: 1, name: 'Item A', description: 'Description A' },
  { id: 2, name: 'Item B', description: 'Description B' },
  { id: 3, name: 'Item C', description: 'Description C' },
]);

const selectedItems = ref<Item[]>([]);

const updateAvailableItems = (items: Item[]) => {
  availableItems.value = items;
};

const updateSelectedItems = (items: Item[]) => {
  selectedItems.value = items;
};
</script>
