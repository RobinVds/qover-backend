import { Injectable } from '@nestjs/common';
import { RequestEstimateDto } from './dto/request-estimate.dto';
import { Quote } from './entities/quote.entity';

@Injectable()
export class QuoteService {
  getEstimate(quoteEstimate: RequestEstimateDto) {
    return Quote.generate(quoteEstimate);
  }
}
