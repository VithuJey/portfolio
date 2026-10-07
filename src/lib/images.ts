import type { ImageMetadata } from 'astro'

const images = import.meta.glob<{ default: ImageMetadata }>(
	'/src/assets/images/*.{png,jpg,jpeg,webp}',
	{ eager: true }
)

/**
 * Resolves a content path like `/images/foo.png` to its optimizable asset in
 * `src/assets/images/`. Throws at build time when the file is missing.
 */
export function resolveImage(path: string): ImageMetadata {
	const match = images[`/src/assets${path}`]
	if (!match) throw new Error(`Image not found in src/assets: ${path}`)
	return match.default
}
