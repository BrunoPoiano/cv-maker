<script setup lang="ts">
import { inject } from 'vue'

import { ProviderKey } from '@/keys'
import SvgPen from '@/svgs/SvgPen.vue'
import AppAnchor from '@/ui/appAnchor.vue'
import AppButton from '@/ui/appButton.vue'
import AppInput from '@/ui/appInput.vue'

const { curriculum } = inject(ProviderKey)!
</script>

<template>
	<AppAnchor>
		<div class="header">
			<h1 :style="{ '--font_size': `var(${curriculum.Header.UserName.size})` }">
				<AppInput cv-input v-model="curriculum.Header.UserName.value" />
			</h1>
			<span
				:style="{ '--font_size': `var(${curriculum.Header.Role.size})` }"
				class="label"
			>
				<AppInput cv-input v-model="curriculum.Header.Role.value" />
			</span>
		</div>
		<template #button>
			<AppButton modal id="modalCvHeader">
				<SvgPen />
			</AppButton>
		</template>
	</AppAnchor>
</template>

<style scoped>
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

		color: var(--light-text-color);

		font-size: var(--font_size, var(--font-size-lg));
		font-weight: var(--font-weight);
		letter-spacing: 0.099em;
		line-height: 1.2;
		text-transform: uppercase;
		text-box-trim: trim-both;
		text-box-edge: cap alphabetic;
	}
}
</style>
