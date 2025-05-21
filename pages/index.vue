<template>
  <div class="p-8 space-y-6">
    <Header />
    <div class="flex items-center justify-between mt-8">
      <h1 class="text-2xl font-bold">My Notes</h1>
      <AddButton @click="showModal = true" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <NoteCard v-for="note in notes" :key="note.id" :note="note" />
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
import AddModal from "~/components/modals/AddModal.vue";

const store = useNotesStore();
const notes = store.notes;
const showModal = ref(false);

function handleCreate(note: Note) {
  store.addNote(note);
}
</script>
