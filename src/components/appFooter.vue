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
	grid-area: footer;
	padding: 1rem;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	align-items: end;

	span {
		place-self: start;
		align-self: center;
		font-size: var(--font-size-base);
	}

	button {
		place-self: end;
	}
}
</style>
