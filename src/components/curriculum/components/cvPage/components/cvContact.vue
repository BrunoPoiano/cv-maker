<script setup lang="ts">
import { inject } from 'vue'

import { ProviderKey } from '@/keys'
import SvgPen from '@/svgs/SvgPen.vue'
import AppAnchor from '@/ui/appAnchor.vue'
import AppButton from '@/ui/appButton.vue'
import AppInput from '@/ui/appInput.vue'

const { curriculum, readonly } = inject(ProviderKey)!
</script>

<template>
	<AppAnchor>
		<div class="contact" :data-side-by-side="curriculum.Contact.sideBySide">
			<div
				:key="type"
				v-for="(_, type) in curriculum.Contact.value"
				:style="{ '--font_size': `var(${curriculum.Contact.size})` }"
			>
				<span class="type"> {{ type }}: </span>
				<span>
					<AppInput
						:readonly="readonly"
						cv-input
						:data-type="type"
						:size="Math.max(curriculum.Contact.value[type].length, 1)"
						v-model="curriculum.Contact.value[type]"
					/>
				</span>
			</div>
		</div>
		<template #button>
			<AppButton modal id="modalCvContact">
				<SvgPen />
			</AppButton>
		</template>
	</AppAnchor>
</template>

<style scoped>
.contact {
	display: grid;
	gap: calc((var(--_a4-gap) * 0.5));

	.type {
		text-transform: capitalize;
	}

	div,
	div:deep(input) {
		color: var(--light-text-color);
		font-size: var(--font_size, var(--font-size-sm));
		font-weight: var(--font-weight);
		text-box-trim: trim-both;
		text-box-edge: cap alphabetic;

		display: grid;
		grid-template-columns: auto 1fr;
		gap: 0.5ch;
		align-items: center;

		> span {
			font-size: inherit;
		}
	}

	&[data-side-by-side='true'] {
		display: grid;
		grid-template-columns: auto auto auto;
		gap: 1ch;
		justify-content: flex-start;
		flex-wrap: wrap;
		margin-top: calc(var(--_a4-gap) * -0.4);

		:deep(input)[data-type='email'] {
			font-weight: bolder !important;
		}

		.type {
			display: none;
		}

		span {
			width: 100%;
		}

		span:not(:last-child) {
			position: relative;
		}
	}
}
</style>
