import { ref } from 'vue'

import {
	getDataFromLocalStorage,
	saveDataToLocalStorage
} from '@/helpers/localstorage'
import { parseProfiles } from '@/parsers/profile'
import type { Profile } from '@/types'

const profiles = ref(
	getDataFromLocalStorage({
		key: 'profiles',
		parseFunction: parseProfiles,
		initialValue: [
			{
				id: 1,
				name: 'Admin'
			},
			{
				id: 2,
				name: 'User'
			}
		]
	})
)

export const ProfilesStore = {
	get() {
		return profiles
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
	}
}
