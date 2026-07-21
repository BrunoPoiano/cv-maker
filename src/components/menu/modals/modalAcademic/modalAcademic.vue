<script setup lang="ts">
import { inject } from 'vue'

import { ProviderKey } from '@/keys'
import Modal from '@/ui/appModal.vue'

import AcademicForm from './components/academicForm.vue'
import AcademicHeader from './components/academicHeader.vue'
import AcademicOptions from './components/academicOptions.vue'

type Props = {
	id: string
}

const { id } = defineProps<Props>()
const { curriculum } = inject(ProviderKey)!
</script>

<template>
	<Modal :id="id" closeLabel="close" minWidth="50rem">
		<template #header>
			<AcademicHeader />
		</template>
		<form>
			<AcademicOptions />
			<div id="academicList">
				<template v-for="(_, index) in curriculum.AcademicBackground.value">
					<AcademicForm
						v-if="curriculum.AcademicBackground.value[index]"
						:key="curriculum.AcademicBackground.value[index].id"
						v-model="curriculum.AcademicBackground.value[index]"
						:index="index"
					/>
				</template>
			</div>
		</form>
	</Modal>
</template>

<style scoped>
@layer utilities {
	form {
		display: grid;
		gap: 1rem;

		#academicList {
			display: grid;
			gap: 1rem;
		}
	}
}
</style>
