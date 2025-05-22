<template>
  <button
    class="text-white bg-red-700 w-full text-sm font-semibold cursor pointer rounded-full py-2"
    @click="$emit('click')"
  >
    Delete Note
  </button>
</template>
