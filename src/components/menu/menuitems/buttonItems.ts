import { ProfilesStore } from '@/stores/profileStore'
import SvgCopy from '@/svgs/svgCopy.vue'
import SvgNewDocument from '@/svgs/svgNewDocument.vue'
import SvgPin from '@/svgs/svgPin.vue'
import SvgSave from '@/svgs/svgSave.vue'
import SvgTrash from '@/svgs/svgTrash.vue'
import type { Curriculum, MenuButtonList } from '@/types'

export function buttonItemsList(
	curriculum: Curriculum,
	curriculumIndex: number
): MenuButtonList[] {
	return [
		{
			click: ProfilesStore.save,
			hoverBackground: 'var(--green)',
			title: 'Save Curriculums',
			svg: SvgSave
		},
		{
			click: () => ProfilesStore.copyCurriculum(curriculum),
			hoverBackground: 'var(--blue)',
			title: 'Copy Curriculum',
			svg: SvgCopy
		},
		{
			click: ProfilesStore.newCurriculum,
			hoverBackground: 'var(--green)',
			title: 'New Curriculum',
			svg: SvgNewDocument
		},

		{
			click: () => ProfilesStore.setAsDefaultCurriculum(curriculumIndex),
			hoverBackground: 'var(--green)',
			title: 'Set Curriculum as default',
			disabled: curriculumIndex === 0,
			svg: SvgPin
		},
		{
			click: () => ProfilesStore.deleteCurriculum(curriculumIndex),
			disabled: curriculumIndex === 0,
			hoverBackground: 'var(--red)',
			title: 'Delete Curriculum',
			svg: SvgTrash
		}
	]
}
