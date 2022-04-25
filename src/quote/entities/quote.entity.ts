import { CONFIG } from "../config/quote.config";
import { RequestEstimateDto } from "../dto/request-estimate.dto";

export enum CarTypes {
    BMW = "BMW",
    AUDI = "Audi",
    PORSCHE = "Porsche"

}

export class Quote {
    ageOfDriver: number;
    car: CarTypes;
    purchasePrice: number;
    quoteGlobal: number;
    quoteUniversal: number;
    maxDurationOfTravel: number; 
    medicalExpensesReimbursements: number;
    personalAssistanceAbroad: number;
    travelAssistanceAbroad: number;
    coverageDuration: number;
    yearly: boolean;

    static generate(quoteEstimate: RequestEstimateDto, yearly: boolean) {
        let quote = new Quote()

        const globalQuote = this.calculateGlobalQuote(quoteEstimate)
        const universalQuote = this.calculateUniversalQuote(quoteEstimate)

        quote.maxDurationOfTravel = yearly ? CONFIG.yearly.maxDurationOfTravel : CONFIG.monthly.maxDurationOfTravel
        quote.medicalExpensesReimbursements = yearly ? CONFIG.yearly.medicalExpensesReimbursements : CONFIG.monthly.medicalExpensesReimbursements
        quote.personalAssistanceAbroad = yearly ? CONFIG.yearly.personalAssistanceAbroad : CONFIG.monthly.personalAssistanceAbroad
        quote.travelAssistanceAbroad = yearly ? CONFIG.yearly.travelAssistanceAbroad : CONFIG.monthly.travelAssistanceAbroad
        quote.coverageDuration = CONFIG.coverageDuration
        quote.ageOfDriver = quoteEstimate.ageOfDriver
        quote.car = quoteEstimate.car
        quote.purchasePrice = quoteEstimate.purchasePrice
        quote.quoteGlobal = yearly ? globalQuote : globalQuote / 12
        quote.quoteUniversal = yearly ? universalQuote : universalQuote / 12
        quote.yearly = yearly

        return quote
    }

    private static calculateGlobalQuote(quoteEstimate: RequestEstimateDto) {
        if(quoteEstimate.car === CarTypes.AUDI) {
            return CONFIG.audi.globalQuote
        }
        if(quoteEstimate.car === CarTypes.BMW) {
            return CONFIG.bmw.globalQuote
        }
        if(quoteEstimate.car === CarTypes.PORSCHE) {
            return CONFIG.porsche.globalQuote
        }
    }

    private static calculateUniversalQuote(quoteEstimate: RequestEstimateDto) {
        if(quoteEstimate.car === CarTypes.AUDI) {
            return CONFIG.audi.globalQuote + quoteEstimate.purchasePrice * CONFIG.audi.universalRate
        }
        if(quoteEstimate.car === CarTypes.BMW) {
            return CONFIG.bmw.globalQuote + quoteEstimate.purchasePrice * CONFIG.bmw.universalRate
        }
        if(quoteEstimate.car === CarTypes.PORSCHE) {
            return CONFIG.porsche.globalQuote + quoteEstimate.purchasePrice * CONFIG.porsche.universalRate
        }
    }
}
