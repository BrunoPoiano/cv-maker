<template>
	<template v-for="(node, i) in props.value" :key="i">
		<component :is="node" v-if="typeof node !== 'string'" />
		<template v-else>{{ node }}</template>
	</template>
</template>

<script setup lang="ts">
import type { BoldMatchReturn } from '@/types'

type Props = {
	value: BoldMatchReturn
}

const props = defineProps<Props>()
</script>
