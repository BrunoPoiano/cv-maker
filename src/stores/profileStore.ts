import { ref } from 'vue'

import { CurriculumConst } from '@/constants/curriculum'
import { deepClone } from '@/helpers/clone'
import {
	getDataFromLocalStorage,
	saveDataToLocalStorage
} from '@/helpers/localstorage'
import { parseCurriculum } from '@/parsers/curriculum'
import { parseProfiles } from '@/parsers/profile'
import type { Curriculum, Languages, Profile } from '@/types'

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
			},
			{
				id: 2,
				name: 'User',
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
	},
	add(profile: Profile) {
		profiles.value.push(profile)
		this.save()
	},
	delete(profileIndex: number) {
		if (!profiles.value.length) return
		if (profileIndex === 0) return

		profiles.value.splice(profileIndex, 1)
		this.save()
	},
	update(profile: Profile) {
		profiles.value = profiles.value.map((item) => {
			if (item.id === profile.id) {
				item = profile
			}
			return item
		})
		this.save()
	},
	deleteCurriculum(curriculumIndex: number) {
		const profileIndex = ProfileIndexStore.get().value
		if (!profiles.value[profileIndex] || curriculumIndex === 0) {
			return
		}

		profiles.value[profileIndex].curriculums.splice(curriculumIndex, 1)
		CurriculumIndexStore.changeValue(false)
	},
	newCurriculum() {
		const profileIndex = ProfileIndexStore.get().value

		if (!profiles.value[profileIndex]) {
			return
		}

		profiles.value[profileIndex].curriculums.push(CurriculumConst())
		const cvLenght = currentCvLenght(profileIndex)
		console.log({ cvLenght })
		CurriculumIndexStore.changeValue(cvLenght - 1)
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
	},
	addCurriculum(curriculum: Curriculum) {
		const profileIndex = ProfileIndexStore.get().value
		if (!profiles.value[profileIndex]) {
			return
		}
		profiles.value[profileIndex].curriculums.push(curriculum)
		CurriculumIndexStore.changeValue(currentCvLenght(profileIndex) - 1)
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
	},
	moveCoreSkill(curriculumIndex: number, core: string, newIndex: number) {
		const profileIndex = ProfileIndexStore.get().value
		if (
			!profiles.value[profileIndex] ||
			!profiles.value[profileIndex].curriculums[curriculumIndex] ||
			!profiles.value[profileIndex].curriculums[curriculumIndex].CoreSkills
				.value[core] ||
			newIndex === -1
		) {
			return
		}

		const entries = Object.entries(
			profiles.value[profileIndex].curriculums[curriculumIndex].CoreSkills.value
		)
		const currentIndex = entries.findIndex(([k]) => k === core)

		if (currentIndex === -1) return

		const [item] = entries.splice(currentIndex, 1)
		if (item) {
			entries.splice(newIndex, 0, item)
		}

		profiles.value[profileIndex].curriculums[curriculumIndex].CoreSkills.value =
			Object.fromEntries(entries)
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
	}
}
