<template>
  <div>
    <h2>Shipment Details</h2>
    <BaseModule type="pickup" :pickup-data="pickupInformation" />
    <BaseModule type="equipment" :equipment-details="equipmentInformation" />
    </div>
</template>

<script setup>
import BaseModule from './components/BaseModule.vue';
import { ref } from 'vue';

const pickupInformation = ref({
  name: 'John Doe',
  contact: '555-1234',
  appointment: 'Tomorrow 10:00 AM',
});

const equipmentInformation = ref({
  trailerType: 'Dry Van',
  weight: '40000 lbs',
});
</script>
