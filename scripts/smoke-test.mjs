// Post-build checks on dist/: required files, SEO tags and internal links.
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const dist = new URL('../dist/', import.meta.url).pathname
const errors = []
const read = (file) => readFileSync(join(dist, file), 'utf8')

for (const file of [
	'index.html',
	'404.html',
	'robots.txt',
	'sitemap-index.xml',
	'site.webmanifest',
	'apple-touch-icon.png',
	'images/og-card.png',
]) {
	if (!existsSync(join(dist, file))) errors.push(`missing dist/${file}`)
}

const robots = read('robots.txt')
if (!robots.includes('sitemap-index.xml')) {
	errors.push('robots.txt does not reference the sitemap')
}

const htmlFiles = []
const walk = (dir) => {
	for (const entry of readdirSync(join(dist, dir), { withFileTypes: true })) {
		const rel = join(dir, entry.name)
		if (entry.isDirectory()) walk(rel)
		else if (entry.name.endsWith('.html')) htmlFiles.push(rel)
	}
}
walk('.')

const resolves = (path) => {
	const clean = decodeURIComponent(path.split('#')[0].split('?')[0])
	if (!clean || clean === '/') return true
	const rel = clean.replace(/^\//, '')
	return [rel, `${rel}.html`, join(rel, 'index.html')].some((candidate) =>
		existsSync(join(dist, candidate))
	)
}

for (const file of htmlFiles) {
	const html = read(file)
	if (!html.includes('rel="canonical"')) errors.push(`${file}: no canonical`)
	const og = html.match(/property="og:image" content="([^"]+)"/)
	if (!og || !/^https:\/\//.test(og[1])) {
		errors.push(`${file}: og:image is missing or not absolute`)
	}
	for (const [, attr, url] of html.matchAll(/(href|src)="(\/[^"/][^"]*)"/g)) {
		if (!resolves(url)) errors.push(`${file}: broken ${attr} ${url}`)
	}
}

if (errors.length) {
	console.error(errors.map((e) => `✗ ${e}`).join('\n'))
	process.exit(1)
}
console.log(`✓ smoke test passed (${htmlFiles.length} HTML files)`)
