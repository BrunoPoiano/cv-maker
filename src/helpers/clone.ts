type DeepCloneProps<T> = {
	obj: T
	parseFunction?: (value: unknown) => T
}

export function deepClone<T>({ obj, parseFunction }: DeepCloneProps<T>): T {
	const parsed = JSON.parse(JSON.stringify(obj))
	return parseFunction ? parseFunction(parsed) : (parsed as T)
}
