<script setup lang="ts">
import type { Curriculum } from '@/types'
import Modal from '../ui/modal.vue'
import Input from '../ui/input.vue'
const { curriculum } = defineProps<{ curriculum: Curriculum }>()
</script>

<template>
  <Modal buttonLabel="Header" closeLabel="close">
    <template #header>
      <h2>CV Header</h2>
    </template>
    <form>
      <Input
        type="text"
        label="User Name"
        placeholder="User Name"
        v-model="curriculum.Header.UserName"
      />
      <Input type="text" label="label" placeholder="Label" v-model="curriculum.Header.Label" />
    </form>
  </Modal>
</template>

<style scoped>
form {
  display: grid;
  gap: 1rem;
}
</style>
