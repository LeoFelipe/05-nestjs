import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Create Account (e2e)', () => {
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

	test('[POST] /accounts', async () => {
		const httpServer = app.getHttpServer() as unknown as import('http').Server

		const response = await request(httpServer).post('/accounts').send({
			name: 'Nina',
			email: 'nina@mail.com',
			password: '123456',
		})

		const userOnDatabase = await prisma.user.findUnique({
			where: {
				email: 'nina@mail.com',
			},
		})

		expect(response.statusCode).toBe(201)
		expect(userOnDatabase).toBeTruthy()
	})
})
