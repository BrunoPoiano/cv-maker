<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'

import {
	getDataFromLocalStorage,
	saveDataToLocalStorage
} from '@/helpers/localstorage'
import SvgMoon from '@/svgs/svgMoon.vue'
import SvgSun from '@/svgs/svgSun.vue'
import Button from '@/ui/appButton.vue'

const colorScheme = ref(
	getDataFromLocalStorage({ key: 'theme', initialValue: 'light' })
)

const setColorScheme = () => {
	saveDataToLocalStorage({ key: 'theme', initialValue: colorScheme.value })
	document.documentElement.style.setProperty('color-scheme', colorScheme.value)
}

const changeColorTheme = () => {
	colorScheme.value = colorScheme.value === 'dark' ? 'light' : 'dark'
	setColorScheme()
}

onBeforeMount(() => {
	setColorScheme()
})
</script>

<template>
	<Button @click="changeColorTheme">
		<SvgSun v-if="colorScheme === 'dark'" />
		<SvgMoon v-else />
		{{ colorScheme === 'dark' ? 'Light Mode' : 'Dark Mode' }}
	</Button>
</template>
