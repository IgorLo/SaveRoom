export function formatDate(value: string): string {
	return new Intl.DateTimeFormat('ru-RU', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC'
	}).format(new Date(`${value}T00:00:00Z`));
}
