<script setup lang="ts">
import { inject } from 'vue'

import { fontSizeSelect } from '@/constants/font-size'
import { ProviderKey, ProviderSkillKey } from '@/keys'
import AppInput from '@/ui/appInput.vue'
import Modal from '@/ui/appModal.vue'
import Select from '@/ui/appSelect.vue'
import AppSmall from '@/ui/appSmall.vue'
import Textarea from '@/ui/appTextarea.vue'

type Props = {
	id: string
}

const { id } = defineProps<Props>()
const { skillsProxy, onInput } = inject(ProviderSkillKey)!
const { curriculum } = inject(ProviderKey)!
</script>

<template>
	<Modal :id="id" closeLabel="close" minWidth="40rem" v-if="curriculum">
		<template #header>
			<div class="header">
				<h4>
					<AppInput
						type="checkbox"
						label="Core Skills"
						v-model="curriculum.CoreSkills.show"
					/>
				</h4>
				<AppSmall>Items will be separeted by commas (,)</AppSmall>
			</div>
		</template>
		<form>
			<Select
				label="Font Size"
				:items="fontSizeSelect"
				v-model="curriculum.CoreSkills.size"
			/>
			<div v-for="(_, core) in skillsProxy" class="skills" :key="core">
				<span>{{ core.replace('_', ' & ') }}</span>
				<Textarea
					placeholder="User Name"
					v-model="skillsProxy[core]"
					@update:modelValue="onInput(core, $event)"
					minHeight="100px"
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
