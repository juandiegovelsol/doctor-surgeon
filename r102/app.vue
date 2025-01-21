<template>
  <div class="container mx-auto mt-4">
    <!-- Top Section -->
    <div class="flex items-start space-x-4 mb-6">
      <div class="w-24 h-24 rounded-full overflow-hidden">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile Picture"
          class="w-full h-full object-cover"
        />
      </div>
      <div>
        <h1 class="text-2xl font-bold">{{ userProfile.username }}</h1>
        <p class="text-gray-600">{{ userProfile.bio }}</p>
        <div class="flex space-x-4 mt-2">
          <span><strong>{{ userProfile.followers }}</strong> Followers</span>
          <span><strong>{{ userProfile.following }}</strong> Following</span>
        </div>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="border-b">
      <nav class="-mb-px flex space-x-4">
        <button
          type="button"
          class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
          :class="{
            'border-indigo-500 text-indigo-600': activeTab === 'posts',
            'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300': activeTab !== 'posts',
          }"
          @click="activeTab = 'posts'"
        >
          Posts
        </button>
        <button
          type="button"
          class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
          :class="{
            'border-indigo-500 text-indigo-600': activeTab === 'media',
            'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300': activeTab !== 'media',
          }"
          @click="activeTab = 'media'"
        >
          Media
        </button>
        <button
          type="button"
          class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
          :class="{
            'border-indigo-500 text-indigo-600': activeTab === 'activity',
            'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300': activeTab !== 'activity',
          }"
          @click="activeTab = 'activity'"
        >
          Activity
        </button>
      </nav>
    </div>

    <!-- Content Area -->
    <div class="mt-4">
      <div v-if="activeTab === 'posts'">
        <div v-if="posts.length > 0" class="space-y-4">
          <div v-for="post in posts" :key="post.id" class="bg-white p-4 rounded shadow">
            <p class="mb-2">{{ post.text }}</p>
            <img v-if="post.mediaUrl" :src="post.mediaUrl" alt="Post Media" class="mt-2 rounded" />
          </div>
        </div>
        <div v-else class="text-gray-500 text-center py-6">No posts yet.</div>
      </div>

      <div v-if="activeTab === 'media'">
        <div v-if="media.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <img v-for="item in media" :key="item.id" :src="item.url" alt="Media" class="rounded" />
        </div>
        <div v-else class="text-gray-500 text-center py-6">No media available.</div>
      </div>

      <div v-if="activeTab === 'activity'">
        <ul v-if="activity.length > 0" class="space-y-2">
          <li v-for="item in activity" :key="item.id" class="flex items-center space-x-2">
            <span class="text-sm text-gray-700">{{ item.timestamp }}</span>
            <span>{{ item.description }}</span>
          </li>
        </ul>
        <div v-else class="text-gray-500 text-center py-6">No recent activity.</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'nuxt/app';

const route = useRoute();
const userId = route.params.userId;

// Reactive state
const userProfile = ref({
  username: 'johndoe',
  bio: 'A software enthusiast and traveler.',
  followers: 150,
  following: 200,
});
const posts = ref([]);
const media = ref([]);
const activity = ref([]);
const activeTab = ref('posts');

// Mock data fetching (replace with actual API calls)
onMounted(() => {
  // Simulate fetching user profile data
  // In a real application, you would fetch this data based on the userId
  // Example: fetchUserProfile(userId).then(data => userProfile.value = data);

  // Simulate fetching posts
  posts.value = [
    { id: 1, text: 'Enjoying a beautiful sunset! #travel', mediaUrl: 'https://via.placeholder.com/600x400' },
    { id: 2, text: 'Just finished reading a great book.', mediaUrl: null },
    { id: 3, text: 'Coding all night long!', mediaUrl: null },
    { id: 4, text: 'Another day, another adventure.', mediaUrl: 'https://via.placeholder.com/600x400' },
  ];

  // Simulate fetching media
  media.value = [
    { id: 1, url: 'https://via.placeholder.com/300x300' },
    { id: 2, url: 'https://via.placeholder.com/300x300' },
    { id: 3, url: 'https://via.placeholder.com/300x300' },
    { id: 4, url: 'https://via.placeholder.com/300x300' },
    { id: 5, url: 'https://via.placeholder.com/300x300' },
    { id: 6, url: 'https://via.placeholder.com/300x300' },
  ];

  // Simulate fetching activity
  activity.value = [
    { id: 1, timestamp: '5 mins ago', description: 'User liked your post.' },
    { id: 2, timestamp: '15 mins ago', description: 'Someone started following you.' },
    { id: 3, timestamp: '30 mins ago', description: 'User commented on your post.' },
  ];
});
</script>

<route lang="yaml">
meta:
  name: user-profile
</route>