import { portfolio } from '@/lib/portfolio'

export function isHomeSectionVisible(navLabel: string | null): boolean {
	if (navLabel === null) {
		return true
	}

	const link = portfolio.nav.links.find((item) => item.label === navLabel)
	return link?.visible ?? false
}

export function getVisibleNavLinks() {
	return portfolio.nav.links.filter((link) => link.visible)
}
