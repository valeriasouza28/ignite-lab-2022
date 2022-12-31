import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification-repository';
import { NotificationNotFound } from './errors/notification-not-found';

// atributos qu um envio de uma notificação deve ter 
export interface CancelNotificationRequest {
notificationId: string;

}

// cria uma interface para fazer com que a Promise retorne um objeto
type CancelNotificationResponse = void

@Injectable()
export class CancelNotification {

  constructor(
    private notificationsRepository: NotificationRepository
  ) {}

  async execute(request: CancelNotificationRequest,
    ): Promise<CancelNotificationResponse> {
      const {notificationId} = request 

      const notification = await this.notificationsRepository.findById(notificationId)

      if(!notification){
        throw new NotificationNotFound();
      }

      notification.cancel()

      await this.notificationsRepository.save(notification)

    }
}