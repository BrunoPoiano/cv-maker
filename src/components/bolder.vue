<script setup lang="ts">
import Modal from '../ui/modal.vue'
import Input from '../ui/input.vue'
import { computed, inject, ref } from 'vue'
import type { Curriculum } from '@/types'
import { CurriculumConst } from '@/constants/curriculum'
import Textarea from '@/ui/textarea.vue'
import Button from '@/ui/button.vue'
import Toggle from '@/ui/toggle.vue'
import { BolderKey } from '@/main'
import { saveDataToLocalStorage } from '@/helpers/localstorage'

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
			<div class="header">
				<h4>Bolder Words</h4>
			</div>
		</template>
		<form>
			<Textarea placeholder="User Name" v-model="bolder" />
		</form>
	</Modal>
</template>

<style scoped>
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

form {
	display: grid;
	gap: 1rem;
}
</style>
