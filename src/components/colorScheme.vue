<script setup lang="ts">
import { onBeforeMount } from 'vue'

import { ColorSchemeStore } from '@/stores/colorSchemeStore'
import SvgMoon from '@/svgs/svgMoon.vue'
import SvgSun from '@/svgs/svgSun.vue'
import Button from '@/ui/appButton.vue'

const colorScheme = ColorSchemeStore.get()

onBeforeMount(() => {
	ColorSchemeStore.set()
})
</script>

<template>
	<Button @click="ColorSchemeStore.change()">
		<SvgSun v-if="colorScheme === 'dark'" />
		<SvgMoon v-else />
		{{ colorScheme === 'dark' ? 'Light Mode' : 'Dark Mode' }}
	</Button>
</template>
