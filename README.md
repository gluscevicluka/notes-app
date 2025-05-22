# 🗒️ Notes App — Nuxt 3 Test Assignment

This is a single-page note management application developed using **Nuxt 3**, **Vue 3**, **Pinia**, and **Tailwind CSS 3**, created as a test assignment for a Frontend Developer position.

## 🧩 Features

- ✍️ Create, edit, and delete notes without page reload
- 🗂 Filter notes by type (Default, Image, Checkbox)
- 🧾 View and edit individual notes on `/note/{id}` route
- 📸 Upload and display images for image-type notes
- ☑️ Manage checkbox lists for checklist-type notes
- 🧼 Modular and clean architecture (easily extendable)
- 🔐 Custom modal dialogs (no `alert`, `confirm`, or `prompt`)
- ⚙️ Reusable input, checkbox, and button components

## 📦 Tech Stack

- [Nuxt 3](https://nuxt.com) (Vue 3 + SSR framework)
- [Pinia](https://pinia.vuejs.org) (state management)
- [Tailwind CSS 3](https://tailwindcss.com) (utility-first CSS)
- TypeScript
- Composition API

## 📁 Folder Structure

├── components/
│ ├── base/ # Input, Select, Textarea, Checkbox components
│ ├── modals/ # Modal components
│ └── notes/ NoteCard.vue # Display card for notes
├── composables/ # Reusable composables (e.g., modal logic)
├── pages/
│ ├── index.vue # Home page (list + add + filter)
│ └── note/ note/[id].vue # Note view/edit page
├── stores/
│ └── notes.ts # Pinia store for notes
└── app.vue / nuxt.config.ts


## 🚀 Getting Started

Install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

🧑‍💻 Developer
Luka Gluscevic
Frontend Developer & Business Informatics Teaching Assistant
📧 gluscevicluka@gmail.com
🔗 LinkedIn | GitHub