import { PresentHotResponse } from '@application/dto/presents-hot.pagination.dto';
import { PresentHotEntity } from '@domain/entities/present-hot.entity';
import { Prisma } from '@prisma/client';

type PresentHotInputCreate = Prisma.PresentsHotCreateInput;
type PresentHotPayloadDatabase = Prisma.PresentsHotGetPayload<{
  select: {
    id: true;
    name: true;
    image: true;
    url_sailers: true;
    created_at: true;
    updated_at: true;
    price?: true;
  };
}>;

export class PresentHotMapper {
  static toResponse(presentHot: PresentHotPayloadDatabase): PresentHotResponse {
    return {
      id: presentHot.id,
      name: presentHot.name,
      image: presentHot.image,
      urlSailers: presentHot.url_sailers,
      createdAt: new Date(presentHot.created_at),
      updatedAt: new Date(presentHot.updated_at),
      price: Number(presentHot.price),
    };
  }

  static toPersistent(data: PresentHotEntity): PresentHotInputCreate {
    return {
      id: data.presentHotId,
      name: data.name,
      image: data.image,
      url_sailers: data.urlSailers,
      price: data.price,
    };
  }
}
