<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue'

type Props =
	| {
			type?: ButtonHTMLAttributes['type']
			background?: string
			hoverBackground?: string
			modal?: false
			id?: string
	  }
	| {
			modal: true
			id: string
			type?: ButtonHTMLAttributes['type']
			background?: string
			hoverBackground?: string
	  }

const props = defineProps<Props>()
defineOptions({
	inheritAttrs: false
})
</script>

<template>
	<button
		:command="modal ? 'show-modal' : ''"
		:commandfor="id"
		:style="{
			'--bg': props.background,
			'--hover-bg': props.hoverBackground
		}"
		:data-has-hover-bg="props.hoverBackground != undefined"
		v-bind="$attrs"
		:type="props.type ?? 'button'"
	>
		<slot />
	</button>
</template>

<style scoped>
button {
	--var-calc: light-dark(10, 50);
	--bg: light-dark(#fff, #000);
	--_padding-block: 0.4rem;
	--_padding-inline: calc(var(--_padding-block) * 2);

	display: flex;
	gap: 0.5ch;
	align-items: center;

	font-size: var(--font-size-base);
	font-weight: 500;
	text-transform: capitalize;
	text-box-trim: trim-both;
	text-box-edge: cap alphabetic;
	cursor: pointer;

	padding-inline: var(--_padding-inline);
	padding-block: var(--_padding-block);

	border: 1px solid var(--input-border);
	border-radius: var(--border-radius);
	corner-shape: squircle;
	min-width: 5ch;

	background: var(--bg);
	color: lch(from var(--bg) calc((49.44 - l) * infinity) 0 0);

	transition:
		background 500ms,
		color 500ms,
		transform 200ms ease-out;

	&:has(svg) {
		padding-inline-start: calc(var(--_padding-inline) * 0.75);
	}

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
