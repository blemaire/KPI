import {Controller, Get, Query} from '@nestjs/common';
import {ApiModelPropertyOptional} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import * as investments from './data/dataset.json';
import {IInvestment} from './data/investement.interface';

class SearchParams {
  @ApiModelPropertyOptional()
  ville: string;

  @ApiModelPropertyOptional()
  etat_d_avancement: string;
}

@Controller('investments')
export class AppController {
  constructor() {
  }

  @Get()
  getFiltered(@Query() params: SearchParams): IInvestment[] {
    if (!params.ville && !params.etat_d_avancement) {
      return investments;
    }

    params.ville = params.ville || '';
    params.etat_d_avancement = params.etat_d_avancement || '';

    return investments.filter(investment => {
      // TODO we could add an additional flag change the OR search into and AND search where both criteria need to match
      return investment.ville === params.ville || investment.etat_d_avancement === params.etat_d_avancement;
    });
  }
}
