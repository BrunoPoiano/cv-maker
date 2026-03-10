<script setup lang="ts">
type Props = {
	type?: 'attention' | 'danger' | 'success' | 'primary'
}

const { type } = defineProps<Props>()

defineOptions({
	inheritAttrs: false
})
</script>

<template>
	<small v-bind="$attrs" :data-type="type">
		<slot />
	</small>
</template>

<style scoped>
small {
	font-weight: bolder;
	display: inline-block;
	height: 2ch;

	&[data-type='attention'] {
		color: var(--orange);
	}

	&[data-type='danger'] {
		color: var(--red);
	}

	&[data-type='success'] {
		color: var(--green);
	}

	&[data-type='primary'] {
		color: var(--blue);
	}
}
</style>
