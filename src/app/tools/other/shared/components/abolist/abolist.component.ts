import { Component, OnInit, Output, EventEmitter, AfterViewInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { FisvlaboallService } from '../../../../crm/shared/services/fisvlaboall.service';

import { GetaboinfoService } from '../../rest-services/getaboinfo.service';
import { RestSetdeleteaboService } from '../../rest-services/rest-setdeleteabo.service';

@Component({
  selector: 'app-abolist',
  templateUrl: './abolist.component.html',
  styleUrls: ['./abolist.component.css']
})
export class AbolistComponent implements OnInit, AfterViewInit {

  @Output() aboinfo = new EventEmitter(); //gibt die info des abos zurueck, dass angeklickt wird
  currentAboIndex: number; //zurzeit ausgewaehltes abo (index in der liste)

  abodaten: any = [];
  editingAbo: boolean = false; //bool ob zurzeit ein neues abo besteht

  adressnr: number; //addressnummer der person (um alle abos aufzulisten)

  vorgnr: number;
  posnr: number;

  innerheight: number;
  scrollDiff: number = 0;

  neuesAboVorhanden: boolean = false;

  constructor(private fisvlaboallService:FisvlaboallService,
              private getaboinfoService:GetaboinfoService,
              private route:ActivatedRoute,
              private setdeleteAboService: RestSetdeleteaboService,
              private cdRef:ChangeDetectorRef) { }

  ngOnInit() {
    //parameter aus sessionStorage auslesen
    this.adressnr = Number(sessionStorage.getItem('aboAdressnr'));
    this.vorgnr = Number(sessionStorage.getItem('aboVorgangsnr'));
    this.posnr = Number(sessionStorage.getItem('aboPosnr'));

    var allgemein = sessionStorage.getItem('aboShowAllgemein');
    sessionStorage.removeItem('aboShowAllgemein');

    this.innerheight = self.innerHeight - 60 - 4;

    //alle abos laden
    this.getaboinfoService.getAboInfo(this.adressnr)
      .subscribe( abos => {
        if(!abos){ return; }
        this.abodaten = abos;

        //check, welches abo am anfang ausgewaehlt ist
        let found: boolean = false;
        //vorgnr und posnr (vom sessionstorage) abgleichen mit abo-vorgnr und -posnr
        if(this.vorgnr && this.posnr){
          let index = this.abodaten.findIndex(abo => abo.vorgnr === this.vorgnr && abo.posnr === this.posnr);
          if(index != -1){
            //gefundenes abo wird ausgewaehlt
            this.showAboDetails(this.abodaten[index], index);
            found = true;
          }
        }
        //kein bestehendes abo ist am anfang ausgewaehlt -> es muss ein neues noch nicht gespeichertes sein
        if(!found && allgemein !== 'true'){
          //neues abo hinzufuegen
          this.setdeleteAboService.createEmptyAbo(this.adressnr)
            .subscribe( ret => {
              this.abodaten.push(ret);
              this.currentAboIndex = this.abodaten.length - 1;
              this.neuesAboVorhanden = true;
              //diese anwaehlen
              this.showAboDetails(this.abodaten[this.currentAboIndex], this.currentAboIndex);
              this.editingAbo = true;
          });
        }
    });
  } //ene ngOnInit()

  @ViewChild('abolist', { static: false }) abolistRef: ElementRef;
  ngAfterViewInit() {
    //an die stelle scrollen, bei der das Modul verlassen worden ist (funktioniert noch nicht ganz)
    let scrollHeight: number = Number(sessionStorage.getItem('abolistScroll'));
    if(scrollHeight){
      this.abolistRef.nativeElement.scrollTop = scrollHeight;
      this.cdRef.detectChanges(); //damit 'ExpressionHasChangedAfterItHasBeenCheckedError' umgangen wird
    }
  }

  //fenster-groessse veraenderung -> hoehe anpassen
  windowResize(e: Event): void {
    this.innerheight = self.innerHeight - 60 - 4;
  }

  //scrollDifferenz updaten
  onScroll(event: any): void {
    this.scrollDiff = JSON.parse(JSON.stringify(event.srcElement.scrollTop));
  }

  //momentanen scroll in sessoinStorage speichern
  saveScroll(): void {
    sessionStorage.setItem('abolistScroll', this.scrollDiff.toString());
  }

  //ein abo anzeigen
  showAboDetails(abo, index: number, event?:Event): void {
    if(event){
      event.stopPropagation();
    }

    //aboindex updaten
    this.currentAboIndex = index;

    //sessionStorage updaten
    sessionStorage.setItem('aboVorgangsnr', abo.vorgnr);
    sessionStorage.setItem('aboPosnr', abo.posnr);

    if(this.neuesAboVorhanden && (this.currentAboIndex + 1) !== this.abodaten.length) {
      this.abodaten.length--;
      this.editingAbo = false;
      this.neuesAboVorhanden = false;
    }

    let aboIstNeu: boolean = false;
    if(this.neuesAboVorhanden && (this.currentAboIndex + 1) === this.abodaten.length) {
      aboIstNeu = true;
    }

    //gibt abo zurueck an abomodul
    this.aboinfo.next({ 'abo': JSON.parse(JSON.stringify(abo)), 
                        'newAboPossible': (!this.neuesAboVorhanden), 
                        'aboIndex': this.currentAboIndex, 
                        'anzahlAbos': this.abodaten.length,
                        'aboIstNeu': aboIstNeu
                      });
  } //ende showAboDetails()

  //bereinigt variabel
  cleanupParams(param: string): string {
    if (param) return param;
    return "";
  }

  //wenn ein tool in aboverwaltung.component ausgewaehlt wird, wird eine meldung hierhin geschickt und diese methode ist der splitter
  verwaltungTool(e: any): void {
    if(!e){ return; }

    //ruft die richtige methode auf
    let temp = JSON.parse(JSON.stringify(e));

    let _funcName: string = temp.tool;
    let _funcParam = temp.value;

    if(this[_funcName] === undefined) {
      return;
    }
    
    if(_funcName !== undefined) {
      if(_funcParam !== undefined){
        this[_funcName](_funcParam);
      } else {
        this[_funcName]();
      }
    }
  }

  saveAbo(obj: any): void {
    if(!obj.abo || !obj.index) {
      return;
    }
    this.abodaten[obj.index] = JSON.parse(JSON.stringify(obj.abo));

    if(obj.index + 1 === this.abodaten.length) {
      this.neuesAboVorhanden = false;
      this.editingAbo = false;
    }
  }

  newAbo(): void {
    this.editingAbo = true;
    //neues abo wird erstellt
    this.setdeleteAboService.createEmptyAbo(this.adressnr)
      .subscribe( ret => {
        this.neuesAboVorhanden = true;
        this.abodaten.push(ret);

        //neues abo wird angewaehlt
        this.showAboDetails(this.abodaten[this.abodaten.length - 1], this.abodaten.length - 1);
    });
  }

  //dupliziert ein bestehendes Abo
  copyAbo(_i: number): void {
    this.editingAbo = true;
    //duplizieren
    let tempAbo = JSON.parse(JSON.stringify(this.abodaten[_i]));
    tempAbo.posnr = 0;
    this.neuesAboVorhanden = true;
    this.abodaten.push(tempAbo);
    //anwaehlen
    this.showAboDetails(this.abodaten[this.abodaten.length - 1], this.abodaten.length - 1);
  }

  deleteAbo(_i: number): void {
    this.abodaten.splice(_i, 1);
    this.currentAboIndex = -1;
    this.aboinfo.next(undefined);
  }

  //bricht das bearbeiten eines neuen Abos ab
  cancleNewAbo(): void {
    this.editingAbo = false;
    this.neuesAboVorhanden = false;
    //neues abo wieder loeschen
    this.abodaten.pop();
    this.currentAboIndex = -1;
    this.aboinfo.next(undefined);
  }

  //zum ersten oder letzten abo wechseln
  skipAbo(num: number): void {
    if(!num){ return; }

    //skip zum letzten oder ersten abo
    if(num === -1){
      this.showAboDetails(this.abodaten[0], 0);
    } else if(num === 1){
      this.showAboDetails(this.abodaten[this.abodaten.length - 1], this.abodaten.length - 1);
    }
  }

  //um num stellen in der abo-liste vor oder zurueck
  changeAbo(num: number): void {
    if(!num){ return; }
    //abo wechseln um 'num' stellen
    let changedIndex = num + this.currentAboIndex;
    changedIndex = Math.max(changedIndex, 0);
    changedIndex = Math.min(changedIndex, this.abodaten.length - 1);

    this.showAboDetails(this.abodaten[changedIndex], changedIndex);
  }
} //ende class AbolistComponent
