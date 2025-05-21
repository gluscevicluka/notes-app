<template>
  <div class="p-8">
    <AddButton @click="addNote">Add</AddButton>

    <div class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <NoteCard
        v-for="note in notes"
        :key="note.id"
        :note="note"
        @delete="handleDelete(note.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotesStore } from '@/stores/notes'
import AddButton from '@/components/base/AddButton.vue'
import NoteCard from '@/components/notes/NoteCard.vue'

const store = useNotesStore()
const notes = store.notes

function addNote() {
  store.addNote()
}

function handleDelete(id: string) {
  store.deleteNote(id)
}
</script>
