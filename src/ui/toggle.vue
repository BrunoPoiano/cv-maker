<script setup lang="ts">
import { generateKey } from '@/helpers/generateKey'
import type { ModelRef } from 'vue'

type Props = {
	labelStart?: string | Element
	labelEnd?: string | Element
}
const modelValue = defineModel<boolean>()
const props = defineProps<Props>()
const key = generateKey(5)
defineOptions({
	inheritAttrs: false
})
</script>

<template>
	<div class="toggle">
		<span v-if="labelStart">{{ labelStart }}</span>
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
		<span v-if="labelEnd">{{ labelEnd }}</span>
	</div>
</template>

<style scoped>
.toggle {
	display: flex;
	gap: 0.5rem;
	align-items: Center;
	width: fit-content;

	--_swith-height: 24px;

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
			border-radius: 34px;
		}

		.slider.round:before {
			border-radius: 50%;
		}
	}
}
</style>
