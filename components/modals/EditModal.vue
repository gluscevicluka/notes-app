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

      <h2 class="text-xl font-bold">Update Cart</h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Select Type -->
        <div>
          <select v-model="type" class="w-full rounded-lg p-3 bg-[#F4F4F4]">
            <option disabled value="">Select type of cart</option>
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
          :disabled="!isFormValid"
          class="w-full text-white rounded-full py-2 flex items-center justify-center transition"
          :class="
            isFormValid
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-300 cursor-not-allowed'
          "
        >
          <div class="flex items-center">
            <img
              src="/assets/img/create-icon.svg"
              alt="create icon"
              class="w-4 h-4"
            />
            &nbsp;Save Changes
          </div>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";

const props = defineProps<{
  note: {
    id: string;
    title: string;
    description: string;
    type: number;
    content?: any;
  };
}>();

const emit = defineEmits(["close", "save"]);
const fileInput = ref<HTMLInputElement | null>(null);
const title = ref(props.note.title);
const description = ref(props.note.description);
const type = ref(props.note.type.toString());
const imageBase64 = ref<string | null>(
  props.note.type === 1 ? props.note.content : null
);
const imageFile = ref<File | null>(null);
const checkboxOptions = ref<{ label: string }[]>(
  props.note.type === 2
    ? props.note.content.map((label: string) => ({ label }))
    : []
);

const errors = reactive({
  title: "",
  description: "",
  type: "",
  image: "",
  options: "",
});

const isFormValid = computed(() => {
  if (!title.value.trim() || !description.value.trim() || !type.value)
    return false;
  if (type.value === "1" && !imageBase64.value) return false;
  if (type.value === "2" && checkboxOptions.value.some((o) => !o.label.trim()))
    return false;
  return true;
});

function handleImageUpload(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  imageFile.value = file;
  const reader = new FileReader();
  reader.onload = () => {
    imageBase64.value = reader.result as string;
  };
  reader.readAsDataURL(file);
}

function addOption() {
  checkboxOptions.value.push({ label: "" });
}
function removeOption(index: number) {
  checkboxOptions.value.splice(index, 1);
}

function handleSubmit() {
  if (!isFormValid.value) return;

  const updatedNote = {
    ...props.note,
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

  emit("save", updatedNote);
  emit("close");
}
</script>

<style scoped>
input::placeholder,
textarea::placeholder {
  font-weight: bold;
  color: #a0aec0;
}
</style>
