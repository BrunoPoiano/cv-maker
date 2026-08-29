<script setup lang="ts">
import type { TableProps } from '@/types'

type Props = {
	header: Array<string>
	content: TableProps
	bolder?: (b: number) => boolean
}

const props = defineProps<Props>()
defineOptions({
	inheritAttrs: false
})
</script>

<template>
	<table>
		<thead>
			<tr>
				<th v-for="(h, hIndex) in props.header" :key="hIndex">
					{{ h }}
				</th>
			</tr>
		</thead>
		<tbody>
			<tr
				v-for="(c, index) in props.content"
				:key="index"
				:data-bolder="bolder?.(index)"
			>
				<td v-for="(h, hIndex) in props.header" :key="hIndex">
					<template v-if="c[h]?.type === 'component'">
						<component :is="c[h].component" v-bind="c[h].props" />
					</template>
					<template v-else>
						{{ c[h]?.value }}
					</template>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<style scoped>
@layer components {
	[data-bolder='true'] {
		font-weight: bolder;
	}
}
</style>
