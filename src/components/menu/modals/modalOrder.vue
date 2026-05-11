<script setup lang="ts">
import { inject } from 'vue'

import { ProviderKey } from '@/keys'
import { CurriculumIndexStore } from '@/stores/curriculumIndexStore'
import { CurriculumStore } from '@/stores/curriculumStore'
import SvgArrow from '@/svgs/svgArrow.vue'
import AppButton from '@/ui/appButton.vue'
import Modal from '@/ui/appModal.vue'
const { curriculum } = inject(ProviderKey)!

type Props = {
	id: string
}

const { id } = defineProps<Props>()
const curriculumIndex = CurriculumIndexStore.get()
</script>

<template>
	<Modal :id="id" closeLabel="close" minWidth="30rem" v-if="curriculum">
		<template #header>
			<h3>Curriculum Order</h3>
		</template>
		<div>
			<ul>
				<li v-for="(value, index) in curriculum.Settings.order" :key="value">
					<AppButton
						iconButton
						@click="
							CurriculumStore.moveSettingsOrder(
								curriculumIndex,
								index,
								index - 1
							)
						"
						:disabled="index === 0"
					>
						<SvgArrow direction="up" />
					</AppButton>
					<AppButton
						iconButton
						@click="
							CurriculumStore.moveSettingsOrder(
								curriculumIndex,
								index,
								index + 1
							)
						"
						:disabled="index === curriculum.Settings.order.length - 1"
					>
						<SvgArrow direction="down" />
					</AppButton>
					{{ value.replace(/([a-z])([A-Z])/g, '$1 $2') }}
				</li>
			</ul>
		</div>
	</Modal>
</template>

<style scoped>
li {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}
</style>
