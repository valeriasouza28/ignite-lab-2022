import { Notification } from "../entities/notification";

// A classe que imlementar essa classe terá que obrigatoriamente implementar todos os seu métodos
export abstract class NotificationRepository {
  abstract create(notification: Notification ): Promise<void>
  abstract findById(notificationId: string): Promise<Notification | null>
  abstract save(notification: Notification): Promise<void>
  abstract countManyByRecipientId(recipientId: string): Promise<number>
}