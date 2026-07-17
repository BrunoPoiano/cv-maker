<template>
	<div
		:id="`core-skill-${props.core}`"
		:data-index="props.index"
		class="skills"
	>
		<div class="header-items">
			<div>
				<div data-drag-handle draggable="true">
					<SvgDrag />
				</div>
				<span>
					{{ core.replace('_', ' & ') }}
				</span>
			</div>
			<AppButton
				iconButton
				hover-background="var(--red)"
				@click="ProfilesStore.removeCoreSkill(curriculumIndex, core)"
			>
				<SvgTrash />
			</AppButton>
		</div>
		<AppTextarea
			:placeholder="props.core"
			v-model="skillsProxy[props.core]"
			@update:modelValue="onInput(props.core, $event)"
			minHeight="100px"
		/>
	</div>
</template>

<script setup lang="ts">
import { inject, onMounted, onUnmounted } from 'vue'

import { ProviderSkillKey } from '@/keys'
import { CurriculumIndexStore } from '@/stores/curriculumIndexStore'
import { ProfilesStore } from '@/stores/profileStore'
import SvgDrag from '@/svgs/svgDrag.vue'
import SvgTrash from '@/svgs/svgTrash.vue'
import AppButton from '@/ui/appButton.vue'
import AppTextarea from '@/ui/appTextarea.vue'
import { DragAndDrop } from '@/utilities/DragAndDrop'

type Props = {
	core: string
	index: number
}

const props = defineProps<Props>()
defineOptions({
	inheritAttrs: false
})

const { skillsProxy, onInput } = inject(ProviderSkillKey)!
const curriculumIndex = CurriculumIndexStore.get()

onMounted(() => {
	const controller = DragAndDrop({
		areaId: 'coreSkillsList',
		idPrefix: 'core-skill-',
		itemsList: [props.core],
		itemsClass: 'skills',
		action: (fromIndex, toIndex) =>
			ProfilesStore.moveCoreSkill(curriculumIndex.value, fromIndex, toIndex)
	})
	onUnmounted(() => controller.abort())
})
</script>

<style scoped>
@layer utilities {
	.skills {
		display: grid;
		gap: 0.8rem;
		background: var(--surface-container-low);
		padding: 0.8rem;
		border-radius: var(--border-radius);

		transition: background 500ms ease;

		&:hover {
			background: hsl(from var(--surface-container-low) h s calc(l - 2.75));
		}
		span {
			text-transform: capitalize;
		}
	}
}
.header-items {
	display: grid;
	grid-template-columns: 1fr auto;
	align-items: center;

	> div {
		display: flex;
		align-items: center;
		gap: 0.5ch;
	}
}
</style>
