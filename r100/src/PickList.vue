<script setup lang="ts">
import { ref, computed } from 'vue';

interface PickListItem {
  [key: string]: any;
}

interface Props {
  source: PickListItem[];
  target: PickListItem[];
  sourceTitle?: string;
  targetTitle?: string;
  optionLabel?: string;
  optionValue?: string;
}

interface Emits {
  (e: 'update:source', value: PickListItem[]): void;
  (e: 'update:target', value: PickListItem[]): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const sourceSelection = ref<PickListItem[]>([]);
const targetSelection = ref<PickListItem[]>([]);

interface PickListAction {
  icon: string; // SVG path or component
  handler: () => void;
  ariaLabel: string;
}

const actions = ref<PickListAction[]>([
  {
    icon: '<svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>',
    handler: () => onMoveToTarget(),
    ariaLabel: 'Move to Target',
  },
  {
    icon: '<svg viewBox="0 0 24 24"><path d="M5 18h14v-2H5v2zm4.6-2.7L5 10.7l1.4-1.4 2.1 2.1L15 4l1.4 1.4-5.4 5.3z"/></svg>',
    handler: () => onMoveAllToTarget(),
    ariaLabel: 'Move All to Target',
  },
  {
    icon: '<svg viewBox="0 0 24 24"><path d="M16 6l-1.41 1.41L10.83 12l4.59 4.59L16 18l-6-6z"/></svg>',
    handler: () => onMoveToSource(),
    ariaLabel: 'Move to Source',
  },
  {
    icon: '<svg viewBox="0 0 24 24"><path d="M9.4 16.7L19 7.1l-1.4-1.4-7.5 7.5-2.1-2.1L5 14.3zM23 3h-8v2h8v16h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>',
    handler: () => onMoveAllToSource(),
    ariaLabel: 'Move All to Source',
  },
]);

const onMoveToTarget = () => {
  if (sourceSelection.value.length) {
    const newTarget = [...props.target, ...sourceSelection.value];
    const newSource = props.source.filter(item => !sourceSelection.value.includes(item));
    emit('update:source', newSource);
    emit('update:target', newTarget);
    sourceSelection.value = [];
  }
};

const onMoveAllToTarget = () => {
  if (props.source.length) {
    const newTarget = [...props.target, ...props.source];
    emit('update:source', []);
    emit('update:target', newTarget);
    sourceSelection.value = [];
  }
};

const onMoveToSource = () => {
  if (targetSelection.value.length) {
    const newSource = [...props.source, ...targetSelection.value];
    const newTarget = props.target.filter(item => !targetSelection.value.includes(item));
    emit('update:source', newSource);
    emit('update:target', newTarget);
    targetSelection.value = [];
  }
};

const onMoveAllToSource = () => {
  if (props.target.length) {
    const newSource = [...props.source, ...props.target];
    emit('update:source', newSource);
    emit('update:target', []);
    targetSelection.value = [];
  }
};

const getOptionLabel = (item: PickListItem): string => {
  return props.optionLabel && item[props.optionLabel] ? String(item[props.optionLabel]) : JSON.stringify(item);
};

const onSourceItemClick = (item: PickListItem) => {
  const index = sourceSelection.value.indexOf(item);
  if (index > -1) {
    sourceSelection.value = sourceSelection.value.filter(selectedItem => selectedItem !== item);
  } else {
    sourceSelection.value = [...sourceSelection.value, item];
  }
};

const onTargetItemClick = (item: PickListItem) => {
  const index = targetSelection.value.indexOf(item);
  if (index > -1) {
    targetSelection.value = targetSelection.value.filter(selectedItem => selectedItem !== item);
  } else {
    targetSelection.value = [...targetSelection.value, item];
  }
};

const isSourceItemSelected = (item: PickListItem): boolean => {
  return sourceSelection.value.includes(item);
};

const isTargetItemSelected = (item: PickListItem): boolean => {
  return targetSelection.value.includes(item);
};
</script>

<template>
  <div class="picklist">
    <div class="picklist-source-wrapper">
      <div class="picklist-header" v-if="sourceTitle">{{ sourceTitle }}</div>
      <ul class="picklist-list picklist-source">
        <li
          v-for="item in source"
          :key="JSON.stringify(item)"
          class="picklist-item"
          :class="{ 'p-highlight': isSourceItemSelected(item) }"
          @click="onSourceItemClick(item)"
        >
          {{ getOptionLabel(item) }}
        </li>
      </ul>
    </div>
    <div class="picklist-buttons">
      <button
        v-for="(action, index) in actions"
        :key="index"
        type="button"
        class="p-button picklist-button"
        :aria-label="action.ariaLabel"
        @click="action.handler"
      >
        <span class="picklist-button-icon" v-html="action.icon"></span>
      </button>
    </div>
    <div class="picklist-target-wrapper">
      <div class="picklist-header" v-if="targetTitle">{{ targetTitle }}</div>
      <ul class="picklist-list picklist-target">
        <li
          v-for="item in target"
          :key="JSON.stringify(item)"
          class="picklist-item"
          :class="{ 'p-highlight': isTargetItemSelected(item) }"
          @click="onTargetItemClick(item)"
        >
          {{ getOptionLabel(item) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.picklist {
  display: flex;
  width: 100%;
}

.picklist-source-wrapper,
.picklist-target-wrapper {
  flex: 1;
  padding: 1rem;
  border: 1px solid #ccc;
}

.picklist-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  height: 200px; /* Adjust as needed */
  overflow-y: auto;
  border: 1px solid #ddd;
}

.picklist-item {
  padding: 0.5rem;
  cursor: pointer;
}

.picklist-item.p-highlight {
  background-color: #eee;
}

.picklist-buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
}

.picklist-button {
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
  border-radius: 4px;
}

.picklist-button-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1em;
  height: 1em;
}

.picklist-button-icon svg {
  width: 100%;
  height: 100%;
  fill: currentColor; /* Use current text color */
}

.picklist-header {
  padding-bottom: 0.5rem;
  font-weight: bold;
}
</style>