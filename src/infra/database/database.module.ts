import { Module } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaQuestionsRepository } from '@/infra/database/prisma/repositories/prisma-questions-repository'
import { PrismaQuestionCommentsRepository } from '@/infra/database/prisma/repositories/prisma-question-comments-repository'
import { PrismaQuestionAttachmentsRepository } from '@/infra/database/prisma/repositories/prisma-question-attachments-repository'
import { PrismaAnswersRepository } from '@/infra/database/prisma/repositories/prisma-answers-repository'
import { PrismaAnswerCommentsRepository } from '@/infra/database/prisma/repositories/prisma-answer-comments-repository'
import { PrismaAnswerAttachmentsRepository } from '@/infra/database/prisma/repositories/prisma-answer-attachments-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { PrismaStudentsRepository } from '@/infra/database/prisma/repositories/prisma-students-repository'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { AttachmentsRepository } from '@/domain/forum/application/repositories/attachments-repository'
import { PrismaAttachmentsRepository } from '@/infra/database/prisma/repositories/prisma-attachments-repository'
import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { PrismaNotificationsRepository } from './prisma/repositories/prisma-notifications-repository'
import { CacheModule } from '../cache/cache.module'

@Module({
	imports: [CacheModule],
	providers: [
		PrismaService,
		{
			provide: QuestionsRepository,
			useClass: PrismaQuestionsRepository,
		},
		{
			provide: StudentsRepository,
			useClass: PrismaStudentsRepository,
		},
		{
			provide: QuestionCommentsRepository,
			useClass: PrismaQuestionCommentsRepository,
		},
		{
			provide: QuestionAttachmentsRepository,
			useClass: PrismaQuestionAttachmentsRepository,
		},
		{
			provide: AnswersRepository,
			useClass: PrismaAnswersRepository,
		},
		{
			provide: AnswerCommentsRepository,
			useClass: PrismaAnswerCommentsRepository,
		},
		{
			provide: AnswerAttachmentsRepository,
			useClass: PrismaAnswerAttachmentsRepository,
		},
		{
			provide: AttachmentsRepository,
			useClass: PrismaAttachmentsRepository,
		},
		{
			provide: NotificationsRepository,
			useClass: PrismaNotificationsRepository,
		},
	],
	exports: [
		PrismaService,
		QuestionsRepository,
		StudentsRepository,
		QuestionCommentsRepository,
		QuestionAttachmentsRepository,
		AnswersRepository,
		AnswerCommentsRepository,
		AnswerAttachmentsRepository,
		AttachmentsRepository,
		NotificationsRepository,
	],
})
export class DatabaseModule {}
