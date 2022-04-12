import { registerDecorator, ValidationOptions } from 'class-validator';
import { getDayDiff } from '../utils/date';

export function IsWeekFromNow(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsWeekFromNow',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(d: Date) {
          const diff = getDayDiff(d);

          return diff <= 7 && diff >= 0;
        },
      },
    });
  };
}
