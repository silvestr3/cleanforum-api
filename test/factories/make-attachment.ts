import { faker } from "@faker-js/faker";

import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  Attachment,
  AttachmentProps,
} from "@/domain/forum/enterprise/entities/attachment";
import { Injectable } from "@nestjs/common";
import { PrismaAttachmentMapper } from "@/infra/database/prisma/mappers/prisma-attachment-mapper";
import { PrismaService } from "@/infra/database/prisma/prisma.service";

export function MakeAttachment(
  override: Partial<AttachmentProps> = {},
  id?: UniqueEntityID
) {
  const attachment = Attachment.create(
    {
      title: faker.lorem.slug(),
      url: faker.internet.url(),
      ...override,
    },
    id
  );

  return attachment;
}

@Injectable()
export class AttachmentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAttachment(
    data: Partial<AttachmentProps> = {}
  ): Promise<Attachment> {
    const attachment = MakeAttachment(data);

    await this.prisma.attachment.create({
      data: PrismaAttachmentMapper.toPrisma(attachment),
    });

    return attachment;
  }
}
