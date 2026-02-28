<script setup lang="ts">
import Modal from '../ui/modal.vue'
import Select from '../ui/select.vue'
import { computed, inject, ref } from 'vue'
import type { Curriculum } from '@/types'
import { CurriculumConst } from '@/constants/curriculum'
import Textarea from '@/ui/textarea.vue'
import Button from '@/ui/button.vue'
import Toggle from '@/ui/toggle.vue'
import { CurriculumKey } from '@/main'
import { fontSizeSelect } from '@/constants/font-size'

const curriculum = inject<Curriculum>(CurriculumKey)!

const summary = ref(
	Array.isArray(curriculum?.Summary.value)
		? curriculum.Summary.value.join('\n')
		: curriculum?.Summary.value
)

const list = computed<boolean>({
	get() {
		return Array.isArray(curriculum.Summary.value)
	},
	set(value: boolean) {
		saveSummary(value)
	}
})

function saveSummary(list: boolean) {
	curriculum.Summary.value = list ? summary.value.split('\n') : summary.value
}
</script>

<template>
	<Modal
		buttonLabel="Sumarry"
		closeLabel="close"
		minWidth="40rem"
		v-if="curriculum"
	>
		<template #header>
			<div class="header">
				<h4>Summary</h4>
				<Toggle v-model="list" labelEnd="List" labelStart="Text" />
			</div>
		</template>
		<form>
			<Select
				label="size"
				:items="fontSizeSelect"
				v-model="curriculum.Summary.size"
			/>
			<Textarea
				placeholder="User Name"
				v-model="summary"
				:keyup="saveSummary(list)"
			/>
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
