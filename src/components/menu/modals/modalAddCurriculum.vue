<script setup lang="ts">
import { ref } from 'vue'

import { basicCurriculum } from '@/constants/basicCurriculum'
import { parseCurriculum } from '@/parsers/curriculum'
import { CurriculumStore } from '@/stores/curriculumStore'
import AppButton from '@/ui/appButton.vue'
import Modal from '@/ui/appModal.vue'
import AppTextarea from '@/ui/appTextarea.vue'

type Props = {
	id: string
}

const { id } = defineProps<Props>()

const newCv = ref(basicCurriculum)

function addCv() {
	try {
		const curriculumParsed = JSON.parse(newCv.value)
		const curriculum = parseCurriculum(curriculumParsed)
		CurriculumStore.add(curriculum)
		newCv.value = basicCurriculum
	} catch (e) {
		console.error('Invalid JSON', e)
		return
	}
}
</script>

<template>
	<Modal :id="id" closeLabel="close" minWidth="30rem">
		<template #header>
			<h3>JSON Curriculum</h3>
		</template>
		<form>
			<AppTextarea v-model="newCv" />
		</form>
		<div class="actions">
			<AppButton @click="addCv">Create</AppButton>
			<AppButton @click="newCv = basicCurriculum">Reset</AppButton>
		</div>
	</Modal>
</template>

<style scoped>
form {
	display: grid;
	gap: 1rem;
}

.actions {
	margin-top: 1rem;

	display: flex;
	justify-content: flex-end;
	gap: 1rem;
}
</style>
