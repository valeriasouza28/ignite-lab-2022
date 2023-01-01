import { Notification } from "@application/entities/notification";
import { NotificationRepository } from "@application/repositories/notification-repository";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common/decorators";
import { PrismaNotificationMapper } from "../mappers/prisma-notification-mapper";
import { raw } from "@prisma/client/runtime";

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository{
constructor(private prisma: PrismaService,) {}

async findById(notificationId: string): Promise<Notification | null> {
  const notification = await this.prisma.notification.findUnique({
    where: {
        id: notificationId,
    },
  })

  if (!notification) {
    return null;
  }

  return PrismaNotificationMapper.toDomain(notification);
}
    findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    throw new Error("Method not implemented.");
}
    async countManyByRecipientId(recipientId: string): Promise<number> {
        const count = await this.prisma.notification.count({
            where: {
                recipientId,
            }
        })
        return count;
    }
  

  async create(notification: Notification): Promise<void> {
const raw = PrismaNotificationMapper.toPrisma(notification)

    await this.prisma.notification.create({
      data: raw,
    });
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prisma.notification.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }

}