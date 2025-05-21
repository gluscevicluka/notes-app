<template>
  <button
    class="w-[104px] h-[40px] rounded-[36px] px-[20px] py-[10px] pl-[14px] flex items-center gap-[8px] bg-blue-600 text-white hover:bg-blue-700 transition"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>
