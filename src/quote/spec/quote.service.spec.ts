import { Test, TestingModule } from '@nestjs/testing';
import { CONFIG } from '../config/quote.config';
import { RequestEstimateDto } from '../dto/request-estimate.dto';
import { CarTypes } from '../entities/quote.entity';
import { QuoteService } from '../quote.service';

describe('QuoteService', () => {
  let service: QuoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuoteService],
    }).compile();

    service = module.get<QuoteService>(QuoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the correct monthly quote estimate', () => {
    const estimateRequest = new RequestEstimateDto();
    estimateRequest.ageOfDriver = 30;
    estimateRequest.car = CarTypes.AUDI;
    estimateRequest.purchasePrice = 15000;

    const response = service.getEstimate(estimateRequest);

    expect(response.ageOfDriver).toBe(estimateRequest.ageOfDriver);
    expect(response.car).toBe(CarTypes.AUDI);
    expect(response.purchasePrice).toBe(estimateRequest.purchasePrice);

    expect(response.global.priceMonthly).toBe(CONFIG.audi.globalQuote / 12);
    expect(response.universe.priceMonthly).toBe(
      (CONFIG.audi.globalQuote +
        estimateRequest.purchasePrice * CONFIG.audi.universalRate) /
        12,
    );
    expect(response.global.priceYearly).toBe(CONFIG.audi.globalQuote);
    expect(response.universe.priceYearly).toBe(
      CONFIG.audi.globalQuote +
        estimateRequest.purchasePrice * CONFIG.audi.universalRate,
    );
  });
});
