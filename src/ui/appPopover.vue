<script setup lang="ts">
import { generateKey } from '@/helpers/generateKey'

const props = defineProps<{
	nowrap?: true
	positionArea?: string
	color?: string
}>()

const anchor = `--${generateKey(5, 'string')}`
</script>

<template>
	<div data-anchor>
		<slot />
		<span
			data-popover
			:style="{
				...(props.nowrap
					? {
							'--_nowrap': 'nowrap',
							'--_max-width': 'fit-content'
						}
					: {}),
				...(props.color
					? {
							'--_color': props.color
						}
					: {}),
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
			--_max-width: 25ch;
			--_nowrap: wrap;
			--_color: var(--on-surface);

			white-space: var(--_nowrap);
			background-color: var(--background);
			color: var(--_color);
			box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

			padding-inline: var(--_padding-inline);
			padding-block: var(--_padding-block);
			border-radius: var(--border-radius);
			border: 1px solid var(--outline-variant);

			width: fit-content;
			max-width: var(--_max-width);
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
