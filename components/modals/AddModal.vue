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
          <select v-model="type" class="w-full rounded-lg p-3 bg-[#F4F4F4]">
            <option disabled value="">Select type of card</option>
            <option value="0">Default</option>
            <option value="1">Image</option>
            <option value="2">Checkbox</option>
          </select>
          <p v-if="errors.type" class="text-red-500 text-sm mt-1">
            {{ errors.type }}
          </p>
        </div>

        <!-- Image Upload for type 1 -->
        <div v-if="type === '1'">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Upload Image</label
          >
          <div
            class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-500 cursor-pointer hover:bg-gray-50"
          >
            <input
              type="file"
              accept="image/*"
              @change="handleImageUpload"
              class="hidden"
              ref="fileInput"
            />
            <div @click="fileInput?.click()">
              <span v-if="!imageFile">Click to upload image</span>
              <span v-else>{{ imageFile.name }}</span>
            </div>
          </div>
          <p v-if="errors.image" class="text-red-500 text-sm mt-1">
            {{ errors.image }}
          </p>
        </div>

        <!-- Title -->
        <div>
          <input
            type="text"
            v-model="title"
            placeholder="Header"
            class="w-full rounded-lg p-3 bg-[#F4F4F4] font-bold"
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
              class="text-red-500 hover:text-red-700"
              @click="removeOption(index)"
            >
              ✕
            </button>
          </div>
          <button
            type="button"
            class="text-green-600 hover:text-green-800 text-sm"
            @click="addOption"
          >
            + Add Option
          </button>
          <p v-if="errors.options" class="text-red-500 text-sm mt-1">
            {{ errors.options }}
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

    console.log("📌 New note created:", note);

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
