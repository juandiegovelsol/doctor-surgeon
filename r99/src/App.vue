<template>
  <div>
    <div v-if="isSuccess">
      <h2>{{ weatherData.city }}</h2>
      <p>{{ weatherData.temperature }}°C - {{ weatherData.description }}</p>
      <img :src="'https:' + weatherData.icon" alt="Weather icon" />
      <p v-if="isSuccess">Last updated: {{ new Date(dataUpdatedAt).toLocaleTimeString() }}</p>
    </div>
    <div v-if="isLoading">
      <p>Loading weather data...</p>
    </div>
    <div v-if="isError">
      <p>Failed to fetch weather data: {{ error.message }}. Please try again later.</p>
      <button @click="refetch">Retry</button>
    </div>
    <div v-if="locationDenied">
      <p>Location access denied. Showing weather for {{ defaultCity }}.</p>
      <button @click="retryWithLocation">Retry with location</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { fetchWeather } from './weatherService'; // Assuming you keep the service layer

const defaultCity = 'Toronto';
const refreshInterval = 10 * 60 * 1000; // 10 minutes
const locationDenied = ref(false);
const queryClient = useQueryClient();

const getWeather = async ({ latitude, longitude }) => {
  if (!latitude || !longitude) {
    return fetchWeather(defaultCity); // Use default city if no location
  }
  return fetchWeather(`${latitude},${longitude}`);
};

const {
  isLoading,
  isError,
  data: weatherData,
  error,
  refetch,
  isSuccess,
  dataUpdatedAt,
} = useQuery({
  queryKey: computed(() => ['weather', { location: locationDenied.value ? defaultCity : 'user' }]), // Unique key for caching
  queryFn: () =>
    new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve(getWeather({ latitude: position.coords.latitude, longitude: position.coords.longitude }));
          },
          (error) => {
            console.error('Error getting location:', error);
            locationDenied.value = true;
            resolve(getWeather({})); // Fetch with default city
          }
        );
      } else {
        console.log('Geolocation is not supported.');
        resolve(getWeather({})); // Fetch with default city
      }
    }),
  enabled: true, // Start fetching immediately
  refetchInterval: refreshInterval, // Automatic background refresh
  retry: 3, // Retry 3 times on error
  staleTime: refreshInterval / 2, // Consider data fresh for half the refresh interval
  select: (data) => ({ // Transform the data if needed
    city: data.location.name,
    temperature: data.current.temp_c,
    description: data.current.condition.text,
    icon: data.current.condition.icon,
  }),
});

const retryWithLocation = () => {
  locationDenied.value = false;
  queryClient.invalidateQueries(['weather']); // Force a refetch
};
</script>