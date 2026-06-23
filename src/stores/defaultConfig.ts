import { ref } from 'vue'

import { DefaultConfigConst } from '@/constants/defaultConfig'
import { deepClone } from '@/helpers/clone'
import {
	getDataFromLocalStorage,
	saveDataToLocalStorage
} from '@/helpers/localstorage'
import { parseDefaultConfig } from '@/parsers/curriculum'

import { ProfilesStore } from './profileStore'

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
		saveDataToLocalStorage({
			initialValue: defaultConfig.value,
			key: 'defaultConfig'
		})

		setDefaultConfigToCv(curriculumIndex)
	},
	setDefaultConfigToAll() {
		saveDataToLocalStorage({
			initialValue: defaultConfig.value,
			key: 'defaultConfig'
		})

		const curriculums = ProfilesStore.getCurriculums().length
		for (let i = 0; i < curriculums; i++) {
			setDefaultConfigToCv(i)
		}
	},
	moveSettingsOrder(fromIndex: number, toIndex: number) {
		const component = defaultConfig.value.Settings.order[fromIndex]

		if (!component) {
			return
		}

		defaultConfig.value.Settings.order.splice(fromIndex, 1)
		defaultConfig.value.Settings.order.splice(toIndex, 0, component)
	}
}

function setDefaultConfigToCv(curriculumIndex: number) {
	const curriculums = ProfilesStore.getCurriculums()

	if (!curriculums[curriculumIndex]) {
		return
	}

	curriculums[curriculumIndex].Settings.gap = defaultConfig.value.Settings.gap
	curriculums[curriculumIndex].Settings.margin =
		defaultConfig.value.Settings.margin
	curriculums[curriculumIndex].Settings.section = deepClone({
		obj: defaultConfig.value.Settings.section
	})
	curriculums[curriculumIndex].Settings.order = deepClone({
		obj: defaultConfig.value.Settings.order
	})

	curriculums[curriculumIndex].Header.UserName.align =
		defaultConfig.value.Header.UserName.align
	curriculums[curriculumIndex].Header.UserName.size =
		defaultConfig.value.Header.UserName.size

	curriculums[curriculumIndex].Header.Role.align =
		defaultConfig.value.Header.Role.align
	curriculums[curriculumIndex].Header.Role.size =
		defaultConfig.value.Header.Role.size

	curriculums[curriculumIndex].Contact.align = defaultConfig.value.Contact.align
	curriculums[curriculumIndex].Contact.sideBySide =
		defaultConfig.value.Contact.sideBySide
	curriculums[curriculumIndex].Contact.size = defaultConfig.value.Contact.size

	curriculums[curriculumIndex].CoreSkills.show =
		defaultConfig.value.CoreSkills.show
	curriculums[curriculumIndex].CoreSkills.sideBySide =
		defaultConfig.value.CoreSkills.sideBySide
	curriculums[curriculumIndex].CoreSkills.size =
		defaultConfig.value.CoreSkills.size

	curriculums[curriculumIndex].Summary.show = defaultConfig.value.Summary.show
	curriculums[curriculumIndex].Summary.size = defaultConfig.value.Summary.size

	curriculums[curriculumIndex].Experience.dateMonth =
		defaultConfig.value.Experience.dateMonth
	curriculums[curriculumIndex].Experience.dateStyle =
		defaultConfig.value.Experience.dateStyle
	curriculums[curriculumIndex].Experience.show =
		defaultConfig.value.Experience.show
	curriculums[curriculumIndex].Experience.size = deepClone({
		obj: defaultConfig.value.Experience.size
	})
	curriculums[curriculumIndex].Experience.sideBySide =
		defaultConfig.value.Experience.sideBySide

	curriculums[curriculumIndex].AcademicBackground.dateMonth =
		defaultConfig.value.AcademicBackground.dateMonth
	curriculums[curriculumIndex].AcademicBackground.dateStyle =
		defaultConfig.value.AcademicBackground.dateStyle
	curriculums[curriculumIndex].AcademicBackground.show =
		defaultConfig.value.AcademicBackground.show
	curriculums[curriculumIndex].AcademicBackground.size =
		defaultConfig.value.AcademicBackground.size
}
