import {
	Body,
	Controller,
	HttpCode,
	Post,
	UnauthorizedException,
	UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'

const authBodySchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
})

type AuthBodySchema = z.infer<typeof authBodySchema>

@Controller('/accounts')
export class AuthenticateAccountController {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService,
	) {}

	@Post('/auth')
	@HttpCode(200)
	@UsePipes(new ZodValidationPipe(authBodySchema))
	async handler(@Body() body: AuthBodySchema) {
		const { email, password } = body

		const user = await this.prisma.user.findUnique({
			where: {
				email,
			},
		})

		if (!user) {
			throw new UnauthorizedException('User credentials do not match')
		}

		const isPasswordValid = await compare(password, user.password)

		if (!isPasswordValid) {
			throw new UnauthorizedException('User credentials do not match')
		}

		const accesToken = this.jwt.sign({ sub: user.id })
		return {
			access_token: accesToken,
		}
	}
}
