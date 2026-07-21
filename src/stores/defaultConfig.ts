import { ref, watch } from 'vue'

import { DefaultConfigConst } from '@/constants/defaultConfig'
import { deepClone } from '@/helpers/clone'
import {
	getDataFromLocalStorage,
	saveDataToLocalStorage
} from '@/helpers/localstorage'
import { parseProfileDefaultConfig } from '@/parsers/profile'
import type { Contact } from '@/types'

import { ProfileIndexStore } from './profileIndexStore'
import { ProfilesStore } from './profileStore'

const defaultConfig = ref(
	getDataFromLocalStorage({
		initialValue: { 0: DefaultConfigConst() },
		parseFunction: parseProfileDefaultConfig,
		key: 'defaultConfig'
	})
)

const currentDefaultConfig = ref(
	defaultConfig.value[ProfileIndexStore.get().value]!
)

watch(ProfileIndexStore.get(), (newIndex) => {
	currentDefaultConfig.value = defaultConfig.value[newIndex]!
})

export const defaultConfigStore = {
	get() {
		return currentDefaultConfig
	},
	save() {
		defaultConfig.value[ProfileIndexStore.get().value] =
			currentDefaultConfig.value

		saveDataToLocalStorage({
			initialValue: defaultConfig.value,
			key: 'defaultConfig'
		})
	},
	setDefaultConfig(curriculumIndex: number) {
		defaultConfig.value[ProfileIndexStore.get().value] =
			currentDefaultConfig.value

		saveDataToLocalStorage({
			initialValue: defaultConfig.value,
			key: 'defaultConfig'
		})

		setDefaultConfigToCv(curriculumIndex)
	},
	setDefaultConfigToAll() {
		defaultConfig.value[ProfileIndexStore.get().value] =
			currentDefaultConfig.value

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
		const component = currentDefaultConfig.value.Settings.order[fromIndex]

		if (!component) {
			return
		}

		currentDefaultConfig.value.Settings.order.splice(fromIndex, 1)
		currentDefaultConfig.value.Settings.order.splice(toIndex, 0, component)

		defaultConfig.value[ProfileIndexStore.get().value] =
			currentDefaultConfig.value
	},
	moveContactOrder(fromIndex: number, toIndex: number) {
		const component = currentDefaultConfig.value.Contact.valueOrder[fromIndex]

		if (!component) {
			return
		}

		currentDefaultConfig.value.Contact.valueOrder.splice(fromIndex, 1)
		currentDefaultConfig.value.Contact.valueOrder.splice(toIndex, 0, component)

		defaultConfig.value[ProfileIndexStore.get().value] =
			currentDefaultConfig.value
	}
}

function setDefaultConfigToCv(curriculumIndex: number) {
	const curriculums = ProfilesStore.getCurriculums()

	if (!curriculums[curriculumIndex]) {
		return
	}

	curriculums[curriculumIndex].Settings.gap =
		currentDefaultConfig.value.Settings.gap
	curriculums[curriculumIndex].Settings.margin =
		currentDefaultConfig.value.Settings.margin
	curriculums[curriculumIndex].Settings.section = deepClone({
		obj: currentDefaultConfig.value.Settings.section
	})
	curriculums[curriculumIndex].Settings.order = deepClone({
		obj: currentDefaultConfig.value.Settings.order
	})

	curriculums[curriculumIndex].Header.UserName.align =
		currentDefaultConfig.value.Header.UserName.align
	curriculums[curriculumIndex].Header.UserName.size =
		currentDefaultConfig.value.Header.UserName.size

	curriculums[curriculumIndex].Header.Role.align =
		currentDefaultConfig.value.Header.Role.align
	curriculums[curriculumIndex].Header.Role.size =
		currentDefaultConfig.value.Header.Role.size

	curriculums[curriculumIndex].Contact.align =
		currentDefaultConfig.value.Contact.align
	curriculums[curriculumIndex].Contact.sideBySide =
		currentDefaultConfig.value.Contact.sideBySide
	curriculums[curriculumIndex].Contact.size =
		currentDefaultConfig.value.Contact.size

	curriculums[curriculumIndex].CoreSkills.show =
		currentDefaultConfig.value.CoreSkills.show
	curriculums[curriculumIndex].CoreSkills.sideBySide =
		currentDefaultConfig.value.CoreSkills.sideBySide
	curriculums[curriculumIndex].CoreSkills.size =
		currentDefaultConfig.value.CoreSkills.size

	curriculums[curriculumIndex].Summary.show =
		currentDefaultConfig.value.Summary.show
	curriculums[curriculumIndex].Summary.size =
		currentDefaultConfig.value.Summary.size

	curriculums[curriculumIndex].Experience.dateMonth =
		currentDefaultConfig.value.Experience.dateMonth
	curriculums[curriculumIndex].Experience.dateYear =
		currentDefaultConfig.value.Experience.dateYear
	curriculums[curriculumIndex].Experience.dateStyle =
		currentDefaultConfig.value.Experience.dateStyle
	curriculums[curriculumIndex].Experience.show =
		currentDefaultConfig.value.Experience.show
	curriculums[curriculumIndex].Experience.size = deepClone({
		obj: currentDefaultConfig.value.Experience.size
	})
	curriculums[curriculumIndex].Experience.sideBySide =
		currentDefaultConfig.value.Experience.sideBySide

	curriculums[curriculumIndex].AcademicBackground.dateMonth =
		currentDefaultConfig.value.AcademicBackground.dateMonth
	curriculums[curriculumIndex].AcademicBackground.dateStyle =
		currentDefaultConfig.value.AcademicBackground.dateStyle
	curriculums[curriculumIndex].AcademicBackground.show =
		currentDefaultConfig.value.AcademicBackground.show
	curriculums[curriculumIndex].AcademicBackground.size =
		currentDefaultConfig.value.AcademicBackground.size

	const newContact = {} as Contact['value']
	for (const item of currentDefaultConfig.value.Contact.valueOrder) {
		newContact[item] = curriculums[curriculumIndex].Contact.value[item]
	}
	curriculums[curriculumIndex].Contact.value = newContact
}
