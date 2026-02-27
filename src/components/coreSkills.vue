<script setup lang="ts">
import Modal from '../ui/modal.vue'
import Input from '../ui/input.vue'
import { computed, inject, ref } from 'vue'
import {
	skillList,
	type CoreSkills,
	type Curriculum,
	type Skills
} from '@/types'
import { CurriculumConst } from '@/constants/curriculum'
import Textarea from '@/ui/textarea.vue'
import Button from '@/ui/button.vue'
import Toggle from '@/ui/toggle.vue'
import { CurriculumKey } from '@/main'
import { isOneOf } from '@/parsers/typeValidation'

const curriculum = inject<Curriculum>(CurriculumKey)!

type SkillList = Partial<Record<keyof CoreSkills, string>>

const coreSkills = ref(
	skillList.reduce<SkillList>((acc, item) => {
		const skill = item.toLowerCase() as Skills
		if (curriculum.CoreSkills[skill]) {
			acc[skill] = curriculum.CoreSkills[skill].join(', ')
		} else {
			acc[skill] = ''
		}
		return acc
	}, {})
)

function saveSkill(core: Skills) {
	if (coreSkills.value[core] === '') {
		delete curriculum.CoreSkills[core]
	} else {
		curriculum.CoreSkills[core] = coreSkills.value[core]?.split(',')
	}
}
</script>

<template>
	<Modal
		buttonLabel="CoreSkills"
		closeLabel="close"
		minWidth="40rem"
		v-if="curriculum"
	>
		<template #header>
			<div class="header">
				<h4>Core Skills</h4>
			</div>
		</template>
		<form>
			<div v-for="(_, core) in coreSkills" class="skills">
				<span>{{ core }}</span>
				<Textarea
					placeholder="User Name"
					v-model="coreSkills[core] as string"
					minHeight="100px"
					:change="saveSkill(core)"
				/>
			</div>
		</form>
	</Modal>
</template>

<style scoped>
.skills {
	display: grid;
	gap: 0.8rem;
	span {
		text-transform: capitalize;
	}
}
form {
	display: grid;
	gap: 1rem;
}
</style>
