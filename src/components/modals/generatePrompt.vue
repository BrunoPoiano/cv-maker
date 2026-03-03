<script setup lang="ts">
import { saveDataToLocalStorage } from '@/helpers/localstorage'
import { ProviderKey } from '@/main'
import Textarea from '@/ui/textarea.vue'
import { computed, inject, ref } from 'vue'
import Modal from '@/ui/modal.vue'
import Button from '@/ui/button.vue'

const jobDescription = ref('')

const prompt = computed(
	() => `

Fix Resume
Here is my current resume. [Attach resume]
Here is the job description:
[${jobDescription.value}]
Rewrite my resume to perfectly match:

> Incorporate exact keywords/phrases from job description
> Quantify achievements where possible
> Keep under 1 page, bullet format
> Highlight top 3–5 matches in a summary
> Match language of job description

Output: Full revised resume + list of changes made.
`
)

function copyPrompt() {
	navigator.clipboard.writeText(prompt.value.replace(/^\s*[\r\n]/gm, ''))
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
		<form>
			<Textarea placeholder="Job Description" v-model="jobDescription" />
		</form>
		<div class="prompt-preview">
			<pre ref="prompt">
				{{ prompt.replace(/^\s*[\r\n]/gm, '') }}
			</pre
			>
			<Button @click="copyPrompt">Copy Prompt</Button>
		</div>
	</Modal>
</template>

<style scoped>
form {
	display: grid;
	gap: 1rem;
}

.prompt-preview {
	display: grid;

	pre {
		margin-bottom: 0;
		max-height: 30ch;
	}
	button {
		place-self: end;
	}
}
</style>
