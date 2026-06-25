<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'

import { ProfileIndexStore } from '@/stores/profileIndexStore'
import { ProfilesStore } from '@/stores/profileStore'
import SvgNewDocument from '@/svgs/svgNewDocument.vue'
import AppButton from '@/ui/appButton.vue'
import AppModal from '@/ui/appModal.vue'
import AppTable from '@/ui/appTable.vue'

import TableActions from './components/tableActions.vue'

const ModalProfileForm = defineAsyncComponent(
	() => import('./components/ModalProfileForm.vue')
)

const profiles = ProfilesStore.get()
const profileIndex = ProfileIndexStore.get()

const tableProfiled = computed(() => {
	return profiles.value.map((item, index) => {
		return {
			...item,
			curriculums: item.curriculums.length,
			actions: {
				component: TableActions,
				props: { index: index }
			}
		}
	})
})
</script>

<template>
	<AppModal
		id="modalProfileConfig"
		closeLabel="close"
		minWidth="20rem"
		maxWidth="min(80ch,100%)"
	>
		<template #header>
			<div class="header">
				<h3>Profile Config</h3>
				<AppButton iconButton modal id="modalProfileForm"
					><SvgNewDocument
				/></AppButton>
			</div>
		</template>

		<AppTable
			:bolder="(item: number) => item === profileIndex"
			:content="tableProfiled"
			:header="['id', 'name', 'curriculums', 'actions']"
		/>
		<ModalProfileForm id="modalProfileForm" />
	</AppModal>
</template>

<style scoped>
@layer utilities {
	.header {
		display: flex;
		gap: 1rem;
		align-items: center;
		justify-content: space-between;
	}
}
</style>
