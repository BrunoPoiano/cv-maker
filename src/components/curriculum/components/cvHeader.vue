<script setup lang="ts">
import { inject } from 'vue'

import { ProviderKey } from '@/keys'
import { ReadonlyStore } from '@/stores/readonlyStore'
import SvgDrag from '@/svgs/svgDrag.vue'
import SvgPen from '@/svgs/SvgPen.vue'
import AppAnchor from '@/ui/appAnchor.vue'
import AppButton from '@/ui/appButton.vue'
import AppInput from '@/ui/appInput.vue'

const readonly = ReadonlyStore.get()

const { curriculum } = inject(ProviderKey)!
</script>

<template>
	<AppAnchor>
		<div class="header">
			<template v-if="readonly">
				<h1
					:style="{
						'--font_size': `var(${curriculum.Header.UserName.size})`,
						textAlign: curriculum.Header.UserName.align
					}"
				>
					{{ curriculum.Header.UserName.value }}
				</h1>
				<span
					:style="{
						'--font_size': `var(${curriculum.Header.Role.size})`,
						textAlign: curriculum.Header.Role.align
					}"
					class="label"
				>
					{{ curriculum.Header.Role.value }}
				</span>
			</template>
			<template v-else>
				<div data-drag-handle draggable="true">
					<SvgDrag />
				</div>
				<h1
					:style="{ '--font_size': `var(${curriculum.Header.UserName.size})` }"
				>
					<AppInput
						cv-input
						v-model="curriculum.Header.UserName.value"
						:readonly="readonly"
					/>
				</h1>
				<span
					:style="{ '--font_size': `var(${curriculum.Header.Role.size})` }"
					class="label"
				>
					<AppInput
						cv-input
						v-model="curriculum.Header.Role.value"
						:readonly="readonly"
					/>
				</span>
			</template>
		</div>
		<template #button>
			<AppButton icon-button modal id="modalCvHeader">
				<SvgPen />
			</AppButton>
		</template>
	</AppAnchor>
</template>

<style scoped>
@layer utilities {
	.header {
		h1,
		h1:deep(input) {
			padding: 0px;
			margin: 0px;
			margin-bottom: calc(var(--_a4-gap) * 0.5);
			font-size: var(--font_size, var(--font-size-xxxl));
			text-transform: uppercase;
			letter-spacing: 0.03em;
			font-weight: var(--font-weight);
			line-height: 1.3;
		}

		.label,
		.label:deep(input) {
			display: block;

			color: var(--on-surface-variant);

			font-size: var(--font_size, var(--font-size-lg));
			font-weight: var(--font-weight);
			letter-spacing: 0.099em;
			line-height: 1.2;
			text-transform: uppercase;
			text-box-trim: trim-both;
			text-box-edge: cap alphabetic;
		}
	}

	.header:has(svg) {
		display: grid;
		grid-template-columns: auto 1fr;

		svg {
			grid-area: 1/1;
		}
		h1 {
			grid-area: 1/2;
		}
		span {
			grid-area: 2 / span 2;
		}
	}

	@supports not (text-box-edge: cap alphabetic) {
		.header h1 {
			margin-bottom: 0px;
			line-height: 0.9;
		}
	}
}
</style>
