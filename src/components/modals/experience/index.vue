<script setup lang="ts">
import { fontSizeSelect } from '@/constants/font-size'
import {  ProviderKey } from '@/main'
import type { Curriculum, Experience } from '@/types'
import { computed, inject, ref } from 'vue'
import Input from '@/ui/input.vue'
import Modal from '@/ui/modal.vue'
import Select from '@/ui/select.vue'
import Textarea from '@/ui/textarea.vue'
import Toggle from '@/ui/toggle.vue'
import Description from './components/description.vue'
import DateInput from './components/dateInput.vue'
import Button from '@/ui/button.vue'
import { generateKey } from '@/helpers/generateKey'
	const { curriculum } = inject(ProviderKey)!

const list = ref(Array.isArray(curriculum.Experience.value[0]?.Description))


function newExperience() {
	curriculum.Experience.value.unshift({
		id: generateKey(),
		CompanyName: '',
		Role: '',
		StartDate: new Date(),
		EndDate: null,
		Description: ''
	})
}
</script>

<template>
	<Modal buttonLabel="Experience" closeLabel="close" minWidth="40rem" v-if="curriculum">
		<template #header>
			<h4>Experience</h4>
			<Toggle v-model="list" labelEnd="List" labelStart="Text" />
			<Button label="New" @click="newExperience" />

		</template>
		<form>
			<div class="size">
				<Select label="title" :items="fontSizeSelect" v-model="curriculum.Experience.size.title" />
				<Select label="Description" :items="fontSizeSelect" v-model="curriculum.Experience.size.description" />
			</div>

			<div v-for="(job) in curriculum.Experience.value" class="job" :key="job.id">
				<div>
					<Input type="text" label="Company Name" placeholder="Company Name" v-model="job.CompanyName" />
					<Input type="text" label="Label" placeholder="Label" v-model="job.Role" />
				</div>
				<div>
					<DateInput type="date" label="Start Date" placeholder="Start Date" v-model="job.StartDate" />
					<DateInput type="date" label="End Date" placeholder="EndDate" v-model="job.EndDate" />
				</div>
				<div class="desc">
					<Description :list="list" label="Description" placeholder="Description" v-model="job.Description" />
				</div>
			</div>
		</form>
	</Modal>
</template>

<style scoped>
form {
	display: grid;
	gap: 1rem;

	.size {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: .8rem;

	}

	.job {
		display: grid;
		gap: .8rem;
		background: var(--background);

		padding: 0.5rem;
		border-radius: 10px;

		>div:not(.desc) {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: .8rem;
		}

		.desc {
			grid-column: 1 / -1;
		}
	}
}
</style>
