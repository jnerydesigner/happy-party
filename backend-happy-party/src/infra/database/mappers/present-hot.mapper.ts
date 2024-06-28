import { PresentHotResponse } from '@application/dto/presents-hot.pagination.dto';

export class PresentHotMapper {
  static toResponse(productHot: any): PresentHotResponse {
    return {
      id: productHot.id,
      name: productHot.name,
      image: productHot.image,
      urlSailers: productHot.url_sailers,
      createdAt: new Date(productHot.created_at),
      updatedAt: new Date(productHot.updated_at),
    };
  }
}
