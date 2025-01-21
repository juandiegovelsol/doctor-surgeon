<!-- src/components/ChatWindow.vue -->
<template>
  <div class="flex-1 flex flex-col bg-gray-200">
    <div class="border-b border-gray-300 p-4">
      <h3 class="font-semibold text-lg"># {{ channelName }}</h3>
    </div>
    <div class="flex-1 overflow-y-auto p-4 space-y-4">
      <div v-for="message in messages" :key="message.id" class="flex space-x-2">
        <img src="https://via.placeholder.com/40" alt="User Avatar" class="rounded-full w-8 h-8">
        <div>
          <div class="font-semibold">{{ message.username }} <span class="text-sm text-gray-500">{{ message.timestamp }}</span></div>
          <div>{{ message.content }}</div>
        </div>
      </div>
    </div>
    <div class="border-t border-gray-300 p-4">
      <input type="text" placeholder="Message #{{ channelName }}" class="w-full rounded-md border-gray-400 focus:border-indigo-500 focus:ring-indigo-500">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    channelName: {
      type: String,
      required: true,
    },
    messages: {
      type: Array,
      required: true,
    },
  },
};
</script>