<script setup lang="ts">
import { generateKey } from '@/helpers/generateKey'
import type { ModelRef } from 'vue'

type Props = {
	labelStart?: string | Element
	labelEnd?: string | Element
}
const modelValue = defineModel<boolean>()
const props = defineProps<Props>()
const key = generateKey(5)
defineOptions({
	inheritAttrs: false
})
</script>

<template>
	<div class="toggle">
		<span v-if="labelStart">{{ labelStart }}</span>
		<label :for="key" class="switch">
			<input
				:id="key"
				type="checkbox"
				:checked="modelValue"
				v-bind="$attrs"
				@change="modelValue = !modelValue"
			/>
			<span class="slider round"></span>
		</label>
		<span v-if="labelEnd">{{ labelEnd }}</span>
	</div>
</template>

<style scoped>
.toggle {
	display: flex;
	gap: 0.5rem;
	align-items: Center;
	width: fit-content;
}
.switch {
	position: relative;
	display: inline-block;
	width: 60px;
	height: 34px;
}

.switch input {
	opacity: 0;
	width: 0;
	height: 0;
}

.slider {
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #ccc;
	-webkit-transition: 0.4s;
	transition: 0.4s;
}

.slider:before {
	position: absolute;
	content: '';
	height: 26px;
	width: 26px;
	left: 4px;
	bottom: 4px;
	background-color: white;
	-webkit-transition: 0.4s;
	transition: 0.4s;
}

input:checked + .slider {
	background-color: var(--app-color);
}

input:focus + .slider {
	box-shadow: 0 0 1px var(--app-color);
}

input:checked + .slider:before {
	-webkit-transform: translateX(26px);
	-ms-transform: translateX(26px);
	transform: translateX(26px);
}

.slider.round {
	border-radius: 34px;
}

.slider.round:before {
	border-radius: 50%;
}
</style>
