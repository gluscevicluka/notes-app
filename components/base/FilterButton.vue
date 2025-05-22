<template>
  <div class="relative">
    <button
      class="flex items-center text-white rounded-full bg-black hover:bg-gray-900 font-medium text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer"
      @click="toggleDropdown"
    >
      <img src="/assets/img/filter-icon.svg" alt="Icon" />
      &nbsp; Filter
    </button>

    <div
      v-if="show"
      class="absolute right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-md p-3 z-50 space-y-2"
    >
      <div class="flex items-center gap-2">
        <input type="checkbox" v-model="filters[0]" @change="emitFilters" />
        <label>Default</label>
      </div>
      <div class="flex items-center gap-2">
        <input type="checkbox" v-model="filters[1]" @change="emitFilters" />
        <label>Image</label>
      </div>
      <div class="flex items-center gap-2">
        <input type="checkbox" v-model="filters[2]" @change="emitFilters" />
        <label>Checkbox</label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["update:filters"]);

const show = ref(false);

const filters = ref<{ [key: number]: boolean }>({
  0: false,
  1: false,
  2: false,
});

function toggleDropdown() {
  show.value = !show.value;
}

function emitFilters() {
  const selected = Object.entries(filters.value)
    .filter(([, checked]) => checked)
    .map(([type]) => Number(type));
  emit("update:filters", selected);
}
</script>
