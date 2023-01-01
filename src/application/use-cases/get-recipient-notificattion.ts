import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { Notification } from '@application/entities/notification';

// atributos qu um envio de uma notificação deve ter 
export interface GetRecipientNotificationsRequest {
recipientId: string;

}

// cria uma interface para fazer com que o Get retorne o número de notificações 
interface GetRecipientNotificationsResponse {
notifications: Notification[] 
}

@Injectable()
export class GetRecipientNotifications {

  constructor(
    private notificationsRepository: NotificationRepository
  ) {}

  async execute(request: GetRecipientNotificationsRequest,
    ): Promise<GetRecipientNotificationsResponse> {
      const {recipientId} = request 

      const notifications =
      await this.notificationsRepository.findManyByRecipientId(recipientId);

    return {
      notifications,
    };
      
    }
}