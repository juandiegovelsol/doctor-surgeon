<!-- src/components/AppLayout.vue -->
<template>
  <div class="h-screen flex overflow-hidden bg-gray-100">
    <MainNav :servers="servers" />

    <div class="flex flex-1 overflow-hidden">
      <ServerChannels
        :serverName="currentServer.name"
        :textChannels="currentTextChannels"
        :voiceChannels="currentVoiceChannels"
      />
      <ChatWindow :channelName="currentChannel.name" :messages="currentMessages" />
      <MemberList
        :members="currentMembers"
        :showMembers="showMembers"
        @toggle-members="toggleMembers"
      />
    </div>
  </div>
</template>

<script>
import MainNav from './MainNav.vue';
import ServerChannels from './ServerChannels.vue';
import ChatWindow from './ChatWindow.vue';
import MemberList from './MemberList.vue';

export default {
  components: {
    MainNav,
    ServerChannels,
    ChatWindow,
    MemberList,
  },
  data() {
    return {
      showMembers: true,
      servers: [
        { id: 1, name: 'Community Server', icon: 'community' },
        { id: 2, name: 'Gaming Hub', icon: 'gaming' },
      ],
      currentServerId: 1,
      channels: [
        { id: 101, serverId: 1, name: 'general', type: 'text' },
        { id: 102, serverId: 1, name: 'announcements', type: 'text' },
        { id: 103, serverId: 1, name: 'help', type: 'text' },
        { id: 104, serverId: 1, name: 'General', type: 'voice' },
        { id: 105, serverId: 1, name: 'Gaming', type: 'voice' },
        { id: 201, serverId: 2, name: 'lobby', type: 'text' },
        { id: 202, serverId: 2, name: 'strategies', type: 'text' },
        { id: 203, serverId: 2, name: 'Main Chat', type: 'voice' },
      ],
      currentChannelId: 102,
      messages: [
        { id: 1, channelId: 102, userId: 'user1', username: 'User1', content: 'Hello everyone!', timestamp: '10:00 AM' },
        { id: 2, channelId: 102, userId: 'user2', username: 'User2', content: 'Welcome!', timestamp: '10:05 AM' },
        { id: 3, channelId: 102, userId: 'user1', username: 'User1', content: 'Excited to be here.', timestamp: '10:06 AM' },
        { id: 4, channelId: 101, userId: 'user3', username: 'User3', content: 'Hey!', timestamp: '10:10 AM' },
      ],
      members: [
        { id: 'user1', username: 'User1', status: 'online' },
        { id: 'user2', username: 'User2', status: 'online' },
        { id: 'user3', username: 'User3', status: 'offline' },
        { id: 'user4', username: 'User4', status: 'offline' },
        { id: 'user5', username: 'User5', status: 'offline' },
        { id: 'user6', username: 'User6', status: 'offline' },
        { id: 'user7', username: 'User7', status: 'offline' },
      ],
    };
  },
  computed: {
    currentServer() {
      return this.servers.find(server => server.id === this.currentServerId);
    },
    currentChannel() {
      return this.channels.find(channel => channel.id === this.currentChannelId);
    },
    currentTextChannels() {
      return this.channels.filter(channel => channel.serverId === this.currentServerId && channel.type === 'text');
    },
    currentVoiceChannels() {
      return this.channels.filter(channel => channel.serverId === this.currentServerId && channel.type === 'voice');
    },
    currentMessages() {
      return this.messages.filter(message => message.channelId === this.currentChannelId);
    },
    currentMembers() {
      return this.members;
    },
  },
  methods: {
    toggleMembers() {
      this.showMembers = !this.showMembers;
    },
  },
};
</script>