<template>
	<svg
		viewBox="0 0 24 24"
		width="22px"
		height="22px"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		class="svg-drag"
	>
		<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
		<g
			id="SVGRepo_tracerCarrier"
			stroke-linecap="round"
			stroke-linejoin="round"
		></g>
		<g id="SVGRepo_iconCarrier">
			<path
				d="M14 6a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1ZM15 9a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2h-1ZM15 13a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2h-1ZM9 9a1 1 0 0 0 0 2h1a1 1 0 1 0 0-2H9ZM8 14a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1ZM15 17a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2h-1ZM8 18a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1ZM9 5a1 1 0 0 0 0 2h1a1 1 0 1 0 0-2H9Z"
				fill="#000000"
			></path>
		</g>
	</svg>
</template>
<style scoped>
@layer utilities {
	svg {
		cursor: grab;
		path {
			stroke: currentColor;
		}
	}
}
</style>
