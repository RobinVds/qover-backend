import { Injectable } from '@nestjs/common';
import { RequestEstimateDto } from './dto/request-estimate.dto';
import { Quote } from './entities/quote.entity';

@Injectable()
export class QuoteService {
  getEstimate(quoteEstimate: RequestEstimateDto) {
    let yearlyEstimate = Quote.generate(quoteEstimate, true)
    let monthlyEstimate = Quote.generate(quoteEstimate, false)

    return  {
      yearlyEstimate,
      monthlyEstimate
    }
  }
}
