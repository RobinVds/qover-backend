import { CarTypes } from "../entities/quote.entity"
import { IsDecimal, IsInt, IsEnum, Min } from 'class-validator';

export class RequestEstimateDto {
    @IsInt()
    @Min(18, { message: "Sorry! The driver is too young." })
    @Min(25, { groups: [CarTypes.PORSCHE], message: "Sorry! We can not accept this risk." })
    ageOfDriver: number;

    @IsEnum(CarTypes, {message: "Currently only Porsche, Audi and BMW are supported car types."})
    car: CarTypes;

    @IsDecimal()
    @Min(5000, { message: "Sorry! The price of the car is too low." })
    purchasePrice: number;
}
