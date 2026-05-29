import { z } from 'astro/zod'

const navLinkSchema = z.object({
	label: z.string(),
	url: z.string(),
	visible: z.boolean(),
	external: z.boolean().optional(),
	highlight: z.boolean().optional(),
})

const projectLinkSchema = z.object({
	id: z.string(),
	url: z.string(),
	icon: z.string(),
	alt: z.string(),
	class: z.string().optional(),
})

const projectSchema = z.object({
	id: z.string(),
	title: z.string(),
	type: z.enum(['one', 'two']),
	image: z.object({
		src: z.string(),
		alt: z.string(),
	}),
	description: z.string(),
	technologies: z.array(z.string()),
	links: z.array(projectLinkSchema),
})

const insightSchema = z.object({
	link: z.string(),
	title: z.string(),
	desc: z.string(),
	thumbnail: z.string(),
	type: z.enum(['video', 'article']),
})

const jobSchema = z.object({
	role: z.string(),
	company: z.string(),
	companyUrl: z.string(),
	companySuffix: z.string().optional(),
	location: z.string(),
	duration: z.string(),
	bullets: z.array(z.string()),
})

const socialSchema = z.object({
	id: z.string(),
	url: z.string(),
	icon: z.string(),
	alt: z.string(),
	visible: z.boolean(),
})

export const portfolioSchema = z.object({
	email: z.string(),
	nav: z.object({
		logo: z.string(),
		links: z.array(navLinkSchema),
	}),
	hero: z.object({
		welcome: z.string(),
		name: z.string(),
		subtitle: z.string(),
		description: z.string(),
		resumeUrl: z.string(),
		resumeLabel: z.string(),
	}),
	about: z.object({
		heading: z.string(),
		paragraphs: z.array(z.string()),
		skillHeading: z.string(),
		skills: z.array(z.string()),
		avatar: z.object({
			src: z.string(),
			alt: z.string(),
		}),
	}),
	experience: z.object({
		heading: z.string(),
		jobs: z.array(jobSchema),
	}),
	education: z.object({
		heading: z.string(),
		school: z.string(),
		location: z.string(),
		degree: z.string(),
		duration: z.string(),
		description: z.string(),
	}),
	projects: z.object({
		heading: z.string(),
		list: z.array(projectSchema),
	}),
	insights: z.object({
		heading: z.string(),
		list: z.array(insightSchema),
	}),
	contact: z.object({
		heading: z.string(),
		description: z.string(),
		buttonUrl: z.string(),
		buttonText: z.string(),
	}),
	socials: z.array(socialSchema),
	footer: z.object({
		builtWithText: z.string(),
		builtWithUrl: z.string(),
		builtWithLogo: z.string(),
		builtWithAlt: z.string(),
	}),
})

export type Portfolio = z.infer<typeof portfolioSchema>
export type NavLink = z.infer<typeof navLinkSchema>
