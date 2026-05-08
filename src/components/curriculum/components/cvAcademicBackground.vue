<script setup lang="ts">
import { inject } from 'vue'

import ExDateInput from '@/components/menu/modals/experience/components/exDateInput.vue'
import { Translate } from '@/constants/translations'
import { generateAcademicTitle, generateDate } from '@/helpers/cvFormatters'
import { ProviderKey } from '@/keys'
import SvgPen from '@/svgs/SvgPen.vue'
import AppAnchor from '@/ui/appAnchor.vue'
import AppButton from '@/ui/appButton.vue'
import AppInput from '@/ui/appInput.vue'

import Title from './cvTitle.vue'

const { curriculum, readonly } = inject(ProviderKey)!
</script>

<template>
	<div
		v-if="
			curriculum.AcademicBackground.show &&
			curriculum.AcademicBackground.value.length
		"
	>
		<AppAnchor>
			<Title :fontsize="curriculum.Settings.section.size">{{
				Translate['academic background'][curriculum.Settings.language]
			}}</Title>
			<div class="academic">
				<div
					v-for="acBack in curriculum.AcademicBackground.value"
					:key="acBack.id"
				>
					<div class="aca-title">
						<span
							class="title"
							:style="{
								fontSize: `var(${curriculum.AcademicBackground.size})`
							}"
						>
							<template v-if="readonly">
								{{ generateAcademicTitle(acBack) }}
							</template>
							<div class="inputs" v-else>
								<AppInput
									v-model="acBack.Institution"
									cv-input
									placeholder="Institution"
								/>
								<AppInput
									v-model="acBack.Diploma"
									cv-input
									placeholder="Diploma"
								/>
								<AppInput
									v-model="acBack.Course"
									cv-input
									placeholder="Course"
								/>
							</div>
						</span>
						<span
							class="sub-title"
							:style="{
								fontSize: `var(${curriculum.AcademicBackground.size})`
							}"
						>
							<template v-if="!readonly">
								<div class="date">
									<ExDateInput
										data-cvInput
										type="date"
										placeholder="Start Date"
										v-model="acBack.StartDate"
									/>
									<ExDateInput
										data-cvInput
										type="date"
										placeholder="EndDate"
										v-model="acBack.EndDate"
									/>
								</div>
							</template>

							<span v-else>
								{{
									generateDate({
										source: acBack,
										language: curriculum.Settings.language,
										dateFormat: curriculum.AcademicBackground.dateMonth,
										showPresent: false,
										range: curriculum.AcademicBackground.dateStyle === 'range'
									})
								}}
							</span>
						</span>
					</div>
				</div>
			</div>
			<template #button>
				<AppButton icon-button modal id="ModalCvAcademic">
					<SvgPen />
				</AppButton>
			</template>
		</AppAnchor>
	</div>
</template>

<style scoped>
.academic {
	display: grid;
	gap: calc((var(--_a4-gap) * 0.4));

	.aca-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;

		letter-spacing: 0.06em;

		.title,
		.sub-title {
			color: light-dark(#000, #fff);
			display: block;
			text-transform: capitalize;
			font-size: var(--font-size-base);
			font-weight: var(--font-weight);

			text-box-trim: trim-end;
			text-box-edge: cap alphabetic;
		}

		.title {
			margin-bottom: 0;

			.inputs {
				display: grid;
				grid-template-columns: auto 1fr;
				gap: 1ch;
			}
		}

		.sub-title {
			color: var(--on-surface-variant);
			display: flex;
			align-items: center;
			gap: 0.5ch;

			> span {
				text-box-trim: trim-both;
				text-box-edge: cap alphabetic;
			}

			.date {
				display: grid;
				grid-template-columns: auto 1fr;
				gap: 1ch;
			}
		}
	}
}

@supports not (text-box-edge: cap alphabetic) {
	.academic .aca-title .title {
		margin-bottom: 0px !important;
	}
}
</style>
