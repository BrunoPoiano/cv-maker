<script setup lang="ts">
import { fontSizeSelect } from '@/constants/font-size'
import { ProviderKey } from '@/keys'
import { inject, ref } from 'vue'
import Modal from '@/ui/appModal.vue'
import Select from '@/ui/appSelect.vue'
import Description from './components/exDescription.vue'
import DateInput from './components/exDateInput.vue'
import Button from '@/ui/appButton.vue'
import { generateKey } from '@/helpers/generateKey'
import AppToggle from '@/ui/appToggle.vue'
import AppInput from '@/ui/appInput.vue'
import { monthOptionsSelect } from '@/constants/monthOptions'
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
</script>

<template>
	<Modal
		buttonLabel="Experience"
		closeLabel="close"
		minWidth="40rem"
		v-if="curriculum"
		buttonIcon="/svgs/pen.svg"
	>
		<template #header>
			<div class="modalHeader">
				<h4>
					<AppInput
						type="checkbox"
						label="Experience"
						v-model="curriculum.Experience.show"
					/>
				</h4>
				<AppToggle
					style="place-self: end"
					v-model="list"
					labelEnd="List"
					labelStart="Text"
				/>
				<Button @click="newExperience">New</Button>
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
				<div>
					<AppInput type="checkbox" label="Remote" v-model="job.Remote" />
				</div>
			</div>
		</form>
	</Modal>
</template>

<style scoped>
.modalHeader {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 0.8rem;

	button {
		grid-area: 2 / 2;
		place-self: end;
	}
}

form {
	display: grid;
	gap: 1rem;

	.size {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 0.8rem;
	}

	.job {
		display: grid;
		gap: 0.8rem;
		background: var(--background);

		padding: 0.5rem;
		border-radius: 10px;

		> div:not(.desc) {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 0.8rem;
		}

		.desc {
			grid-column: 1 / -1;
		}
	}
}
</style>
