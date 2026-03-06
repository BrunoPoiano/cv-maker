<script setup lang="ts">
import Button from '@/ui/appButton.vue'

type Props = {
	buttonLabel: string | Element
	closeLabel: string | Element
	openAction?: () => void
	closeAction?: () => void
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
			<Button :commandfor="key" command="close" @click="closeAction">{{
				closeLabel
			}}</Button>
		</div>
	</dialog>
	<Button
		:icon="buttonIcon"
		command="show-modal"
		:commandfor="key"
		@click="openAction"
	>
		{{ buttonLabel }}
	</Button>
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
