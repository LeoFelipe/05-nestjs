import { Module } from '@nestjs/common'
import { AuthenticateAccountController } from './controllers/accounts/authenticate-account.controller'
import { CreateAccountController } from './controllers/accounts/create-account.controller'
import { CreateQuestionController } from './controllers/questions/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/questions/fetch-recent-questions.controller'
import { DatabaseModule } from '../database/database.module'

@Module({
	imports: [DatabaseModule],
	controllers: [
		AuthenticateAccountController,
		CreateAccountController,
		CreateQuestionController,
		FetchRecentQuestionsController,
	],
})
export class HttpModule {}
