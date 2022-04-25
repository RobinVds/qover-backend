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

  it('should return the correct monthly quote estimate', () =>  {
    const estimateRequest = new RequestEstimateDto()
    estimateRequest.ageOfDriver = 30
    estimateRequest.car = CarTypes.AUDI
    estimateRequest.purchasePrice = 15000

    const response = service.getEstimate(estimateRequest)

    expect(response.monthlyEstimate.ageOfDriver).toBe(estimateRequest.ageOfDriver)
    expect(response.monthlyEstimate.car).toBe(CarTypes.AUDI)
    expect(response.monthlyEstimate.purchasePrice).toBe(estimateRequest.purchasePrice)

    expect(response.monthlyEstimate.quoteGlobal).toBe(CONFIG.audi.globalQuote / 12)
    expect(response.monthlyEstimate.quoteUniversal).toBe((CONFIG.audi.globalQuote + estimateRequest.purchasePrice * CONFIG.audi.universalRate) / 12)
    
    expect(response.monthlyEstimate).toMatchObject(CONFIG.monthly)
  })

  it('should return the correct yearly quote estimate', () =>  {
    const estimateRequest = new RequestEstimateDto()
    estimateRequest.ageOfDriver = 30
    estimateRequest.car = CarTypes.AUDI
    estimateRequest.purchasePrice = 15000

    const response = service.getEstimate(estimateRequest)

    expect(response.yearlyEstimate.ageOfDriver).toBe(estimateRequest.ageOfDriver)
    expect(response.yearlyEstimate.car).toBe(CarTypes.AUDI)
    expect(response.yearlyEstimate.purchasePrice).toBe(estimateRequest.purchasePrice)

    expect(response.yearlyEstimate.quoteGlobal).toBe(CONFIG.audi.globalQuote)
    expect(response.yearlyEstimate.quoteUniversal).toBe(CONFIG.audi.globalQuote + estimateRequest.purchasePrice * CONFIG.audi.universalRate)

    expect(response.yearlyEstimate).toMatchObject(CONFIG.yearly)
  })
});
