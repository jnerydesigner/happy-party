import { randomUUID } from 'crypto';

export class PresentHotEntity {
  constructor(
    readonly name: string,
    readonly image: string,
    readonly urlSailers: string,
    readonly price: number,
    readonly presentHotId?: string,
  ) {}

  static createPresentHot(
    name: string,
    image: string,
    urlSailers: string,
    price: number,
  ): PresentHotEntity {
    const presentHotId = randomUUID();
    return new PresentHotEntity(name, image, urlSailers, price, presentHotId);
  }
}
