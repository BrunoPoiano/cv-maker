<script setup lang="ts">
import Button from '@/ui/button.vue'

type Props = {
	buttonLabel: string | Element
	closeLabel: string | Element
	minWidth?: string
	maxWidth?: string
	buttonIcon?: string
}

const { buttonLabel, buttonIcon, closeLabel, minWidth, maxWidth } =
	defineProps<Props>()

import { generateKey } from '@/helpers/generateKey'
const key = generateKey(10)
</script>

<template>
	<dialog
		:id="key"
		:style="`min-width: min(${minWidth},100%); max-width: ${maxWidth || '100%'}`"
	>
		<div class="header">
			<slot name="header" />
		</div>
		<slot />
		<div class="footer">
			<slot name="footer" />
			<Button :commandfor="key" command="close">{{ closeLabel }}</Button>
		</div>
	</dialog>
	<Button :icon="buttonIcon" command="show-modal" :commandfor="key">{{
		buttonLabel
	}}</Button>
</template>

<style scoped>
.header {
	margin-bottom: 1rem;
}

.footer {
	margin-top: 1rem;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
</style>
