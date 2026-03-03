<script setup lang="ts">
import { saveDataToLocalStorage } from '@/helpers/localstorage'
import { ProviderKey } from '@/main'
import Textarea from '@/ui/appTextarea.vue'
import { computed, inject } from 'vue'
import Modal from '@/ui/appModal.vue'

const { bolder: bolderValue } = inject(ProviderKey)!

const bolder = computed<string>({
	get() {
		return bolderValue.join(', ')
	},
	set(value: string) {
		const bolderSplit = value.split(',').map((item) => item.trim())

		Object.assign(bolderValue, bolderSplit)

		saveDataToLocalStorage({ key: 'bolder', initialValue: bolderSplit })
	}
})
</script>

<template>
	<Modal buttonLabel="Bolder Words" closeLabel="close" minWidth="40rem">
		<template #header>
			<h4>Bolder Words</h4>
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
