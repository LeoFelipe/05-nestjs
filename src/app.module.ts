import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma/prisma.service'
import { envSchema } from './env'
import { AuthModule } from './auth/auth.module'
import { CreateAccountController } from './controllers/accounts/create-account.controller'
import { AuthenticateAccountController } from './controllers/accounts/authenticate-account.controller'
import { CreateQuestionController } from './controllers/questions/create-question.controller'
import { FetchrecentQuestionsController } from './controllers/questions/fetch-recent-questions.controller'

@Module({
	imports: [
		ConfigModule.forRoot({
			validate: (env) => envSchema.parse(env),
			isGlobal: true,
		}),
		AuthModule,
	],
	controllers: [
		AuthenticateAccountController,
		CreateAccountController,
		CreateQuestionController,
		FetchrecentQuestionsController,
	],
	providers: [PrismaService],
})
export class AppModule {}
