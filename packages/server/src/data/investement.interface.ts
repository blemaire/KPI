import {ApiProperty} from '@nestjs/swagger';

export class Investment {
  @ApiProperty()
  annee_d_individualisation?: string;
  @ApiProperty()
  annee_de_livraison?: string;
  @ApiProperty()
  cao_attribution?: string;
  @ApiProperty()
  codeuai?: string;
  @ApiProperty()
  entreprise?: string;
  @ApiProperty()
  enveloppe_prev_en_meu?: number;
  @ApiProperty()
  etat_d_avancement?: string;
  @ApiProperty()
  latitude?: number;
  @ApiProperty()
  longitude?: number;
  @ApiProperty()
  lycee?: string;
  @ApiProperty()
  maitrise_d_oeuvre?: string;
  @ApiProperty()
  mandataire?: string;
  @ApiProperty()
  mode_de_devolution?: string;
  @ApiProperty()
  montant_des_ap_votes_en_meu?: number;
  @ApiProperty()
  nombre_de_lots?: number;
  @ApiProperty()
  notification_du_marche?: string;
  @ApiProperty()
  ppi?: string;
  @ApiProperty()
  titreoperation?: string;
  @ApiProperty()
  ville?: string;
}
