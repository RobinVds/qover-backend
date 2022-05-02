import { CarTypes } from '../entities/quote.entity';
import { IsDecimal, IsInt, IsEnum, Min } from 'class-validator';

const ALL_GROUPS = [CarTypes.PORSCHE, CarTypes.BMW, CarTypes.AUDI];
export class RequestEstimateDto {
  @IsInt({ message: 'The age of the driver is required.', groups: ALL_GROUPS })
  @Min(18, { message: 'Sorry! The driver is too young.', groups: ALL_GROUPS })
  @Min(25, {
    groups: [CarTypes.PORSCHE],
    message: 'Sorry! We can not accept this risk.',
  })
  ageOfDriver: number;

  @IsEnum(CarTypes, {
    message: 'Currently only Porsche, Audi and BMW are supported car types.',
    groups: ALL_GROUPS,
  })
  car: CarTypes;

  @IsInt({ message: 'The purchase price is required.', groups: ALL_GROUPS })
  @Min(5000, {
    message: 'Sorry! The price of the car is too low.',
    groups: ALL_GROUPS,
  })
  purchasePrice: number;
}
