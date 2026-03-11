<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue'

type Props = {
	type?: ButtonHTMLAttributes['type']
	background?: string
	hoverBackground?: string
	icon?: string
}

const props = defineProps<Props>()
defineOptions({
	inheritAttrs: false
})
</script>

<template>
	<button
		:style="{
			'--bg': props.background,
			'--hover-bg': props.hoverBackground
		}"
		:data-has-hover-bg="props.hoverBackground != undefined"
		v-bind="$attrs"
		:type="props.type ?? 'button'"
	>
		<img
			:src="props.icon"
			v-if="props.icon"
			alt="button icon"
			width="16"
			height="16"
		/>
		<slot />
	</button>
</template>

<style scoped>
button {
	--var-calc: light-dark(10, 50);

	--bg: light-dark(#fff, #000);
	display: flex;
	gap: 0.5ch;
	align-items: center;

	font-size: var(--font-size-base);
	font-weight: 500;
	text-transform: capitalize;
	cursor: pointer;

	padding: 0.4rem 0.8rem;

	border: 1px solid var(--input-border);
	border-radius: 8px;
	min-width: 5ch;

	background: var(--bg);
	color: lch(from var(--bg) calc((49.44 - l) * infinity) 0 0);

	transition:
		background 500ms,
		color 500ms,
		transform 200ms ease-out;

	&:hover:not(:disabled) {
		color: lch(
			from var(--hover-bg, var(--bg)) calc((49.44 - l) * infinity) 0 0
		);

		--hover-bg-adjusted: light-dark(
			hsl(from var(--hover-bg, var(--bg)) h s calc(l - 10)),
			hsl(from var(--hover-bg, var(--bg)) h s calc(l + 15))
		);

		background: var(--hover-bg-adjusted);
	}

	&[data-has-hover-bg='true']:hover:not(:disabled) {
		background: hsl(from var(--hover-bg, var(--bg)) h 90% l);
	}

	&:disabled {
		opacity: 60%;
		cursor: initial;
	}

	&:active:not(:disabled) {
		transform: scale(0.98);
	}
}
</style>
