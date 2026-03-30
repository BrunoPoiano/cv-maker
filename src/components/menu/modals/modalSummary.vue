<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'

import { fontSizeSelect } from '@/constants/font-size'
import { ProviderKey } from '@/keys'
import AppInput from '@/ui/appInput.vue'
import Modal from '@/ui/appModal.vue'
import Select from '@/ui/appSelect.vue'
import AppSmall from '@/ui/appSmall.vue'
import Textarea from '@/ui/appTextarea.vue'
import Toggle from '@/ui/appToggle.vue'

const { curriculum } = inject(ProviderKey)!
type Props = {
	id: string
}
const { id } = defineProps<Props>()
const summary = ref('')

const list = computed<boolean>({
	get() {
		return Array.isArray(curriculum.value.Summary.value)
	},
	set(value: boolean) {
		saveSummary(value)
	}
})

watch(
	() => curriculum.value.Summary.value,
	(value) => {
		summary.value = Array.isArray(value) ? value.join('\n') : (value ?? '')
	},
	{ immediate: true }
)

function saveSummary(list: boolean) {
	curriculum.value.Summary.value = list
		? summary.value.split('\n').filter((item) => item !== '')
		: summary.value
}
</script>

<template>
	<Modal
		:id="id"
		buttonLabel="Summary"
		closeLabel="close"
		minWidth="40rem"
		v-if="curriculum"
	>
		<template #header>
			<div class="header">
				<h4>
					<AppInput
						type="checkbox"
						label="Summary"
						v-model="curriculum.Summary.show"
					/>
				</h4>
				<Toggle v-model="list" labelEnd="List" labelStart="Text" />
			</div>
			<AppSmall>{{
				list ? 'Items will be separeted by line breaks' : ''
			}}</AppSmall>
		</template>
		<form>
			<Select
				label="Font Size"
				:items="fontSizeSelect"
				v-model="curriculum.Summary.size"
			/>

			<Textarea
				rows="6"
				placeholder="Small Text"
				v-model="curriculum.Summary.smallText"
			/>

			<Textarea
				placeholder="Summary"
				v-model="summary"
				@keyup="saveSummary(list)"
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
