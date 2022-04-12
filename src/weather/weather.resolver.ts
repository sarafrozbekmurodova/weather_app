import { Resolver, Args, Query } from '@nestjs/graphql';
import { WeatherArgs } from './dto/weather.args';
import { WeatherService } from './weather.service';

@Resolver(() => String)
export class WeatherResolver {
  constructor(private weatherService: WeatherService) {}

  @Query(() => String)
  async weather(@Args() { lat, lng, date }: WeatherArgs) {
    return this.weatherService.getDescriptionString({ lat, lng, date });
  }
}
