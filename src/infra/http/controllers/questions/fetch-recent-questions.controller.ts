import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { z } from 'zod'

const pageQueryParamSchema = z
	.string()
	.optional()
	.default('1')
	.transform(Number)
	.pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/questions')
export class FetchRecentQuestionsController {
	constructor(private prisma: PrismaService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
		const perPage = 5
		const countPages = (page - perPage) * perPage
		const skip = countPages < 1 ? 0 : countPages

		const questions = await this.prisma.question.findMany({
			take: perPage,
			skip: skip,
			orderBy: {
				createdAt: 'desc',
			},
		})

		return {
			questions,
		}
	}
}
