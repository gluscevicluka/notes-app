<template>
  <div>
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      class="w-full rounded-lg p-3 bg-[#F4F4F4]"
    >
      <option disabled value="">Select type of cart</option>
      <option value="0">Default</option>
      <option value="1">Image</option>
      <option value="2">Checkbox</option>
    </select>
    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
  error?: string;
}>();
defineEmits(["update:modelValue"]);
</script>
