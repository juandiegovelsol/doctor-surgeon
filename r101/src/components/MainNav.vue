<!-- src/components/MainNav.vue -->
<template>
  <aside class="flex-shrink-0 w-20 bg-gray-800 text-white flex flex-col items-center py-4 space-y-2">
    <button
      v-for="server in servers"
      :key="server.id"
      class="rounded-full bg-indigo-600 hover:bg-indigo-700 w-10 h-10 flex items-center justify-center"
    >
      <!-- Replace with actual server icons or initials -->
      {{ server.name.charAt(0).toUpperCase() }}
    </button>
  </aside>
</template>

<script>
export default {
  props: {
    servers: {
      type: Array,
      required: true,
    },
  },
};
</script>