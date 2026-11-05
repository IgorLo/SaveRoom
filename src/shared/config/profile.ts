export const profile = {
	name: 'Игорь',
	greeting: 'Привет, я Игорь.',
	description:
		'Делаю штуки в интернете. Иногда полезные, иногда просто потому, что захотелось. Здесь собираю свои проекты, эксперименты и маленькие поводы для гордости.',
	avatar: '/images/projects/vda-everyday/cover.webp',
	links: [
		{ label: 'YouTube / Kokojamba', href: 'https://www.youtube.com/@KokojambaTV' },
		{
			label: 'YouTube / Бложик',
			href: 'https://www.youtube.com/@%D0%9B%D0%B0%D0%BC%D0%BF%D0%BE%D0%B2%D1%8B%D0%B9%D0%91%D0%BB%D0%BE%D0%B6%D0%B8%D0%BA'
		},
		{ label: 'GitHub / IgorLo', href: 'https://github.com/IgorLo' },
		{ label: 'GitHub / GameDev', href: 'https://github.com/GameDevCompanyName' },
		{ label: 'Steam', href: 'https://steamcommunity.com/id/MOZGOMET' }
	]
};
export type Profile = typeof profile;
