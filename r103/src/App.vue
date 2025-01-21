<template>
  <div class="space-y-4">
    <div v-for="(pickStop, index) in pickStops" :key="index">
      <div
        class="bg-gray-100 rounded-md shadow-md cursor-pointer"
        @click="toggleCard(index)"
        :class="{ 'mb-2': !isExpanded(index) }"
      >
        <div class="px-4 py-2 flex justify-between items-center">
          <span class="font-semibold" :class="isPick(pickStop) ? 'text-green-600' : 'text-blue-600'">
            {{ isPick(pickStop) ? 'Pick' : 'Stop' }}
          </span>
          <span>{{ pickStop['location name'] }}</span>
          <span class="text-sm text-gray-500">Ref: {{ pickStop['ref #'] }}</span>
        </div>
        <div v-if="isExpanded(index)" class="px-4 pb-4 pt-2 border-t border-gray-200">
          <div class="flex flex-wrap gap-4">
            <div v-for="(value, key) in pickStop" :key="key" v-if="isInputField(key)">
              <label :for="`pickstop-${index}-${key}`" class="block text-sm font-medium text-gray-700 capitalize">{{ formatLabel(key) }}</label>
              <input type="text" :id="`pickstop-${index}-${key}`" v-model="pickStops[index][key]" class="text-input">
            </div>
            <div>
              <fieldset>
                <legend class="text-base font-medium text-gray-900">Status</legend>
                <div class="mt-2 space-y-4">
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input id="picked-up-status" name="status" type="radio" class="radio-input">
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="picked-up-status" class="font-medium text-gray-700">Picked Up</label>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input id="in-transit-status" name="status" type="radio" class="radio-input">
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="in-transit-status" class="font-medium text-gray-700">In Transit</label>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input id="delivered-status" name="status" type="radio" class="radio-input">
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="delivered-status" class="font-medium text-gray-700">Delivered</label>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
            <div>
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input id="is-fragile" aria-describedby="is-fragile-description" type="checkbox" class="checkbox-input">
                </div>
                <div class="ml-3 text-sm">
                  <div class="font-medium text-gray-700">Fragile</div>
                  <p id="is-fragile-description" class="text-gray-500">Handle with care.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PickStopCards',
  data() {
    return {
      expandedIndices: [],
      inputFieldKeys: [
        'location name',
        'ref #',
        'equipment picked up/dropped',
        "location contact's phone",
        "location contact's name",
        'appointment time',
        'weight of equipment picked up/dropped',
      ],
    };
  },
  computed: {
    ...mapState(['pickStops']),
  },
  methods: {
    toggleCard(index) {
      if (this.expandedIndices.includes(index)) {
        this.expandedIndices = this.expandedIndices.filter(i => i !== index);
      } else {
        this.expandedIndices.push(index);
      }
    },
    isExpanded(index) {
      return this.expandedIndices.includes(index);
    },
    isPick(pickStop) {
      return pickStop['equipment picked up/dropped'] && pickStop['equipment picked up/dropped'].toLowerCase().includes('pick');
    },
    isInputField(key) {
      return this.inputFieldKeys.includes(key);
    },
    formatLabel(key) {
      return key.split(' ').map(word => word.toLowerCase()).join(' ');
    },
  },
};
</script>

<style scoped>
.text-input {
  @apply mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm;
}
.radio-input {
  @apply focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded;
}
.checkbox-input {
  @apply focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded;
}
</style>