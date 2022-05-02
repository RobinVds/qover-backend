import { BadRequestException } from '@nestjs/common';
import { RequestEstimateDto } from '../dto/request-estimate.dto';
import { CarTypes } from '../entities/quote.entity';
import { ValidateEstimateRequestPipe } from '../validation/estimate-validation.pipe';

describe('ValidateEstimateRequestPipe', () => {
  let validationPipe: ValidateEstimateRequestPipe;

  beforeEach(async () => {
    validationPipe = new ValidateEstimateRequestPipe();
  });

  it('should not allow porsche if driver is younger than 25', async () => {
    const request = {
      car: CarTypes.PORSCHE,
      ageOfDriver: 22,
      purchasePrice: 10,
    };
    await expect(
      validationPipe.transform(request, {
        type: 'body',
        metatype: RequestEstimateDto,
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should not allow drivers younger than 18', async () => {
    const request = {
      car: CarTypes.BMW,
      ageOfDriver: 17,
      purchasePrice: 5001,
    };
    await expect(
      validationPipe.transform(request, {
        type: 'body',
        metatype: RequestEstimateDto,
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should not allow purchasePrice bellow 5000', async () => {
    const request = {
      car: CarTypes.BMW,
      ageOfDriver: 17,
      purchasePrice: 4999,
    };
    await expect(
      validationPipe.transform(request, {
        type: 'body',
        metatype: RequestEstimateDto,
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should allow BMW of at least than 5000€ and driver of age 18', async () => {
    const request = {
      car: CarTypes.BMW,
      ageOfDriver: 18,
      purchasePrice: 5000,
    };
    expect(
      await validationPipe.transform(request, {
        type: 'body',
        metatype: RequestEstimateDto,
      }),
    ).toBeDefined();
  });
});
