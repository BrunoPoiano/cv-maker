<script setup lang="ts">
import { CurriculumConst } from '@/constants/curriculum'
import { saveDataToLocalStorage } from '@/helpers/localstorage'
import { BolderKey } from '@/main'
import type { Curriculum } from '@/types'
import Button from '@/ui/button.vue'
import Textarea from '@/ui/textarea.vue'
import Toggle from '@/ui/toggle.vue'
import { computed, inject, ref } from 'vue'
import Input from '../ui/input.vue'
import Modal from '../ui/modal.vue'

const bolderValue = inject<string[]>(BolderKey)!

const bolder = computed<string>({
	get() {
		return bolderValue.join(', ')
	},
	set(value: string) {
		const bolderSplit = value.split(',').map((item) => item.trim())

		Object.assign(bolderValue, bolderSplit)

		saveDataToLocalStorage('bolder', bolderSplit)
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
