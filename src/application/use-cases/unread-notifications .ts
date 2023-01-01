import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification-repository';
import { NotificationNotFound } from './errors/notification-not-found';

// atributos qu um envio de uma notificação deve ter 
export interface UnreadNotificationRequest {
notificationId: string;

}

// cria uma interface para fazer com que a Promise retorne um objeto
type UnreadNotificationResponse = void

@Injectable()
export class UnreadNotification {

  constructor(
    private notificationsRepository: NotificationRepository
  ) {}

  async execute(request: UnreadNotificationRequest,
    ): Promise<UnreadNotificationResponse> {
      const {notificationId} = request 

      const notification = await this.notificationsRepository.findById(notificationId)

      if(!notification){
        throw new NotificationNotFound();
      }

      notification.unread()

      await this.notificationsRepository.save(notification)

    }
}