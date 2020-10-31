import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';
import * as data from './data/dataset.json';
import {InvestmentInterface} from './data/investment.interface';

@Controller('investments')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAll(): InvestmentInterface[] {
    return data;
  }
}
