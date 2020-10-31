import {Controller, Get, Query} from '@nestjs/common';
import {AppService} from './app.service';
import * as investments from './data/dataset.json';
import {InvestmentInterface} from './data/investment.interface';

@Controller('investments')
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getAll(): InvestmentInterface[] {
    return investments.sort((a, b) => {
      if (a.ville > b.ville) {
        return 1;
      }

      if (a.ville < b.ville) {
        return -1;
      }

      return 0;
    });
  }

  @Get('search')
  getFiltered(@Query('ville') ville?: string): InvestmentInterface[] {
    return investments.filter(investment => {
      return investment.ville === ville;
    });
  }
}
