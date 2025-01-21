<!-- src/components/ServerChannels.vue -->
<template>
  <aside class="w-64 bg-gray-700 text-white flex-shrink-0 flex flex-col">
    <div class="p-4">
      <h2 class="font-semibold text-lg">{{ serverName }}</h2>
    </div>
    <nav class="flex-1 overflow-y-auto p-4 space-y-2">
      <div>
        <h3 class="font-bold text-sm text-gray-400">Text Channels</h3>
        <ul class="mt-2 space-y-1">
          <li v-for="channel in textChannels" :key="channel.id">
            <button class="block hover:bg-gray-600 px-3 py-1 rounded-md w-full text-left">
              # {{ channel.name }}
            </button>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-sm text-gray-400 mt-4">Voice Channels</h3>
        <ul class="mt-2 space-y-1">
          <li v-for="channel in voiceChannels" :key="channel.id">
            <button class="block hover:bg-gray-600 px-3 py-1 rounded-md w-full text-left flex items-center space-x-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0-4c-4.418 0-8-3.582-8-8m8 8V7m0 0C15.582 7 19 10.582 19 15"></path></svg>
              <span>{{ channel.name }}</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  </aside>
</template>

<script>
export default {
  props: {
    serverName: {
      type: String,
      required: true,
    },
    textChannels: {
      type: Array,
      required: true,
    },
    voiceChannels: {
      type: Array,
      required: true,
    },
  },
};
</script>