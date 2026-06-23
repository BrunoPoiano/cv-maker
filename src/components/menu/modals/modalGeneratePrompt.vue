<script setup lang="ts">
import { computed, ref } from 'vue'

import { curriculumOnlyValue } from '@/helpers/cvFormatters'
import { ProfilesStore } from '@/stores/profileStore'
import Button from '@/ui/appButton.vue'
import AppInput from '@/ui/appInput.vue'
import Modal from '@/ui/appModal.vue'
import AppSelect from '@/ui/appSelect.vue'
import Textarea from '@/ui/appTextarea.vue'

const { id } = defineProps<{
	id: string
}>()

const jobDescription = ref('')
const curriculumSelected = ref(0)
const promptFullCv = ref(false)

const cvSelect = computed(() =>
	ProfilesStore.getCurriculums().map((curriculum, index) => ({
		label: `${curriculum.Settings.language} - ${curriculum.Header.Role.value}`,
		value: index
	}))
)

const curriculumParsed = computed(() => {
	const cv = ProfilesStore.getCurriculums()[curriculumSelected.value]
	if (!cv) {
		return null
	}

	if (promptFullCv.value) {
		return JSON.stringify(cv)
	}

	return JSON.stringify(curriculumOnlyValue(cv))
})

const prompt = computed(
	() =>
		`
System Instruction: You are an ATS optimization engine specialized in resume rewriting. Your task is to transform an existing resume into a version that maximizes keyword alignment, semantic relevance, and parsing success for Applicant Tracking Systems (ATS), strictly based on a provided JOB DESCRIPTION.

TASK: Rewrite and optimize a resume to match a target JOB DESCRIPTION with maximum ATS compatibility.

INPUTS:
1. RESUME (source of truth — do not fabricate experience):
[${curriculumParsed.value}]

2. JOB DESCRIPTION (target for optimization):
[${jobDescription.value.replace(/^\s*[\r\n]/gm, '')}]

CONSTRAINTS:
- Do NOT invent roles, companies, dates, or achievements.
- You MAY rephrase, reorder, and emphasize existing experience.
- You MAY add missing skills ONLY if they are strongly implied by the resume.
- Maintain factual consistency with the original resume.

OPTIMIZATION RULES:
1. KEYWORD EXTRACTION
   - Extract and rank keywords from the JOB DESCRIPTION, prioritizing:
     a. Hard skills (languages, frameworks, tools)
     b. Soft skills
     c. Domain-specific terms
   - Prioritize exact phrase matching over synonyms.

2. CONTENT ALIGNMENT
   - Rewrite bullet points to directly reflect JOB DESCRIPTION responsibilities.
   - Replace generic phrasing with role-specific, keyword-rich language.
   - Remove irrelevant or low-signal content.

3. ACHIEVEMENT REWRITING
   - Convert responsibilities into measurable achievements where possible.
   - Use metrics (%, $, time, scale) if present or inferable without fabrication.

4. STRUCTURE
   - Maintain RESUME JSON structure consistency.
   - Use concise bullet points.
   - Ensure standard ATS-readable sections - use RESUME JSON as template

5. SUMMARY SECTION
   - Create a 4–7 bullet summary highlighting strongest matches to the job.
   - Each bullet must include at least one exact keyword/phrase from the JOB DESCRIPTION.

6. SKILLS SECTION
   - Reorder skills to prioritize job-relevant ones.
   - Inject missing high-priority keywords if justified by experience.
   - Add skills headers if necessary to match JOB DESCRIPTION, but only if they are strongly implied by the resume content.

7. LANGUAGE MATCHING
   - Mirror idiom, language, tone and terminology of the JOB DESCRIPTION.

ATS-SPECIFIC RULES:
- Avoid tables, icons, or non-standard formatting.
- Use standard section headers.
- Avoid abbreviations unless also written in full at least once.
- Ensure keyword density without keyword stuffing.

OUTPUT:
  revised resume JSON
  changes made: Bullet describing each significant change,Keyword additions,Removed content,Rewritten achievements
  keyword coverage: matched - list of matched keywords, missing - important keywords not represented
`
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
			</div>
		</template>
		<div class="options">
			<AppSelect :items="cvSelect" v-model="curriculumSelected" />
			<AppInput
				type="checkbox"
				label="Full Curriculum"
				v-model="promptFullCv"
			/>
		</div>
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
@layer utilities {
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.options {
		display: flex;
		gap: 1rem;
		align-items: center;
		margin-bottom: 1rem;
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
}
</style>
