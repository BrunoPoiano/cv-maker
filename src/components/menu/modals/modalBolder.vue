<script setup lang="ts">
import { computed, ref } from 'vue'

import { bolderStore } from '@/stores/bolderStore'
import Modal from '@/ui/appModal.vue'
import Textarea from '@/ui/appTextarea.vue'

type Props = {
	id: string
}

const { id } = defineProps<Props>()
const debouncedSave = ref<undefined | number>()

const bolderValue = bolderStore.get()

const bolder = computed<string>({
	get() {
		return bolderValue.join(', ')
	},
	set(value: string) {
		clearTimeout(debouncedSave.value)
		debouncedSave.value = setTimeout(() => {
			bolderStore.save(value.split(','))
		}, 500)
	}
})
</script>

<template>
	<Modal :id="id" closeLabel="close" minWidth="40rem">
		<template #header>
			<h3>Bolder Words</h3>
		</template>
		<form>
			<Textarea placeholder="User Name" v-model="bolder" />
		</form>
	</Modal>
</template>

<style scoped>
form {
	display: grid;
	gap: 1rem;
}
</style>
