<script setup lang="ts">
import { computed, ref } from 'vue'

import { CurriculumStore } from '@/stores/curriculumStore'
import Button from '@/ui/appButton.vue'
import Modal from '@/ui/appModal.vue'
import AppSelect from '@/ui/appSelect.vue'
import Textarea from '@/ui/appTextarea.vue'

type Props = {
	id: string
}
const { id } = defineProps<Props>()

const jobDescription = ref('')
const curriculumSelected = ref(0)

const cvSelect = computed(() =>
	CurriculumStore.get().value.map((curriculum, index) => ({
		label: `${curriculum.Settings.language} - ${curriculum.Header.Role.value}`,
		value: index
	}))
)

const prompt = computed(
	() =>
		`Fix Resume
resume: [
${JSON.stringify(CurriculumStore.get().value[curriculumSelected.value])}
]

job description:[
${jobDescription.value.replace(/^\s*[\r\n]/gm, '')}
]

Rewrite resume to perfectly match job description:

> use the resume as template
> rephrase existing content to match job description and remove irrelevant info
> Incorporate exact keywords/phrases from job description
> Quantify achievements where possible
> Keep under 1 page, bullet format
> Highlight top 3–5 matches in a summary
> bullet point should be concise and impactful and incorporate exact keywords/phrases
> Add skills if necessary to match job description
> Match language of job description

Output: Full revised resume JSON + list of changes made.`
)

function copyPrompt() {
	navigator.clipboard.writeText(prompt.value).catch((err) => {
		console.error('Failed to copy prompt: ', err)
	})
}
</script>

<template>
	<Modal :id="id" closeLabel="close" minWidth="40rem" maxWidth="40ch">
		<template #header>
			<div class="header">
				<h3>Generate Prompt</h3>
				<AppSelect :items="cvSelect" v-model="curriculumSelected" />
			</div>
		</template>
		<div class="content">
			<Textarea placeholder="Job Description" v-model="jobDescription" />
			<div class="prompt-preview">
				<pre ref="prompt">
			{{ prompt }}
		</pre
				>
			</div>
			<Button @click="copyPrompt">Copy Prompt</Button>
		</div>
	</Modal>
</template>

<style scoped>
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.content {
	display: grid;
	gap: 1rem;

	.prompt-preview {
		display: grid;

		pre {
			margin-bottom: 0;
			max-height: 30ch;
		}
	}

	button {
		place-self: end;
	}
}
</style>
