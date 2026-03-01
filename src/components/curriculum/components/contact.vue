<script setup lang="ts">
import { CurriculumConst } from '@/constants/curriculum'
import { CurriculumKey } from '@/main'
import type { Curriculum } from '@/types'
import { inject } from 'vue'

const contact = inject<Curriculum>(CurriculumKey, CurriculumConst).Contact
</script>

<template>
	<div class="contact" v-if="contact">
		<span
			v-for="(item, type) in contact.value"
			:style="`font-size: var(${contact.size})`"
		>
			<span class="type"> {{ type }}: </span>
			<span> {{ item }} </span>
		</span>
	</div>
</template>

<style scoped>
.contact {
	display: grid;
	gap: 0.4rem;

	.type {
		text-transform: capitalize;
	}
	span {
		color: var(--light-text-color);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight);
	}
}
</style>
