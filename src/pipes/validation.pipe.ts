/* eslint-disable @typescript-eslint/ban-types */
import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { ValidationErrorTypes, ErrorMessages } from './types/pipe.dto';

@Injectable()
export class ValidationPipeEspañol implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException(this.formatErrors(errors));
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatErrors(errors: ValidationError[]) {
    return errors
      .flatMap((err) =>
        Object.entries(err.constraints).map(([constraintKey, _]) => {
          // Traduce el tipo de error al mensaje correspondiente, si está definido.
          const errorMessage = this.translateErrorMessage(constraintKey);
          return `${err.property} ${errorMessage}`;
        }),
      )
      .join(', ');
  }

  private translateErrorMessage(constraintKey: string): string {
    // Mapea el tipo de error de class-validator al mensaje de error correspondiente en español.
    switch (constraintKey) {
      case ValidationErrorTypes.IS_NOT_EMPTY:
        return ErrorMessages.IS_NOT_EMPTY;
      case ValidationErrorTypes.IS_STRING:
        return ErrorMessages.IS_STRING;
      case ValidationErrorTypes.IS_DEFINED:
        return ErrorMessages.IS_DEFINED;
      default:
        // Retorna un mensaje genérico si el tipo de error no está mapeado.
        return 'tiene un error no especificado';
    }
  }
}
