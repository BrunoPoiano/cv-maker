<script setup lang="ts">
import { generateKey } from '@/helpers/generateKey'

type BaseProps = {
	label?: string
	minHeight?: string
	id?: string
	rows?: string | number
	cvTextArea?: true
}

type Props =
	| (BaseProps & {
			error?: false
			errorMessage?: string
	  })
	| (BaseProps & {
			error: true
			errorMessage: string
	  })

const props = defineProps<Props>()
const key = generateKey(5)
const model = defineModel<string>()

defineOptions({
	inheritAttrs: false
})

function defineHeight() {
	if (props.rows) {
		return `auto`
	}
	return props.minHeight ? props.minHeight : '241px'
}
</script>

<template>
	<textarea
		v-if="cvTextArea"
		data-cvTextArea
		v-bind="$attrs"
		:rows="rows"
		:id="id ?? key"
		v-model="model"
	/>
	<div class="content" v-else>
		<label :for="id ?? key" v-if="props.label">{{ props.label }}</label>
		<textarea
			:data-error="props.error"
			:style="{ minHeight: `${defineHeight()}` }"
			v-bind="$attrs"
			:id="id ?? key"
			v-model="model"
		/>
		<small style="color: var(--red)" v-if="props.error">
			{{ props.errorMessage }}
		</small>
	</div>
</template>

<style scoped>
@layer components {
	.content {
		display: grid;
		gap: 0.5rem;

		label {
			text-transform: capitalize;
		}

		textarea {
			border: 1px solid var(--outline-variant);
			border-radius: var(--border-radius);
			corner-shape: squircle;
			padding: 0.8rem;
			min-height: 241px;
			background: var(--surface-bright);
			font-size: var(--font-size-base);
		}
	}

	textarea[data-error='true'] {
		outline: 1px solid var(--red);
	}

	textarea[data-cvTextArea] {
		font-family: inherit;
		width: 100%;
		padding: 0px;
		margin: 0px;
		border: none;
		color: inherit;
		border-radius: var(--cv-border-radius);
		background: var(--background);
	}
}
</style>
