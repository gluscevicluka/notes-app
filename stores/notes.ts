import { defineStore } from "pinia";
import { ref } from "vue";
import type { Note } from "@/types/note";

export const useNotesStore = defineStore("notes", () => {
  const notes = ref<Note[]>([
    {
      id: "1",
      title: "Grocery List",
      description: "Things to buy this weekend",
      type: 2,
      content: ["Milk", "Eggs", "Bread", "Tomatoes"],
    },
    {
      id: "2",
      title: "Frontend Setup",
      description: "Checklist for project initialization",
      type: 2,
      content: [
        "Nuxt JS",
        "Tailwind",
      ],
    },
    {
      id: "3",
      title: "Meeting Notes",
      description: "Discussion about Q2 marketing strategy and KPI updates.",
      type: 0,
      content: null,
    },
    {
      id: "4",
      title: "Book Ideas",
      description: "Possible titles and themes for the new novel series.",
      type: 0,
      content: null,
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
