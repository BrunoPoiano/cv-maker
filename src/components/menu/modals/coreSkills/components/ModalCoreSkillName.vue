<script setup lang="ts">
import { inject, ref } from 'vue'

import { ProviderKey } from '@/keys'
import { CurriculumStore } from '@/stores/curriculumStore'
import SvgNewDocument from '@/svgs/svgNewDocument.vue'
import AppButton from '@/ui/appButton.vue'
import AppInput from '@/ui/appInput.vue'
import AppModal from '@/ui/appModal.vue'

type Props = {
	id: string
}

const { id } = defineProps<Props>()
const { curriculumIndex } = inject(ProviderKey)!

const name = ref('')

function AddCoreSkill() {
	if (!name.value.trim()) {
		return
	}

	CurriculumStore.newCoreSkill(curriculumIndex, name.value)
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
form {
	display: flex;
	gap: 1rem;
	align-items: center;
}
</style>
