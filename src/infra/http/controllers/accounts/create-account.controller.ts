import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const createAccountBodySchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(6),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
export class CreateAccountController {
	constructor(private prisma: PrismaService) {}

	@Post()
	@HttpCode(201)
	@UsePipes(new ZodValidationPipe(createAccountBodySchema))
	async handler(@Body() body: CreateAccountBodySchema) {
		const { name, email, password } = body

		const userAlreadyExists = await this.prisma.user.findUnique({
			where: {
				email,
			},
		})

		if (userAlreadyExists) {
			throw new Error('User already exists')
		}

		const hashedPassword = await hash(password, 8)

		await this.prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		})

		return 'create account'
	}
}
