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

      <h2 class="text-xl font-bold">Create New Cart</h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Select Type -->
        <SelectTypeField v-model="type" :error="errors.type" />

        <!-- Image Upload for type 1 -->
        <ImageUploadField
          v-if="type === '1'"
          v-model:file="imageFile"
          v-model:base64="imageBase64"
          :error="errors.image"
        />

        <!-- Title -->
        <TextInputField
          v-model="title"
          placeholder="Header"
          :error="errors.title"
        />

        <!-- Description -->
        <TextareaField
          v-model="description"
          placeholder="Description"
          :error="errors.description"
        />

        <!-- Checkbox Options for type 2 -->
        <div v-if="type === '2'" class="space-y-2">
          <label class="block text-sm font-medium font-bold text-gray-700"
            >Add Option</label
          >
          <div
            v-for="(option, index) in checkboxOptions"
            :key="index"
            class="flex items-center gap-2"
          >
            <input
              type="text"
              v-model="option.label"
              placeholder="Option name"
              class="w-full rounded-lg p-2 bg-[#F4F4F4]"
            />
            <button
              type="button"
              @click="removeOption(index)"
              class="w-6 h-6 flex items-center justify-center rounded-full border border-black text-black hover:bg-black hover:text-white transition cursor-pointer"
            >
              <span class="text-lg leading-none">−</span>
            </button>
          </div>
          <button
            type="button"
            class="flex mt-3 w-full items-center justify-center text-white bg-green-700 rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            @click="addOption"
          >
            <img src="/assets/img/add-button-vector.svg" alt="Icon" /> &nbsp;
            Add Option
          </button>
          <p v-if="errors.options" class="text-red-500 text-sm mt-1">
            {{ errors.options }}
          </p>
        </div>
        <hr class="border-t border-dashed border-gray-300" />
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
import SelectTypeField from "~/components/base/SelectTypeField.vue";
import ImageUploadField from "~/components/base/ImageUploadField.vue";
import TextareaField from "~/components/base/TextareaField.vue";
import TextInputField from "~/components/base/TextInputField.vue";
import { ref, reactive, computed } from "vue";

const emit = defineEmits(["close", "create"]);

const title = ref("");
const description = ref("");
const type = ref("");
const isSubmitting = ref(false);

// Image upload
const fileInput = ref<HTMLInputElement | null>(null);
const imageFile = ref<File | null>(null);
const imageBase64 = ref<string | null>(null);

// Checkbox options
const checkboxOptions = ref([{ label: "" }]);

// Validation errors
const errors = reactive({
  title: "",
  description: "",
  type: "",
  image: "",
  options: "",
});

// Form validation
const isFormValid = computed(() => {
  if (!title.value.trim() || !description.value.trim() || !type.value)
    return false;
  if (type.value === "1" && !imageBase64.value) return false;
  if (
    type.value === "2" &&
    checkboxOptions.value.some((opt) => !opt.label.trim())
  )
    return false;
  return true;
});

// Add/remove checkbox options
function addOption() {
  checkboxOptions.value.push({ label: "" });
}

function removeOption(index: number) {
  checkboxOptions.value.splice(index, 1);
}

// Image upload handler
function handleImageUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    imageFile.value = file;
    const reader = new FileReader();
    reader.onload = () => {
      imageBase64.value = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}

// Form submit
function handleSubmit() {
  // Reset errors
  errors.title = "";
  errors.description = "";
  errors.type = "";
  errors.image = "";
  errors.options = "";

  // Validate inputs
  if (!title.value.trim()) errors.title = "Title is required";
  if (!description.value.trim()) errors.description = "Description is required";
  if (!type.value) errors.type = "Note type is required";
  if (type.value === "1" && !imageBase64.value)
    errors.image = "Image is required";
  if (
    type.value === "2" &&
    checkboxOptions.value.some((opt) => !opt.label.trim())
  )
    errors.options = "All checkbox options must be filled";

  if (Object.values(errors).some((e) => e)) return;

  isSubmitting.value = true;

  setTimeout(() => {
    const note = {
      id: Date.now().toString(),
      title: title.value,
      description: description.value,
      type: Number(type.value),
      content:
        type.value === "1"
          ? imageBase64.value
          : type.value === "2"
          ? checkboxOptions.value.map((o) => o.label)
          : null,
    };

    emit("create", note);
    emit("close");

    // Reset form
    title.value = "";
    description.value = "";
    type.value = "";
    imageFile.value = null;
    imageBase64.value = null;
    checkboxOptions.value = [{ label: "" }];
    isSubmitting.value = false;
  }, 1000);
}
</script>

<style scoped>
input::placeholder,
textarea::placeholder {
  font-weight: bold;
  color: #a0aec0;
}
</style>
