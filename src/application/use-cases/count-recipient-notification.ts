import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification-repository';
import { NotificationNotFound } from './errors/notification-not-found';

// atributos qu um envio de uma notificação deve ter 
export interface CountRecipientNotificationsRequest {
recipientId: string;

}

// cria uma interface para fazer com que o count retorne o número de notificações 
interface CountRecipientNotificationsResponse {
count: number;
}

@Injectable()
export class CountRecipientNotifications {

  constructor(
    private notificationsRepository: NotificationRepository
  ) {}

  async execute(request: CountRecipientNotificationsRequest,
    ): Promise<CountRecipientNotificationsResponse> {
      const {recipientId} = request 

const count = await this.notificationsRepository.countManyByRecipientId(
  recipientId,
  )

      return {
        count, 
      }
      
    }
}