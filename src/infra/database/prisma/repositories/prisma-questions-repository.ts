import type { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import type { Question } from '@/domain/forum/enterprise/entities/question'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrimsaQuestionsRepository implements QuestionsRepository {
	findById(id: string): Promise<Question | null> {
		throw new Error('Method not implemented.')
	}
	findBySlug(slug: string): Promise<Question | null> {
		throw new Error('Method not implemented.')
	}
	findManyRecent(params: PaginationParams): Promise<Question[]> {
		throw new Error('Method not implemented.')
	}
	save(question: Question): Promise<void> {
		throw new Error('Method not implemented.')
	}
	create(question: Question): Promise<void> {
		throw new Error('Method not implemented.')
	}
	delete(question: Question): Promise<void> {
		throw new Error('Method not implemented.')
	}
}
