import { Field, ArgsType, Float } from '@nestjs/graphql';
import { IsWeekFromNow } from '../../validators/isWeekFromNow.validator';
import { IsLongitude, IsLatitude } from 'class-validator';

@ArgsType()
export class WeatherArgs {
  @IsLongitude()
  @Field(() => Float)
  lng: number;

  @IsLatitude()
  @Field(() => Float)
  lat: number;

  @IsWeekFromNow({
    message: 'date should be within one week from today',
  })
  @Field()
  date: Date;
}
