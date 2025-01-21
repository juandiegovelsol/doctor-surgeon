<!-- src/components/MemberList.vue -->
<template>
  <aside class="w-64 bg-gray-700 text-white flex-shrink-0 border-l border-gray-600 transition-margin-right duration-200" :class="{ '-mr-64': !showMembers }">
    <div class="p-4 flex justify-between items-center">
      <h3 class="font-semibold text-lg">Members</h3>
      <button @click="$emit('toggle-members')" class="focus:outline-none">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>
      </button>
    </div>
    <div class="overflow-y-auto p-4 space-y-2">
      <div>
        <h4 class="font-semibold text-sm text-gray-400">Online - {{ onlineMembers.length }}</h4>
        <ul>
          <li v-for="member in onlineMembers" :key="member.id" class="flex items-center space-x-2">
            <span class="w-2 h-2 rounded-full bg-green-500"></span>
            <span>{{ member.username }}</span>
          </li>
        </ul>
      </div>
      <div>
        <h4 class="font-semibold text-sm text-gray-400 mt-4">Offline - {{ offlineMembers.length }}</h4>
        <ul>
          <li v-for="member in offlineMembers" :key="member.id">{{ member.username }}</li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  props: {
    members: {
      type: Array,
      required: true,
    },
    showMembers: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['toggle-members'],
  computed: {
    onlineMembers() {
      return this.members.filter(member => member.status === 'online');
    },
    offlineMembers() {
      return this.members.filter(member => member.status === 'offline');
    },
  },
};
</script>