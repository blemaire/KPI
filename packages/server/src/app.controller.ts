import {Controller, Get, Query} from '@nestjs/common';
import {ApiProperty, ApiResponse} from '@nestjs/swagger';
import {ApiModelPropertyOptional} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import * as investments from './data/dataset.json';
import {Investment} from './data/investement.interface';

class SearchParams {
  @ApiModelPropertyOptional({
    description: 'The city of the investment',
  })
  ville: string;

  @ApiModelPropertyOptional()
  etat_d_avancement: string;
}

class SearchResponse {
  @ApiProperty({
    type: [Investment],
  })
  data: Investment[];

  @ApiProperty()
  total: number;
}

@Controller('investments')
export class AppController {
  constructor() {
  }

  @ApiResponse({
    status: 200,
    description: 'The investments matching the criteria. All results are returned if no criteria are given.',
    type: SearchResponse,
  })
  @Get()
  getFiltered(@Query() params: SearchParams): SearchResponse {
    if (!params.ville && !params.etat_d_avancement) {
      return this.sanitise(investments);
    }

    return this.sanitise(investments.filter(investment => {
      const ville = params.ville || '';
      const etat_d_avancement = params.etat_d_avancement || '';
      
      // TODO we could add an additional flag change the OR search into and AND search where both criteria need to match
      return investment.ville === ville || investment.etat_d_avancement === etat_d_avancement;
    }));
  }

  private sanitise(data: Investment[]): SearchResponse {
    return {
      data,
      total: data.length,
    };
  }
}
