<script setup lang="ts">
import Button from '@/ui/appButton.vue'

const props = defineProps({
	closeLabel: {
		type: [String, Object],
		required: false
	},
	closeAction: Function,
	openAction: Function,
	minWidth: String,
	maxWidth: String,
	id: {
		type: String,
		required: true
	},
	closedby: {
		type: String,
		default: 'any',
		validator: (v: string) => ['none', 'closerequest', 'any'].includes(v)
	}
})
</script>

<template>
	<dialog
		:closedby="props.closedby || 'any'"
		:id="props.id"
		:style="{
			minWidth: `min(${props.minWidth || '10rem'}, 100%)`,
			maxWidth: `${props.maxWidth || '100%'}`
		}"
		@show="props.openAction?.()"
	>
		<div class="header">
			<slot name="header" />
		</div>
		<slot />
		<div class="footer">
			<slot name="footer" />
			<Button
				:commandfor="props.id"
				command="close"
				@click="props.closeAction"
				>{{ props.closeLabel }}</Button
			>
		</div>
	</dialog>
</template>

<style scoped>
.header,
.footer {
	margin: calc(var(--_padding) * -1);
	padding: var(--_padding);
	background: var(--surface-container-low);
}

.header {
	margin-bottom: 1rem;

	&:deep(h3) {
		margin-bottom: 0 !important;
	}
}

.footer {
	margin-top: 1rem;
	gap: 0.5rem;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
</style>
