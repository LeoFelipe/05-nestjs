import { Module } from '@nestjs/common'

import { AuthenticateController } from '@/infra/http/controllers/accounts/authenticate-account.controller'
import { CreateAccountController } from '@/infra/http/controllers/accounts/create-account.controller'
import { CreateQuestionController } from '@/infra/http/controllers/questions/create-question.controller'
import { FetchRecentQuestionsController } from '@/infra/http/controllers/questions/fetch-recent-questions.controller'
import { DatabaseModule } from '../database/database.module'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { GetQuestionBySlugController } from '@/infra/http/controllers/questions/get-question-by-slug.controller'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'
import { EditQuestionController } from '@/infra/http/controllers/questions/edit-question.controller'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question'
import { DeleteQuestionController } from '@/infra/http/controllers/questions/delete-question.controller'
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question'
import { AnswerQuestionController } from '@/infra/http/controllers/questions/answer-question.controller'
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question'
import { EditAnswerController } from '@/infra/http/controllers/questions/edit-answer.controller'
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer'
import { DeleteAnswerController } from '@/infra/http/controllers/questions/delete-answer.controller'
import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer'
import { FetchQuestionAnswersController } from '@/infra/http/controllers/questions/fetch-question-answers.controller'
import { FetchQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/fetch-question-answers'
import { ChooseQuestionBestAnswerController } from '@/infra/http/controllers/questions/choose-question-best-answer.controller'
import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/choose-question-best-answer'
import { CommentOnQuestionController } from '@/infra/http/controllers/questions/comment-on-question.controller'
import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question'
import { DeleteQuestionCommentController } from '@/infra/http/controllers/questions/delete-question-comment.controller'
import { DeleteQuestionCommentUseCase } from '@/domain/forum/application/use-cases/delete-question-comment'
import { CommentOnAnswerController } from '@/infra/http/controllers/questions/comment-on-answer.controller'
import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/comment-on-answer'
import { DeleteAnswerCommentController } from '@/infra/http/controllers/questions/delete-answer-comment.controller'
import { DeleteAnswerCommentUseCase } from '@/domain/forum/application/use-cases/delete-answer-comment'
import { FetchQuestionCommentsController } from '@/infra/http/controllers/questions/fetch-question-comments.controller'
import { FetchQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-question-comments'
import { FetchAnswerCommentsController } from '@/infra/http/controllers/questions/fetch-answer-comments.controller'
import { FetchAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-answer-comments'
import { UploadAttachmentController } from '@/infra/http/controllers/questions/upload-attachment.controller'
import { StorageModule } from '@/infra/http/storage/storage.module'
import { UploadAndCreateAttachmentUseCase } from '@/domain/forum/application/use-cases/upload-and-create-attachment'
import { ReadNotificationController } from '@/infra/http/controllers/questions/read-notification.controller'
import { ReadNotificationUseCase } from '@/domain/notification/application/use-cases/read-notification'

@Module({
	imports: [DatabaseModule, CryptographyModule, StorageModule],
	controllers: [
		CreateAccountController,
		AuthenticateController,
		CreateQuestionController,
		FetchRecentQuestionsController,
		GetQuestionBySlugController,
		EditQuestionController,
		DeleteQuestionController,
		AnswerQuestionController,
		EditAnswerController,
		DeleteAnswerController,
		FetchQuestionAnswersController,
		ChooseQuestionBestAnswerController,
		CommentOnQuestionController,
		DeleteQuestionCommentController,
		CommentOnAnswerController,
		DeleteAnswerCommentController,
		FetchQuestionCommentsController,
		FetchAnswerCommentsController,
		UploadAttachmentController,
		ReadNotificationController,
	],
	providers: [
		CreateQuestionUseCase,
		FetchRecentQuestionsUseCase,
		RegisterStudentUseCase,
		AuthenticateStudentUseCase,
		GetQuestionBySlugUseCase,
		EditQuestionUseCase,
		DeleteQuestionUseCase,
		AnswerQuestionUseCase,
		EditAnswerUseCase,
		DeleteAnswerUseCase,
		FetchQuestionAnswersUseCase,
		ChooseQuestionBestAnswerUseCase,
		CommentOnQuestionUseCase,
		DeleteQuestionCommentUseCase,
		CommentOnAnswerUseCase,
		DeleteAnswerCommentUseCase,
		FetchQuestionCommentsUseCase,
		FetchAnswerCommentsUseCase,
		UploadAndCreateAttachmentUseCase,
		ReadNotificationUseCase,
	],
})
export class HttpModule {}
