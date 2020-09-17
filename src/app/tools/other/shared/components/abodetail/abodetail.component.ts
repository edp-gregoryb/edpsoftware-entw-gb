import { Component, OnInit, Input, Output, Inject, EventEmitter, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { RestObjektService } from '../../rest-services/rest-objekt.service';
import { AdrkundenService } from '../../../../shared/services/adrkunden.service';
import { AbolistComponent } from '../abolist/abolist.component';

@Component({
  selector: 'app-abodetail',
  templateUrl: './abodetail.component.html',
  styleUrls: ['./abodetail.component.css'],
  providers: [ AbolistComponent ]
})
export class AbodetailComponent implements OnInit {

  @Input() abodetails: any;
  @Input() updatedZwischenspeicher: any;

  @Output() verwaltungTool = new EventEmitter();
  @Output() saveScrollEvent = new EventEmitter();

  @ViewChild('abodetail', { static: false }) abodetailRef: ElementRef;

  innerheight: number;
  scrollDiff: number = 0;

  expanded: number = 0;

  vonWo: any = '';

  aboMail: string = '';
  aboAdresse: string = '';
  liefMail: any = '';
  liefAdresse: string = '';
  rechnMail: any;
  rechnAdresse: string = '';

  constructor(private objektService: RestObjektService,
              private adrkundenService: AdrkundenService,
              private abolistComponent: AbolistComponent,
              private cdRef:ChangeDetectorRef,
              public dialog: MatDialog) { }

  ngOnInit() {
    if(sessionStorage.getItem('aboAccordionExpanded')){
      this.expanded = Number(sessionStorage.getItem('aboAccordionExpanded'));
    }

    //zwischenspeicher in richtiges akkordeon als input geben
    if(sessionStorage.getItem('toOtherModuleFrom') !== null){
      this.vonWo = sessionStorage.getItem('toOtherModuleFrom');
      sessionStorage.removeItem('toOtherModuleFrom');
    }

    this.innerheight = self.innerHeight - 60 - 4;
  }

  windowResize(e: Event) {
    this.innerheight = self.innerHeight - 60 - 4;
  }

  //abodetail scroll an den zuletzt gewesenen ort
  activateAutoScroll() {
    let scrollHeight: number = Number(sessionStorage.getItem('abodetailScroll'));
    if(this.abodetailRef && scrollHeight){
      this.abodetailRef.nativeElement.scrollTop = scrollHeight;
    }
  }

  //scroll updaten
  onScroll(event: any) {
    let elem = event.srcElement;
    this.scrollDiff = elem.scrollTop;
  }

  //scroll abspeichern
  saveScroll() {
    this.saveScrollEvent.emit(null);
    sessionStorage.setItem('abodetailScroll', this.scrollDiff.toString());
  }

  aboInfoChanged(e: Event) {
    //anderes abo wird ausgewaehlt -> Adressen laden
    this.abodetails = e;
    if(this.abodetails && this.abodetails.abo) {
      this.loadADRW(this.abodetails.abo);
    }
  }

  //laedt adressen aus ADRW
  public loadADRW(_abodetails: any) {
    if(_abodetails){
      this.loadKunde(_abodetails.beznr.toString(), 'aboMail', 'aboAdresse');
      this.loadKunde(_abodetails.tt_abozust[0].lbeznr.toString(), 'liefMail', 'liefAdresse');
      this.loadKunde(_abodetails.rbeznr.toString(), 'rechnMail', 'rechnAdresse');
    }
  }

  loadKunde(suche: string, mail: string, adresse: string): void {
    this.adrkundenService.getKunde(suche, 'no', 'yes')
      .subscribe( ret => {
        if(ret && ret[0]){
          this[mail] = ret[0].bemail;
          this[adresse] = ret[0].bfname + '\n' + ret[0].bstrasse + '\n' + ret[0].bort;
        }
    });
  }

  //gibt mail-link zurueck
  getMailLink(_fromWhere: string): string {
    if(this.abodetails){
      let subject: string = 'Abo Mail';
      let body: string = 'Hier wird der erwünschte Text eingesetzt.';

      let mailSubject: string = subject.replace(/ /g, '%20');
      let mailBody: string = body.replace(/ /g, '%20');

      let email: string;

      if(this[_fromWhere]){
        email = this[_fromWhere];
      }

      if(email){
        return ('mailto:' + email + '?subject=' + mailSubject + '&body=' + mailBody);
      }
      return '';
    }
  }

  //akkordeon wird geoeffnet
  setExpanded(index: number) {
    this.expanded = index;
    sessionStorage.setItem('aboAccordionExpanded', this.expanded.toString());
  }

  //akkordeon wird geschlossen
  accordionClosed(index: number) {
    if(this.expanded === index){
      this.expanded = -1;
      sessionStorage.removeItem('aboAccordionExpanded');
    }
  }

  //oeffnet detailinfoDialog
  public openDetailinfoDialog(_details): void {
    const dialogRef = this.dialog.open(DetailinfoDialog, {
      width: '630px',
      data: _details
    });

    //dialogfenster wird geschlossen
    dialogRef.afterClosed().subscribe(result => {});
  }

  public openLoeschenDialog(_art: string, _val?: string): Promise<any> {
    const dialogRef = this.dialog.open(AboloeschenDialog, {
      data: {art: _art, val: _val}
    });

    //dialogfenster wird geschlossen
    return new Promise(resolve => {
      dialogRef.afterClosed().subscribe(result => {
        resolve(result);
      });
    });
  }

  //kopiert text in benutzer-clipboard (ctrl + c)
  copyToClipboard(_str: string){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = _str;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}

//DetailinfoDialog
@Component({
  selector: 'detailinfo-dialog',
  templateUrl: 'detailinfo-dialog.html',
})
export class DetailinfoDialog {

  objectKeys = Object.keys;
  
  constructor(
    public dialogRef: MatDialogRef<DetailinfoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
}

//LoeschenDialog
@Component({
  selector: 'aboloeschen-dialog',
  templateUrl: 'aboloeschen-dialog.html',
})
export class AboloeschenDialog {
  
  constructor(
    public dialogRef: MatDialogRef<AboloeschenDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
}
