import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const certs = defineCollection({
	loader: glob({
		base: './src/content/certs',
		pattern: '**/*.{md,mdx}',
	}),
	schema: z.object({
		title: z.string(),
		imgSrc: z.string(),
		imgAlt: z.string(),
	}),
})

export const collections = { certs }
