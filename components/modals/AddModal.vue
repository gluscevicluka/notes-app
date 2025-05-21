<template>
  <div class="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
    <div
      class="bg-white rounded-2xl p-6 w-full max-w-md space-y-4 shadow-lg relative"
    >
      <button
        class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
        @click="$emit('close')"
      >
        ✕
      </button>

      <h2 class="text-xl font-bold">Create New Card</h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Select Type -->
        <div>
          <select
            v-model="type"
            class="w-full rounded-lg p-3 bg-[#F4F4F4]"
          >
            <option disabled value="">Select type of card</option>
            <option value="0">Default</option>
            <option value="1">Image</option>
            <option value="2">Checkbox</option>
          </select>
          <p v-if="errors.type" class="text-red-500 text-sm mt-1">
            {{ errors.type }}
          </p>
        </div>

        <!-- Title -->
        <div>
          <input
            type="text"
            v-model="title"
            placeholder="Header"
            class="w-full rounded-lg p-3 bg-[#F4F4F4]"
          />
          <p v-if="errors.title" class="text-red-500 text-sm mt-1">
            {{ errors.title }}
          </p>
        </div>

        <!-- Description -->
        <div>
          <textarea
            v-model="description"
            placeholder="Description"
            rows="3"
            class="w-full rounded-lg p-3 bg-[#F4F4F4]"
          />
          <p v-if="errors.description" class="text-red-500 text-sm mt-1">
            {{ errors.description }}
          </p>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="!isFormValid || isSubmitting"
          class="w-full text-white rounded-full py-2 flex items-center justify-center transition"
          :class="
            isFormValid
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-300 cursor-not-allowed'
          "
        >
          <span v-if="isSubmitting" class="animate-pulse">Creating...</span>
          <div v-else class="flex items-center">
            <img
              src="/assets/img/create-icon.svg"
              alt="create icon"
              class="w-4 h-4"
            />
            &nbsp;Create
          </div>
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from "vue";

const emit = defineEmits(["close", "create"]);

const title = ref("");
const description = ref("");
const type = ref("");
const isSubmitting = ref(false);

const errors = reactive({
  title: "",
  description: "",
  type: "",
});

const isFormValid = computed(() => {
  return title.value.trim() && description.value.trim() && type.value;
});

function handleSubmit() {
  // Reset errors
  errors.title = "";
  errors.description = "";
  errors.type = "";

  // Basic validation
  if (!title.value.trim()) errors.title = "Title is required";
  if (!description.value.trim()) errors.description = "Description is required";
  if (!type.value) errors.type = "Note type is required";

  if (errors.title || errors.description || errors.type) return;

  isSubmitting.value = true;

  setTimeout(() => {
    const note = {
      id: Date.now().toString(),
      title: title.value,
      description: description.value,
      type: Number(type.value),
      content: null,
    };

    emit("create", note);
    emit("close");

    title.value = "";
    description.value = "";
    type.value = "";
    isSubmitting.value = false;
  }, 1000);
}
</script>

<style scoped>
input {
  font-weight: bold;
}
</style>
