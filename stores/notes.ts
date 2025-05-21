import { defineStore } from "pinia";
import { ref } from "vue";
import type { Note } from "@/types/note";

export const useNotesStore = defineStore("notes", () => {
  const notes = ref<Note[]>([
    {
      id: "1",
      title: "Test note",
      description: "Test description",
      type: 0,
    },
    {
      id: "2",
      title: "Test note",
      description: "Test description",
      type: 1,
    },
    {
      id: "3",
      title: "Test note",
      description: "Test description",
      type: 2,
    },
    {
      id: "4",
      title: "Test note",
      description: "Test description",
      type: 2,
    },
  ]);

  function addNote(note: Note) {
    notes.value.push(note);
  }

  function updateNote(id: string, updated: Partial<Note>) {
    const index = notes.value.findIndex((n) => n.id === id);
    if (index !== -1) {
      notes.value[index] = { ...notes.value[index], ...updated };
    }
  }

  function deleteNote(id: string) {
    notes.value = notes.value.filter((n) => n.id !== id);
  }

  function getNoteById(id: string) {
    return notes.value.find((n) => n.id === id);
  }

  return { notes, addNote, updateNote, deleteNote, getNoteById };
});
