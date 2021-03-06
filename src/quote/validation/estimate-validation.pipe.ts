import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  ValidationError,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { RequestEstimateDto } from '../dto/request-estimate.dto';
import { CarTypes } from '../entities/quote.entity';

@Injectable()
export class ValidateEstimateRequestPipe implements PipeTransform {
  async transform(request: RequestEstimateDto, { metatype }: ArgumentMetadata) {
    const ALLOWED_CAR_TYPES = Object.values(CarTypes);

    const groups = ALLOWED_CAR_TYPES.includes(request.car)
      ? [request.car]
      : undefined;

    // Transform to instance with groups
    const instance = plainToInstance(
      metatype,
      {
        car: request.car as CarTypes,
        ageOfDriver: +request.ageOfDriver,
        purchasePrice: +request.purchasePrice,
      },
      { groups },
    );

    // Validate with groups
    const errors = await validate(instance, { groups });

    if (errors.length > 0) {
      throw this.createError(errors);
    }

    return instance;
  }

  createError(errors: ValidationError[]) {
    let message = {};
    errors.forEach((error) => {
      message[error.property] = Object.values(error.constraints);
    });
    const consolidatedError = new BadRequestException(
      {
        message,
        statusCode: 400,
      },
      'Bad request',
    );
    return consolidatedError;
  }
}
