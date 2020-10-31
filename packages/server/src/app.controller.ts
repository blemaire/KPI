import {Controller, Get, Param, Query} from '@nestjs/common';
import {ApiOkResponse, ApiProperty} from '@nestjs/swagger';
import {ApiModelPropertyOptional} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import * as investments from './data/dataset.json';
import {Investment} from './data/investement.interface';

class SearchParams {
  @ApiModelPropertyOptional({
    description: 'The city of the investment',
  })
  ville: string;

  @ApiModelPropertyOptional({
    description: 'The current state of the investment'
  })
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

  @ApiOkResponse({
    type: SearchResponse,
    description: 'Search investments by criteria. Returns all results if no criteria given.',
  })
  @Get()
  public getFiltered(@Query() params: SearchParams): SearchResponse {
    if (!params.ville && !params.etat_d_avancement) {
      return this.formatForList(investments);
    }

    return this.formatForList(investments.filter(investment => {
      const ville = params.ville || '';
      const etat_d_avancement = params.etat_d_avancement || '';

      // TODO we could add an additional flag change the OR search into and AND search where both criteria need to match
      return investment.ville === ville || investment.etat_d_avancement === etat_d_avancement;
    }));
  }

  @ApiOkResponse({
    type: Investment,
    description: 'Get an investment by codeuai.',
  })
  @Get(':codeuai')
  public getById(@Param('codeuai') codeuai: string): Investment | null {
    return investments.find(investment => investment.codeuai === codeuai);
  }

  private formatForList(data: Investment[]): SearchResponse {
    return {
      data,
      total: data.length,
    };
  }
}
