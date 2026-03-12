<script setup lang="ts">
import { ProviderKey } from '@/keys'
import { inject } from 'vue'

const { curriculum } = inject(ProviderKey)!
</script>

<template>
	<div class="contact" :data-side-by-side="curriculum.Contact.sideBySide">
		<span
			:key="type"
			v-for="(item, type) in curriculum.Contact.value"
			:style="`font-size: var(${curriculum.Contact.size})`"
			:data-type="type"
		>
			<span class="type"> {{ type }}: </span>
			<span> {{ item }} </span>
		</span>
	</div>
</template>

<style scoped>
.contact {
	display: grid;
	gap: calc((var(--_a4-gap) * 0.5));

	.type {
		text-transform: capitalize;
	}

	span {
		color: var(--light-text-color);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight);
		text-box-trim: trim-both;
		text-box-edge: cap alphabetic;

		> span {
			font-size: inherit;
		}
	}

	&[data-side-by-side='true'] {
		display: flex;
		gap: 1ch;
		margin-top: calc(var(--_a4-gap) * -0.4);

		[data-type='email'] span {
			font-weight: bold;
		}

		.type {
			display: none;
		}

		span:not(:last-child) {
			position: relative;

			&:after {
				content: ' | ';
				position: absolute;
				right: -0.9ch;
				font-weight: normal;
			}
		}
	}
}
</style>
