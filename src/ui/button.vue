<script setup lang="ts">
type Props = {
	type?: 'button' | 'submit' | 'reset'
}

const props = defineProps<Props>()
defineOptions({
	inheritAttrs: false
})
</script>

<template>
	<button v-bind="$attrs" :type="props.type ?? 'button'">
		<slot/>
	</button>
</template>

<style scoped>
button {
	--bg: light-dark(#fff, #333b3c);

	font-size: var(--font-size-base);
	cursor: pointer;

	padding: 0.2rem 0.4rem;

	border: 1px solid #00000036;
	border-radius: 8px;
	min-width: 5ch;

	background: var(--bg);
	color: lch(from var(--bg) calc((49.44 - l) * infinity) 0 0);

	&:hover {
		background: hsl(from var(--bg) h s calc(l - 10%));
	}
}
</style>
