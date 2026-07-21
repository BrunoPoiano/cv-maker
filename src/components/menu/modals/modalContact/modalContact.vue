<script setup lang="ts">
import { inject } from 'vue'

import { ProviderKey } from '@/keys'
import AppInput from '@/ui/appInput.vue'
import Modal from '@/ui/appModal.vue'

import ContactForm from './components/contactForm.vue'
import ContactOptions from './components/contactOptions.vue'

const { curriculum } = inject(ProviderKey)!
type Props = {
	id: string
}

const { id } = defineProps<Props>()
</script>

<template>
	<Modal :id="id" closeLabel="close" minWidth="35rem" v-if="curriculum">
		<template #header>
			<div class="header">
				<h3>Contact</h3>
				<AppInput
					type="checkbox"
					label="Side by Side"
					v-model="curriculum.Contact.sideBySide"
				/>
			</div>
		</template>
		<form>
			<ContactOptions />
			<div id="contactsValuesOrder">
				<template
					v-for="(_, type, index) in curriculum.Contact.value"
					:key="type"
				>
					<ContactForm :index="index" :type="type" />
				</template>
			</div>
		</form>
	</Modal>
</template>

<style scoped>
@layer utilities {
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	form {
		display: grid;
		gap: 1rem;

		#contactsValuesOrder {
			display: grid;
			gap: 1rem;
		}
	}
}
</style>
