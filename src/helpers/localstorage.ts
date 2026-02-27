export function getDataFromLocalStorage<T>(
	key: string,
	parseFunction: (value: unknown) => T,
	initialValue: T
): T {
	const item = window.localStorage.getItem(key)

	if (item) {
		return parseFunction(JSON.parse(item))
	}

	window.localStorage.setItem(key, JSON.stringify(initialValue))

	return initialValue
}

export function saveDataToLocalStorage<T>(key: string, initialValue: T) {
	window.localStorage.setItem(key, JSON.stringify(initialValue))
}
