<template>
  <button
    class="flex text-white rounded-full bg-blue-700 font-medium text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer"
    @click="$emit('click')"
  >
    <img src="/assets/img/add-button-vector.svg" alt="Icon" />
    &nbsp; Add New
  </button>
</template>


