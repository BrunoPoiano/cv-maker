<template>
	<h3><slot /></h3>
</template>

<style scoped>
h3 {
	color: black;
	font-size: 20px;
	font-weight: var(--font-weight);
	letter-spacing: 0.099em;
	line-height: 1.2;
	text-transform: uppercase;
	margin: 0;
	margin-bottom: calc((var(--_a4-gap) * 0.9) * -1);
}
</style>
