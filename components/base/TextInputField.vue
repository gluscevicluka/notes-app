<template>
  <div>
    <input
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full rounded-lg p-3 bg-[#F4F4F4]"
    />
    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
  placeholder: string;
  error?: string;
}>();
defineEmits(['update:modelValue']);
</script>
