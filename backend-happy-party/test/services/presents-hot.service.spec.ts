import { PresentsHotService } from '@application/services/presents-hot.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('PresentsHotService', () => {
  let service: PresentsHotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PresentsHotService],
    }).compile();

    service = module.get<PresentsHotService>(PresentsHotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
