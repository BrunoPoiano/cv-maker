import { Temporal } from '@js-temporal/polyfill'
import { ref } from 'vue'

import { CurriculumConst } from '@/constants/curriculum'
import { deepClone } from '@/helpers/clone'
import { generateKey } from '@/helpers/generateKey'
import {
	getDataFromLocalStorage,
	saveDataToLocalStorage
} from '@/helpers/localstorage'
import { parseCurriculum } from '@/parsers/curriculum'
import { parseProfiles } from '@/parsers/profile'
import type { Contact, Curriculum, Languages } from '@/types'
import { Notification } from '@/utilities/Notification'

import { CurriculumIndexStore } from './curriculumIndexStore'
import { ProfileIndexStore } from './profileIndexStore'

const profiles = ref(
	getDataFromLocalStorage({
		key: 'profiles',
		parseFunction: parseProfiles,
		initialValue: [
			{
				id: 1,
				name: 'Admin',
				curriculums: [
					deepClone({ obj: CurriculumConst(), parseFunction: parseCurriculum })
				]
			}
		]
	})
)

function currentCvLenght(profileIndex: number) {
	if (!profiles.value[profileIndex]) {
		return 0
	}
	return profiles.value[profileIndex].curriculums.length
}

export const ProfilesStore = {
	get() {
		return profiles
	},
	getCurriculums() {
		const profileIndex = ProfileIndexStore.get().value

		if (!profiles.value[profileIndex]) {
			return []
		}
		return profiles.value[profileIndex]?.curriculums || []
	},
	save() {
		saveDataToLocalStorage({ key: 'profiles', initialValue: profiles.value })
		Notification({ message: 'Profile Saved', type: 'success' })
	},
	add(name: string) {
		const id = (profiles.value[profiles.value.length - 1]?.id || 0) + 1

		profiles.value.push({
			id,
			name,
			curriculums: [
				deepClone({ obj: CurriculumConst(), parseFunction: parseCurriculum })
			]
		})

		this.save()
	},
	delete(profileIndex: number) {
		if (!profiles.value.length) return
		if (profileIndex === 0) return

		profiles.value.splice(profileIndex, 1)
		saveDataToLocalStorage({ key: 'profiles', initialValue: profiles.value })
		Notification({ message: 'Item Deleted', type: 'success' })
	},
	update(profileIndex: number, name: string) {
		profiles.value = profiles.value.map((item, index) => {
			if (index === profileIndex) {
				item = { ...item, name }
			}
			return item
		})
		saveDataToLocalStorage({ key: 'profiles', initialValue: profiles.value })
		Notification({ message: 'Item Updated', type: 'success' })
	},
	deleteCurriculum(curriculumIndex: number) {
		const profileIndex = ProfileIndexStore.get().value
		if (!profiles.value[profileIndex] || curriculumIndex === 0) {
			return
		}

		profiles.value[profileIndex].curriculums.splice(curriculumIndex, 1)
		CurriculumIndexStore.changeValue(false)
		Notification({ message: 'Curricullum deleted', type: 'success' })
	},
	newCurriculum() {
		const profileIndex = ProfileIndexStore.get().value

		if (!profiles.value[profileIndex]) {
			return
		}

		profiles.value[profileIndex].curriculums.push(CurriculumConst())
		const cvLenght = currentCvLenght(profileIndex)
		CurriculumIndexStore.changeValue(cvLenght - 1)
		Notification({ message: 'Curricullum added', type: 'success' })
	},
	copyCurriculum(curriculum: Curriculum) {
		const profileIndex = ProfileIndexStore.get().value
		if (!profiles.value[profileIndex]) {
			return
		}

		profiles.value[profileIndex].curriculums.push(
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

		const cvLenght = currentCvLenght(profileIndex)
		CurriculumIndexStore.changeValue(cvLenght - 1)
		Notification({ message: 'Curricullum copied', type: 'success' })
	},
	updateCurriculum(curriculumList: Curriculum[]) {
		const profileIndex = ProfileIndexStore.get().value
		if (!profiles.value[profileIndex]) {
			return
		}
		const cvLenght = currentCvLenght(profileIndex)

		profiles.value[profileIndex].curriculums.splice(
			0,
			cvLenght,
			...curriculumList
		)
		Notification({ message: 'Curricullum updated', type: 'success' })
	},
	addCurriculum(curriculum: Curriculum) {
		const profileIndex = ProfileIndexStore.get().value
		if (!profiles.value[profileIndex]) {
			return
		}
		profiles.value[profileIndex].curriculums.push(curriculum)
		CurriculumIndexStore.changeValue(currentCvLenght(profileIndex) - 1)
		Notification({ message: 'Curricullum added', type: 'success' })
	},
	setLanguageCurriculum(curriculumIndex: number, language: Languages) {
		const profileIndex = ProfileIndexStore.get().value
		if (
			!profiles.value[profileIndex] ||
			!profiles.value[profileIndex].curriculums[curriculumIndex]
		) {
			return
		}

		profiles.value[profileIndex].curriculums[
			curriculumIndex
		].Settings.language = language
	},
	setAsDefaultCurriculum(curriculumIndex: number) {
		const profileIndex = ProfileIndexStore.get().value
		if (
			!profiles.value[profileIndex] ||
			!profiles.value[profileIndex].curriculums[curriculumIndex]
		) {
			return
		}

		const cv = profiles.value[profileIndex].curriculums[curriculumIndex]

		profiles.value[profileIndex].curriculums.splice(curriculumIndex, 1)
		profiles.value[profileIndex].curriculums.unshift(cv)
		CurriculumIndexStore.changeValue(0)
		Notification({ message: 'Curricullum set as default', type: 'success' })
	},
	newExperience(curriculumIndex: number) {
		const profileIndex = ProfileIndexStore.get().value
		if (
			!profiles.value[profileIndex] ||
			!profiles.value[profileIndex].curriculums[0] ||
			!profiles.value[profileIndex].curriculums[curriculumIndex]
		) {
			return
		}

		profiles.value[profileIndex].curriculums[
			curriculumIndex
		].Experience.value.unshift({
			id: generateKey(5, 'number'),
			CompanyName: '',
			Role: '',
			StartDate: Temporal.Now.plainDateISO(),
			EndDate: null,
			Description: '',
			Remote: false
		})
	},
	deleteExperience(curriculumIndex: number, id: string) {
		const profileIndex = ProfileIndexStore.get().value
		if (
			!profiles.value[profileIndex] ||
			!profiles.value[profileIndex].curriculums[0] ||
			!profiles.value[profileIndex].curriculums[curriculumIndex]
		) {
			return
		}

		profiles.value[profileIndex].curriculums[curriculumIndex].Experience.value =
			profiles.value[profileIndex].curriculums[
				curriculumIndex
			].Experience.value.filter((item) => item.id !== id)

		Notification({ message: 'Experience Deleted', type: 'success' })
	},
	setExperienceDefaultValue(curriculumIndex: number) {
		const profileIndex = ProfileIndexStore.get().value
		if (
			!profiles.value[profileIndex] ||
			!profiles.value[profileIndex].curriculums[0] ||
			!profiles.value[profileIndex].curriculums[curriculumIndex]
		) {
			return
		}

		const defaultCv =
			profiles.value[profileIndex].curriculums[0].Experience.value

		profiles.value[profileIndex].curriculums[curriculumIndex].Experience.value =
			profiles.value[profileIndex].curriculums[
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
		const profileIndex = ProfileIndexStore.get().value
		if (
			!profiles.value[profileIndex] ||
			!profiles.value[profileIndex].curriculums[curriculumIndex] ||
			!profiles.value[profileIndex].curriculums[0]
		) {
			return
		}

		profiles.value[profileIndex].curriculums[curriculumIndex].Contact.value =
			profiles.value[profileIndex].curriculums[0].Contact.value
	},
	newCoreSkill(curriculumIndex: number, core: string) {
		const profileIndex = ProfileIndexStore.get().value
		if (
			!profiles.value[profileIndex] ||
			!profiles.value[profileIndex].curriculums[curriculumIndex]
		) {
			return
		}

		const newCore = core.replace(/\s/g, '_').toLowerCase()

		profiles.value[profileIndex].curriculums[curriculumIndex].CoreSkills.value[
			newCore
		] = []

		Notification({ message: 'New Core Skill Added', type: 'success' })
	},
	removeCoreSkill(curriculumIndex: number, core: string) {
		const profileIndex = ProfileIndexStore.get().value
		if (
			!profiles.value[profileIndex] ||
			!profiles.value[profileIndex].curriculums[curriculumIndex]
		) {
			return
		}

		if (
			!profiles.value[profileIndex].curriculums[curriculumIndex] ||
			!profiles.value[profileIndex].curriculums[curriculumIndex].CoreSkills
				.value[core]
		) {
			return
		}

		delete profiles.value[profileIndex].curriculums[curriculumIndex].CoreSkills
			.value[core]
		Notification({ message: 'Core Skill Deleted', type: 'success' })
	},
	moveCoreSkill(curriculumIndex: number, fromIndex: number, toIndex: number) {
		const profileIndex = ProfileIndexStore.get().value

		if (
			!profiles.value[profileIndex] ||
			!profiles.value[profileIndex].curriculums[curriculumIndex]
		) {
			return
		}

		const olderCoreSkill =
			profiles.value[profileIndex].curriculums[curriculumIndex].CoreSkills.value

		const order = Object.keys(
			profiles.value[profileIndex].curriculums[curriculumIndex].CoreSkills.value
		)

		const item = order[fromIndex]
		if (!item) {
			return
		}

		order.splice(fromIndex, 1)
		order.splice(toIndex, 0, item)

		const newCore: typeof olderCoreSkill = {}

		for (const item of order) {
			if (olderCoreSkill[item]) {
				newCore[item] = olderCoreSkill[item]
			}
		}

		profiles.value[profileIndex].curriculums[curriculumIndex].CoreSkills.value =
			newCore
	},
	moveAcademicSkill(
		curriculumIndex: number,
		fromIndex: number,
		toIndex: number
	) {
		const profileIndex = ProfileIndexStore.get().value

		if (
			!profiles.value[profileIndex] ||
			!profiles.value[profileIndex].curriculums[curriculumIndex] ||
			toIndex === -1
		) {
			return
		}

		const academic =
			profiles.value[profileIndex].curriculums[curriculumIndex]
				.AcademicBackground.value[fromIndex]

		if (!academic) {
			return
		}

		profiles.value[profileIndex].curriculums[
			curriculumIndex
		].AcademicBackground.value.splice(fromIndex, 1)

		profiles.value[profileIndex].curriculums[
			curriculumIndex
		].AcademicBackground.value.splice(toIndex, 0, academic)
	},
	newAcademicSkill(curriculumIndex: number) {
		const profileIndex = ProfileIndexStore.get().value
		if (
			!profiles.value[profileIndex] ||
			!profiles.value[profileIndex].curriculums[0] ||
			!profiles.value[profileIndex].curriculums[curriculumIndex]
		) {
			return
		}

		profiles.value[profileIndex].curriculums[
			curriculumIndex
		].AcademicBackground.value.unshift({
			id: generateKey(5, 'number'),
			Course: '',
			Diploma: '',
			Institution: '',
			StartDate: null,
			EndDate: null
		})
	},
	deleteAcademicSkill(curriculumIndex: number, id: string) {
		const profileIndex = ProfileIndexStore.get().value

		if (
			!profiles.value[profileIndex] ||
			!profiles.value[profileIndex].curriculums[curriculumIndex]
		) {
			return
		}

		const academic = profiles.value[profileIndex].curriculums[
			curriculumIndex
		].AcademicBackground.value.filter((item) => item.id !== id)

		profiles.value[profileIndex].curriculums[
			curriculumIndex
		].AcademicBackground.value = academic

		Notification({ message: 'Academic Skill Deleted', type: 'success' })
	},
	moveSettingsOrder(
		curriculumIndex: number,
		fromIndex: number,
		toIndex: number
	) {
		const profileIndex = ProfileIndexStore.get().value
		if (
			!profiles.value[profileIndex] ||
			!profiles.value[profileIndex].curriculums[curriculumIndex] ||
			toIndex === -1
		) {
			return
		}

		const component =
			profiles.value[profileIndex].curriculums[curriculumIndex].Settings.order[
				fromIndex
			]

		if (!component) {
			return
		}

		profiles.value[profileIndex].curriculums[
			curriculumIndex
		].Settings.order.splice(fromIndex, 1)
		profiles.value[profileIndex].curriculums[
			curriculumIndex
		].Settings.order.splice(toIndex, 0, component)
	},
	setAcademicDefaultValue(curriculumIndex: number) {
		const profileIndex = ProfileIndexStore.get().value
		if (
			!profiles.value[profileIndex] ||
			!profiles.value[profileIndex].curriculums[0] ||
			!profiles.value[profileIndex].curriculums[curriculumIndex]
		) {
			return
		}

		profiles.value[profileIndex].curriculums[
			curriculumIndex
		].AcademicBackground =
			profiles.value[profileIndex].curriculums[0].AcademicBackground
	},
	moveContactOrder(
		curriculumIndex: number,
		fromIndex: number,
		toIndex: number
	) {
		const profileIndex = ProfileIndexStore.get().value
		if (
			!profiles.value[profileIndex] ||
			!profiles.value[profileIndex].curriculums[curriculumIndex] ||
			toIndex === -1
		) {
			return
		}

		console.log({ curriculumIndex, fromIndex, toIndex })

		const olderContact =
			profiles.value[profileIndex].curriculums[curriculumIndex].Contact.value

		const order = Object.keys(
			profiles.value[profileIndex].curriculums[curriculumIndex].Contact.value
		) as Array<keyof Contact['value']>

		const item = order[fromIndex]
		console.log('order', order)
		if (!item) {
			return
		}

		order.splice(fromIndex, 1)
		order.splice(toIndex, 0, item)

		const newContact = {} as Contact['value']

		for (const item of order) {
			if (olderContact[item]) {
				newContact[item] = olderContact[item]
			}
		}

		profiles.value[profileIndex].curriculums[curriculumIndex].Contact.value =
			newContact
	}
}
