<script setup lang="ts">
import {
	getDataFromLocalStorage,
	saveDataToLocalStorage
} from '@/helpers/localstorage'
import Button from '@/ui/appButton.vue'
import { onBeforeMount, ref } from 'vue'

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
		{{ colorScheme === 'dark' ? 'Light Mode' : 'Dark Mode' }}
	</Button>
</template>
