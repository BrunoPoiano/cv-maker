<script setup lang="ts">
import type { TableProps } from '@/types'

type Props = {
	header: Array<string>
	content: TableProps
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
			<tr v-for="(c, index) in props.content" :key="index">
				<td v-for="(h, hIndex) in props.header" :key="hIndex">
					<template v-if="h === 'actions'">
						<component :is="c.actions.component" v-bind="c.actions.props" />
					</template>
					<template v-else>
						{{ c[h] }}
					</template>
				</td>
			</tr>
		</tbody>
	</table>
</template>
