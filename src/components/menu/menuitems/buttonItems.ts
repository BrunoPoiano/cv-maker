import { CurriculumStore } from '@/stores/curriculumStore'
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
			click: CurriculumStore.save,
			hoverBackground: 'var(--green)',
			title: 'Save Curriculums',
			svg: SvgSave
		},
		{
			click: () => CurriculumStore.copy(curriculum),
			hoverBackground: 'var(--blue)',
			title: 'Copy Curriculum',
			svg: SvgCopy
		},
		{
			click: CurriculumStore.new,
			hoverBackground: 'var(--green)',
			title: 'New Curriculum',
			svg: SvgNewDocument
		},

		{
			click: () => CurriculumStore.setAsDefault(curriculumIndex),
			hoverBackground: 'var(--green)',
			title: 'Set Curriculum as default',
			disabled: curriculumIndex === 0,
			svg: SvgPin
		},
		{
			click: () => CurriculumStore.delete(curriculumIndex),
			disabled: curriculumIndex === 0,
			hoverBackground: 'var(--red)',
			title: 'Delete Curriculum',
			svg: SvgTrash
		}
	]
}
