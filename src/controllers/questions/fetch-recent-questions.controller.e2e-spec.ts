import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Fetch Recent Questions (e2e)', () => {
	let app: INestApplication
	let prisma: PrismaService
	let jwt: JwtService

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		}).compile()

		app = moduleRef.createNestApplication()

		prisma = moduleRef.get(PrismaService)
		jwt = moduleRef.get(JwtService)

		await app.init()
	})

	test('[GET] /questions', async () => {
		const user = await prisma.user.create({
			data: {
				name: 'Nina',
				email: 'nina@mail.com',
				password: '123456',
			},
		})

		const accessToken = jwt.sign({ sub: user.id })

		await prisma.question.createMany({
			data: [
				{
					title: 'Question 01',
					content: 'Content 01',
					slug: 'question-01',
					authorId: user.id,
				},
				{
					title: 'Question 02',
					content: 'Content 02',
					slug: 'question-02',
					authorId: user.id,
				},
			],
		})

		const questions = await prisma.question.findMany()
		console.log('quations: ', questions)

		const response = await request(app.getHttpServer())
			.get('/questions')
			.set('Authorization', `Bearer ${accessToken}`)
			.send()

		expect(response.statusCode).toBe(200)
		console.log(response.body)
		expect(response.body).toEqual({
			questions: [
				expect.objectContaining({ title: 'Question 01' }),
				expect.objectContaining({ title: 'Question 02' }),
			],
		})
	})
})
