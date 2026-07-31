<script setup lang="ts">
import AppButton from '@/ui/appButton.vue'

defineOptions({
	inheritAttrs: false
})
</script>
<template>
	<div class="defaultConfig">
		<AppButton v-bind="$attrs"> Order </AppButton>
	</div>
</template>
<style scoped>
@layer utilities {
	.defaultConfig {
		display: grid;
		place-items: center;
	}
}
</style>
