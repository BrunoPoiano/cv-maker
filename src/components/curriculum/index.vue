<script setup lang="ts">
import type { Curriculum } from '@/types'
import Header from './components/header.vue'
import Contact from './components/contact.vue'
import Experience from './components/experience.vue'
import Summary from './components/summary.vue'
import CoreSkills from './components/coreSkills.vue'
import { h, inject } from 'vue'
import { BolderKey } from '@/main'
import type { JsxFragment } from 'typescript'

const bolderValue = inject<string[]>(BolderKey)!

function boldMatches(value: string): string {
	if (!bolderValue.length) return value

	const escaped = bolderValue.map((t) =>
		t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
	)

	const regex = new RegExp(`(${escaped.join('|')})`, 'gi')

	return value.replace(regex, '<b>$1</b>')
}
</script>

<template>
	<div class="a4-page page" id="curriculumPage">
		<Header />
		<Contact />
		<Summary :boldMatches="boldMatches" />
		<CoreSkills :boldMatches="boldMatches" />
		<Experience :boldMatches="boldMatches" />
	</div>
</template>

<style>
.a4-page {
	--_a4-gap: 0.8rem;

	width: 21cm;
	min-height: 29.7cm;

	display: grid;
	place-content: start;
	gap: var(--_a4-gap);

	padding: 0.8cm 0px 0.8cm 0.8cm;
	margin-inline: auto;
	margin-top: 4rem;

	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	box-sizing: border-box;

	background-color: #ffffff;

	font-family: 'EB Garamond', serif;

	border: 1px #d3d3d3 solid;
	border-radius: 5px;
}
</style>
