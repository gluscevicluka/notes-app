<template>
  <div class="p-6 max-w-xl mx-auto space-y-4">
    <h1 class="text-2xl font-bold">Edit Note</h1>

    <NoteInput v-model="note.title" label="Title" />
    <NoteInput v-model="note.description" label="Description" />

    <component :is="noteComponent" v-model="note.content" />

    <AddButton @click="save">Save</AddButton>
  </div>
</template>

<script setup lang="ts">
import { useNotesStore } from '@/stores/notes'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import NoteInput from '@/components/base/NoteInput.vue'
import AddButton from '@/components/base/AddButton.vue'
import NoteTypeImage from '@/components/base/NoteTypeImage.vue'
import NoteTypeCheckbox from '@/components/base/NoteTypeCheckbox.vue'

const route = useRoute()
const router = useRouter()
const store = useNotesStore()

const noteId = route.params.id as string
const note = store.getNoteById(noteId)

if (!note) {
  router.push('/')
}

const noteComponent = computed(() => {
  switch (note?.type) {
    case 1:
      return NoteTypeImage
    case 2:
      return NoteTypeCheckbox
    default:
      return null
  }
})

function save() {
  store.updateNote(note.id, note)
  router.push('/')
}
</script>
