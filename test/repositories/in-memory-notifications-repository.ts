import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

export class InMemoryNotificationsRepository
	implements NotificationsRepository
{
	public items: Notification[] = []

	async findById(id: string) {
		const notification = this.items.find((item) => item.id.toString() === id)

		if (!notification) {
			return await Promise.resolve(null)
		}

		return await Promise.resolve(notification)
	}

	async create(notification: Notification) {
		this.items.push(notification)
		await Promise.resolve()
	}

	async save(notification: Notification) {
		const itemIndex = this.items.findIndex(
			(item) => item.id === notification.id,
		)

		this.items[itemIndex] = notification
		await Promise.resolve()
	}
}
