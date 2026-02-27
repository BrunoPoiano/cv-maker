<script setup lang="ts">
import Modal from '../ui/modal.vue'
import Input from '../ui/input.vue'
import { computed, inject, ref } from 'vue'
import type { Curriculum } from '@/types'
import { CurriculumConst } from '@/constants/curriculum'
import Textarea from '@/ui/textarea.vue'
import Button from '@/ui/button.vue'
import Toggle from '@/ui/toggle.vue'
import { CurriculumKey } from '@/main'

const curriculum = inject<Curriculum>(CurriculumKey)!
const list = ref(Array.isArray(curriculum.Summary))

const summary = ref(
	Array.isArray(curriculum?.Summary)
		? curriculum.Summary.join(' \n')
		: curriculum?.Summary
)

function saveSummary() {
	console.log('Saving:', summary.value) // Add this to debug
	curriculum.Summary = list.value ? summary.value.split('\n') : summary.value
	console.log('After save, curriculum.Summary:', curriculum.Summary) // And this
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
			<h4>CV Summary {{ list }}</h4>
		</template>
		<form>
			<Toggle v-model="list" labelEnd="List" labelStart="Text" />
			<Textarea label="User Name" placeholder="User Name" v-model="summary" />
			<p>{{ Array.isArray(curriculum.Summary) }}</p>
		</form>
		<template #footer>
			<Button command="show-modal" label="save" @click="saveSummary" />
		</template>
	</Modal>
</template>

<style scoped>
form {
	display: grid;
	gap: 1rem;
}
</style>
