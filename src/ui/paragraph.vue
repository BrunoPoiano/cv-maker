<template>
	<p><slot /></p>
</template>

<style scoped>
p {
	max-width: 90ch;

	margin: 0;
	padding-left: 0.5rem;

	color: var(--light-text-color);
	font-size: var(--font-size-sm);
	font-weight: var(--font-weight);
	line-height: 20px;
	letter-spacing: 0em;
}
</style>
