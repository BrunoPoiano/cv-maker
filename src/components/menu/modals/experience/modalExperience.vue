<script setup lang="ts">
import { inject, ref } from 'vue'

import { fontSizeSelect } from '@/constants/font-size'
import { monthOptionsSelect } from '@/constants/monthOptions'
import { generateKey } from '@/helpers/generateKey'
import { ProviderKey } from '@/keys'
import SvgNewDocument from '@/svgs/svgNewDocument.vue'
import SvgTrash from '@/svgs/svgTrash.vue'
import Button from '@/ui/appButton.vue'
import AppInput from '@/ui/appInput.vue'
import Modal from '@/ui/appModal.vue'
import Select from '@/ui/appSelect.vue'
import AppSmall from '@/ui/appSmall.vue'
import AppToggle from '@/ui/appToggle.vue'

import DateInput from './components/exDateInput.vue'
import Description from './components/exDescription.vue'

type Props = {
	id: string
}

const { id } = defineProps<Props>()

const { curriculum } = inject(ProviderKey)!

const list = ref(
	Array.isArray(curriculum.value.Experience.value[0]?.Description)
)

function newExperience() {
	curriculum.value.Experience.value.unshift({
		id: generateKey(),
		CompanyName: '',
		Role: '',
		StartDate: new Date(),
		EndDate: null,
		Description: '',
		Remote: false
	})
}

function deleteExperience(id: string) {
	curriculum.value.Experience.value = curriculum.value.Experience.value.filter(
		(item) => item.id !== id
	)
}
</script>

<template>
	<Modal :id="id" buttonLabel="Experience" closeLabel="close" minWidth="50rem">
		<template #header>
			<div class="modalHeader">
				<h3>
					<AppInput
						type="checkbox"
						label="Experience"
						v-model="curriculum.Experience.show"
					/>
					<AppSmall>{{
						list ? 'Items will be separeted by line breaks' : ''
					}}</AppSmall>
				</h3>
				<Button icon-button @click="newExperience" title="New Experience">
					<SvgNewDocument />
				</Button>
				<AppInput
					divStyle="align-self: center"
					type="checkbox"
					label="Side by Side"
					v-model="curriculum.Experience.sideBySide"
				/>
				<AppToggle
					style="place-self: end"
					v-model="list"
					labelEnd="List"
					labelStart="Text"
				/>
			</div>
		</template>
		<form>
			<div class="size">
				<Select
					label="Title"
					:items="fontSizeSelect"
					v-model="curriculum.Experience.size.title"
				/>
				<Select
					v-if="!curriculum.Experience.sideBySide"
					label="Subtitle"
					:items="fontSizeSelect"
					v-model="curriculum.Experience.size.subTitle"
				/>
				<Select
					label="Description"
					:items="fontSizeSelect"
					v-model="curriculum.Experience.size.description"
				/>
				<Select
					label="Month"
					:items="monthOptionsSelect"
					v-model="curriculum.Experience.dateMonth"
				/>
			</div>

			<div v-for="job in curriculum.Experience.value" class="job" :key="job.id">
				<div>
					<AppInput type="checkbox" label="Remote" v-model="job.Remote" />
					<Button
						icon-button
						@click="deleteExperience(job.id)"
						hover-background="var(--red)"
						title="Delete Experience"
					>
						<SvgTrash />
					</Button>
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
					<DateInput
						type="date"
						label="Start Date"
						placeholder="Start Date"
						v-model="job.StartDate"
					/>
					<DateInput
						type="date"
						label="End Date"
						placeholder="EndDate"
						v-model="job.EndDate"
					/>
				</div>

				<div class="desc">
					<Description
						:list="list"
						label="Description"
						placeholder="Description"
						v-model="job.Description"
					/>
				</div>
			</div>
		</form>
	</Modal>
</template>

<style scoped>
.modalHeader {
	display: grid;
	grid-template-columns: 1fr 1fr;
	align-items: center;
	gap: 0.8rem;

	button {
		place-self: end;
		align-self: start;
	}

	&:deep(.toggle) {
		grid-area: 2/2;
	}
}

form {
	display: grid;
	gap: 1rem;

	.size {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		gap: 0.8rem;
	}

	.job {
		display: grid;
		gap: 0.8rem;
		background: var(--surface-container-low);

		padding: 0.8rem;
		border-radius: var(--border-radius);

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
	}
}
</style>
