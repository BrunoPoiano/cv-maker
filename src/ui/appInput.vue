<script setup lang="ts">
import type { CSSProperties, InputTypeHTMLAttribute } from 'vue'

import { generateKey } from '@/helpers/generateKey'

type Props = {
	label?: string
	type?: InputTypeHTMLAttribute
	alert?: string
	id?: string
	divStyle?: CSSProperties | string
	style?: CSSProperties | string
	cvInput?: true
}

const model = defineModel()
const props = defineProps<Props>()
const key = generateKey(5)

defineOptions({
	inheritAttrs: false
})
</script>

<template>
	<input
		v-if="props.cvInput"
		data-cvInput
		v-bind="$attrs"
		:style="style"
		type="text"
		v-model="model"
	/>
	<div v-else class="content" :style="props.divStyle">
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
input[data-cvInput] {
	font-family: inherit !important;
	width: 100% !important;
	padding: 0px !important;
	margin: 0px !important;
	border: none;
	color: inherit;
	text-box-edge: auto !important;
	border-radius: var(--cv-border-radius) !important;
	background: var(--background) !important;

	&[type='date'] {
		border: none;
	}
}

.content {
	--_gap: 0.3rem;
	display: grid;
	gap: var(--_gap);

	label {
		text-transform: capitalize;
		font-size: inherit;
		letter-spacing: inherit;
	}

	input {
		font-size: var(--font-size-base);
		border: 1px solid var(--outline-variant);
		border-radius: var(--border-radius);
		corner-shape: squircle;
		background: var(--surface-bright);
		padding: 0.4rem 0.8rem;
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

			padding: 0.4rem 0.8rem;

			border: 1px solid var(--outline-variant);
			border-radius: calc(var(--border-radius) * 0.8);
			min-width: 5ch;

			background: var(--bg);
			color: lch(from var(--bg) calc((49.44 - l) * infinity) 0 0);
		}
	}

	&:has(input[type='checkbox']) {
		--_size: 1.15em;

		width: fit-content;
		display: grid;
		align-items: center;

		> label {
			grid-area: 1/2;
			font-size: inherit;
		}

		> input[type='checkbox'] {
			grid-area: 1;
			-webkit-appearance: none;
			appearance: none;
			overflow: hidden;

			position: relative;
			margin: 0;
			width: var(--_size);
			height: var(--_size);
			border: 0.15em solid var(--outline-variant);
			border-radius: 0.15em;

			padding: 0.4rem;
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
				border-color: var(--primary);

				&::before {
					transform: scale(1);
					background-color: var(--primary);
				}
			}
		}
	}
}
</style>
