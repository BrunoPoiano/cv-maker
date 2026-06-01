import { ref } from 'vue'

import { DefaultConfigConst } from '@/constants/defaultConfig'
import {
	getDataFromLocalStorage,
	saveDataToLocalStorage
} from '@/helpers/localstorage'
import { parseDefaultConfig } from '@/parsers/curriculum'

import { CurriculumStore } from './curriculumStore'

const defaultConfig = ref(
	getDataFromLocalStorage({
		initialValue: DefaultConfigConst(),
		parseFunction: parseDefaultConfig,
		key: 'defaultConfig'
	})
)

export const defaultConfigStore = {
	get() {
		return defaultConfig
	},
	save() {
		saveDataToLocalStorage({
			initialValue: defaultConfig.value,
			key: 'defaultConfig'
		})
	},
	setDefaultConfig(curriculumIndex: number) {
		const curriculums = CurriculumStore.get()

		if (!curriculums.value[curriculumIndex]) {
			return
		}

		saveDataToLocalStorage({
			initialValue: defaultConfig.value,
			key: 'defaultConfig'
		})

		curriculums.value[curriculumIndex].Settings.gap =
			defaultConfig.value.Settings.gap
		curriculums.value[curriculumIndex].Settings.margin =
			defaultConfig.value.Settings.margin
		curriculums.value[curriculumIndex].Settings.section.size =
			defaultConfig.value.Settings.section.size

		curriculums.value[curriculumIndex].Header.UserName.align =
			defaultConfig.value.Header.UserName.align
		curriculums.value[curriculumIndex].Header.UserName.size =
			defaultConfig.value.Header.UserName.size

		curriculums.value[curriculumIndex].Header.Role.align =
			defaultConfig.value.Header.Role.align
		curriculums.value[curriculumIndex].Header.Role.size =
			defaultConfig.value.Header.Role.size

		curriculums.value[curriculumIndex].Contact.align =
			defaultConfig.value.Contact.align
		curriculums.value[curriculumIndex].Contact.sideBySide =
			defaultConfig.value.Contact.sideBySide
		curriculums.value[curriculumIndex].Contact.size =
			defaultConfig.value.Contact.size

		curriculums.value[curriculumIndex].CoreSkills.show =
			defaultConfig.value.CoreSkills.show
		curriculums.value[curriculumIndex].CoreSkills.sideBySide =
			defaultConfig.value.CoreSkills.sideBySide
		curriculums.value[curriculumIndex].CoreSkills.size =
			defaultConfig.value.CoreSkills.size

		curriculums.value[curriculumIndex].Summary.show =
			defaultConfig.value.Summary.show
		curriculums.value[curriculumIndex].Summary.size =
			defaultConfig.value.Summary.size

		curriculums.value[curriculumIndex].Experience.dateMonth =
			defaultConfig.value.Experience.dateMonth
		curriculums.value[curriculumIndex].Experience.dateStyle =
			defaultConfig.value.Experience.dateStyle
		curriculums.value[curriculumIndex].Experience.show =
			defaultConfig.value.Experience.show
		curriculums.value[curriculumIndex].Experience.size =
			defaultConfig.value.Experience.size
		curriculums.value[curriculumIndex].Experience.sideBySide =
			defaultConfig.value.Experience.sideBySide

		curriculums.value[curriculumIndex].AcademicBackground.dateMonth =
			defaultConfig.value.AcademicBackground.dateMonth
		curriculums.value[curriculumIndex].AcademicBackground.dateStyle =
			defaultConfig.value.AcademicBackground.dateStyle
		curriculums.value[curriculumIndex].AcademicBackground.show =
			defaultConfig.value.AcademicBackground.show
		curriculums.value[curriculumIndex].AcademicBackground.size =
			defaultConfig.value.AcademicBackground.size
	}
}
