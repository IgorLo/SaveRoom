export const profile = {
	name: 'Игорь',
	greeting: 'Hello, world!',
	description:
		'Привет, меня зовут Игорь. На этом сайте будет список моих проектов, которые я навайбкодил или сделал сам. Многие текста пока от нейронки, а не рукописные, так как я всё ещё работаю над этой страницей и еще не успел вкатиться в полноценный постинг. Welcome and have a nice life.',
	avatar: '/images/profile/igor.png',
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
