import { NumberCheck } from '@/schemas/helpers'

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
}: DragAndDropProps) {
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

				const numCheck = NumberCheck.safeParse(item.dataset.index)
				dragging = numCheck.success ? numCheck.data : -1
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
		'dragend',
		() => {
			for (const div of area.children) {
				div.classList.remove('drag-highlight')
			}
			highlighted = null
		},
		{ signal }
	)

	area.addEventListener(
		'drop',
		() => {
			if (dragging < 0 || lastHovered < 0) {
				return
			}

			action(dragging, lastHovered)

			dragging = -1
			lastHovered = -1
			highlighted = null

			for (const div of area.children) {
				div.classList.remove('drag-highlight')
			}
		},
		{ signal }
	)

	let highlighted: HTMLElement | null = null
	area.addEventListener(
		'dragover',
		(e) => {
			e.preventDefault()
			const target = document
				.elementFromPoint(e.clientX, e.clientY)
				?.closest(`.${itemsClass}`) as HTMLElement | null

			if (!target) return

			if (target !== highlighted) {
				highlighted?.classList.remove('drag-highlight')
				highlighted = target
				highlighted.classList.add('drag-highlight')

				const numCheck = NumberCheck.safeParse(
					(target as HTMLElement).dataset.index
				)
				lastHovered = numCheck.success ? numCheck.data : -1
			}
		},
		{ signal }
	)

	return () => {
		controller.abort()
	}
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
