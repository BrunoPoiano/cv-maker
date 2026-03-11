<script setup lang="ts">
import SvgGithub from '@/svgs/svgGithub.vue'
import ColorScheme from './colorScheme.vue'
import SvgLinkedin from '@/svgs/svgLinkedin.vue'
</script>

<template>
	<footer>
		<div class="links">
			<a href="https://github.com/BrunoPoiano">
				<SvgGithub />
			</a>

			<a href="https://www.linkedin.com/in/brunopoiano/">
				<SvgLinkedin />
			</a>
		</div>
		<div>
			<span
				>{{ new Date().getFullYear() }} | Bruno |
				<a href="https://github.com/BrunoPoiano/cv-maker">Source Code</a>
			</span>
			<ColorScheme />
		</div>
	</footer>
</template>

<style scoped>
footer {
	.links {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		svg {
			width: 2.5rem;
			height: 2.5rem;
		}
	}

	margin-top: 3rem;

	div:nth-child(2) {
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
}
</style>
