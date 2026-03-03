<script setup lang="ts">
import { ProviderKey } from '@/main'
import { inject } from 'vue'

const { curriculum } = inject(ProviderKey)!
</script>

<template>
	<div class="contact">
		<span
			:key="type"
			v-for="(item, type) in curriculum.Contact.value"
			:style="`font-size: var(${curriculum.Contact.size})`"
		>
			<span class="type"> {{ type }}: </span>
			<span> {{ item }} </span>
		</span>
	</div>
</template>

<style scoped>
.contact {
	display: grid;
	gap: calc((var(--_a4-gap) * 0.3));

	.type {
		text-transform: capitalize;
	}

	span {
		color: var(--light-text-color);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight);

		> span {
			font-size: inherit;
		}
	}
}
</style>
