<script setup lang="ts">
import { ref } from 'vue'

import { CurriculumIndexStore } from '@/stores/curriculumIndexStore'
import { ProfilesStore } from '@/stores/profileStore'
import SvgNewDocument from '@/svgs/svgNewDocument.vue'
import AppButton from '@/ui/appButton.vue'
import AppInput from '@/ui/appInput.vue'
import AppModal from '@/ui/appModal.vue'

type Props = {
	id: string
}

const { id } = defineProps<Props>()
const curriculumIndex = CurriculumIndexStore.get()
const name = ref('')

function AddCoreSkill() {
	if (!name.value.trim()) {
		return
	}

	ProfilesStore.newCoreSkill(curriculumIndex.value, name.value)
	name.value = ''
}
</script>

<template>
	<AppModal :id="id" closeLabel="close">
		<template #header>
			<div class="header">
				<h3>New Core Skill</h3>
			</div>
		</template>
		<form @submit.prevent="AddCoreSkill">
			<AppInput placeholder="Core Skill Name" v-model="name" />
			<AppButton iconButton @click="AddCoreSkill" :disabled="!name.trim()">
				<SvgNewDocument />
			</AppButton>
		</form>
	</AppModal>
</template>

<style scoped>
@layer utilities {
	form {
		display: flex;
		gap: 1rem;
		align-items: center;
	}
}
</style>
