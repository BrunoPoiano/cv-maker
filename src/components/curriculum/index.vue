<script setup lang="ts">
import type { Curriculum } from '@/types'
import Header from './components/header.vue'
import Contact from './components/contact.vue'
import Experience from './components/experience.vue'
import Summary from './components/summary.vue'
import CoreSkills from './components/coreSkills.vue'
</script>

<template>
  <div class="a4-page" id="curriculumPage">
    <Header />
    <Contact />
    <Summary />
    <CoreSkills />
    <Experience />
  </div>
</template>

<style>
.a4-page {
  --light-color: #65615f;
  --font-weight: 400;

  display: grid;
  place-content: start;

  gap: 0.8rem;

  min-height: 100vh;

  width: 210mm;
  height: 297mm;
  padding: 3mm;
  margin-inline: auto;
  margin-top: 4rem;

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  background-color: #ffffff;

  font-family: 'EB Garamond', serif;
}
</style>
