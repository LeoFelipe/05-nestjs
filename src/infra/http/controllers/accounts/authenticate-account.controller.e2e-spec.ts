import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Authenticate Account (e2e)', () => {
	let app: INestApplication
	let prisma: PrismaService

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		}).compile()

		app = moduleRef.createNestApplication()

		prisma = moduleRef.get(PrismaService)

		await app.init()
	})

	test('[POST] /accounts/auth', async () => {
		await prisma.user.create({
			data: {
				name: 'Nina',
				email: 'nina@mail.com',
				password: await hash('123456', 8),
			},
		})

		const httpServer = app.getHttpServer() as unknown as import('http').Server

		const response = await request(httpServer).post('/accounts/auth').send({
			email: 'nina@mail.com',
			password: '123456',
		})

		expect(response.statusCode).toBe(201)
		expect(response.body).toEqual({
			access_token: expect.any(String) as string,
		})
	})
})
