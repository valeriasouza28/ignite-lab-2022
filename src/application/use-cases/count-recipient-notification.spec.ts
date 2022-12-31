import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { Notification } from '@application/entities/notification';
import { Content } from '@application/entities/content';
import { NotificationNotFound } from './errors/notification-not-found';
import { CountRecipientNotifications } from './count-recipient-notification';
import { makeNotification } from '../../../test/factories/notification-factory';

describe('Count recicipient notification', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotification = new CountRecipientNotifications(notificationsRepository);
   
    await  notificationsRepository.create(
    makeNotification({recipientId: 'recipient-1'})
    );

   await  notificationsRepository.create(
    makeNotification({recipientId: 'recipient-1'})
    );

    await  notificationsRepository.create(
      makeNotification({recipientId: 'recipient-2'})
      );
   


   const {count} = await countRecipientNotification.execute({
      recipientId: 'recipient-1'
    });

    // espera que o count seja igual a 2
    expect(count).toEqual(2);

  })
})
