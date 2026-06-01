export const HOME_SECTIONS = [
	{ id: 'hero', navLabel: null },
	{ id: 'about', navLabel: 'About' },
	{ id: 'experience', navLabel: 'Experience' },
	{ id: 'education', navLabel: 'Education' },
	{ id: 'projects', navLabel: 'Projects' },
	{ id: 'insights', navLabel: 'Insights' },
	{ id: 'contact', navLabel: 'Contact' },
] as const

export type HomeSectionId = (typeof HOME_SECTIONS)[number]['id']
