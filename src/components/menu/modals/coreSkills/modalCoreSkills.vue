<script setup lang="ts">
import { inject, ref } from 'vue'

import { ProviderKey, ProviderSkillKey } from '@/keys'
import Modal from '@/ui/appModal.vue'

import CoreSkillHeader from './components/coreSkillHeader.vue'
import CoreSkillInput from './components/coreSkillInput.vue'
import CoreSkillsOptions from './components/coreSkillsOptions.vue'
import ModalCoreSkillName from './components/modalCoreSkillName.vue'

type Props = {
	id: string
}

const { id } = defineProps<Props>()
const { skillsProxy } = inject(ProviderSkillKey)!
const { curriculum } = inject(ProviderKey)!
const ModalCoreSkillNameID = ref('modal-core-skill-name')
</script>

<template>
	<Modal :id="id" closeLabel="close" minWidth="40rem" v-if="curriculum">
		<template #header>
			<CoreSkillHeader :id="ModalCoreSkillNameID" />
		</template>
		<CoreSkillsOptions />
		<div class="coreSkillsList" id="coreSkillsList">
			<CoreSkillInput
				v-for="(_, core, index) in skillsProxy"
				:key="core"
				:index="index"
				:core="core"
			/>
		</div>
		<ModalCoreSkillName :id="ModalCoreSkillNameID" />
	</Modal>
</template>

<style scoped>
@layer utilities {
	.skills {
		display: grid;
		gap: 0.8rem;

		span {
			text-transform: capitalize;
		}
	}

	.coreSkillsList {
		display: grid;
		gap: 1rem;
	}

	.header {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
	}
}
</style>
