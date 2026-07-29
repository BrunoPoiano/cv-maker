import { Temporal } from '@js-temporal/polyfill'

export function isValidDateOrNull(value: unknown): Temporal.PlainDate | null {
	if (value instanceof Temporal.PlainDate) {
		return value
	}

	if (typeof value === 'string') {
		if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
			return Temporal.PlainDate.from(value)
		}

		const instant = Temporal.Instant.from(value)
		return instant.toZonedDateTimeISO('UTC').toPlainDate()
	}

	return null
}
