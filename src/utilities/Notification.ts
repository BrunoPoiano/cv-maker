type Notification = {
	type?: 'error' | 'success' | 'primary'
	message: string
}

export function Notification({ message, type }: Notification) {
	const item = document.getElementById('app')!
	let notification = document.getElementById('notification')

	if (!notification) {
		notification = document.createElement('div')
		notification.id = 'notification'
	}

	switch (type) {
		case 'error': {
			notification.style = '--_background: var(--red)'
			break
		}
		case 'success': {
			notification.style = '--_background: var(--green)'
			break
		}
		case 'primary': {
			notification.style = '--_background: var(--blue)'
			break
		}
		case undefined: {
			notification.style = '--_background: var(--blue)'
			break
		}
		default: {
			notification.style = '--_background: var(--blue)'
			break
		}
	}

	notification.innerHTML = message

	item.appendChild(notification)
}
