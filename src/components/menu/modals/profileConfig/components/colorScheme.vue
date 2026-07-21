<script setup lang="ts">
import { ColorSchemeStore } from '@/stores/colorSchemeStore'
import SvgMoon from '@/svgs/svgMoon.vue'
import SvgSun from '@/svgs/svgSun.vue'
import Button from '@/ui/appButton.vue'

const colorScheme = ColorSchemeStore.get()
</script>

<template>
	<Button @click="ColorSchemeStore.change()">
		<SvgSun v-if="colorScheme === 'dark'" />
		<SvgMoon v-else />
		{{ colorScheme === 'dark' ? 'Light Mode' : 'Dark Mode' }}
	</Button>
</template>
