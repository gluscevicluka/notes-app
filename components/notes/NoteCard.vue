<template>
  <div
    class="bg-white rounded-xl shadow-md p-6 space-y-3 border border-gray-200 h-full flex flex-col"
  >
    <NuxtLink
      :to="`/note/${note.id}`"
      class="inline-block text-blue-600 text-sm no-underline"
    >
      <h2 class="text-lg font-semibold text-gray-800">{{ note.title }}</h2>
      <!-- Content type 1 -->
      <div v-if="note.type === 1 && note.content" class="mt-1">
        <img
          :src="note.content"
          alt="Note image"
          class="w-full h-auto rounded-md object-cover"
        />
      </div>
      <p
        class="text-base font-normal leading-[140%] mb-3 align-middle font-inter text-black mt-2"
      >
        {{ note.description }}
      </p>

      <!-- Content type 2 -->
      <ul
        v-if="note.type === 2 && Array.isArray(note.content)"
        class="pt-2 space-y-1 text-sm text-gray-700"
      >
        <li
          v-for="(item, index) in note.content"
          :key="index"
          class="flex items-center gap-2"
        >
          <div class="flex items-center mb-4">
            <input
              id="default-checkbox"
              type="checkbox"
              checked
              value=""
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="default-checkbox"
              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >{{ item }}</label
            >
          </div>
        </li>
      </ul>
    </NuxtLink>
    <!-- Delete section -->
    <div class="flex justify-end mt-auto">
      <DeleteButton @click="showConfirm = true" />
    </div>
  
    <DeleteConfirmModal
      v-if="showConfirm"
      @cancel="showConfirm = false"
      @confirm="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import DeleteButton from "@/components/base/DeleteButton.vue";
import DeleteConfirmModal from "@/components/modals/DeleteConfirmModal.vue";

const showConfirm = ref(false);
const emit = defineEmits(['delete']);

const handleDelete = () => {
  emit("delete", props.note.id);
  showConfirm.value = false;
};

const props = defineProps<{
  note: {
    id: string;
    title: string;
    description: string;
    type: number;
    content?: string | string[];
  };
}>();

const typeLabel = computed(() => {
  switch (props.note.type) {
    case 1:
      return "Image";
    case 2:
      return "Checkbox";
    default:
      return "Default";
  }
});
</script>
