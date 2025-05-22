<template>
  <button
    class="flex text-white rounded-full bg-blue-700 font-medium text-xs sm:text-sm px-3 py-2 sm:px-5 sm:py-2.5 me-2 mb-2 cursor-pointer"
    @click="$emit('click')"
  >
    <img src="/assets/img/add-button-vector.svg" alt="Icon" />
    &nbsp; Add New
  </button>
</template>
