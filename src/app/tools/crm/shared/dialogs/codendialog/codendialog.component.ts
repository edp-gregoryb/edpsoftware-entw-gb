import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {RestGetcodeService} from '../../../../other/shared/rest-services/rest-getcode.service';

@Component({
  selector: 'app-codendialog',
  templateUrl: './codendialog.component.html',
  styleUrls: ['./codendialog.component.css']
})
export class CodendialogComponent implements OnInit, OnChanges {

  momentanerWert: string;
  suchresult: any;
  sortierart: any = {var: 'code_wert', art: 'aufsteigend'};
  @Input() condenArt: any;
  @Output() ausgewaehlt = new EventEmitter();
  ctext: string;
  sprache: string;
  cwert: string;
  cart: string;
  codefirma: string;
  code_wert: string;
  code_text: string;
  code_text1: string;
  code_text2: string;
  code_sprache: string;
  code_firma: string;
  code_art: string;
  code_Kz: string;
  innerheight: number;

  constructor(private getcodeService: RestGetcodeService) { }

  ngOnInit() {
    this.innerheight = self.innerHeight;

  }

  ngOnChanges() {
    this.sprache = 'D';
    this.codefirma = '2';
    this.getCode(this.condenArt, '*', '*', this.sprache, '*', '*', this.codefirma, 1, 200)
  }
//cart, cwert, ctext, sprache, '*', '*', codefirma, 1, 200
  getCode(cart, cwert, ctext, sprache, codekz, stat, codefirma, start, anzahl) {
    this.getcodeService.getCode(cart, cwert, ctext, sprache, codekz, stat, codefirma, start, anzahl)
        .subscribe(coden => {
          this.suchresult = coden;

          console.log("coden", coden);
        })
  }

  sort(_varName: string) {
    if (_varName !== this.sortierart.var || this.sortierart.art === 'absteigend') {
      this.suchresult.sort((a, b) => (a[_varName] >= b[_varName]) ? 1 : -1);
      this.sortierart.art = 'aufsteigend';
    } else {
      this.suchresult.sort((a, b) => (a[_varName] < b[_varName]) ? 1 : -1);
      this.sortierart.art = 'absteigend';
    }
    this.sortierart.var = _varName;
  }

  openCodeart(item: any) {
    console.log(item)
    this.ausgewaehlt.next((item));
  }

  directChoose(item: any) {

  }
}
