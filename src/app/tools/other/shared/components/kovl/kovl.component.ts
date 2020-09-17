import { Component, OnInit } from '@angular/core';
import {KonvvorlGetService} from '../../json-services/konvvorl-get.service';


export interface KonversationsVorlage {
  id: number;
  beschreibung: string;
  bezeichnung: string;
}



@Component({
  selector: 'app-kovl',
  templateUrl: './kovl.component.html',
  styleUrls: ['./kovl.component.css']
})
export class KovlComponent implements OnInit {

  KOVL_DATA: KonversationsVorlage[] = [
    {id: 1, beschreibung: 'Tennis', bezeichnung: 'Tennissaison'},
    {id: 10, beschreibung: 'Der Lokale Marktplatz mit Kleininseraten aus der Region', bezeichnung: 'Kleinanzeigen'},
    {id: 20, beschreibung: 'Ob Haus, Wohnung oder Gewerbeliegenschaft -  im Immobilien.....', bezeichnung: 'Immobilien'},
    {id: 30, beschreibung: 'Die besten Jobs in der Region', bezeichnung: 'Stellen'},
    {id: 50, beschreibung: 'Fussballabo - Light', bezeichnung: 'Fusballsaison'}
  ];

  displayedColumns: string[] = ['id', 'beschreibung', 'bezeichnung'];
  dataSource: any;
  constructor(private konvvorlGetService: KonvvorlGetService) {
    this.dataSource = this.KOVL_DATA;
  }

  ngOnInit() {
    this.konvvorlGetService.createKonvVorl()
        .subscribe(temp => {
          console.log("KonvvorlGetService", temp);
        })
  }

}
