import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { makeNotification } from '../../../test/factories/notification-factory';
import { CountRecipientNotifications } from './count-recipient-notification';
import { NotificationNotFound } from './errors/notification-not-found';
import { GetRecipientNotifications } from './get-recipient-notificattion';

describe('Get recipient notification', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotification = new GetRecipientNotifications(notificationsRepository);
   
    await  notificationsRepository.create(
    makeNotification({recipientId: 'recipient-1'})
    );

   await  notificationsRepository.create(
    makeNotification({recipientId: 'recipient-1'})
    );

    await  notificationsRepository.create(
      makeNotification({recipientId: 'recipient-2'})
      );
   


   const {notifications} = await getRecipientNotification.execute({
      recipientId: 'recipient-1'
    });

    // espera que a lista de notificação tenha a 2
    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ recipientId: 'recipient-1' }),
          expect.objectContaining({ recipientId: 'recipient-1' }),
        ]),
      );


  })
})
