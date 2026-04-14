<template>
	<svg
		:data-direction="props.direction"
		width="22px"
		height="22px"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
		<g
			id="SVGRepo_tracerCarrier"
			stroke-linecap="round"
			stroke-linejoin="round"
		></g>
		<g id="SVGRepo_iconCarrier">
			<g id="Arrow / Arrow_Up_SM">
				<path
					id="Vector"
					d="M12 17V7M12 7L8 11M12 7L16 11"
					stroke="#000000"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				></path>
			</g>
		</g>
	</svg>
</template>

<script setup lang="ts">
type Props = {
	direction?: 'up' | 'down' | 'left' | 'right'
}

const props = defineProps<Props>()
</script>

<style scoped>
svg {
	&[data-direction='down'] {
		transform: rotate(180deg);
	}

	&[data-direction='left'] {
		transform: rotate(270deg);
	}

	&[data-direction='right'] {
		transform: rotate(90deg);
	}

	path {
		stroke: currentColor;
	}
}
</style>
