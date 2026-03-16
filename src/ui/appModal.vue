<script setup lang="ts">
import Button from '@/ui/appButton.vue'

type Props = {
	closeLabel: string | Element
	openAction?: () => void
	closeAction?: () => void
	minWidth?: string
	maxWidth?: string
	id?: string
	closedby?: 'none' | 'closerequest' | 'any'
}

const { closeLabel, minWidth, maxWidth, id, closedby } = defineProps<Props>()

import { generateKey } from '@/helpers/generateKey'
const key = id || generateKey(10)
</script>

<template>
	<dialog
		:closedby="closedby || 'any'"
		:id="key"
		:style="{
			minWidth: `min(${minWidth},100%)`,
			maxWidth: `${maxWidth || '100%'}`
		}"
	>
		<div class="header">
			<slot name="header" />
		</div>
		<slot />
		<div class="footer">
			<slot name="footer" />
			<Button :commandfor="key" command="close" @click="closeAction">{{
				closeLabel
			}}</Button>
		</div>
	</dialog>
</template>

<style scoped>
.header {
	margin-bottom: 1rem;
}

.footer {
	margin-top: 1rem;
	gap: 0.5rem;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
</style>
