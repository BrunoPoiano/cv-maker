<script setup lang="ts">
import { reactive } from 'vue'
import Header from './components/header.vue'
import Contact from './components/contact.vue'

import type { Curriculum } from './types'
import CurriculumModel from './components/curriculum/index.vue'
import { getDataFromLocalStorage, saveDataToLocalStorage } from './helpers/localstorage'
import { parseCurriculum } from './parsers/curriculum'

const curriculum = reactive<Curriculum>(
  getDataFromLocalStorage('curriculum', parseCurriculum, {
    Header: {
      UserName: '',
      Label: '',
    },
    Contact: {
      email: 'bruno.poiano@proton.me',
      linkedin: 'linkedin.com/in/brunopoiano/',
      github: 'github.com/BrunoPoiano',
    },
    Summary: [],
    CoreSkills: {
      languages: ['PHP (Laravel)', 'Go (familiar)', 'JavaScript', 'TypeScript', 'SQL'],
      apis: ['REST (design, consumption, integration)'],
      databases: ['MySQL', 'PostgreSQL (schema design, queries, optimization)'],
      frontend: ['React', 'Vue.js', 'HTML5', 'CSS3'],
      containers_devops: ['Docker', 'Linux'],
      practices: ['Code reviews', 'Git version control', 'testing', 'performance optimization'],
    },
    Experience: [],
  }),
)

function saveData() {
  console.log('aqui')
  console.log(curriculum)
  saveDataToLocalStorage('curriculum', curriculum)
}
</script>

<template>
  <h1>CV-Maker</h1>
  <div>
    <Header v-model:curriculum="curriculum" />
    <Contact v-model:curriculum="curriculum" />
    <button @click="saveData">save</button>
  </div>
  <CurriculumModel v-model:curriculum="curriculum" />
</template>

<style scoped>
h1 {
  text-align: Center;
}
</style>
