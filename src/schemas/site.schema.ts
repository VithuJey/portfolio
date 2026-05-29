import { z } from 'astro/zod'

export const siteSchema = z.object({
	name: z.string(),
	defaultTitle: z.string(),
	titleFallback: z.string(),
	description: z.string(),
	keywords: z.string(),
	author: z.string(),
	siteName: z.string(),
	ogImage: z.string(),
	url: z.url(),
})

export type Site = z.infer<typeof siteSchema>
