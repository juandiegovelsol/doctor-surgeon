
    *   **`defineProps`:**  Declares the `type` prop, which is required and of type `String`.


<template>
  <div class="border rounded p-4">
    <div class="flex justify-end mb-4">
      <button @click="toggleEditMode" class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">
        {{ isEditMode ? 'Display' : 'Edit' }}
      </button>
    </div>

    <component
      :is="dynamicModuleComponent"
      v-if="dynamicModuleComponent"
      :is-edit-mode="isEditMode"
      v-bind="$attrs"
    />
    <div v-else>
      Loading module...
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, defineAsyncComponent } from 'vue';

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
});

const isEditMode = ref(false);

const toggleEditMode = () => {
  isEditMode.value = !isEditMode.value;
};

const dynamicModuleComponent = computed(() => {
  try {
    return defineAsyncComponent(() => import(`@/components/ShipmentModules${capitalizeFirstLetter(props.type)}.vue`));
  } catch (error) {
    console.error(`Failed to load module ShipmentModules${capitalizeFirstLetter(props.type)}.vue`, error);
    return null;
  }
});

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
</script>