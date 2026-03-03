<script setup lang="ts">
import { fontSizeSelect } from '@/constants/font-size'
import { ProviderKey } from '@/main'
import type { Curriculum } from '@/types'
import Modal from '@/ui/modal.vue'
import Select from '@/ui/select.vue'
import Textarea from '@/ui/textarea.vue'
import Toggle from '@/ui/toggle.vue'
import { computed, inject, ref } from 'vue'

const { curriculum } = inject(ProviderKey)!

const summary = ref(
	Array.isArray(curriculum.value.Summary.value)
		? curriculum.value.Summary.value.join('\n')
		: curriculum.value.Summary.value
)

const list = computed<boolean>({
	get() {
		return Array.isArray(curriculum.value.Summary.value)
	},
	set(value: boolean) {
		saveSummary(value)
	}
})

function saveSummary(list: boolean) {
	curriculum.value.Summary.value = list
		? summary.value.split('\n')
		: summary.value
}
</script>

<template>
	<Modal
		buttonLabel="Summary"
		closeLabel="close"
		minWidth="40rem"
		buttonIcon="/svgs/pen.svg"
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
