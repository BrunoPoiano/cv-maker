<script setup lang="ts">
import type { CSSProperties } from 'vue'

import { generateKey } from '@/helpers/generateKey'
type Props = {
	labelStart?: string | Element
	labelEnd?: string | Element
	style?: CSSProperties
}
const modelValue = defineModel<boolean>()
const { labelStart, style, labelEnd } = defineProps<Props>()
const key = generateKey(5)

defineOptions({
	inheritAttrs: false
})
</script>

<template>
	<div class="toggle" :style="style">
		<span v-if="labelStart" :data-check="!modelValue">{{ labelStart }}</span>
		<label :for="key" class="switch">
			<input
				:id="key"
				type="checkbox"
				:checked="modelValue"
				v-bind="$attrs"
				@change="modelValue = !modelValue"
			/>
			<span class="slider round"></span>
		</label>
		<span v-if="labelEnd" :data-check="modelValue">{{ labelEnd }}</span>
	</div>
</template>

<style scoped>
.toggle {
	display: flex;
	gap: 0.5rem;
	align-items: Center;
	width: fit-content;

	--_swith-height: 24px;

	span[data-check='true'] {
		color: var(--app-color);
	}

	.switch {
		position: relative;
		display: inline-block;
		width: 60px;
		height: var(--_swith-height);

		input {
			opacity: 0;
			width: 0;
			height: 0;
		}

		.slider {
			position: absolute;
			cursor: pointer;
			inset: 0;
			background-color: #ccc;
			-webkit-transition: 0.4s;
			transition: 0.4s;

			&:before {
				position: absolute;
				content: '';
				height: calc(var(--_swith-height) - 10px);
				background-color: var(--app-color);
				aspect-ratio: 1;
				left: 4px;
				bottom: 5px;
				-webkit-transition: 0.4s;
				transition: 0.4s;
			}
		}

		input:checked + .slider {
			background-color: var(--app-color);
		}

		input:focus + .slider {
			box-shadow: 0 0 1px var(--app-color);
		}

		input:checked + .slider:before {
			--_new-position: calc(var(--_swith-height) + 15px);
			-webkit-transform: translateX(var(--_new-position));
			-ms-transform: translateX(var(--_new-position));
			transform: translateX(var(--_new-position));

			background-color: white;
		}

		.slider.round {
			border-radius: var(--border-radius);
		}

		.slider.round:before {
			border-radius: 50%;
		}
	}
}
</style>
