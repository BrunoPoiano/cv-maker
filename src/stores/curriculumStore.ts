import { ref } from 'vue'

import { CurriculumConst } from '@/constants/curriculum'
import { deepClone } from '@/helpers/clone'
import {
	getDataFromLocalStorage,
	saveDataToLocalStorage
} from '@/helpers/localstorage'
import { parseCurriculum, parseCurriculumList } from '@/parsers/curriculum'
import type { Curriculum } from '@/types'

import { CurriculumIndexStore } from './curriculumIndexStore'

const curriculums = ref(
	getDataFromLocalStorage({
		key: 'curriculumList',
		parseFunction: parseCurriculumList,
		initialValue: [
			deepClone({ obj: CurriculumConst(), parseFunction: parseCurriculum })
		]
	})
)

export const CurriculumStore = {
	get() {
		return curriculums
	},
	save() {
		saveDataToLocalStorage({
			key: 'curriculumList',
			initialValue: curriculums.value
		})
	},
	delete(curriculumIndex: number) {
		if (!curriculums.value.length) return
		if (curriculumIndex === 0) return

		curriculums.value.splice(curriculumIndex, 1)
		CurriculumIndexStore.changeValue(false)
	},
	new() {
		curriculums.value.push(CurriculumConst())
		CurriculumIndexStore.changeValue(curriculums.value.length - 1)
	},
	copy(curriculum: Curriculum) {
		curriculums.value.push(
			deepClone({
				obj: {
					...curriculum,
					Header: {
						...curriculum.Header,
						UserName: {
							...curriculum.Header.UserName,
							value: `${curriculum.Header.UserName.value} Copy`
						}
					}
				}
			})
		)
		CurriculumIndexStore.changeValue(curriculums.value.length - 1)
	},
	update(curriculumList: Curriculum[]) {
		curriculums.value.splice(0, curriculums.value.length, ...curriculumList)
	},
	add(curriculum: Curriculum) {
		curriculums.value.push(curriculum)
		CurriculumIndexStore.changeValue(curriculums.value.length - 1)
	},
	setAsDefault(curriculumIndex: number) {
		if (!curriculums.value[curriculumIndex]) {
			return
		}

		const cv = curriculums.value[curriculumIndex]

		curriculums.value.splice(curriculumIndex, 1)
		curriculums.value.unshift(cv)
		CurriculumIndexStore.changeValue(0)
	},
	newCoreSkill(curriculumIndex: number, core: string) {
		if (!curriculums.value[curriculumIndex]) {
			return
		}

		const newCore = core.replace(/\s/g, '_').toLowerCase()

		curriculums.value[curriculumIndex].CoreSkills.skills[newCore] = []
	},
	removeCoreSkill(curriculumIndex: number, core: string) {
		if (
			!curriculums.value[curriculumIndex] ||
			!curriculums.value[curriculumIndex].CoreSkills.skills[core]
		) {
			return
		}

		delete curriculums.value[curriculumIndex].CoreSkills.skills[core]
	},
	moveCoreSkill(curriculumIndex: number, core: string, newIndex: number) {
		if (
			!curriculums.value[curriculumIndex] ||
			!curriculums.value[curriculumIndex].CoreSkills.skills[core] ||
			newIndex === -1
		) {
			return
		}

		const entries = Object.entries(
			curriculums.value[curriculumIndex].CoreSkills.skills
		)
		const currentIndex = entries.findIndex(([k]) => k === core)

		if (currentIndex === -1) return

		const [item] = entries.splice(currentIndex, 1)
		if (item) {
			entries.splice(newIndex, 0, item)
		}

		curriculums.value[curriculumIndex].CoreSkills.skills =
			Object.fromEntries(entries)
	}
}
