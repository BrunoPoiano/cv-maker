export function generateKey(length = 5, type?: 'number' | 'string'): string {
	let len = length

	if (len < 5) {
		len += 5
	} else if (len > 10) {
		len = 10
	}

	let char = 'abcdefghijklmnopqrstuvwxyz123456789!@#$%^&^*('

	switch (type) {
		case 'string':
			char = 'abcdefghijklmnopqrstuvwxyz'
			break
		case 'number':
			char = '123456789'
	}

	let result = ''
	for (let i = 0; i < len; i++) {
		result += char.charAt(Math.floor(Math.random() * char.length))
	}
	return result
}
