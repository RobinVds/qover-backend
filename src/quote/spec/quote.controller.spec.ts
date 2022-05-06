import { Test, TestingModule } from '@nestjs/testing';
import { CarTypes, Quote } from '../entities/quote.entity';
import { QuoteController } from '../quote.controller';
import { QuoteService } from '../quote.service';
import { CONFIG } from '../config/quote.config';
import { RequestEstimateDto } from '../dto/request-estimate.dto';

describe('QuoteController', () => {
  let controller: QuoteController;
  let service: QuoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuoteController],
      providers: [QuoteService],
    }).compile();

    controller = module.get<QuoteController>(QuoteController);
    service = module.get<QuoteService>(QuoteService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return the quote estimate', async () => {
    const estimate = new RequestEstimateDto();
    estimate.ageOfDriver = 30;
    estimate.car = CarTypes.AUDI;
    estimate.purchasePrice;

    const quote = new Quote();
    quote.ageOfDriver = estimate.ageOfDriver;
    quote.car = estimate.car;
    quote.purchasePrice = estimate.purchasePrice;
    quote.universe = {
      ...CONFIG.universe,
      priceMonthly:
        (CONFIG.audi.globalQuote +
          quote.purchasePrice * CONFIG.audi.universalRate) /
        12,
      priceYearly:
        CONFIG.audi.globalQuote +
        quote.purchasePrice * CONFIG.audi.universalRate,
    };
    quote.global = {
      ...CONFIG.global,
      priceMonthly: CONFIG.audi.globalQuote / 12,
      priceYearly: CONFIG.audi.globalQuote,
    };

    jest.spyOn(service, 'getEstimate').mockImplementation(() => quote);

    expect(controller.getPlanEstimate(estimate)).toEqual(quote);
  });
});
