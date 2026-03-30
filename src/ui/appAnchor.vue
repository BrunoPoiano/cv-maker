<script setup lang="ts">
import { generateKey } from '@/helpers/generateKey'

const anchor = `--${generateKey(5, 'string')}`
</script>

<template>
	<div data-anchor>
		<slot />
		<slot name="button" />
	</div>
</template>

<style scoped>
[data-anchor] {
	anchor-name: v-bind(anchor);

	> :slotted(button) {
		display: none;
	}

	&:hover {
		:slotted(button) {
			display: grid;

			position: absolute;
			position-anchor: v-bind(anchor);
			bottom: anchor(top);
			right: anchor(right);
			margin-bottom: -2rem;
		}
	}
}
</style>
