import { Injectable } from '@nestjs/common';
import { Content } from '../entities/content';
import {Notification} from '../entities/notification'
import { NotificationRepository } from '../repositories/notification-repository';

// atributos qu um envio de uma notificação deve ter 
export interface SendNotificationRequest {
recipientId: string;
content: string;
category: string;
}

// cria uma interface para fazer com que a Promise retorne um objeto
interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  

  constructor(
    private notificationsRepository: NotificationRepository
  ) {}

  async execute(request: SendNotificationRequest,
    ): Promise<SendNotificationResponse> {
      const {recipientId, content, category} = request 

  const notification = new Notification({
    recipientId,
    content: new Content(content),
    category
  })

await this.notificationsRepository.create(notification);

  return {
    notification,
  }
  }
}