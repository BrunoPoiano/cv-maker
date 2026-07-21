<script setup lang="ts">
import { inject, ref } from 'vue'

import { ProviderKey } from '@/keys'
import Modal from '@/ui/appModal.vue'

import ExperienceForm from './components/experienceForm.vue'
import ExperienceHeader from './components/experienceHeader.vue'
import ExperienceOptions from './components/experienceOptions.vue'

type Props = {
	id: string
}

const { id } = defineProps<Props>()
const { curriculum } = inject(ProviderKey)!
const list = ref(
	Array.isArray(curriculum.value.Experience.value[0]?.Description)
)

function closeModal() {
	curriculum.value.Experience.value.sort((cv1, cv2) => {
		if (cv2.StartDate && cv1.StartDate) {
			return cv2.StartDate.year - cv1.StartDate.year
		}
		return 1
	})
}
</script>

<template>
	<Modal
		:id="id"
		closeLabel="close"
		:close-action="closeModal"
		minWidth="50rem"
	>
		<template #header> <ExperienceHeader :list="list" /> </template>
		<form>
			<ExperienceOptions v-model="list" />
			<template
				v-for="(job, index) in curriculum.Experience.value"
				:key="job.id"
			>
				<ExperienceForm
					v-if="curriculum.Experience.value[index]"
					v-model="curriculum.Experience.value[index]"
					:list="list"
				/>
			</template>
		</form>
	</Modal>
</template>

<style scoped>
@layer utilities {
	form {
		display: grid;
		gap: 1rem;
	}
}
</style>
