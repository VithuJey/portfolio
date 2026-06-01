import rawPortfolio from '@/data/portfolio.json'
import { portfolioSchema } from '@/schemas/portfolio.schema'

export const portfolio = portfolioSchema.parse(rawPortfolio)
