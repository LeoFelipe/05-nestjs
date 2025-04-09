/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Uploader } from '@/domain/forum/application/storage/uploader'
import { FakeUploader } from 'test/storage/fake-uploader'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { StudentFactory } from 'test/factories/make-student'
import { writeFileSync, existsSync, mkdirSync, unlinkSync } from 'fs'
import { join } from 'path'

describe('Upload attachment (E2E)', () => {
	let app: INestApplication
	let studentFactory: StudentFactory
	let prisma: PrismaService
	let jwt: JwtService
	let fakeUploader: FakeUploader
	const testDir = './test/e2e'
	const filePath = join(testDir, 'sample-upload.png')

	beforeAll(async () => {
		// Ensure test upload file exists
		if (!existsSync(testDir)) {
			mkdirSync(testDir, { recursive: true })
		}

		if (!existsSync(filePath)) {
			// Create a simple PNG file for testing
			const simplePng = Buffer.from(
				'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
				'base64',
			)
			writeFileSync(filePath, simplePng)
		}

		const moduleRef = await Test.createTestingModule({
			imports: [AppModule, DatabaseModule],
			providers: [
				StudentFactory,
				{
					provide: Uploader,
					useClass: FakeUploader,
				},
			],
		}).compile()

		app = moduleRef.createNestApplication()

		studentFactory = moduleRef.get(StudentFactory)
		prisma = moduleRef.get(PrismaService)
		jwt = moduleRef.get(JwtService)
		fakeUploader = moduleRef.get(Uploader)

		await app.init()
	}, 30000) // Increased timeout to 30 seconds for module initialization

	afterAll(async () => {
		await app.close()

		// Clean up the test file if it exists
		try {
			if (existsSync(filePath)) {
				unlinkSync(filePath)
			}
		} catch (error) {
			console.error('Error cleaning up test file:', error)
		}
	})

	test('[POST] /attachments', async () => {
		const user = await studentFactory.makePrismaStudent()
		const accessToken = jwt.sign({ sub: user.id.toString() })

		const httpServer = app.getHttpServer() as unknown as import('http').Server
		const response = await request(httpServer)
			.post('/attachments')
			.set('Authorization', `Bearer ${accessToken}`)
			.attach('file', filePath)

		expect(response.statusCode).toBe(201)
		expect(response.body).toEqual({
			attachmentId: expect.any(String) as string,
		})

		// Verify the attachment was created in the database
		const attachmentOnDatabase = await prisma.attachment.findFirst({
			where: {
				id: response.body.attachmentId,
			},
		})

		expect(attachmentOnDatabase).toBeTruthy()
		expect(attachmentOnDatabase?.url).toEqual(fakeUploader.uploads[0].url)
	}, 20000) // Increased timeout to 30 seconds for the test case
})
