<template>
  <div class="space-y-1">
    <label class="block font-medium">{{ label }}</label>
    <input
      class="border px-3 py-2 rounded w-full"
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  modelValue: string;
}>();
defineEmits(["update:modelValue"]);
</script>
