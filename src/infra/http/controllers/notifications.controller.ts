import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { SendNotification } from '@application/use-cases/send-notification-';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from '@application/use-cases/cancel-notification';


@Controller('notification')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    ) {}

  @Patch(':id/cancel')
  async cancel(
    @Param('id') id: string 
  ) {
    await this.cancelNotification.execute({
        notificationId: id,
    })
  }
  
  async countFromRecipient() {}

  async getFromRecipient() {}

  async read() {}

  async unread() {}

  
  @Post()
  async create(@Body() body: CreateNotificationBody){
    const {recipientId, content, category} = body

    const {notification} = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

  return { 
    notification: NotificationViewModel.toHTTP(notification)
  }};

  }
  

