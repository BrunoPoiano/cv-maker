<script setup lang="ts">
import type { CSSProperties } from 'vue'

import { generateKey } from '@/helpers/generateKey'
type Props = {
	labelStart: string
	labelEnd: string
	style?: CSSProperties
	afterChange?: () => void
	colorCheck?: true
}
const modelValue = defineModel<boolean>()
const { labelStart, style, labelEnd, afterChange } = defineProps<Props>()
const key = generateKey(5)

defineOptions({
	inheritAttrs: false
})

function changeCheckBox() {
	modelValue.value = !modelValue.value
	if (afterChange) {
		afterChange()
	}
}
</script>

<template>
	<div class="toggle-text" :style="style">
		<label :for="key" class="switch">
			<input
				:id="key"
				type="checkbox"
				:checked="modelValue"
				v-bind="$attrs"
				@change="changeCheckBox"
			/>
			<span :data-check="modelValue" data-left>
				<span>{{ labelStart }} </span>
			</span>
			<span :data-check="!modelValue" data-right>
				<span>{{ labelEnd }}</span></span
			>
		</label>
	</div>
</template>

<style scoped>
.toggle-text {
	--_padding: 0.4rem;
	--_bg: var(--surface-container-highest);

	align-items: Center;
	width: fit-content;
	background: var(--_bg);
	border-radius: var(--border-radius);
	padding: var(--_padding);

	&:hover {
		--hover-bg-adjusted: light-dark(
			hsl(from var(--_bg) h 80% calc(l - 2)),
			hsl(from var(--_bg) h s calc(l + 15))
		);

		background: var(--hover-bg-adjusted);
	}

	.switch {
		display: flex;

		input {
			opacity: 0;
			width: 0;
			height: 0;
			margin: 0;
		}

		span {
			position: relative;
			font-size: var(--font-size-sm);
			cursor: pointer;
			padding: 0.2rem 0.4rem;
			text-transform: uppercase;
			border-radius: calc(var(--border-radius) - var(--_padding));
			overflow: hidden;

			> span {
				padding: 0;
			}

			&[data-check]::before {
				transition: transform 400ms ease-in-out;
				content: '';
				position: absolute;
				inset: 0;
				border-radius: inherit;
				background: var(--background);
				transform: scaleX(0);
			}

			&[data-check='true']::before {
				transform: scaleX(1);
			}

			&[data-left]::before {
				transform-origin: right;
			}

			&[data-right] {
				margin-left: -1px;

				&::before {
					transform-origin: left;
				}
			}
		}
	}
}
</style>
