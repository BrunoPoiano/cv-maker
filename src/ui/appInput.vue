<script setup lang="ts">
import { generateKey } from '@/helpers/generateKey'
import type { InputTypeHTMLAttribute, StyleValue } from 'vue'

type Props = {
	label?: string
	type?: InputTypeHTMLAttribute
	alert?: string
	id?: string
	divStyle?: StyleValue
}

const model = defineModel()
const props = defineProps<Props>()
const key = generateKey(5)

defineOptions({
	inheritAttrs: false
})
</script>

<template>
	<div class="content" :style="props.divStyle">
		<label :for="id ?? key" v-if="props.label">{{ props.label }}</label>
		<input
			v-bind="$attrs"
			:id="id ?? key"
			:type="props.type ?? 'text'"
			v-model="model"
		/>
		<small v-if="alert">{{ alert }}</small>
	</div>
</template>

<style scoped>
.content {
	--_gap: 0.5rem;
	display: grid;
	gap: var(--_gap);

	label {
		text-transform: capitalize;
	}

	input {
		font-size: var(--font-size-base);
		border: 1px solid var(--input-border);
		border-radius: 10px;
		background: var(--input-background);
		padding: 0.3rem 0.6rem;
	}

	small {
		font-weight: bold;
		margin-top: calc(var(--_gap) * -0.5);
		color: var(--red);
	}

	&:has(input[type='file']) {
		input::file-selector-button {
			font-size: var(--font-size-base);
			font-weight: 500;
			cursor: pointer;

			padding: 0.2rem 0.4rem;

			border: 1px solid #00000036;
			border-radius: 8px;
			min-width: 5ch;

			background: var(--bg);
			color: lch(from var(--bg) calc((49.44 - l) * infinity) 0 0);
		}
	}

	&:has(input[type='checkbox']) {
		--_size: 1.15em;

		display: grid;
		grid-template-columns: var(--_size) auto;

		> label {
			grid-area: 1/2;
		}

		> input[type='checkbox'] {
			grid-area: 1;
			-webkit-appearance: none;
			appearance: none;
			overflow: hidden;

			position: relative;
			margin: 0;
			font: inherit;
			width: var(--_size);
			height: var(--_size);
			border: 0.15em solid var(--input-border);
			border-radius: 0.15em;

			display: grid;
			place-content: center;

			&::before {
				content: '';
				width: calc(var(--_size) - 0.38em);
				height: calc(var(--_size) - 0.38em);
				transform: scale(0);
				transition: 120ms transform ease-in-out;
				box-shadow: inset 1em 1em var(--form-control-color);

				transform-origin: bottom left;
				clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
			}

			&:checked {
				border-color: var(--app-color);

				&::before {
					transform: scale(1);
					background-color: var(--app-color);
				}
			}
		}
	}
}
</style>
