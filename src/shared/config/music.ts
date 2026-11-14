import type { MusicPlayerLabels, MusicTrack } from 'svelte-ascii-ui';

export const roomTracks: MusicTrack[] = [
	{
		id: 'resident-evil-5-result',
		title: 'Result',
		artist: 'Resident Evil 5',
		src: '/audio/resident-evil-5-result.mp3'
	}
];

export const roomPlayerLabels: MusicPlayerLabels = {
	player: 'Музыкальный плеер',
	open: 'Открыть кассету',
	close: 'Закрыть кассету',
	play: 'Включить музыку',
	pause: 'Приостановить музыку',
	previous: 'Предыдущая песня',
	next: 'Следующая песня',
	shuffleOn: 'Включить случайный порядок',
	shuffleOff: 'Выключить случайный порядок',
	mute: 'Выключить звук',
	unmute: 'Включить звук',
	volume: 'Громкость',
	seek: 'Позиция в песне',
	progress: 'Прогресс воспроизведения',
	side: 'Сторона А',
	quiet: 'Тише',
	loud: 'Громче',
	empty: 'Нет песен',
	untitled: 'Без названия',
	error: 'Не удалось включить музыку.',
	retry: 'Попробовать снова',
	pauseMotion: 'Остановить анимацию кассеты',
	resumeMotion: 'Включить анимацию кассеты'
};
