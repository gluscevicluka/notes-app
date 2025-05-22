<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-xl shadow-lg space-y-4 w-full max-w-sm">
        <p class="text-gray-800">Are you sure you want to delete this note?</p>
        <div class="flex justify-end space-x-3">
          <button
            class="text-gray-600 hover:text-black cursor-pointer"
            @click="$emit('cancel')"
          >
            Cancel
          </button>
          <button
            class="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded cursor-pointer"
            @click="$emit('confirm')"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
