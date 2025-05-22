<template>
  <EditModal
    v-if="note"
    :note="note"
    @save="save"
    @close="router.push('/')"
  />
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useNotesStore } from '@/stores/notes'
import EditModal from '@/components/modals/EditModal.vue'

const route = useRoute()
const router = useRouter()
const store = useNotesStore()

const noteId = route.params.id as string
const note = store.getNoteById(noteId)

function save(updatedNote: any) {
  store.updateNote(noteId, updatedNote)
  router.push('/')
}
</script>