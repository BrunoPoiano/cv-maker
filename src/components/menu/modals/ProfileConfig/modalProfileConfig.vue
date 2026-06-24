<script setup lang="ts">
import { computed } from 'vue'

import { ProfilesStore } from '@/stores/profileStore'
import SvgNewDocument from '@/svgs/svgNewDocument.vue'
import AppButton from '@/ui/appButton.vue'
import AppModal from '@/ui/appModal.vue'
import AppTable from '@/ui/appTable.vue'

import ModalProfileForm from './components/ModalProfileForm.vue'
import TableActions from './components/tableActions.vue'

const profiles = ProfilesStore.get()

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
			<h3>Profile Config</h3>
			<AppButton modal id="modalProfileForm"><SvgNewDocument /></AppButton>
			<ModalProfileForm id="modalProfileForm" />
		</template>

		<AppTable
			:content="tableProfiled"
			:header="['id', 'name', 'curriculums', 'actions']"
		/>
	</AppModal>
</template>

<style scoped>
@layer utilities {
}
</style>
