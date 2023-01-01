import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { SendNotification } from '@application/use-cases/send-notification-';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notifications ';
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notification';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notificattion';



@Controller('notification')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotification: CountRecipientNotifications,
    private getRecipientNotification: GetRecipientNotifications,
    ) {}

  @Patch(':id/cancel')
  async cancel(
    @Param('id') id: string 
  ) {
    await this.cancelNotification.execute({
        notificationId: id,
    })
  }
  
  @Patch(':id/read')
  async read (
    @Param('id') id: string 
  ) {
    await this.readNotification.execute({
        notificationId: id,
    })
  }

  @Patch(':id/unread')
  async unread (
    @Param('id') id: string 
  ) {
    await this.unreadNotification.execute({
        notificationId: id,
    })
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string ) {
        const {count} = await this.countRecipientNotification.execute({
            recipientId,
        });
        return {count,}
    }

    @Get('from/:recipientId')
    async getFromRecipient(
      @Param('recipientId') recipientId: string ) {
          const {notifications} = await this.getRecipientNotification.execute({
              recipientId,
          });
          
      }


  
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
  

