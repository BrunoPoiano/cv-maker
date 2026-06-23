import { isNumberOrDefault } from '@/parsers/typeValidation'

type DragAndDropProps = {
	areaId: string
	itemsList: Array<string>
	idPrefix: string
	itemsClass: string
	action: (fromIndex: number, toIndex: number) => void
}

export function DragAndDrop({
	areaId,
	itemsList,
	idPrefix,
	itemsClass,
	action
}: DragAndDropProps): AbortController {
	const controller = new AbortController()
	const { signal } = controller

	const area = document.getElementById(areaId)!
	let dragging = -1
	let lastHovered = -1

	for (const el of itemsList) {
		const item = document.getElementById(`${idPrefix}${el}`)
		if (item) {
			item.addEventListener(
				'dragstart',
				(el) => {
					const dragImage = item.cloneNode(true) as HTMLElement
					dragImage.classList.add('dragging')
					dragImage.style.position = 'absolute'
					dragImage.style.zIndex = '-10000'
					document.body.appendChild(dragImage)

					const target = el.target as HTMLElement
					dragging = isNumberOrDefault(target.dataset.index, -1)
					el.dataTransfer?.setDragImage(dragImage, 100, 20)

					item.addEventListener('dragend', () => dragImage.remove(), {
						once: true,
						signal
					})
				},
				{ signal }
			)
		}
	}

	area.addEventListener(
		'drop',
		() => {
			if (dragging < 0 || lastHovered < 0) {
				return
			}

			action(dragging, lastHovered)

			dragging = -1
			lastHovered = -1

			for (const el of itemsList) {
				document
					.getElementById(`${idPrefix}${el}`)
					?.classList.remove('drag-highlight')
			}
		},
		{ signal }
	)

	area.addEventListener(
		'dragover',
		(e) => {
			e.preventDefault()
			const target = document.elementFromPoint(
				e.clientX,
				e.clientY
			) as HTMLElement | null

			if (!target) return

			const item = target.closest(`.${itemsClass}`)

			if (item) {
				item.classList.add('drag-highlight')
				lastHovered = isNumberOrDefault((item as HTMLElement).dataset.index, -1)

				item.addEventListener(
					'dragleave',
					() => item.classList.remove('drag-highlight'),
					{ signal }
				)
			}
		},
		{ signal }
	)

	return controller
}
