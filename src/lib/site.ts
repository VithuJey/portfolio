import rawSite from '@/data/site.json'
import { siteSchema } from '@/schemas/site.schema'

export const site = siteSchema.parse(rawSite)
