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
	}
}
