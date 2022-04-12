import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { getDayDiff } from '../utils/date';
import { WeatherArgs } from './dto/weather.args';

interface Coordinates {
  lat: number;
  lng: number;
}

interface Response {
  daily: DailyReport[];
}

interface DailyReport {
  weather: [
    {
      description: string;
    },
  ];
}

@Injectable()
export class WeatherService {
  async getDailyResponses({
    lat,
    lng: lon,
  }: Coordinates): Promise<DailyReport[]> {
    const { data } = await axios.get<Response>(
      'https://api.openweathermap.org/data/2.5/onecall',
      {
        params: {
          lat,
          lon,
          exclude: 'hourly,current,minutely',
          appID: process.env.APP_ID,
          units: 'imperial',
        },
      },
    );

    return data?.daily;
  }

  calculateDayDiff(date: Date) {
    return getDayDiff(date);
  }

  async getDescriptionString({ lat, lng, date }: WeatherArgs) {
    const responses = await this.getDailyResponses({ lat, lng });
    const diff = this.calculateDayDiff(date);
    return responses[diff]?.weather?.[0]?.description;
  }
}
