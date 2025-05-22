<template>
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-1"
      >Upload Image</label
    >
    <div
      class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-500 cursor-pointer hover:bg-gray-50"
      @click="triggerFileInput"
    >
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="hidden"
        @change="handleFileChange"
      />
      <span v-if="!file">Click to upload image</span>
      <span v-else>{{ file.name }}</span>
    </div>
    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  file: File | null;
  base64: string | null;
  error?: string;
}>();

const emit = defineEmits(["update:file", "update:base64"]);
const fileInput = ref<HTMLInputElement | null>(null);

function triggerFileInput() {
  fileInput.value?.click();
}

function handleFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    emit("update:file", file);

    const reader = new FileReader();
    reader.onload = () => {
      emit("update:base64", reader.result as string);
    };
    reader.readAsDataURL(file);
  }
}
</script>
