import { CONFIG } from '../config/quote.config';
import { RequestEstimateDto } from '../dto/request-estimate.dto';

export enum CarTypes {
  BMW = 'BMW',
  AUDI = 'Audi',
  PORSCHE = 'Porsche',
}

type QuoteMetaData = {
  maxDurationOfTravel: number;
  medicalExpensesReimbursements: number;
  personalAssistanceAbroad: number;
  travelAssistanceAbroad: number;
  coverageDuration: number;
  priceYearly: number;
  priceMonthly: number;
};

export class Quote {
  universe: QuoteMetaData;
  global: QuoteMetaData;
  ageOfDriver: number;
  car: CarTypes;
  purchasePrice: number;

  static generate(quoteEstimate: RequestEstimateDto) {
    let quote = new Quote();

    const globalQuote = this.calculateGlobalQuote(quoteEstimate);
    const universeQuote = this.calculateUniverseQuote(quoteEstimate);

    const universe: QuoteMetaData = {
      ...CONFIG.universe,
      priceYearly: universeQuote,
      priceMonthly: universeQuote / 12,
    };
    const global: QuoteMetaData = {
      ...CONFIG.global,
      priceYearly: globalQuote,
      priceMonthly: globalQuote / 12,
    };

    quote.ageOfDriver = quoteEstimate.ageOfDriver;
    quote.car = quoteEstimate.car;
    quote.purchasePrice = quoteEstimate.purchasePrice;
    quote.global = global;
    quote.universe = universe;

    return quote;
  }

  private static calculateGlobalQuote(quoteEstimate: RequestEstimateDto) {
    if (quoteEstimate.car === CarTypes.AUDI) {
      return CONFIG.audi.globalQuote;
    }
    if (quoteEstimate.car === CarTypes.BMW) {
      return CONFIG.bmw.globalQuote;
    }
    if (quoteEstimate.car === CarTypes.PORSCHE) {
      return CONFIG.porsche.globalQuote;
    }
  }

  private static calculateUniverseQuote(quoteEstimate: RequestEstimateDto) {
    if (quoteEstimate.car === CarTypes.AUDI) {
      return (
        CONFIG.audi.globalQuote +
        quoteEstimate.purchasePrice * CONFIG.audi.universalRate
      );
    }
    if (quoteEstimate.car === CarTypes.BMW) {
      return (
        CONFIG.bmw.globalQuote +
        quoteEstimate.purchasePrice * CONFIG.bmw.universalRate
      );
    }
    if (quoteEstimate.car === CarTypes.PORSCHE) {
      return (
        CONFIG.porsche.globalQuote +
        quoteEstimate.purchasePrice * CONFIG.porsche.universalRate
      );
    }
  }
}
