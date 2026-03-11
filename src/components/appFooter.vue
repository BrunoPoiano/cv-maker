<script setup lang="ts">
import ColorScheme from './colorScheme.vue'
</script>

<template>
	<footer>
		<span
			>{{ new Date().getFullYear() }} | Bruno |
			<a href="https://github.com/BrunoPoiano/cv-maker">Source Code</a>
		</span>
		<ColorScheme />
	</footer>
</template>

<style scoped>
footer {
	margin-top: 3rem;

	display: grid;
	grid-template-columns: repeat(3, 1fr);
	align-items: end;

	span {
		grid-area: 1/2;
		place-self: center;
		font-size: var(--font-size-base);
	}

	button {
		grid-area: 1/3;
		place-self: end;
	}
}
</style>
