<script setup lang="ts">
import type { Curriculum } from '@/types'
import Modal from '../ui/modal.vue'
import Input from '../ui/input.vue'
const { curriculum } = defineProps<{ curriculum: Curriculum }>()
</script>

<template>
  <Modal buttonLabel="Contact" closeLabel="close">
    <template #header>
      <h2>Contact</h2>
    </template>
    <form>
      <Input label="email" type="email" placeholder="email" v-model="curriculum.Contact.email" />
      <Input
        type="text"
        label="linkedin"
        placeholder="linkedin"
        v-model="curriculum.Contact.linkedin"
      />
      <Input type="text" label="github" placeholder="github" v-model="curriculum.Contact.github" />
    </form>
  </Modal>
</template>

<style scoped>
form {
  display: grid;
  gap: 1rem;
}
</style>
