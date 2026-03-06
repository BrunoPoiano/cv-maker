<script setup lang="ts">
import Textarea from '@/ui/appTextarea.vue'
import { computed, ref } from 'vue'
import Modal from '@/ui/appModal.vue'
import Button from '@/ui/appButton.vue'

const jobDescription = ref('')

const prompt = computed(
	() =>
		`Fix Resume
Here is my current resume. [Attach resume]
Here is the job description:
[${jobDescription.value.replace(/^\s*[\r\n]/gm, '')}]
Rewrite my resume to perfectly match:

> use attached resume as template
> rephrase existing content to match job description and remove irrelevant info
> Incorporate exact keywords/phrases from job description
> Quantify achievements where possible
> Keep under 1 page, bullet format
> Highlight top 3–5 matches in a summary
> bullet point should be 100ch max, concise and impactful
> Match language of job description

Output: Full revised resume + list of changes made.`
)

function copyPrompt() {
	navigator.clipboard.writeText(prompt.value).catch((err) => {
		console.error('Failed to copy prompt: ', err)
	})
}
</script>

<template>
	<Modal
		buttonLabel="Generate Prompt"
		closeLabel="close"
		minWidth="40rem"
		maxWidth="40ch"
	>
		<template #header>
			<h4>Generate Prompt</h4>
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
