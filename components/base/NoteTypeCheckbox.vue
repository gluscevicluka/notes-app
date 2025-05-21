<template>
  <div class="space-y-2">
    <label class="block font-medium">Checklist</label>
    <div v-for="(item, index) in localList" :key="index" class="flex items-center gap-2">
      <input type="checkbox" v-model="item.checked" />
      <input type="text" v-model="item.text" class="border px-2 py-1 rounded w-full" />
      <button @click="remove(index)" class="text-red-500 text-sm">X</button>
    </div>
    <button @click="add" class="text-blue-500 text-sm mt-2">+ Add item</button>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'

const props = defineProps<{
  modelValue: Array<{ text: string; checked: boolean }>
}>()
const emit = defineEmits(['update:modelValue'])

const localList = ref([...props.modelValue])

watch(localList, () => {
  emit('update:modelValue', localList.value)
}, { deep: true })

function add() {
  localList.value.push({ text: '', checked: false })
}

function remove(index: number) {
  localList.value.splice(index, 1)
}
</script>
