import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
	public items: Answer[] = []

	constructor(
		private answerAttachmentsRepository: AnswerAttachmentsRepository,
	) {}

	async findById(id: string) {
		const answer = this.items.find((item) => item.id.toString() === id)

		if (!answer) {
			return await Promise.resolve(null)
		}

		return await Promise.resolve(answer)
	}

	async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
		const answers = this.items
			.filter((item) => item.questionId.toString() === questionId)
			.slice((page - 1) * 20, page * 20)

		return await Promise.resolve(answers)
	}

	async create(answer: Answer) {
		this.items.push(answer)

		await this.answerAttachmentsRepository.createMany(
			answer.attachments.getItems(),
		)

		DomainEvents.dispatchEventsForAggregate(answer.id)
	}

	async save(answer: Answer) {
		const itemIndex = this.items.findIndex((item) => item.id === answer.id)

		this.items[itemIndex] = answer

		await this.answerAttachmentsRepository.createMany(
			answer.attachments.getNewItems(),
		)

		await this.answerAttachmentsRepository.deleteMany(
			answer.attachments.getRemovedItems(),
		)

		DomainEvents.dispatchEventsForAggregate(answer.id)
	}

	async delete(answer: Answer) {
		const itemIndex = this.items.findIndex((item) => item.id === answer.id)

		this.items.splice(itemIndex, 1)
		await this.answerAttachmentsRepository.deleteManyByAnswerId(
			answer.id.toString(),
		)
	}
}
