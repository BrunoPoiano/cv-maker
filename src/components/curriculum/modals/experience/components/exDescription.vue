<script setup lang="ts">
import Textarea from '@/ui/appTextarea.vue'
import { ref, watch } from 'vue'
type Props = {
	list: boolean
}

const model = defineModel<string | string[]>()
const { list } = defineProps<Props>()

defineOptions({
	inheritAttrs: false
})

const desc = ref(
	Array.isArray(model.value) ? model.value.join('\n') : model.value
)

watch(
	() => list,
	(newValue) => {
		updateData(newValue)
	}
)

function updateData(list: boolean) {
	if (desc.value) {
		model.value = list
			? desc.value.split('\n').filter((item) => item !== '')
			: desc.value
	}
}
</script>

<template>
	<Textarea v-bind="$attrs" v-model="desc" @keyup="updateData(list)" />
</template>
