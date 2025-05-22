<template>
  <div class="p-8 space-y-6">
    <Header />
    <div class="flex items-center justify-between mt-8">
      <h1 class="text-2xl font-bold">My Notes</h1>
      <div class="flex items-center">
        <FilterButton @update:filters="activeFilters = $event" />
        <AddButton @click="showModal = true" />
      </div>
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 items-stretch"
    >
      <NoteCard v-for="note in filteredNotes" :key="note.id" :note="note" />
    </div>
    <!-- Modal -->
    <AddModal
      v-if="showModal"
      @create="handleCreate"
      @close="showModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { useNotesStore } from "@/stores/notes";
import NoteCard from "@/components/notes/NoteCard.vue";
import Header from "~/components/base/Header.vue";
import AddButton from "~/components/base/AddButton.vue";
import FilterButton from "~/components/base/FilterButton.vue";
import AddModal from "~/components/modals/AddModal.vue";

const store = useNotesStore();
const showModal = ref(false);
const activeFilters = ref<number[]>([]);

function handleCreate(note: Note) {
  store.addNote(note);
}

const filteredNotes = computed(() =>
  activeFilters.value.length === 0
    ? store.notes
    : store.notes.filter((note) => activeFilters.value.includes(note.type))
);
</script>
