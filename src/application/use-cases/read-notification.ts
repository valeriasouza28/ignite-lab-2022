import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification-repository';
import { NotificationNotFound } from './errors/notification-not-found';

// atributos qu um envio de uma notificação deve ter 
export interface ReadNotificationRequest {
notificationId: string;

}

// cria uma interface para fazer com que a Promise retorne um objeto
type ReadNotificationResponse = void

@Injectable()
export class ReadNotification {

  constructor(
    private notificationsRepository: NotificationRepository
  ) {}

  async execute(request: ReadNotificationRequest,
    ): Promise<ReadNotificationResponse> {
      const {notificationId} = request 

      const notification = await this.notificationsRepository.findById(notificationId)

      if(!notification){
        throw new NotificationNotFound();
      }

      notification.read()

      await this.notificationsRepository.save(notification)

    }
}