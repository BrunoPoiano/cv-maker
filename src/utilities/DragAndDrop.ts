import { isNumberOrDefault } from '@/parsers/typeValidation'

type DragAndDropProps = {
	areaId: string
	itemsList: Array<string>
	idPrefix: string
	itemsClass: string
	action: (fromIndex: number, toIndex: number) => void
	dragImageWidth?: CSSStyleDeclaration['width']
}

export function DragAndDrop({
	areaId,
	itemsList,
	idPrefix,
	itemsClass,
	action,
	dragImageWidth
}: DragAndDropProps): AbortController {
	const controller = new AbortController()
	const { signal } = controller

	const area = document.getElementById(areaId)!
	let dragging = -1
	let lastHovered = -1

	for (const el of itemsList) {
		const item = document.getElementById(`${idPrefix}${el}`)
		if (!item) continue

		const dragHandle = item.querySelector('[data-drag-handle]') as HTMLElement

		if (!dragHandle) continue

		dragHandle.addEventListener(
			'dragstart',
			(el) => {
				const dragImage = createDragImage(item, dragImageWidth)
				document.body.appendChild(dragImage)

				dragging = isNumberOrDefault(item.dataset.index, -1)
				el.dataTransfer?.setDragImage(dragImage, 100, 20)

				dragHandle.addEventListener('dragend', () => dragImage.remove(), {
					once: true,
					signal
				})
			},
			{ signal }
		)
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

			for (const div of area.children) {
				div.classList.remove('drag-highlight')
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

			if (!item) return

			item.classList.add('drag-highlight')
			lastHovered = isNumberOrDefault((item as HTMLElement).dataset.index, -1)

			item.addEventListener(
				'dragleave',
				() => item.classList.remove('drag-highlight'),
				{ once: true, signal }
			)
		},
		{ signal }
	)

	return controller
}

function createDragImage(
	item: HTMLElement,
	dragImageWidth?: CSSStyleDeclaration['width']
) {
	const image = item.cloneNode(true) as HTMLElement
	image.classList.add('dragging')
	image.style.position = 'absolute'
	image.style.zIndex = '-10000'
	if (dragImageWidth) {
		image.style.maxWidth = dragImageWidth
		image.style.width = '100%'
	}

	return image
}
