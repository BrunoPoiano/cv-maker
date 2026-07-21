<script setup lang="ts">
import { CurriculumIndexStore } from '@/stores/curriculumIndexStore'
import { ProfilesStore } from '@/stores/profileStore'
import SvgTrash from '@/svgs/svgTrash.vue'
import type { Experience } from '@/types'
import AppButton from '@/ui/appButton.vue'
import AppInput from '@/ui/appInput.vue'

import ExDateInput from './exDateInput.vue'
import ExDescription from './exDescription.vue'

type Props = {
	list: boolean
}

const props = defineProps<Props>()
const job = defineModel<Experience['value'][0]>({ required: true })
const curriculumIndex = CurriculumIndexStore.get()
</script>

<template>
	<div class="job">
		<div>
			<AppInput type="checkbox" label="Remote" v-model="job.Remote" />
			<AppButton
				icon-button
				@click="ProfilesStore.deleteExperience(curriculumIndex, job.id)"
				hover-background="var(--red)"
				title="Delete Experience"
			>
				<SvgTrash />
			</AppButton>
		</div>
		<div>
			<AppInput
				type="text"
				label="Company Name"
				placeholder="Company Name"
				v-model="job.CompanyName"
			/>
			<AppInput
				type="text"
				label="Role"
				placeholder="Role"
				v-model="job.Role"
			/>
		</div>
		<div>
			<ExDateInput
				type="date"
				label="Start Date"
				placeholder="Start Date"
				v-model="job.StartDate"
			/>
			<ExDateInput
				type="date"
				label="End Date"
				placeholder="EndDate"
				v-model="job.EndDate"
			/>
		</div>

		<div class="desc">
			<ExDescription
				:list="props.list"
				label="Description"
				placeholder="Description"
				v-model="job.Description"
			/>
		</div>
	</div>
</template>
<style scoped>
@layer utilities {
	.job {
		display: grid;
		gap: 0.8rem;
		background: var(--surface-container-low);

		padding: 0.8rem;
		border-radius: var(--border-radius);

		transition: background 500ms ease;

		> div:not(.desc) {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 0.8rem;
		}

		> div:has(button) button {
			justify-self: end;
		}

		.desc {
			grid-column: 1 / -1;
		}

		&:hover {
			background: hsl(from var(--surface-container-low) h s calc(l - 2.75));
		}
	}
}
</style>
