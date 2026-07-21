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
	<AppAnchor margin-bottom="-1rem" class="contact-anchor">
		<div
			:style="readonly ? { display: 'none' } : ''"
			data-drag-handle
			draggable="true"
		>
			<SvgDrag />
		</div>
		<div
			class="contact"
			:data-side-by-side="!readonly ? false : curriculum.Contact.sideBySide"
		>
			<template v-for="(_, type) in curriculum.Contact.value" :key="type">
				<div
					:style="{ '--font_size': `var(${curriculum.Contact.size})` }"
					v-if="curriculum.Contact.value[type].value"
				>
					<span class="type"> {{ type }}: </span>
					<span
						:style="{
							fontWeight: curriculum.Contact.value[type].bolder ? 'bolder' : ''
						}"
					>
						<template v-if="readonly">
							{{ curriculum.Contact.value[type].value }}
						</template>
						<AppInput
							v-else
							cv-input
							:data-type="type"
							:size="Math.max(curriculum.Contact.value[type].value.length, 1)"
							v-model="curriculum.Contact.value[type].value"
						/>
					</span>
				</div>
			</template>
		</div>
		<template #button>
			<AppButton icon-button modal id="modalCvContact">
				<SvgPen />
			</AppButton>
		</template>
	</AppAnchor>
</template>

<style scoped>
@layer utilities {
	.contact-anchor {
		display: grid;

		&:has(.svg-drag) {
			grid-template-columns: auto 1fr;
		}
	}

	.contact {
		display: grid;
		gap: calc((var(--_a4-gap) * 0.5));

		.type {
			text-transform: capitalize;
		}

		div,
		div:deep(input) {
			color: var(--on-surface-variant);
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
			display: flex;
			gap: 1ch;
			justify-content: v-bind('curriculum.Contact.align');
			flex-wrap: wrap;
			margin-top: calc(var(--_a4-gap) * -0.4);

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
}
</style>
