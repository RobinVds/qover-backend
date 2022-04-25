import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { RequestEstimateDto } from './dto/request-estimate.dto';
import { ValidateEstimateRequestPipe } from './validation/estimate-validation.pipe';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) { }

  @Post("request-quote")
  getPlanEstimate(@Body(new ValidateEstimateRequestPipe()) quoteEstimate: RequestEstimateDto) {
    return this.quoteService.getEstimate(quoteEstimate)
  }
}
