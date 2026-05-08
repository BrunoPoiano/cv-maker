import CvAcademicBackground from '@/components/curriculum/components/cvAcademicBackground.vue'
import CvContact from '@/components/curriculum/components/cvContact.vue'
import CvCoreSkills from '@/components/curriculum/components/cvCoreSkills.vue'
import CvExperience from '@/components/curriculum/components/cvExperience.vue'
import CvHeader from '@/components/curriculum/components/cvHeader.vue'
import CvSummary from '@/components/curriculum/components/cvSummary.vue'
import type { CurriculumOrder } from '@/types'

export const curriculumOrder: CurriculumOrder = {
	Header: CvHeader,
	Contact: CvContact,
	Summary: CvSummary,
	CoreSkills: CvCoreSkills,
	Experience: CvExperience,
	AcademicBackground: CvAcademicBackground
}

export const curriculumOrderArray = Object.keys(curriculumOrder) as Array<
	keyof Omit<CurriculumOrder, 'Settings'>
>
