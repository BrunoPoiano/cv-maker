<script setup lang="ts">
import { generateKey } from '@/helpers/generateKey'

const props = defineProps<{
	nowrap?: true
	positionArea?: string
}>()

const anchor = `--${generateKey(5, 'string')}`
</script>

<template>
	<div data-anchor>
		<slot />
		<span
			data-popover
			:style="{
				'--nowrap': props.nowrap ? 'nowrap' : 'wrap',
				'--position-area': props.positionArea
			}"
		>
			<slot name="popover" />
		</span>
	</div>
</template>

<style scoped>
@layer components {
	[data-anchor] {
		width: fit-content;
		anchor-name: v-bind(anchor);
		> [data-popover] {
			--_padding-block: 0.4rem;
			--_padding-inline: calc(var(--_padding-block) * 2);
			--_default-position: top right;

			white-space: var(--nowrap);
			background-color: var(--background);
			color: currentColor;
			box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

			padding-inline: var(--_padding-inline);
			padding-block: var(--_padding-block);
			border-radius: var(--border-radius);
			border: 1px solid hsl(from var(--background) h s 80%);

			width: fit-content;
			max-width: 25ch;
			position: absolute;

			position-anchor: v-bind(anchor);
			position-area: var(--position-area, var(--_default-position));
			position-try-fallbacks:
				--top-right, --top-left, --bottom-right, --bottom-left;

			opacity: 0;
			visibility: hidden;
			pointer-events: none;

			transition:
				opacity 200ms ease,
				visibility 200ms ease;
		}

		&:hover {
			[data-popover] {
				opacity: 1;
				visibility: visible;
				pointer-events: auto;
			}
		}
	}

	@position-try --top-right {
		position-area: top right;
		margin: inset;
	}
	@position-try --top-left {
		position-area: top left;
	}
	@position-try --bottom-right {
		position-area: bottom right;
	}
	@position-try --bottom-left {
		position-area: bottom left;
	}
}
</style>
