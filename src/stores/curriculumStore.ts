import { ref } from 'vue'

import { CurriculumConst } from '@/constants/curriculum'
import { deepClone } from '@/helpers/clone'
import {
	getDataFromLocalStorage,
	saveDataToLocalStorage
} from '@/helpers/localstorage'
import {
	parseCurriculum,
	parseCurriculumList,
	parseCurriculumToSave
} from '@/parsers/curriculum'
import type { Curriculum, Languages } from '@/types'

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
			initialValue: parseCurriculumToSave(curriculums.value)
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
	setLanguage(curriculumIndex: number, language: Languages) {
		if (!curriculums.value[curriculumIndex]) {
			return
		}

		curriculums.value[curriculumIndex].Settings.language = language
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
	setExperienceDefaultValue(curriculumIndex: number) {
		if (!curriculums.value[0] || !curriculums.value[curriculumIndex]) {
			return
		}

		const defaultCv = curriculums.value[0].Experience.value

		curriculums.value[curriculumIndex].Experience.value = curriculums.value[
			curriculumIndex
		].Experience.value.map((exp, index) => {
			if (!defaultCv[index]) {
				return exp
			}

			exp.CompanyName = defaultCv[index].CompanyName
			exp.StartDate = defaultCv[index].StartDate
			exp.EndDate = defaultCv[index].EndDate
			exp.Remote = defaultCv[index].Remote

			return exp
		})
	},
	setContactDefaultValue(curriculumIndex: number) {
		if (!curriculums.value[0] || !curriculums.value[curriculumIndex]) {
			return
		}

		curriculums.value[curriculumIndex].Contact.value =
			curriculums.value[0].Contact.value
	},
	newCoreSkill(curriculumIndex: number, core: string) {
		if (!curriculums.value[curriculumIndex]) {
			return
		}

		const newCore = core.replace(/\s/g, '_').toLowerCase()

		curriculums.value[curriculumIndex].CoreSkills.value[newCore] = []
	},
	removeCoreSkill(curriculumIndex: number, core: string) {
		if (
			!curriculums.value[curriculumIndex] ||
			!curriculums.value[curriculumIndex].CoreSkills.value[core]
		) {
			return
		}

		delete curriculums.value[curriculumIndex].CoreSkills.value[core]
	},
	moveCoreSkill(curriculumIndex: number, core: string, newIndex: number) {
		if (
			!curriculums.value[curriculumIndex] ||
			!curriculums.value[curriculumIndex].CoreSkills.value[core] ||
			newIndex === -1
		) {
			return
		}

		const entries = Object.entries(
			curriculums.value[curriculumIndex].CoreSkills.value
		)
		const currentIndex = entries.findIndex(([k]) => k === core)

		if (currentIndex === -1) return

		const [item] = entries.splice(currentIndex, 1)
		if (item) {
			entries.splice(newIndex, 0, item)
		}

		curriculums.value[curriculumIndex].CoreSkills.value =
			Object.fromEntries(entries)
	},
	moveAcademicSkill(
		curriculumIndex: number,
		fromIndex: number,
		toIndex: number
	) {
		if (!curriculums.value[curriculumIndex] || toIndex === -1) {
			return
		}

		const academic =
			curriculums.value[curriculumIndex].AcademicBackground.value[fromIndex]

		if (!academic) {
			return
		}

		curriculums.value[curriculumIndex].AcademicBackground.value.splice(
			fromIndex,
			1
		)
		curriculums.value[curriculumIndex].AcademicBackground.value.splice(
			toIndex,
			0,
			academic
		)
	},
	moveSettingsOrder(
		curriculumIndex: number,
		fromIndex: number,
		toIndex: number
	) {
		if (!curriculums.value[curriculumIndex] || toIndex === -1) {
			return
		}

		const component =
			curriculums.value[curriculumIndex].Settings.order[fromIndex]

		if (!component) {
			return
		}

		curriculums.value[curriculumIndex].Settings.order.splice(fromIndex, 1)
		curriculums.value[curriculumIndex].Settings.order.splice(
			toIndex,
			0,
			component
		)
	},
	setAcademicDefaultValue(curriculumIndex: number) {
		if (!curriculums.value[0] || !curriculums.value[curriculumIndex]) {
			return
		}

		curriculums.value[curriculumIndex].AcademicBackground =
			curriculums.value[0].AcademicBackground
	}
}
